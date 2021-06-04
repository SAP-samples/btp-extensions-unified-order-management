'use strict'
var express = require('express')
var router = express.Router()
var salesOrderService = require('../services/sales-order-service');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/:material_plant', function (req, res) {

  salesOrderService.getSalesOrderService(req,function(query_result){
    console.log(req.params);
    res.send(query_result);
  });
})

router.post('/updateComment', function (req, res) {

  salesOrderService.updateSalesOrderCommentService(req,function(query_result){
    //console.log("req params=",req.params);
    res.sendStatus(query_result);
  });
})

router.get('/comment/:sd_no_item', function (req, res) {

  salesOrderService.getSOItemComments(req,function(query_result){
    //console.log("req params=",req.params);
    res.send(query_result);
  });
})

module.exports = router
