# Portafolio — Joel A. Abreu

Next.js + Tailwind CSS, exportación estática.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000  (usa `npm run dev -- -p 3200` si el 3000 está ocupado)
npm run build    # genera out/ para publicar
```

## Cómo se actualiza

Todo el contenido vive en **`content/portfolio.json`**. No hay que tocar código para:

- **Agregar una gestión de TI** → nueva entrada en `gestiones` (contexto, accion, resultado).
- **Agregar un proyecto** → nueva entrada en `proyectos` (`destacado: true` para que salga arriba).
- **Registrar una prueba de skill** → cambia `estado` a `"verificado"` y agrega:
  `"prueba": { "fecha": "2026-12-01", "puntaje": "85/100" }`
- **Foto y CV** → pon `foto.jpg` y `cv.pdf` en `public/` y escribe `"/foto.jpg"` y `"/cv.pdf"` en `perfil`.

Los repos públicos de GitHub que no estén ya en `proyectos` aparecen solos en "En GitHub" (se leen al compilar).

## Publicar

Se publica en **Vercel** (equipo Twin Mindz) en https://joelabreu.twinmindz.com cada vez que se sube un cambio a `main`. El subdominio es un CNAME en el DNS de DreamHost de twinmindz.com.

`jlk1425.github.io/portafolio` solo redirige al dominio nuevo (`.github/workflows/deploy.yml`).

## Por confirmar en portfolio.json

- [ ] CV
- [ ] Stack de TravelHub y del dashboard de Fresarte
- [ ] Si los repos de CoreFlow y fresarte-dashboard pueden ser públicos
- [ ] Período de la Universidad del Caribe
