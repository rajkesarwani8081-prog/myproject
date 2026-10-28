import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import Header from "./components/Header.jsx";
import StatsCards from "./components/StatsCards.jsx";
import Pipeline from "./components/Pipeline.jsx";
import EmailList from "./components/EmailList.jsx";
import LogsPanel from "./components/LogsPanel.jsx";
import EmailDetails from "./components/EmailDetails.jsx";
import { scanRandomEmail, checkApiHealth } from "./api.js";

const initialStats = { total: 0, quarantined: 0, flagged: 0, delivered: 0 };

export default function App() {
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState(initialStats);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [autoScan, setAutoScan] = useState(false);
  const [logs, setLogs] = useState([]);
  const [apiOnline, setApiOnline] = useState(false);
  const [error, setError] = useState("");
  const logsEndRef = useRef(null);
  const processingRef = useRef(false);

  const addLog = useCallback((message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(previous => [...previous.slice(-99), { timestamp, message, type }]);
  }, []);

  useEffect(() => {
    checkApiHealth().then(() => setApiOnline(true)).catch(() => {
      setApiOnline(false);
      setError("Backend is not reachable. Start the project with npm run dev from the root folder.");
    });
  }, []);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const processEmail = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setIsProcessing(true);
    setError("");
    addLog("Requesting a sample email from the backend...", "info");
    try {
      const email = await scanRandomEmail();
      addLog("Extracted email text and URL features.", "info");
      addLog("Ran heuristic rules and demo weighted scoring.", "info");
      addLog(`Email ${email.status.toUpperCase()} (score: ${email.compositeScore.toFixed(2)})`,
        email.status === "quarantined" ? "error" : email.status === "flagged" ? "warning" : "success");
      setEmails(previous => [email, ...previous].slice(0, 100));
      setStats(previous => ({
        total: previous.total + 1,
        quarantined: previous.quarantined + (email.status === "quarantined" ? 1 : 0),
        flagged: previous.flagged + (email.status === "flagged" ? 1 : 0),
        delivered: previous.delivered + (email.status === "delivered" ? 1 : 0)
      }));
      addLog("Processing complete.", "success");
    } catch (err) {
      setError(err.message || "Could not process the email.");
      addLog(`Error: ${err.message || "Could not process email"}`, "error");
    } finally {
      processingRef.current = false;
      setIsProcessing(false);
    }
  }, [addLog]);

  useEffect(() => {
    if (!autoScan) return undefined;
    const timer = window.setInterval(() => { processEmail(); }, 3000);
    return () => window.clearInterval(timer);
  }, [autoScan, processEmail]);

  return <main className="app-shell">
    <Header onSend={processEmail} isProcessing={isProcessing} autoScan={autoScan} onToggleAuto={() => setAutoScan(value => !value)} />
    <div className="connection-line">
      <span className={`connection-dot ${apiOnline ? "online" : "offline"}`} />
      {apiOnline ? "Backend API connected" : "Connecting to backend API..."}
      <span className="connection-separator">·</span> Demo environment
    </div>
    {error && <div className="error-banner"><AlertCircle size={18} /><span>{error}</span></div>}
    <StatsCards stats={stats} />
    <Pipeline isProcessing={isProcessing} />
    <div className="content-grid">
      <EmailList emails={emails} onSelect={setSelectedEmail} />
      <LogsPanel logs={logs} endRef={logsEndRef} />
    </div>
    <footer className="footer"><ShieldCheck size={16} /><span>Phishing Detection Demo</span><span className="footer-dot">•</span><span>Prototype / demo outputs; no validated field measurements</span></footer>
    <EmailDetails email={selectedEmail} onClose={() => setSelectedEmail(null)} />
  </main>;
}