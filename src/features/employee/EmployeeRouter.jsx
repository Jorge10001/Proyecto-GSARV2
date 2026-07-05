function EmployeeRouter(props) {
  if (props.route === "/empleado/requisitos") return <Requisitos />;
  if (props.route === "/empleado/nueva") return <NuevaSolicitud {...props} />;
  if (props.route === "/empleado/mis-solicitudes") return <MisSolicitudes {...props} />;
  if (props.route === "/empleado/contacto") return <Contacto {...props} />;
  return <EmpleadoInicio {...props} />;
}
