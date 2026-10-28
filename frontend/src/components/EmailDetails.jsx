import { X, ShieldAlert } from "lucide-react";

export default function EmailDetails({ email, onClose }) {
  if (!email) return null;
  const scoreClass = email.compositeScore >= .7 ? "red" : email.compositeScore >= .4 ? "amber" : "green";
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={e => e.stopPropagation()}>
      <div className="modal-heading"><div><div className="eyebrow"><ShieldAlert size={15} /> EMAIL ANALYSIS</div><h2 id="detail-title">Email Details</h2></div><button className="icon-button" onClick={onClose} aria-label="Close details"><X /></button></div>
      <div className="modal-content">
        <div className="detail-status"><span className={`status status-${email.status}`}>{email.status}</span><span className="muted">{new Date(email.timestamp).toLocaleString()}</span></div>
        <div className="detail-field"><label>From</label><p>{email.from}</p></div>
        <div className="detail-field"><label>Subject</label><p>{email.subject}</p></div>
        <div className="detail-field"><label>Message body</label><p className="email-body">{email.body}</p></div>
        <div className="score-grid">
          <div className="score-card"><span>Composite score</span><strong className={scoreClass}>{email.compositeScore.toFixed(3)}</strong></div>
          <div className="score-card"><span>Demo ML score</span><strong className="purple">{email.mlScore.toFixed(3)}</strong></div>
          <div className="score-card"><span>Rule score</span><strong className="blue">{email.heuristicScore.toFixed(3)}</strong></div>
        </div>
        <div className="detail-field"><label>Detection reasons</label><div className="detail-tags">{email.reasons.map((reason, i) => <span key={`${reason}-${i}`}>{reason}</span>)}</div></div>
        <div className="detail-field"><label>Extracted features</label><div className="features-grid">{Object.entries(email.features).map(([key, value]) => <div key={key}><span>{key}</span><b>{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</b></div>)}</div></div>
        {email.links?.length > 0 && <div className="detail-field"><label>URLs found (do not open suspicious links)</label><div className="url-box">{email.links.map((link, i) => <p key={`${link}-${i}`}>{link}</p>)}</div></div>}
        <p className="demo-note">Prototype only: scores are heuristic/demo values, not a validated security verdict.</p>
      </div>
    </section>
  </div>;
}