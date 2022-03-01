// ejecutar npm start   o   node index.js
//entrar en localhost:3000/ para cargar el HTML con el formulario
const axios = require('axios')

async function getData() {
    try{
        let { data } = await axios.get('https://mindicador.cl/api')
        let tpl=`
    
    <p>El valor del dolar el dia de hoy es: ${data.dolar.valor}</p>
    <p>El valor del euro el dia de hoy es: ${data.euro.valor}</p>
    <p>El valor del uf el dia de hoy es: ${data.uf.valor}</p>
    <p>El valor del utm el dia de hoy es: ${data.utm.valor}</p>

    `
      return tpl
    }catch(err){
        console.log(`Error: ${err} en la funcion getData()`)
    }
};

module.exports=  {getData}
