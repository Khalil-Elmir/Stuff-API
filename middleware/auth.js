const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // recuperer le token dans le header autorisation ( c'est le deuxieme element du tableau )
        const token = req.headers.authorization.sptit(' ')[1];
        // decoder le token 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // recuperer userId dedans
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'user Id non valable !';
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifié' })
    }
};