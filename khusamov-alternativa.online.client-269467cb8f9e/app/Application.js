
Ext.define("Alternativa.Application", {
	
	extend: "Ext.app.Application",
	
	requires: ["Alternativa.override.Override"],
	
	name: "Alternativa",
	
	config: {
		title: "Альтернатива Онлайн 2015",
		project: null
	},
	
	
	
	// http://javascript.ru/forum/extjs/56202-paths-processed-true.html
	"paths processed": true, // чтобы можно было вне класса задать путь к namespace Alternativa
	/*
		Ext.define('MyApp.Application', {
		    extend: 'Ext.app.Application',
		    appFolder: 'foo/bar'
		});
		
		Ext.application('MyApp.Application');
		или
		Ext.application({
		    name: 'MyApp',
		    appFolder: 'foo/bar'
		});	
	*/
	
	
	
	
	
	
	// TODO DEPRECATED 
	autoCreateViewport: "Alternativa.view.main.Main", 
	//mainView: "Alternativa.view.main.Main",
	
	
	controllers: ["Root", "Tab"],
	
	models: ["MainMenuItem", "LegalForm", /*"contractor.Individual"*/],
	
	stores: ["MainMenu", "LegalForms", "Individuals", "Contractors"],
	
	init: function() {
		console.log("Альтернатива Онлайн 2015. Программа управления предприятием.");
		console.log("Версия Sencha Ext JS =", Ext.getVersion().version);
		console.log(Pace ? "Обнаружена Pace." : "Внимание, Pace недоступна.");
		this.initPageTitle();
	},
	
	initPageTitle: function() {
		
		// TODO учитывать случай, когда в head уже есть свой title
		
		var title = "<title>" + this.getTitle() + "</title>";
		Ext.dom.Helper.append(Ext.getDoc().down("head"), title);
	},
	
	launch: function() {
		if (Pace) {
			Pace.stop();
			console.log("Pace успешно выключена.");
		}
	}
	
});