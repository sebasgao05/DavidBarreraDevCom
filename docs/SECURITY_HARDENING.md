# Endurecimiento de Seguridad

Este documento resume las medidas de seguridad aplicadas al proyecto y los pasos para aplicar la configuración de infraestructura en AWS.

## 1. Cabeceras de seguridad HTTP

Se añadieron cabeceras de seguridad en dos lugares:

- `public/_headers`: para plataformas que leen este formato (Netlify / Cloudflare Pages). CRA lo copia al `build/`.
- `scripts/cloudfront-response-headers-policy.json`: la forma correcta de aplicarlas en la arquitectura real **S3 + CloudFront**, ya que S3 no procesa `_headers`.

Cabeceras incluidas:

| Cabecera | Valor | Propósito |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'` + orígenes permitidos | Mitiga XSS e inyección de recursos |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Fuerza HTTPS |
| `X-Frame-Options` | `DENY` | Evita clickjacking |
| `X-Content-Type-Options` | `nosniff` | Evita MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita fuga de referrer |
| `Permissions-Policy` | cámara/micro/geo/pago deshabilitados | Reduce superficie de APIs del navegador |
| `Cross-Origin-Opener-Policy` | `same-origin` | Aislamiento de ventana |
| `X-Permitted-Cross-Domain-Policies` | `none` | Bloquea políticas cross-domain de Adobe |

El CSP permite explícitamente:
- `font-src https://fonts.gstatic.com` (fuente Inter)
- `img-src ... https://via.placeholder.com` (fallback de imágenes de proyectos)
- `style-src 'unsafe-inline'` y `script-src 'unsafe-inline'` (requerido por Create React App y los scripts inline de `index.html`)

### Aplicar en CloudFront

```bash
# 1. Crear la Response Headers Policy
aws cloudfront create-response-headers-policy \
  --response-headers-policy-config file://scripts/cloudfront-response-headers-policy.json

# 2. Tomar el Id devuelto y colocarlo en cloudfront-config.json
#    (campo ResponseHeadersPolicyId) o asociarlo al cache behavior existente.
```

## 2. Acceso al bucket S3 (OAC en vez de público)

**Antes:** la política del bucket permitía `s3:GetObject` a `Principal: "*"` (cualquiera podía leer S3 directamente, saltándose CloudFront y sus cabeceras de seguridad).

**Ahora:** `scripts/bucket-policy.json` restringe la lectura exclusivamente al servicio CloudFront mediante **Origin Access Control (OAC)** y deniega cualquier petición que no use HTTPS.

### Pasos para aplicar

```bash
# 1. Activar el bloqueo de acceso público en el bucket
aws s3api put-public-access-block \
  --bucket david-barrera.com \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# 2. Crear un Origin Access Control (OAC)
aws cloudfront create-origin-access-control \
  --origin-access-control-config \
  Name=david-barrera-oac,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3

# 3. Reemplazar en scripts/bucket-policy.json:
#    ACCOUNT_ID       -> tu Account ID
#    DISTRIBUTION_ID  -> el Id de la distribución CloudFront
#    y aplicar la política:
aws s3api put-bucket-policy \
  --bucket david-barrera.com \
  --policy file://scripts/bucket-policy.json

# 4. En cloudfront-config.json, colocar el OriginAccessControlId (del paso 2)
#    y actualizar la distribución.
```

> Importante: con OAC el bucket ya **no** debe tener hosting estático público ni política pública. El enrutamiento SPA se maneja con `CustomErrorResponses` (403/404 → `/index.html`) en CloudFront.

## 3. Dependencias

Las vulnerabilidades de dependencias se eliminaron por completo: de **53 avisos
(2 críticos, 32 altos) a `No known vulnerabilities found`** (`pnpm audit` limpio).

La mayoría eran transitivas de `react-scripts` (build-time) y se corrigieron con
`overrides` en `pnpm-workspace.yaml`, forzando versiones parcheadas de: `postcss`,
`postcss-selector-parser`, `shell-quote`, `fast-uri`, `browserslist`, `qs`,
`colord`, `webpack-dev-middleware`, `source-map-js`, `proxy-addr`, `compression`,
`launch-editor`, `zod`, `body-parser`, `js-yaml`, `serialize-javascript`.

Casos que requirieron tratamiento específico:

- **`svgo`**: la cadena `@svgr/plugin-svgo > svgo` quedaba en `1.3.2` (sin fix en la
  rama 1.x). Se usó un override con selector de padre
  (`"@svgr/plugin-svgo>svgo": "2.8.4"`) para elevar solo esa dependencia a una
  versión parcheada. El build de producción se verificó y funciona; además el
  proyecto no importa SVGs como componentes React, así que esa cadena no se ejerce.
- **`aws-sdk` v2 + `mime-types`**: solo las usaba `scripts/deploy-optimized.js`,
  que además estaba corrupto (todo en una línea) y era redundante. Se reescribió el
  script para usar **AWS CLI** (igual que `deploy.js` y el pipeline de CI) y se
  **eliminaron ambas dependencias** de `package.json`. Con esto desapareció el
  aviso de `aws-sdk` v2 (que no tenía parche).

Revisar periódicamente con:

```bash
pnpm audit
```

## 4. Verificaciones ya confirmadas

- No hay secretos ni credenciales en el repositorio ni en el historial de git.
- Los workflows de GitHub Actions usan `secrets` (sin valores hardcodeados).
- `.gitignore` cubre `.env*` y archivos de credenciales de AWS.
