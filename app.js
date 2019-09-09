const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const workshopRoutes = require('./api/routes/worshops');
const instructorRoutes = require('./api/routes/instructor');

const url = 'mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@node-rest-9ojk7.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, { 
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(cors({origin: '*'}))
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
});
*/

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use("/user", userRoutes);
app.use("/workshops", workshopRoutes);
app.use("/instructors", instructorRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;