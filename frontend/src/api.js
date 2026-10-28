async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

export async function scanRandomEmail() {
  const data = await request("/api/scan/random", { method: "POST", body: "{}" });
  return data.email;
}

export async function scanEmail(email) {
  const data = await request("/api/scan", { method: "POST", body: JSON.stringify(email) });
  return data.email;
}

export async function checkApiHealth() {
  return request("/api/health");
}