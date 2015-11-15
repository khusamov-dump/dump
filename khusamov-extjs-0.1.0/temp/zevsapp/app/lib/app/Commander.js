
/**
 * Базовый класс приложения, которое может содержать контроллеры-команды (наследуемые от класса Zevs.lib.app.controller.Command).
 */

Ext.define("Zevs.lib.app.Commander", {
	
	extend: "Ext.app.Application",
	
	/**
	 * Запуск контроллера по строке вида 
	 * insert.product
	 * где первое слово имя контроллера, второе - метод (опционально)
	 * и аргументы в виде массива для метода product
	 * на выполнение команды.
	 * Команда выполняется немедленно.
	 */
	execCommand: function(command, args) {
		var me = this;
		var controller = me.getCommandController(command);
		var method = command.split(".")[1];
		
		console.log("MainController", "|", "Вызов команды '" + command + "' с параметрами ", args);
		return controller[method ? method : "exec"].apply(controller, args);
	},
	
	/**
	 * На входе подается команда вида
	 * insert.product
	 * clear
	 * где первое слово имя контроллера, второе - метод (опционально)
	 * На выходе контроллер, отвечающий за эту команду.
	 */
	getCommandController: function(command) {
		var controller = null;
		var name = command.split(".")[0];
		name = name[0].toUpperCase() + name.substr(1);
		try {
			controller = this.getController("command." + name + "Command");
		} catch (error) {
			throw new Error("Ошибка загрузки контроллера команды '" + name + "'. " + error.message);
		}
		return controller;
	}
	
});