// function generateWinner (awardInput, awardNumInput, userList) {
//   let awardNum = Number(awardNumInput)
//   let winnerList = ''

//   if (userList.length < awardNum) {
//     awardNum = userList.length
//   }

//   for (let i = 1; i <= awardNum; i++) {
//     const index = Math.floor(Math.random() * userList.length)
//     if (winnerList.includes(userList[index])) {
//       i--
//       continue
//     }
//     winnerList += awardInput + `-${i}: ` + userList[index] + '\n'
//   }
//   winnerList += '以上為得獎名單。'
//   return winnerList
// }
function generateWinner (awardsList, newUserList) {
  let awardNum = awardsList.length
  let winners = ''

  if (newUserList.length < awardNum) {
    awardNum = newUserList.length
  }

  const index = Math.floor(Math.random() * newUserList.length)
  winners = newUserList[index]
  newUserList = newUserList.splice(index, 1)
  return (winners, newUserList)
}

module.exports = generateWinner
