# Portafolio Personal - David Barrera

Sitio web de portafolio desarrollado con React, TypeScript y Tailwind CSS. Incluye internacionalizacion, modo oscuro/claro y despliegue automatizado en AWS.

## Caracteristicas clave

- Diseno responsive optimizado para mobile, tablet y desktop
- Modo oscuro/claro con persistencia
- Soporte multilenguaje (ES/EN) con i18next
- Animaciones fluidas con Framer Motion
- SEO listo (helmet, metadatos y estructura semantica)
- Performance cuidada: lazy loading, splitting y assets optimizados

## Stack principal

- React 18 + TypeScript
- Tailwind CSS + @tailwindcss/typography
- Framer Motion, React i18next, React Helmet Async
- Iconos con Lucide React
- Build: react-scripts 5
- Deploy: AWS S3 + CloudFront

## Requisitos

- Node.js 16+ y npm
- AWS CLI configurado (para despliegue) o variables de entorno con credenciales

## Instalacion y uso

```bash
# Clonar el repo
https://github.com/sebasgao05/DavidBarreraDevCom.git
cd DavidBarreraDevCom

# Instalar dependencias
npm install

# Desarrollo
npm start

# Build optimizado
npm run build:prod
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

- `npm start`: servidor de desarrollo.
- `npm run build`: build estandar de React.
- `npm run build:prod`: optimiza imagenes y genera build.
- `npm test`: pruebas con react-scripts.
- `npm run validate`: build y chequeos previos a deploy.
- `npm run deploy`: valida, build:prod y despliega a AWS.
- `npm run analyze`: analiza bundle con webpack-bundle-analyzer.
- `npm run setup:assets`: prepara assets base.
- `npm run optimize:images`: optimiza imagenes locales.
- `npm run generate:icons`: genera iconos.
- `npm run generate:responsive`: genera variantes responsive.
- `npm run generate:screenshots`: captura screenshots.
- `npm run seo:check`: corre Lighthouse remoto.
- `npm run sitemap:generate`: genera sitemap.

## Flujo de trabajo recomendado

1) Desarrollar: `npm start`.
2) Probar y revisar: `npm test` y `npm run analyze` si necesitas ver el bundle.
3) Build local: `npm run build:prod`.
4) Desplegar: exporta `DEPLOY_BUCKET_NAME` y `DEPLOY_DISTRIBUTION_ID`, luego `npm run deploy`. El script sube a S3 y limpia cache en CloudFront.

## Personalizacion

- Contenido: edita `src/data/portfolioData.ts` y las variables `REACT_APP_*` en `.env`.
- Estilos: ajusta `tailwind.config.js` (colores, fuentes, animaciones, breakpoints).
- Idiomas: actualiza `src/i18n/config.ts` para agregar o modificar traducciones.

## Licencia

Este proyecto se distribuye bajo la licencia MIT.

## Contacto

- Email: sebasgao05@gmail.com
- LinkedIn: https://linkedin.com/in/sebasgao05
- GitHub: https://github.com/sebasgao05
