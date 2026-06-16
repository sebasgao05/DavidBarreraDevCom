# Guia de Contribucion / Contribution Guide

---

## Espanol

Gracias por tu interes en contribuir a este proyecto. A continuacion encontraras todo lo necesario para empezar.

### Requisitos previos

- [Node.js](https://nodejs.org/) v22 o superior
- [pnpm](https://pnpm.io/) v10 o superior

### Clonar el repositorio

```bash
git clone https://github.com/sebasgao05/DavidBarreraDevCom.git
cd DavidBarreraDevCom
pnpm install --frozen-lockfile
```

### Ejecutar localmente

```bash
pnpm start
```

La aplicacion estara disponible en `http://localhost:3000`.

### Modelo de ramas

Usamos un flujo basado en Pull Requests:

1. Crea una rama desde `main` con un nombre descriptivo:
   - `feature/nueva-funcionalidad` para nuevas funcionalidades
   - `fix/descripcion-del-bug` para correcciones
   - `docs/cambios-documentacion` para documentacion
   - `chore/tarea-mantenimiento` para tareas de mantenimiento
2. Desarrolla tus cambios en esa rama.
3. Abre un Pull Request hacia `main`.
4. Espera la revision y aprobacion antes de hacer merge.

### Conventional Commits

Todos los mensajes de commit deben seguir la especificacion [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo    | Uso                                      |
| ---------- | ---------------------------------------- |
| `feat:`    | Nueva funcionalidad                      |
| `fix:`     | Correccion de errores                    |
| `docs:`    | Cambios en documentacion                 |
| `chore:`   | Tareas de mantenimiento                  |
| `refactor:`| Refactorizacion de codigo                |
| `style:`   | Cambios de formato (sin cambio de logica)|
| `test:`    | Agregar o corregir tests                 |
| `ci:`      | Cambios en configuracion de CI/CD        |

Ejemplo:

```
feat: agregar seccion de proyectos al portfolio
fix: corregir enlace roto en la navegacion
docs: actualizar guia de contribucion
```

### Checklist antes de abrir un PR

Antes de enviar tu Pull Request, asegurate de que:

- [ ] El linter pasa sin errores: `pnpm run lint`
- [ ] Los tests pasan: `pnpm run test:ci`
- [ ] El build se genera correctamente: `pnpm build`
- [ ] No introduces cambios que rompan funcionalidad existente
- [ ] El sitio es responsivo y se ve correctamente en diferentes dispositivos

### Proteccion de rama principal

Se recomienda configurar las siguientes reglas de proteccion en la rama `main`:

- Requerir Pull Request antes de merge
- Requerir al menos 1 aprobacion de revision
- Requerir que las verificaciones de estado (CI) pasen antes de merge
- No permitir push directo a `main`

---

## English

Thank you for your interest in contributing to this project. Below you will find everything you need to get started.

### Prerequisites

- [Node.js](https://nodejs.org/) v22 or higher
- [pnpm](https://pnpm.io/) v10 or higher

### Clone the repository

```bash
git clone https://github.com/sebasgao05/DavidBarreraDevCom.git
cd DavidBarreraDevCom
pnpm install --frozen-lockfile
```

### Run locally

```bash
pnpm start
```

The application will be available at `http://localhost:3000`.

### Branching model

We use a Pull Request-based workflow:

1. Create a branch from `main` with a descriptive name:
   - `feature/new-feature` for new features
   - `fix/bug-description` for bug fixes
   - `docs/documentation-changes` for documentation
   - `chore/maintenance-task` for maintenance tasks
2. Develop your changes on that branch.
3. Open a Pull Request targeting `main`.
4. Wait for review and approval before merging.

### Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix     | Usage                                    |
| ---------- | ---------------------------------------- |
| `feat:`    | New feature                              |
| `fix:`     | Bug fix                                  |
| `docs:`    | Documentation changes                    |
| `chore:`   | Maintenance tasks                        |
| `refactor:`| Code refactoring                         |
| `style:`   | Formatting changes (no logic change)     |
| `test:`    | Adding or fixing tests                   |
| `ci:`      | CI/CD configuration changes              |

Example:

```
feat: add projects section to portfolio
fix: correct broken link in navigation
docs: update contribution guide
```

### Checklist before opening a PR

Before submitting your Pull Request, make sure that:

- [ ] Linter passes without errors: `pnpm run lint`
- [ ] Tests pass: `pnpm run test:ci`
- [ ] Build completes successfully: `pnpm build`
- [ ] You are not introducing breaking changes to existing functionality
- [ ] The site is responsive and displays correctly on different devices

### Main branch protection

It is recommended to configure the following branch protection rules on `main`:

- Require a Pull Request before merging
- Require at least 1 approval review
- Require status checks (CI) to pass before merging
- Do not allow direct pushes to `main`
