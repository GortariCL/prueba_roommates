const fs = require('fs');
const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'UTF8'));
const gastos_arr = gastosJSON.gastos;

const gastosRoommates = (arrGasto) => {
    console.log(arrGasto.gastos);
    const roommateJSON = JSON.parse(fs.readFileSync('roommates.json', 'UTF8'));
    let roommates = roommateJSON.roommates.map((r) => {
        r.debe = 0;
        r.recibe = 0;
        r.total = 0;
        return r;
    });

    arrGasto.gastos.forEach((g, i) => {
        const div = Number(g.monto / roommates.length).toFixed(2);
        roommates = roommates.map((r) => {
                if (g.roommate == r.nombre) {
                    r.recibe += parseFloat(div);
                } else {
                    r.debe -= parseFloat(div);
                }
                r.total = r.recibe - r.debe;
                return r; 
        });
    });
    fs.writeFileSync('roommates.json', JSON.stringify(roommateJSON));
    return arrGasto;
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

module.exports = { recalcularGastos, gastosRoommates };