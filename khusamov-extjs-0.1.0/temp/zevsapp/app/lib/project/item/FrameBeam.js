
Ext.define("Zevs.lib.project.item.FrameBeam", {
	
	extend: "Zevs.lib.project.item.Item",
	
	statics: {
		
		JOINTTYPE_AUTO: "auto", // Тип соединения Автоматически
		
		JOINTTYPE_EQUAL: "equal", // Тип соединения Равное
		
		JOINTTYPE_SHORT: "short", // Тип соединения Короткое
		
		JOINTTYPE_LONG: "long", // Тип соединения Длинное
		
		JOINTTYPE_FINGER: "finger" // Тип соединения Шип
		
	},
	
	isFrameBeam: true,
	
	itemConfig: {
		type: "framebeam",
		name: "Балка рамы окна"
	},
	
	config: {
		
		
		
		// TODO ширина берется из профиля!!!
		
		/**
		 * Ширина балки.
		 * @property {Number}
		 */
		width: 40,
		
		
		
		/**
		 * Тип соединения на первой точке балки.
		 * @property {String}
		 */
		firstJointType: "auto", // JOINTTYPE_AUTO
		
		/**
		 * Тип соединения на второй точке балки.
		 * @property {String}
		 */
		lastJointType: "auto",
		
		/**
		 * Высота арки.
		 * @property {Number}
		 */
		archHeight: 0,
		
		/**
		 * Радиус арки.
		 * @property {Number}
		 */
		archRadius: 0
		
	},
	
	/**
	 * Получить сторону раму окна, к которой крепится данная балка рамы.
	 * @return {Zevs.lib.project.item.FrameSide}
	 */
	getFrameSide: function() {
		return this.getParent();
	},
	
	/**
	 * Получить соединитель изделий, который закреплен за данной балкой.
	 * Это единственный дочерний элемент балки.
	 * @return {Zevs.lib.project.item.ProductJoint}
	 */
	getProductJoint: function() {
		return this.items.first();
	},
	
	hasProductJoint: function() {
		return !!this.getProductJoint();
	},
	
	getBaseLine: function() {
		return this.getFrameSide().getBaseLine();
	},
	
	getLength: function() {
		return this.getFrameSide().getLength();
	},
	
	getNextFrameBeam: function() {
		return this.getFrameSide().getNextFrameSide().getFrameBeam();
	},
	
	getPrevFrameBeam: function() {
		return this.getFrameSide().getPrevFrameSide().getFrameBeam();
	},
	
	getNextFrameSide: function() {
		return this.getFrameSide().getNextFrameSide();
	},
	
	getPrevFrameSide: function() {
		return this.getFrameSide().getPrevFrameSide();
	},
	
}, function() {
	
	Zevs.lib.project.item.Item.createFrameBeam = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.FrameBeam"].concat(Ext.Array.slice(arguments)));
	};
	
});