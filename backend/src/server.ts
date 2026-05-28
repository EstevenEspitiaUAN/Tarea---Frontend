import express from 'express'
import cors from 'cors'

const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://tu-app-de-produccion.com'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
}

const app = express()
const PORT = 5000

app.use(cors(corsOptions))
app.use(express.json())

interface Message {
  id: number
  text: string
}

const messages: Message[] = [
  { id: 1, text: 'Hola desde el backend con CORS!' },
]

app.get('/api/messages', (_req, res) => {
  res.json(messages)
})

app.post('/api/messages', (req, res) => {
  const newMessage: Message = {
    id: messages.length + 1,
    text: req.body.text,
  }
  messages.push(newMessage)
  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log('CORS habilitado para:', corsOptions.origin)
})
