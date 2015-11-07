
/**
 * Карусель материалов.
 * Данные берутся из хранилища.
 */
Ext.define("Khusamov.sandbox.carousel.Materials", {
	extend: "Ext.panel.Panel",
	alias: "widget.khusamov.sandbox.carousel.materials",
	
	width: 400,
	layout: "card",
	
	/**
	 * Опции панели.
	 */
	config: {
		flat: false, // Вариант дизайна - плоский
		label: null, // Если не указан, то берется из fieldLabel
		field: null,
		store: null,
		itemTitleHidden: false
	},
	
	constructor: function(config) {
		var me = this;
		
		if (config.flat) {
			config.border = false;
			config.bodyBorder = false;
		}
		
		me.callParent([config]);
	},
	
	/**
	 * Тулбар панели.
	 */
	tbar: {
		listeners: {
			afterrender: function() {
				var panel = this.up("panel");
				if (panel.getFlat()) {
					var tbar = panel.getDockedItems("toolbar[dock='top']")[0];
					tbar.getEl().setStyle({
						backgroundColor: "transparent",
						backgroundImage: "none"
					});
					tbar.down("#label").getEl().setStyle({
						marginLeft: 0
					});
				}
			}
		},
		items: [{
			xtype: "tbtext",
			itemId: "label",
			text: "Материал:"/*,
			listeners: {
				render: function() {
					var panel = this.up("panel");
					panel.applyLabel(panel.getLabel());
				}
			}*/
		}, "->", {
			itemId: "carouselSelector",
			xtype: "combobox",
			hideLabel: true,
			valueField: "value",
			editable: false,
			queryMode: "local",
			listeners: {
				change: function(combo, index) {
					this.up("panel").getLayout().setActiveItem(index);
				}
			}
		}, "-", {
			iconCls: "icon-arrow-left",
			tooltip: "Прокрутить материалы назад",
			handler: function() {
				this.up("panel").getLayout().getActiveItem().scrollToNextPage();
			}
		}, {
			iconCls: "icon-arrow-right",
			tooltip: "Прокрутить материалы вперед",
			handler: function() {
				this.up("panel").getLayout().getActiveItem().scrollToPrevPage();
			}
		}]
	},
	
	/**
	 * Конструктор панели.
	 */
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		
		if (me.getLabel()) {
			me.setLabel(me.getLabel());
		} else {
			me.setLabel(me.getField().getFieldLabel());
		}
		
		me.getField().on({
			change: me.onFieldChange,
			scope: me
		});
		
		me.getStore().on({
			load: me.onStoreLoad,
			scope: me
		});
		
		me.updateCarousels();
	},
	
	/**
	 * Изменение главной подписи на тулбаре.
	 */
	applyLabel: function(label) {
		var me = this;
		if (label) {
			var tbar = me.getDockedItems("toolbar[dock='top']")[0];
			var tbLabel = tbar.query("#label")[0];
			label = Ext.String.trim(label);
			tbLabel.setText(label + ":");
		}
		return label;
	},
	
	/**
	 * Действия после загрузки данных в хранилище.
	 * @param store
	 */
	onStoreLoad: function(store) {
		var me = this;
		me.updateCarousels();
	},
	
	/**
	 * Обновить все карусели данными из хранилища.
	 */
	updateCarousels: function() {
		var me = this;
		var store = me.getStore();
		
		if (store.count()) {
			// Получение списка категорий
			me.categories = me.getCategoriesFromStore(store);
			
			// Создание хранилища с категориями для комбобокса
			var categoriesStore = Ext.create("Ext.data.Store", {
				fields: ["text", "value"]
			});
			categoriesStore.add(me.categories);
			
			// Создание списка материалам по категориям
			me.materials = me.getMaterialsFromStore(categoriesStore, store);
			
			// Создаем карусели
			me.carousels = me.getCarousels(me.materials);
			me.removeAll();
			me.add(me.carousels);
			
			// Подключаем комбобокс
			me.down("#carouselSelector")
				.bindStore(categoriesStore)
				.setValue(0);
		}
	},
	
	/**
	 * Действия при изменении значения внешнего поля формы.
	 * @param field
	 * @param newValue
	 */
	onFieldChange: function(field, newValue) {
		var me = this;
		var newCarousel = null;
		var newCarouselIndex = null;
		var newItem = null;
		var newItemIndex = null;
		Ext.Array.each(me.carousels, function(carousel, carouselIndex) {
			carousel.items.each(function(item, itemIndex) {
				if (newValue == item.getMaterialId()) {
					newCarousel = carousel;
					newCarouselIndex = carouselIndex;
					newItem = item;
					newItemIndex = itemIndex;
				}
			});
		});
		if (newCarouselIndex !== null) {
			me.down("#carouselSelector").setValue(newCarouselIndex);
			me.onItemClick(newItem);
			newCarousel.scrollToItem(newItemIndex);
		}
	},
	
	getCarousels: function(materials) {
		var me = this;
		var carousels = [];
		Ext.Array.each(materials, function(mats) {
			var carousel = Ext.create("Khusamov.sandbox.carousel.Carousel", {
				border: false
			});
			mats.each(function(mat, index) {
				carousel.add({
					materialId: mat.get("Material_id"),
					materialMarking: mat.get("Material_Marking"),
					titleHidden: me.getItemTitleHidden(),
					title: (index + 1) + ". " + mat.get("Material_Title"),
					titleColor: mat.get("Material_Title_Color"),
					textureUrl: mat.get("Material_Texture_Url"),
					textureColor: mat.get("Material_Color"),
					listeners: { click: me.onItemClick, scope: me }
				});
			});
			carousels.push(carousel);
		});
		return carousels;
	},
	
	/**
	 * Действия при клике по пункту активной карусели.
	 * @param item
	 */
	onItemClick: function(item) {
		var me = this;
		me.getField().setValue(item.getMaterialId());
		Ext.Array.each(me.carousels, function(carousel) {
			carousel.items.each(function(item) {
				item.uncheck();
			});
		});
		item.check();
	},
	
	getMaterialsFromStore: function(categoriesStore, store) {
		var materials = [];
		categoriesStore.each(function(item) {
			var category = item.get("text");
			var mats = store.queryBy(function(record) {
				return record.get("Material_Category_Title") == category;
			});
			// Количество материала в категории
			var count = mats.indexOf(mats.last()) + 1;
			item.set("text", category + " (" + count + ")");
			materials.push(mats);
		});
		return materials;
	},
	
	getCategoriesFromStore: function(store) {
		var _categories = {};
		store.each(function(item) {
			var category = item.data["Material_Category_Title"];
			_categories[category] = true;
		});
		
		var categories = [];
		var index = 0;
		Ext.Object.each(_categories, function(category) {
			categories.push({
				text: category,
				value: index
			});
			index++;
		});
		
		return categories;
	}
	
});

