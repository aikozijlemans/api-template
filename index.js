//const requirements
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
//config
dotenv.config();
//connect database
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to database'));
//middleware express
app.use(express.json());
//middleware route
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(81, () => console.log(`server up and running`))