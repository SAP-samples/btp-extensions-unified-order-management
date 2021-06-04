'use strict';
function dbconnection() {
}
var hdb = require('hdb');
dbconnection.prototype.getHost = function(){

  var host = {
    host     : 'xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx.hana.prod-xxxx.hanacloud.ondemand.com',
    port     : 443,
    user     : 'DBADMIN',
    password : 'UsecaseFactoryPassword',
    ca: undefined
  }

  return host;
}

module.exports = new dbconnection();
