const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { createId, getTimestamp, getRandomPlayer, getPlayer } = require('../modules/gameFunctions');

const router = new Router();

//POST a new hamaster war!
router.post('/', async (req, res) => {

    //give each match an id
    let id = createId(4);
    let playerOne = "";
    let playerTwo = "";

    if (Object.keys(req.body).length === 0) { // if user does not choose any players, get two random players

        playerOne = await getRandomPlayer();
        playerTwo = await getRandomPlayer();
        if (playerTwo === playerOne) {
            //if player two is same as player one, get another random player
            playerTwo = getRandomPlayer();
        }
    } else { //else request sepcific players in JSON body using their id 1-40
        playerOne = await getPlayer(req.body.playerOne);
        playerTwo = await getPlayer(req.body.playerTwo);
    }


    //Save the game in a 'games' collection
    await db.collection('games').doc(id).set({
        timeStamp: getTimestamp(), //function to get today's timestamp
        contestants: [playerOne, playerTwo]
    })

    let game = await db.collection('games').doc(id).get();
    let gameData = game.data();
    console.log(gameData);

    res.send({
        msg: `Game ${id} between ${playerOne.name} and ${playerTwo.name} is on! `,
        game: gameData
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