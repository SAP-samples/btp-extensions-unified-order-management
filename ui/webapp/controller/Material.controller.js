sap.ui.define([
	"sap/m/IOM/controller/BaseController"
], function (BaseController) {
	"use strict";
	let materialId, plantId;
    return BaseController.extend("sap.m.IOM.controller.Material", {
		
        onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("Material").attachMatched(this._onRouteMatched, this);
		},
        
        _onRouteMatched : function (oEvent) {
			let oArgs = oEvent.getParameter("arguments");
			let oView = this.getView();

            sap.ui.getCore().getEventBus().publish("material", "passMaterialArg", { id : oArgs.materialId });

			[materialId, plantId] = oArgs.materialId.split("_");
			
			this.updateView();
		},
		
		updateView: function(){
			let oView = this.getView();
			var oModel = new sap.ui.model.json.JSONModel();
			var self = this
			$.ajax({
				url: serverUrl + '/material/' + materialId + '_' + plantId
			}).done(function(data,status,jqxhr) {
				if (data.length > 0) {
					oModel.setData({modelData: data});
					oView.byId("MaterialView").setModel(oModel).bindElement("/modelData/0");

				} else {
					self.getRouter().getTargets().display("notFound");
				}
			});
		},

        _onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},

		onAfterRendering: function(oEvent) {

		},

		onChangeSearch: function(oEvent) {
			var filter_val = oEvent.getSource().getValue();
			if (filter_val.length > 0){
				// get the "id" of the component that called the search
				var sId = oEvent.getSource().sId;
				sId = sId.slice(sId.lastIndexOf('-') + 1);

				if (sId === "plantId") {
					plantId = filter_val
				}
				if (sId === "materialId") {
					materialId = filter_val
				}	

				this.getRouter().navTo("Material", {
					materialId: `${materialId}_${plantId}`
				});
			}
		},
	});
});