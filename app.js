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
  // const { awardInput, awardNumInput, userListInput } = req.body
  // const userListInputTrim = userListInput.trim()
  // const userList = userListInputTrim.split(/\n|\r\n/g)
  // const winnerList = generateWinner(awardInput, awardNumInput, userList)

  // res.render('index', { awardInput, awardNumInput, userListInput: userListInputTrim, winnerList })

  const { awardInput, userListInput } = req.body
  const awards = awardInput.split(/\r\n/g)
  const userListInputTrim = userListInput.trim()
  const userList = userListInputTrim.split(/\n|\r\n/g)
  const awardsList = []
  let winnerList = []

  for (let i = 0; i < awards.length; i++) {
    const newAwars = awards[i].split(',')
    const awardName = newAwars[0]
    const awardNum = Number(newAwars[1])
    const newUserList = userList

    for (let j = 1; j <= awardNum; j++) {
      const winners = generateWinner(awardsList, newUserList)
      winnerList += awardName + `-${j}： ${winners}\n`
    }
  }

  res.render('index', { awardInput, userListInput: userListInputTrim, winnerList })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
