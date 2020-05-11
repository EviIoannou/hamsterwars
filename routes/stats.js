const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { totalGames } = require('../modules/statsFunctions')

const router = new Router();

router.get('/total', async (req, res) => {
    let total = await totalGames();
    res.send({
        totalGames: total
    })
})

router.get('/favourite/:food', async (req, res) =>{
    
})
module.exports = router ; 