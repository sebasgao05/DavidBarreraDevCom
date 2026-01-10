# Sistema de Órbitas de Habilidades - Documentación

## 📖 Descripción General

El Sistema de Órbitas de Habilidades es una visualización interactiva que representa las competencias técnicas como sistemas solares, donde cada área de conocimiento es un "mundo" con sus tecnologías como "satélites" orbitando alrededor.

## 🏗️ Estructura del Sistema

### 1. Definición de Tipos

Primero, define los tipos en `src/types/skills.ts`:

```typescript
export type SkillLevel = 'fundamentos' | 'basico' | 'intermedio' | 'avanzado';

export interface Satellite {
  name: string;
  level: SkillLevel;
}

export interface SkillOrbit {
  name: string;
  color: string;
  satellites: Satellite[];
}

export type SkillsOrbits = {
  [key: string]: SkillOrbit;
};
```

### 2. Configuración de Datos

En `src/data/portfolioData.ts`, define tus sistemas:

```typescript
export const skillsOrbits: SkillsOrbits = {
  // Clave del sistema (debe coincidir con el icono)
  frontend: {
    name: 'Frontend',           // Nombre visible
    color: '#3B82F6',          // Color hexadecimal del sistema
    satellites: [
      { name: 'React', level: 'avanzado' },
      { name: 'TypeScript', level: 'intermedio' },
      // ... más satélites
    ]
  },
  // ... más sistemas
};
```

## 🎨 Creación de un Nuevo Sistema

### Paso 1: Agregar el Icono

En `SkillsOrbit.tsx`, agrega tu icono al objeto `icons`:

```typescript
const icons: Record<keyof SkillsOrbits, React.ComponentType<{ className?: string }>> = {
  frontend: Code,
  backend: Server,
  database: Database,
  cloud: Cloud,
  tools: Wrench,
  // Agrega tu nuevo sistema aquí
  mobile: Smartphone,  // Ejemplo: sistema móvil
};
```

### Paso 2: Definir el Sistema

En `portfolioData.ts`, agrega tu nuevo sistema:

```typescript
export const skillsOrbits: SkillsOrbits = {
  // ... sistemas existentes
  
  mobile: {
    name: 'Desarrollo Móvil',
    color: '#FF6B6B',  // Elige un color único
    satellites: [
      { name: 'React Native', level: 'avanzado' },
      { name: 'Flutter', level: 'intermedio' },
      { name: 'Swift', level: 'basico' },
      { name: 'Kotlin', level: 'basico' },
      { name: 'Expo', level: 'intermedio' }
    ]
  }
};
```

### Paso 3: Actualizar Tipos (si es necesario)

Si usas claves específicas, actualiza el tipo en `skills.ts`:

```typescript
export type SkillsOrbits = {
  frontend: SkillOrbit;
  backend: SkillOrbit;
  database: SkillOrbit;
  cloud: SkillOrbit;
  tools: SkillOrbit;
  mobile: SkillOrbit;  // Nuevo sistema
};
```

## 🛰️ Configuración de Satélites

### Niveles de Habilidad

Cada satélite tiene un nivel que determina su **color** y **tamaño**:

| Nivel | Color | Tamaño | Descripción |
|-------|-------|--------|-------------|
| `fundamentos` | Gris (`#94A3B8`) | 5px | Conocimiento básico teórico |
| `basico` | Azul (`#60A5FA`) | 6px | Experiencia limitada, proyectos simples |
| `intermedio` | Verde (`#34D399`) | 7px | Experiencia sólida, proyectos complejos |
| `avanzado` | Naranja (`#F59E0B`) | 8px | Dominio completo, proyectos enterprise |

### Ejemplo de Satélites

```typescript
satellites: [
  { name: 'React', level: 'avanzado' },        // Dominio completo
  { name: 'Vue.js', level: 'intermedio' },     // Experiencia sólida
  { name: 'Angular', level: 'basico' },        // Experiencia básica
  { name: 'Svelte', level: 'fundamentos' }     // Solo conocimiento teórico
]
```

## 🌌 Órbitas Múltiples

El sistema automáticamente crea **órbitas múltiples** cuando hay más de 6 satélites:

### Distribución Automática
- **≤ 6 satélites**: Una sola órbita (radio 75px)
- **> 6 satélites**: Dos órbitas
  - **Primera órbita**: Primeros 6 satélites (radio 60px)
  - **Segunda órbita**: Satélites restantes (radio 100px, offset +30°)

### Ejemplo con 7 Satélites

```typescript
frontend: {
  name: 'Frontend',
  color: '#3B82F6',
  satellites: [
    // Estos 6 van en la primera órbita
    { name: 'React', level: 'avanzado' },
    { name: 'TypeScript', level: 'intermedio' },
    { name: 'Next.js', level: 'intermedio' },
    { name: 'Tailwind CSS', level: 'avanzado' },
    { name: 'JavaScript', level: 'avanzado' },
    { name: 'HTML5', level: 'avanzado' },
    
    // Este va en la segunda órbita
    { name: 'CSS3', level: 'avanzado' }
  ]
}
```

## 🎨 Personalización Visual

### Colores Recomendados

Usa colores distintivos para cada sistema:

```typescript
const systemColors = {
  frontend: '#3B82F6',    // Azul
  backend: '#10B981',     // Verde
  database: '#F59E0B',    // Amarillo/Naranja
  cloud: '#8B5CF6',       // Púrpura
  tools: '#EF4444',       // Rojo
  mobile: '#FF6B6B',      // Rosa/Coral
  ai: '#6366F1',          // Índigo
  design: '#EC4899'       // Rosa
};
```

### Iconos Disponibles

Usa iconos de Lucide React:

```typescript
import { 
  Code,           // Frontend
  Server,         // Backend  
  Database,       // Base de datos
  Cloud,          // Cloud/DevOps
  Wrench,         // Herramientas
  Smartphone,     // Móvil
  Brain,          // IA/ML
  Palette         // Diseño
} from 'lucide-react';
```

## 📱 Responsive Design

El sistema es completamente responsivo:

- **Mobile (1 col)**: Sistemas apilados verticalmente
- **Tablet (2 cols)**: Dos sistemas por fila
- **Desktop (3 cols)**: Tres sistemas por fila
- **XL (5 cols)**: Todos los sistemas en una fila

## 🚀 Características Avanzadas

### Animaciones Incluidas
- ✨ **Cometas de fondo**: 4 meteoros cruzando la pantalla
- 🌊 **Pulso del planeta**: Anillos que se expanden
- 🛰️ **Movimiento de satélites**: Flotación sutil
- 📡 **Líneas de conexión**: Se iluminan en hover
- 🎯 **Efectos de hover**: Escalado y glow

### Interactividad
- **Hover en satélites**: Muestra nivel de habilidad
- **Líneas dinámicas**: Se destacan al hacer hover
- **Badges informativos**: Aparecen con el nivel
- **Efectos de glow**: Resaltan elementos activos

## 🔧 Mantenimiento

### Agregar Nueva Habilidad
1. Encuentra el sistema correspondiente en `skillsOrbits`
2. Agrega el nuevo satélite con su nivel apropiado
3. El sistema automáticamente manejará la distribución

### Cambiar Nivel de Habilidad
```typescript
// Antes
{ name: 'React', level: 'intermedio' }

// Después (al mejorar)
{ name: 'React', level: 'avanzado' }
```

### Crear Nuevo Sistema Completo
1. Importa el icono necesario
2. Agrégalo al objeto `icons`
3. Define el sistema en `skillsOrbits`
4. Actualiza los tipos si usas tipado estricto

## 📋 Checklist de Implementación

- [ ] Definir tipos en `skills.ts`
- [ ] Importar iconos necesarios
- [ ] Configurar objeto `icons`
- [ ] Crear sistemas en `skillsOrbits`
- [ ] Asignar colores únicos
- [ ] Definir satélites con niveles apropiados
- [ ] Probar responsive design
- [ ] Verificar animaciones
- [ ] Validar interactividad

## 🎯 Mejores Prácticas

1. **Máximo 10 satélites por sistema** para mantener legibilidad
2. **Colores contrastantes** entre sistemas
3. **Nombres cortos** para satélites (máx. 15 caracteres)
4. **Niveles realistas** basados en experiencia real
5. **Agrupación lógica** de tecnologías relacionadas

---

¡Con esta documentación puedes crear y personalizar tu propio sistema de órbitas de habilidades! 🌟