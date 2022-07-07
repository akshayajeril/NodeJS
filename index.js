const express = require('express');
const notFound = require('./middleware/not-found')
const authentication = require('./middleware/authentication.middleware')
const connect = require('./db/connection')
const dotenv = require('dotenv').config();
require('express-async-errors');
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean');
var swagger = require('swagger-ui-express')
var yaml = require('yamljs')


const swaggerDoc = yaml.load('./swagger.yaml')
const user = require('./router/user.router')
const jobs = require('./router/jobs.router')
const errHandler = require('./middleware/errorHandler')


//initialize app
const app = express();
app.set('trust proxy', 1)

//middleware
app.use(express.json())

//security packages
app.use(helmet());
app.use(cors());
app.use(xss());


//routes
app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
  });
  app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));
app.use('/api/v1/auth',user)
app.use('/api/v1/jobs',authentication,jobs)
app.use(errHandler)
app.use(notFound)

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

const start = () => {
    
try{
    connect(url);
    app.listen(process.env.PORT || 5000);
    //app.listen(port,console.log(`Server started to listen to port ${port}`));
}catch(err){
    console.log(err);
}
}
start();