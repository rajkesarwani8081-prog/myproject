import { Shield, Send, RefreshCw } from "lucide-react";

export default function Header({ onSend, autoScan, onToggleAuto, isProcessing }) {
  return (
    <header className="hero">
      <div className="brand">
        <div className="brand-icon"><Shield size={32} /></div>
        <div>
          <h1>Real-time Phishing Detection System</h1>
          <p>Live demo · Email threat analysis dashboard</p>
        </div>
      </div>
      <div className="hero-actions">
        <button className="button button-light" onClick={onSend} disabled={isProcessing}>
          <Send size={16} /> {isProcessing ? "Scanning..." : "Send Test Email"}
        </button>
        <button className={`button ${autoScan ? "button-danger" : "button-success"}`} onClick={onToggleAuto}>
          <RefreshCw size={16} className={autoScan ? "spin" : ""} />
          {autoScan ? "Stop Auto-Scan" : "Start Auto-Scan"}
        </button>
      </div>
    </header>
  );
}