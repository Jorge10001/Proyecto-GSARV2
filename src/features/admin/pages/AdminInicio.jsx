function AdminInicio({ usuarios, solicitudes, mensajes }) {
  const pendientes = solicitudes.filter((item) => item.estado === "Pendiente").length;
  const aprobadas = solicitudes.filter((item) => item.estado === "Aprobada").length;

  return (
    <>
      <PageHeader title="Panel administrativo" text="Control del proceso de ascensos y recategorizaciones." />
      <section className="metric-grid">
        <Metric icon="fa-users" label="Usuarios" value={usuarios.length} />
        <Metric icon="fa-clock" label="Pendientes" value={pendientes} />
        <Metric icon="fa-circle-check" label="Aprobadas" value={aprobadas} />
        <Metric icon="fa-envelope" label="Mensajes" value={mensajes.length} />
      </section>
      <section className="content-band">
        <h2>Flujo del sistema</h2>
        <div className="process-grid">
          <span>1. Registro de usuarios</span>
          <span>2. Envío de solicitud</span>
          <span>3. Revisión documental</span>
          <span>4. Resolución final</span>
        </div>
      </section>
    </>
  );
}
