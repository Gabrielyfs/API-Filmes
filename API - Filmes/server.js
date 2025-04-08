const express = require('express')
const routes = require('./routes')

const app = express()

// Middleware para processar JSON
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
	console.log("Servidor rodando na porta", 3000)
})

