import logoUrl from "../../assets/logos/uleam-logo-png_seeklogo-315386.png";
import { getInitials } from "../utils/format.js";
import { routeTo } from "../utils/routing.js";

export default function EmployeeShell({ sesion, route, logout, children }) {
  const links = [
    ["/empleado/inicio", "fa-house", "Inicio"],
    ["/empleado/requisitos", "fa-file-lines", "Requisitos"],
    ["/empleado/nueva", "fa-plus-circle", "Nueva solicitud"],
    ["/empleado/mis-solicitudes", "fa-list-check", "Mis solicitudes"],
    ["/empleado/contacto", "fa-envelope", "Contacto"],
  ];
  const initials = getInitials(sesion.nombre);

  return (
    <div className="employee-layout">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <header className="topbar">
        <div className="topbar-brand">
          <img src={logoUrl} alt="Logo ULEAM" />
          <div>
            <strong>ULEAM</strong>
            <span>GSAR · Talento Humano</span>
          </div>
        </div>

        <nav aria-label="Navegación del empleado">
          {links.map(([path, icon, label]) => {
            const active = route === path;
            return (
              <button
                key={path}
                type="button"
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
                onClick={() => routeTo(path)}
              >
                <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
                {label}
              </button>
            );
          })}
        </nav>

        <div className="topbar-actions">
          <div className="topbar-user">
            <span className="user-avatar" aria-hidden="true">
              {initials}
            </span>
            <span className="topbar-user-meta">
              <strong>{sesion.nombre}</strong>
              <small>{sesion.cargo}</small>
            </span>
          </div>
          <button className="logout-button compact" type="button" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
            Salir
          </button>
        </div>
      </header>

      <main id="main-content" className="employee-main">
        <div className="session-strip">
          <span className="session-chip">
            <i className="fa-solid fa-building" aria-hidden="true"></i>
            {sesion.departamento}
          </span>
          <span className="session-chip">
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
            {sesion.correo}
          </span>
        </div>
        {children}
      </main>
    </div>
  );
}
