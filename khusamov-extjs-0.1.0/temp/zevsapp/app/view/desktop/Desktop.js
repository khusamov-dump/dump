
Ext.define("Zevs.view.desktop.Desktop", {
	
	extend: "Khusamov.svg.desktop.Panel",
	
	xtype: "zevs-view-desktop",
	
	mixins: ["Zevs.lib.container.mixin.SelectManager"],
	
	requires: [
		"Zevs.view.desktop.DesktopController", 
		"Zevs.view.desktop.DesktopModel"
	],
	
	controller: "desktop",
	
	viewModel: {
		type: "desktop"
	},
	
	listeners: {
		
		// Цвет рабочего стола
		// TODO перенести в CSS-стиль
		render: function() { 
			this.down("khusamov-svg").setStyle({
				//http://365psd.ru/board
				//backgroundColor: "rgb(250, 250, 250)",
				//backgroundImage: "url(http://fonerus.ru/_ph/62/2/655577633.png?1432289976)",
				//backgroundImage: "url(http://365psd.ru/images/backgrounds/bg-lightl-904.jpg)",
				//backgroundImage: "url(http://365psd.ru/images/backgrounds/bg-lightl-903.jpg)",
				//backgroundImage: "url(http://365psd.ru/images/backgrounds/bg-lightl-898.jpg)",
				backgroundImage: "url(http://365psd.ru/images/backgrounds/bg-lightl-893.jpg)",
				backgroundRepeat: "repeat"
			}); 
		}
	},
	
	/*style: {
		backgroundColor: "gray"
	},*/
	
	initComponent: function() {
		var me = this;
		me.callParent();
		me.mixins.selectManager.constructor.call(me);
	},
	
	getSurface: function() {
		return this.getDesktop().getBoard().getSurface();
	},
	
	getBoard: function() {
		return this.getDesktop().getBoard();
	},
	
	/**
	 * Добавить объект на холст.
	 * По умолчанию добавляется на главный слой mainLayer.
	 */
	addPiece: function(items, layer) {
		return this.getSurface().getLayer(layer ? layer : "main").add(items);
	},
	
	/**
	 * Добавить управляющий объект на кульман.
	 */
	addHandle: function(items) {
		return this.getBoard().add(items);
	},
	
	
	
	
	/*config: {
		
		project: null,
		
	},
	
	bind: {
		project: "{project}"
	},
	
	updateProject: function(project) {
		this.fireEvent("projectupdate", project);
	},
	
	listeners: {
		projectupdate: "onProjectUpdate"
	}*/
	
});