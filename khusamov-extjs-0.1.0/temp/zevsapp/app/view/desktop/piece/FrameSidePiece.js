
Ext.define("Zevs.view.desktop.piece.FrameSidePiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: [
		"Khusamov.svg.element.Line", 
		"Zevs.view.desktop.piece.FrameBeamPiece"
	],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-frameside",
	
	items: [{
		itemId: "select",
		type: "line",
		style: {
			stroke: "#157fcc",
			strokeOpacity: 0,
			strokeWidth: 4
		}
	}, {
		itemId: "clickable",
		type: "line",
		style: {
			stroke: "white",
			strokeOpacity: 0,
			strokeWidth: 15,
			cursor: "pointer"
		}
	}],
	
	initPiece: function() {
		var me = this;
		var frameSide = me.getProjectItem();
		
		var frameSideGeometry = frameSide.getBaseLine();
		
						
		me.setGeometry(frameSideGeometry);
						
		frameSide.on("add", "onAddFrameBeam", me);
		
	},
	
	onAddFrameBeam: function(frameBeam) {
		var me = this;
		me.add(Ext.create("Zevs.view.desktop.piece.FrameBeamPiece", frameBeam));
	},
	
	
	
	setGeometry: function(geometry) {
		var me = this;
		me.down("khusamov-svg-element-line#clickable").setGeometry(geometry);
		me.down("khusamov-svg-element-line#select").setGeometry(geometry);
	},
	
	getLine: function() {
		var me = this;
		return me.down("khusamov-svg-element-line#select");
	},
	
	getClickableLine: function() {
		var me = this;
		return me.down("khusamov-svg-element-line#clickable");
	},
	
	onSelect: function() {
		//this.callParent(arguments);
		this.getLine().setStyle({
			strokeOpacity: 0.6
		});
	},
	
	onUnselect: function() {
		//this.callParent(arguments);
		this.getLine().setStyle({
			strokeOpacity: 0
		});
	},
	
	onSelectableFreeze: function() {
		this.getClickableLine().setStyle({
			cursor: "pointer"
		});
	},
	
	onSelectableUnfreeze: function() {
		this.getClickableLine().setStyle({
			cursor: "default"
		});
	},
	
});