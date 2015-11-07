
/**
 * Классическая карусель.
 */
Ext.define("Khusamov.sandbox.carousel.Carousel", {
	extend: "Ext.panel.Panel",
	alias: "widget.khusamov.sandbox.carousel",
	
	requires: ["Khusamov.sandbox.carousel.Item"],
	
	layout: {
		type: "hbox",
		align: "stretch"
	},
	
	defaults: {
		xtype: "khusamov.sandbox.carousel.item"
	},
	
	config: {
		index: null
	},
	
	/**
	 * Конструктор.
	 */
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		me.addEvents("mousewheel", "mousewheelup", "mousewheeldown");
		
		me.on("mousewheeldown", function() {
			me.stepTo(-110);
		});
		
		me.on("mousewheelup", function() {
			me.stepTo(110);
		});
	},
	
	/**
	 * Пролистнуть на одну страницу вперед.
	 */
	scrollToNextPage: function() {
		var me = this;
		me.stepTo(me.getWidth());
	},

	/**
	 * Пролистнуть на одну страницу назад.
	 */
	scrollToPrevPage: function() {
		var me = this;
		me.stepTo(-me.getWidth());
	},
	
	/**
	 * Пролистнуть до элемента.
	 * @param index
	 */
	scrollToItem: function(index) {
		var me = this;
		me.setIndex(index);
		if (me.rendered && index !== null && index != undefined) {
			var item = me.items.get(index);
			if (item.rendered) {
				var offset = item.getEl().getLeft(true) + me._target.getLeft(true);
				if (offset < 0) {
					me.stepTo(-offset);
				}
				if (me.getWidth() - offset - item.getEl().getWidth() < 0) {
					offset -= me.getWidth() - item.getEl().getWidth();
					me.stepTo(-offset);
				}
			} else {
				// TODO Этот способ не хороший какой-то, с непонятными последствиями.
				// Лучше будет потом его заменить на честный способ.
				Ext.defer(me.scrollToItem, 2000, me, [index]);
				/*
				Этот честный способ не сработал. Потом разобраться почему не сработал.
				item.on("render", function() {
					me.scrollToItem(index);
				});
				*/
			}
		}
	},
	
	/**
	 * Отрисовка.
	 */
	onRender: function() {
		var me = this;
		this.callParent(arguments);

		me._target = Ext.get(this.getTargetEl().query(">.x-box-inner>*")[0]);
		me._targetLeft = me._target.getLeft(true);
		
		me.mon(me.getEl(), "mousewheel", me.onMouseWheel, me);
		
		me.scrollToItem(me.getIndex());
	},
	
	stepTo: function(set) {
		var me = this;
		me.offsetTargetLeft(set);
		
		var anim = me._target.getActiveAnimation();
		if (anim) anim.end();
		
		me._target.animate({
			duration: 500,
			to: {
				left: me._targetLeft
			}
		});
	},
	
	offsetTargetLeft: function(offset) {
		var me = this;
		
		var targetWidth = 0;
		me.items.each(function(item) {
			// Здесь 0 это паддинг item-а
			targetWidth += item.width + 0;
		});
		
		// TODO сделать автоопределение бордера и паддинга
		var border = (me.border) ? 1 : 0;
		border *= 2;
		
		var min = me.getWidth() - border - targetWidth;
		var max = 0;
		
		me._targetLeft += offset;
		if (me._targetLeft > max) me._targetLeft = max;
		if (me._targetLeft < min) me._targetLeft = min; 
	},
	
	/**
	 * Когда крутим колесо мыши.
	 * @param event
	 */
	onMouseWheel: function(event) {
		var me = this;
		var delta = event.getWheelDelta();
		if (delta > 0) {
			me.onMouseWheelUp();
		} else if (delta < 0) {
			me.onMouseWheelDown();
		}
	},
	
	/**
	 * Когда крутим колесо мыши наверх.
	 */
	onMouseWheelUp: function() {
		var me = this;
		me.fireEvent("mousewheel", me, "up");
		me.fireEvent("mousewheelup", me);
	},

	/**
	 * Когда крутим колесо мыши вниз.
	 */
	onMouseWheelDown: function() {
		var me = this;
		me.fireEvent("mousewheel", me, "down");
		me.fireEvent("mousewheeldown", me);
	}
	
});

