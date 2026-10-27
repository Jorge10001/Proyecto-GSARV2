export default function Metric({ icon, label, value }) {
  return (
    <article className="metric">
      <i className={`fa-solid ${icon}`}></i>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
