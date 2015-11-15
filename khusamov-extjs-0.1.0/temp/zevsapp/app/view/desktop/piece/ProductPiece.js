
Ext.define("Zevs.view.desktop.piece.ProductPiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: ["Zevs.view.desktop.piece.FramePiece"],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-product",
	
	initPiece: function() {
		var me = this;
		
		// В изделии всегда есть одна единственная рама окна,
		// поэтому сразу ее выводим на экран.
		var FramePiece = Zevs.view.desktop.piece.FramePiece;
		var product = me.getProjectItem();
		var framePiece = new FramePiece(product.getFrame());
		me.add(framePiece);
	}
	
});