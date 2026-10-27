import EmpleadoInicio from "./pages/EmpleadoInicio.jsx";
import NuevaSolicitud from "./pages/NuevaSolicitud.jsx";
import MisSolicitudes from "./pages/MisSolicitudes.jsx";
import Requisitos from "./pages/Requisitos.jsx";
import Contacto from "./pages/Contacto.jsx";

export default function EmployeeRouter(props) {
  if (props.route === "/empleado/requisitos") return <Requisitos />;
  if (props.route === "/empleado/nueva") return <NuevaSolicitud {...props} />;
  if (props.route === "/empleado/mis-solicitudes") return <MisSolicitudes {...props} />;
  if (props.route === "/empleado/contacto") return <Contacto {...props} />;
  return <EmpleadoInicio {...props} />;
}
