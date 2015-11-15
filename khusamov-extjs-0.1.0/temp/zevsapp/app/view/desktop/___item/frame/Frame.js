


// TODO Удалить!



Ext.define("Zevs.view.desktop.item.frame.Frame", {
	
	alternateClassName: "Zevs.view.desktop.item.Frame",
	
	//extend: "Khusamov.svg.desktop.surface.Piece",
	//extend: "Zevs.view.desktop.item.SelectablePiece",
	extend: "Zevs.view.desktop.item.ProjectPiece",
	
	requires: ["Khusamov.svg.element.Polygon"],
	
	polygon: null,
	
	items: [{
		type: "polygon",
		style: {
			stroke: "black",
			strokeWidth: 1,
			fill: "transparent",
			cursor: "pointer"
		}
	}],
	
	/*listeners: {
		focus: "onFocus",
		blur: "onBlur"
	},*/
	
	onSelect: function() {
		this.callParent(arguments);
		this.getPolygon().setStyle({
			stroke: "#157fcc"
		});
	},
	
	onUnselect: function() {
		this.callParent(arguments);
		this.getPolygon().setStyle({
			stroke: "black"
		});
	},
	
	onSelectableEnable: function() {
		this.getPolygon().setStyle({
			cursor: "pointer"
		});
	},
	
	onSelectableDisable: function() {
		this.getPolygon().setStyle({
			cursor: "default"
		});
	},
	
	getPolygon: function() {
		var me = this;
		if (!me.polygon) me.polygon = me.down("khusamov-svg-element-polygon");
		return me.polygon;
	}
	
});