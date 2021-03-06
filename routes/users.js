var express = require('express');
var router = express.Router();

let UserController = require('../controllers/users');

/* GET users listing. */
router.get('/', UserController.readUsers);
/* POST user */
router.post('/', UserController.createUser);
/* PUT user */
router.put('/:id', UserController.updateUsers);
/* DELETE user */
router.delete('/:id', UserController.deleteUser);

module.exports = router;
