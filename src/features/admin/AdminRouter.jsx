import AdminInicio from "./pages/AdminInicio.jsx";
import AdminSolicitudes from "./pages/AdminSolicitudes.jsx";
import RevisionSolicitud from "./pages/RevisionSolicitud.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import AdminMensajes from "./pages/AdminMensajes.jsx";
import JsonPanel from "./pages/JsonPanel.jsx";

export default function AdminRouter(props) {
  if (props.route === "/admin/solicitudes") return <AdminSolicitudes {...props} />;
  if (props.route.startsWith("/admin/revision/")) return <RevisionSolicitud {...props} />;
  if (props.route === "/admin/usuarios") return <Usuarios {...props} />;
  if (props.route === "/admin/mensajes") return <AdminMensajes {...props} />;
  if (props.route === "/admin/json") return <JsonPanel {...props} />;
  return <AdminInicio {...props} />;
}
