
Ext.define("Zevs.view.propertygrid.helper.FrameSideHelper", {
	
	extend: "Zevs.lib.view.controller.helper.Helper",
	
	alias: "helper.frameside",
	
	getPropertySource: function(projectItem) {
		
		var projectItemTypeTitle = "Сторона рамы";
		
		var source = {
			title: projectItemTypeTitle,
			data: {
				id: projectItem.getId(),
				type: projectItemTypeTitle,
				index: projectItem.getIndex(),
				points: projectItem.getBaseLine().toString()
			},
			config: {
				id: {
					displayName: "Номер"
				},
				type: {
					displayName: "Тип"
				},
				index: {
					displayName: "Индекс"
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