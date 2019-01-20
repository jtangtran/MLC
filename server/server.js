const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Welcome to My Living City!'))

app.listen(port, () => console.log(`My Living City listening on port ${port}!`))