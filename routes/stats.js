const { Router } = require('express');
const { auth, db } = require('./../firebase');
const { totalGames, favouriteFood } = require('../modules/statsFunctions')

const router = new Router();

router.get('/total', async (req, res) => {
    let total = await totalGames();
    res.send({
        totalGames: total
    })
})

router.get('/favourite/:food', async (req, res) =>{ // change a little so it is statistics, eg percent
    let favFoodHamsters = await favouriteFood(req.params.food);
    res.send({
        msg: `Percentage of hamsters who love ${req.params.food}.`,
        percentage: favFoodHamsters
    })
})
module.exports = router ; 