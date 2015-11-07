
/**
 * Класс для управления одним ассинхронным потоком.
 */
Ext.define("Khusamov.sandbox.deferred.Thread", {
	
	mixins: {
		observable: "Ext.util.Observable",
	},
	
	completed: false,
	
	state: null,
	
	result: undefined,
	
	thread: function() {},

	/**
	 * Конструктор
	 * @param thread
	 */
	constructor: function(thread) { 
		var me = this;
		me.thread = thread;
		me.mixins.observable.constructor.call(me);
		me.addEvents("success", "error", "cancel");
	},
	
	/**
	 * Запустить поток на выполнение.
	 */
	run: function() {
		var me = this;
		me.thread.apply(me, arguments);
	},
	
	/**
	 * Поток завершился успешно.
	 * Метод вызывается из потока.
	 */
	success: function() {
		var me = this;
		me.complete("success", arguments);
	},

	/**
	 * Поток завершился с ошибкой.
	 * Метод вызывается из потока.
	 */
	error: function() {
		var me = this;
		me.complete("failure", arguments);
	},

	/**
	 * Выполнение потока отменено.
	 * Метод вызывается из потока.
	 */
	cancel: function() {
		var me = this;
		me.complete("cancel", arguments);
	},
	
	isCompleted: function() {
		var me = this;
		return me.completed;
	},
	
	getState: function() {
		var me = this;
		return me.state;
	},
	
	getResult: function() {
		var me = this;
		return me.result;
	},

	complete: function(state, result) {
		var me = this;
		me.state = state;
		me.result = result;
		me.completed = true;
		me.fireEvent(state, result);
	}
	
});

