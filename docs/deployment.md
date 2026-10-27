# Despliegue de GSAR en Amazon S3 + Amazon CloudFront

Esta guia describe el despliegue de la demo estatica de GSAR. No crea recursos automaticamente y no sustituye la revision de precios y condiciones vigentes de AWS.

> **Demo academica con datos ficticios. No utilizar para solicitudes reales.**
>
> La autenticacion es solo de cliente y puede manipularse. S3 + CloudFront no aporta autenticacion ni base de datos central.

## 1. Arquitectura

```text
Navegador
   |
   | HTTPS
   v
Amazon CloudFront
   |
   | OAC (origen privado)
   v
Amazon S3 privado
   |
   +-- index.html
   +-- assets/*.js
   +-- assets/*.css
   +-- assets/*.png
   +-- assets/*.woff2
```

- S3 guarda solo el contenido de `dist/`.
- El bucket permanece privado y con Block Public Access.
- CloudFront lee el bucket mediante Origin Access Control (OAC).
- La app usa rutas con `#`, por lo que no se necesita reescritura de SPA.
- Se recomienda el dominio predeterminado `*.cloudfront.net` para evitar dominio, Route 53 y ACM.

## 2. Requisitos previos

- Cuenta AWS con MFA. No usar el usuario root para el trabajo diario.
- Verificar si la cuenta es nueva o antigua, si esta en plan Free o Paid, los creditos disponibles, la region y los recursos que ya generan cargos.
- Elegir una region para S3. `us-east-1` es una opcion habitual; CloudFront es global.
- Revisar los precios oficiales de CloudFront y S3 antes de crear recursos.
- Configurar AWS Budgets con alertas. Las alertas no bloquean el consumo.

## 3. Compilar el artefacto

```powershell
cd C:\Users\Dixon\Desktop\Proyecto-GSARV2
npm.cmd install
npm.cmd run build
```

Verificar que exista `dist/index.html` y que el artefacto no contenga `.git`, `README.md`, `docs/`, respaldos, `.env` ni credenciales locales.

```powershell
Get-ChildItem dist -Recurse -File
```

## 4. Crear el bucket S3

1. En la consola de AWS, abrir **S3** y elegir **Create bucket**.
2. Usar un nombre unico, por ejemplo `gsar-demo-<alias>-<fecha>`.
3. Seleccionar la region elegida.
4. Mantener **Block all public access** activado.
5. Desactivar el versionado para simplificar la demo, salvo que se quiera conservar historial.
6. Crear el bucket.

No activar el endpoint de sitio web estatico de S3. CloudFront usara el endpoint REST del bucket con OAC.

## 5. Subir el artefacto

Subir **solo el contenido de `dist/`** a la raiz del bucket:

```text
s3://NOMBRE_DEL_BUCKET/index.html
s3://NOMBRE_DEL_BUCKET/assets/...
```

No subir la carpeta `dist` como una carpeta adicional. El `index.html` debe quedar en la raiz del bucket.

Con AWS CLI, si esta instalado y configurado de forma segura:

```powershell
aws s3 sync dist/ s3://NOMBRE_DEL_BUCKET --delete
```

`--delete` elimina objetos que ya no existen en `dist/`. Usarlo solo en un bucket dedicado a esta demo.

## 6. Crear la distribucion CloudFront

1. Abrir **CloudFront** y elegir **Create distribution**.
2. En Origin domain, seleccionar el bucket S3.
3. Elegir **Origin access control settings (recommended)** y crear un OAC.
4. En Viewer protocol policy, elegir **Redirect HTTP to HTTPS**.
5. En Default root object, escribir `index.html`.
6. No configurar una funcion de reescritura: la app usa hash routing.
7. Crear la distribucion.

CloudFront mostrara una politica de bucket para permitir que la distribucion lea el bucket. Aplicarla en **S3 > Bucket > Permissions > Bucket policy**. La condicion debe limitar el acceso al ARN de la distribucion.

Ejemplo de politica, sustituyendo los marcadores:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::NOMBRE_DEL_BUCKET/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::NUMERO_DE_CUENTA:distribution/ID_DE_DISTRIBUCION"
        }
      }
    }
  ]
}
```

No hacer publico el bucket ni usar `Principal: "*"`.

## 7. Cabeceras de seguridad y noindex

Crear una **Response headers policy** en CloudFront y asociarla al behavior por defecto. Valores recomendados:

| Cabecera | Valor |
|---|---|
| `Strict-Transport-Security` | `max-age=31536000` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` |
| `X-Robots-Tag` | `noindex, nofollow, noarchive` |
| `Content-Security-Policy` | Ver ejemplo ajustado abajo |

Ejemplo inicial de CSP para el build con Font Awesome local:

```text
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
font-src 'self' data:;
img-src 'self' data:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

Probar la CSP con la consola del navegador. Si se añade un CDN, un dominio de evidencias o un backend, ajustar la politica. No usar `unsafe-eval` ni Babel en el navegador.

`noindex` y `X-Robots-Tag` reducen la indexacion accidental, pero **no son control de acceso**.

## 8. Probar la URL

1. Copiar el dominio de CloudFront, con formato `https://xxxxxxxx.cloudfront.net/`.
2. Abrir la URL en una ventana privada.
3. Verificar HTTPS, el aviso de demo y la pantalla de login.
4. Probar el login de administrador y de empleado.
5. Probar navegacion, creacion de solicitud, revision, aprobacion/rechazo, mensajes, usuarios y exportacion JSON.
6. Confirmar que la exportacion JSON no contiene `password`, `hash`, `token` ni `secret`.
7. Revisar la consola del navegador y la pestana Network.

La app no comparte datos entre navegadores. Para probar ambos roles, usar la misma ventana/perfil o iniciar sesion sucesivamente.

## 9. Actualizar la demo

```powershell
npm.cmd run build
aws s3 sync dist/ s3://NOMBRE_DEL_BUCKET --delete
```

Invalidar la cache de CloudFront:

```text
/*
```

Para una actualizacion pequena, se puede invalidar solo `/index.html`; los assets tienen nombres con hash. Confirmar el costo de invalidaciones fuera del nivel gratuito.

## 10. Eliminar los recursos

1. En CloudFront, deshabilitar la distribucion.
2. Esperar a que termine el estado de despliegue.
3. Eliminar la distribucion.
4. Eliminar la Response headers policy y el OAC si no se reutilizan.
5. Vaciar el bucket S3.
6. Eliminar el bucket.
7. Eliminar presupuestos, alarmas y cualquier registro DNS si se uso un dominio propio.
8. Revisar **Billing** para confirmar que no quedan cargos.

No eliminar recursos compartidos de la cuenta sin revisar su uso.

## 11. Costos y condiciones

Segun las paginas oficiales consultadas el 27/10/2026:

- El plan Free de CloudFront anuncia **$0/mes** por distribucion, con 1 millon de solicitudes, 100 GB de transferencia y 5 GB de almacenamiento S3 incluido, sin overage.
- S3 tiene costos por almacenamiento y solicitudes; para esta demo el artefacto es muy pequeno, pero no se garantiza un costo cero absoluto.
- Los planes flat-rate de CloudFront pueden no combinarse con otras promociones o creditos.
- Las cuentas nuevas en el plan Free de AWS pueden cerrarse a los 6 meses o al agotar creditos.
- Un dominio propio, Route 53, ACM, WAF adicional o invalidaciones fuera del nivel gratuito pueden generar cargos.
- Verificar siempre la consola de AWS y la pagina oficial vigente. Esta guia no es una garantia de precio.

## 12. Riesgos pendientes

- Autenticacion de cliente manipulable.
- Datos por navegador, sin base central.
- Sin auditoria, sin recuperacion de contrasena, sin MFA y sin control de acceso real.
- Datos ficticios que no deben sustituirse por datos institucionales sin redisenar la arquitectura.
- Dependencia de `localStorage`; limpiar el navegador borra la demo.
- La demo puede ser copiada o modificada por cualquier visitante.

Para una version institucional se necesitaria autenticacion real, API, base de datos, autorizacion del lado servidor, auditoria y almacenamiento controlado de evidencias.
