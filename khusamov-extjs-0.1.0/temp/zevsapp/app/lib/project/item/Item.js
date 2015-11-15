
Ext.define("Zevs.lib.project.item.Item", {
	
	alternateClassName: ["Zevs.lib.project.Item", "Zevs.project.Item"],
	
	requires: ["Ext.data.identifier.Sequential"],
	
	mixins: ["Ext.mixin.Observable"],
	
	statics: {
		
		/**
		 * @property {Ext.util.Collection}
		 */
		items: null,
		
		/**
		 * @property {Ext.data.identifier.Sequential}
		 */
		identifier: null,
		
		/**
		 * Регистрация элемента проекта.
		 * Все элементы проекта доступны тут и имеют сквозную нумерацию по id.
		 */
		register: function(item) {
			var me = this;
			if (!me.items) me.init();
			me.generateId(item);
			return me.items.add(item);
		},
		
		unregister: function(item) {
			this.items.remove(item);
		},
		
		get: function(id) {
			return this.items.get(id);
		},
		
		getItems: function(type) {
			return type ? this.items.createFiltered(function(item) {
				return item.hasParent() && item.getItemType() == type;
			}) : this.items;
		},
		
		hasItems: function(type) {
			return !!(type ? this.items.findBy(function(item) {
				return item.hasParent() && item.getItemType() == type;
			}) : this.items.getCount());
		},
		
		init: function() {
			var me = this;
			me.items = Ext.create("Ext.util.Collection");
			me.identifier = Ext.create("Ext.data.identifier.Sequential", {
				seed: 1000
			});
		},
		
		generateId: function(item) {
			if (!this.isDefineId(item)) item.setId(this.identifier.generate());
		},
		
		isDefineId: function(item) {
			return item.getId() !== undefined && item.getId() !== null;
		},
		
	},
	
	itemConfig: {
		type: null,
		name: null
	},
		
	/**
	 * @property {Ext.util.Collection}
	 */
	items: null,
	
	/**
	 * Событие "Изменились параметры элемента".
	 * @event update
	 */
	
	/**
	 * Событие "Изменились параметры элемента, не относящиеся к геометрии".
	 * @event updatenotgeometry
	 */
	
	/**
	 * Событие "Изменились параметры элемента, относящиеся к геометрии".
	 * @event updategeometry
	 */
	
	/**
	 * Событие "Добавился дочерний(е) элемент(ы)".
	 * @event add
	 */
	
	/**
	 * Событие "Элемент был уничтожен".
	 * @event destroy
	 */
	
	config: {
		
		id: null,
		
		/**
		 * @property {Zevs.lib.project.item.Item}
		 */
		parent: null
		
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
		me.mixins.observable.constructor.call(me, config);
		me.items = Ext.create("Ext.util.Collection");
		Zevs.lib.project.item.Item.register(me);
		me.initItem();
	},
	
	initItem: Ext.emptyFn,
	
	getItemType: function() {
		return this.itemConfig.type;
	},
	
	getItemName: function() {
		return this.itemConfig.name;
	},
	
	hasParent: function() {
		return !!this.getParent();
	},
	
	getProject: function() {
		var parent = this.getParent();
		var project = parent ? parent.getProject() : null;
		return project ? project : parent;
	},
	
	add: function(item) {
		var me = this;
		item.setParent(me);
		var added = me.items.add(item);
		item.onAdd();
		me.fireEvent("add", added);
		return added;
	},
	
	onAdd: Ext.emptyFn,
	
	destroy: function() {
		var me = this;
		me.items.each(function(item) {
			item.destroy();
		});
		Zevs.lib.project.Item.unregister(me);
		me.fireEvent("destroy");
	},
	
	toObject: function() {
		return {
			id: this.getId(),
			title: this.getTitle(),
			parent: this.getParent().getId()
		};
	}
	
});