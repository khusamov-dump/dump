
Ext.define("Alternativa.controller.Tab", {
	
	extend: "Ext.app.Controller",
	
	refs: [{
		ref: "desktopTabPanel",
		selector: "tabpanel#desktop"
	}],
	
	routes: {
		"/alternativa/:id": {
			action: "openTab",
			conditions: {
				":id": "(.*)"
			}
		}
	},
	
	views: [
		"paymentorder.PaymentOrder",
		"contract.Contract",
		"contractor.Contractor",
		"contractor.businessman.Businessman",
		"contractor.individual.Individual", 
		"contractor.legal.Legal", 
		"legalform.LegalForm"
	],
	
	viewMapping: {
		"businessman.Businessman": "contractor.businessman.Businessman",
		"individual.Individual": "contractor.individual.Individual",
		"legal.Legal": "contractor.legal.Legal"
	},
	
	models: [
		"PaymentOrder", 
		"Contract", 
		"contractor.Contractor", 
		"contractor.Businessman", 
		"contractor.Individual", 
		"contractor.Legal", 
		"LegalForm"
	],
	
	tabId: {},
	
	gridDataModel: null,
	
	openTab: function(path) {
		var me = this;
		
		// path/to/name -> name.Name
		// path/to/name-name -> namename.NameName
		path = path.toLowerCase().split("/");
		var viewName = path[path.length - 1];
		viewName = viewName.split("-");
		viewName = viewName.map(function(part) {
			return Ext.String.capitalize(part);
		});
		viewName = viewName.join("");
		viewName = viewName.toLowerCase() + "." + viewName;
		//viewName = viewName + "." + viewName[0].toUpperCase() + viewName.substr(1);
		viewName = me.viewMapping[viewName] ? me.viewMapping[viewName] : viewName;
		
		
		
		
		var view = me.getView(viewName);
		
		if (view) {
			var tabPanel = me.getDesktopTabPanel();
			var tab = tabPanel.items.get(me.tabId[viewName]);
			
			if (!tab) {
				tab = view.create({
					closable: true
				});
				me.tabId[viewName] = tab.getId();
				tabPanel.add(tab);
			}
			
			tabPanel.setActiveTab(tab);
		}
	}
	
});