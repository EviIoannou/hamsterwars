const { auth, db } = require('../firebase');

function createId(length) {

    let id = '';
    let chars = '0123456789';

    for (let i = 0; i < length; i++) {
        let rand = Math.floor(Math.random() * chars.length);
        id += chars[rand];
    }

    return id;

}
async function getPlayer(playerId){
    try{
    let id = playerId;
    let snapShotOne = await db.collection('hamsters').where("id", "==", id).get();
    let player = '';
    snapShotOne.forEach(element => {
        console.log(element.data())
        player = element.data()
    })

    return player;  
    }

    catch(err){
        console.error(err)
    }
    
}
async function getRandomPlayer(){
    try{
    let id = Math.floor(Math.random() * 40);
    let snapShot = await db.collection('hamsters').where("id", "==", id).get();
    let player = '';
    snapShot.forEach(element => {
        console.log(element.data())
        player = element.data()
    })

    return player;  
    }

    catch(err){
        console.error(err)
    }
    
}

async function getWinner(array) { //will choose a random winner among contestants
    try{
       let winnerIndex = Math.floor(Math.random() * array.length);
        let winnerId = array[winnerIndex].id;
        let winner = '';
        let snapShot = await db.collection('hamsters').where("id", "==", winnerId).get();
        snapShot.forEach(element => {
            // console.log('winner data: '+ element.data())
            winner = element.data()
        })
        return winner; 
    }
    catch(err){
        console.error(err)
    }
}

function getTimestamp (){
    //get current date for the timestamp
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    let date = day + '/' + month + '/' + year;
    return date;
}
module.exports = { createId, getTimestamp, getRandomPlayer, getPlayer, getWinner }