
/**
 * Хак, исправляющий ошибку, возникающую при попытке 
 * установить заголовок, если объект не отрисован.
 * http://javascript.ru/forum/showthread.php?p=238226#post238226
 */
Ext.override(Ext.panel.Panel, {
	setTitle: function(newTitle) {
      var me = this;
      if (me.rendered) {
      	me.callParent(arguments);
      } else {
      	me.title = newTitle;
      }
	}
});


/**
 * Хак. Решение проблемы с одновременным запуском 
 * многих экземпляров класса Ext.app.Application
 * http://javascript.ru/forum/showthread.php?p=179946#post179946
 * Решает проблему control().
 */

Ext.override(Ext.app.EventBus, {
	constructor: function() {
		this.mixins.observable.constructor.call(this);
		this.bus = {};
		var me = this;
		Ext.override(Ext.Component, {
			fireEvent: function(ev) {
				if (this.callParent(arguments) !== false) {
					return me.dispatch.call(me, ev, this, arguments);
				}
				return false;
			}
		});
	}
});




Ext.onReady(function() {
	
	/**
	 * Хак. Позволяющий принимать на вход Ext.data.Connection.request() 
	 * не только скалярные параметры, а также объекты и массивы.
	 * Они будут доступны в PHP как массивы.
	 */
	
	Ext.override(Ext.data.Connection, {
		request: function(options) {
			var me = this;
			if (!Ext.isString(options.params)) {
				
				// Досадная ошибка: булевские значения передаются на сервер в текстовом виде (например "true").
				// Тут приходится их отлавливать и конвертить хотя бы в числа 1 и 0.
				Ext.Object.each(options.params, function(key, value) {
					if (Ext.isBoolean(value)) {
						options.params[key] = value ? 1 : 0;
					}
				});
				
				options.params = param(options.params);
			}
			return me.callParent([options]);
		}
	});
	
	Ext.data.Connection.convertObjectToUrlPhplike = param;
	
	// Функция из jQuery, переводит объект в строку вида: param=value&param=value&...
	// и главное оно переводит подобъекты в формат, пригодный для PHP (с квадратными скобками для клюей)
	function param(a, traditional) {
		var r20 = /%20/g;
		var s = [],
			add = function(key, value) {
				// If value is a function, invoke it and return its value
				value = Ext.isFunction(value) ? value() : value;
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if (traditional === undefined) {
			//traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		//if (Ext.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
		if (Ext.isArray(a)) {
			// Serialize the form elements
			Ext.Array.each(a, function(v) {
				add(v.name, v.value);
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (var prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	}
	
	function buildParams(prefix, obj, traditional, add) {
		var rbracket = /\[\]$/;
		if (Ext.isArray(obj)) {
			// Serialize array item.
			Ext.Array.each(obj, function(v, i) {
				if (traditional || rbracket.test(prefix)) {
					// Treat each array item as a scalar.
					add(prefix, v);
					
				} else {
					// If array item is non-scalar (array or object), encode its
					// numeric index to resolve deserialization ambiguity issues.
					// Note that rack (as of 1.0.0) can't currently deserialize
					// nested arrays properly, and attempting to do so may cause
					// a server error. Possible fixes are to modify rack's
					// deserialization algorithm or to provide an option or flag
					// to force array serialization to be shallow.
					buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
				}
			});

		} else if (!traditional && Ext.isObject(obj)) {
			// Serialize object item.
			for (var name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}

		} else {
			// Serialize scalar item.
			add(prefix, obj);
		}
	}
	
});

