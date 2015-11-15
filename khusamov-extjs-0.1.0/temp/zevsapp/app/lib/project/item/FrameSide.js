
/**
 * Сторона рамы.
 */

Ext.define("Zevs.lib.project.item.FrameSide", {
	
	extend: "Zevs.lib.project.item.Item",
	
	requires: ["Khusamov.svg.geometry.Line"],
	
	isFrameSide: true,
	
	itemConfig: {
		type: "frameside",
		name: "Сторона рамы"
	},
	
	/**
	 * Получить раму окна, к которой принадлежит данная сторона рамы.
	 * @return {Zevs.lib.project.item.Frame}
	 */
	getFrame: function() {
		return this.getParent();
	},
	
	/**
	 * Получить балку рамы окна, которая закреплена за данной стороной рамы.
	 * Это единственный дочерний элемент стороны рамы.
	 * @return {Zevs.lib.project.item.FrameBeam}
	 */
	getFrameBeam: function() {
		return this.items.first();
	},
	
	hasFrameBeam: function() {
		return !!this.getFrameBeam();
	},
	
	getBaseLine: function() {
		return Ext.create("Khusamov.svg.geometry.Line", this.getFirstPoint(), this.getLastPoint());
	},
	
	getFirstPoint: function() {
		return this.getFrame().getPolygon().getPoint(this.getIndex());
	},
	
	getLastPoint: function() {
		return this.getFrame().getPolygon().getNextPoint(this.getIndex());
	},
	
	getIndex: function() {
		return this.getParent().items.indexOf(this);
	},
	
	getLength: function() {
		return this.getBaseLine().getLength();
	},
	
	getNextFrameSide: function() {
		return this.getFrame().getNextFrameSide(this.getIndex());
	},
	
	getPrevFrameSide: function() {
		return this.getFrame().getPrevFrameSide(this.getIndex());
	},
	
}, function() {
	
	Zevs.lib.project.item.Item.createFrameSide = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.FrameSide"].concat(Ext.Array.slice(arguments)));
	};
	
});