sap.ui.define([
	"sap/m/IOM/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/thirdparty/jquery",
	"sap/ui/core/format/DateFormat"
], function(BaseController, JSONModel, Filter, jQuery, DateFormat) {
	"use strict";

	return BaseController.extend("sap.m.IOM.controller.Buyer", {
		onInit: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			var self = this;
			$.ajax({
				url: serverUrl + '/sme'
			}).done(function(data,status,jqxhr) {
				oModel.setData( {modelData: self.cleanData(data)} );
			});
			
			var oTable = this.getView().byId('BUYERVIEW');
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");

		},

		cleanData: function(data) {
			for (var i = 0; i < data.length; i++) {
				// format the date from YYYYMMDD to MM/DD/YYYY
				var date = data[i].DELIVERY_DATE;
				if (date){
					var date_clean =  date.slice(4,6) + "/" + date.slice(6) + "/" + date.slice(0, 4);
					data[i].DELIVERY_DATE = date_clean;
				}
				// Set Flagged Column to Y(count of true flags) if flags are raised
				let flagsSet = 0;
				flagsSet += data[i].FLAG_ACK ? 1 : 0; 
				flagsSet += data[i].FLAG_TRACK ? 1 : 0;
				flagsSet += data[i].FLAG_EXP ? 1 : 0;
				
				if (flagsSet > 0) {
					data[i].FLAG_ACK = `Yes(${flagsSet})`;
				} 
				else
				{
					data[i].FLAG_ACK = ``;
				}

				//Esc status
				var esc_stat = data[i].ESCALATION_STATUS;
				if (esc_stat === 1) {
					data[i].ESCALATION_STATUS = `Escalated`;
				}
				else
				{
					data[i].ESCALATION_STATUS = ``;
				}
			


			}


			return data;
		},

		onAfterRendering: function() {
			
		},

		onChangeSearch: function(oEvent) {
			var filter_val = oEvent.getSource().getValue();

			// get the "id" of the component that called the search
			var sId = oEvent.getSource().sId;
			sId = sId.slice(sId.lastIndexOf('-') + 1);
			
			var oTable = this.getView().byId("BUYERVIEW");
			var oFilter = new sap.ui.model.Filter(sId, sap.ui.model.FilterOperator.Contains, filter_val);
			oTable.getBinding("rows").filter(oFilter);
		},

		onPress : function (oEvent) {
			// The source is the list item that got pressed
			var material_plant = oEvent.getSource().getText() + "_" + oEvent.getSource().data("plant");
			this._showObject(material_plant);
		},


		_showObject : function (material_plant) {
			this.getRouter().navTo("Material", {
				materialId: material_plant
			});
		},

		onClearInput: function(oEvent) {
			console.log(oEvent.getSource());
			var oInput = this.getView().byId(oEvent.getSource().sId);
			oInput.setValue("");
		}

	});

})