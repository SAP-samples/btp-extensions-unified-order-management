sap.ui.define([
	"sap/m/IOM/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (BaseController) {
	"use strict";
    return BaseController.extend("sap.m.IOM.controller.Material_Detail", {
		
        onInit: function () {
        
        var eventBus = sap.ui.getCore().getEventBus();
        eventBus.subscribe("material", "passMaterialArg", this.saveArg, this);

		},
        
        _onRouteMatched : function (oEvent) {
		
		},
        
        _onBindingChange : function (oEvent) {
		},

		onAfterRendering: function(oEvent) {

		},

	    saveArg : function(sChannel, sEvent, oData){
	    	var materialId = oData.id;

	    	var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: serverUrl + '/material/' + materialId
			}).done(function(data,status,jqxhr) {
				oModel.setData({modelData: data});
			});
			this.getView().setModel(oModel).bindElement("/modelData/0");
	   	}

	});
});