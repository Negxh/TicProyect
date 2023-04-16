

function filtrarPorHora(hour) {
    const arrayHours = []

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // let hora1 = hours + ":" + minutes;
    let hora1 = "14:00";
    const date1 = new Date(`01/01/2000 ${hora1}`);

    for (let i = 7; i >= 0; i--) {

        let hora2 = hour[i].interval;
        let date2 = new Date(`01/01/2000 ${hora2}`);

        // console.log(hora1);
        // console.log(hora2);

        if (date1.getTime() >= date2.getTime()) {
            console.log(hora1, "Esta en el intervalo de las", hora2)
            return i;
        }

    }

    return -1;
}


module.exports = filtrarPorHora;