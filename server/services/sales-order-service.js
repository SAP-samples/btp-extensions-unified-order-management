'use strict';
var dbconnection = require('../dbconnection')


function salesOrderService() {
}

salesOrderService.prototype.getSalesOrderService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var material_no = req.params.material_plant.split("_")[0];
  var plant_no = req.params.material_plant.split("_")[1];
  var preStatement = `SELECT TOP 1000\
                    	"(SD_NO_ITEM)",\
                    	"REQ_DEL_DATE",\
                    	"SD_NO",\
                    	"CREATED_BY",\
                    	"CMIR",\
                    	"SOLD_TO_PARTY",\
                    	"REQD_QTY",\
                    	"FLAG_ACK",\
                    	"FLAG_TRACK",\
                    	"FLAG_EXP",\
                    	"COMMENT_TEXT",\
                    	"CREATED_DATE",\
                      "LAST_MODIFIED"\
                    FROM "IOM"."SALES_ORDER_VIEW"\
                    WHERE "IOM"."SALES_ORDER_VIEW"."MAT_NO" = '${material_no}' AND "IOM"."SALES_ORDER_VIEW"."PLANT" = '${plant_no}'`

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

salesOrderService.prototype.updateSalesOrderCommentService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  console.log("reqbody=",req.body);

  var preStatement = "INSERT INTO IOM.COMMENTS (CREATED_DATE, COMMENT_TEXT, AUTHOR, SD_NO_ITEM)\
                      VALUES ('"+(new Date()).toLocaleString('en-US', { hour12: false })+"', '"+req.body.COMMENT_TEXT+"', '"+req.body.AUTHOR+"', '"+req.body.SD_NO_ITEM+"');"
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


salesOrderService.prototype.getSOItemComments = function(req,res) {

  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var preStatement = 'SELECT \
                      "CREATED_DATE",\
                      "COMMENT_TEXT",\
                      "AUTHOR",\
                      "MATNO_PLANT",\
                      "SD_NO_ITEM",\
                      "PD_NO_ITEM"\
                      FROM "IOM"."COMMENTS" WHERE SD_NO_ITEM =\''+ req.params.sd_no_item +'\' ORDER BY "CREATED_DATE" DESC;'

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

module.exports = new salesOrderService();
