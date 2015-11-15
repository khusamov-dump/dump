
Ext.define("Zevs.lib.container.mixin.Selectable", {
	
	extend: "Ext.Mixin",
	
	requires: ["Zevs.lib.util.Selectable"],
	
	mixinConfig: {
		id: "selectable"
	},
	
	isSelectable: true,
	
	selected: false,
	
	/**
	 * @property {Zevs.lib.util.Selectable}
	 */
	selectable: null,
	
	constructor: function() {
		var me = this;
		//me.initConfig(config);
		me.selectable = Ext.create("Zevs.lib.util.Selectable", me);
		
		// TODO при добавлении нового компонента нужно проверять - включен ли менеджер выделений, если нет, то выключить возможность выделять у нового компонента
		
		
	},
	
	delegates: {
		selectable: {
			select: true,
			unselect: true
		}
	},
	
	onSelect: Ext.emptyFn,
	
	onUnselect: Ext.emptyFn,
	
	onSelectableEnable: Ext.emptyFn,
	
	onSelectableDisable: Ext.emptyFn,
	
	onSelectableFreeze: Ext.emptyFn,
	
	onSelectableUnfreeze: Ext.emptyFn
	
});