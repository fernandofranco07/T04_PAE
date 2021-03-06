var express = require ('express');
var router = express.Router();

let AnimalController = require('../controllers/animals');

/* GET animals listing */
router.get('/', AnimalController.readAnimal);
/* POST animal */
router.post('/', AnimalController.createAnimal);
/* PUT animal */
router.put('/:id', AnimalController.updateAnimal);
/* DELETE animal */
router.delete('/:id', AnimalController.deleteAnimal);

module.exports = router;

