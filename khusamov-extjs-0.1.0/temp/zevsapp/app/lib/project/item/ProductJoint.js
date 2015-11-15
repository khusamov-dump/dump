
/**
 * Соединитель изделий.
 */

Ext.define("Zevs.lib.project.item.ProductJoint", {
	
	extend: "Zevs.lib.project.item.Item",
	
	isProductJoint: true,
	
	itemConfig: {
		type: "productjoint",
		name: "Соединитель изделий"
	},
	
	config: {
		
		/**
		 * Смещение от первой точки стороны рамы.
		 * @property {Number}
		 */
		offset: 0,
		
		
		// TODO ширина берется из профиля!!!
		
		
		/**
		 * Ширина соединителя.
		 * @property {Number}
		 */
		width: 25,
		
		/**
		 * Длина соединителя.
		 * @property {Number}
		 */
		length: null
		
	},
	
	/**
	 * Получить родительский элемент.
	 * Родительским элементом могут быть: Балка рамы или Соединитель.
	 * @method getParent
	 * @return {Zevs.lib.project.item.ProductJoint | Zevs.lib.project.item.FrameBeam}
	 */
	
	/**
	 * В качестве дочернего элемента у соединителя могут быть: Изделие или Соединитель.
	 * Поэтому есть метод, получить соединенный с данным соединителем элемент.
	 * @return {Zevs.lib.project.item.ProductJoint | Zevs.lib.project.item.Product}
	 */
	getJointed: function() {
		return this.items.first();
	},
	
	hasJointed: function() {
		return !!this.getJointed();
	},
	
	getParallelBaseLine: function() {
		return this.getBaseLine().getParallelByDestination(this.getWidth());
	},
	
	getBaseLine: function() {
		var me = this;
		var result = null;
		
		if (me.getParent().isProductJoint) {
			result = me.getParent().getParallelBaseLine();
		} else if (me.getParent().isFrameBeam) {
			result = me.getParent().getBaseLine();
		} else {
			throw new Error("Неправильный родитель у Соединителя: " + me.getParent().self.getName());
		}
			
		// TODO добавить смещение и длину базовой линии:
		/*var side = this.getFrameBeam().getFrameSide();
		var sideFirst = side.getFirstPoint();
		var sideLast = side.getLastPoint();
		var offset = this.getOffset();
		var length = this.getLength();
		var sideLength = sideFirst.sub(sideLast).getIdentity();
		var first = sideLength.scale(offset).add(sideFirst);
		var last = sideLength.scale(-length).add(first);
		return Ext.create("Khusamov.svg.geometry.Line", first.toPoint(), last.toPoint());*/
		
		return result;
		
	},
	
	/*onAdd: function() {
		var me = this;
		if (me.getLength() === null) me.setLength(me.getFrameBeam().getLength());
	},*/
	
	/**
	 * Получить длину соединителя.
	 * Если длина установлена как null, то берется длина родительского элемента.
	 * @return {Number}
	 */
	getLength: function() {
		var me = this;
		var length = me.callParent();
		return length === null ? me.getParent().getLength() : length;
	}
	
}, function() {
	
	Zevs.lib.project.item.Item.createProductJoint = function() {
		return Ext.create.apply(Ext, ["Zevs.lib.project.item.ProductJoint"].concat(Ext.Array.slice(arguments)));
	};
	
});