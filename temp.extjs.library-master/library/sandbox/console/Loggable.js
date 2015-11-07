
Ext.define("Khusamov.sandbox.console.Loggable", {
	
	statics: {
		/**
		 * Флаг для разрешения ведения записей.
		 */
		enabled: true
	},
	
	/**
	 * Начать свернутую группу записей.
	 */
	logGroupCollapsedBegin: function() {
		var me = this;
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.groupCollapsed.apply(console, me.prepareLogArguments(arguments));
		}
	},
	
	/**
	 * Начать группу записей.
	 */
	logGroupBegin: function() {
		var me = this;
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.group.apply(console, me.prepareLogArguments(arguments));
		}
	},
	
	/**
	 * Закончить группу записей.
	 */
	logGroupEnd: function() {
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.groupEnd();
		}
	},
	
	/**
	 * Сделать запись.
	 */
	log: function() {
		var me = this;
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.log.apply(console, me.prepareLogArguments(arguments));
		}
	},
	
	/**
	 * Сделать запись об ошибке.
	 */
	error: function() {
		var me = this;
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.error.apply(console, me.prepareLogArguments(arguments));
		}
	},
	
	/**
	 * Сделать запись о предупреждении.
	 */
	warning: function() {
		var me = this;
		if (Khusamov.sandbox.console.Loggable.enabled) {
			console.warn.apply(console, me.prepareLogArguments(arguments));
		}
	},
	
	/**
	 * Подготовить запись.
	 * Вписывает название компонента и номер строки, откуда был вызов.
	 * @param args
	 * @return array
	 */
	prepareLogArguments: function(args) {
		var me = this;
		var result = [];
		// Первым аргументом выставляем имя компонента и номер строки
		result.push(me.self.getName() + ":" + me.getLogCalledLine());
		for(var i = 0; i < args.length; i++) result.push(args[i]);
		return result;
	},
	
	/**
	 * Возвращает номер строки вызываемой функции.
	 * @param skip Сколько надо пропустить предыдущих вызовов в стеке.
	 * @return integer|null
	 */
	getLogCalledLine: function(skip) {
		var me = this;
		skip = skip || 3;
		var line = null;
		try { n.o.t++; } catch (error) {
			if (error.stack) line = me.getLineFromStackDump(skip, error.stack);
		}
		return line;
	},
	
	/**
	 * Возвращает номер строки из дампа стека.
	 * Учитывает тип браузера.
	 * @param skip Сколько надо пропустить предыдущих вызовов в стеке.
	 * @param stack Дамп стека.
	 * @return integer
	 */
	getLineFromStackDump: function(skip, stack) {
		var line = null;
		if (Ext.isWebKit) skip++;
		stack = stack.split("\n");
		line = stack[skip]
			.replace("http:", "")
			.replace("function:", "")
			.split(":");
		line = line[1];
		return line;
	}
	
});

