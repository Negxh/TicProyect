const hours = [
    {
        interval: '02:00',
        temp: '17',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '2', dir: 'SE', symbol: '4', symbolB: '12', gusts: '5' },
        rain: '0',
        humidity: '52',
        pressure: '1015',
        clouds: '0%',
        snowline: '4400',
        windchill: '17',
        uv_index: '0'
    },
    {
        interval: '05:00',
        temp: '16',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '4', dir: 'NE', symbol: '2', symbolB: '18', gusts: '7' },
        rain: '0',
        humidity: '54',
        pressure: '1013',
        clouds: '0%',
        snowline: '4300',
        windchill: '16',
        uv_index: '0'
    },
    {
        interval: '08:00',
        temp: '16',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '3', dir: 'N', symbol: '1', symbolB: '17', gusts: '7' },
        rain: '0',
        humidity: '52',
        pressure: '1014',
        clouds: '0%',
        snowline: '4300',
        windchill: '16',
        uv_index: '0'
    },
    {
        interval: '11:00',
        temp: '22',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '4', dir: 'W', symbol: '7', symbolB: '31', gusts: '16' },
        rain: '0',
        humidity: '39',
        pressure: '1015',
        clouds: '0%',
        snowline: '4400',
        windchill: '25',
        uv_index: '3'
    },
    {
        interval: '14:00',
        temp: '30',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: {
            speed: '12',
            dir: 'SW',
            symbol: '14',
            symbolB: '46',
            gusts: '29'
        },
        rain: '0',
        humidity: '20',
        pressure: '1014',
        clouds: '0%',
        snowline: '4400',
        windchill: '28',
        uv_index: '8'
    },
    {
        interval: '17:00',
        temp: '30',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: {
            speed: '15',
            dir: 'SW',
            symbol: '14',
            symbolB: '46',
            gusts: '35'
        },
        rain: '0',
        humidity: '15',
        pressure: '1013',
        clouds: '0%',
        snowline: '4400',
        windchill: '28',
        uv_index: '3'
    },
    {
        interval: '20:00',
        temp: '23',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '7', dir: 'SW', symbol: '6', symbolB: '38', gusts: '20' },
        rain: '0',
        humidity: '22',
        pressure: '1015',
        clouds: '0%',
        snowline: '4400',
        windchill: '24',
        uv_index: '0'
    },
    {
        interval: '23:00',
        temp: '21',
        symbol_value: '1',
        symbol_description: 'Cielos despejados',
        symbol_value2: '1',
        symbol_description2: 'Cielos despejados',
        wind: { speed: '4', dir: 'S', symbol: '5', symbolB: '21', gusts: '9' },
        rain: '0',
        humidity: '28',
        pressure: '1015',
        clouds: '0%',
        snowline: '4600',
        windchill: '21',
        uv_index: '0'
    }
]

function filtrarPorHora(hour) {
    const arrayHours = []

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // let hora1 = hours + ":" + minutes;
    let hora1 = "21:00";
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