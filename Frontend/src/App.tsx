import { useState, useEffect } from 'react'
import './App.css'

interface Message {
  id: number
  text: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [methodMsg, setMethodMsg] = useState('')

  const API = '/api/messages'

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        setMessages(data)
        setMethodMsg('GET /api/messages - Listar mensajes')
      })
      .catch(() => setMethodMsg('Error de conexión con el backend'))
  }, [])

  const create = () => {
    if (!inputText.trim()) return
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputText }),
    })
      .then((r) => r.json())
      .then((msg) => {
        setMessages((prev) => [...prev, msg])
        setInputText('')
        setMethodMsg(`POST /api/messages - Crear: "${msg.text}"`)
      })
  }

  const update = (id: number) => {
    if (!editText.trim()) return
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    })
      .then((r) => r.json())
      .then((msg) => {
        setMessages((prev) => prev.map((m) => (m.id === id ? msg : m)))
        setEditId(null)
        setEditText('')
        setMethodMsg(`PUT /api/messages/${id} - Actualizar completamente`)
      })
  }

  const patch = (id: number) => {
    if (!editText.trim()) return
    fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    })
      .then((r) => r.json())
      .then((msg) => {
        setMessages((prev) => prev.map((m) => (m.id === id ? msg : m)))
        setEditId(null)
        setEditText('')
        setMethodMsg(`PATCH /api/messages/${id} - Actualizar parcialmente`)
      })
  }

  const remove = (id: number) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then((r) => r.json())
      .then(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id))
        setMethodMsg(`DELETE /api/messages/${id} - Eliminar mensaje`)
      })
  }

  const startEdit = (msg: Message) => {
    setEditId(msg.id)
    setEditText(msg.text)
  }

  return (
    <div className="app">
      <h1>CRUD con Vite + Express + CORS</h1>

      <div className="method-badge">{methodMsg}</div>

      <div className="create-form">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nuevo mensaje..."
        />
        <button className="btn post" onClick={create}>POST - Crear</button>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            {editId === msg.id ? (
              <div className="edit-form">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="btn put" onClick={() => update(msg.id)}>PUT</button>
                <button className="btn patch" onClick={() => patch(msg.id)}>PATCH</button>
                <button className="btn cancel" onClick={() => setEditId(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                <span className="msg-text">{msg.text}</span>
                <span className="msg-id">ID: {msg.id}</span>
                <div className="actions">
                  <button className="btn edit" onClick={() => startEdit(msg)}>Editar</button>
                  <button className="btn delete" onClick={() => remove(msg.id)}>DELETE</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <p className="footer">
        Métodos CORS permitidos: GET, POST, PUT, PATCH, DELETE
      </p>
    </div>
  )
}

export default App
