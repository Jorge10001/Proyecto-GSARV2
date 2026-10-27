import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";

export default function MisSolicitudes({ sesion, solicitudes }) {
  const misSolicitudes = solicitudes.filter((item) => item.correo === sesion.correo).reverse();

  return (
    <>
      <PageHeader title="Mis solicitudes" text="Seguimiento de procesos enviados a Talento Humano." />
      <section className="list-stack">
        {misSolicitudes.length === 0 ? (
          <EmptyState title="Sin registros" text="No tiene solicitudes guardadas todavía." />
        ) : (
          misSolicitudes.map((item) => (
            <article className="request-item" key={item.id}>
              <div>
                <span>{item.id} · {item.fecha}</span>
                <h3>{item.tipo}: {item.cargoSolicitado}</h3>
                <p>{item.justificacion}</p>
              </div>
              <StatusBadge value={item.estado} />
            </article>
          ))
        )}
      </section>
    </>
  );
}
