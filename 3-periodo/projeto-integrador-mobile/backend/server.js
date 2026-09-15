const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001
const DB_PATH = path.join(__dirname, 'db.json')

app.use(cors())
app.use(express.json())

// Lê o banco de dados (arquivo JSON)
function lerDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ favoritos: [] }))
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
}

// Salva no banco de dados
function salvarDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// GET /favoritos — listar todos
app.get('/favoritos', (req, res) => {
  const db = lerDB()
  res.json(db.favoritos)
})

// POST /favoritos — adicionar favorito
app.post('/favoritos', (req, res) => {
  const { cardId, nome, tipo, atributo, nivel, atk, def, imagem, nota } = req.body

  if (!cardId || !nome) {
    return res.status(400).json({ erro: 'cardId e nome são obrigatórios' })
  }

  const db = lerDB()

  // Verifica se já está favoritado
  const jaExiste = db.favoritos.find(f => f.cardId === cardId)
  if (jaExiste) {
    return res.status(409).json({ erro: 'Carta já está nos favoritos' })
  }

  const novo = {
    id: Date.now().toString(),
    cardId,
    nome,
    tipo: tipo || '',
    atributo: atributo || '',
    nivel: nivel || null,
    atk: atk || null,
    def: def || null,
    imagem: imagem || '',
    nota: nota || '',
    criadoEm: new Date().toISOString()
  }

  db.favoritos.push(novo)
  salvarDB(db)

  res.status(201).json(novo)
})

// PUT /favoritos/:id — editar nota
app.put('/favoritos/:id', (req, res) => {
  const { id } = req.params
  const { nota } = req.body

  const db = lerDB()
  const index = db.favoritos.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Favorito não encontrado' })
  }

  db.favoritos[index].nota = nota || ''
  salvarDB(db)

  res.json(db.favoritos[index])
})

// DELETE /favoritos/:id — remover favorito
app.delete('/favoritos/:id', (req, res) => {
  const { id } = req.params
  const db = lerDB()
  const index = db.favoritos.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Favorito não encontrado' })
  }

  db.favoritos.splice(index, 1)
  salvarDB(db)

  res.json({ mensagem: 'Removido com sucesso' })
})

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`)
})
