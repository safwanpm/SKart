const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const RegisterRouter = require('./src/router/RegisterRouter');
const AdminRouter = require('./src/router/AdminRouter');
const UserRouter = require('./src/router/UserRouter');
const CartRouter = require('./src/router/CartRouter');
require('dotenv').config()
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('./public/'));

// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use('/register', RegisterRouter)
app.use('/cart', CartRouter)
app.use('/admin', AdminRouter)
app.use('/user', UserRouter)


const port = process.env.PORT
const connectionString = process.env.connectionString;

mongoose.connect(connectionString)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started `);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
