import PageHeader from "../../../components/common/PageHeader.jsx";
import EmptyState from "../../../components/common/EmptyState.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import { getInitials } from "../../../utils/format.js";

export default function AdminMensajes({ mensajes, setMensajes }) {
  function responder(id) {
    setMensajes(mensajes.map((item) => (item.id === id ? { ...item, estado: "Respondido" } : item)));
  }

  return (
    <>
      <PageHeader
        title="Mensajes"
        text="Consultas recibidas desde el portal del empleado."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-envelope-open-text" aria-hidden="true"></i>
            {mensajes.length} mensajes
          </span>
        }
      />

      <section className="list-stack" aria-label="Mensajes recibidos">
        {mensajes.length === 0 ? (
          <EmptyState
            icon="fa-inbox"
            title="Sin mensajes"
            text="No hay consultas registradas."
          />
        ) : (
          mensajes.map((item) => (
            <article className="message-row" key={item.id}>
              <span className="message-avatar" aria-hidden="true">
                {getInitials(item.remitente)}
              </span>

              <div className="message-body">
                <div className="request-meta">
                  <span>
                    <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                    {item.fecha}
                  </span>
                  <span>
                    <i className="fa-regular fa-user" aria-hidden="true"></i>
                    {item.remitente}
                  </span>
                </div>
                <h2>{item.asunto}</h2>
                <p>{item.texto}</p>
              </div>

              <div className="message-actions">
                <StatusBadge value={item.estado} />
                {item.estado !== "Respondido" && (
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => responder(item.id)}
                  >
                    <i className="fa-solid fa-check" aria-hidden="true"></i>
                    Marcar respondido
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}
