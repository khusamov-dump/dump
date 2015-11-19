
Ext.define("Zevs.lib.machine.state.State", {
	
	config: {
		
		/**
		 * Уникальный номер состояния.
		 * @readonly
		 * @property {String}
		 */
		id: null,
		
		/**
		 * Имя состояния.
		 */
		name: "",
		
		/**
		 * @cfg {Zevs.lib.machine.AbstractStateMachine}
		 */
		machine: null,
		
		/**
		 * Обработчик состояния.
		 */
		handler: Ext.emptyFn
		
	},
	
	constructor: function(config) {
		var me = this;
		//me.id = Zevs.lib.machine.state.State.generateId();
		if (Ext.isString(config)) config = { name: config };
		me.initConfig(config);
	},
	
	updateHandler: function(handler) {
		this.handler = handler;
	},
	
	handler: Ext.emptyFn
	
});