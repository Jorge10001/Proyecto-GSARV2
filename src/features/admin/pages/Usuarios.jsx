import { useState } from "react";
import PageHeader from "../../../components/common/PageHeader.jsx";
import FormInput from "../../../components/common/FormInput.jsx";
import StatusBadge from "../../../components/common/StatusBadge.jsx";
import { uid } from "../../../utils/format.js";
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

  function submit(event) {
    event.preventDefault();
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
  }

  return (
    <>
      <PageHeader title="Gestión de usuarios" text="Registro de empleados y administradores de la demo." />
      <section className="form-surface">
        <form className="data-form grid-form" onSubmit={submit} noValidate>
          <FormInput label="Nombre completo" value={form.nombre} error={errors.nombre} onChange={(value) => setForm({ ...form, nombre: value })} />
          <FormInput label="Correo de demo" value={form.correo} error={errors.correo} placeholder="usuario.demo@gsar.example" onChange={(value) => setForm({ ...form, correo: value })} />
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
          <FormInput
            label="Contraseña temporal de demo"
            type="password"
            autoComplete="new-password"
            value={form.password}
            error={errors.password}
            placeholder="Mínimo 10 caracteres"
            onChange={(value) => setForm({ ...form, password: value })}
          />
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
