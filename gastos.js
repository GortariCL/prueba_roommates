const fs = require('fs');
const { gastosRoommates } = require('./montos');

const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
const gastos_arr = gastosJSON.gastos;

//peticion: POST gastos
const gastosRoommate = (g) => {
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
    const roommates_arr = roommatesJSON.roommates;
    if (roommates_arr.length > 0) { //Se valida que existan roommates para no crear gastos null
        gastos_arr.push(g);
        const gastos = gastosRoommates(gastosJSON);
        fs.writeFileSync('gastos.json', JSON.stringify(gastos));
    }else{
        console.log('No se han agregado roommates');
    }
}

//peticion: DELETE gastos
const deleteGasto = (id) => {
    gastosJSON.gastos = gastos_arr.filter((g) => g.id !== id);
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
    gastosRoommates(gastosJSON);
}

module.exports = { gastosRoommate, deleteGasto };