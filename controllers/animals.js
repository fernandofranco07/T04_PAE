'use strict'

const animals = require('../models/animals');
let Animal = require('../models/animals');

function createAnimal(req,res){
    let animal = new Animal();
    let body = req.body;

    animal.animalname = body.animalname;
    animal.breedname = body.breedname;
    animal.speciesname = body.speciesname;
    animal.animalage = body.animalage;
    animal.basecolour = body.basecolour;
    animal.userId = body.userId;

    /* Validation if the body contains the required field*/
    if(animal.userId == undefined || animal.animalname == undefined || animal.breedname == undefined || animal.speciesname == undefined || animal.animalage == undefined || animal.animalage == undefined){
        res.status(400).send({message: "Please send the required attributes"});
        return;
    }
    if(animal.animalnamelength < 5){
        res.status(400).send({message: "Name must be at least 5 characters long."});
        return;
    }

    if(typeof(animal.breedname) != 'string'){
        res.status(400).send({message: "Breed must be a string"});
        return;
    }

    if(typeof(animal.animalage) != 'number'){
        res.status(400).send({message: "Age must be a number"});
        return;
    }

    if(typeof(animal.basecolour) != 'string'){
        res.status(400).send({message: "Color must be a string"});
        return;
    }
    
    animal.save((err, storedAnimal) => {
        if(err){
            res.status(500).send({ mesage :  `${err}` });
        } else {
            if(!storedAnimal){
                res.status(404).send({ message : 'Error while saving animal.' });
            } else {
                res.status(201).send({ message : 'Animal created successfully.', animal : storedAnimal });
            }
        }
    });
}

function readAnimal(req,res) {
    Animal.find({}, (err, animals) =>{
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(Object.entries(animals).length === 0){
                res.status(404).send({ message : 'Animals not found.' });
            }else{
                res.status(200).send({ message : 'Animals obtained', animals : animals});
            }
        }
    });
}

function updateAnimal(req,res){
    let id = req.params.id;
    let update = req.body;

    Animal.findOneAndUpdate({ _id : id }, update, { new : true, useFindAndModify : false}, (err,updatedAnimal) =>{
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(!updatedAnimal){
                res.status(404).send({ message : 'Could not update the animal\'s data.' });
            }else{
                res.status(200).send({ message :'Animal\'s data updated.', animal : updatedAnimal })
            }
        }
    });
}

function deleteAnimal(req,res){
    let animalId = req.params.id;
    Animal.deleteOne({_id : animalId}, (err) =>{
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'Animal deleted.' });
        }
    });
}

module.exports = {
    createAnimal,
    readAnimal,
    updateAnimal,
    deleteAnimal
}