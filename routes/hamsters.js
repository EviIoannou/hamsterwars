const {
    Router
} = require('express');
const {
    db
} = require('./../firebase');

const router = new Router();

router.get('/', async(req, res) => {

    let docs = [];

    //anropa firebase, hämta doc med :id
    let snapShot = await db.collection('hamsters').get();
    try{
       snapShot.forEach(doc => {
        console.log(doc.data())
        console.log(docs.length)
        docs.push(doc.data())
    })
    res.send(
        docs
    );
  
    }
   catch(err){
       console.error(err)
   }
})
module.exports = router ; 