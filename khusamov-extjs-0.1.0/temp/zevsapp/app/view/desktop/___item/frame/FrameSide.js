


// TODO Удалить!



Ext.define("Zevs.view.desktop.item.frame.FrameSide", {
	
	alternateClassName: "Zevs.view.desktop.item.FrameSide",
	
	//extend: "Khusamov.svg.desktop.surface.Piece",
	//extend: "Zevs.view.desktop.item.SelectablePiece",
	extend: "Zevs.view.desktop.item.ProjectPiece",
	
	requires: ["Khusamov.svg.element.Line"],
	
	//line: null,
	
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
	
	/*listeners: {
		focus: "onFocus",
		blur: "onBlur"
	},*/
	
	onSelect: function() {
		this.callParent(arguments);
		this.getLine().setStyle({
			strokeOpacity: 0.6
		});
	},
	
	onUnselect: function() {
		this.callParent(arguments);
		this.getLine().setStyle({
			strokeOpacity: 0
		});
	},
	
	onSelectableEnable: function() {
		this.getClickableLine().setStyle({
			cursor: "pointer"
		});
	},
	
	onSelectableDisable: function() {
		this.getClickableLine().setStyle({
			cursor: "default"
		});
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
	}
	
});