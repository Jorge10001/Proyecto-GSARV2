export default function PageHeader({
  title,
  text,
  eyebrow = "GSAR · Talento Humano",
  actions,
}) {
  return (
    <header className="page-header">
      <div className="page-heading">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}
