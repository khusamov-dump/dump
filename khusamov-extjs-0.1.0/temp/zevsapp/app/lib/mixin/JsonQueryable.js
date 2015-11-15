
// Пока не используется

/**
 * 
 * Поиск объектов в дереве JSON.
 * 
 * Внимание, миксины не затирают методы исходного класса.
 * me.mixins.jsonQueryable.constructor.call(me);
 * 
 */

Ext.define("Zevs.lib.mixin.JsonQueryable", {
	
	extend: "Ext.Mixin",
	
	requires: ["Zevs.lib.JsonQuery"],
	
	mixinConfig: {
		id: "jsonQueryable"
	},
	
	privates: {
		
		jsonQuery: null
		
	},
	
	config: {
		parentProperty: "parent",
		itemsProperty: "items"
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
		var jsonQueryConfig = Ext.Object.merge({ object: this }, config);
		me.jsonQuery = Ext.create("Zevs.lib.JsonQuery", jsonQueryConfig);
	},
	
	up: function() {
		return this.jsonQuery.up.apply(this.jsonQuery, arguments);
	},
	
	down: function() {
		return this.jsonQuery.down.apply(this.jsonQuery, arguments);
	}
	
});