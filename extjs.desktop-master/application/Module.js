
Ext.define("Sultana.application.Module", {
	
	mixins: {
		observable: "Ext.util.Observable"
	},
	
	views: [],
	
	config: {
		application: null
	},
	
	constructor: function(config) {
		var me = this;

		me.mixins.observable.constructor.call(me, config);
		//me.addEvents("launch");
		
		
		
		me.initConfig(config);
		
		me.init();
	},
	
	init: Ext.emptyFn,
	
	exec: Ext.emptyFn,
	
	getView: function(name) {
		var me = this;
		var namespace = me.getApplication().getName();
		var fullname = me.getFullName(name, "view", namespace);
		return Ext.ClassManager.get(fullname);
	},
	
	getFullName: function(name, kind, namespace) {
		var nameTpl = new Ext.Template("{namespace}.{kind}.{name}");
		return nameTpl.apply({ name: name, kind: kind, namespace: namespace });
	}
	
});


