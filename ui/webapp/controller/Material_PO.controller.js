sap.ui.define([
	"sap/m/IOM/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/m/FeedInput",
	"sap/ui/commons/TextField"
], function (BaseController) {
	"use strict";
	var material_plant;
	var materialId;
	var pd_no_item;
	var jsonData;
    return BaseController.extend("sap.m.IOM.controller.Material_PO", {
		
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
			
			materialId = oData.id;
	    	var oModel = new sap.ui.model.json.JSONModel();
	    	var self = this;
			$.ajax({
				url: serverUrl + '/purchase_order/' + materialId
			}).done(function(data,status,jqxhr) {
				oModel.setData({modelData: self.cleanData(data)} );
			});

	    	var oTable = this.getView().byId('Material_PO');
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");
	   	},

	   	onCommentPost: function (comment_text, pd_no_item) {
	   		var author = "Author";

	   		if (this.getView() != undefined && this.getView().getParent().getParent().getParent().getParent().getParent().getPreviousPage() != undefined)
	   		{

		   		var url = this.getView().getParent().getParent().getParent().getParent().getParent().getPreviousPage().getViewName(); 

	            if (url.indexOf('Csr') !== -1)
	             {
	             	author = 'CSR';
	             }
	             else if (url.indexOf('Buyer') !== -1)
	             {
	             	author = 'Buyer/SME';
	             }
	        }
	   		var formData = {
				"COMMENT_TEXT": comment_text,
				"AUTHOR": author,
				"PD_NO_ITEM": pd_no_item
			};

			var request = {
				url: serverUrl + '/purchase_order/updateComment/',
				"method": "POST",
				"headers": {
				  "Content-Type": "application/json"
				},
				"data": JSON.stringify(formData),
			};
			
			var self = this;
			$.ajax(request).done(function (response) {
				console.log(response);
			});
	   	},

		onDefaultDialogPress: function (oEvent) { 

			pd_no_item = oEvent.getSource().data("pd_no_item");
			var commentModel = new sap.ui.model.json.JSONModel();

	   		var pd_no = pd_no_item.split("/")[0].replace(/ /g,'') + "_" + pd_no_item.split("/")[1]
			$.ajax({
				url: serverUrl + '/purchase_order/comment/' + pd_no
			}).done(function(data,status,jqxhr) {
				commentModel.setData({data:data});
				console.log(commentModel.getJSON());
			});
			sap.ui.getCore().setModel(commentModel,"comment");

			var oFeedListItem = new sap.m.FeedListItem({
				sender : "{comment>AUTHOR}",
				timestamp : "{comment>CREATED_DATE}",
				text: "{comment>COMMENT_TEXT}",
				showIcon: false,
				iconDensityAware: false,
				convertLinksToAnchorTags: "All"
			})
 

			if (!this.oDefaultDialog) {
				this.oDefaultDialog = new sap.m.Dialog({
					title: "Discussion",
					content: [
						new sap.m.Input({
						id: "PO_comment"
					}),
					new sap.m.List({
						id: "po_list",
						items: {
							path: "comment>/data",
							template: oFeedListItem
						}

					})]
					,
					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: "Submit",
						press: function () {
							var comment_text = sap.ui.getCore().byId("PO_comment").getValue();
							this.onCommentPost(comment_text, pd_no);
							this.updateCommentField(comment_text);
							this.oDefaultDialog.close();
						}.bind(this)
					}),
					endButton: new sap.m.Button({
						text: "Close",
						press: function () {
							 this.oDefaultDialog.close();
						}.bind(this)
					})
				});

				// to get access to the controller's model

				this.getView().addDependent(this.oDefaultDialog);
			}
			this.oDefaultDialog.open();
		},


	   	cleanData : function(data) {

	   		jsonData = data;
			for (var i = 0; i < data.length; i++) {
				// format the date from YYYYMMDD to MM/DD/YYYY
				var date = data[i].DELIVERY_DATE;
				if (date) {
					data[i].DELIVERY_DATE = date.slice(4,6) + "/" + date.slice(6) + "/" + date.slice(0, 4);
				}

				// format the date from YYYYMMDD to MM/DD/YYYY
				var created_date = data[i].CREATED_ON;
				if (created_date){
					data[i].CREATED_ON = created_date.slice(4,6) + "/" + created_date.slice(6) + "/" + created_date.slice(0, 4);
				}

				var pd_no_item = data[i]["(PD_NO_ITEM)"]
				var cleaned_pd_no = pd_no_item.split("_")[0] + " /" + pd_no_item.split("_")[1]
				data[i]["(PD_NO_ITEM)"] = cleaned_pd_no;
				
			}
			return data;
		},

		updateCommentField: function(text){

			for (var i =0; i< jsonData.length; i++){

				if (jsonData[i]["(PD_NO_ITEM)"] == pd_no_item) {
					jsonData[i].COMMENT_TEXT = text;
				}

			}
			var oModel = new sap.ui.model.json.JSONModel();
			var oTable = this.getView().byId('Material_PO');
			oModel.setData({modelData: jsonData});
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");
		},

	});
});