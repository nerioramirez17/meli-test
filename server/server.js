const express = require('express');
const axios = require('axios').default;
const utils = require('./utils.js');

const app = express()
const port = 5000;

const apiUrl = 'https://api.mercadolibre.com/';
const apiRegion = 'sites/MLA/';
const apiLimit = 4;


app.listen(port, () => console.log('Listening at http://localhost:' + port));

app.get('/api/health', (res) => {
  res.json({ status: 'OK' });
});

app.get('/api/items/:id',  (req, res) => {
  const search = req.params.id;
  if (search) {
      axios.all([
       axios.get(`${apiUrl}items/${search}`),
       axios.get(`${apiUrl}items/${search}/description`)
     ]).then(axios.spread((...responses) => {
          const product = utils.formatProductDetail(responses[0].data, responses[1].data);
          return res.status(200).json({product});
        }))
        .catch((error) => {
          res.status(404).send({ error: error.message });
         })
  } else {
    res.status(400).send({ error: 'Ingrese Id'});
  }
});

app.get('/api/items', (req, res) => {
  const search = req.query.q;
  if(search){
    axios.get(`${apiUrl}${apiRegion}search?limit=${apiLimit}&q=${search}`)
      .then(function (response) {
        return res.status(200).json(utils.formatProduct(response.data));
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      })
  } else {
    res.status(400).send({ error: 'Ingrese busqueda'});
  }
});
