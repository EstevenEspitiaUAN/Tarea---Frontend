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

let messages: Message[] = [
  { id: 1, text: 'Mensaje inicial' },
]
let nextId = 2

app.get('/api/messages', (_req, res) => {
  res.json(messages)
})

app.post('/api/messages', (req, res) => {
  const newMessage: Message = {
    id: nextId++,
    text: req.body.text,
  }
  messages.push(newMessage)
  res.status(201).json(newMessage)
})

app.put('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Mensaje no encontrado' })
    return
  }
  messages[index] = { id, text: req.body.text }
  res.json(messages[index])
})

app.patch('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Mensaje no encontrado' })
    return
  }
  messages[index].text = req.body.text
  res.json(messages[index])
})

app.delete('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = messages.findIndex((m) => m.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Mensaje no encontrado' })
    return
  }
  messages.splice(index, 1)
  res.json({ message: `Mensaje ${id} eliminado` })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
  console.log('CORS habilitado para:', corsOptions.origin)
})
