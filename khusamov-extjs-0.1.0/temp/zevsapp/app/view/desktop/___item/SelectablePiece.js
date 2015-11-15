


// TODO Удалить!



Ext.define("Zevs.view.desktop.item.SelectablePiece", {
	
	extend: "Khusamov.svg.desktop.surface.Piece",
	
	mixins: ["Zevs.lib.container.mixin.Selectable"],
	
	initComponent: function() {
		var me = this;
		me.callParent();
		me.mixins.selectable.constructor.call(me);
	}
	
});