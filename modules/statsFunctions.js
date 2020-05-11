const { auth, db } = require('../firebase');

async function totalGames(){
    let games = [];

    let allData = await db.collection('games').get();
    allData.forEach(element =>{
        games.push(element.data())
        console.log(games.length)
    })
    return games.length;
}

async function favouriteFood (food) {
    
}
module.exports = { totalGames }