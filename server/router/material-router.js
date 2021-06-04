'use strict'
var express = require('express')
var router = express.Router()
var materialService = require('../services/material-service');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/:material_plant', function (req, res) {

  materialService.getMaterialService(req,function(query_result){
    console.log(req.params);
    res.send(query_result);
  });
})

router.post('/:material_plant', function (req, res) {

  materialService.updateMaterial(req,function(result){
    res.sendStatus(200);
  });
})

/** GET ALL COMMENTS FOR A MATNO_PLANT        **/

router.get('/comment/:material_plant', function (req, res) {

  materialService.getMatComments(req,function(query_result){
    //console.log(req.params.material_plant);
    res.send(query_result);
  });
})


// define the home page route
router.post('/comment/:material_plant', function (req, res) {

  materialService.postMaterialComment(req,function(query_result){
    //console.log(req.params.material_plant);
     res.sendStatus(200);
  });
})

module.exports = router
