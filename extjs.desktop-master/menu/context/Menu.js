
Ext.define("Sultana.menu.context.Menu", {
	extend: "Ext.menu.Menu",
	alias: "widget.sContextMenu",
	
	requires: ["Sultana.menu.context.Item"],
	
	lookupItemFromObject: function(cmp) {
		var me = this;
		cmp.xtype = cmp.xtype || "sContextMenuItem";
		return me.callParent([cmp]);
	}

});


