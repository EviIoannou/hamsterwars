const { auth, db } = require('../firebase');

//loop through hamsters and give five top/ bottom according to parameter

async function getChart(parameter) {
    let database = await db.collection('hamsters').get();
    let allHamsters = [] ;

    await database.forEach(element => {
        allHamsters.push(element.data())
        })

    try {
        if (parameter === 'top') {
            let chart = await allHamsters.sort(function (a, b) { //Sort array in descending order from most winning hamster
                return b.wins - a.wins;
            });
           
            let winners = chart.splice(0, 5); //Get the five top in the array
        
            return winners;

        } else if (parameter === 'bottom') {
            let chart = await allHamsters.sort(function (a, b) { //Sort array in descending order from most losing hamster
                return b.defeats - a.defeats;
            });
           
            let losers = chart.splice(0, 5); //Get the five top in the array
        
            return losers;

        }

    } catch (err) {
        console.error(err)
    }

}

module.exports = { getChart }