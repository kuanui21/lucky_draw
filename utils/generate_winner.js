function generateWinner (awardInput, awardNumInput, userList) {
  let awardNum = Number(awardNumInput)
  let winnerList = ''

  if (userList.length < awardNum) {
    awardNum = userList.length
  }

  for (let i = 1; i <= awardNum; i++) {
    const index = Math.floor(Math.random() * userList.length)
    if (winnerList.includes(userList[index])) {
      i--
      continue
    }
    winnerList += awardInput + `-${i}: ` + userList[index] + '\n'
  }
  winnerList += '以上為得獎名單。'
  return winnerList
}

module.exports = generateWinner
