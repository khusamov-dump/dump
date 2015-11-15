



// TODO вроде это нужно переделать в помошника (не плагин это)


Ext.define("Zevs.view.desktop.plugin.frameBeam.Insert", {
	
	extend: "Zevs.lib.view.controller.plugin.Modal",
	
	onCancel: function(message) {
		Ext.toast(message, "Ошибка");
	},
	
	onConflict: function(conflicted) {
		Ext.toast("Вы не закончили установку балки рамы. Выберите сторону рамы.", "Предупреждение");
	},
	
	onRestart: function() {
		Ext.toast("Вы не закончили установку балки рамы. Выберите сторону рамы.", "Предупреждение");
	},
	
	onStart: function() {
		var me = this;
		var selection = me.getView().getSelection();
		if (selection.getCount() == 0) {
			Ext.toast("Выберите сторону рамы, на которую вы хотите поставить балку.", "Подсказка");
			me.startFrameBeamInsert();
		} else if (selection.getCount() == 1) {
			if (selection.first().getProjectItem().isFrameSide) {
				if (selection.first().getProjectItem().hasFrameBeam()) {
					Ext.toast("Здесь уже имеется балка рамы. Нужно выбрать сторону рамы без балки.", "Предупреждение");
					me.startFrameBeamInsert();
				} else {
					me.finish(selection.first().getProjectItem());
				}
			} else {
				Ext.toast("Выбрана не сторона рамы. Нужно выбрать сторону рамы.", "Предупреждение");
				me.startFrameBeamInsert();
			}
		} else {
			
			
			var wronged = 0;
			var selected = [];
			selection.each(function(item) {
				if (!item.getProjectItem().isFrameSide) wronged++;
				selected.push(item.getProjectItem());
			});
			
			if (wronged) {
				Ext.toast("Среди выбранных элементов есть не сторона рамы. Выберите только стороны рамы.", "Предупреждение");
				me.startFrameBeamInsert();
			} else {
				me.finish(selected);
			}
			
		}
	},
	
	startFrameBeamInsert: function() {
		var me = this;
		me.getView().on("select", "onDesktopSelect", me);
	},
	
	onDesktopSelect: function(selection, selected) {
		var me = this;
		if (selection.getCount() == 1) {
			if (selected.getProjectItem().isFrameSide) {
				if (selected.getProjectItem().hasFrameBeam()) {
					Ext.toast("Здесь уже имеется балка рамы. Нужно выбрать сторону рамы без балки.", "Предупреждение");
					
				} else {
					me.getView().un("select", "onDesktopSelect", me);
					me.finish(selected.getProjectItem());
				}
			} else {
				Ext.toast("Выбрана не сторона рамы. Нужно выбрать сторону рамы.", "Предупреждение");
			}
		} else {
			Ext.toast("Выбрано более одного элемента. Выберите одну сторону рамы.", "Предупреждение");
		}
	}
	
});