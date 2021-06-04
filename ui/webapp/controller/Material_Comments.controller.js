sap.ui.define([
	"sap/m/IOM/controller/BaseController"
], function (BaseController) {
	"use strict";
	var material_plant;
    return BaseController.extend("sap.m.IOM.controller.Material_Comments", {
		
        onInit: function () {

            var eventBus = sap.ui.getCore().getEventBus();
            eventBus.subscribe("material", "passMaterialArg", this._updateComments, this);

		},
        
        _onRouteMatched : function (oEvent) {

		},
        
        _onBindingChange : function (oEvent) {

		},

		onAfterRendering: function(oEvent) {

		},

		_updateEscButton: function() {
			var self = this;
			$.ajax({
				url: serverUrl + '/material/' + material_plant
			}).done(function(data, status, jqxhr) {
				var esc_status = data[0].ESCALATION_STATUS;
				var escButton = self.getView().byId('EscStatusButton');
				escButton.setState( (esc_status == null || esc_status == 0) ? false : true);
			});
		},

		_updateComments: function(sChannel, sEvent, oData) {
            material_plant = oData.id;
            
			var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: serverUrl + '/material/comment/' + material_plant
			}).done(function(data,status,jqxhr) {
				oModel.setData({modelData:data});
			});

			var oList = this.getView().byId('CommentsFeed');
			oList.setModel(oModel);

			this._updateEscButton();
		},

		_commentsHotFix: function() {
			var oModel = new sap.ui.model.json.JSONModel();
			$.ajax({
				url: serverUrl + '/material/comment/' + material_plant
			}).done(function(data,status,jqxhr) {
				oModel.setData({modelData:data});
			});

			var oList = this.getView().byId('CommentsFeed');
			oList.setModel(oModel);
		},

		onCommentPost: function(oEvent) {
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
				"comment_text": oEvent.getSource().getValue(),
				"author": author,
				"matno_plant": material_plant
			};

			var request = {
				url: serverUrl + '/material/comment/' + material_plant,
				"method": "POST",
				"headers": {
				  "Content-Type": "application/json"
				},
				"data": JSON.stringify(formData),
			};
			
			var self = this;
			$.ajax(request).done(function (response) {
				console.log(response);
				//self._updateComments();
				self._commentsHotFix();
			});
		},

		onEscalationStatusChange: function(oEvent) {	
			var formData = { "esc_status": oEvent.getParameters().state.toString()};
			
			var request = {
				url: serverUrl + '/material/' + material_plant,
				"method": "POST",
				"headers": {
				  "Content-Type": "application/json"
				},
				"data": JSON.stringify(formData),
			};

			$.ajax(request).done(function (response) {
				console.log(response);
			});
		}
	});
});