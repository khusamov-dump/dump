
// Пока не используется.

/*Ext.define("Zevs.lib.util.Collection", {
	
	extend: "Ext.util.Collection",
	
	requires: ["Ext.data.identifier.Sequential"],
	
	constructor: function() {
		var me = this;
		me.callParent(arguments);
		me.identifier = Ext.create("Ext.data.identifier.Sequential");
	},
	
	add: function(items) {
		var me = this;
		
		if (!Ext.isArray(items)) items = [items];
		items.map(function(item) {
			var key = me.getKey(item);
			if (key === undefined || key === null) me.setKey(item);
			return item;
		});
		
		
		return me.callParent(items);
	},
	
	setKey: function(item, id) {
		id = id || this.identifier.generate();
		if (item.setId) item.setId(id); else item.id = id;
        return this;
	}
	
});*/