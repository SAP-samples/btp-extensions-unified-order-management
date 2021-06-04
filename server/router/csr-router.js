'use strict'
var express = require('express')
var router = express.Router()
var csrService = require('../services/csr-service');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {

  csrService.getCsrService(req,function(query_result){
    console.log(req.params);
    res.send(query_result);
  });
})

module.exports = router
