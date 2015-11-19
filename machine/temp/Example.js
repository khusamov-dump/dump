
//
// Фильтр шаблонов
//

$(function() {
	
	var filter = $(".filterTemplateForm");
	
	// Обработчик кнопки "Найти"	
	filter.find("button.filter").click(function() {		
		// Перед переходом нужно удалить параметр curPos, 
		// чтобы фильтрация началась с первой страницы, а не с какой попало
		var url = $("#adminUrlPrefix").text();
		url = url.parseUrl();
		delete url.curPos;
		url = "?" + $.param(url);
		// Теперь формируем адрес перехода с фильтрацией
		var category = filter.find("#category").val();
		var type = filter.find("#type").val();
		url += "&filterTemplate=yes";
		if (category) url += "&filterByCategory=" + encodeURIComponent(category);
		if (type) url += "&filterByType=" + encodeURIComponent(type);
		document.location = url;
		return false;
	});
	
	// Корректировка некоторых ссылок на странице с учетом фильтрации
	// Если фильтр включен, то нужно подкорректировать ссылки на странице	
	var params = document.location.toString().parseUrl();	
	if (params.filterTemplate = "yes") {
		$(".Netcat_Admin_Table_Scroller a").each(function(i, a) {
			if (params.filterByCategory) 
				a.href += "&filterByCategory=" + params.filterByCategory;
			if (params.filterByType) 
				a.href += "&filterByType=" + params.filterByType;
		});
	}
	
});

//
// Автомат обновления шаблонов
//

$(function() {
	
	// Автомат обновления шаблонов
	var machine = $(".updateTemplatesMachine").Sultana_UpdateTemplatesMachine({
		actionUrl: $("#adminUrlPrefix").text()
	});

	// Обработчик кнопки вкл/выкл автомата обновления шаблонов
	machine.find(".toggle").click(function() {
		if (machine.Sultana_UpdateTemplatesMachine("isStop")) {
			machine.find(".log > *").remove();
			machine.find(".report").text("");
		}
		machine.Sultana_UpdateTemplatesMachine("toggle");
		return false;
	});
	
	machine.Sultana_UpdateTemplatesMachine("binds", {
		"start": function() {
			machine.find(".toggle").text("Стоп");
			machine.find(".report").text("Начинаем обновление...");
		},
		"stop": function() {
			machine.find(".toggle").text("Обновить шаблоны");
		},
		"report": function(event, data) {
			machine.find(".report").text(data.report);
		},
		"log": function(event, trigger) {
			machine.find(".log").html(machine.find(".log").html() + "<div>" + trigger.type + "</div>");
		}
	});
	
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

/**
 * Виджет автомата.
 * Обновление шаблонов.
 */

(function($, undefined) { $.widget("Sultana.Sultana_UpdateTemplatesMachine", $.Sultana.StateMachine_Base, {
	
	options: {	
		log: { enable: false, exclude: "tick, state, _after$" },
		actionUrl: null,
		templates: null,
		current: 0 // Порядковый номер текущего шаблона, который обновляется
	},
	
	_parseResultData: function(data, selector) {
		var self = this;
		data = "<div>" + data + "</div>";
		data = eval("(" + $(data).find(selector).text() + ")");
		return data;
	},
	
	_get: function(request) {
		var self = this;
		request.data["dsAJAX"] = "yes";
		$.get(self.option("actionUrl"), request.data, function(data) {
			data = self._parseResultData(data, request.from);			
			switch (data.result) {
				case "ok":
					request.ok(data);
					break;
				case "error":
					self.report(data.message);
					self.pushState("Stop");
					break;
				default:
					self.report("Неизвестный код результата: '" + data.result + "'.");
					self.pushState("Stop");
					break;
			}			
		});
	},
	
	// Набор состояний автомата
	
	State_Start: function() {
		var self = this;
		self.pushState("Loading_TemplateList");
	},
	
	// Состояние "Загрузка списка номеров шаблонов"
	State_Loading_TemplateList: function() {
		var self = this;
		self.report("Загрузка списка шаблонов.");
		self._get({
			data: {
				dsAction: "loadTemplateNumbers_NonUpdated"
			},
			from: ".templateNumbers",
			ok: function(data) {
				var report;
				if (data.templates.length > 0) {
					self.option("templates", data.templates);
					self.option("current", 0);
					report = "Шаблонов для обновления: " + data.templates.length + " шт.";
					self.pushState("Updating_One_Template");
				} else {
					report = "Нет шаблонов для обновления.";
					self.pushState("Stop");
				}
				self.report(report);
			}
		});
	},
	
	// Состояние "Обновление шаблона"
	State_Updating_One_Template: function() {
		var self = this;		
		var templates = self.option("templates");
		var current = self.option("current");	
		self._get({
			data: {
				dsAction: "updateOneTemplate", 
				template: templates[current]
			},
			from: ".updateOneTemplate",
			ok: function(data) {
				self.option("current", ++current);	
				var nextState = "Updating_One_Template";
				var report = "Обновлено шаблонов: " + current + " из " + templates.length + " шт.";				
				if (current >= templates.length) {
					nextState = "Stop";
					report = "Готово! Обновлено шаблонов: " + templates.length + " шт.";
				}
				self.pushState(nextState);
				self.report(report);
			}
		});
	}

}); }(jQuery));