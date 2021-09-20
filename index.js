const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Welcome!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p> ${Date()}
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = body.name
  const number = body.number

  if (!name || !number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  } else if (persons.find(person => person.name === name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: name,
    number: number,
    id: Math.round(Math.random() * 1000)
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})