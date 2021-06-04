'use strict';
var dbconnection = require('../dbconnection')


function smeService() {
}

smeService.prototype.getSmeService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var preStatement = 'SELECT TOP 1000\
                      "(PD_NO_ITEM)",\
                    	"MAT_NO",\
                    	"PLANT",\
                    	"PD_NO",\
                    	"MAT_DESC",\
                    	"CREATED_ON",\
                    	"DELIVERY_DATE",\
                    	"MAT_STATUS",\
                    	"FLAG_ACK",\
                    	"FLAG_TRACK",\
                    	"FLAG_EXP",\
                    	"MPI",\
                    	"ABC",\
                    	"ESCALATION_STATUS",\
                    	"COMMENT_TEXT",\
                    	"CREATED_DATE",\
                      "SCHEDULE_LINENO" \
                    FROM "IOM"."SME_VIEW" ORDER BY "(PD_NO_ITEM)","MAT_NO","PLANT", "SCHEDULE_LINENO" ASC'

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





module.exports = new smeService();
