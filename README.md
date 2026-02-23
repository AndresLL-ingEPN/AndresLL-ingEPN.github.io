# CV Profesional - Andrés Mauricio Llumiquinga Guamba

Currículum vitae profesional desarrollado con HTML5, CSS3 y JavaScript vanilla, siguiendo las mejores prácticas de desarrollo web.

## 📁 Estructura del Proyecto

```
CV-programming/
├── index.html              # Página principal del CV
├── certificados.html       # Galería de certificados
├── titulo.html            # Visualizador del título universitario
├── styles.css             # Estilos globales (CSS)
├── js/
│   ├── main.js           # Script para index.html
│   ├── certificados.js   # Script para galería y lightbox
│   └── titulo.js         # Script para titulo.html
├── certificados/         # Imágenes de certificados
└── titulo/              # PDF del título universitario
```

## 🎯 Características

- **Separación de Responsabilidades**: HTML, CSS y JavaScript en archivos independientes
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Accesibilidad**: Etiquetas semánticas, ARIA labels y navegación por teclado
- **Sistema de Filtros**: Categorización dinámica de certificados
- **Lightbox**: Visualización de certificados en pantalla completa con navegación
- **Optimizado para Impresión**: Estilos específicos para generar PDF

## 🛠️ Tecnologías

- HTML5 (Semántico)
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript ES6+ (Módulos IIFE, Strict Mode)
- No requiere frameworks ni dependencias externas

## 🚀 Cómo Usar

1. **Visualización local**:
   - Abre `index.html` directamente en tu navegador
   - O usa un servidor local (ej: Live Server en VS Code)

2. **Personalización**:
   - **Colores**: Modifica las variables CSS en `styles.css` (`:root`)
   - **Contenido**: Edita los archivos HTML según los comentarios `<!-- CAMBIAR: ... -->`
   - **Certificados**: Actualiza el array `certificates` en `js/certificados.js`

3. **Agregar certificados**:
   - Coloca la imagen en la carpeta `/certificados/`
   - Añade una entrada en el array de `js/certificados.js`
   - Duplica una tarjeta `.card` en `certificados.html` y actualiza sus datos

## 📝 Mejores Prácticas Implementadas

### JavaScript
- ✅ Uso de IIFE (Immediately Invoked Function Expression)
- ✅ Modo estricto (`'use strict'`)
- ✅ Evita variables globales (excepto las necesarias para onclick)
- ✅ Documentación con JSDoc
- ✅ Manejo de eventos del DOM
- ✅ Verificación de existencia de elementos antes de manipularlos

### HTML
- ✅ Estructura semántica (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ✅ Atributos `aria-label` para accesibilidad
- ✅ Atributos `alt` en imágenes
- ✅ Metadatos completos (descripción, viewport, charset)
- ✅ Datos estructurados Schema.org para SEO

### CSS
- ✅ Variables CSS para temas
- ✅ Mobile-first responsive design
- ✅ Media queries para impresión
- ✅ Nombres de clases descriptivos (BEM-like)
- ✅ Comentarios organizacionales

## 🔧 Mantenimiento

### Actualizar información personal
Busca comentarios `<!-- CAMBIAR: ... -->` en los archivos HTML

### Modificar colores del tema
Edita las variables en `styles.css`:
```css
:root {
  --primary: #004aad;
  --accent: #00a57a;
  /* ... */
}
```

### Agregar nuevas secciones
Usa la estructura existente como plantilla:
```html
<section class="section">
  <h2>Título de Sección</h2>
  <!-- Contenido -->
</section>
```

## 📱 Compatibilidad

- Chrome/Edge (últimas versiones)
- Firefox (últimas versiones)
- Safari (últimas versiones)
- Responsivo: Mobile, Tablet, Desktop

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos del contenido pertenecen a Andrés Mauricio Llumiquinga Guamba.

---

**Última actualización**: 16/01/2026
**Versión**: 2.0 (Refactorizado con mejores prácticas)
