const router = require('express').Router();
const controllerAPI = require('../controllers/apiClima.controller');
const controllerDB= require('../controllers/apiDB.controller');



router.get('/', controllerAPI.fastDirection);
router.get('/getAll', controllerAPI.getAll);
router.get('/getImportant/:region', controllerAPI.getImportant);

router.post('/postWifiModulo', controllerAPI.postWifiModulo);
router.get('/chartTemperatura', controllerAPI.getTemperatura);
router.post('/crearPlanta', controllerAPI.crearPlanta);
router.get('/getAllPlantas', controllerAPI.getAllPlantas);
router.post('/eliminarPlanta', controllerAPI.eliminarPlanta);




// Rutas sql

router.post('/postDatos', controllerDB.insertEspData);





module.exports = router;



