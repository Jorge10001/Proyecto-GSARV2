import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import FieldError from "../../../components/common/FieldError.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import { getInitials, today, uid } from "../../../utils/format.js";

export default function Contacto({ sesion, mensajes, setMensajes }) {
  const [form, setForm] = useState({ asunto: "", texto: "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const misMensajes = mensajes.filter((item) => item.correo === sesion.correo).reverse();

  function submit(event) {
    event.preventDefault();
    setSaved(false);
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
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        title="Contacto"
        text="Envíe consultas a Talento Humano y revise su historial."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-comments" aria-hidden="true"></i>
            {misMensajes.length} mensajes
          </span>
        }
      />

      <section className="two-column">
        <form className="form-surface data-form" onSubmit={submit} noValidate>
          <div className="form-surface-header">
            <div>
              <span className="eyebrow">Nueva consulta</span>
              <h2>Escriba a Talento Humano</h2>
              <p>Su mensaje quedará registrado en el historial de la demo.</p>
            </div>
          </div>

          {saved && (
            <div className="success-alert" role="status">
              <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
              <span>Mensaje enviado correctamente. Consulte el historial para ver su estado.</span>
            </div>
          )}

          <label htmlFor="contacto-asunto">
            Asunto
            <input
              id="contacto-asunto"
              value={form.asunto}
              placeholder="Ej: Consulta sobre requisitos"
              aria-invalid={errors.asunto ? "true" : undefined}
              aria-describedby={errors.asunto ? "contacto-asunto-error" : undefined}
              onChange={(event) => setForm({ ...form, asunto: event.target.value })}
            />
            <FieldError id="contacto-asunto-error" message={errors.asunto} />
          </label>

          <label htmlFor="contacto-mensaje">
            Mensaje
            <textarea
              id="contacto-mensaje"
              rows="6"
              value={form.texto}
              placeholder="Describa su consulta con el mayor detalle posible."
              aria-invalid={errors.texto ? "true" : undefined}
              aria-describedby={errors.texto ? "contacto-mensaje-error" : undefined}
              onChange={(event) => setForm({ ...form, texto: event.target.value })}
            />
            <FieldError id="contacto-mensaje-error" message={errors.texto} />
          </label>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              Enviar mensaje
            </button>
          </div>
        </form>

        <section className="content-band" aria-labelledby="historial-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Historial</span>
              <h2 id="historial-title">Consultas enviadas</h2>
            </div>
            <span className="section-note">{misMensajes.length} registros</span>
          </div>

          {misMensajes.length === 0 ? (
            <EmptyState
              icon="fa-comment-dots"
              title="Sin mensajes"
              text="Sus consultas aparecerán en esta sección."
            />
          ) : (
            <div className="message-list">
              {misMensajes.map((item) => (
                <article key={item.id}>
                  <div className="message-list-head">
                    <span className="message-avatar small" aria-hidden="true">
                      {getInitials(item.remitente)}
                    </span>
                    <div>
                      <strong>{item.asunto}</strong>
                      <span>{item.fecha}</span>
                    </div>
                    <StatusBadge value={item.estado} />
                  </div>
                  <p>{item.texto}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </>
  );
}
