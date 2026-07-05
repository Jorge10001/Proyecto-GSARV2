function Contacto({ sesion, mensajes, setMensajes }) {
  const [form, setForm] = useState({ asunto: "", texto: "" });
  const [errors, setErrors] = useState({});
  const misMensajes = mensajes.filter((item) => item.correo === sesion.correo).reverse();

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (form.asunto.trim().length < 5) nextErrors.asunto = "El asunto debe tener mínimo 5 caracteres.";
    if (form.texto.trim().length < 15) nextErrors.texto = "El mensaje debe tener mínimo 15 caracteres.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setMensajes([
      ...mensajes,
      {
        id: uid("MSG"),
        remitente: sesion.nombre,
        correo: sesion.correo,
        asunto: form.asunto.trim(),
        texto: form.texto.trim(),
        fecha: today(),
        estado: "Pendiente",
      },
    ]);
    setForm({ asunto: "", texto: "" });
  }

  return (
    <>
      <PageHeader title="Contacto" text="Envíe consultas a Talento Humano y revise su historial." />
      <section className="two-column">
        <form className="form-surface data-form" onSubmit={submit} noValidate>
          <label>
            Asunto
            <input value={form.asunto} onChange={(event) => setForm({ ...form, asunto: event.target.value })} />
            <FieldError message={errors.asunto} />
          </label>
          <label>
            Mensaje
            <textarea rows="6" value={form.texto} onChange={(event) => setForm({ ...form, texto: event.target.value })} />
            <FieldError message={errors.texto} />
          </label>
          <button className="primary-button" type="submit">
            <i className="fa-solid fa-envelope"></i>
            Enviar mensaje
          </button>
        </form>
        <section className="content-band">
          <h2>Historial</h2>
          {misMensajes.length === 0 ? (
            <EmptyState title="Sin mensajes" text="Sus consultas aparecerán en esta sección." />
          ) : (
            <div className="message-list">
              {misMensajes.map((item) => (
                <article key={item.id}>
                  <strong>{item.asunto}</strong>
                  <span>{item.fecha}</span>
                  <p>{item.texto}</p>
                  <StatusBadge value={item.estado} />
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </>
  );
}
