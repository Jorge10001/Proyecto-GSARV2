function App() {
  const [route, setRoute] = useState(getInitialRoute);
  const [usuarios, setUsuarios] = useState(() => readJSON(STORAGE_KEYS.usuarios, seedUsuarios));
  const [solicitudes, setSolicitudes] = useState(() => readJSON(STORAGE_KEYS.solicitudes, []));
  const [mensajes, setMensajes] = useState(() => readJSON(STORAGE_KEYS.mensajes, []));
  const [sesion, setSesion] = useState(() => readJSON(STORAGE_KEYS.sesion, null));

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.usuarios)) {
      writeJSON(STORAGE_KEYS.usuarios, seedUsuarios);
    }

    const onHashChange = () => setRoute(getInitialRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

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
    setSesion(usuario);
    writeJSON(STORAGE_KEYS.sesion, usuario);
    routeTo(usuario.rol === "admin" ? "/admin/inicio" : "/empleado/inicio");
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.sesion);
    setSesion(null);
    routeTo("/login");
  }

  if (!sesion || route === "/login") {
    return <Login usuarios={usuarios} onLogin={login} />;
  }

  if (sesion.rol === "admin") {
    return (
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
  }

  return (
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
