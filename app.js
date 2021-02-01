// 1- importer express et body parser et mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')
const stuffRoutes = require('./routes/stuff');

// connection avec mongodb atlas
mongoose.connect('mongodb+srv://khalil:khalil07@cluster0.uc2tu.azure.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// 2- creer une application express
const app = express();

// deboger CROS 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// transformer le corp de la requet en objet json 
app.use(bodyParser.json());

// on utilise le routeur stuffRoutes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// 3- exporter cette applicaion pour q'on puisse y acceder depuis dautre fichier du projet
module.exports = app; 