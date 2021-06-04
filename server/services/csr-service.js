'use strict';
var dbconnection = require('../dbconnection')


function csrService() {
}

csrService.prototype.getCsrService = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());
  var preStatement = 'SELECT TOP 1000\
                      "(SD_NO_ITEM)",\
                    	"MAT_NO",\
                      "PLANT",\
                    	"SD_NO",\
                    	"CREATED_BY",\
                    	"MAT_DESC",\
                    	"REQ_DEL_DATE",\
                      "MPI",\
                    	"MAT_STATUS",\
                    	"FLAG_ACK",\
                    	"FLAG_TRACK",\
                    	"FLAG_EXP",\
                    	"ESCALATION_STATUS",\
                    	"COMMENT_TEXT",\
                    	"CREATED_DATE",\
                      "LAST_MODIFIED"\
                    FROM "IOM"."CSR_VIEW" ORDER BY "MAT_NO", "SD_NO", "PLANT"'


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





module.exports = new csrService();
