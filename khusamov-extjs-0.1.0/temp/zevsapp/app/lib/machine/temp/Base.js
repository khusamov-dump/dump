
/**
 * Виджет автомата Базовый.
 * Добавлен базовый набор состояний.
 */

(function($, undefined) { $.widget("Sultana.StateMachine_Base", $.Sultana.StateMachine_Abstract, {
	
	options: {
		states: {
			start: "Start",
			stop: "Stop",
			idle: "Idle",
			pause: "Pause"
		},		
		machine: {
			state: "Stop",
		}
	},
	
	// Набор состояний автомата
	
	State_Start: function() {
		var self = this;
		self.pushState("Idle");
	},
	
	State_Idle: function() {
		var self = this;
	},
	
	State_Stop: function(data) {
		var self = this;
	},
	
	State_Pause: function() {
		var self = this;
	}
	
}); }(jQuery));