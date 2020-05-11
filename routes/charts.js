const { Router } = require('express');
// const { auth, db } = require('./../firebase');
const { getChart } = require('../modules/chartFunctions')
const router = new Router();

router.get('/top', async (req, res) => {
    let winners = await getChart('+');
    res.send({
        top: winners
    })

})

router.get('/bottom', async (req, res) => {
    let losers = await getChart('-');
    res.send({
        bottom: losers
    })
})

module.exports = router;