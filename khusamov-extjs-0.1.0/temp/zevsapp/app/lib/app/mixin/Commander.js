



// пока не использовать




Ext.define("Zevs.lib.app.mixin.Commander", {
	
	extend: "Ext.Mixin",
	
	//requires: ["Zevs.lib.JsonQuery"],
	
	mixinConfig: {
		id: "commander"
	},
	
	/*privates: {
		
		jsonQuery: null
		
	},
	
	config: {
		parentProperty: "parent",
		itemsProperty: "items"
	},*/
	
	/*constructor: function(config) {
		var me = this;
		me.initConfig(config);
		var jsonQueryConfig = Ext.Object.merge({ object: this }, config);
		me.jsonQuery = Ext.create("Zevs.lib.JsonQuery", jsonQueryConfig);
	},*/
	
	getCommandController: function() {
		
	}
	
});