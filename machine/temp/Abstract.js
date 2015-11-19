
/**
 * Виджет автомата Абстрактный.
 * Определена только логика работы автомата без набора состояний.
 */
 
/*
Список событий:
state Возникает при каждом изменении состояния автомата.
tick Возникает после каждого шага автомата.
<имя состояния> Перед запуском метода каждого состояния.
<имя состояния>_after После запуском метода каждого состояния.
*/

(function($, undefined) { $.widget("Sultana.StateMachine_Abstract", $.Sultana.Widget, {

	options: {
		states: {
			start: null, // Состояние, в которое автомат переходит при запуске
			stop: null, // Состояние, при котором автомат останавливается
			idle: null, // Состояние, при котором автомат бездействует
			pause: null // Состояние, при котором автомат временно остановлен
		},		
		machine: {
			state: null, // Имя текущего состояния автомата
			freq: 10, // Частота автомата: тиков в секунду		
			tick: 0, // Текущий шаг автомата
			next: [] // Очередь следующих состояний (формат массива {name, data})
		}		
	},
	
	// Кнопки автомата
	
	/**
	 * Кнопка "Запуск автомата".
	 * Ничего не делает для состояний отличных от старта и паузы.
	 * Используется текущее значение очереди и значения шага автомата.
	 */
	start: function() {
		var self = this;
		switch (true) {
			// Если автомат был остановлен, то запуск со старта
			case self.isStop():
				self.pushState(self.option().states.start);
				self._startMachine();
				break;
			// Если автомат был на паузе, то запуск с текущей очередью состояний
			case self.isPause():
				self._startMachine();
				break;
		}
		return self;
	},
	
	/**
	 * Кнопка "Приостановить автомат".
	 * Ничего не делает, если автомат выключен (пауза или стоп).
	 */
	pause: function() {
		var self = this;
		// Если автомат включен, то ставим его на паузу
		if (self.isRun()) self.pushState(self.option().states.pause);
		return self;
	},
	
	/**
	 * Кнопка "Останов автомата".
	 */
	stop: function() {
		var self = this;
		// Если автомат не стоит, то переводим его в состояние стоп
		if (!self.isStop()) {
			self.pushState(self.option().states.stop);
			// Если автомат на паузе, то дополнительно включем его
			if (self.isPause()) self._startMachine();
		}		
		return self;
	},
	
	/**
	 * Кнопка "Вкл/выкл автомат".
	 * Меняет состояния автомата: старт/стоп.
	 */
	toggle: function() {
		var self = this;
		if (self.isStop()) self.start(); else self.stop();
		return self;
	},
	
	// Проверки состояния автомата
	
	/**
	 * Остановлен ли автомат.
	 */
	isStop: function() {
		var self = this;
		return self.state() == self.option().states.stop;
	},
	
	/**
	 * Приостановлен ли автомат.
	 */
	isPause: function() {
		var self = this;
		return self.state() == self.option().states.pause;
	},
	
	/**
	 * Работает ли автомат.
	 */
	isRun: function() {
		var self = this;
		return !self.isStop() && !self.isPause();
	},
	
	// Реализация автомата
	
	/**
	 * Мгновенные отчеты о работе автомата в виде событий.
	 */
	report: function(report) {
		var self = this;
		self._trigger("report", null, { report: report });
	},
	
	/**
	 * Получить имя текущего состояния автомата.
	 */
	state: function() {
		var self = this;
		return self.option().machine.state;
	},
	
	/**
	 * Назначить следующее состояние автомата.
	 * Ставит в очередь имя следующего состояния автомата.
	 */
	pushState: function(name, data) {
		var self = this;
		self.option().machine.next.push({
			name: name,
			data: data
		});
		return self;
	},
	
	/**
	 * Провернуть очередь состояний и получить имя следующего состояния.
	 * Возвращает имя состояния или null, если очередь закончена.
	 * При этом изменяется значение текущего состояния автомата.
	 * Если очередь закончена, то текущее состояние равно последнему.
	 */
	shiftState: function() {
		var self = this;
		var next = self.option().machine.next.shift();
		if (next) self.option().machine.state = next.name;
		return next;
	},
	
	/**
	 * Запуск автомата.
	 * Используется текущее значение очереди и значения шага автомата.
	 */
	_startMachine: function() {
		var self = this;
		self._startMachineCycle(function() {
			self._stepMachine(self.state(), self.shiftState());
			self._tick();
		});
		return self;
	},
	
	/**
	 * Один шаг рабочего цикла автомата.
	 * Событие state возникает при каждом изменении состояния автомата.
	 */
	_stepMachine: function(prev, next) {
		var self = this;
		if (next) {
			self._trigger("state", null, { prev: prev, state: next });
			self._trigger(next.name, null, next.data);
			self._execStateMethod(next);
			self._trigger(next.name + "_After");
			switch (true) {
				case self.isStop(): self._stopMachine(); break;
				case self.isPause(): self._pauseMachine(); break;
			}
		}
		return self;
	},
	
	/**
	 * Подсчет шага автомата 
	 * и выработка соответствующего события.
	 */
	_tick: function() {
		var self = this;
		self._trigger("tick", null, { tick: self.option().machine.tick });
		self.option().machine.tick++;
		return self;
	},
	
	/**
	 * Запуск метода соответствующего запрошенному состоянию.
	 */
	_execStateMethod: function(state) {
		var self = this;
		var data = state.data;
		stateMethod = "self.State_" + state.name + "(data);";
		return eval(stateMethod);
	},
	
	/**
	 * Останов автомата.
	 */
	_stopMachine: function() {
		var self = this;
		self._stopMachineCycle();
		self.option().machine.next = [];
		self.option().machine.tick = 0;
	},
	
	/**
	 * Приостановить автомат.
	 */
	_pauseMachine: function() {
		var self = this;
		self._stopMachineCycle();
	},
	
	/**
	 * Старт рабочего цикла автомата.
	 */
	_startMachineCycle: function(callback) {
		var self = this;
		var interval = Math.round(1000 / self.option().machine.freq);
		self.element.everyTime(interval, "machine", callback);
		return self;
	},
	
	/**
	 * Останов рабочего цикла автомата.
	 */
	_stopMachineCycle: function() {
		var self = this;
		self.element.stopTime("machine");
		return self;
	}
	
}); }(jQuery));