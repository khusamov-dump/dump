
Ext.define("Zevs.view.desktop.piece.FramePiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: [
		"Khusamov.svg.element.Polygon", 
		"Zevs.view.desktop.piece.FrameSidePiece"
	],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-frame",
	
	polygon: null,
	
	items: [{
		type: "polygon",
		style: {
			stroke: "black",
			strokeWidth: 1,
			strokeDasharray: "20, 5",
			fill: "transparent",
			cursor: "pointer"
		}
	}],
	
	getPolygon: function() {
		var me = this;
		if (!me.polygon) me.polygon = me.down("khusamov-svg-element-polygon");
		return me.polygon;
	},
	
	initPiece: function() {
		var me = this;
		var FrameSidePiece = Zevs.view.desktop.piece.FrameSidePiece;
		var frame = me.getProjectItem();
		
		var frameGeometry = frame.getPolygon();
		me.getPolygon().setGeometry(frameGeometry);
		
		
		
		frame.getFrameSides().each(function(frameSide, index) {
			var frameSidePiece = new FrameSidePiece(frameSide);
			me.add(frameSidePiece);
		});
		
		
	},
	
	onSelect: function() {
		//this.callParent(arguments);
		this.getPolygon().setStyle({
			fill: "rgb(185, 226, 255)"
		});
	},
	
	onUnselect: function() {
		//this.callParent(arguments);
		this.getPolygon().setStyle({
			fill: "transparent"
		});
	},
	
	onSelectableFreeze: function() {
		this.getPolygon().setStyle({
			cursor: "pointer"
		});
	},
	
	onSelectableUnfreeze: function() {
		this.getPolygon().setStyle({
			cursor: "default"
		});
	},
	
});