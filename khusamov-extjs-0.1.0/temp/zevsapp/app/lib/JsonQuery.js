
// пока не используется

Ext.define("Zevs.lib.JsonQuery", {
	
	config: {
		
		object: {},
		
		/**
		 * Ссылка на корневой объект.
		 */
		root: null,
		
		/**
		 * Имя свойства, содержащего ссылку на родительский объект.
		 * Можно не указывать (приравнять null), если определен root, так как в этом случае 
		 * родительский объект можно найти автоматически, обходя дерево.
		 */
		parentProperty: "parent",
		
		/**
		 * Имя свойства, содержащего ссылку на массив дочерних объектов.
		 * Можно не указывать, тогда все свойства текущего объекта будут считаться дочерними, 
		 * в ином случае они будут считаться только свойствами объекта (обход по ним не будет производиться).
		 */
		itemsProperty: "items"
		
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
	},
	
	up: function() {
		var me = this;
		return me;
	},
	
	down: function() {
		var me = this;
		return me;
	},
	
	next: function() {
		var me = this;
		return me;
	},
	
	prev: function() {
		var me = this;
		return me;
	},
	
	first: function() {
		var me = this;
		return me;
	},
	
	last: function() {
		var me = this;
		return me;
	},
	
	each: function() {
		
	},
	
	filter: function() {
		
	},
	
	eq: function() {
		
	},
	
});