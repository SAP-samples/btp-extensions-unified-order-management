'use strict'
var express = require('express')
var router = express.Router()
var salesItemRouterService = require('../services/sales-item-router-service');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.post('/:sd_no_item', function(req,res) {
	salesItemRouterService.updateSalesItem(req,function(query_result){
     res.sendStatus(200);
  });
})

module.exports = router
