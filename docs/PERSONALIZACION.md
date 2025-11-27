# 📝 Guía de Personalización - Portafolio David Barrera

Esta guía te ayudará a personalizar completamente tu portafolio con tu información real.

## 🎯 Datos Principales a Actualizar

### 1. Información Personal (`src/data/portfolio.ts`)

```typescript
export const personalInfo = {
  name: 'David Barrera', 
  role: 'Desarrollador de Aplicaciones & Estudiante de Ingeniería', 
  email: 'TU_EMAIL_REAL@gmail.com', 
  linkedin: 'https://www.linkedin.com/in/TU_LINKEDIN/', 
  github: 'https://github.com/TU_GITHUB/', 
  cvUrl: '/cv-david-barrera.pdf', 
  profileImage: '/profile-david.jpg' 
};
```

**Qué hacer:**
- Reemplaza `TU_EMAIL_REAL@gmail.com` con tu email real
- Actualiza los enlaces de LinkedIn y GitHub
- Sube tu CV en PDF a la carpeta `public/` con el nombre `cv-david-barrera.pdf`
- Sube tu foto de perfil a `public/` con el nombre `profile-david.jpg`

### 2. Habilidades Técnicas

```typescript
export const skills = {
  frontend: [
    { name: 'React', level: 85 }, // Ajusta los niveles según tu experiencia
    { name: 'JavaScript', level: 90 },
    { name: 'TypeScript', level: 75 },
    // Añade o quita tecnologías según corresponda
  ],
  backend: [
    { name: 'Java', level: 85 }, // Basado en tu experiencia IBM
    { name: 'Spring Boot', level: 80 },
    { name: 'Node.js', level: 70 },
    // Actualiza según tu stack
  ],
  // ... resto de categorías
};
```

### 3. Proyectos

**Para añadir más proyectos:**
```typescript
{
  title: 'Nombre del Proyecto',
  description: 'Descripción detallada del proyecto',
  image: '/imagen-proyecto.jpg', // Sube la imagen a public/
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  githubUrl: 'https://github.com/tu-usuario/repo',
  demoUrl: 'https://tu-demo.com', // o '#' si no hay demo
  featured: true // true para proyectos destacados
}
```

### 4. Certificaciones

```typescript
export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner', // Ejemplo
    issuer: 'Amazon Web Services',
    date: '2024',
    credlyUrl: 'https://credly.com/badges/TU_BADGE_ID'
  }
  // Añade tus certificaciones reales
];
```

## 🖼️ Imágenes a Subir

Crea estas imágenes y súbelas a la carpeta `public/`:

### Imágenes Obligatorias:
- `profile-david.jpg` - Tu foto de perfil (400x400px recomendado)
- `cv-david-barrera.pdf` - Tu CV actualizado

### Imágenes de Proyectos:
- `project-2048.jpg` - Screenshot del juego 2048
- `project-aws.jpg` - Imagen representativa de proyectos AWS
- `project-portfolio.jpg` - Screenshot de este portafolio
- Añade más según tus proyectos

### Imágenes SEO (Opcionales):
- `og-image.jpg` - Para redes sociales (1200x630px)
- `favicon.ico` - Icono del sitio

## 🌐 Configuración de Idiomas

### Archivo Principal: `src/i18n/translations.ts`

**Para modificar textos:**
```typescript
export const translations = {
  es: {
    hero: {
      description: 'TU_DESCRIPCIÓN_EN_ESPAÑOL',
      // ... más textos
    }
  },
  en: {
    hero: {
      description: 'YOUR_DESCRIPTION_IN_ENGLISH',
      // ... más textos
    }
  }
}
```

**Para añadir nuevos idiomas:**
1. Añade el idioma al objeto `translations`
2. Actualiza el tipo `Language` si usas TypeScript
3. Añade la opción en el selector de idioma del Header

## 🎨 Personalización Visual

### Colores del Tema (`tailwind.config.js`)

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Cambia estos valores para tu paleta de colores
        500: '#3b82f6', // Azul principal
        600: '#2563eb',
        // ... más variantes
      }
    }
  }
}
```

### Fuentes

Actualiza en `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=TU_FUENTE:wght@300;400;500;600;700&display=swap');
```

## 📱 Configuración SEO

### Archivo: `public/index.html`

```html
<meta name="description" content="David Barrera - Desarrollador de Aplicaciones..." />
<meta name="keywords" content="david barrera, desarrollador, IBM, AWS, EAN" />
<meta property="og:title" content="David Barrera - Portafolio" />
<!-- Actualiza todos los metadatos -->
```

## 🚀 Deployment

### 1. Preparación
```bash
# Construir el proyecto
npm run build

# Verificar que todo funciona
npm start
```

### 2. AWS S3 + CloudFront
Sigue la guía en `deploy-aws.md` para el deployment completo.

### 3. Dominio Personalizado (Opcional)
- Registra un dominio (ej: `davidbarrera.dev`)
- Configura Route 53
- Añade certificado SSL

## ✅ Checklist de Personalización

### Datos Personales
- [ ] Actualizar email en `personalInfo`
- [ ] Actualizar LinkedIn URL
- [ ] Actualizar GitHub URL
- [ ] Subir CV actualizado
- [ ] Subir foto de perfil

### Contenido
- [ ] Revisar y actualizar descripción personal
- [ ] Ajustar niveles de habilidades técnicas
- [ ] Añadir proyectos reales con screenshots
- [ ] Actualizar experiencia laboral (ya hecho)
- [ ] Añadir certificaciones reales

### Imágenes
- [ ] Foto de perfil profesional
- [ ] Screenshots de proyectos
- [ ] Imagen para redes sociales (OG)
- [ ] Favicon personalizado

### Textos e Idiomas
- [ ] Revisar traducciones en español
- [ ] Revisar traducciones en inglés
- [ ] Personalizar mensajes y descripciones

### SEO y Metadatos
- [ ] Actualizar title y description
- [ ] Configurar Open Graph
- [ ] Añadir keywords relevantes

### Deployment
- [ ] Configurar bucket S3
- [ ] Configurar CloudFront
- [ ] Configurar dominio (opcional)
- [ ] Configurar CI/CD (opcional)

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm start                 # Servidor de desarrollo
npm run build            # Construir para producción
npm test                 # Ejecutar tests

# Deployment
aws s3 sync build/ s3://tu-bucket --delete
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

## 📞 Soporte

Si necesitas ayuda con alguna personalización:

1. **Errores de código**: Revisa la consola del navegador
2. **Problemas de build**: Verifica que todas las imágenes existan
3. **Deployment**: Sigue paso a paso la guía de AWS
4. **Personalización avanzada**: Modifica los componentes en `src/components/`

## 🎯 Próximos Pasos Recomendados

1. **Completar información personal** (prioritario)
2. **Añadir proyectos reales** con capturas
3. **Configurar analytics** (Google Analytics)
4. **Añadir blog** (opcional)
5. **Configurar formulario de contacto** con backend
6. **Añadir testimonios** de colegas o profesores
7. **Integrar con CMS** para fácil actualización

---

**¡Tu portafolio está casi listo!** Solo necesitas personalizar los datos y subir las imágenes. El diseño y funcionalidad ya están optimizados para una experiencia profesional.