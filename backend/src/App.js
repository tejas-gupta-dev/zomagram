const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/auth.routes');
const routerr = require('./routes/food-partner.routes');
const routes = require('./routes/food.routes');
const cors = require('cors');



const app = express();
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send("hello");
})

app.use('/api/auth', router);
app.use('/api/food', routes);
app.use('/api/food-partner', routerr);

module.exports = app;