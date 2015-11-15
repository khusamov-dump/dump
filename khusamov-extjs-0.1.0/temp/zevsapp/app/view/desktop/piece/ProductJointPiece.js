
Ext.define("Zevs.view.desktop.piece.ProductJointPiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	uses: ["Zevs.view.desktop.piece.ProductPiece"],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-productjoint",
	
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
		var productJoint = me.getProjectItem();
		var base = productJoint.getBaseLine();
		
		var geometry = [];
		geometry.push(base.getFirstPoint());
		geometry.push(base.getLastPoint());
		
		var pbase = productJoint.getParallelBaseLine();
		geometry.push(pbase.getLastPoint());
		geometry.push(pbase.getFirstPoint());
		
		me.getPolygon().setGeometry(geometry);
		
		productJoint.on("add", "onAddPiece", me);
	},
	
	onAddPiece: function(jointed) {
		var me = this;
		
		var pieceName = {
			"productjoint": "ProductJointPiece",
			"product": "ProductPiece",
		}[jointed.getItemType()];
		
		if (!pieceName) throw new Error("Попытка вставить в соединитель неизвестный элемент: " + jointed.self.getName());
		
		me.add(Ext.create("Zevs.view.desktop.piece." + pieceName, jointed));
		
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