
Ext.define("Zevs.lib.util.SelectManager", {
	
	requires: ["Ext.util.Collection"],
	
	selectionElementCls: Ext.baseCSSPrefix + "select-element",
	
	enabled: true,
	
	freezed: false,
	
	/**
	 * @property {Ext.util.Collection}
	 */
	selection: null,
	
	config: {
		
		/**
		 * @property {Ext.Component}
		 */
		component: null,
		
		onClickEnabled: true
		
	},
	
	constructor: function(config) {
		var me = this;
		if (config instanceof Ext.Component) config = { component: config };
		me.initConfig(config);
		me.initClickable();
		me.selection = me.createSelection();
	},
	
	createSelection: function() {
		return Ext.create("Ext.util.Collection", {
			listeners: {
				add: "onSelectionAdd",
				remove: "onSelectionRemove",
				scope: this
			}
		});
	},
	
	onSelectionAdd: function(collection, details) {
		var me = this;
		details.items.forEach(function(selected) {
			selected.fireEvent("select");
			selected.onSelect();
			selected.selected = true;
			selected.selectable.selected = true;
			me.getComponent().onSelect(me.selection, selected);
			me.getComponent().fireEvent("select", me.selection, selected);
		});
	},
	
	onSelectionRemove: function(collection, details) {
		var me = this;
		details.items.forEach(function(selected) {
			selected.fireEvent("unselect");
			selected.onUnselect();
			selected.selected = false;
			selected.selectable.selected = false;
			me.getComponent().onUnselect(me.selection, selected);
			me.getComponent().fireEvent("unselect", me.selection, selected);
		});
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
		if (event.button == 0) this.clearSelection();
	},
	
	enable: function() {
		var me = this;
		if (!me.enabled) {
			me.enabled = true;
			me.getComponent().query("[isSelectable]").forEach(function(item) {
				item.selectable.enable();
			});
		}
	},
	
	disable: function() {
		var me = this;
		if (me.enabled) {
			me.enabled = false;
			me.getComponent().query("[isSelectable]").forEach(function(item) {
				item.selectable.disable();
			});
		}
	},
	
	freeze: function() {
		var me = this;
		if (me.enabled && !me.freezed) {
			me.freezed = true;
			
		}
	},
	
	unfreeze: function() {
		var me = this;
		if (me.enabled && me.freezed) {
			me.freezed = false;
			
		}
	},
	
	register: function(selected) {
		this.selection.add(selected);
	},
	
	unregister: function(unselected) {
		this.selection.remove(unselected);
	},
	
	clearSelection: function() {
		this.selection.removeAll();
	},
	
	getSelection: function() {
		return this.selection;
	}
	
});