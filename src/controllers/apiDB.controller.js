const dbCtrl = {};
const pg = require('../database');


dbCtrl.insertEspData = async (req) => {

    // console.log(req.body);

    try {
        let fecha = 'now()';

        let values = [req.body.valueTemp, req.body.valueHum, fecha];

        let query = 'INSERT INTO datos(temperatura, humedad, fecha) VALUES($1, $2, $3)';

        await pg.query(query, values);

        console.log('Query realizda correctamente');
    } catch (err) {
        console.log(err);
    }

    return 0;
    // return res.status(200).send('QUERY REALIZADA CORRECTAMENTE');
}

// Trae temperatura y humedad de los ultimos X datos de una fecha determinada
dbCtrl.traerTemperatura = async () => {

    try {
        let fecha = new Date().toISOString();

        let values = [fecha]


        let query = 'SELECT * FROM datos WHERE fecha <= $1 ORDER BY fecha DESC LIMIT 10'

        let datos = (await pg.query(query, values)).rows;
        // console.log(datos)

        return datos;
    } catch (err) {
        console.log(err);
    }


    return 0;

}



dbCtrl.crearPlanta = async (req) => {


    try {

        let maxID = (await pg.query('SELECT max(id) FROM plantas')).rows[0].max;

        if (maxID != null) {
            maxID += 1;

            console.log(req.body, maxID)
            let values = [maxID, req.body.nombre];
            let query = 'INSERT INTO plantas(id, nombre) values($1, $2)';


            await pg.query(query, values);

            console.log('Query realiada correctamente')
        } else {
            maxID = 0;

            console.log(req.body, maxID)
            let values = [maxID, req.body.nombre];
            let query = 'INSERT INTO plantas(id, nombre) values($1, $2)';


            await pg.query(query, values);

            console.log('Query realiada correctamente')

        }


    } catch (err) {
        console.log(err);
    }
}


dbCtrl.traerPlantas = async () => {

    try {

        let query = 'SELECT * FROM plantas';

        let datos = (await pg.query(query)).rows;

        return datos;
    } catch (err) {
        console.log(err);
    }
}


dbCtrl.eliminarPlanta = async (idEliminar) => {


    try {
        

        let values = [idEliminar];
        let query = 'DELETE FROM plantas WHERE id = $1';

        await pg.query(query, values);

        console.log('Planta eliminada correctamente');
        return 0;
    } catch (err) {
        console.log(err);
        return 1;
    }
}

module.exports = dbCtrl;