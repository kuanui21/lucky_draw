function generateWinner (awardInput, awardNumInput) {
  const awardNum = Number(awardNumInput)
  const userListInput = [
    'Rebecca',
    'Knox',
    'Faith',
    'Dickens',
    'Grace',
    'Mackenzie',
    'Carol',
    'Allan',
    'Ava',
    'Brown'
  ]

  let winnerList = ''
  for (let i = 1; i <= awardNum; i++) {
    const index = Math.floor(Math.random() * userListInput.length)
    if (winnerList.includes(userListInput[index])) {
      i--
      continue
    }
    winnerList += awardInput + `-${i}：` + userListInput[index] + ',\n'
  }
  winnerList += '以上為得獎名單。'
  return winnerList
}

module.exports = generateWinner
