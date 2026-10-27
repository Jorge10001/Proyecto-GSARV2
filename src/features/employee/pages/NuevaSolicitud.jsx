import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import FieldError from "../../../components/common/FieldError.jsx";
import { tiposSolicitud } from "../../../data/seedData.js";
import { today, uid } from "../../../utils/format.js";
import { routeTo } from "../../../utils/routing.js";
import { isSafeHttpUrl } from "../../../utils/validation.js";

export default function NuevaSolicitud({ sesion, solicitudes, setSolicitudes }) {
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
    setSaved(false);
    const nextErrors = {};

    if (!form.cargoSolicitado.trim() || form.cargoSolicitado.trim().length < 5) {
      nextErrors.cargoSolicitado = "Ingrese el cargo o categoría solicitada.";
    }
    if (form.justificacion.trim().length < 30) {
      nextErrors.justificacion = "La justificación debe tener mínimo 30 caracteres.";
    }
    if (!isSafeHttpUrl(form.evidencia.trim())) {
      nextErrors.evidencia = "Ingrese un enlace HTTP o HTTPS válido de documentos.";
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
      <PageHeader
        title="Nueva solicitud"
        text="Complete la información y adjunte el enlace de evidencias."
        actions={
          <button
            className="secondary-button"
            type="button"
            onClick={() => routeTo("/empleado/mis-solicitudes")}
          >
            <i className="fa-solid fa-list-check" aria-hidden="true"></i>
            Mis solicitudes
          </button>
        }
      />

      <section className="form-surface" aria-labelledby="nueva-solicitud-title">
        <div className="form-surface-header">
          <div>
            <span className="eyebrow">Registro de solicitud</span>
            <h2 id="nueva-solicitud-title">Datos del proceso</h2>
            <p>La solicitud quedará pendiente de revisión por Talento Humano.</p>
          </div>
        </div>

        {saved && (
          <div className="success-alert" role="status">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <span>Solicitud registrada correctamente en el almacenamiento local de la demo.</span>
          </div>
        )}

        <div className="applicant-grid">
          <div className="applicant-card">
            <span>Solicitante</span>
            <strong>{sesion.nombre}</strong>
          </div>
          <div className="applicant-card">
            <span>Correo</span>
            <strong>{sesion.correo}</strong>
          </div>
          <div className="applicant-card">
            <span>Cargo actual</span>
            <strong>{sesion.cargo}</strong>
          </div>
        </div>

        <form className="data-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            <label htmlFor="tipo-solicitud">
              Tipo de solicitud
              <select
                id="tipo-solicitud"
                value={form.tipo}
                onChange={(event) => setForm({ ...form, tipo: event.target.value })}
              >
                {tiposSolicitud.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="cargo-solicitado">
              Cargo o categoría solicitada
              <input
                id="cargo-solicitado"
                value={form.cargoSolicitado}
                placeholder="Ej: Analista de Sistemas SP5"
                aria-invalid={errors.cargoSolicitado ? "true" : undefined}
                aria-describedby={errors.cargoSolicitado ? "cargo-solicitado-error" : undefined}
                onChange={(event) => setForm({ ...form, cargoSolicitado: event.target.value })}
              />
              <FieldError id="cargo-solicitado-error" message={errors.cargoSolicitado} />
            </label>
          </div>

          <label htmlFor="justificacion">
            Justificación
            <textarea
              id="justificacion"
              rows="5"
              value={form.justificacion}
              placeholder="Describa méritos, experiencia, formación y logros relevantes."
              aria-invalid={errors.justificacion ? "true" : undefined}
              aria-describedby={errors.justificacion ? "justificacion-error" : undefined}
              onChange={(event) => setForm({ ...form, justificacion: event.target.value })}
            />
            <FieldError id="justificacion-error" message={errors.justificacion} />
          </label>

          <label htmlFor="evidencia">
            Enlace de evidencias
            <input
              id="evidencia"
              value={form.evidencia}
              placeholder="https://drive.google.com/..."
              aria-invalid={errors.evidencia ? "true" : undefined}
              aria-describedby={
                errors.evidencia ? "evidencia-error evidencia-help" : "evidencia-help"
              }
              onChange={(event) => setForm({ ...form, evidencia: event.target.value })}
            />
            <FieldError id="evidencia-error" message={errors.evidencia} />
            <small id="evidencia-help" className="field-help">
              Use un enlace HTTP o HTTPS con permisos de lectura.
            </small>
          </label>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
              Enviar solicitud
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
