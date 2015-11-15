
Ext.define("Zevs.view.propertygrid.helper.ProductJointHelper", {
	
	extend: "Zevs.view.propertygrid.helper.ProjectItemHelper",
	
	alias: "helper.productpoint",
	
	getPropertySource: function(projectItem) {
		var me = this;
		return Ext.Object.merge(me.callParent(arguments), {
			title: "Соединитель",
			data: {
				width: projectItem.getWidth(),
				offset: projectItem.getOffset(),
				length: projectItem.getLength()
			},
			config: {
				width: {
					displayName: "Ширина"
				},
				offset: {
					displayName: "Смещение"
				},
				length: {
					displayName: "Длина"
				}
			}
		});
	}
	
});