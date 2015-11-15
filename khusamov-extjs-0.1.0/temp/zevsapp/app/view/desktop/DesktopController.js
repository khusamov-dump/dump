
Ext.define("Zevs.view.desktop.DesktopController", {
	
	//extend: "Zevs.lib.view.controller.Pluginable",
	extend: "Ext.app.ViewController",
	
	alias: "controller.desktop",
	
	mixins: ["Zevs.lib.view.controller.mixin.Pluginable"],
	
	requires: [
		//"Zevs.view.desktop.plugin.project.Bind",
		"Zevs.view.desktop.piece.ProjectPiece",
		"Zevs.view.desktop.plugin.product.Insert",
		"Zevs.view.desktop.plugin.frameBeam.Insert",
		"Zevs.view.desktop.plugin.productJoint.Insert"
	],
	
	init: function() {
		var me = this;
		
		me.mixins.pluginable.constructor.call(me);
		
		//me.getViewModel().set("project", Zevs.app.getProject());
		
		var desktopPanel = me.getView();
		var desktop = desktopPanel.getDesktop();
		var board = desktop.getBoard();
		var surface = board.getSurface();
		surface.add(surface.createLayer("main"));
		/*me.getViewModel().set("desktop", {
			instance: desktop,
			board: board,
			surface: surface,
			mainLayer: mainLayer
		});*/
		me.getView().addPiece(Ext.create("Zevs.view.desktop.piece.ProjectPiece", Zevs.app.getProject()));
		
		
		
	},
	
	/*onProjectUpdate: function(project) {
		//this.getPlugin("project/bind").onProjectUpdate(project);
		
		this.getView().addPiece(Ext.create("Zevs.view.desktop.piece.ProjectPiece", project));
		
	}*/
	
});