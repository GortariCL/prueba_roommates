const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { recalcularGastos } = require('./montos');

//Consulta a la API externa
const newRoommate = async () => {
    try {
        const { data } = await axios.get('https://randomuser.me/api');
        const roommate = data.results[0];
        const user = {
            id: uuidv4().slice(-6),
            nombre: `${roommate.name.first} ${roommate.name.last}`,
            correo: roommate.email,
            debe: 0,
            recibe: 0,
            total: 0,
        }
        return user;
    } catch (e) {
        throw e;
    }
};
//peticion: POST roommate
const saveRoommate = (user) => {
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
    roommatesJSON.roommates.push(user);
    fs.writeFileSync('roommates.json', JSON.stringify(roommatesJSON));
}

const recalculaGastos = () => {
    const roommatesJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
    const resultado = recalcularGastos(roommatesJSON);
    fs.writeFileSync('roommates.json', JSON.stringify(resultado));
}

module.exports = { newRoommate, saveRoommate, recalculaGastos };