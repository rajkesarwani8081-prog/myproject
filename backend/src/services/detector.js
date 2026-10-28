const urgencyWords = ["urgent", "immediate", "act now", "verify", "suspend", "expire", "confirm", "security alert"];
const financialWords = ["bank", "credit card", "payment", "paypal", "bitcoin", "invoice"];
const personalWords = ["password", "account", "login", "verify"];

export function extractFeatures(email) {
  const text = `${email.subject} ${email.body}`.toLowerCase();
  const links = Array.isArray(email.links) ? email.links : [];

  return {
    urgencyCount: urgencyWords.filter(word => text.includes(word)).length,
    financialCount: financialWords.filter(word => text.includes(word)).length,
    personalInfoCount: personalWords.filter(word => text.includes(word)).length,
    hasIpUrl: links.some(link => /\b\d{1,3}(?:\.\d{1,3}){3}\b/.test(link)),
    hasSuspiciousTld: links.some(link => /\.(xyz|top|work|click|link)(?:[/:?#]|$)/i.test(link)),
    hasShortener: links.some(link => /bit\.ly|tinyurl\.com|goo\.gl/i.test(link)),
    linkCount: links.length,
    excessivePunctuation: /[!?]{2,}/.test(`${email.subject} ${email.body}`),
    allCapsWords: (email.subject.match(/\b[A-Z]{4,}\b/g) || []).length,
    subjectLength: email.subject.length,
    hasHtml: /<html|<body/i.test(email.body)
  };
}

export function calculateHeuristicScore(features) {
  let score = 0;
  const reasons = [];

  if (features.urgencyCount > 2) {
    score += 0.3;
    reasons.push("High urgency language");
  } else if (features.urgencyCount > 0) {
    score += 0.15;
    reasons.push("Urgency keywords");
  }
  if (features.hasIpUrl) { score += 0.25; reasons.push("IP-based URL"); }
  if (features.hasSuspiciousTld) { score += 0.15; reasons.push("Suspicious TLD"); }
  if (features.hasShortener) { score += 0.15; reasons.push("URL shortener"); }
  if (features.linkCount > 3) { score += 0.1; reasons.push("Excessive links"); }
  if (features.excessivePunctuation) { score += 0.1; reasons.push("Excessive punctuation"); }
  if (features.financialCount > 0 && features.personalInfoCount > 0) {
    score += 0.2;
    reasons.push("Financial + personal info request");
  }
  return { score: Math.min(score, 1), reasons };
}

// Demo-only weighted score; this is not a trained ML model.
export function calculateMLScore(features) {
  const weights = {
    urgencyCount: 0.15,
    financialCount: 0.12,
    personalInfoCount: 0.18,
    hasIpUrl: 0.2,
    hasSuspiciousTld: 0.1,
    hasShortener: 0.1,
    linkCount: 0.08,
    excessivePunctuation: 0.04,
    allCapsWords: 0.03
  };

  let score = 0;
  for (const [key, weight] of Object.entries(weights)) {
    if (features[key] > 0) {
      score += weight * (typeof features[key] === "boolean" ? 1 : Math.min(features[key] / 3, 1));
    }
  }

  const reasons = [score > 0.7 ? "Demo score: high-risk patterns" : score > 0.4
    ? "Demo score: suspicious patterns" : "Demo score: lower-risk patterns"];
  return { score: Math.min(score, 1), reasons };
}

export function analyzeEmail(email) {
  if (!email || typeof email.from !== "string" || typeof email.subject !== "string" || typeof email.body !== "string") {
    const error = new Error("Email must include string fields: from, subject, and body.");
    error.status = 400;
    throw error;
  }

  const normalizedEmail = { ...email, links: Array.isArray(email.links) ? email.links : [], attachments: Number(email.attachments) || 0 };
  const features = extractFeatures(normalizedEmail);
  const heuristic = calculateHeuristicScore(features);
  const ml = calculateMLScore(features);
  const compositeScore = (0.6 * ml.score) + (0.4 * heuristic.score);
  const status = compositeScore >= 0.7 ? "quarantined" : compositeScore >= 0.4 ? "flagged" : "delivered";

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...normalizedEmail,
    timestamp: new Date().toISOString(),
    mlScore: ml.score,
    heuristicScore: heuristic.score,
    compositeScore,
    status,
    reasons: [...new Set([...heuristic.reasons, ...ml.reasons])],
    features
  };
}