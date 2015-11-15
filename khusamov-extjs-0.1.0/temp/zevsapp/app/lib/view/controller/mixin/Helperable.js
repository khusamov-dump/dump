
/**
 * Добавляется в контроллер вида.
 * Делает возможность создавать помошники для контроллера вида.
 */

Ext.define("Zevs.lib.view.controller.mixin.Helperable", {
	
	extend: "Ext.Mixin",
	
	mixinConfig: {
		id: "helperable"
	},
	
	helperTypeName: "htype",
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
		me.initHelpers();
	},
	
	initHelpers: function() {
		var me = this;
		var helpers = me.helpers;
		helpers = helpers.map(function(helper) {
			if (!(helper instanceof Zevs.lib.view.controller.Helper)) {
				return me.constructHelper(helper);
			}
		});
		me.helpers = {};
		helpers.forEach(function(helper) {
			me.helpers[helper.htype] = helper;
		});
	},
	
	constructHelper: function(helper) {
		var me = this;
		var alias, config = {};
		if (Ext.isString(helper)) {
			alias = "helper." + helper;
			config.htype = helper;
		}
		if (Ext.isObject(helper)) {
			alias = "helper." + helper[me.helperTypeName];
			config = helper;
		}
		config.controller = me;
		helper = Ext.createByAlias(alias, config);
		return helper;
	},
	
	getHelper: function(htype) {
		return this.helpers[htype];
	},
	
	getHelperByShortName: function(name) {
		var me = this;
		var result = null;
		Ext.Object.each(me.helpers, function(htype, helper) {
			if (helper.getHelperShortName() == name) {
				result = helper;
				return false;
			}
		});
		return result;
	}
	
});