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

  const { awardInput, userListInput, isOnly } = req.body
  const awards = awardInput.split(/\r\n/g)
  const userListInputTrim = userListInput.trim()
  const originalUserList = userListInputTrim.trim().split(/\n|\r\n/g)
  const userList = userListInputTrim.split(/\n|\r\n/g)
  const awardsList = []
  let winnerList = []
  let total = ''
  let newUserList = userList

  if (isOnly === 'on') {
    const result = userList.filter(function (element, index, userList) {
      return userList.indexOf(element) === index
    })
    newUserList = result
  }

  for (let i = 0; i < awards.length; i++) {
    const newAwars = awards[i].split(',')
    const awardName = newAwars[0]
    const awardNum = Number(newAwars[1])

    for (let j = 1; j <= awardNum; j++) {
      let winners = generateWinner(awardsList, newUserList, isOnly)

      if (winners.length === 0) {
        winners = '(從缺)'
      }

      winnerList += awardName + `-${j}： ${winners}\n`
      total++
    }
  }

  res.render('index', {
    awardInput,
    userListInput: userListInputTrim,
    isOnly,
    winnerList,
    awardCount: awards.length,
    total,
    userNum: originalUserList.length
  })
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
