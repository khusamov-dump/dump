
/**
 * Запуск нескольких потоков с возможностью 
 * отслеживания завершения работы всех потоков.
 */
Ext.define("Khusamov.sandbox.deferred.Parallel", {
	
	requires: ["Khusamov.sandbox.deferred.Thread"],
	
	mixins: {
		observable: "Ext.util.Observable",
	},
	
	threads: {},
	
	results: {},

	/**
	 * Конструктор
	 * @param config
	 */
	constructor: function(config) {
		var me = this;
		me.mixins.observable.constructor.call(me, config);
		me.addEvents("complete");
	},
	
	/**
	 * Добавить поток.
	 * Имя можно опустить.
	 * Поток не будет запущен.
	 * @param name
	 * @param thread
	 * @returns
	 */
	thread: function(name, thread) {
		var me = this;
		if (!thread) {
			thread = name;
			name = Ext.Object.getSize(me.threads);
		}
		me.threads[name] = Ext.create("Khusamov.sandbox.deferred.Thread", thread);
		return me;
	},
	
	/**
	 * Добавить блок последовательно выполняемых потоков.
	 * Потоки не будут запущены.
	 * @param threads
	 * @returns
	 */
	serial: function(threads) {
		var me = this;
		return me.thread(function() {
			var thread = this;
			var serial = Ext.create("Khusamov.sandbox.deferred.Serial");
			threads.call(serial);
			serial.run(function() {
				thread.success();
			});
		});
	},
	
	/**
	 * Запустить все потоки.
	 * @param callback
	 * @returns 
	 */
	run: function(callback) {
		var me = this;
		if (callback) me.on("complete", callback);
		Ext.Object.each(me.threads, function(name, thread) {
			thread.run();
			thread.on("success", function(result) {
				me.onThreadSuccess(name, result);
			});
			if (thread.isCompleted()) {
				me.onThreadSuccess(name, thread.getResult());
			}
		});
		return me;
	},
	
	/**
	 * Очистить все потоки 
	 * и подготовиться к новой инициализации.
	 * @returns
	 */
	clear: function() {
		var me = this;
		me.threads = {};
		me.results = {};
		return me;
	},
	
	onThreadSuccess: function(name, result) {
		var me = this;
		me.results[name] = result;
		if (me.isCompleteThreads()) {
			me.fireEvent("complete", me.results);
		}
	},
	
	isCompleteThreads: function() {
		var me = this;
		var fin = false;
		if (Ext.Object.getSize(me.threads) == Ext.Object.getSize(me.results)) {
			fin = true;
			var names = Ext.Object.getKeys(me.results);
			Ext.Object.each(me.threads, function(name) {
				if (!Ext.Array.contains(names, name)) {
					fin = false;
				}
			});
		}
		return fin;
	}
	
});

