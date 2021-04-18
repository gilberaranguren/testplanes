
const express = require('express');
const app = express();
const axios = require('axios');

// respond with "hello world" when a GET request is made to the homepage

app.get('/planes', async (req, res) => {
  try {
     const {data} = await axios.get('https://f3ec8e44-0529-430b-8433-d492dba0797c.mock.pstmn.io/planes');
     res.send(data);
  } catch (error){
     res.json(error);
  } 
  
});

app.post('/', function(req, res) {
  res.send('hello world Gilber');
});

app.listen(3000);
