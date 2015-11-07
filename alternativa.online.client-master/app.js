
/**
 * Настройка и запуск приложения
 */

Ext.application({
	
	paths: {
		"Ext.ux": "/js/extjs/4.2.1/ux",
		"Sultana": "/js/khusamov/extjs.desktop"
	},
	
	namespaces: ["Sultana"],
	
	name: "Alternativa",
	appFolder: "/js/khusamov/alternativa.online",
	
	controllers: ["Sultana.controller.Desktop", "Index", "Contractors", "Contractor"]

});


