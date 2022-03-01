// ejecutar npm start   o   node index.js
//entrar en localhost:3000/ para cargar el HTML con el formulario
const nodemailer = require('nodemailer')

function enviar(to, subject, html) {
    console.log('Enviando correos via Nodemailer....')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'desafidolatam@gmail.com',
            pass: '191107Ft',
            },
        })

    let mailOptions = {
        from: 'desafidolatam@gmail.com',
        to,
        subject,
        html,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(`${err} - Algo salió mal en el metodo sendMail`)
        if (data){
            console.log('Correos enviados correctamente')
        } 
    })
}

module.exports = enviar