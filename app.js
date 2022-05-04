const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

const generateWinner = require('./utils/generate_winner')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { awardInput, awardNumInput } = req.body
  const winnerList = generateWinner(awardInput, awardNumInput)

  res.render('index', { awardInput, awardNumInput, winnerList })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
