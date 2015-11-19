
/**
 * Автомат состояний.
 */

Ext.define("Zevs.lib.machine.AbstractStateMachine", {
	
	requires: ["Zevs.lib.machine.Timer", "Zevs.lib.machine.state.State"],
	
	mixins: ["Ext.mixin.Observable"],
	
	/**
	 * Таймер автомата.
	 * @public
	 * @readonly
	 * @property {Zevs.lib.machine.Timer}
	 */
	timer: null,
	
	/**
	 * Текущее состояние автомата.
	 * @public
	 * @readonly
	 */
	state: null,
	
	/**
	 * Очередь следующих состояний автомата.
	 * @public
	 * @readonly
	 * @property {Object[]}
	 */
	queue: [],
	
	config: {
		
		/**
		 * Список возможных состояний автомата.
		 * @cfg {Ext.util.Collection}
		 */
		states: null,
		
		/**
		 * Частота автомата.
		 * Количество тиков в секунду.
		 */
		frequency: 10,
		
		/**
		 * Имя состояния, в котором будет находится автомат по умолчанию.
		 */
		idledStateName: "idled"
		
	},
	
	constructor: function(config) {
		var me = this;
		me.initConfig(config);
		me.mixins.observable.constructor.call(me, config);
		me.initTimer();
		me.initMachine();
	},
	
	initTimer: function() {
		var me = this;
		me.timer = Ext.create("Zevs.lib.machine.Timer", {
			run: me.tickFn,
			frequency: me.getFrequency(),
			listeners: {
				scope: me,
				updatefrequency: function(frequency) {
					me.setFrequency(frequency);
				},
				startbefore: "onTimerStartBefore",
				start: "onTimerStart",
				stopbefore: "onTimerStopBefore",
				stop: "onTimerStop",
				pausebefore: "onTimerPauseBefore",
				pause: "onTimerPause"
			}
		});
	},
	
	applyStates: function(states) {
		if (Ext.isArray(states)) {
			var collection = Ext.create("Ext.util.Collection");
			states = states.map(function(state) {
				if (!(state instanceof Zevs.lib.machine.State)) Ext.create("Zevs.lib.machine.State", state);
			});
			collection.add(states);
			states = collection;
		}
		return states;
	},
	
	updateFrequency: function(frequency) {
		var me = this;
		me.timer.restart(frequency);
		me.fireEvent("updatefrequency");
		return me;
	},
	
	addState: function(state) {
		var State = Zevs.lib.machine.State;
		this.states.add(state instanceof State ? state : new State(state));
		return this;
	},
	
	/**
	 * Добавить в очередь команду перехода в состояние name.
	 * Можно добавить параметры перехода:
	 * machine.jump("start", param1, param2, ...)
	 */
	jump: function(name) {
		var me = this;
		var args = Ext.Array.slice(arguments);
		args.shift();
		me.queue.push({
			name: name,
			args: args
		});
		return me;
	},
	
	/**
	 * Инициализация автомата.
	 * @template
	 */
	initMachine: Ext.emptyFn,
	
	onTimerStartBefore: function() {
		var me = this;
		me.queue = [];
	},
	
	onTimerStart: function() {
		var me = this;
		me.fireEvent("startmachine");
	},
	
	onTimerStopBefore: function() {
		var me = this;
		
	},
	
	onTimerStop: function() {
		var me = this;
		me.queue = [];
		me.fireEvent("stopmachine");
	},
	
	onTimerPauseBefore: function() {
		var me = this;
		
	},
	
	onTimerPause: function() {
		var me = this;
		me.fireEvent("pausemachine");
	},
	
	tickFn: function() {
		var me = this;
		me.onTick();
		me.fireEvent("tick");
		if (me.queue.length) {
			var prevStateName = me.state;
			var state = me.queue.shift();
			me.state = state.name;
			var details = {
				prev: prevStateName,
				queue: me.queue,
				machine: me,
				args: state.args
			};
			
			// before
			me.onJumpBefore(state.name, details);
			me.fireEvent("jumpbefore", state.name, details);
			
			// handler
			var stateHandlerArguments = state.args.concat(details);
			var stateObj = me.states.get(state);
			me.fireEvent(state.name + "before");
			stateObj.handler.apply(stateObj, stateHandlerArguments);
			me.fireEvent(state.name);
			
			// handlerMethod
			var onMethod = "on" + state.name[0].toUpperCase() + state.name[0].substr(1);
			if (Ext.isFunction(me[onMethod])) me[onMethod].apply(me, stateHandlerArguments);
			
			// after
			me.onJump(state.name, details);
			me.fireEvent("jump", state.name, details);
		}
		
	},
	
	onTick: Ext.emptyFn,
	
	onJumpBefore: Ext.emptyFn,
	
	onJump: Ext.emptyFn,
	
	/**
	 * Отчет о выполнении автомата.
	 * Генерируется событие report, а все аргументы попадают в обработчики этого события.
	 */
	report: function() {
		var args = Ext.Array.slice(arguments);
		args.unshift("report");
		this.fireEvent.apply(this, args);
		return this;
	},
	
});