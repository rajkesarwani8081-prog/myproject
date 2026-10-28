import { Mail, ShieldAlert, AlertTriangle, CheckCircle2 } from "lucide-react";

const cards = [
  { key: "total", label: "Total Processed", icon: Mail, tone: "blue" },
  { key: "quarantined", label: "Quarantined", icon: ShieldAlert, tone: "red" },
  { key: "flagged", label: "Flagged", icon: AlertTriangle, tone: "amber" },
  { key: "delivered", label: "Delivered", icon: CheckCircle2, tone: "green" }
];

export default function StatsCards({ stats }) {
  return <section className="stats-grid">
    {cards.map(({ key, label, icon: Icon, tone }) => (
      <article className="stat-card" key={key}>
        <div><p className="muted">{label}</p><strong className={`stat-number ${tone}`}>{stats[key]}</strong></div>
        <div className={`stat-icon ${tone}`}><Icon size={26} /></div>
      </article>
    ))}
  </section>;
}