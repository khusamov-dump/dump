
Ext.define("Zevs.lib.util.Selectable", {
	
	enabled: true,
	
	freezed: false,
	
	selected: false,
	
	config: {
		
		/**
		 * @property {Ext.Component}
		 */
		component: null,
		
		eventSelect: "click", // null | inherit | click...
		
		groupKey: "shift" // null | inherit | shift | ctrl | alt
		
	},
	
	constructor: function(config) {
		var me = this;
		if (config instanceof Ext.Component) config = { component: config };
		me.initConfig(config);
		me.initClickable();
	},
	
	initClickable: function() {
		var me = this;
		var component = me.getComponent();
		if (component.rendered) {
			component.getEl().on("click", "onClick", me);
		} else {
			component.on("render", function() {
				component.getEl().on("click", "onClick", me);
			});
		}
	},
	
	onClick: function(event) {
		var me = this;
		if (event.button == 0 && me.isSelectionEnabled()) {
			if (me.selected) {
				if (event.shiftKey) me.unselect();
			} else {
				me.select(event.shiftKey);
			}
			event.stopEvent();
		}
	},
		
	enable: function() {
		var me = this;
		if (!me.enabled) {
			me.enabled = true;
			me.getComponent().onSelectableEnable();
			me.getComponent().fireEvent("selectable-enable");
		}
	},
	
	disable: function() {
		var me = this;
		if (me.enabled) {
			me.unselect();
			me.enabled = false;
			me.getComponent().onSelectableDisable();
			me.getComponent().fireEvent("selectable-disable");
		}
	},
	
	freeze: function() {
		var me = this;
		if (me.enabled && !me.freezed) {
			me.freezed = true;
			me.getComponent().onSelectableFreeze();
			me.getComponent().fireEvent("selectable-freeze");
		}
	},
	
	unfreeze: function() {
		var me = this;
		if (me.enabled && me.freezed) {
			me.freezed = false;
			me.getComponent().onSelectableUnfreeze();
			me.getComponent().fireEvent("selectable-unfreeze");
		}
	},
	
	select: function(group) {
		var me = this;
		if (!me.selected && me.isSelectionEnabled()) {
			if (!group) me.getSelectManager().clearSelection();
			me.getSelectManager().register(me.getComponent(), group);
		}
	},
	
	unselect: function() {
		var me = this;
		if (me.selected) {
			me.getSelectManager().unregister(me.getComponent());
		}
	},
	
	/**
	 * @return {Zevs.lib.util.SelectManager}
	 */
	getSelectManager: function() {
		return this.getComponent().up("[isSelectManager]").selectManager;
	},
	
	isSelectionEnabled: function() {
		return this.getSelectManager().enabled && this.enabled;
	}
	
});