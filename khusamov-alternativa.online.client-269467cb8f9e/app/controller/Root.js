
Ext.define("Alternativa.controller.Root", {
	
	extend: "Ext.app.Controller",
	
	control: {
		"treepanel#mainmenu": {
			itemclick: "onTreePanelItemClick"
		}
	},
	
	onTreePanelItemClick: function(treePanel, record) {
		this.redirectTo(record.getPath("path"));
	}
	
});