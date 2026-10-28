import { Mail, Database, ChartNoAxesCombined, Cpu, ShieldCheck } from "lucide-react";

const steps = [
  { title: "SMTP Intake", sub: "Mail input", icon: Mail, tone: "blue" },
  { title: "Feature Extract", sub: "Text + URL signals", icon: Database, tone: "purple" },
  { title: "Heuristics", sub: "Rule engine", icon: ChartNoAxesCombined, tone: "green" },
  { title: "Demo ML Score", sub: "Weighted scoring", icon: Cpu, tone: "orange" },
  { title: "Decision", sub: "Deliver / flag / hold", icon: ShieldCheck, tone: "indigo" }
];

export default function Pipeline({ isProcessing }) {
  return <section className="panel pipeline-panel">
    <div className="section-heading"><h2>Processing Pipeline</h2><span className={`live-dot ${isProcessing ? "active" : ""}`} />{isProcessing ? "Processing" : "Ready"}</div>
    <div className="pipeline">
      {steps.map(({ title, sub, icon: Icon, tone }, i) => (
        <div className="pipeline-wrap" key={title}>
          <div className={`pipeline-step ${isProcessing ? "working" : ""}`}>
            <Icon className={tone} size={25} />
            <strong>{title}</strong><span>{sub}</span>
          </div>
          {i < steps.length - 1 && <span className="pipeline-arrow">→</span>}
        </div>
      ))}
    </div>
  </section>;
}