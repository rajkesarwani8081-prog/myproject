import { Terminal } from "lucide-react";

export default function LogsPanel({ logs, endRef }) {
  return <section className="panel logs-panel">
    <div className="panel-heading"><div><h2><Terminal size={18} /> System Logs</h2><p className="muted">Recent scanner activity</p></div><span className="log-live">LIVE</span></div>
    <div className="logs-console">
      {logs.length === 0 ? <div className="log-placeholder">Waiting for activity...</div> : logs.map((log, i) =>
        <div className="log-line" key={`${log.timestamp}-${i}`}>
          <span className="log-time">[{log.timestamp}]</span>
          <span className={`log-${log.type}`}>{log.message}</span>
        </div>
      )}
      <div ref={endRef} />
    </div>
  </section>;
}