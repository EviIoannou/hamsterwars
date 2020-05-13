const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { createId, getTimestamp, getPlayer, getWinner, updateData } = 
require('../modules/gameFunctions');

const router = new Router();

//POST a new hamster war!
router.post('/', async (req, res) => {

    //give each match an id
    let id = createId(4);
    let contestants = [req.body.contestants]; // this array will include two hamster objects from firestore
    let winner = "";
    let loser = "";

    winner = await getWinner(req.body.winner); //choose a player id; this player is the winner
    let winnerId = winner.id;

    //scenario for two contestants
    if (winnerId === contestants[0].id){
        loser = playerTwo
    } 
    
    else if (winnerId === contestants[1].id){
        loser = playerOne
    }
    

    let loserId = loser.id;

   //update contestants' data with a function from the module gameFunctions
    await updateData(winnerId, 1, 0);
    await updateData(loserId, 0, 1);
    
    // get winner data again (updated)
    winner = await getPlayer(winnerId) 
    
    //Save the game in a 'games' collection
    await db.collection('games').doc(id).set({
        id: id,
        timeStamp: getTimestamp(), //function to get today's timestamp
        contestants: contestants,
        winner: winner
    })

    let game = await db.collection('games').doc(id).get();
    let gameData = game.data();
    

    res.send({
        msg: `Game ${id} between ${playerOne.name} and ${playerTwo.name} is on! `,
        id: gameData.id,
        timeStamp: gameData.timeStamp,
        contestants: gameData.contestants,
        winner: gameData.winner
    })
 })

//GET all games data
router.get('/', async (req, res) => {
    let games = [];

    let snapShot = await db.collection('games').get();
    try{
       snapShot.forEach(game => {
        console.log(game.data())
        games.push(game.data())
        })
        res.send(
            {games: games}
        );
    
    }
   catch(err){
       console.error(err)
   }

})
module.exports = router;