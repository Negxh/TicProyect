const { json } = require("express");
const openai = require("../config/apiChatgpt");
const cambiarFecha = require('../helpers/helpFecha');
const {filtrarPorHora} = require("../helpers/helpHora");
const { PythonShell } = require('python-shell');
const dbCtrl = require("./apiDB.controller");

//API meteored.cl
//user: xalen15315@marikuza.com
//password: Maquinadesoldar1


//controlador de la api para exportar a las rutas
const apiCtrl = {};

//variables que se mostraran luego (Las importantes)
var variables = {};


//Muestra los datos importantes a necesitar
apiCtrl.getImportant = async (req, res) => {

    let variablesRes = {}
    let region = req.params.region;
    var idLocalidadBuscar = 0;

    console.log(region)

    try {

        const responseRegion = await fetch('https://www.meteored.cl/peticionBuscador.php?lang=cl&texto=' + region)
        const dataRegion = await responseRegion.json()
        
        console.log(dataRegion.localidad[0]) 

        idLocalidadBuscar = dataRegion.localidad[0].id;
        region = dataRegion.localidad[0].nombre;
        
        console.log('ID de', region, ':', idLocalidadBuscar)
        
        
    }catch{
        console.error('Error al llamar a la API:', error);
    }
    
    

    try {
        const response = await fetch('http://api.meteored.cl/index.php?api_lang=cl&localidad=' + idLocalidadBuscar + '&affiliate_id=xg7hbvz367mm&v=3.0');
        const data = await response.json();

        const dataPorDia = data.day[1];

        //Funcion para pasar la fecha de "AAAAMMDD" a palabras
        let fecha = cambiarFecha(dataPorDia.date);

        //Funcion que filtra por horario para mostrar los datos del horario que estamos
        let horaIndex = filtrarPorHora(dataPorDia.hour)
        let horaNow = dataPorDia.hour[horaIndex];

        let wind = horaNow.wind.speed;
        let humidity = horaNow.humidity;
        let temp = horaNow.temp;
        // console.log(wind, humidity)

        //Se le asignan todas las variables importantes a mostrar luego
        // variables = {

        //     dayName: dataPorDia.name,
        //     fullDate: fecha,
        //     tempMin: dataPorDia.tempmin,
        //     tempMax: dataPorDia.tempmax,
        //     hours: dataPorDia.hour[horaIndex]
        // }

        variablesRes =
        {
            dayName: dataPorDia.name,
            temp: temp,
            fullDate: fecha,
            tempMax: dataPorDia.tempmax,
            wind: wind,
            humidity: humidity,
            nameRegion: region
        }

        // console.log(variablesRes)





        return res.status(200).json(variablesRes);

    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }


    return res.status(200).json(variables)
}





//Muestra todos los datos de la api en un formato JSON
apiCtrl.getAll = async (req, res) => {

    try {
        const response = await fetch('http://api.meteored.cl/index.php?api_lang=cl&localidad=18578&affiliate_id=xg7hbvz367mm&v=3.0');
        const data = await response.json();

        const dataPorDia = data.day[1];


        return res.status(200).json(data);

    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }

}



apiCtrl.fastDirection = async (req, res) => {

    try {
        const response = await fetch('http://api.meteored.cl/index.php?api_lang=cl&localidad=18578&affiliate_id=xg7hbvz367mm&v=3.0');
        const data = await response.json();

        const dataPorDia = data.day[1];

        //Funcion para pasar la fecha de "AAAAMMDD" a palabras
        let fecha = cambiarFecha(dataPorDia.date);


        //Funcion que filtra por horario para mostrar los datos del horario que estamos
        let horaIndex = filtrarPorHora(dataPorDia.hour)


        //Se le asignan todas las variables importantes a mostrar luego
        variables = {

            dayName: dataPorDia.name,
            fullDate: fecha,
            tempMin: dataPorDia.tempmin,
            tempMax: dataPorDia.tempmax,
            hours: dataPorDia.hour[horaIndex]
        }

        return res.status(200).render('home', { variables });

    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }

}


apiCtrl.postWifiModulo = async (req, res) => {

    // console.log(req.body);

    // dbCtrl.insertEspData(req);
    // let datos = dbCtrl.traerTemperatura();

    return res.status(200).redirect('/');

}

apiCtrl.getTemperatura = async (req, res) => {


    let datos = await dbCtrl.traerTemperatura();

    return res.status(200).json(datos)
}

apiCtrl.crearPlanta = async (req, res) => {

    dbCtrl.crearPlanta(req);

    // console.log(req.body)

    return res.status(200).send('HECHO');

}


apiCtrl.getAllPlantas = async (req, res) => {

    let datos = await dbCtrl.traerPlantas();


    return res.status(200).json(datos);
}

apiCtrl.eliminarPlanta = async (req, res) => {

    console.log(req.body);

    dbCtrl.eliminarPlanta(req.body.id);

}


// apiCtrl.buscarRegion = async (req, res) => {


//     var region = req.body.region;
//     console.log("Body", req.body)

//     // console.log("Region", region);

//     try {
//         const response = await fetch('https://www.meteored.cl/peticionBuscador.php?lang=cl&texto=' + region);
//         const data = await response.json();


//         console.log(data.localidad[0])
//         idLocalidadBuscar = data.localidad[0].id;

//         localidad = {
//             id: idLocalidadBuscar,
//             nombre: region
//         };

//         // console.log(localidad)

//         return res.status(200).redirect('/getImportant');

//     } catch (error) {
//         console.error('Error al llamar a la API:', error);
//     }
// }


module.exports = apiCtrl;