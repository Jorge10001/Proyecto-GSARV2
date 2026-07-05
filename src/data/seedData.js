const STORAGE_KEYS = {
  usuarios: "gsar_usuarios",
  sesion: "gsar_sesion",
  solicitudes: "gsar_solicitudes",
  mensajes: "gsar_mensajes",
};

const seedUsuarios = [
  {
    id: "USR-001",
    nombre: "Administrador Talento Humano",
    correo: "admin@uleam.edu.ec",
    password: "Admin123",
    rol: "admin",
    cargo: "Analista de Talento Humano",
    departamento: "Talento Humano",
    estado: "Activo",
  },
  {
    id: "USR-002",
    nombre: "Dixon Zambrano",
    correo: "empleado@uleam.edu.ec",
    password: "Empleado123",
    rol: "empleado",
    cargo: "Asistente Administrativo",
    departamento: "Facultad de Ciencias Informáticas",
    estado: "Activo",
  },
];

const tiposSolicitud = ["Ascenso", "Recategorización"];
const estadosSolicitud = ["Pendiente", "En revisión", "Aprobada", "Rechazada"];
