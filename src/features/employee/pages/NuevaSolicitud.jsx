function NuevaSolicitud({ sesion, solicitudes, setSolicitudes }) {
  const [form, setForm] = useState({
    tipo: "Ascenso",
    cargoSolicitado: "",
    justificacion: "",
    evidencia: "",
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!form.cargoSolicitado.trim() || form.cargoSolicitado.trim().length < 5) {
      nextErrors.cargoSolicitado = "Ingrese el cargo o categoría solicitada.";
    }
    if (form.justificacion.trim().length < 30) {
      nextErrors.justificacion = "La justificación debe tener mínimo 30 caracteres.";
    }
    if (!/^https?:\/\/.+\..+/.test(form.evidencia.trim())) {
      nextErrors.evidencia = "Ingrese un enlace válido de documentos.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nuevaSolicitud = {
      id: uid("SOL"),
      solicitante: sesion.nombre,
      correo: sesion.correo,
      cargoActual: sesion.cargo,
      departamento: sesion.departamento,
      tipo: form.tipo,
      cargoSolicitado: form.cargoSolicitado.trim(),
      justificacion: form.justificacion.trim(),
      evidencia: form.evidencia.trim(),
      fecha: today(),
      estado: "Pendiente",
    };

    setSolicitudes([...solicitudes, nuevaSolicitud]);
    setForm({ tipo: "Ascenso", cargoSolicitado: "", justificacion: "", evidencia: "" });
    setSaved(true);
  }

  return (
    <>
      <PageHeader title="Nueva solicitud" text="Complete la información y adjunte el enlace de evidencias." />
      <section className="form-surface">
        {saved && <div className="success-alert">Solicitud registrada correctamente en localStorage.</div>}
        <div className="applicant-grid">
          <div>
            <span>Solicitante</span>
            <strong>{sesion.nombre}</strong>
          </div>
          <div>
            <span>Correo</span>
            <strong>{sesion.correo}</strong>
          </div>
          <div>
            <span>Cargo actual</span>
            <strong>{sesion.cargo}</strong>
          </div>
        </div>
        <form className="data-form" onSubmit={submit} noValidate>
          <label>
            Tipo de solicitud
            <select value={form.tipo} onChange={(event) => setForm({ ...form, tipo: event.target.value })}>
              {tiposSolicitud.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </label>
          <label>
            Cargo o categoría solicitada
            <input
              value={form.cargoSolicitado}
              placeholder="Ej: Analista de Sistemas SP5"
              onChange={(event) => setForm({ ...form, cargoSolicitado: event.target.value })}
            />
            <FieldError message={errors.cargoSolicitado} />
          </label>
          <label>
            Justificación
            <textarea
              rows="5"
              value={form.justificacion}
              placeholder="Describa méritos, experiencia, formación y logros relevantes."
              onChange={(event) => setForm({ ...form, justificacion: event.target.value })}
            />
            <FieldError message={errors.justificacion} />
          </label>
          <label>
            Enlace de evidencias
            <input
              value={form.evidencia}
              placeholder="https://drive.google.com/..."
              onChange={(event) => setForm({ ...form, evidencia: event.target.value })}
            />
            <FieldError message={errors.evidencia} />
          </label>
          <button className="primary-button" type="submit">
            <i className="fa-solid fa-paper-plane"></i>
            Enviar solicitud
          </button>
        </form>
      </section>
    </>
  );
}
