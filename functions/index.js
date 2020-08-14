const functions = require('firebase-functions');
const express = require('express');

// este es el app de firebase.json
const app = express();

// Importar rutas
const userRoutes = require('./controllers/users');

app.get('/hola',(req,res) => {
    res.send(`${Date.now()}`);
})

app.use('/users',userRoutes);

exports.app = functions.https.onRequest(app);