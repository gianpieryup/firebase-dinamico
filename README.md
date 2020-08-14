# Firebase dinámico

### URL

````
https://fir-express-e72b7.web.app
````



#### Conectar al hosting

````
firebase init hosting
````

Elegimos el proyecto que creamos en firebase, 

````python
> Use an existing project
# Enter, luego elegimos y luego enter

--------------------------
? What do you want to use as your public directory? (public)
# escribimos public y luego enter

--------------------------
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
# Escribimos n y luego enter
````



#### Funciones

Ósea todo lo dinámico, 

````python
firebase init functions

? What language would you like to use to write Cloud Functions? 
> JavaScript
> TypeScript
# Elegimos JavaScript, a menos que queramos usar angular o algo que nesecite TypeScript

? Do you want to use ESLint to catch probable bugs and enforce style?
# Escribimos n y luego enter
````

La estructura del proyecto queda definida

En `firebase.json`, debemos agregar las rutas(`rewrites`)  con los parámetros

````json
// "source": "**", significa todos las rutas
// "functions": La funcion app, ojo en index,js no olvidar exportar app
{
  "hosting": {
    "public": "public",
    "rewrites": [{
       "source": "**",
       "function": "app"
    }],
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
````

Ahora en `Functions` puedo usar express, motor de vistas, etc

````shell
cd functions
npm i express
````

En `index.js`

````javascript
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
````

En `users.js`

````javascript
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.json({"status": "picante la cancha pERRO"})

})

module.exports = router;
````



#### Crear una emulación local

Abre un puerto local donde probar

````shell
firebase serve --only functions,hosting
````


### Deploy
````shell
firebase deploy
````

# Error al Deploy
Segun Google si quieres usar `{"node": "10"}` te pide que te cambies del plan free al blaze o no se como lo llaman, no te deja
Puedes solucionarlo entrando a `package.json` y cambiando a `{"node": "8"}` te aparecera
<br>
El tiempo de ejecución de Node.js 8 está obsoleto y se dará de baja el 2021-03-15
<br>
Pero esto soluciona el problema

### Usar handlebars
npm install --save engine-handlebars

Esto instalara dos dependencias  engine y handlebars de

Debemos agregar en `index.js`

````javascript
const engines = require('consolidate');

app.engine('hbs', engines.handlebars);
app.set('views', './views');//El punto XD
app.set('view engine', 'hbs');
````

````javascript
// Puedes mandar distintos parametros a la vista
router.get('/', function(req, res, next) {
  res.render('index',{
      style: 'home.css',//Con esto yo defino el style
      title: 'home',//El title del [HEAD]
  });
});
````

