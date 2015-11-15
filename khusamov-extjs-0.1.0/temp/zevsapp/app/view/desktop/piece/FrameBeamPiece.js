
Ext.define("Zevs.view.desktop.piece.FrameBeamPiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: [
		"Khusamov.svg.element.Polygon", 
		"Zevs.view.desktop.piece.ProductJointPiece"
	],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-framebeam",
	
	polygon: null,
	
	items: [{
		type: "polygon",
		style: {
			stroke: "black",
			strokeWidth: 1,
			fill: "white",
			cursor: "pointer"
		}
	}],
	
	initPiece: function() {
		var me = this;
		var frameBeam = me.getProjectItem();
		
		var width = -frameBeam.getWidth();
		var beamLine = frameBeam.getBaseLine();
		var nextLine = frameBeam.getNextFrameSide().getBaseLine();
		var prevLine = frameBeam.getPrevFrameSide().getBaseLine();
		
		var geometry = [];
		
		geometry.push(beamLine.getFirstPoint());
		geometry.push(beamLine.getLastPoint());
		
		var beamLinear = beamLine.toLinear().getParallelLinearByDestination(width);
		var nextLinear = nextLine.toLinear().getParallelLinearByDestination(width);
		var prevLinear = prevLine.toLinear().getParallelLinearByDestination(width);
		
		geometry.push(nextLinear.intersection(beamLinear));
		geometry.push(prevLinear.intersection(beamLinear));
		
		me.getPolygon().setGeometry(geometry);
		
		frameBeam.on("add", "onAddProductJoint", me);
	},
	
	onAddProductJoint: function(productJoint) {
		var me = this;
		me.add(Ext.create("Zevs.view.desktop.piece.ProductJointPiece", productJoint));
	},
	
	getPolygon: function() {
		var me = this;
		if (!me.polygon) me.polygon = me.down("khusamov-svg-element-polygon");
		return me.polygon;
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
			fill: "white"
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