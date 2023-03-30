const { json } = require("express");
const openai = require("../config/apiChatgpt");
const cambiarFecha = require('../helpers/prueba');
//user: xalen15315@marikuza.com
//password: Maquinadesoldar1


//controlador de la api para exportar a las rutas
const apiCtrl = {};

//variables que se mostraran luego (Las importantes)
var variables = {};


//Trae todos los datos de la api en un formato JSON
apiCtrl.getAll= async (req, res) => {

    try {
        const response = await fetch('http://api.meteored.cl/index.php?api_lang=cl&localidad=18578&affiliate_id=xg7hbvz367mm&v=3.0');
        const data = await response.json();

        const dataPorDia = data.day[1];

        //Funcion para pasar la fecha de "AAAAMMDD" a palabras
        let fecha = cambiarFecha(dataPorDia.date);


        //Se le asignan todas las variables importantes a mostrar luego
        variables = {
            diaFecha: dataPorDia.name,
            dateFull: fecha,
            climaDesc: dataPorDia.symbol_description
        }


        return res.status(200).json(variables);

    } catch (error) {
        console.error('Error al llamar a la API:', error);
    }

}

apiCtrl.getImportant = async (req, res) => {

    return res.status(200).json(variables)

}


module.exports = apiCtrl;