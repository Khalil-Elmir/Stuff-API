const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
       .then(() => res.status(201).json({ message: 'objet enregisté !'}))
       .catch(error => res.status(400).json({ error }));
};

exports.updateThing = (req, res, next) => {
    // updateOne recoi deux parametre (l'id de lobjet a modifier , l'objet aui va remplacer)
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
       .then(thing => res.status(200).json({ message: 'objet modifié !'}))
       .catch(error => resstatus(404).json({error}));
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
       .then(thing => res.status(200).json({ message: 'objet supprimé !'}))
       .catch(error => resstatus(404).json({error}));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
       .then(thing => res.status(200).json(thing))
       .catch(error => resstatus(404).json({error}));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({error}));
};