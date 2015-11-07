
Ext.define("Khusamov.sandbox.carousel.Item", {
	extend: "Ext.Component",
	alias: "widget.khusamov.sandbox.carousel.item",
	
	width: 110, 
	//height: 50,
	
	padding: 2, // Только числа, строки нельзя!
	style: {
		fontSize: "80%",
		cursor: "pointer"
	},
	
	config: {
		materialId: null,
		materialMarking: null,
		titleHidden: false,
		selected: false
	},
	
	/**
	 * Конструктор пункта карусели для текстур и цветов.
	 * @param config.materialId
	 * @param config.materialMarking
	 * @param config.title
	 * @param config.titleColor
	 * @param config.textureUrl
	 * @param config.textureColor
	 */
	constructor: function(config) {
		var me = this;
		
		if (config.titleHidden) config.title = "&nbsp;";
		config.html = "<div class='caritemtitle'>" + config.title + "</div>";
		
		if (!config.style) config.style = {};
		
		config.style.fontSize = "80%";
		config.style.cursor = "pointer";
		config.style.color = Ext.String.trim(config.titleColor) ? config.titleColor : "white";
		
		if (Ext.String.trim(config.textureUrl)) {
			config.style.backgroundImage = "url(" + config.textureUrl + ")";
		} else {
			config.style.backgroundColor = config.textureColor;
		}
		
		me.callParent([config]);

		me.on({
			render: function() {
				//var height = me.getHeight() - me.padding * 2;
				var borderColor = config.titleColor;
				
				me.caritemtitle = me.getEl().select(".caritemtitle");
				
				me.caritemtitle.each(function(el) {
					//el.setStyle("height", height + "px");
					el.setStyle("height", "100%");
					el.addCls("khusamov-sandbox-carousel-item");
					if (!config.titleHidden) me.getEl().set({title: config.materialMarking});
					me.getEl().on({
						mouseover: function() {
							el.setStyle("borderColor", borderColor);
							el.addCls("khusamov-sandbox-carousel-item-hover");
						},
						mouseout: function() {
							el.setStyle("borderColor", null);
							el.removeCls("khusamov-sandbox-carousel-item-hover");
						},
						click: function() {
							me.fireEvent("click", me);
						}
					});
				});
				
				if (me.getSelected()) {
					me.check();
				}
			}
		});
	},
	
	/**
	 * Инициализация.
	 */
	initComponent: function() {
		var me = this;
		me.addEvents("click");
		me.callParent();
	},
	
	check: function() {
		var me = this;
		me.setSelected(true);
		if (me.rendered) me.caritemtitle.each(function(el) {
			el.addCls("khusamov-sandbox-carousel-item-selected");
		});
	},
	
	uncheck: function() {
		var me = this;
		me.setSelected(false);
		if (me.rendered) me.caritemtitle.each(function(el) {
			el.removeCls("khusamov-sandbox-carousel-item-selected");
		});
	}
	
});

