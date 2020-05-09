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


module.exports = router ; 