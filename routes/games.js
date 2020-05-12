const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { createId, getTimestamp, getRandomPlayer, getPlayer, getWinner, updateData } = 
require('../modules/gameFunctions');

const router = new Router();
//POST a new hamster war!
router.post('/', async (req, res) => {

    //give each match an id
    let id = createId(4);
    let playerOne = "";
    let playerTwo = "";
    let contestants = [];
    let winner = "";
    let loser = "";

    if (Object.keys(req.body).length === 0) { // if user does not choose any players, get two random players

        playerOne = await getRandomPlayer();
        playerTwo = await getRandomPlayer();
        if (playerTwo === playerOne) {
            //if player two is same as player one, get another random player
            playerTwo = getRandomPlayer();
        }
    } else { //else request specific players in JSON body using their id 1-40
        playerOne = await getPlayer(req.body.playerOne);
        playerTwo = await getPlayer(req.body.playerTwo);
    }

    await contestants.push(playerOne);
    await contestants.push(playerTwo);
    winner = await getWinner(contestants);
    let winnerId = winner.id;

    if (winnerId === playerOne.id){
        loser = playerTwo
        console.log(loser)
    } else if (winnerId === playerTwo.id){
        loser = playerOne
        console.log(loser)
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
        contestants: [playerOne, playerTwo],
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