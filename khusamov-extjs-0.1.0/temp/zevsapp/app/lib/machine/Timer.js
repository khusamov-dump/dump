
Ext.define("Zevs.lib.machine.Timer", {
	
	extend: "Ext.util.TaskRunner",
	
	mixins: ["Ext.mixin.Observable"],
	
	state: "stoped", // started | paused | stoped
	
	config: {
		
		/**
		 * Частота таймера.
		 * Количество тиков в секунду.
		 */
		frequency: 10
		
	},
	
	constructor: function(config) {
		var me = this;
		if (config.frequency) config.interval = Math.round(1000 / config.frequency);
		me.callParent([config]);
		me.mixins.observable.constructor.call(me, config);
	},
	
	updateFrequency: function(frequency, old) {
		var me = this;
		me.restart(frequency);
		me.fireEvent("updatefrequency", frequency, old);
	},
	
	start: function() {
		var me = this;
		if (me.state != "started") {
			me.fireEvent("startbefore");
			me.callParent(arguments);
			me.state = "started";
			me.fireEvent("start");
		}
		return me;
	},
	
	stop: function() {
		var me = this;
		if (me.state != "stoped") {
			me.fireEvent("stopbefore");
			me.callParent(arguments);
			me.state = "stoped";
			me.fireEvent("stop");
		}
		return me;
	},
	
	pause: function() {
		var me = this;
		if (me.state == "started") {
			me.fireEvent("pausebefore");
			me.suspendEvents();
			me.stop();
			me.resumeEvents();
			me.state = "paused";
			me.fireEvent("pause");
		}
		return me;
	},
	
	toggle: function() {
		var me = this;
		switch(me.state) {
			case "paused": me.start(); break;
			case "started": me.pause(); break;
		}
		return me;
	},
	
	restart: function(frequency) {
		this.callParent(Math.round(1000 / frequency));
		me.fireEvent("restart", frequency);
		return this;
	}
	
});