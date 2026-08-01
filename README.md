# Marlyn Rodriguez Photography

Sitio web profesional de fotografía para Marlyn Rodriguez.

## Estructura del Proyecto

```
marlyn-rodriguez-photography/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
├── photos.json         # Datos de las fotos del portafolio
├── images/
│   ├── logo.png        # Logo de Marlyn Rodriguez
│   ├── hero-bg.jpg     # Imagen de fondo del hero
│   ├── about.jpg       # Foto de Marlyn en la sección Sobre Mí
│   ├── testimonial1.jpg # Foto de testimonio 1
│   ├── testimonial2.jpg # Foto de testimonio 2
│   ├── testimonial3.jpg # Foto de testimonio 3
│   └── portfolio/      # Carpeta con las fotos del portafolio
│       ├── boda1.jpg
│       ├── boda2.jpg
│       ├── boda3.jpg
│       ├── retrato1.jpg
│       ├── retrato2.jpg
│       ├── moda1.jpg
│       ├── moda2.jpg
│       ├── evento1.jpg
│       ├── familia1.jpg
│       ├── familia2.jpg
│       ├── comercial1.jpg
│       └── comercial2.jpg
```

## Cómo Agregar/Editar Fotos

### Método 1: Editar photos.json (Recomendado)

1. Abre el archivo `photos.json`
2. Agrega un nuevo objeto en el array "photos" con esta estructura:

```json
{
  "id": 13,
  "src": "images/portfolio/nombre-de-tu-foto.jpg",
  "title": "Título de la Foto",
  "description": "Descripción de la foto.",
  "category": "bodas"
}
```

3. Guarda el archivo y sube la foto a la carpeta `images/portfolio/`

**Categorías disponibles:** bodas, retratos, moda, eventos, familia, comercial

### Método 2: Editar script.js directamente

1. Abre `script.js`
2. Busca la variable `photosData`
3. Agrega un nuevo objeto siguiendo el mismo formato

## Cómo Personalizar el Contenido

### Cambiar texto del sitio
- Edita el archivo `index.html` y modifica el texto que necesites.

### Cambiar colores
- Edita las variables CSS en `styles.css` al inicio del archivo:
  - `--color-accent`: Color principal dorado
  - `--color-primary`: Color de fondo oscuro

### Cambiar información de contacto
- Busca en `index.html` la sección `#contact` y modifica el email, teléfono, etc.

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos del proyecto
3. Ve a [vercel.com](https://vercel.com) e inicia sesión
4. Haz clic en "Add New Project"
5. Importa tu repositorio de GitHub
6. Haz clic en "Deploy"

### Opción 2: Desde la terminal (CLI)

```bash
# Instala Vercel CLI
npm install -g vercel

# Navega a la carpeta del proyecto
cd marlyn-rodriguez-photography

# Despliega
vercel
```

## Personalización Adicional

### Integrar formulario de contacto real

Puedes usar servicios como:
- **Formspree**: `<form action="https://formspree.io/f/TU_ID" method="POST">`
- **EmailJS**: Integración con JavaScript
- **Netlify Forms**: Si usas Netlify

### SEO
- Edita la etiqueta `<title>` en `index.html`
- Agrega meta descripciones en el `<head>`
- Agrega alt text a todas las imágenes

### Google Analytics
Agrega tu código de seguimiento en el `<head>` de `index.html`.

## Créditos

- Diseño inspirado en sitios de fotografía profesional
- Iconos: Font Awesome
- Fuentes: Google Fonts (Playfair Display, Lato)
