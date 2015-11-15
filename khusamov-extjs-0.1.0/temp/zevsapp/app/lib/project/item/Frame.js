
/**
 * Рама окна.
 */

Ext.define("Zevs.lib.project.item.Frame", {
	
	extend: "Zevs.lib.project.item.Item",
	
	requires: [
		"Zevs.lib.project.item.FrameSide", 
		"Khusamov.svg.geometry.Polygon"
	],
	
	isFrame: true,
	
	itemConfig: {
		type: "frame",
		name: "Рама окна"
	},
	
	config: {
		
		/**
		 * Полигон рамы.
		 * @property {Khusamov.svg.geometry.Polygon}
		 */
		polygon: null,
		
	},
	
	applyPolygon: function(polygon) {
		var Polygon = Khusamov.svg.geometry.Polygon;
		if (!(polygon instanceof Polygon)) polygon = new Polygon(polygon);
		// Если пользователь ввел вывернутый полигон, то выворачиваем его обратно.
		if (polygon.isClockwiseDirection()) polygon.turnOut();
		return polygon;
	},
	
	updatePolygon: function(polygon) {
		var me = this;
		
		// TODO предыдущие стороны рамы нужно удалить!
		
		
		
		polygon.each(function(point, index) {
			me.add(Ext.create("Zevs.lib.project.item.FrameSide"));
		});
	},
	
	/**
	 * Получить изделие, в котором находится данная рама.
	 * Родительским элементом рамы всегда является изделие.
	 * @return {Zevs.lib.project.item.Product}
	 */
	getProduct: function() {
		return this.getParent();
	},
	
	/**
	 * Получить коллекцию сторон рамы.
	 * @return {Ext.util.Collection}
	 */
	getFrameSides: function() {
		return this.items;
	},
	
	getFrameSide: function(index) {
		return this.items.getAt(index);
	},
	
	getFirstFrameSide: function() {
		return this.items.first();
	},
	
	getLastFrameSide: function() {
		return this.items.last();
	},
	
	getNextFrameSide: function(index) {
		var next = this.getFrameSide(index + 1);
		return next ? next : this.getFirstFrameSide();
	},
	
	getPrevFrameSide: function(index) {
		var prev = this.getFrameSide(index - 1);
		return prev ? prev : this.getLastFrameSide();
	},
	
}, function() {
	
	Zevs.lib.project.item.Item.createFrame = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.Frame"].concat(Ext.Array.slice(arguments)));
	};
	
});