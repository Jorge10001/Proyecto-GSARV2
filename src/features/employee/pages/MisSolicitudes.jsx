import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";

export default function MisSolicitudes({ sesion, solicitudes }) {
  const misSolicitudes = solicitudes.filter((item) => item.correo === sesion.correo).reverse();

  return (
    <>
      <PageHeader
        title="Mis solicitudes"
        text="Seguimiento de procesos enviados a Talento Humano."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-list-check" aria-hidden="true"></i>
            {misSolicitudes.length} registros
          </span>
        }
      />

      <section className="list-stack" aria-label="Mis solicitudes registradas">
        {misSolicitudes.length === 0 ? (
          <EmptyState
            icon="fa-file-circle-plus"
            title="Sin registros"
            text="No tiene solicitudes guardadas todavía."
          />
        ) : (
          misSolicitudes.map((item) => (
            <article className="request-item" key={item.id}>
              <div className="request-main">
                <div className="request-meta">
                  <span>
                    <i className="fa-solid fa-hashtag" aria-hidden="true"></i>
                    {item.id}
                  </span>
                  <span>
                    <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                    {item.fecha}
                  </span>
                  <span>
                    <i className="fa-solid fa-tag" aria-hidden="true"></i>
                    {item.tipo}
                  </span>
                </div>
                <h2>{item.cargoSolicitado}</h2>
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
