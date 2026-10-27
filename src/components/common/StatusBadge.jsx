export default function StatusBadge({ value }) {
  const normalized = String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  return (
    <span className={`status-badge ${normalized}`}>
      <span className="status-dot" aria-hidden="true"></span>
      {value}
    </span>
  );
}
