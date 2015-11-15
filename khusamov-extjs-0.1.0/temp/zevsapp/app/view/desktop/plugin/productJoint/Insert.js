
Ext.define("Zevs.view.desktop.plugin.productJoint.Insert", {
	
	extend: "Zevs.lib.view.controller.plugin.Modal",
	
	onCancel: function(message) {
		Ext.toast(message, "Ошибка");
	},
	
	onConflict: function(conflicted) {
		Ext.toast("Вы не закончили установку соединителя. Выберите балку рамы или другой соединитель.", "Предупреждение");
	},
	
	onRestart: function() {
		Ext.toast("Вы не закончили установку соединителя. Выберите балку рамы или другой соединитель.", "Предупреждение");
	},
	
	// Вспомогательная функция
	hasJointed: function(projectItem) {
		return projectItem.isFrameBeam && projectItem.hasProductJoint() || projectItem.isProductJoint && projectItem.hasJointed();
	},
	
	onStart: function() {
		var me = this;
		var selection = me.getView().getSelection();
		
		if (selection.getCount() == 0) {
			Ext.toast("Выберите балку рамы или другой соединитель, к которой хотите присоединить соединитель.", "Подсказка");
			me.startProductJointInsert();
			
		} else if (selection.getCount() == 1) {
			if (selection.first().getProjectItem().isFrameBeam || selection.first().getProjectItem().isProductJoint) {
				if (me.hasJointed(selection.first().getProjectItem())) {
					Ext.toast("Здесь уже имеется соединитель. Нужно выбрать балку рамы или соединитель без соединителя.", "Предупреждение");
					me.startProductJointInsert();
				} else {
					me.finish(selection.first().getProjectItem());
				}
			} else {
				Ext.toast("Неправильно выбран элемент. Нужно выбрать балку рамы или другой соединитель.", "Предупреждение");
				me.startProductJointInsert();
			}
			
		} else {
			Ext.toast("Выбрано более одного элемента. Выберите одну балку рамы или один соединитель.", "Предупреждение");
			me.startProductJointInsert();
		}
	},
	
	startProductJointInsert: function() {
		var me = this;
		me.getView().on("select", "onDesktopSelect", me);
	},
	
	onDesktopSelect: function(selection, selected) {
		var me = this;
		if (selection.getCount() == 1) {
			if (selected.getProjectItem().isFrameBeam || selected.getProjectItem().isProductJoint) {
				if (me.hasJointed(selected.getProjectItem())) {
					Ext.toast("Здесь уже имеется соединитель. Нужно выбрать балку рамы или соединитель без соединителя.", "Предупреждение");
					
				} else {
					me.getView().un("select", "onDesktopSelect", me);
					me.finish(selected.getProjectItem());
				}
			} else {
				Ext.toast("Неправильно выбран элемент. Нужно выбрать балку рамы или другой соединитель.", "Предупреждение");
			}
		} else {
			Ext.toast("Выбрано более одного элемента. Выберите одну балку рамы или один соединитель.", "Предупреждение");
		}
	}
	
	
	
});