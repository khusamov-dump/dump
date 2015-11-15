








// TODO Нужно сделать возможность добавлять плагины в приложение
// чтобы все классы по одному типу объектов (например Конструкция или Балка рамы) объединять в один плагин






Ext.define("Zevs.Application", {
	
	extend: "Zevs.lib.app.Commander",
	
	requires: [ 
		"Zevs.override.dd.DragTracker", 
		"Zevs.override.window.Toast",
		"Zevs.lib.project.Project",
		"Zevs.lib.project.item.Product",
		"Zevs.lib.project.item.FrameBeam"
	],
	
	//mixins: ["Zevs.lib.app.mixin.Commander"],
	
	name: "Zevs",
	
	config: {
		title: "Зевс Построитель",
		project: null
	},
	
	autoCreateViewport: "Zevs.view.main.Main", 
	
	controllers: [
		"Root", 
		"CommandLine",
		"command.InsertCommand"
	],
	
	init: function() {
		console.log("Ext.FocusManager.enabled =", Ext.FocusManager.enabled);
		this.initPageTitle();
		this.initProject();
	},
	
	initPageTitle: function() {
		var title = "<title>" + this.getTitle() + "</title>";
		Ext.dom.Helper.append(Ext.getDoc().down("head"), title);
	},
	
	initProject: function() {
		//Zevs.Project.setConstruction(Zevs.Project.createConstruction());
		this.setProject(Zevs.Project);
	},
	
	launch: function() {
		
	}
	
});