
/**
 * Русификация.
 */

Ext.onReady(function() {
	
	
	// Ext.grid.feature.Grouping

	Ext.define("Ext.locale.ru.grid.feature.Grouping", {
		override: "Ext.grid.feature.Grouping",
		emptyGroupText: "(Пусто)",
		groupByText: "Группировать по этому полю",
		showGroupsText: "Отображать по группам"
	});
	
	// Ext.LoadMask

	Ext.require("Ext.LoadMask", function() {

		Ext.override(Ext.LoadMask, {
			msg: "Загрузка..."
		});
		
		Ext.override(Ext.view.AbstractView, {
			loadingText: "Загрузка..."
		});

	});
	
});


