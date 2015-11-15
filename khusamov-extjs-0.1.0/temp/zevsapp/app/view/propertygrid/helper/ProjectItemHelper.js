
/**
 * Базовый класс помощников, которые готовят свойства выбранной детали.
 */

Ext.define("Zevs.view.propertygrid.helper.ProjectItemHelper", {
	
	extend: "Zevs.lib.view.controller.helper.Helper",
	
	alias: "helper.projectitem",
	
	getPropertySource: function(projectItem) {
		
		var projectItemTypeTitle = "Выбранная деталь";
		
		var source = {
			title: projectItemTypeTitle,
			data: {
				id: projectItem.getId(),
				type: projectItem.self.getName()
			},
			config: {
				id: {
					displayName: "Номер"
				},
				type: {
					displayName: "Тип"
				}
			}
		};
		
		return source;
		
	}
	
});