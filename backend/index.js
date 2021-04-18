
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
app.use(cors());
// respond with "hello world" when a GET request is made to the homepage

app.get('/planes/:renta', async (req, res) => {
  try {

     const renta = req.params.renta;
     const rentaEnNumero = parseInt(renta,10);
     const porcentaje = rentaEnNumero*0.15;
     const rentaSuperior = rentaEnNumero+porcentaje;
     const rentaInferior = rentaEnNumero-porcentaje;

     console.log("Consultando planes");
     const {data} = await axios.get('https://f3ec8e44-0529-430b-8433-d492dba0797c.mock.pstmn.io/planes');
     const planes = data.filter((plan)=> plan.precio >= rentaInferior && plan.precio <= rentaSuperior )
     res.send(planes);
  } catch (error){
     res.json(error);
  } 
  
});

app.post('/', function(req, res) {
  res.send('');
});

app.listen(3001);
