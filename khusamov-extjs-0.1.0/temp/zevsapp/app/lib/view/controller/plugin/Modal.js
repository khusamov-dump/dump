



// TODO переделываем в помощника


Ext.define("Zevs.lib.view.controller.plugin.Modal", {
	
	extend: "Zevs.lib.view.controller.plugin.Plugin",
	
	statics: {
		
		/**
		 * Ссылка на запущенный плагин.
		 */
		started: null,
		
		start: function(plugin) {
			var me = this;
			var status = "started";
			if (me.started) {
				me.started.onConflict();
				me.started.getController().onPluginConflict(plugin);
				me.started.getController().fireEvent("pluginconflict", me.started, plugin);
				status = "conflicted";
			} else {
				me.started = plugin;
				me.started.onStart();
				if (me.started) { // если плагин сам себя не отменил
					me.started.getController().onPluginStart(me.started);
					me.started.getController().fireEvent("pluginstart", me.started);
					status = "canceled";
				}
			}
			return status;
		},
		
		finish: function() {
			var me = this;
			me.started.onFinish(me.started.result);
			me.started.callback(me.started.result, me.started);
			me.started.getController().onPluginFinish(me.started.result, me.started);
			me.started.getController().fireEvent("pluginfinish", me.started.result, me.started);
			me.started = null;
			return me;
		},
		
		cancel: function() {
			var me = this;
			me.started.onCancel(me.started.result);
			me.started.getController().onPluginCancel(me.started.result, me.started);
			me.started.getController().fireEvent("plugincancel", me.started.result, me.started);
			me.started = null;
			return me;
		}
		
	},
	
	started: false,
	
	result: null,
	
	_callback: null,
	
	callback: function() {
		return this._callback && this._callback.apply(this, arguments);
	},
	
	/**
	 * @param {Function} callback По завершении команды эта функция будет запущена.
	 * @param {Mixed} callback.result Результат работы команды.
	 * @param {Zevs.lib.view.controller.Command} callback.command Ссылка на команду.
	 */
	start: function(callback) {
		var me = this;
		if (me.started) {
			me.onRestart();
		} else {
			me.started = true;
			me.result = null;
			me._callback = callback;
			var status = Zevs.lib.view.controller.plugin.Modal.start(me);
			if (status == "conflicted") {
				me.started = false;
				me._callback = null;
			}
		}
	},
	
	finish: function(result) {
		var me = this;
		if (me.started) {
			me.started = false;
			me.result = result;
			me._callback = null;
			Zevs.lib.view.controller.plugin.Modal.finish();
		}
	},
	
	cancel: function(result) {
		var me = this;
		if (me.started) {
			me.started = false;
			me.result = result;
			me._callback = null;
			Zevs.lib.view.controller.plugin.Modal.cancel();
		}
	},
	
	onCancel: Ext.emptyFn,
	
	onStart: Ext.emptyFn,
	
	onRestart: Ext.emptyFn,
	
	onFinish: Ext.emptyFn,
	
	onConflict: Ext.emptyFn
	
});