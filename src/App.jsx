import { useEffect, useState } from "react";
import { DEMO_NOTICE, STORAGE_KEYS, seedUsuarios } from "./data/seedData.js";
import { readJSON, writeJSON } from "./utils/storage.js";
import { getInitialRoute, routeTo } from "./utils/routing.js";
import { sanitizeUser } from "./utils/security.js";
import Login from "./components/auth/Login.jsx";
import AdminShell from "./layouts/AdminShell.jsx";
import EmployeeShell from "./layouts/EmployeeShell.jsx";
import AdminRouter from "./features/admin/AdminRouter.jsx";
import EmployeeRouter from "./features/employee/EmployeeRouter.jsx";

function DemoBanner() {
  return (
    <div className="demo-banner" role="status">
      <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
      <span>{DEMO_NOTICE}</span>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [usuarios, setUsuarios] = useState(() =>
    readJSON(STORAGE_KEYS.usuarios, seedUsuarios)
  );
  const [solicitudes, setSolicitudes] = useState(() =>
    readJSON(STORAGE_KEYS.solicitudes, [])
  );
  const [mensajes, setMensajes] = useState(() =>
    readJSON(STORAGE_KEYS.mensajes, [])
  );
  const [sesion, setSesion] = useState(() =>
    sanitizeUser(readJSON(STORAGE_KEYS.sesion, null))
  );

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.usuarios)) {
      writeJSON(STORAGE_KEYS.usuarios, seedUsuarios);
    }

    const onHashChange = () => setRoute(getInitialRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (sesion) {
      writeJSON(STORAGE_KEYS.sesion, sanitizeUser(sesion));
    }
  }, [sesion]);

  function persistUsuarios(next) {
    setUsuarios(next);
    writeJSON(STORAGE_KEYS.usuarios, next);
  }

  function persistSolicitudes(next) {
    setSolicitudes(next);
    writeJSON(STORAGE_KEYS.solicitudes, next);
  }

  function persistMensajes(next) {
    setMensajes(next);
    writeJSON(STORAGE_KEYS.mensajes, next);
  }

  function login(usuario) {
    const usuarioSeguro = sanitizeUser(usuario);
    setSesion(usuarioSeguro);
    writeJSON(STORAGE_KEYS.sesion, usuarioSeguro);
    routeTo(usuarioSeguro.rol === "admin" ? "/admin/inicio" : "/empleado/inicio");
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.sesion);
    setSesion(null);
    routeTo("/login");
  }

  let content;

  if (!sesion || route === "/login") {
    content = <Login usuarios={usuarios} onLogin={login} />;
  } else if (sesion.rol === "admin") {
    content = (
      <AdminShell sesion={sesion} route={route} logout={logout}>
        <AdminRouter
          route={route}
          usuarios={usuarios}
          solicitudes={solicitudes}
          mensajes={mensajes}
          setUsuarios={persistUsuarios}
          setSolicitudes={persistSolicitudes}
          setMensajes={persistMensajes}
        />
      </AdminShell>
    );
  } else {
    content = (
      <EmployeeShell sesion={sesion} route={route} logout={logout}>
        <EmployeeRouter
          route={route}
          sesion={sesion}
          solicitudes={solicitudes}
          mensajes={mensajes}
          setSolicitudes={persistSolicitudes}
          setMensajes={persistMensajes}
        />
      </EmployeeShell>
    );
  }

  return (
    <>
      <DemoBanner />
      {content}
    </>
  );
}
