const router = require('express').Router();
const controller = require('../controllers/apiClima.controller');



router.get('/', controller.fastDirection);
router.get('/getAll', controller.getAll);
router.get('/getImportant/:region', controller.getImportant);

router.post('/postWifiModulo', controller.postWifiModulo);
// router.post('/buscarRegion', controller.buscarRegion)








module.exports = router;



