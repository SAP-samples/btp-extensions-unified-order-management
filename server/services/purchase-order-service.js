'use strict';
var dbconnection = require('../dbconnection')


function purchaseOrderService() {
}

purchaseOrderService.prototype.getPurchaseOrderService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var material_no = req.params.material_plant.split("_")[0];
  var plant_no = req.params.material_plant.split("_")[1];
  var preStatement = `SELECT TOP 1000\
                      "(PD_NO_ITEM)",\
                      "CREATED_ON",\
                      "DELIVERY_DATE",\
                      "PD_NO",\
                      "ORD_QTY",\
                      "STATUS",\
                      "TRACKING_NUMBER",\
                      "COMMENT_TEXT",\
                      "CREATED_DATE",\
                      "SCHEDULE_LINENO"\
                    FROM "IOM"."PURCHASE_ORDER_VIEW"\
                    WHERE "IOM"."PURCHASE_ORDER_VIEW"."MAT_NO" = '${material_no}' AND "IOM"."PURCHASE_ORDER_VIEW"."PLANT" = '${plant_no}'`
  console.log(preStatement)

  client.on('error', function (err) {
    console.error('Network connection error', err);
    //console.log(client.readyState); // connected

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
      //console.log('Results:', rows);
      res(rows)

    //  console.log(req,res);
    });
  });


}
purchaseOrderService.prototype.updatePurchaseOrderCommentService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  console.log("reqbody=",req.body);

  var preStatement = "INSERT INTO IOM.COMMENTS (CREATED_DATE, COMMENT_TEXT, AUTHOR, PD_NO_ITEM)\
                      VALUES ('"+(new Date()).toLocaleString('en-US', { hour12: false })+"', '"+req.body.COMMENT_TEXT+"', '"+req.body.AUTHOR+"', '"+req.body.PD_NO_ITEM+"');"

//console.log(preStatement);
  // var preStatement = "UPDATE IOM.COMMENTS
  //                     SET CREATED_DATE = 'value1', COMMENT_TEXT = 'value2', AUTHOR='ABC',
  //                     WHERE PD_NO_ITEM='ABC';"


  client.on('error', function (err) {
    console.error('Network connection error', err);
    //console.log(client.readyState); // connected

  });
  client.connect(function (err) {
    if (err) {
    	return console.error('Connect error', err);
    }
    console.log("Connection Status: ",client.readyState); // connected

    client.exec(preStatement, function (err, result) {
  	client.end();
      if (err) {
        return console.error('Execute error:', err);
      }
      console.log('Results:', result);
      result == 1 ? res(200) : res(500);


    //  console.log(req,res);
    });
  });

}

purchaseOrderService.prototype.getPOItemComments = function(req,res) {

  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var preStatement = 'SELECT \
                      "CREATED_DATE",\
                      "COMMENT_TEXT",\
                      "AUTHOR",\
                      "MATNO_PLANT",\
                      "SD_NO_ITEM",\
                      "PD_NO_ITEM"\
                      FROM "IOM"."COMMENTS" WHERE PD_NO_ITEM =\''+ req.params.pd_no_item +'\' ORDER BY "CREATED_DATE" DESC;'

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
      res(rows);

    //  console.log(req,res);
   });
  });


}




module.exports = new purchaseOrderService();
