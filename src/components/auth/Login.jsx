function Login({ usuarios, onLogin }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!validateEmail(form.correo)) nextErrors.correo = "Ingrese un correo válido.";
    if (form.password.length < 6) nextErrors.password = "La contraseña debe tener mínimo 6 caracteres.";

    const usuario = usuarios.find(
      (item) =>
        item.correo.toLowerCase() === form.correo.toLowerCase().trim() &&
        item.password === form.password &&
        item.estado === "Activo"
    );

    if (!usuario && Object.keys(nextErrors).length === 0) {
      nextErrors.general = "Credenciales incorrectas o usuario inactivo.";
    }

    setErrors(nextErrors);
    if (usuario && Object.keys(nextErrors).length === 0) onLogin(usuario);
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand-block">
          <img src="assets/logos/uleam-logo-png_seeklogo-315386.png" alt="Logo ULEAM" />
          <div>
            <p>ULEAM</p>
            <h1>GSAR</h1>
          </div>
        </div>
        <form className="login-form" onSubmit={submit} noValidate>
          <h2>Sistema de acceso</h2>
          <p>Gestión de solicitudes de ascenso y recategorización.</p>
          {errors.general && <div className="form-alert">{errors.general}</div>}
          <label>
            Correo institucional
            <input
              type="email"
              value={form.correo}
              placeholder="admin@uleam.edu.ec"
              onChange={(event) => setForm({ ...form, correo: event.target.value })}
            />
            <FieldError message={errors.correo} />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={form.password}
              placeholder="Mínimo 6 caracteres"
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
            <FieldError message={errors.password} />
          </label>
          <button className="primary-button" type="submit">
            <i className="fa-solid fa-right-to-bracket"></i>
            Iniciar sesión
          </button>
        </form>
      </section>
    </main>
  );
}
