export default function Metric({ icon, label, value, hint, tone = "brand" }) {
  return (
    <article className={`metric metric--${tone}`}>
      <div className="metric-icon">
        <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
      </div>
      <div className="metric-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        {hint && <small>{hint}</small>}
      </div>
    </article>
  );
}
