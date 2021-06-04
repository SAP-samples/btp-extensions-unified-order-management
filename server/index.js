const express = require('express')
var bodyParser = require("body-parser");
var request = require("request");
var cfenv = require('cfenv');



var csr_router = require('./router/csr-router');
var sme_router = require('./router/sme-router');
var purchase_order_router = require('./router/purchase-order-router');
var sales_order_router = require('./router/sales-order-router');

var material_router = require('./router/material-router');

var sales_item_router = require('./router/sales-item-router')


//var dbconnection = require('./dbconnection')
// var demoService = require('./services/demo-service');

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/csr', csr_router)
app.use('/sme', sme_router)
app.use('/purchase_order', purchase_order_router)
app.use('/sales_order', sales_order_router)

app.use('/material', material_router)

app.use('/sales_item', sales_item_router)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (request, response) => {
  response.send({"data":"This is IOM data API"})
})


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
