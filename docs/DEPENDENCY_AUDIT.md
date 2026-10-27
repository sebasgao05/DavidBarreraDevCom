# Auditoría de dependencias y mapeo de versiones

> Fecha del análisis: 27 de octubre de 2026
> Gestor de paquetes: **pnpm** (`pnpm-lock.yaml`)
> Comandos usados: `pnpm list --depth=0`, `pnpm outdated`, `pnpm audit`, `pnpm why <pkg>`

Este documento mapea las versiones actuales de las dependencias del portafolio, el estado de
vulnerabilidades conocidas, y justifica qué versiones se dejan como están y por qué.

---

## 1. Resumen ejecutivo

- **Total de vulnerabilidades reportadas por `pnpm audit`: 56** (2 críticas, 34 altas, 16 moderadas, 4 bajas).
- **El 100% de esas vulnerabilidades son transitivas y provienen de `react-scripts@5.0.1`** (Create React App, hoy en desuso). Ninguna de las dependencias que declaramos directamente en `package.json` tiene una vulnerabilidad propia explotable en el bundle de producción del sitio.
- Las vulnerabilidades se concentran en el **tooling de build y el dev-server** (webpack-dev-server, jest, postcss-preset-env, svgo, etc.), no en el código que se sirve al visitante.
- **Conclusión:** las versiones directas están en un estado sano. El único riesgo real de fondo es la dependencia de `react-scripts`, que arrastra un árbol antiguo. Mientras no se migre fuera de CRA, `pnpm audit` seguirá reportando ruido que **no se puede resolver subiendo las dependencias directas**.

---

## 2. Mapa de versiones (dependencias directas)

### Producción (`dependencies`)

| Paquete | Instalada | Última | Estado | Nota |
|---|---|---|---|---|
| `react` | 18.3.1 | 19.3.1 | ✅ Se deja | CRA (`react-scripts`) está diseñado para React 16–18. Subir a 19 rompe el toolchain. |
| `react-dom` | 18.3.1 | 19.3.1 | ✅ Se deja | Debe ir en par con `react`. Mismo motivo. |
| `typescript` | 4.9.5 | 7.0.2 | ✅ Se deja | `react-scripts@5.0.1` declara `typescript: "^3.2.1 \|\| ^4"`. TS 5/7 queda fuera del rango soportado. |
| `@types/react` | 18.3.31 | 19.3.0 | ✅ Se deja | Debe coincidir con la major de React (18). |
| `@types/react-dom` | 18.3.7 | 19.3.0 | ✅ Se deja | Idem, acoplado a React 18. |
| `@types/node` | 22.20.0 | 26.6.5 | ✅ Se deja | Línea 22 LTS; suficiente para los tipos usados. Sin vulnerabilidad. |
| `framer-motion` | 12.42.2 | 14.6.0 | ✅ Se deja | Sin CVE conocido. Majorar (13/14) requiere pruebas de animaciones; no urgente. |
| `i18next` | 23.16.8 | 26.5.11 | ✅ Se deja | Sin CVE. Salto 23→26 es major con cambios de API; acoplado a `react-i18next`. |
| `react-i18next` | 13.5.0 | 17.1.9 | ✅ Se deja | Sin CVE. Debe actualizarse coordinado con `i18next`. |
| `react-helmet-async` | 3.0.0 | 3.0.0 | ✅ Al día | En su última versión. |
| `react-scripts` | 5.0.1 | 5.0.1 | ⚠️ Origen del ruido | Última versión publicada de CRA, pero el proyecto está deprecado upstream. Es la raíz de las 56 alertas. |
| `lucide-react` | 1.39.0 | 1.61.0 | ✅ Se deja | Solo iconos, sin CVE. Minor seguro de subir cuando se quiera. |
| `web-vitals` | 5.3.0 | 5.3.0 | ✅ Al día | En su última versión. |

### Desarrollo (`devDependencies`)

| Paquete | Instalada | Última | Estado | Nota |
|---|---|---|---|---|
| `eslint` | 8.57.1 | 10.13.0 | ✅ Se deja | La config `react-app` (de CRA) requiere ESLint 8. ESLint 9/10 usa flat config y rompería el lint. |
| `tailwindcss` | 3.4.19 | 4.3.3 | ✅ Se deja | Tailwind 4 cambia el motor y la config (`tailwind.config.js` + PostCSS). Migración separada. |
| `postcss` | 8.5.26 | 8.5.31 | 🟡 Patch opcional | Sin CVE en la directa. Patch menor, seguro pero no crítico. |
| `autoprefixer` | 10.5.4 | 10.6.1 | 🟡 Minor opcional | Sin CVE. Seguro de subir. |
| `@tailwindcss/typography` | 0.5.20 | 0.5.20 | ✅ Al día | Última versión. |
| `sharp` | 0.35.4 | 0.35.5 | 🟡 Patch opcional | Sin CVE. Patch de binarios; seguro. |
| `lighthouse` | 13.4.1 | 13.5.0 | 🟡 Minor opcional | Herramienta de auditoría, no entra al bundle. Seguro. |
| `baseline-browser-mapping` | 2.11.20 | 2.11.33 | 🟡 Patch opcional | Patch. La alerta "DoS por input inválido" aparece **por la copia transitiva de `react-scripts`**, no por la directa. |
| `webpack-bundle-analyzer` | 5.3.2 | 5.4.0 | 🟡 Minor opcional | Solo análisis local. Seguro. |
| `mime-types` | 3.0.2 | 3.0.2 | ✅ Al día | Última versión. |
| `aws-sdk` | 2.1693.0 | **Deprecado** | ⚠️ Revisar | AWS SDK v2 está en mantenimiento/deprecado. Se recomienda migrar a `@aws-sdk/*` (v3) cuando haya tiempo. Solo se usa en scripts de deploy, no en el sitio. |

Leyenda: ✅ dejar como está (justificado) · 🟡 subible sin riesgo pero no urgente · ⚠️ requiere decisión / migración mayor.

---

## 3. Vulnerabilidades: de dónde salen realmente

`pnpm audit` reporta 56 hallazgos. Al rastrear cada uno con `pnpm why`, **todas** cuelgan de
`react-scripts@5.0.1`. Ejemplos representativos:

| Severidad | Paquete | Ruta (resumida) | ¿Afecta al sitio en producción? |
|---|---|---|---|
| Crítica | `proxy-addr` | `react-scripts > webpack-dev-server > express > proxy-addr` | No. Solo corre en el dev-server local. |
| Crítica | `shell-quote` | `react-scripts > react-dev-utils > shell-quote` | No. Tooling de desarrollo. |
| Alta | `brace-expansion` | `react-scripts > ... > minimatch > brace-expansion` | No. Build/test. |
| Moderada | `postcss` | `react-scripts > postcss-preset-env > ... > postcss@7` | No. El `postcss@8` directo no es el vulnerable; el vulnerable es `postcss@7` que trae CRA. |
| Moderada | `baseline-browser-mapping` | `react-scripts > ... > browserslist > baseline-browser-mapping` | No. La copia directa (dev) no es la señalada. |
| Moderada | `svgo` / `launch-editor` / `fast-uri` | vía `react-scripts` | No. Build/dev. |
| Baja | `serialize-javascript`, `fast-uri` | vía `react-scripts` | No. Build. |

**Por qué las versiones directas se dejan como están:**

1. **No son ellas las vulnerables.** La auditoría apunta a copias transitivas antiguas que CRA fija internamente. Subir `postcss`, `baseline-browser-mapping`, etc. en nuestro `package.json` **no elimina** la copia vieja que `react-scripts` resuelve por su cuenta.
2. **El riesgo no llega al visitante.** Los paquetes señalados (webpack-dev-server, express, jest, svgo, shell-quote…) se ejecutan en tu máquina durante `start`/`build`/`test`, no se empaquetan en el sitio estático que se despliega.
3. **Subir las majors que propone el bot rompe el build** (ver sección 4), así que "arreglar" el audit por esa vía cambiaría estabilidad por ruido cosmético.

---

## 4. Revisión de la rama de Dependabot

**Rama:** `origin/dependabot/npm_and_yarn/main/all-dependencies-c0165a3517`
**Commit:** `79bf398` — *"chore(deps): bump the all-dependencies group with 18 updates"*

Dependabot agrupó **18 actualizaciones**, varias de ellas **majors que rompen compatibilidad** con el stack actual (Create React App):

| Paquete | De | A (propuesto) | Veredicto |
|---|---|---|---|
| `react` | ^18.2.0 | **^19.3.0** | ❌ No aplicar. CRA no soporta React 19. |
| `react-dom` | ^18.2.0 | **^19.3.0** | ❌ No aplicar. Idem. |
| `typescript` | ^4.9.0 | **^7.0.2** | ❌ No aplicar. `react-scripts` solo acepta `^3 \|\| ^4`. |
| `@types/react` | ^18.2.0 | **^19.3.0** | ❌ No aplicar. Debe seguir a React 18. |
| `@types/react-dom` | ^18.2.0 | **^19.3.0** | ❌ No aplicar. Idem. |
| `@types/node` | ^22.0.0 | **^26.6.3** | ⚠️ Posible, pero innecesario; solo tipos. |
| `eslint` | ~8.57.0 | **~10.11.0** | ❌ No aplicar. La config `react-app` requiere ESLint 8. |
| `i18next` | ^23.7.0 | **^26.4.2** | ⚠️ Major con cambios de API; probar aparte. |
| `react-i18next` | ^13.5.0 | **^17.0.15** | ⚠️ Major; coordinar con `i18next`. |
| `framer-motion` | ^12.42.0 | **^13.4.4** | ⚠️ Major; revisar animaciones. |
| `web-vitals` | ^5.3.0 | ^6.2.2 | ⚠️ Major menor; revisar API de métricas. |
| `autoprefixer` | ^10.5.4 | ^10.6.1 | ✅ Seguro (minor). |
| `postcss` | ^8.5.26 | ^8.5.28 | ✅ Seguro (patch). |
| `sharp` | ^0.35.4 | ^0.35.5 | ✅ Seguro (patch). |
| `lighthouse` | ^13.4.1 | ^13.5.0 | ✅ Seguro (minor). |
| `baseline-browser-mapping` | ^2.11.20 | ^2.11.26 | ✅ Seguro (patch). |
| `webpack-bundle-analyzer` | ^5.3.2 | ^5.4.0 | ✅ Seguro (minor). |
| `lucide-react` | ^1.37.0 | ^1.48.0 | ✅ Seguro (minor). |

### Veredicto sobre la rama de Dependabot

**No se recomienda hacer merge de la rama tal como está.** El PR mezcla en un solo grupo
actualizaciones triviales y seguras con **saltos major que rompen el build** (React 19, TypeScript 7,
ESLint 10), todos incompatibles con `react-scripts@5.0.1`. Hacer merge dejaría el proyecto sin
compilar y, encima, **no cerraría las alertas de seguridad**, porque esas siguen viniendo del árbol
interno de CRA y no de las versiones que se suben.

**Recomendación:**
- **Cerrar / no mergear** este PR agrupado.
- Si se quiere aprovechar lo seguro, aplicar **solo** los patches/minors sin riesgo (autoprefixer, postcss, sharp, lighthouse, baseline-browser-mapping, webpack-bundle-analyzer, lucide-react) en un PR aparte y pequeño.
- Ajustar la configuración de Dependabot para **separar majors** y agruparlos por ecosistema, evitando que un solo PR mezcle lo seguro con lo que rompe.

---

## 5. La raíz del asunto: `react-scripts` / Create React App

Create React App está **oficialmente descontinuado** y fija internamente un árbol de dependencias
antiguo. Mientras el proyecto dependa de `react-scripts`:

- `pnpm audit` seguirá mostrando decenas de alertas que **no son corregibles** desde `package.json`.
- No se podrá subir a React 19, TypeScript 5+/7, ni ESLint 9/10.

**Camino de fondo (fuera del alcance de este cambio, requiere decisión):** migrar la toolchain a
**Vite + Vitest** (o Next.js). Eso elimina de un golpe la mayoría de las alertas de audit y abre la
puerta a React 19 / TypeScript modernos. Es una migración mayor y debe planearse por separado.

---

## 6. Qué se hizo en este análisis

- Mapa de versiones directas (producción y desarrollo) con su última disponible.
- Trazado de cada vulnerabilidad del `pnpm audit` hasta su origen (`react-scripts`).
- Revisión de la rama de Dependabot con veredicto por paquete.
- **No se modificó ninguna versión**: se documentó por qué las versiones actuales están bien y por qué el PR del bot no debe mergearse tal cual.
