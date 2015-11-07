
Ext.define("MyRibbon", {
	extend: "Khusamov.sandbox.ribbon.Panel",
	
	requires: ["Khusamov.sandbox.form.field.NumberUnit"],
	
	items: [{
		title: "Проект",
		items: [{
			title: "Новый проект",
			columns: 1,
			items: [{
				text: "Мастер создания шкафа"
			}, {
				text: "Новый шкаф с нуля"
			}]
		}, {
			title: "Сохранить проект",
			columns: 1,
			items: [{
				text: "Сохранить на сервере"
			}, {
				text: "Сохранить проект на диске"
			}]
		}, {
			title: "Открыть проект",
			columns: 1,
			items: [{
				text: "Открыть с сервера"
			}, {
				text: "Загрузить с диска"
			}]
		}]
	}, {
		title: "Комната",
		items: [{
			title: "Размеры комнаты",
			defaults: {
				xtype: "khusamov.sandbox.numberunitfield",
				labelWidth: 100,
				width: 185,
				step: 100,
				unit: "мм"
			},
			layout: "auto",
			items: [{
				fieldLabel: "Ширина комнаты"
			}, {
				fieldLabel: "Высота комнаты"
			}, {
				fieldLabel: "Глубина комнаты"
			}]
		}]
	}, {
		title: "Корпус шкафа", 
		items: [{
			title: "Двери",
			items: [{
				text: "Показать<br/>двери",
				iconCls: "icon-doors-32",
				scale: "large",
				iconAlign: "top",
				enableToggle: true
			}]
		}, {
			title: "Размеры шкафа",
			defaults: {
				xtype: "khusamov.sandbox.numberunitfield",
				labelWidth: 100,
				width: 185,
				step: 100,
				unit: "мм"
			},
			layout: "auto",
			items: [{
				fieldLabel: "Ширина шкафа"
			}, {
				fieldLabel: "Высота шкафа"
			}, {
				fieldLabel: "Глубина шкафа"
			}]
		}, {
			title: "Параметры шкафа",
			defaults: {
				xtype: "combobox",
				editable: false,
				queryMode: "local",
				//displayField: "name",
			    //valueField: "value",
				labelWidth: 90,
				width: 260
			},
			layout: "auto",
			items: [{
				fieldLabel: "Расположение",
				store: ["Угол слева", "Угол справа", "Шкаф в нише", "Свободностоящий шкаф"]
			}, {
				fieldLabel: "Тип шкафа",
				store: ["Стандартный", "До потолка", "Невысокий", "Навесной"]
			}, {
				fieldLabel: "Толщина ЛДСП",
				store: ["16 мм", "18 мм", "25 мм"]
			}]
		}, {
			itemId: "groupWardrobeBodyMaterial",
			title: "Материал корпуса шкафа"
		}]
	}, {
		title: "Двери",
		items: [{
			title: "Двери",
			items: [{
				text: "Показать<br/>двери",
				iconCls: "icon-doors-32",
				scale: "large",
				iconAlign: "top",
				enableToggle: true
			}]
		}, {
			title: "Параметры дверей",
			defaults: {
				xtype: "combobox",
				editable: false,
				queryMode: "local",
				//displayField: "name",
			    //valueField: "value",
				labelWidth: 120,
				width: 200
			},
			layout: "auto",
			items: [{
				fieldLabel: "Количество дверей",
				//store: ["2 двери", "3 двери"]
				xtype: "spinnerfield",
				editable: false,
				listeners: {
					spinup: function() {
						var me = this;
						var value = parseInt(me.getValue().split(" "), 10) || 0;
						if (value < 7) me.setValue((value + 1) + " дв.");
					},
					spindown: function() {
						var me = this;
						var value = parseInt(me.getValue().split(" "), 10) || 0;
						if (value > 1) me.setValue((value - 1) + " дв.");
					}
				}
			}, {
				fieldLabel: "Система раздвижения",
				store: ["Glow", "Slider"]
			}, {
				fieldLabel: "Тип профиля",
				store: ["Clipper", "Setting", "Без рамки"]
			}, {
				xtype: "checkboxfield",
				fieldLabel: "Показать двери"
			}]
		}]
	}, {
		title: "Ручки дверей"
	}]
	
});


Ext.onReady(function () {
	
	var gridMaterials = Ext.create("Carousel.MaterialGrid", {
		margin: "0px 0px 30px 0px"
	});
	
	var store = gridMaterials.getStore();

	var field = Ext.create("Ext.form.TextField", {
		fieldLabel: "Номер выбранного материала",
		labelWidth: 200,
		width: 270,
		margin: "0px 0px 30px 0px",
		renderTo: Ext.getBody()
	});
	
	/*Ext.create("Khusamov.sandbox.carousel.Materials", {
		store: store,
		field: field,
		renderTo: Ext.getBody()
	});*/

	
	var myRibbon = Ext.create("MyRibbon", {
		renderTo: Ext.getBody()
	});
	
	myRibbon.query("#groupWardrobeBodyMaterial")[0]
		.add(Ext.create("Khusamov.sandbox.carousel.Materials", {
			store: store,
			field: field
		}));

	store.load();
	
});

