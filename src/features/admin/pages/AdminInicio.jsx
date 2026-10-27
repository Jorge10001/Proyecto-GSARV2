import PageHeader from "../../../components/common/PageHeader.jsx";
import Metric from "../../../components/common/Metric.jsx";
import { routeTo } from "../../../utils/routing.js";

const STEPS = [
  {
    icon: "fa-user-plus",
    title: "Registro de usuarios",
    text: "Alta y control de perfiles institucionales.",
  },
  {
    icon: "fa-file-signature",
    title: "Envío de solicitud",
    text: "El empleado presenta su requerimiento y evidencias.",
  },
  {
    icon: "fa-magnifying-glass-chart",
    title: "Revisión documental",
    text: "Talento Humano valida la información adjunta.",
  },
  {
    icon: "fa-circle-check",
    title: "Resolución final",
    text: "Se registra la aprobación, observación o rechazo.",
  },
];

export default function AdminInicio({ usuarios, solicitudes, mensajes }) {
  const pendientes = solicitudes.filter((item) => item.estado === "Pendiente").length;
  const aprobadas = solicitudes.filter((item) => item.estado === "Aprobada").length;
  const rechazadas = solicitudes.filter((item) => item.estado === "Rechazada").length;
  const total = solicitudes.length;
  const tasaAprobacion = total ? Math.round((aprobadas / total) * 100) : 0;

  return (
    <>
      <PageHeader
        title="Panel administrativo"
        text="Control del proceso de ascensos y recategorizaciones."
        actions={
          <button
            className="secondary-button"
            type="button"
            onClick={() => routeTo("/admin/solicitudes")}
          >
            <i className="fa-solid fa-arrow-right-long" aria-hidden="true"></i>
            Ver solicitudes
          </button>
        }
      />

      <section className="metric-grid" aria-label="Indicadores generales">
        <Metric
          icon="fa-users"
          label="Usuarios"
          value={usuarios.length}
          hint="Total registrados"
          tone="neutral"
        />
        <Metric
          icon="fa-clock"
          label="Pendientes"
          value={pendientes}
          hint="Requieren atención"
          tone="warning"
        />
        <Metric
          icon="fa-circle-check"
          label="Aprobadas"
          value={aprobadas}
          hint="Procesos resueltos"
          tone="success"
        />
        <Metric
          icon="fa-envelope"
          label="Mensajes"
          value={mensajes.length}
          hint="Consultas recibidas"
          tone="brand"
        />
      </section>

      <div className="dashboard-grid">
        <section className="content-band" aria-labelledby="flujo-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Proceso</span>
              <h2 id="flujo-title">Flujo del sistema</h2>
            </div>
            <span className="section-note">4 etapas</span>
          </div>

          <div className="process-grid">
            {STEPS.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="step-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <i className={`fa-solid ${step.icon}`} aria-hidden="true"></i>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="content-band insight-panel" aria-labelledby="estado-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Resumen</span>
              <h2 id="estado-title">Estado de atención</h2>
            </div>
          </div>

          <div className="insight-list">
            <div className="insight-row">
              <span>Pendientes</span>
              <strong>{pendientes}</strong>
            </div>
            <div className="insight-row">
              <span>Aprobadas</span>
              <strong>{aprobadas}</strong>
            </div>
            <div className="insight-row">
              <span>Rechazadas</span>
              <strong>{rechazadas}</strong>
            </div>
          </div>

          <div>
            <div
              className="progress"
              role="img"
              aria-label={`${tasaAprobacion}% de solicitudes aprobadas`}
            >
              <span style={{ width: `${tasaAprobacion}%` }}></span>
            </div>
            <p className="progress-note">
              {tasaAprobacion}% de las solicitudes registradas están aprobadas.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
