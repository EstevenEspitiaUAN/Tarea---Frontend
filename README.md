# Tarea - Frontend
Aplicación web fullstack con **Vite + React** (frontend) y **Express** (backend) que demuestra el manejo de **CORS** y operaciones CRUD.

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

Manejo de CORS
// Definición de las opciones con el tipo estricto de la librería
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000&#39;, 'https://tu-app-de-produccion.com&#39;], // Dominios permitidos
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Métodos HTTP permitidos
};

// Aplicar las opciones al middleware
app.use(cors(corsOptions));
Fecha de entrega: 31/05/2026 11:59 PM
En grupos, se comparte enlace a GitHub (Verificar que se dieron los permisos necesarios)
