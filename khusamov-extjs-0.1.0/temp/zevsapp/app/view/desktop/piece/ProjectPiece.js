
Ext.define("Zevs.view.desktop.piece.ProjectPiece", {
	
	extend: "Zevs.view.desktop.piece.Piece",
	
	requires: ["Zevs.view.desktop.piece.ConstructionPiece"],
    
    baseCls: Ext.baseCSSPrefix + "zevs-desktop-piece-project",
	
	initPiece: function() {
		var me = this;
		
		// В проекте всегда есть одна единственная конструкция, 
		// поэтому сразу ее выводим на экран.
		var ConstructionPiece = Zevs.view.desktop.piece.ConstructionPiece;
		var project = me.getProjectItem();
		var constructionPiece = new ConstructionPiece(project.getConstruction());
		me.add(constructionPiece);
	}
	
});