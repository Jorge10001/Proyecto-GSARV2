function Requisitos() {
  return (
    <>
      <PageHeader title="Requisitos" text="Documentos sugeridos para respaldar la solicitud." />
      <section className="content-band">
        <div className="requirements-grid">
          <Requirement icon="fa-id-card" title="Datos personales" text="Información institucional actualizada y cargo vigente." />
          <Requirement icon="fa-graduation-cap" title="Formación" text="Títulos, certificados y cursos relacionados con el cargo." />
          <Requirement icon="fa-briefcase" title="Experiencia" text="Funciones, responsabilidades y evidencias de desempeño." />
          <Requirement icon="fa-link" title="Repositorio" text="Enlace público o compartido con permisos de lectura." />
        </div>
      </section>
    </>
  );
}

function Requirement({ icon, title, text }) {
  return (
    <article className="requirement">
      <i className={`fa-solid ${icon}`}></i>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
