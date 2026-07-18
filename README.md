# Portfolio Personal

Monorepo con **Django REST Framework** (backend) y **React + Vite + TypeScript** (frontend), inspirado en las animaciones del [portfolio de Anthony Rosman](https://portfolioanthonyrosman.netlify.app).

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | Django 6 + DRF |
| Frontend | React 19 + Vite + TypeScript |
| Animaciones | Framer Motion + Typed.js |
| Routing | React Router DOM + AnimatePresence |
| Estilos | SASS Modules |
| BD dev | SQLite |
| BD prod | PostgreSQL |

## Estructura

```
personal-website/
├── backend/          # Django + DRF
│   ├── config/       # Settings del proyecto
│   └── portfolio/    # App con modelos, serializers, API
└── frontend/         # React + Vite
    └── src/
        ├── components/   # Animaciones, layout
        ├── pages/        # Intro, Home, Projects, Skills, Contact
        ├── services/     # Cliente API
        └── types/        # Tipos TypeScript
```

## Inicio rápido

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver
```

API disponible en `http://127.0.0.1:8000/api/`

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/profile/` | GET | Perfil del sitio (intro, typewriter) |
| `/api/projects/` | GET | Lista de proyectos |
| `/api/skills/` | GET | Lista de skills |
| `/api/contact/` | POST | Enviar mensaje de contacto |

Admin: `http://127.0.0.1:8000/admin/`

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend en `http://localhost:5173` — el proxy de Vite redirige `/api` al backend.

## Secciones

1. **Intro (`/`)** — Animación letra por letra, typewriter de roles, botón "¡Empecemos!"
2. **Home (`/home`)** — Hero con stagger de textos y navegación
3. **Proyectos (`/projects`)** — Grid con scroll reveal (datos desde API)
4. **Skills (`/skills`)** — Badges animados al scroll
5. **Contacto (`/contact`)** — Formulario POST a DRF
6. **Footer** — Links sociales y copyright

## Animaciones (referencia Anthony Rosman)

- **Intro letra por letra:** `opacity: 0, translateY: 150` → visible, delay escalonado
- **Descripción:** spring desde la izquierda (`translateX: -2000` → `0`)
- **Typewriter:** Typed.js con loop, `typeSpeed: 20`, `backSpeed: 20`
- **Scroll reveal:** `whileInView` con `viewport={{ once: true }}`
- **Transiciones de ruta:** `<AnimatePresence mode="wait">`
- **Accesibilidad:** respeta `prefers-reduced-motion`

## Producción

En `.env` del backend, configura:

```
DEBUG=False
SECRET_KEY=tu-clave-secreta
DATABASE_URL=postgres://user:password@host:5432/portfolio
CORS_ALLOWED_ORIGINS=https://tu-dominio.com
```

Build del frontend:

```bash
cd frontend
npm run build
```

## Próximos pasos

- [ ] Personalizar perfil, proyectos y skills en el admin
- [ ] Añadir imagen de fondo en la intro
- [ ] Refinar transiciones entre rutas
- [ ] Desplegar (Netlify/Vercel + Railway/Render)
