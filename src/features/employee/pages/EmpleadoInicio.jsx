import PageHeader from "../../../components/common/PageHeader.jsx";
import Metric from "../../../components/common/Metric.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";

export default function EmpleadoInicio({ sesion, solicitudes }) {
  const misSolicitudes = solicitudes.filter((item) => item.correo === sesion.correo);
  const ultima = misSolicitudes[misSolicitudes.length - 1];

  return (
    <>
      <PageHeader title="Portal del empleado" text="Presente y consulte sus solicitudes institucionales." />
      <section className="metric-grid">
        <Metric icon="fa-file-signature" label="Mis solicitudes" value={misSolicitudes.length} />
        <Metric icon="fa-user-tie" label="Cargo actual" value={sesion.cargo} />
        <Metric icon="fa-building" label="Departamento" value={sesion.departamento} />
      </section>
      <section className="content-band">
        <h2>Último movimiento</h2>
        {ultima ? (
          <div className="detail-row">
            <span>{ultima.tipo}</span>
            <strong>{ultima.cargoSolicitado}</strong>
            <StatusBadge value={ultima.estado} />
          </div>
        ) : (
          <EmptyState title="Aún no hay solicitudes" text="Cree una solicitud para iniciar el proceso." />
        )}
      </section>
    </>
  );
}
