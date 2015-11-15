
Ext.define("Zevs.view.desktop.ghost.FrameGhost", {
	
	//alternateClassName: "Zevs.view.desktop.item.frame.Ghost",
	
	extend: "Khusamov.svg.desktop.surface.Piece",
	
	requires: ["Khusamov.svg.element.Polyline"],
	
	polyline: null,
	
	items: [{
		type: "polyline",
		style: {
			stroke: "black",
			strokeWidth: 1,
			strokeDasharray: "20, 5",
			fill: "transparent"
		}
	}],
	
	getPolyline: function() {
		var me = this;
		if (!me.polyline) me.polyline = me.down("[type=polyline]");
		return me.polyline;
	}
	
});