



// TODO вроде это нужно переделать в помошника (не плагин это)


Ext.define("Zevs.view.desktop.plugin.product.Insert", {
	
	extend: "Zevs.lib.view.controller.plugin.Modal",
	
	requires: [
		"Khusamov.svg.geometry.Polygon",
		
		"Zevs.view.desktop.ghost.FrameGhost",
		"Zevs.view.desktop.handle.FrameGhostHandle"
		
		//"Zevs.view.desktop.item.frame.ghost.Ghost",
		//"Zevs.view.desktop.item.frame.ghost.handle.Handle"
	],
	
	frameGhost: null,
	
	frameGhostHandle: null,
	
	selectedProductJoint: null,
	
	onStart: function() {
		var me = this;
		me.selectedProductJoint = null;
		var construction = Zevs.Project.getConstruction();
		if (construction.hasProduct()) {
			if (Zevs.Project.hasItems("productjoint")) {
				var selection = me.getView().getSelection();
				if (selection.getCount() == 0) {
					me.cancel("Ничего не выбрано. Выберите один соединитель.");
				} else if (selection.getCount() == 1) {
					if (selection.first().getProjectItem().isProductJoint) {
						me.selectedProductJoint = selection.first().getProjectItem();
						me.startProductInsert();
					} else {
						me.cancel("Выбран не соединитель. Нужно выбрать соединитель.");
					}
				} else {
					me.cancel("Выбрано более одного элемента. Выберите один соединитель.");
				}
			} else {
				me.cancel("Создайте соединитель, а затем его выберите.");
			}
		} else {
			me.startProductInsert();
		}
	},
	
	startProductInsert: function() {
		var me = this;
		Ext.toast("Добавляйте точки кликая по рабочему столу.", "Подсказка");
		
		// Создаем эскиз рамы окна
		// Это пунктирная линия, которая появляется после кликов по рабочему столу
		// При клике по первой точке режим работы редактора переключается в update
		me.frameGhost = Ext.create("Zevs.view.desktop.ghost.FrameGhost");
		//me.frameGhost = Ext.create("Zevs.view.desktop.item.frame.Ghost");
		me.getView().addPiece(me.frameGhost);
		
		// Создаем управляющий объект - управление эскизом
		// Это кружки на вершинах многоугольника рамы
		me.frameGhostHandle = Ext.create("Zevs.view.desktop.handle.FrameGhostHandle", me.frameGhost);
		//me.frameGhostHandle = Ext.create("Zevs.view.desktop.item.frame.ghost.Handle", me.frameGhost);
		me.getView().addHandle(me.frameGhostHandle);
		
		me.getView().getDesktop().getEl().on("click", "onDesktopElementClick", me);
		
		// Создаем обработчик события "Клик по первому управляющему кружку"
		// При клике по первой точке в управляющем объекте мы завершаем команду
		me.frameGhostHandle.on("close", "onFrameGhostHandleClose", me, {
			single: true
		});
		
		// Если выбран соединитель, то сразу добавляем две точки
		if (me.selectedProductJoint) {
			var line = me.selectedProductJoint.getParallelBaseLine();
			me.frameGhost.getPolyline().addPoint(line.getLastPoint());
			me.frameGhost.getPolyline().addPoint(line.getFirstPoint());
		}
	},
	
	onDesktopElementClick: function(e) {
		if (e.button == 0) {
			var me = this;
			var desktop = me.getView().getDesktop();
			var surface = me.getView().getSurface();
			// Координаты мыши относительно рабочего стола
			var x = e.pageX - desktop.getX();
			var y = e.pageY - desktop.getY();
			
			// Переводим координаты из системы рабочего стола в систему холста
			var point = surface.getMatrix(true).inverse().transformPoint([x, y]);
			
			// Добавляем точку в эскиз рамы окна
			me.frameGhost.getPolyline().addPoint(point);
		}
	},
	
	onFrameGhostHandleClose: function() {
		var me = this;
		
		me.finish({
			polygon: me.frameGhost.getPolyline().getGeometry().toPolygon(),
			selectedProductJoint: me.selectedProductJoint
		});
	},
	
	onFinish: function() {
		var me = this;
		me.getView().getDesktop().getEl().un("click", "onDesktopElementClick", me);
		Ext.destroy(me.frameGhost, me.frameGhostHandle);
	},
	
	onCancel: function(message) {
		Ext.toast(message, "Ошибка");
	},
	
	onConflict: function(conflicted) {
		Ext.toast("Вы недостроили раму окна. Добавляйте точки кликая по рабочему столу.", "Предупреждение");
	},
	
	onRestart: function() {
		Ext.toast("Вы недостроили раму окна. Добавляйте точки кликая по рабочему столу.", "Предупреждение");
	}
	
});