import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import { getInitials, today } from "../../../utils/format.js";
import { routeTo } from "../../../utils/routing.js";
import { isSafeHttpUrl } from "../../../utils/validation.js";

export default function RevisionSolicitud({ route, solicitudes, setSolicitudes }) {
  const id = route.split("/").pop();
  const solicitud = solicitudes.find((item) => item.id === id);
  const [observacion, setObservacion] = useState("");

  if (!solicitud) {
    return (
      <>
        <PageHeader
          title="Solicitud no encontrada"
          text="El registro ya no existe en el almacenamiento local."
          actions={
            <button
              className="secondary-button"
              type="button"
              onClick={() => routeTo("/admin/solicitudes")}
            >
              <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
              Volver
            </button>
          }
        />
        <EmptyState
          icon="fa-file-circle-xmark"
          title="Registro no disponible"
          text="Puede volver al listado y seleccionar otra solicitud."
        />
      </>
    );
  }

  const evidenciaSegura = isSafeHttpUrl(solicitud.evidencia) ? solicitud.evidencia : "";

  function updateEstado(estado) {
    if (
      estado === "Rechazada" &&
      !window.confirm("¿Rechazar esta solicitud? El estado se actualizará en la demo.")
    ) {
      return;
    }

    const next = solicitudes.map((item) =>
      item.id === solicitud.id ? { ...item, estado, observacion, fechaRevision: today() } : item
    );
    setSolicitudes(next);
    routeTo("/admin/solicitudes");
  }

  return (
    <>
      <PageHeader
        title="Revisión de solicitud"
        text="Validación administrativa de evidencia y justificación."
        actions={
          <button
            className="secondary-button"
            type="button"
            onClick={() => routeTo("/admin/solicitudes")}
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            Volver
          </button>
        }
      />

      <section className="review-panel" aria-labelledby="review-title">
        <div className="review-header">
          <div className="review-person">
            <span className="review-avatar" aria-hidden="true">
              {getInitials(solicitud.solicitante)}
            </span>
            <div>
              <h2 id="review-title">{solicitud.solicitante}</h2>
              <p>{solicitud.correo}</p>
            </div>
          </div>
          <StatusBadge value={solicitud.estado} />
        </div>

        <div className="review-grid">
          <div className="review-card">
            <span>Cargo actual</span>
            <strong>{solicitud.cargoActual}</strong>
          </div>
          <div className="review-card">
            <span>Cargo solicitado</span>
            <strong>{solicitud.cargoSolicitado}</strong>
          </div>
          <div className="review-card">
            <span>Tipo</span>
            <strong>{solicitud.tipo}</strong>
          </div>
          <div className="review-card">
            <span>Fecha</span>
            <strong>{solicitud.fecha}</strong>
          </div>
        </div>

        <div className="evidence-box">
          <strong>
            <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
            Justificación
          </strong>
          <p>{solicitud.justificacion}</p>
          {evidenciaSegura ? (
            <a href={evidenciaSegura} target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              Abrir evidencias
            </a>
          ) : (
            <span className="field-error">Enlace de evidencia inválido o no seguro.</span>
          )}
        </div>

        <label className="observation-field">
          Observación de revisión
          <textarea
            rows="4"
            value={observacion}
            placeholder="Registre una observación para el solicitante (opcional)."
            onChange={(event) => setObservacion(event.target.value)}
          />
          <small className="field-help">
            Opcional. Se guardará junto con la resolución de la solicitud.
          </small>
        </label>

        <div className="action-row">
          <button className="danger-button" type="button" onClick={() => updateEstado("Rechazada")}>
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            Rechazar
          </button>
          <button
            className="warning-button"
            type="button"
            onClick={() => updateEstado("En revisión")}
          >
            <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i>
            Dejar en revisión
          </button>
          <button className="success-button" type="button" onClick={() => updateEstado("Aprobada")}>
            <i className="fa-solid fa-check" aria-hidden="true"></i>
            Aprobar
          </button>
        </div>
      </section>
    </>
  );
}
