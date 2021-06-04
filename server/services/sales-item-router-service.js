'use strict';
var dbconnection = require('../dbconnection')


function salesItemRouterService() {
}

salesItemRouterService.prototype.updateSalesItem = function(req,res) {


  var hdb    = require('hdb');
  var client = hdb.createClient(dbconnection.getHost());

  var sd_no_item = req.params.sd_no_item;
  var params = req.body;
  var flag_ack = (params.flag_ack !== undefined ? params.flag_ack: null);
  var flag_track = (params.flag_track !== undefined? params.flag_track: null);
  var flag_exp = (params.flag_exp !== undefined? params.flag_exp: null);
  console.log(flag_track)
  console.log(flag_ack)
  console.log(flag_exp)

  var preStatement = `UPDATE IOM.SALES_ITEM SET
                 IOM.SALES_ITEM.FLAG_ACK =
                        CASE
                        WHEN ${flag_ack} = true OR ${flag_ack} = false THEN
                          ${flag_ack}
                        ELSE
                          IOM.SALES_ITEM.FLAG_ACK
                        END,
                 IOM.SALES_ITEM.FLAG_TRACK =
                        CASE
                        WHEN ${flag_track} = true OR ${flag_track} = false THEN
                          ${flag_track}
                        ELSE
                          IOM.SALES_ITEM.FLAG_TRACK
                        END,
                IOM.SALES_ITEM.FLAG_EXP =
                        CASE
                        WHEN ${flag_exp} = true OR ${flag_exp} = false THEN
                          ${flag_exp}
                        ELSE
                          IOM.SALES_ITEM.FLAG_EXP
                        END,
                LAST_MODIFIED = '${(new Date()).toLocaleString('en-US', { hour12: false })}'
                        WHERE IOM.SALES_ITEM.SD_NO_ITEM = '${sd_no_item}'`;
  console.log(preStatement);


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
      res(rows);

    });
  });


}





module.exports = new salesItemRouterService();
