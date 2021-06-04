sap.ui.define([
	"sap/m/IOM/controller/BaseController",
], function (BaseController) {
	"use strict";
	// const INDEX_OF_FLAGGED_COLUMN = 6;
	var jsonData;
	var sd_no_item;
    return BaseController.extend("sap.m.IOM.controller.Material_SO", {
		
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
			var self = this;
	    	var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: serverUrl + '/sales_order/' + oData.id
			}).done(function(data,status,jqxhr) {
				oModel.setData({modelData: self.cleanData(data)} );
				self._initFlags(data);
			});
	    	var oTable = this.getView().byId('MATERIAL_SO_VIEW');
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");
			var flagTags = new sap.ui.model.json.JSONModel();
			var flags = [
				{
					"FLAG_NAME": "Need Ack",
					"KEY": "ACK"
				},
				{
					"FLAG_NAME": "Need Tracking",
					"KEY": "TRACK"
				},
				{
					"FLAG_NAME": "Expedite",
					"KEY": "EXP"
				}
			];
			flagTags.setData({modelData: flags});
			// var oComboBox = this.getView().byId('FlaggedComboBox');
			// oComboBox.setModel(flagTags);

	   	},

	   	cleanData : function(data) {
	   		jsonData = data;
	   		console.log(jsonData);
			for (var i = 0; i < data.length; i++) {
				// format the date from YYYYMMDD to MM/DD/YYYY
				var date = data[i].REQ_DEL_DATE;
				var date_clean =  date.slice(4,6) + "/" + date.slice(6) + "/" + date.slice(0, 4);
				data[i].REQ_DEL_DATE = date_clean;

			}
			return data;
		},


	   	onCommentPost: function (comment_text, sd_no_item) {
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
				"SD_NO_ITEM": sd_no_item
			};


			var request = {
				url: serverUrl + '/sales_order/updateComment/',
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

			sd_no_item = oEvent.getSource().data("sd_no_item");

			var commentModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: serverUrl + '/sales_order/comment/' + sd_no_item
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
						id: "SO_comment"
					}),
						new sap.m.List({
						id: "so_list",
						items: {
							path: "comment>/data",
							template: oFeedListItem
						}
					})
					]
					,
					beginButton: new sap.m.Button({
						type: sap.m.ButtonType.Emphasized,
						text: "Submit",
						press: function () {
							var comment_text = sap.ui.getCore().byId("SO_comment").getValue();
							this.onCommentPost(comment_text, sd_no_item);
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
      
		   _initFlags: function(oData) {
			   // separate rows of table to iterate over
			   var oTable = this.getView().byId('MATERIAL_SO_VIEW');
			   var oRows = oTable.getRows();
			   var tableData = oTable.getModel().getProperty("/modelData");
			   for (var i = 0; i < tableData.length; i++) {
				    // get the MultiComboBox of that specific row
					var cells = oRows[i].getCells();
					// var oComboBox = this.getView().byId(cells[INDEX_OF_FLAGGED_COLUMN].getId());

					// if Flags are true then push to initialization array
					var keys = [];
					tableData[i].FLAG_ACK === 1 ? keys.push("ACK") : keys;
					tableData[i].FLAG_EXP === 1 ? keys.push("EXP") : keys;
					tableData[i].FLAG_TRACK === 1 ? keys.push("TRACK") : keys;
					
					// oComboBox.setSelectedKeys(keys);
			   }
		   },

		   updateCommentField: function(text) {
		   	console.log(jsonData);
		   	if(jsonData) {
		   	for (var i =0; i< jsonData.length; i++){

				if (jsonData[i]["(SD_NO_ITEM)"] == sd_no_item) {
					jsonData[i].COMMENT_TEXT = text;
				}

			}
		}
			var oModel = new sap.ui.model.json.JSONModel();
			var oTable = this.getView().byId('MATERIAL_SO_VIEW');


			oModel.setData({modelData: jsonData});
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");
			var flagTags = new sap.ui.model.json.JSONModel();
			var flags = [
				{
					"FLAG_NAME": "Need Ack",
					"KEY": "ACK"
				},
				{
					"FLAG_NAME": "Need Tracking",
					"KEY": "TRACK"
				},
				{
					"FLAG_NAME": "Expedite",
					"KEY": "EXP"
				}
			];
			flagTags.setData({modelData: flags});
			// var oComboBox = this.getView().byId('FlaggedComboBox');
			// oComboBox.setModel(flagTags);

		   },

		   onSelectionFinish: function (oEvent) {
				var selectedItems = oEvent.getParameter("selectedItems");

				// get the index of the updated row
				var oLink = oEvent.getSource();
				var oRow = oLink.getParent();
				var selectedRowIndex = oRow.getIndex();
				
				// get the SD_NO_ITEM of
				var oTable = this.getView().byId('MATERIAL_SO_VIEW');
				var tableData = oTable.getModel().getProperty("/modelData");
				var SD_NO = tableData[selectedRowIndex]["(SD_NO_ITEM)"];
				
				var formData = {
					"flag_ack" : "false",
					"flag_track" : "false",
					"flag_exp" : "false"
				};

				for (var i = 0; i < selectedItems.length; i++) {
					switch(selectedItems[i].getKey()) {
						case "ACK":
							formData.flag_ack = "true";
							break;
						case "TRACK":
							formData.flag_track = "true";
							break;
						case "EXP":
							formData.flag_exp = "true";
							break;
					}
				}

				var request = {
					url: serverUrl + '/sales_item/' + SD_NO,
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
		   }
	});
});