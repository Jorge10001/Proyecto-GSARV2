export default function EmptyState({ title, text, icon = "fa-inbox" }) {
  return (
    <div className="empty-state">
      <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
