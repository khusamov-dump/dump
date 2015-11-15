
Ext.define("Zevs.view.propertygrid.helper.FrameBeamHelper", {
	
	extend: "Zevs.lib.view.controller.helper.Helper",
	
	alias: "helper.framebeam",
	
	getPropertySource: function(projectItem) {
		
		var projectItemTypeTitle = "Балка рамы с/п изделия";
		
		var jointTypeEditor = Ext.create("Ext.form.field.ComboBox", {
			queryMode: "local",
			store: [
				["auto", "Автоматически"], 
				["equal", "Равное"], 
				["short", "Короткое"], 
				["long", "Длинное"], 
				["finger", "Шип"]
			]
		});
		
		var jointTypeRenderer = function(value) {
			return {
				"auto": "Автоматически",
				"equal": "Равное" ,
				"short": "Короткое",
				"long": "Длинное",
				"finger": "Шип"
			}[value];
		};
		
		var source = {
			title: projectItemTypeTitle,
			data: {
				id: projectItem.getId(),
				type: projectItemTypeTitle,
				width: projectItem.getWidth(),
				firstJointType: projectItem.getFirstJointType(),
				lastJointType: projectItem.getLastJointType(),
				archHeight: 0,
				archRadius: 0
			},
			config: {
				id: {
					displayName: "Номер"
				},
				type: {
					displayName: "Тип"
				},
				width: {
					displayName: "Ширина"
				},
				firstJointType: {
					displayName: "Тип соединения первой точки",
					editor: jointTypeEditor,
					renderer: jointTypeRenderer
				},
				lastJointType: {
					displayName: "Тип соединения последней точки",
					editor: jointTypeEditor,
					renderer: jointTypeRenderer
				}, 
				archHeight: {
					displayName: "Высота арки"
				}, 
				archRadius: {
					displayName: "Радиус арки"
				}
			}
		};
		
		return source;
		
	}
	
});