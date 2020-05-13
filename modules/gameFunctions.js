
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

async function getWinner(winnerId) { //choose a winner among contestants
    try{
        let winner = '';
        let snapShot = await db.collection('hamsters').where("id", "==", winnerId).get();
        snapShot.forEach(element => {
            winner = element.data()
        })
        return winner; 
    }
    catch(err){
        console.error(err)
    }
}

    //Update hamster data for winner and loser
    async function updateData(id, wins, defeats){
        console.log('Start update.')
     
        let docRef = await db.collection('hamsters').where("id", "==", id*1).get();
        
        docRef.forEach(doc =>{
            let hamster = doc.data()
            hamster.wins += wins,
            hamster.defeats += defeats,
            hamster.games ++
    
            db.collection('hamsters').doc(doc.id).update(hamster)
            console.log(`Hamster ${id} updated. Total wins: ${hamster.wins}, total defeats:${hamster.defeats}, total games: ${hamster.games}.`)
        })

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
module.exports = { createId, getTimestamp, getPlayer, getWinner, updateData }