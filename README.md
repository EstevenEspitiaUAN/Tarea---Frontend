# Tarea - Frontend

Aplicación web fullstack con **Vite + React** (frontend) y **Express** (backend) que demuestra el manejo de **CORS** y operaciones CRUD.

## Estructura del proyecto

```
/
├── Frontend/          → Vite + React (puerto 5173)
│   ├── src/App.tsx    → Interfaz CRUD
│   └── vite.config.ts → Proxy /api → backend
└── backend/           → Express + CORS (puerto 5000)
    └── src/server.ts  → API con GET, POST, PUT, PATCH, DELETE
```

## Ejecutar

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend (otra terminal)
```bash
cd Frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/messages | Listar mensajes |
| POST | /api/messages | Crear mensaje |
| PUT | /api/messages/:id | Reemplazar mensaje |
| PATCH | /api/messages/:id | Actualizar mensaje |
| DELETE | /api/messages/:id | Eliminar mensaje |

## CORS

Configurado en `backend/src/server.ts`:
```ts
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://tu-app-de-produccion.com'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));
```
