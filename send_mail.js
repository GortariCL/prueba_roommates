const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test.nodemailer2022@gmail.com',
        pass: 'node1234',
    }
});

const send = async(roommate, descripcion, monto, correos) =>{
    let mailOptions = {
        from: 'test.nodemailer2022@gmail.com',
        to: ['test.nodemailer2022@gmail.com'].concat(correos),
        subject: `${roommate} ha realizado un nuevo gasto!`,
        html: `Hola a todos, les informamos que ${roommate} ha realizado la compra de ${descripcion} por un total de $${monto}`,
    };
    try{
        const result = await transporter.sendMail(mailOptions);
        return result;
    }catch(err){
        console.log('Error: ', err);
    }
};

module.exports = send;