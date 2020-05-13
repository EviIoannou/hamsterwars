const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

//GET all hamster data
router.get('/', async(req, res) => {

    let hamsters = [];

    let snapShot = await db.collection('hamsters').get();
    try{
       snapShot.forEach(hamster => {
        console.log(hamster.data())
        hamsters.push(hamster.data())
    })
    res.send(
        {hamsters: hamsters}
    );
  
    }
   catch(err){
       console.error(err)
   }
})

//GET data for random hamster
router.get('/random', async(req, res) => {
    let hamster = '';
    let id = Math.floor(Math.random() * 40);
    let snapShot = await db.collection('hamsters').where("id", "==", id).get();
    try{
        snapShot.forEach(element => {
         console.log(element.data())
         hamster = element.data()
        
     })
     res.send(
         {hamster: hamster}
     ); 
     }
    catch(err){
        console.error(err)
    }
})

//GET data for a hamster with specific id
router.get('/:id', async(req, res) => {
    let hamster = '';
    let snapShot = await db.collection('hamsters').where("id", "==", req.params.id*1).get();
    try{
        snapShot.forEach(element => {
         console.log(element.data())
         hamster = element.data()
        
     })
     res.send(
         {hamster: hamster}
     ); 
     }
    catch(err){
        console.error(err)
    }
})

//PUT > Update hamster data manually with requested number of wins, defeats and games; maybe will be used later in FronteEnd project
// router.put('/:id/result', async (req, res) => {
//     let docRef = await db.collection('hamsters').where("id", "==", req.params.id*1).get();
    
//     docRef.forEach(doc =>{
//         let hamster = doc.data()
//         hamster.wins += req.body.wins,
//         hamster.defeats += req.body.defeats,
//         hamster.games += req.body.wins + req.body.defeats

//         db.collection('hamsters').doc(doc.id).update(hamster)
//         .then(res.send(
//         { msg: `Hamster updated. Total wins: ${hamster.wins}, total defeats:${hamster.defeats}, total games: ${hamster.games}.` }
//         ))
//     })

// })


module.exports = router ; 