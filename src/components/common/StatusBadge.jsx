function StatusBadge({ value }) {
  const normalized = value.toLowerCase().replace(" ", "-");
  return <span className={`status-badge ${normalized}`}>{value}</span>;
}
