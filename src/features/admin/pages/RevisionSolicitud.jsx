function RevisionSolicitud({ route, solicitudes, setSolicitudes }) {
  const id = route.split("/").pop();
  const solicitud = solicitudes.find((item) => item.id === id);
  const [observacion, setObservacion] = useState("");

  if (!solicitud) {
    return (
      <>
        <PageHeader title="Solicitud no encontrada" text="El registro ya no existe en el almacenamiento local." />
        <button className="secondary-button" onClick={() => routeTo("/admin/solicitudes")}>Volver</button>
      </>
    );
  }

  function updateEstado(estado) {
    const next = solicitudes.map((item) =>
      item.id === solicitud.id ? { ...item, estado, observacion, fechaRevision: today() } : item
    );
    setSolicitudes(next);
    routeTo("/admin/solicitudes");
  }

  return (
    <>
      <PageHeader title="Revisión de solicitud" text="Validación administrativa de evidencia y justificación." />
      <section className="review-panel">
        <button className="secondary-button" onClick={() => routeTo("/admin/solicitudes")}>
          <i className="fa-solid fa-arrow-left"></i>
          Volver
        </button>
        <div className="review-header">
          <div>
            <h2>{solicitud.solicitante}</h2>
            <p>{solicitud.correo}</p>
          </div>
          <StatusBadge value={solicitud.estado} />
        </div>
        <div className="review-grid">
          <span><strong>Cargo actual</strong>{solicitud.cargoActual}</span>
          <span><strong>Cargo solicitado</strong>{solicitud.cargoSolicitado}</span>
          <span><strong>Tipo</strong>{solicitud.tipo}</span>
          <span><strong>Fecha</strong>{solicitud.fecha}</span>
        </div>
        <div className="evidence-box">
          <strong>Justificación</strong>
          <p>{solicitud.justificacion}</p>
          <a href={solicitud.evidencia} target="_blank" rel="noreferrer">Abrir evidencias</a>
        </div>
        <label className="observation-field">
          Observación de revisión
          <textarea rows="4" value={observacion} onChange={(event) => setObservacion(event.target.value)} />
        </label>
        <div className="action-row">
          <button className="danger-button" onClick={() => updateEstado("Rechazada")}>Rechazar</button>
          <button className="warning-button" onClick={() => updateEstado("En revisión")}>Dejar en revisión</button>
          <button className="success-button" onClick={() => updateEstado("Aprobada")}>Aprobar</button>
        </div>
      </section>
    </>
  );
}
