
Ext.define("Zevs.lib.container.mixin.SelectManager", {
	
	extend: "Ext.Mixin",
	
	requires: ["Zevs.lib.util.SelectManager"],
	
	mixinConfig: {
		id: "selectManager"
	},
	
	isSelectManager: true,
	
	/**
	 * @property {Zevs.lib.util.SelectManager}
	 */
	selectManager: null,
	
	constructor: function() {
		var me = this;
		//me.initConfig(config);
		me.selectManager = Ext.create("Zevs.lib.util.SelectManager", me);
	},
	
	getSelectManager: function() {
		return this.selectManager;
	},
	
	delegates: {
		selectManager: {
			/**
			 * Получить коллекцию выделенных объектов.
			 */
			getSelection: false,
			/**
			 * Очистить коллекцию.
			 */
			clearSelection: true
		}
	},
	
	onSelect: Ext.emptyFn,
	
	onUnselect: Ext.emptyFn
	
});