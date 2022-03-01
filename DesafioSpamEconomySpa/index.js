// ejecutar npm start   o   node index.js
//entrar en localhost:3000/ para cargar el HTML con el formulario
const url = require('url')
const http = require('http')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const enviar = require('./consulta')
const {getData} = require('./indicadores')

http.createServer(function (req, res) {
    let { correos, asunto, contenido } = url.parse(req.url, true).query
    if (req.url.startsWith('/')) {
        res.setHeader('content-type', 'text/html')
        fs.readFile('index.html', 'utf8', (err, data) => {
            res.end(data)
        })
    }
    if (req.url.startsWith('/mailing')) {
        if( correos !=='' && asunto !=='' && contenido !==''){        
        let archivo=`./correos/${uuidv4().slice(24, 36)}.txt`
        getData().then(msj=>{
            msj =`${contenido} ${msj}`
            fs.writeFile(archivo, msj,'UTF-8', (err,data)=>{ 
                err? console.log('ARCHIVO NO FUE CREADO'): console.log(`ARCHIVO GUARDADO CON ÉXITO - ${archivo.slice(-16)}`);
            })
            enviar(correos.split(','), asunto, msj)        
        })
        res.write('<h1>Correos enviados correctamente </h1>')
        res.end()   
        } else{
            console.log('No ha completado todos los campos requeridos')
            res.write('<h1>Debe completar los campos Correo, Asunto y Mensaje </h1>')
            res.end()   
        }
    }
}).listen(3000, ()=>{ console.log(`Escuchando en el puerto 300 con el PID ${process.pid}`)})