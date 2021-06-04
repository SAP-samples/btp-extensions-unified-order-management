sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";
    
	return Controller.extend("sap.m.IOM.controller.BaseController", {
        
        getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
        },
        
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
            
            oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			// var url = this.getView().getParent().getPreviousPage().getViewName(); //It worked with getCurrentPage()
   			//console.log(url);

            if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Csr", {}, true /*no history*/);
			}
		},

		onNavToCsr: function(oEvent) {
			var oHistory;
            
            oHistory = History.getInstance();

			this.getRouter().navTo("Csr");
	
		},
		onNavToBuyer: function(oEvent) {
			this.getRouter().navTo("Buyer");
		}
	});
});