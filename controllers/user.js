const User = require('../models/User');
// importation du package de cryptage 
const bcrypt = require('bcrypt');
// importation du package jsonwebtoken pour creation du token de l ID pour chaque user connecté.
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    // commencer par haché le mot de passe
    bcrypt.hash(req.body.password, 10) // 10 fois d'execution d'algo de hash
        .then(hash => {
            // creer un user 
            const user = new User({
                email: req.body.email,
                password: hash // en lui passe le mdps crypté
            });
            // sauvegarder
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    // enregistrer dans DB 
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'utilistateur non trouvé !' });
            }
            // comparer le hach entré avec le hach dans le document user (db)
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.staus(401).json({ error: 'mot de passe invalide !' });
                    }
                    // on renvoie au frontend un objet attendu
                    res.status(200).json({
                        userId: user._id,
                        tokent: jwt.sign({ userId: user._id }, //les donnée a encodé
                            'RANDOM_TOKEN_SECRET', //une chaîne secrète de développement
                            { expiresIn: '24h' } // la dure de validité du token (L'utilisateur devra donc se reconnecter au bout de 24 heures)
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};



/*

exports.updateUser = (req, res, next) => {
    // updateOne recoi deux parametre (l'id de lobjet a modifier , l'objet aui va remplacer)
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(user => res.status(200).json({ message: 'objet modifié !' }))
        .catch(error => resstatus(404).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(user => res.status(200).json({ message: 'objet supprimé !' }))
        .catch(error => resstatus(404).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => resstatus(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};*/