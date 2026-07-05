function AdminRouter(props) {
  if (props.route === "/admin/solicitudes") return <AdminSolicitudes {...props} />;
  if (props.route.startsWith("/admin/revision/")) return <RevisionSolicitud {...props} />;
  if (props.route === "/admin/usuarios") return <Usuarios {...props} />;
  if (props.route === "/admin/mensajes") return <AdminMensajes {...props} />;
  if (props.route === "/admin/json") return <JsonPanel {...props} />;
  return <AdminInicio {...props} />;
}
