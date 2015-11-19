
/**
 * Автомат состояний.
 */

Ext.define("Zevs.lib.machine.BaseStateMachine", {
	
	extend: "Zevs.lib.machine.AbstractStateMachine",
	
	/*requires: [
		"Zevs.lib.machine.state.BaseStartState"
	],
	
	config: {
		
		
		
	},*/
	
	/*constructor: function(config) {
		var me = this;
		me.callParent(arguments);
		me.initDefaultStates();
	},*/
	
	initMachine: function() {
		var me = this;
		me.addState({ id: "idled", name: "Бездействует" });
		me.addState({ id: "paused", name: "На паузе" });
		me.addState({ id: "stoped", name: "Остановлен" });
		/*me.addState(Ext.create("Zevs.lib.machine.state.BaseStartState"));
		me.addState(Ext.create("Zevs.lib.machine.state.BaseStopState"));
		me.addState(Ext.create("Zevs.lib.machine.state.BasePauseState"));
		me.addState(Ext.create("Zevs.lib.machine.state.BaseIdleState"));*/
	},
	
	/**
	 * Запуск автомата.
	 */
	start: function() {
		var me = this;
		me.jump("idled");
		me.timer.start();
		return me;
	},
	
	/**
	 * Останов автомата.
	 */
	stop: function() {
		return this.jump("stoped");
	},
	
	/**
	 * Поставить на паузу автомат.
	 */
	pause: function() {
		return this.jump("paused");
	},
	
	/**
	 * Перевести автомат в режим бездействия.
	 */
	idle: function() {
		return this.jump("idled");
	},
	
	/**
	 * Переключить старт/стоп состояние автомата.
	 */
	toggle: function() {
		switch(true) {
			case this.isStarted(): this.stop(); break;
			case this.isStoped(): this.start(); break;
		}
		return this;
	},
	
	isIdled: function() {
		return this.state == "idled";
	},
	
	isStoped: function() {
		return this.state == "stoped";
	},
	
	isPaused: function() {
		return this.state == "paused";
	}
	
});