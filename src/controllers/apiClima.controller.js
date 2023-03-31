const { json } = require("express");
const openai = require("../config/apiChatgpt");
const cambiarFecha = require('../helpers/helpFecha');
const filtrarPorHora = require("../helpers/helpHora");

//user: xalen15315@marikuza.comZ
//password: Maquinadesoldar1


//controlador de la api para exportar a las rutas
const apiCtrl = {};

//variables que se mostraran luego (Las importantes)
var variables = {};


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


//Muestra los datos importantes a necesitar
apiCtrl.getImportant = async (req, res) => {

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


        return res.status(200).json(variables);

    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }


    return res.status(200).json(variables)
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


module.exports = apiCtrl;