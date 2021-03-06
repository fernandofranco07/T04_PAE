'use strict'

let User = require('../models/users');

function createUser(req, res) {
    let user = new User();
    let body  = req.body;

    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    user.age = body.age;

    let errorMessage = 'The following fields are invalid or missing: '
    let error = false;

    if(user.name == undefined || user.name.length < 5) {
        error = true;
        errorMessage += 'name '
    }
    if(user.email == undefined) {
        error = true;
        errorMessage += 'email '
    }
    if(user.password == undefined) {
        error = true;
        errorMessage += 'password '
    }
    if(user.age == undefined || user.age <= 0) {
        error = true;
        errorMessage += 'age '
    }

    if(error) {
        res.status(400).send({ message : `${errorMessage}` });
    } else {
        user.save((err, storedUser) => {
            if(err){
                res.status(500).send({ mesage :  `${err}` });
            } else {
                if(!storedUser){
                    res.status(404).send({ message : 'Error while saving user.' });
                } else {
                    res.status(201).send({ message : 'User created successfully.', user : storedUser });
                }
            }
        });
    }
}

function readUsers(req,res) {
    User.find({},(err,users) => {
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(Object.entries(users).length === 0){
                res.status(404).send({ message : 'Users not found.' });
            }else{
                res.status(200).send({ message : 'Users obtained', users : users});
            }
        }
    });
}

function updateUsers(req, res) {
    let userId = req.params.id;
    let body = req.body;
    let update = body;

    User.findOneAndUpdate({ _id : userId }, update, { new : true, useFindAndModify : false}, (err,updatedUser) =>{
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(!updatedUser){
                res.status(404).send({ message : 'Could not update the user\'s data.' });
            }else{
                res.status(200).send({ message :'User\'s data updated.', user : updatedUser })
            }
        }
    });
}

function deleteUser(req, res) {
    let userId = req.params.id;
    User.deleteOne({ _id : userId}, (err) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'User deleted.' });
        }
    });
}


module.exports = {
    createUser,
    readUsers,
    updateUsers,
    deleteUser
}