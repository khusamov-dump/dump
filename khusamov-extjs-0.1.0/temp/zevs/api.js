
// Данные проекта для Построителя
var project = {
	// Данные по определенному формату
};

// Дождёмся загрузки API и готовности DOM
Ext.onReady(function() {

	// Создание экземпляра Построителя и размещение в контейнере с заданным id
	var zevs = Ext.create("Zevs", {
		listeners: {
			getProfileSystems: function(params, callback) {
				// Пользовательский код для передачи списка 
				// систем профилей в Построитель по условию params
			}, 
			getProfileArticles: function(params, callback) {
				// Пользовательский код для передачи списка 
				// артикулов профилей в Построитель по условию params
			}, 
			saveProject: function(project, callback) {
				// Пользовательский код сохранения 
				// данных проекта project
			}
		}
	});
	
	// Загрузка проекта в Построитель
	zevs.load(project);
	
});


