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

## Desarrollo local (rama `dev`)

Desde la raíz del repo:

```powershell
npm run setup   # primera vez: venv, .env, migrate, seed_demo, admin local
npm run dev     # abre backend :8000 y frontend :5173 en terminales separadas
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| API | http://127.0.0.1:8000/api/ |
| Admin Django | http://127.0.0.1:8000/admin/ |

**Admin local** (tras `npm run setup`): usuario `admin` / contraseña `admin123`  
(Configurable en `backend/.env` → `DJANGO_ADMIN_*`)

El frontend usa SQLite y proxy Vite (`VITE_API_URL=/api`). No hace falta PostgreSQL en local.

### Setup manual (alternativa)

#### 1. Backend

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
python manage.py setup_render
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

#### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend en `http://localhost:5173` — el proxy de Vite redirige `/api` y `/media` al backend.

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

## Despliegue en Netlify (frontend)

El repo incluye `netlify.toml` en la raíz. Netlify detecta automáticamente:

| Setting | Valor |
|---------|-------|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `frontend/dist` |

### Pasos

1. **Sube el repo a GitHub** (si aún no está al día):
   ```bash
   git add .
   git commit -m "Preparar despliegue Netlify"
   git push origin main
   ```

2. **Conecta en [Netlify](https://app.netlify.com/)** → *Add new site* → *Import an existing project* → GitHub → repo `personal-website`.

3. **Build settings** (deben coincidir con `netlify.toml`):

   | Campo | Valor |
   |-------|-------|
   | Base directory | `frontend` |
   | Build command | `npm run build` |
   | Publish directory | `dist` (relativo al base, **no** `frontend/dist`) |
   | Functions directory | **Vacío / Not set** |

   > **Importante:** `_redirects` no es un directorio de functions. Los redirects SPA ya están en `netlify.toml`. Si pusiste `frontend/public/_redirects` en Functions directory, bórralo del panel.

4. **Variables de entorno** en *Site configuration → Environment variables*:
   ```
   VITE_API_URL = https://TU-BACKEND.onrender.com/api
   ```
   (Sustituye por la URL real de tu API Django en producción.)

4. **Deploy** — Netlify construye y publica en una URL `*.netlify.app`.

5. **CORS en Django** — en el `.env` del backend de producción:
   ```
   CORS_ALLOWED_ORIGINS=https://tu-sitio.netlify.app
   ALLOWED_HOSTS=tu-backend.onrender.com
   DEBUG=False
   ```

### Backend (API) — obligatorio para el perfil

**Netlify no ejecuta Python.** El mensaje *"No hay perfil activo"* significa que el frontend no llega a una API Django con datos. `seed_demo` se corre en el **servidor del backend**, no en Netlify.

#### Opción A — Desplegar backend en Render (recomendado)

El repo incluye `render.yaml`. El build ejecuta automáticamente `migrate` + `seed_demo`.

1. Push del repo a GitHub.
2. [dashboard.render.com](https://dashboard.render.com/) → **New** → **Blueprint** → conecta el repo.
3. Al crear el blueprint, define estas variables:
   ```
   CORS_ALLOWED_ORIGINS = https://dzherrom.netlify.app
   DJANGO_ADMIN_PASSWORD = Cumana21.*
   ```
   (Usuario admin: `admin` — configurado en `render.yaml`)
4. Espera el deploy del servicio `portfolio-api`. Copia su URL, p. ej. `https://portfolio-api-xxxx.onrender.com`.
5. En **Netlify** → *Environment variables* (opcional si ya está en `netlify.toml`):
   ```
   VITE_API_URL = https://portfolio-api-h4fj.onrender.com/api
   ```
6. **Redeploy** el sitio en Netlify (Deploys → Trigger deploy → Clear cache).

Comprueba la API: [portfolio-api-h4fj.onrender.com/api/profile/](https://portfolio-api-h4fj.onrender.com/api/profile/)

Sitio en producción: [dzherrom.netlify.app](https://dzherrom.netlify.app/)

#### Opción B — Ya tienes backend en Render/Railway

Abre la **Shell** del servicio y ejecuta:

```bash
cd backend   # si aplica
python manage.py migrate
python manage.py seed_demo
```

O añade `python manage.py seed_demo` al **Build Command** y redeploy.

#### Opción C — Solo desarrollo local (no producción)

```bash
cd backend
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

Netlify en producción **no** puede usar tu `localhost`; necesitas la opción A o B.

### Backend (referencia de variables)

### Deploy manual (CLI)

```bash
npm install -g netlify-cli
cd frontend
npm run build
netlify login
netlify deploy --prod --dir=dist
```

## Próximos pasos

- [ ] Personalizar perfil, proyectos y skills en el admin
- [ ] Añadir imagen de fondo en la intro
- [ ] Desplegar backend Django en Render/Railway
- [ ] Dominio personalizado en Netlify
