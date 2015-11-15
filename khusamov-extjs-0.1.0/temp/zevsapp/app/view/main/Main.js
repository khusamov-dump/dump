
Ext.define("Zevs.view.main.Main", {
	
	extend: "Ext.panel.Panel",
	
	requires: [
		"Zevs.view.main.MainModel", 
		"Zevs.view.main.MainController", 
		"Zevs.view.desktop.Desktop",
		"Zevs.view.propertygrid.Grid"
	],
	
	plugins: "viewport",
	
	controller: "main",
	
	viewModel: {
		type: "main"
	},
	
	tbar: [{
		xtype: "tbtext", 
		bind: {
			html: "{applicationTitle}"
		}
	}, {
		text: "Очистить",
		listeners: {
			click: "requestCommandHelper",
			args: ["project/clear"]
		}
	}, {
		reference: "commandToolbar",
		xtype: "segmentedbutton",
		items: [{
			text: "Изделие",
			listeners: {
				click: "requestCommandHelper",
				args: ["product/insert"]
			},
			/*menu: [{
				text: "Многоугольная рама",
				listeners: {
					click: "startDesktopPlugin",
					args: ["product/insert"]
				}
			}, {
				text: "Прямоугольная рама"
			}, {
				text: "Треугольная рама"
			}]*/
		}, {
			text: "Балка рамы",
			listeners: {
				click: "requestCommandHelper",
				args: ["frameBeam/insert"]
			}
		}, {
			text: "Соединитель",
			listeners: {
				click: "requestCommandHelper",
				args: ["productJoint/insert"]
			}
		}, {
			text: "Импост"
		}]
	}, {
		text: "Нептун",
		handler: "onSetNeptuneTheme"
	}],
	
	layout: "border",
	border: false,
	
	items: [{
		reference: "desktop",
		xtype: "zevs-view-desktop",
		region: "center",
		border: false,
		listeners: {
			select: "onChangeSelection",
			unselect: "onChangeSelection",
			pluginfinish: {
				element: "controller",
				fn: "onDesktopPluginFinish"
			},
			plugincancel: {
				element: "controller",
				fn: "onDesktopPluginCancel"
			}
		}
	}, {
		reference: "propertygrid",
		xtype: "zevs-view-propertygrid-grid",
		region: "east",
		split: true,
		width: 400,
		border: false
	}]
	
});


