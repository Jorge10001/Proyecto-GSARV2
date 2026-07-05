function Usuarios({ usuarios, setUsuarios }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    cargo: "",
    departamento: "",
    estado: "Activo",
    rol: "empleado",
    password: "Password123",
  });
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (form.nombre.trim().length < 6) nextErrors.nombre = "Ingrese nombre y apellido.";
    if (!validateInstitutionalEmail(form.correo)) nextErrors.correo = "Use un correo @uleam.edu.ec.";
    if (usuarios.some((item) => item.correo.toLowerCase() === form.correo.toLowerCase())) {
      nextErrors.correo = "Este correo ya está registrado.";
    }
    if (form.cargo.trim().length < 3) nextErrors.cargo = "Ingrese un cargo válido.";
    if (form.departamento.trim().length < 3) nextErrors.departamento = "Ingrese el departamento.";
    if (form.password.length < 6) nextErrors.password = "La contraseña debe tener mínimo 6 caracteres.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setUsuarios([...usuarios, { ...form, id: uid("USR") }]);
    setForm({ nombre: "", correo: "", cargo: "", departamento: "", estado: "Activo", rol: "empleado", password: "Password123" });
  }

  return (
    <>
      <PageHeader title="Gestión de usuarios" text="Registro de empleados y administradores del sistema." />
      <section className="form-surface">
        <form className="data-form grid-form" onSubmit={submit} noValidate>
          <FormInput label="Nombre completo" value={form.nombre} error={errors.nombre} onChange={(value) => setForm({ ...form, nombre: value })} />
          <FormInput label="Correo institucional" value={form.correo} error={errors.correo} onChange={(value) => setForm({ ...form, correo: value })} />
          <FormInput label="Cargo" value={form.cargo} error={errors.cargo} onChange={(value) => setForm({ ...form, cargo: value })} />
          <FormInput label="Departamento" value={form.departamento} error={errors.departamento} onChange={(value) => setForm({ ...form, departamento: value })} />
          <label>
            Estado
            <select value={form.estado} onChange={(event) => setForm({ ...form, estado: event.target.value })}>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </label>
          <label>
            Rol
            <select value={form.rol} onChange={(event) => setForm({ ...form, rol: event.target.value })}>
              <option value="empleado">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
          <FormInput label="Contraseña temporal" value={form.password} error={errors.password} onChange={(value) => setForm({ ...form, password: value })} />
          <button className="primary-button" type="submit">
            <i className="fa-solid fa-user-plus"></i>
            Crear usuario
          </button>
        </form>
      </section>
      <section className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Estado</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.correo}</td>
                <td>{item.cargo}</td>
                <td>{item.departamento}</td>
                <td>{item.estado}</td>
                <td><StatusBadge value={item.rol === "admin" ? "Administrador" : "Empleado"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
