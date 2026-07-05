function AdminSolicitudes({ solicitudes }) {
  return (
    <>
      <PageHeader title="Gestión de solicitudes" text="Revise, filtre y procese solicitudes registradas." />
      <section className="table-shell">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Empleado</th>
              <th>Proceso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr><td colSpan="6">No hay solicitudes registradas.</td></tr>
            ) : (
              solicitudes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.solicitante}</td>
                  <td>{item.tipo}</td>
                  <td>{item.fecha}</td>
                  <td><StatusBadge value={item.estado} /></td>
                  <td>
                    <button className="icon-button" title="Revisar solicitud" onClick={() => routeTo(`/admin/revision/${item.id}`)}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
