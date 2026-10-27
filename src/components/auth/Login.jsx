import { useState } from "react";
import logoUrl from "../../../assets/logos/uleam-logo-png_seeklogo-315386.png";
import FieldError from "../common/FieldError.jsx";
import { validateEmail } from "../../utils/validation.js";

export default function Login({ usuarios, onLogin }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!validateEmail(form.correo)) nextErrors.correo = "Ingrese un correo válido.";
    if (form.password.length < 6) {
      nextErrors.password = "La contraseña debe tener mínimo 6 caracteres.";
    }

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
      <section className="login-panel" aria-labelledby="login-title">
        <div className="brand-block">
          <div className="brand-topline">
            <img src={logoUrl} alt="Logo ULEAM" />
            <span className="brand-badge">
              <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
              Demo académica
            </span>
          </div>

          <div className="brand-content">
            <span className="eyebrow">Universidad Laica Eloy Alfaro de Manabí</span>
            <h1>GSAR</h1>
            <p>
              Gestión de solicitudes de ascenso y recategorización del talento
              humano.
            </p>
            <div className="brand-points">
              <span>
                <i className="fa-solid fa-user-shield" aria-hidden="true"></i>
                Acceso por rol
              </span>
              <span>
                <i className="fa-solid fa-database" aria-hidden="true"></i>
                Datos locales de demo
              </span>
            </div>
          </div>

          <p className="brand-footer">
            Entorno académico · Datos ficticios · Uso exclusivo de demostración
          </p>
        </div>

        <form className="login-form" onSubmit={submit} noValidate aria-labelledby="login-title">
          <div className="login-form-header">
            <span className="eyebrow">Acceso al sistema</span>
            <h2 id="login-title">Bienvenido de nuevo</h2>
            <p>Ingrese con las credenciales de demostración entregadas por el docente.</p>
          </div>

          <p className="demo-login-note">
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
            <span>
              Este entorno utiliza datos ficticios almacenados en el navegador.
              No registre información personal real.
            </span>
          </p>

          {errors.general && (
            <div className="form-alert" role="alert">
              <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
              <span>{errors.general}</span>
            </div>
          )}

          <label className="field" htmlFor="login-email">
            <span className="field-label">Correo de demostración</span>
            <span className="input-shell">
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                value={form.correo}
                placeholder="admin.demo@gsar.example"
                aria-invalid={errors.correo ? "true" : undefined}
                aria-describedby={errors.correo ? "login-email-error" : undefined}
                onChange={(event) => setForm({ ...form, correo: event.target.value })}
              />
            </span>
            <FieldError id="login-email-error" message={errors.correo} />
          </label>

          <label className="field" htmlFor="login-password">
            <span className="field-label">Contraseña</span>
            <span className="input-shell">
              <i className="fa-solid fa-lock" aria-hidden="true"></i>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                placeholder="Contraseña de demo"
                aria-invalid={errors.password ? "true" : undefined}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={showPassword}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                ></i>
              </button>
            </span>
            <FieldError id="login-password-error" message={errors.password} />
          </label>

          <button className="primary-button login-submit" type="submit">
            <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
            Iniciar sesión
          </button>

          <p className="login-form-footer">
            <i className="fa-solid fa-lock" aria-hidden="true"></i>
            Conexión local de demostración. No use datos reales.
          </p>
        </form>
      </section>
    </main>
  );
}
