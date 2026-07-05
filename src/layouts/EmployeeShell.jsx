function EmployeeShell({ sesion, route, logout, children }) {
  const links = [
    ["/empleado/inicio", "fa-house", "Inicio"],
    ["/empleado/requisitos", "fa-file-lines", "Requisitos"],
    ["/empleado/nueva", "fa-plus-circle", "Nueva solicitud"],
    ["/empleado/mis-solicitudes", "fa-list-check", "Mis solicitudes"],
    ["/empleado/contacto", "fa-envelope", "Contacto"],
  ];

  return (
    <div className="employee-layout">
      <header className="topbar">
        <div className="topbar-brand">
          <strong>ULEAM</strong>
          <span>GSAR</span>
        </div>
        <nav>
          {links.map(([path, icon, label]) => (
            <button key={path} className={route === path ? "active" : ""} onClick={() => routeTo(path)}>
              <i className={`fa-solid ${icon}`}></i>
              {label}
            </button>
          ))}
        </nav>
        <button className="logout-button compact" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Salir
        </button>
      </header>
      <main className="employee-main">
        <div className="session-strip">
          <span>{sesion.nombre}</span>
          <strong>{sesion.departamento}</strong>
        </div>
        {children}
      </main>
    </div>
  );
}
