
Ext.define("Zevs.view.desktop.piece.ConstructionPiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: ["Zevs.view.desktop.piece.ProductPiece"],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-construction",
	
	initPiece: function() {
		var me = this;
		var ProductPiece = Zevs.view.desktop.piece.ProductPiece;
		var construction = me.getProjectItem();
		construction.on("add", "onAddProduct", me);
		
		if (construction.hasProduct()) {
			var product = construction.getProduct();
			var productPiece = new ProductPiece(product);
			me.add(productPiece);
		}
		
		
	},
	
	/*onAdd: function(added) {
		var me = this;
		if (!Ext.isArray(added)) added = [added];
		added.forEach(function(item) {
			if (item.isProduct) me.onAddProduct(item);
			
			//TODO переделать - в конструкции может быть ТОЛЬКО одно изделие, соединители ваще не тут будут!
			
			
			//if (item.isProductJoint) me.onAddProduct(item);
		});
	},*/
	
	onAddProduct: function(product) {
		var me = this;
		var ProductPiece = Zevs.view.desktop.piece.ProductPiece;
		var productPiece = new ProductPiece(product);
		me.add(productPiece);
	},
	
	/*onAddProductJoint: function(productJoint) {
		var me = this;
		var ProductJointPiece = Zevs.view.desktop.piece.ProductJointPiece;
		
	}*/
	
});