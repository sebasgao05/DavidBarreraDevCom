# Portafolio Personal - David Barrera

Sitio web de portafolio desarrollado con React, TypeScript y Tailwind CSS. Incluye internacionalizacion, modo oscuro/claro y despliegue automatizado en AWS.

## Caracteristicas clave

- Diseno responsive optimizado para mobile, tablet y desktop
- Modo oscuro/claro con persistencia
- Soporte multilenguaje (ES/EN) con i18next
- Animaciones fluidas con Framer Motion
- SEO listo (helmet, metadatos y estructura semantica)
- Performance cuidada: lazy loading, splitting y assets optimizados
- CI/CD automatizado: push a `main` dispara lint, test, build y deploy a AWS

## Stack principal

- React 18 + TypeScript
- Tailwind CSS + @tailwindcss/typography
- Framer Motion, React i18next, React Helmet Async
- Iconos con Lucide React
- Build: react-scripts 5
- Deploy: AWS S3 + CloudFront (CI/CD via GitHub Actions)

## Requisitos

- Node.js 22+ y pnpm
- AWS CLI configurado (para despliegue) o variables de entorno con credenciales

## Instalacion y uso

```bash
# Clonar el repo
git clone https://github.com/sebasgao05/DavidBarreraDevCom.git
cd DavidBarreraDevCom

# Instalar dependencias
pnpm install

# Desarrollo
pnpm start

# Build optimizado
pnpm run build:prod
```

## Variables de entorno

1) Copia `.env.example` a `.env`.
2) Llena los datos visibles del portafolio con las llaves `REACT_APP_*` (nombre, correo, redes, URLs de CV, imagenes). No guardes secretos reales porque se exponen en el bundle.
3) Para despliegue configura fuera del repo:
   - `DEPLOY_BUCKET_NAME`: bucket S3 de destino.
   - `DEPLOY_DISTRIBUTION_ID`: distribucion de CloudFront a invalidar.
4) Las credenciales de AWS deben venir de tu entorno/CLI, nunca del codigo.

## Estructura del proyecto

```
src/
  components/        // Componentes React
  contexts/          // Contexto de tema
  data/              // Datos del portafolio
  hooks/             // Custom hooks
  i18n/              // Configuracion de idiomas
  styles/            // Estilos
  types/             // Tipos TypeScript
  utils/             // Utilidades

public/              // Assets estaticos
scripts/             // Scripts de build y deploy
docs/                // Documentacion adicional
```

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `pnpm start` | Servidor de desarrollo |
| `pnpm build` | Build estandar de React |
| `pnpm run build:prod` | Optimiza imagenes y genera build |
| `pnpm test` | Pruebas con react-scripts |
| `pnpm run lint` | Linting con ESLint |
| `pnpm run validate` | Build y chequeos previos a deploy |
| `pnpm run deploy` | Valida, build:prod y despliega a AWS |
| `pnpm run analyze` | Analiza bundle con webpack-bundle-analyzer |
| `pnpm run setup:assets` | Prepara assets base |
| `pnpm run optimize:images` | Optimiza imagenes locales |
| `pnpm run generate:icons` | Genera iconos |
| `pnpm run generate:responsive` | Genera variantes responsive |
| `pnpm run generate:screenshots` | Captura screenshots |
| `pnpm run seo:check` | Corre Lighthouse remoto |
| `pnpm run sitemap:generate` | Genera sitemap |

## Flujo de trabajo recomendado

1) Desarrollar: `pnpm start`.
2) Probar y revisar: `pnpm test` y `pnpm run analyze` si necesitas ver el bundle.
3) Build local: `pnpm run build:prod`.
4) Desplegar: push a `main` dispara automaticamente el pipeline de CI/CD (lint, test, build, deploy a S3 + invalidacion de CloudFront).

## CI/CD

El despliegue es completamente automatizado. Al hacer push a la rama `main`, GitHub Actions ejecuta:

1. **Lint** - verifica calidad de codigo con ESLint
2. **Test** - ejecuta pruebas unitarias
3. **Build** - genera el build de produccion
4. **Deploy** - sincroniza con S3 e invalida cache de CloudFront

Ver [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) para mas detalles sobre el pipeline y la estrategia de cache.

## Personalizacion

- Contenido: edita `src/data/portfolioData.ts` y las variables `REACT_APP_*` en `.env`.
- Estilos: ajusta `tailwind.config.js` (colores, fuentes, animaciones, breakpoints).
- Idiomas: actualiza `src/i18n/config.ts` para agregar o modificar traducciones.

## Contributing

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para la guia de contribucion, incluyendo el flujo de branches, commits convencionales y checklist de PRs.

## Security

Consulta [SECURITY.md](SECURITY.md) para la politica de seguridad y como reportar vulnerabilidades.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

## Contacto

- Email: sebasgao05@gmail.com
- LinkedIn: https://linkedin.com/in/sebasgao05
- GitHub: https://github.com/sebasgao05
