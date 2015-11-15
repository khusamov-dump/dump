
Ext.define("Zevs.controller.CommandLine", {
	
	extend: "Ext.app.Controller",
	
	uses: ["Zevs.lib.app.controller.Command"],
	
	onLaunch: function() {
		var me = this;
		window.commandline = me.commandline;
	},
	
	/**
	 * Выполнение одиночной команды (немедленно или с вводом).
	 * Подается команда такого вида
	 * insert.product({polygon: [[10, 20], [30, 40], [50, 60]], productjoint: 1012})
	 * insert.product([[10, 20], [30, 40], [50, 60]], 1012)
	 * insert.product([[10, 20], [30, 40], [50, 60]])
	 * insert.product()
	 * insert.product
	 * проверяется все ли параметры заданы
	 * если все - то выполняется команда
	 * если нет - то вызывается помощник для ввода недостающих данных - например редактор ввода полигона рамы окна
	 * если невозможно заполнить или ошибки - то вываливается ошибка throw
	 */
	commandline: function(commandline) {
		var me = this;
		eval(me.getCommandControllerListScript());
		
		
	},
	
	/**
	 * Выполнение программы команд.
	 * Метод позволяет выполнить несколько команд сразу.
	 * Программа составляется на JS в произвольном виде.
	 * Контроллеры доступны в виде объектов insert, update и прочие.
	 */
	programExec: function(program) {
		var me = this;
		eval(me.getCommandControllerListScript());
		
	},
	
	getCommandControllerListScript: function() {
		var result = [];
		Zevs.app.controllers.each(function(controller) {
			if (controller instanceof Zevs.lib.app.controller.Command) {
				var cpath = controller.getModuleClassName().split(".");
				var name = cpath[cpath.length - 1].toLowerCase();
				
				var template = new Ext.Template("var {name} = Zevs.app.getController('{classname}');");
				result.push(template.apply({
					name: name,
					classname: controller.getModuleClassName()
				}));
				
				
			}
		});
		return result.join("\n");
	}
	
});