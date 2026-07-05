# GSAR - Sistema de Gestion de Solicitudes de Ascenso y Recategorizacion

Aplicacion web en React para gestionar solicitudes institucionales entre empleados y el area de Talento Humano.

## Tecnologias usadas

- React 18 mediante CDN.
- Babel Standalone para ejecutar JSX sin instalar Node.js.
- JavaScript, HTML y CSS.
- localStorage como almacenamiento del lado del cliente.
- JSON como formato de intercambio y exportacion de datos.
- Font Awesome para iconografia.

## Estructura principal

```text
assets/
  logos/
src/
  components/
    auth/
    common/
  data/
  features/
    admin/
      pages/
    employee/
      pages/
  layouts/
  utils/
  App.jsx
  main.jsx
  styles.css
index.html
```

## Organizacion

- `src/App.jsx`: estado principal, sesion y seleccion de flujo por rol.
- `src/main.jsx`: punto de montaje de React.
- `src/data`: datos iniciales y claves de almacenamiento.
- `src/utils`: funciones reutilizables de rutas, fechas, validaciones y localStorage.
- `src/components/auth`: pantalla de inicio de sesion.
- `src/components/common`: componentes pequenos reutilizables.
- `src/layouts`: estructuras visuales para administrador y empleado.
- `src/features/admin/pages`: paginas especificas del administrador.
- `src/features/employee/pages`: paginas especificas del empleado.

## Usuarios de prueba

- Administrador: `admin@uleam.edu.ec` / `Admin123`
- Empleado: `empleado@uleam.edu.ec` / `Empleado123`
