const router = require('express').Router();
const controller = require('../controllers/apiClima.controller');



router.get('/', controller.fastDirection);
router.get('/getAll', controller.getAll);
router.get('/getImportant', controller.getImportant);









module.exports = router;