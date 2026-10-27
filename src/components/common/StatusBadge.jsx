export default function StatusBadge({ value }) {
  const normalized = String(value ?? "").toLowerCase().replace(" ", "-");
  return <span className={`status-badge ${normalized}`}>{value}</span>;
}
