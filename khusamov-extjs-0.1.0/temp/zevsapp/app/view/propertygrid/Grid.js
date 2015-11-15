
Ext.define("Zevs.view.propertygrid.Grid", {
	
	extend: "Ext.grid.PropertyGrid",
	
	xtype: "zevs-view-propertygrid-grid",
	
	requires: [
		"Zevs.view.propertygrid.GridModel",
		"Zevs.view.propertygrid.GridController"
	],
	
	controller: "propertygrid",
	
	viewModel: {
		type: "propertygrid"
	},
	
	bind: {
		title: "{source.title}",
		source: "{source}",
		emptyText: "{emptyText}"
	},
	
	title: "Свойства",
	emptyText: "Ничего не выбрано.",
	nameColumnWidth: 200,
	hideHeaders: true,
	
	setSource: function(source) {
		if (source) this.callParent([source.data, source.config]);
		if (!source || !("data" in source) || !source.data) {
			this.callParent([{}]);
			this.getStore().fireEvent("clear"); // это по сути исправление баги класса Ext.grid.PropertyGrid (emptyText не появляется без посылки clear)
		}
	},
	
	setEmptyText: function(text) {
		var me = this;
		if (me.getView().emptyEl) me.getView().emptyEl.innerText = text;
		me.getView().emptyText = "<div class='x-grid-empty'>" + text + "</div>";
	}
	
});


