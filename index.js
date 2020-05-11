const express = require('express');
const app = express();

app.use('/assets', express.static('pictures'));
app.use(express.json());

//Require routes

const chartsRoute = require('./routes/charts');
app.use('/charts', chartsRoute);

const gamesRoute = require('./routes/games');
app.use('/games', gamesRoute);

const hamstersRoute = require('./routes/hamsters');
app.use('/hamsters', hamstersRoute);

const statsRoute = require('./routes/stats');
app.use('/stats', statsRoute);

//App listening to port 3000
app.listen(3000, () => {
    console.log('Get ready for hamster wars on port 3000!')
})