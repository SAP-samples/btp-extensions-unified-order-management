'use strict';
var dbconnection = require('../dbconnection')


function materialService() {
}

materialService.prototype.getMaterialService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  console.log(req.params);
  var material_plant = req.params.material_plant;


  var preStatement = "SELECT TOP 1 MAT_NO,MFG_NO,UNIT,MAT_GRP,SOURCING_CAT,MFG_NAME,ABC,MRP_CONTROLLER,PLANNED_DELIVERY_TIME,GR_PROCESSING_TIME,SAFETY_STOCK,ROP,PROCUREMENT_TYPE,PURCH_GROUP,MAX_STOCK_LEVEL,MATNO_PLANT,PLANT,PPU,AVAILABLE_STOCK,MAT_DESC,ESCALATION_STATUS,MAT_STATUS FROM IOM.MATERIAL_STOCK WHERE IOM.MATERIAL_STOCK.MATNO_PLANT = '" + material_plant + "'"


  client.on('error', function (err) {
    console.error('Network connection error', err);
    //console.log(client.readyState); // connected

  });
  client.connect(function (err) {
    if (err) {
    	return console.error('Connect error', err);
    }
    console.log("Connection Status: ",client.readyState); // connected

    client.exec(preStatement,function (err, rows) {
  	client.end();
      if (err) {
        return console.error('Execute error:', err);
      }
      //console.log('Results:', rows);
      res(rows)

    //  console.log(req,res);
    });
  });


}



materialService.prototype.updateMaterial = function(req,res) {

  console.log("reqbody in create",req.body)

  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  // Get Req path parameters
  var material_plant = req.params.material_plant;
  //Get Req Body
  console.log("reqbody in update material: ", req.body);
  var params = req.body;
  var esc_status = params.esc_status;


  var preStatement = "UPDATE IOM.MATERIAL_STOCK SET ESCALATION_STATUS =" + esc_status + " WHERE IOM.MATERIAL_STOCK.MATNO_PLANT = '" + material_plant + "'  "
  console.log(preStatement);

  client.connect(function (err) {
    if (err) {
      return console.error('Connect error', err);
    }
    console.log("Connection Status: ",client.readyState); // connected

    client.exec(preStatement,function (err, rows) {
    if (err) {
        console.log("Error: ", err);
        return console.error('Execute error:', err);
      }
      res(rows);

    });
  });


}


materialService.prototype.getMatComments = function(req,res) {

  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var preStatement = 'SELECT \
                      "CREATED_DATE",\
                      "COMMENT_TEXT",\
                      "AUTHOR",\
                      "MATNO_PLANT",\
                      "SD_NO_ITEM",\
                      "PD_NO_ITEM"\
                      FROM "IOM"."COMMENTS" WHERE MATNO_PLANT =\''+ req.params.material_plant +'\' ORDER BY "CREATED_DATE" DESC;'

  //console.log(preStatement);
  client.on('error', function (err) {
    console.error('Network connection error', err);
  });
  client.connect(function (err) {
    if (err) {
      return console.error('Connect error', err);
    }
    console.log("Connection Status: ",client.readyState); // connected

    client.exec(preStatement, function (err, rows) {
    client.end();
      if (err) {
        return console.error('Execute error:', err);
      }
      console.log('Results:', rows);
      res(rows)

    //  console.log(req,res);
    });
  });


}


materialService.prototype.postMaterialComment = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());

  var params = req.body;
  var comment_text = params.comment_text;
  var author = params.author;
  var matno_plant = params.matno_plant;
  var preStatement = `INSERT INTO IOM.COMMENTS
                    (CREATED_DATE, COMMENT_TEXT,AUTHOR, MATNO_PLANT, SD_NO_ITEM,PD_NO_ITEM)
                    VALUES ( '${(new Date()).toLocaleString('en-US', { hour12: false })}', '${comment_text}', '${author}','${matno_plant}',NULL,NULL)`
  //console.log(preStatement);
  client.on('error', function (err) {
    console.error('Network connection error', err);
  });
  client.connect(function (err) {
    if (err) {
      return console.error('Connect error', err);
    }
    console.log("Connection Status: ",client.readyState); // connected

    client.exec(preStatement, function (err, rows) {
    client.end();
      if (err) {
        return console.error('Execute error:', err);
      }
      console.log('Results:', rows);
      res(rows)

    //  console.log(req,res);
    });
  });


}



module.exports = new materialService();
