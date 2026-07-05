function AdminShell({ sesion, route, logout, children }) {
  const links = [
    ["/admin/inicio", "fa-gauge", "Inicio"],
    ["/admin/solicitudes", "fa-clipboard-list", "Solicitudes"],
    ["/admin/usuarios", "fa-users", "Usuarios"],
    ["/admin/mensajes", "fa-envelope", "Mensajes"],
    ["/admin/json", "fa-code", "JSON"],
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-title">
          <strong>GSAR</strong>
          <span>Talento Humano</span>
        </div>
        <div className="profile-box">
          <p>{sesion.nombre}</p>
          <span>{sesion.cargo}</span>
        </div>
        <nav>
          {links.map(([path, icon, label]) => (
            <button key={path} className={route === path ? "active" : ""} onClick={() => routeTo(path)}>
              <i className={`fa-solid ${icon}`}></i>
              {label}
            </button>
          ))}
        </nav>
        <button className="logout-button" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Cerrar sesión
        </button>
      </aside>
      <section className="workspace">{children}</section>
    </div>
  );
}
