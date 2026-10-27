# GSAR - Demo academica

Demo academica de **GSAR (Gestion de Solicitudes de Ascenso y Recategorizacion)**.
Usa datos ficticios y esta pensada unicamente para demostracion.

> **Demo academica con datos ficticios. No utilizar para solicitudes reales.**

## Estado y limitaciones

- La autenticacion y los roles se ejecutan **solo en el navegador**.
- La sesion y los roles se pueden manipular desde DevTools o `localStorage`.
- No hay backend, base de datos central, correo real, carga de archivos ni auditoria.
- Los datos se guardan en `localStorage` y **cada navegador tiene su propia copia**.
- Un administrador y un empleado en navegadores distintos no comparten solicitudes.
- `noindex` solicita a los buscadores no indexar la demo, pero **no protege el acceso**.
- Esta version **no sirve para datos institucionales reales**.

## Tecnologias

- React 18.3.1.
- Vite 8.
- JavaScript, HTML y CSS.
- Font Awesome 6.5.1 empaquetado localmente.
- `localStorage` como almacenamiento de demostracion.
- Navegacion por hash, sin libreria de rutas.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`.
- npm. En PowerShell de este equipo se usa `npm.cmd` por la politica de ejecucion.

## Ejecutar en local

```powershell
cd C:\Users\Dixon\Desktop\Proyecto-GSARV2
npm.cmd install
npm.cmd run dev
```

Abrir la URL que muestre Vite, normalmente `http://localhost:5173/`.

## Compilar para produccion

```powershell
npm.cmd run build
npm.cmd run preview
```

El artefacto se genera en `dist/`. `npm.cmd run preview` sirve ese artefacto para una comprobacion local.

## Credenciales de demostracion

Las credenciales son **exclusivas de la demo** y no son secretos reales. Estan documentadas en el archivo local `DEMO-CREDENTIALS.local.md`, que esta ignorado por Git y **no se incluye en `dist/`**.

Los usuarios semilla se definen en `src/data/seedData.js`. No reutilizar esas credenciales en un sistema real.

## Almacenamiento

La demo usa claves nuevas con prefijo `gsar_demo_v1_`:

- `gsar_demo_v1_usuarios`
- `gsar_demo_v1_sesion`
- `gsar_demo_v1_solicitudes`
- `gsar_demo_v1_mensajes`

Las claves antiguas (`gsar_usuarios`, `gsar_sesion`, `gsar_solicitudes`, `gsar_mensajes`) no se leen ni se eliminan automaticamente. Esto evita mezclar datos previos con la demo saneada. Si se necesitan datos antiguos, deben revisarse y exportarse manualmente antes de importarlos.

La sesion se guarda sin contrasena. La exportacion JSON elimina campos sensibles como `password`, `hash`, `token` y `secret`.

## Estructura

```text
assets/                 Logo institucional usado por la demo
docs/                   Documentacion de despliegue
src/
  components/           Componentes comunes y de autenticacion
  data/                 Datos ficticios y claves de almacenamiento
  features/             Vistas de administrador y empleado
  layouts/              Estructuras visuales
  utils/                Rutas, formato, validacion, almacenamiento y saneamiento
  App.jsx
  main.jsx
  styles.css
index.html
package.json
vite.config.js
```

## Despliegue

La guia para Amazon S3 + CloudFront esta en [`docs/deployment.md`](docs/deployment.md).

No publicar la raiz del repositorio. Publicar unicamente el contenido de `dist/`. No incluir `.git`, `README.md`, `docs/`, respaldos, archivos `.env` ni credenciales locales.
