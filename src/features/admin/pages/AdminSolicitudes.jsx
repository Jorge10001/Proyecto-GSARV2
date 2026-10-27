import PageHeader from "../../../components/common/PageHeader.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import { routeTo } from "../../../utils/routing.js";

export default function AdminSolicitudes({ solicitudes }) {
  return (
    <>
      <PageHeader
        title="Gestión de solicitudes"
        text="Revise, filtre y procese solicitudes registradas."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
            {solicitudes.length} registros
          </span>
        }
      />

      <section className="table-shell" aria-label="Solicitudes registradas">
        <table>
          <caption className="sr-only">Listado de solicitudes registradas</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Empleado</th>
              <th scope="col">Proceso</th>
              <th scope="col">Fecha</th>
              <th scope="col">Estado</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="table-empty">
                    <i className="fa-solid fa-folder-open" aria-hidden="true"></i>
                    <strong>Sin solicitudes</strong>
                    <span>Los nuevos registros aparecerán en esta tabla.</span>
                  </div>
                </td>
              </tr>
            ) : (
              solicitudes.map((item) => (
                <tr key={item.id}>
                  <td data-label="ID">
                    <span className="cell-id">{item.id}</span>
                  </td>
                  <td data-label="Empleado">
                    <span className="cell-primary">{item.solicitante}</span>
                  </td>
                  <td data-label="Proceso">{item.tipo}</td>
                  <td data-label="Fecha">
                    <span className="cell-muted">{item.fecha}</span>
                  </td>
                  <td data-label="Estado">
                    <StatusBadge value={item.estado} />
                  </td>
                  <td data-label="Acción">
                    <div className="row-actions">
                      <button
                        className="icon-button"
                        type="button"
                        title="Revisar solicitud"
                        aria-label={`Revisar solicitud ${item.id}`}
                        onClick={() => routeTo(`/admin/revision/${item.id}`)}
                      >
                        <i className="fa-solid fa-eye" aria-hidden="true"></i>
                      </button>
                    </div>
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
