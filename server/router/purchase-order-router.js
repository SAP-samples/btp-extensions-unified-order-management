'use strict'
var express = require('express')
var router = express.Router()
var purchaseOrderService = require('../services/purchase-order-service');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/:material_plant', function (req, res) {

  purchaseOrderService.getPurchaseOrderService(req,function(query_result){
    //console.log(req.params);
    res.send(query_result);
  });
})

router.post('/updateComment', function (req, res) {

  purchaseOrderService.updatePurchaseOrderCommentService(req,function(query_result){
    //console.log("req params=",req.params);
    res.sendStatus(query_result);
  });
})

router.get('/comment/:pd_no_item', function (req, res) {

  purchaseOrderService.getPOItemComments(req,function(query_result){
    //console.log("req params=",req.params);
    res.send(query_result);
  });
})

module.exports = router
