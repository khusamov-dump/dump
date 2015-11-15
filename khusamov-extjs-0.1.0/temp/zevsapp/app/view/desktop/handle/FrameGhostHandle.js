
Ext.define("Zevs.view.desktop.handle.FrameGhostHandle", {
	
	//alternateClassName: "Zevs.view.desktop.item.frame.ghost.Handle",
	
	extend: "Khusamov.svg.desktop.Handle",
	
	requires: ["Khusamov.svg.element.Circle"],
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		// Задаем обработчик события "Добавление точки в эскиз рамы".
		// При добавлении вершины рамы добавляется управляющий кружок.
		me.getControlled().getPolyline().on("update", "onUpdatePolylineControlled", me);
	},
	
	/**
	 * Обработчик события "Добавление точки в эскиз рамы".
	 * На входе порядковый номер точки и координаты в системе холста.
	 */
	onUpdatePolylineControlled: function(type, points) {
		if (type == "add") {
			var me = this;
			points.forEach(function(point) {
				// Переводим координаты из системы холста в систему панели управления холстом.
				point = me.getSurface().getMatrix().transformPoint(point.toArray());
				// Добавляем управляющий кружок для данной точки.
				var circle = me.add(me.getConfigCircle(point));
				// Запретить передачу события клика по кружку, 
				// чтобы в данном месте не появилась новая вершина эскиза рамы.
				circle.getEl().dom._circle = circle;
				circle.getEl().on("click", "onCircleClick", me, {
					args: [circle]
				});
			});
		}
	},
	
	onCircleClick: function(circle, e, t, eOpts) {
		var me = this;
		e.stopEvent();
		// Если кликнули по первой точке, то генерируем событие
		var index = me.items.indexOf(circle);
		if (index == 0) me.fireEvent("close");
	},
    
    destroy: function() {
		var me = this;
		me.getControlled().getPolyline().un("update", "onUpdatePolylineControlled", me);
		me.items.each(function(circle) {
			circle.getEl().un("click", "onCircleClick", me);
		});
		me.callParent(arguments);
    },
	
	/**
	 * Формирование конфига управляющего кружка.
	 * На входе координаты в системе рабочего стола.
	 */
	getConfigCircle: function(center) {
		return {
			type: "circle",
			center: center,
			radius: 10,
			style: {
				stroke: "white",
				strokeWidth: 1.5,
				fill: "#157fcc",
				cursor: "pointer"
			},
			draggable: {
				listeners: {
					/**
					 * Обработчик события "Перемещение управляющего кружка".
					 * При перемещении управляющего кружка меняем координату вершины рамы.
					 * Контекстом (this) является Ext.util.ComponentDragger.
					 */
					drag: function() {
						var dragger = this;
						var circle = dragger.comp;
						var handle = circle.up();
						var matrix = handle.getSurface().getMatrix();
						// При перемещении управляющего кружка меняем координату вершины рамы.
						// Переводим координаты из системы рабочего стола в систему холста.
						var point = matrix.inverse().transformPoint(circle.getCenter().toArray());
						// Изменяем координаты точки эскиза рамы
						var index = handle.items.indexOf(circle);
						handle.getControlled().getPolyline().movePoint(index, point);
					}
				}
			}
		};
	},
	
	/**
	 * Обработчик события "Холст изменил свой масштаб".
	 */
	onSurfaceTransform: function() {
		var me = this;
		// При масштабировании холста в цикле меняем координаты всех управляющих кружков.
		me.items.each(function(circle) {
			// Получаем точку эскиза рамы по номеру.
			var index = me.items.indexOf(circle);
			var point = me.getControlled().getPolyline().getPoint(index);
			// Переводим координаты из системы холста в систему рабочего стола.
			point = me.getSurface().getMatrix().transformPoint(point.toArray());
			// Устанавливаем новые координаты кружка.
			circle.setCenter(point);
		});
	}
	
});