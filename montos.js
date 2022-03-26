const fs = require('fs');
const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
const roommateJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
const roommates = roommateJSON.roommates;
const gastos_arr = gastosJSON.gastos;

const calculo = (nombre, total, opcion) => {
    const div = Number(total / roommates.length).toFixed(2);
    roommates.forEach((r, i) => {
        if (opcion == 1) {
            if (nombre == r.nombre) {
                r.recibe += parseFloat(div);
            } else {
                r.debe -= parseFloat(div);
            }
            r.total = r.recibe - r.debe;
        }
        else if (opcion == 2) {
            if (nombre == r.nombre) {
                r.recibe = parseFloat(div);
            } else {
                r.debe += parseFloat(div);
            }
            r.total = r.recibe - r.debe;
        }
        else if (opcion == 3) {
            if (nombre == r.nombre) {
                r.recibe -= parseFloat(div);
            } else {
                r.debe += parseFloat(div);
            }
            r.total = r.recibe - r.debe;
        }
    });
    fs.writeFileSync('roommates.json', JSON.stringify(roommateJSON));
}

const recalcularGastos = (arrRoommie) => {
    arrRoommie.roommates = arrRoommie.roommates.map((r) => {
        r.debe = 0;
        r.recibe = 0;
        r.total = 0;
        return r;
    });
    gastos_arr.forEach((g, i) => {
        const div = Number(g.monto / arrRoommie.roommates.length).toFixed(2);
        arrRoommie.roommates = arrRoommie.roommates.map((r) => {
            if (g.roommate == r.nombre) {
                r.recibe += parseFloat(div);
            } else {
                r.debe -= parseFloat(div);
            }
            r.total = r.recibe - r.debe;
            return r;
        });
    });
    return arrRoommie;
}

module.exports = { calculo, recalcularGastos };