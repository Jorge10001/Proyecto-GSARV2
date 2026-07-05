function AdminMensajes({ mensajes, setMensajes }) {
  function responder(id) {
    setMensajes(mensajes.map((item) => (item.id === id ? { ...item, estado: "Respondido" } : item)));
  }

  return (
    <>
      <PageHeader title="Mensajes" text="Consultas recibidas desde el portal del empleado." />
      <section className="list-stack">
        {mensajes.length === 0 ? (
          <EmptyState title="Sin mensajes" text="No hay consultas registradas." />
        ) : (
          mensajes.map((item) => (
            <article className="message-row" key={item.id}>
              <div>
                <span>{item.fecha} · {item.remitente}</span>
                <h3>{item.asunto}</h3>
                <p>{item.texto}</p>
              </div>
              <div>
                <StatusBadge value={item.estado} />
                <button className="secondary-button" onClick={() => responder(item.id)}>Marcar respondido</button>
              </div>
            </article>
          ))
        )}
      </section>
    </>
  );
}
