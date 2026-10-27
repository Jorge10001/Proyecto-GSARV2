import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import FormInput from "../../../components/common/FormInput.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import { getInitials, uid } from "../../../utils/format.js";
import { validateDemoEmail, validateDemoPassword } from "../../../utils/validation.js";

const EMPTY_FORM = {
  nombre: "",
  correo: "",
  cargo: "",
  departamento: "",
  estado: "Activo",
  rol: "empleado",
  password: "",
};

export default function Usuarios({ usuarios, setUsuarios }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSaved(false);
    const nextErrors = {};
    if (form.nombre.trim().length < 6) nextErrors.nombre = "Ingrese nombre y apellido.";
    if (!validateDemoEmail(form.correo)) nextErrors.correo = "Use un correo @gsar.example.";
    if (usuarios.some((item) => item.correo.toLowerCase() === form.correo.toLowerCase().trim())) {
      nextErrors.correo = "Este correo ya está registrado.";
    }
    if (form.cargo.trim().length < 3) nextErrors.cargo = "Ingrese un cargo válido.";
    if (form.departamento.trim().length < 3) nextErrors.departamento = "Ingrese el departamento.";
    if (!validateDemoPassword(form.password)) {
      nextErrors.password = "Use una contraseña temporal de demo de al menos 10 caracteres y que no empiece por 'password'.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setUsuarios([
      ...usuarios,
      {
        ...form,
        correo: form.correo.toLowerCase().trim(),
        id: uid("USR"),
      },
    ]);
    setForm(EMPTY_FORM);
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        title="Gestión de usuarios"
        text="Registro de empleados y administradores de la demo."
        actions={
          <span className="count-pill">
            <i className="fa-solid fa-users" aria-hidden="true"></i>
            {usuarios.length} usuarios
          </span>
        }
      />

      <section className="form-surface" aria-labelledby="nuevo-usuario-title">
        <div className="form-surface-header">
          <div>
            <span className="eyebrow">Alta de usuario</span>
            <h2 id="nuevo-usuario-title">Nuevo registro</h2>
            <p>Complete los datos de acceso y el rol dentro del sistema.</p>
          </div>
        </div>

        {saved && (
          <div className="success-alert" role="status">
            <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
            <span>Usuario creado correctamente en el almacenamiento local de la demo.</span>
          </div>
        )}

        <form className="data-form" onSubmit={submit} noValidate>
          <div className="form-grid">
            <FormInput
              label="Nombre completo"
              value={form.nombre}
              error={errors.nombre}
              onChange={(value) => setForm({ ...form, nombre: value })}
            />
            <FormInput
              label="Correo de demo"
              value={form.correo}
              error={errors.correo}
              placeholder="usuario.demo@gsar.example"
              onChange={(value) => setForm({ ...form, correo: value })}
            />
            <FormInput
              label="Cargo"
              value={form.cargo}
              error={errors.cargo}
              onChange={(value) => setForm({ ...form, cargo: value })}
            />
            <FormInput
              label="Departamento"
              value={form.departamento}
              error={errors.departamento}
              onChange={(value) => setForm({ ...form, departamento: value })}
            />
            <label>
              Estado
              <select
                value={form.estado}
                onChange={(event) => setForm({ ...form, estado: event.target.value })}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </label>
            <label>
              Rol
              <select
                value={form.rol}
                onChange={(event) => setForm({ ...form, rol: event.target.value })}
              >
                <option value="empleado">Empleado</option>
                <option value="admin">Administrador</option>
              </select>
            </label>
            <FormInput
              label="Contraseña temporal de demo"
              type="password"
              autoComplete="new-password"
              value={form.password}
              error={errors.password}
              placeholder="Mínimo 10 caracteres"
              onChange={(value) => setForm({ ...form, password: value })}
            />
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              <i className="fa-solid fa-user-plus" aria-hidden="true"></i>
              Crear usuario
            </button>
          </div>
        </form>
      </section>

      <section className="table-shell" aria-label="Usuarios registrados">
        <table>
          <caption className="sr-only">Listado de usuarios registrados</caption>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Cargo</th>
              <th scope="col">Departamento</th>
              <th scope="col">Estado</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="table-empty">
                    <i className="fa-solid fa-user-group" aria-hidden="true"></i>
                    <strong>Sin usuarios</strong>
                    <span>Cree el primer usuario para comenzar.</span>
                  </div>
                </td>
              </tr>
            ) : (
              usuarios.map((item) => (
                <tr key={item.id}>
                  <td data-label="Nombre">
                    <div className="avatar-cell">
                      <span className="avatar" aria-hidden="true">
                        {getInitials(item.nombre)}
                      </span>
                      <span>
                        <strong>{item.nombre}</strong>
                        <small>{item.id}</small>
                      </span>
                    </div>
                  </td>
                  <td data-label="Correo">{item.correo}</td>
                  <td data-label="Cargo">{item.cargo}</td>
                  <td data-label="Departamento">{item.departamento}</td>
                  <td data-label="Estado">
                    <StatusBadge value={item.estado} />
                  </td>
                  <td data-label="Rol">
                    <StatusBadge value={item.rol === "admin" ? "Administrador" : "Empleado"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
