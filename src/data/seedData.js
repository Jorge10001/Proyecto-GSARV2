const STORAGE_PREFIX = "gsar_demo_v1";

export const STORAGE_KEYS = {
  usuarios: `${STORAGE_PREFIX}_usuarios`,
  sesion: `${STORAGE_PREFIX}_sesion`,
  solicitudes: `${STORAGE_PREFIX}_solicitudes`,
  mensajes: `${STORAGE_PREFIX}_mensajes`,
};

export const DEMO_NOTICE =
  "Demo académica con datos ficticios. No utilizar para solicitudes reales.";

// Credenciales exclusivas de la demo academica. No son secretos reales,
// no pertenecen a personas reales y no deben reutilizarse en produccion.
export const seedUsuarios = [
  {
    id: "USR-DEMO-001",
    nombre: "Administrador Demo",
    correo: "admin.demo@gsar.example",
    password: "DemoAdmin#2026",
    rol: "admin",
    cargo: "Analista de Talento Humano (demo)",
    departamento: "Talento Humano (demo)",
    estado: "Activo",
  },
  {
    id: "USR-DEMO-002",
    nombre: "Empleado Demo",
    correo: "empleado.demo@gsar.example",
    password: "DemoEmpleado#2026",
    rol: "empleado",
    cargo: "Asistente Administrativo (demo)",
    departamento: "Facultad de Ciencias Informáticas (demo)",
    estado: "Activo",
  },
];

export const tiposSolicitud = ["Ascenso", "Recategorización"];
export const estadosSolicitud = [
  "Pendiente",
  "En revisión",
  "Aprobada",
  "Rechazada",
];
