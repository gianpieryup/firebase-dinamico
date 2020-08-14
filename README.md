# Firebase dinámico

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






