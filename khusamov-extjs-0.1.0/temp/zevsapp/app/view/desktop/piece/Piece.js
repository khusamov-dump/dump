
Ext.define("Zevs.view.desktop.piece.Piece", {
	
	extend: "Khusamov.svg.desktop.surface.Piece",
	
	mixins: ["Zevs.lib.container.mixin.Selectable"],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece",
	
	config: {
		
		/**
		 * Zevs.lib.project.item.Item
		 */
		projectItem: null
		
	},
	
	/**
	 * @param {Zevs.lib.project.item.Item || Object} config 
	 */
	constructor: function(config) {
		var me = this;
		if (config instanceof Zevs.lib.project.item.Item) config = { projectItem: config };
		me.callParent([config]);
	},
	
	initComponent: function() {
		var me = this;
		me.callParent();
		me.mixins.selectable.constructor.call(me);
	},
	
	/**
	 * Правило:
	 * После отрисовки вида элемента проекта все выделения отменяются.
	 */
	onRender: function() {
		var me = this;
		me.callParent(arguments);
		me.selectable.getSelectManager().clearSelection();
	}
	
});