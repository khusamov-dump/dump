
/**
 * Контроллер формы Контрагент.  
 */

Ext.define("Alternativa.controller.Contractor", {
	extend: "Ext.app.Controller",
	
	views: ["contractor.Legal"],

	models: ["Contractor", "contractor.Legal", "contractor.Individual", "contractor.Businessman"],
	
	stores: ["Contractors"],
	
	windows: {},
	
	init: function() {
		//var me = this;
		
		
	},
	
	getWindowLegal: function() {
		var me = this;
		if (!me.windows.legal) me.windows.legal = me.getView("contractor.Legal").create();
		
		var window = me.windows.legal;
		
		var form = window.down("form").getForm();
		
		window.down("button#ok").on("click", function() {
			if (form.isValid()) {
				switch (window.getMode()) {
					case "insert":
						var record = me.getModel("contractor.Legal").create();
						form.updateRecord(record);
						me.insertLegal(record);
						break;
					case "update":
						break;
				}
			}
		});
		
		
		return window;
	},
	
	openWindowLegal: function(id, record) {
		var me = this;
		var window = me.getWindowLegal();
		window.setMode(id ? "update" : "insert");
		window.show();
	},
	
	insertLegal: function(record) {
		var me = this;
		
		record.save();
		
	},
	
	updateLegal: function(id, record) {
		var me = this;
		
	},
	
	deleteContractor: function(id) {
		var me = this;
		
	}

});


