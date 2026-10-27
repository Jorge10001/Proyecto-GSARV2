import logoUrl from "../../assets/logos/uleam-logo-png_seeklogo-315386.png";
import { getInitials } from "../utils/format.js";
import { routeTo } from "../utils/routing.js";

export default function AdminShell({ sesion, route, logout, children }) {
  const links = [
    ["/admin/inicio", "fa-gauge", "Inicio"],
    ["/admin/solicitudes", "fa-clipboard-list", "Solicitudes"],
    ["/admin/usuarios", "fa-users", "Usuarios"],
    ["/admin/mensajes", "fa-envelope", "Mensajes"],
    ["/admin/json", "fa-code", "JSON"],
  ];
  const initials = getInitials(sesion.nombre);

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logoUrl} alt="Logo ULEAM" />
          <div className="sidebar-title">
            <strong>GSAR</strong>
            <span>Talento Humano</span>
          </div>
        </div>

        <div className="profile-box">
          <span className="profile-avatar" aria-hidden="true">
            {initials}
          </span>
          <div className="profile-meta">
            <p>{sesion.nombre}</p>
            <span>{sesion.cargo}</span>
          </div>
        </div>

        <nav aria-label="Navegación administrativa">
          {links.map(([path, icon, label]) => {
            const active = route === path;
            return (
              <button
                key={path}
                type="button"
                className={`sidebar-link${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => routeTo(path)}
              >
                <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <button className="logout-button" type="button" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
          Cerrar sesión
        </button>
      </aside>

      <div className="workspace">
        <header className="workspace-topbar">
          <div className="workspace-context">
            <span className="eyebrow">GSAR · Administración</span>
            <strong>Panel de gestión</strong>
          </div>
          <div className="workspace-meta">
            <span className="env-badge">
              <i className="fa-solid fa-circle-dot" aria-hidden="true"></i>
              Entorno demo
            </span>
            <div className="user-chip">
              <span className="user-avatar" aria-hidden="true">
                {initials}
              </span>
              <span className="user-chip-meta">
                <strong>{sesion.nombre}</strong>
                <small>{sesion.cargo}</small>
              </span>
            </div>
          </div>
        </header>

        <main id="main-content" className="workspace-content">
          {children}
        </main>
      </div>
    </div>
  );
}
