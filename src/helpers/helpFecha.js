


// const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function cambiarFecha(fecha){
    
    if((typeof fecha) == "string"){

        //separa de 2 en 2 la fecha (es como un split)
        const arrayFecha = fecha.match(/.{1,2}/g);
    
        let indexMes = arrayFecha[2] - 1;
    
        const newFecha = arrayFecha[3] + "-" + arrayFecha[2] + "-" + arrayFecha[0] + arrayFecha[1];
    
        // console.log(newFecha);
        return newFecha;
    }

}


// cambiarFecha("20230329");


module.exports = cambiarFecha;