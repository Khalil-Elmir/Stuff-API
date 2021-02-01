/* I)
// 1- importer le package http de node
const http = require('http');

// 2- creer un serveur d'apres l'objet http 
// en utilisant la methode createServer du package http
const server = http.createServer((req , res) => {
    //la fonction qui sera appeler a chaque requete recu par le serveur 
    // on utilise la methode end de la reponse pour renvoyer une reponse de type string 
    res.end('voilà la reponse du serveur !');
});

// 3- ecouter les requets envoyé
server.listen(process.env.PORT || 3000);

*/

/* II)  */
const http = require('http');
const app = require('./app');

// l'application express sur quel port elle va tournée
app.set('port', process.env.PORT || 3000);

// 2- creer un serveur d'apres l'objet http 
const server = http.createServer(app);

// 3- ecouter les requets envoyé
server.listen(process.env.PORT || 3000);