
Ext.define("Zevs.view.propertygrid.helper.FrameHelper", {
	
	extend: "Zevs.lib.view.controller.helper.Helper",
	
	alias: "helper.frame",
	
	getPropertySource: function(projectItem) {
		
		var projectItemTypeTitle = "Рама окна";
		
		var source = {
			title: projectItemTypeTitle,
			data: {
				id: projectItem.getId(),
				type: projectItemTypeTitle,
				points: projectItem.getPolygon().toString()
			},
			config: {
				id: {
					displayName: "Номер"
				},
				type: {
					displayName: "Тип"
				},
				points: {
					displayName: "Точки",
					editor: Ext.create("Ext.form.field.TextArea")
				}
			}
		};
		
		return source;
		
	}
	
});