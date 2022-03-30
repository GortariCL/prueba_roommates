const fs = require('fs');
const { gastosRoommates } = require('./montos');
const send = require('./send_mail');


//peticion: POST gastos
const gastosRoommate = (g) => {
    const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
    const gastos_arr = gastosJSON.gastos;
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
    const roommates_arr = roommatesJSON.roommates;
    if (roommates_arr.length > 0) { //Se valida que existan roommates para no crear gastos null
        gastos_arr.push(g);  
        gastosRoommates(gastosJSON);        
        fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
        //Requerimiento 6
        const correos = roommates_arr.map((r) => r.correo);
        send(g.roommate, g.descripcion, g.monto, correos).then(() => {
            console.log('Envío de correo exitoso');
        }).catch(e => {
            console.log('Error durante el envío de email: ', e);
        }); 
    }else{
        console.log('No se han agregado roommates');
    }
}

//peticion: DELETE gastos
const deleteGasto = (id) => {
    const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
    const gastos_arr = gastosJSON.gastos;
    gastosJSON.gastos = gastos_arr.filter((g) => g.id !== id);
    fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
    gastosRoommates(gastosJSON);
}

module.exports = { gastosRoommate, deleteGasto };