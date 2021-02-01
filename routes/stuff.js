const express = require('express');
const router = express.Router(); // creer un routeur

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

// traiter les requets de type post ( pour capturer les donnees du formulaire )
router.post('/', auth, stuffCtrl.createThing);

//modifier les details d'un objet specifique 
router.put('/:id', auth, stuffCtrl.updateThing);

//supprimer les details d'un objet specifique 
router.delete('/:id', auth, stuffCtrl.deleteThing);

//voire les details d'un objet specifique 
router.get('/:id', auth, stuffCtrl.getOneThing);

// la foction qui recoi la rep dans la route /api/stuff
router.get('/', auth, stuffCtrl.getAllThings);

// exporter le router
module.exports = router;