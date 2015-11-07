
/**
 * Организация последовательного 
 * запуска ассинхронных потоков.
 */
Ext.define("Khusamov.sandbox.deferred.Serial", {
	
	requires: ["Khusamov.sandbox.deferred.Thread"],
	
	mixins: {
		observable: "Ext.util.Observable",
	},
	
	// TODO Эти переменные (threads, results, ...) похоже СТАТИЧЕСКИЕ - наверное переделать в config:{}
	// ну и проверить вообще, так это или где-то ошибка
	// ибо второй объект Serial не создать, так как в нем появляются данные из первого объекта!
	
	threads: [],
	
	results: {},
	
	next: 0,
	
	launched: false,
	
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
		me.threads.push({
			name: name, 
			thread: Ext.create("Khusamov.sandbox.deferred.Thread", thread)
		});
		return me;
	},
	
	/**
	 * Добавить блок паралельно выполняемых потоков.
	 * Потоки не будут запущены.
	 * @param threads
	 * @returns
	 */
	parallel: function(threads) {
		var me = this;
		return me.thread(function() {
			var thread = this;
			var parallel = Ext.create("Khusamov.sandbox.deferred.Parallel");
			threads.call(parallel);
			parallel.run(function() {
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
		if (!me.launched) {
			if (callback) me.on("complete", callback);
			me.launched = true;
			me.next = 0;
			me.runNext();
		}
		return me;
	},
	
	/**
	 * Очистить все потоки 
	 * и подготовиться к новой инициализации.
	 * @returns
	 */
	clear: function() {
		var me = this;
		me.threads = [];
		me.results = {};
		me.next = 0;
		return me;
	},
	
	runNext: function(params) {
		var me = this;
		var next = me.threads[me.next];
		if (next) {
			var name = next.name;
			var thread = next.thread;
			thread.run.apply(thread, params);
			if (thread.isCompleted()) {
				me.onThreadSuccess(name, thread.getResult());
			} else {
				thread.on("success", function() {
					me.onThreadSuccess(name, arguments);
				});
			}
		} else {
			me.fireEvent("complete", me.results);
			me.launched = false;
		}
	},
	
	onThreadSuccess: function(name, result) {
		var me = this;
		me.results[name] = result;
		me.next++;
		me.runNext(result);
	}
	
});

