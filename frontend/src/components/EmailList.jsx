import { Mail, ChevronRight } from "lucide-react";

export default function EmailList({ emails, onSelect }) {
  return <section className="panel email-panel">
    <div className="panel-heading"><div><h2>Processed Emails</h2><p className="muted">Select an email to inspect its analysis</p></div><span className="count-pill">{emails.length}</span></div>
    <div className="email-list">
      {emails.length === 0 ? <div className="empty-state"><Mail size={38} /><strong>No emails processed yet</strong><span>Click “Send Test Email” to start scanning.</span></div> :
        emails.map(email => <button className="email-row" key={email.id} onClick={() => onSelect(email)}>
          <div className="email-row-top">
            <div className="email-main"><strong>{email.subject}</strong><span>From: {email.from}</span></div>
            <time>{new Date(email.timestamp).toLocaleTimeString()}</time>
          </div>
          <div className="email-meta">
            <span className={`status status-${email.status}`}>{email.status}</span>
            <b className={`score ${email.compositeScore >= .7 ? "red" : email.compositeScore >= .4 ? "amber" : "green"}`}>Score: {email.compositeScore.toFixed(2)}</b>
            <span className="model-scores">Demo ML: {email.mlScore.toFixed(2)} · Rules: {email.heuristicScore.toFixed(2)}</span>
            <ChevronRight size={16} className="row-chevron" />
          </div>
          <div className="reason-tags">{email.reasons.slice(0, 3).map((reason, i) => <span key={`${reason}-${i}`}>{reason}</span>)}</div>
        </button>)
      }
    </div>
  </section>;
}