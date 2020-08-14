const functions = require('firebase-functions');
const express = require('express');
const engines = require('consolidate'); // Configurar hbs

// este es el app de firebase.json
const app = express();

// Config de hbs  ------------------
app.engine('hbs', engines.handlebars);
app.set('views', './views'); // obviamente crea la carpeta 'views'
app.set('view engine', 'hbs'); // se me olvido el punto arriba XD
// ----------------------------------

// Importar rutas
const userRoutes = require('./controllers/users');

app.get('/',(req,res) => {
    //puedes omitir esta linea, es una recomendacion para que sea mas rapido la respuesta del servidor usando la cache de la computadora del usuario
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.render('index',{
        lista:["Yehuda Katz",
                "Alan Johnson",
                "Charles Jolley",
            ]}
    );
})

app.use('/users',userRoutes);

exports.app = functions.https.onRequest(app);