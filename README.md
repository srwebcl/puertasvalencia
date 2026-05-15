# Puertas Valencia — Sitio Web Premium

Sitio web de alta conversión y estética *Premium* (Negro, Plata y Dorado) para **Puertas Valencia**, fábrica especialista en puertas enchapadas en madera y de seguridad blindada a medida en Santiago de Chile.

---

## 💻 Stack Tecnológico

- **Framework**: [Astro.js](https://astro.build) v4 (SSG — Static Site Generation)
- **Deploy**: Listo para [Vercel](https://vercel.com) / Cloudways / Netlify
- **Estilos**: CSS puro (Vainilla) de altísimo rendimiento con *Custom Properties*, *Gradients* metálicos y sin frameworks pesados.
- **Fuentes**: Barlow Condensed + Barlow (Google Fonts optimizadas)
- **Integraciones**: `@astrojs/sitemap` para SEO Técnico.

## 🚀 SEO y Rendimiento (Technical SEO)

El sitio ha sido auditado y optimizado para **Google Ads** y **Búsquedas Locales**:

- ✅ **HTML Estático Puro**: Carga ultra rápida, sin JS innecesario bloqueando el *render*.
- ✅ **Core Web Vitals**: LCP, FID y CLS completamente optimizados.
- ✅ **Sitemap Automático**: Generado en cada build (`/sitemap-index.xml`).
- ✅ **Robots.txt**: Configurado para permitir indexación total.
- ✅ **Schema.org LocalBusiness**: *Rich Snippets* integrados en `Layout.astro` con datos locales estructurados (Lampa, Santiago) para SEO local.
- ✅ **Etiquetas Meta Dinámicas**: Canonical tags, Open Graph para redes sociales, título y descripciones SEO amigables.
- ✅ **Semántica y Accesibilidad**: Etiquetas aria, navegación por teclado en menús desplegables customizados y estructura de encabezados (H1, H2, H3) estricta.

## ⚙️ Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador para ver el resultado.

## 🏗️ Build para Producción

```bash
# 1. Compilar el sitio estático
npm run build

# 2. Previsualizar la versión de producción
npm run preview
```
*(Los archivos optimizados se generarán en el directorio `/dist`)*

## 📂 Estructura del Proyecto

```
puertas-valencia/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Layout base con SEO, Meta Tags, Schema.org
│   ├── components/
│   │   ├── Header.astro          # Navegación premium y mobile menu
│   │   ├── Hero.astro            # Hero con sliders/carrusel premium
│   │   ├── Services.astro        # Grid de servicios enchapados/blindados
│   │   ├── WhyUs.astro           # Propuesta de valor
│   │   ├── Process.astro         # Timeline del proceso
│   │   ├── Gallery.astro         # Galería y videos interactivos
│   │   ├── Contact.astro         # Formulario con Custom Selects y JS logic
│   │   └── Footer.astro          # Footer enriquecido
│   └── pages/
│       └── index.astro           # Landing page principal
├── public/
│   ├── web_images/               # Assets optimizados (.webp)
│   └── robots.txt                # Archivo de rastreo
├── astro.config.mjs              # Configuración de Astro y plugins
└── package.json                  # Dependencias y scripts
```

## 🎨 Ajustes Estéticos & Custom Selects

Este proyecto destaca por un rediseño de interfaz de usuario enfocado en brindar una sensación de **lujo y profesionalismo**.
- Toda la paleta ha sido ajustada a metales oscuros (`#1a1a1a`), grises perlados y dorados dinámicos (`var(--c-gold)`).
- **Formularios Premium**: Los campos `<select>` nativos de los navegadores han sido reemplazados por componentes HTML/JS 100% personalizados para no romper la estética bajo ninguna plataforma (iOS, Android, Windows, Mac).

## 📩 Envío de Formularios

El formulario (`Contact.astro`) posee validación en el cliente y cuenta con una función de fallback híbrida. Al enviarlo:
1. Simula estado de carga (Shimmer UI).
2. Genera una alerta de "Enviado con éxito".
3. Redirige dinámicamente al usuario hacia **WhatsApp** con un mensaje pre-llenado en base a sus selecciones *(Nombre, Teléfono, Tipo de Servicio)*.

## 🔗 Repositorio Git
El proyecto está vinculado al repositorio oficial:
`https://github.com/srwebcl/puertasvalencia.git`
