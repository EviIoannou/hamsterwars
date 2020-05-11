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
    let myHamsters = [] ;
    let allHamsters = await db.collection('hamsters').where("favFood", "==", food).get();
    allHamsters.forEach(hamster =>{
        myHamsters.push(hamster.data());
    })
    let foodPercentage =  (myHamsters.length / 40) * 100 + '%'
    console.log(foodPercentage)
    return foodPercentage;
}
module.exports = { totalGames, favouriteFood }