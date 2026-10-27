import PageHeader from "../../../components/common/PageHeader.jsx";
import Metric from "../../../components/common/Metric.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import { routeTo } from "../../../utils/routing.js";

export default function EmpleadoInicio({ sesion, solicitudes }) {
  const misSolicitudes = solicitudes.filter((item) => item.correo === sesion.correo);
  const ultima = misSolicitudes[misSolicitudes.length - 1];
  const nombreCorto = sesion.nombre.trim().split(/\s+/)[0];

  return (
    <>
      <PageHeader
        title="Portal del empleado"
        text="Presente y consulte sus solicitudes institucionales."
        actions={
          <button
            className="primary-button"
            type="button"
            onClick={() => routeTo("/empleado/nueva")}
          >
            <i className="fa-solid fa-plus" aria-hidden="true"></i>
            Nueva solicitud
          </button>
        }
      />

      <section className="welcome-banner" aria-label="Resumen de la sesión">
        <div>
          <span className="eyebrow">Sesión activa</span>
          <h2>Hola, {nombreCorto}</h2>
          <p>Consulte el estado de sus procesos y prepare su próxima solicitud.</p>
        </div>
        <div className="welcome-actions">
          <span className="session-chip">
            <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
            {sesion.cargo}
          </span>
          <span className="session-chip">
            <i className="fa-solid fa-building" aria-hidden="true"></i>
            {sesion.departamento}
          </span>
        </div>
      </section>

      <section className="metric-grid metric-grid--three" aria-label="Resumen personal">
        <Metric
          icon="fa-file-signature"
          label="Mis solicitudes"
          value={misSolicitudes.length}
          hint="Registros enviados"
          tone="brand"
        />
        <Metric
          icon="fa-user-tie"
          label="Cargo actual"
          value={sesion.cargo}
          hint="Perfil institucional"
          tone="neutral"
        />
        <Metric
          icon="fa-building"
          label="Departamento"
          value={sesion.departamento}
          hint="Unidad de adscripción"
          tone="neutral"
        />
      </section>

      <section className="content-band" aria-labelledby="ultimo-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Seguimiento</span>
            <h2 id="ultimo-title">Último movimiento</h2>
          </div>
          {ultima && <span className="section-note">{ultima.fecha}</span>}
        </div>

        {ultima ? (
          <div className="detail-row">
            <span>{ultima.tipo}</span>
            <strong>{ultima.cargoSolicitado}</strong>
            <StatusBadge value={ultima.estado} />
          </div>
        ) : (
          <EmptyState
            icon="fa-file-circle-plus"
            title="Aún no hay solicitudes"
            text="Cree una solicitud para iniciar el proceso."
          />
        )}
      </section>
    </>
  );
}
