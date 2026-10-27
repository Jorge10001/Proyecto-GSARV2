import PageHeader from "../../../components/common/PageHeader.jsx";

const REQUIREMENTS = [
  {
    icon: "fa-id-card",
    title: "Datos personales",
    text: "Información institucional actualizada y cargo vigente.",
  },
  {
    icon: "fa-graduation-cap",
    title: "Formación",
    text: "Títulos, certificados y cursos relacionados con el cargo.",
  },
  {
    icon: "fa-briefcase",
    title: "Experiencia",
    text: "Funciones, responsabilidades y evidencias de desempeño.",
  },
  {
    icon: "fa-link",
    title: "Repositorio",
    text: "Enlace público o compartido con permisos de lectura.",
  },
];

export default function Requisitos() {
  return (
    <>
      <PageHeader
        title="Requisitos"
        text="Documentos sugeridos para respaldar la solicitud."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-list-check" aria-hidden="true"></i>
            4 categorías
          </span>
        }
      />

      <section className="content-band" aria-labelledby="requisitos-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Guía de preparación</span>
            <h2 id="requisitos-title">Documentos de respaldo</h2>
          </div>
          <span className="section-note">Revise antes de enviar</span>
        </div>

        <div className="requirements-grid">
          {REQUIREMENTS.map((item, index) => (
            <Requirement key={item.title} index={index + 1} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}

function Requirement({ icon, title, text, index }) {
  return (
    <article className="requirement">
      <div className="requirement-top">
        <span className="requirement-icon">
          <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
        </span>
        <span className="requirement-index" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
