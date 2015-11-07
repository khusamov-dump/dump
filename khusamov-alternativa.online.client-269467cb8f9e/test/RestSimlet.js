
Ext.define('Test.RestSimlet', {
    extend: 'Ext.ux.ajax.JsonSimlet',
    
    doDelete: function(ctx) {
    	//console.log(ctx);
    	return {
    		status: 200,
    		responseText: Ext.encode({
    			success: true
    		})
    	};
    },
    
    doPut: function(ctx) {
    	//console.log(ctx);
    	return {
    		status: 200,
    		responseText: Ext.encode({
    			success: true
    		})
    	};
    },
    
    doPost: function(ctx) {
        var result = this.callParent(arguments),
            o = this.processData(Ext.decode(ctx.xhr.body)),
            item = this.getById(this.data, o.id, true),
            key;
        
        for (key in o) {
            item[key] = o[key];
        }
        
        result.responseText = Ext.encode(item);
        return result;
    },
    
    processData: Ext.identityFn,

    getData: function (ctx) {
        var params = ctx.params;
        
        
        if ("_dc" in params) delete params._dc;
        console.log("REST", ctx.url.split("?")[0], "|", params);
        
        
        
        if ('id' in params) {
            return this.getById(this.data, params.id);
        }

        delete this.currentOrder;
        return this.callParent(arguments);
    },
    
    getById: function(data, id) {
        var len = data.length,
            i, item;
        
        var idProperty = this.idProperty || "id";
        
        for (i = 0; i < len; ++i) {
            item = data[i];
            if (item[idProperty] === id) {
                return item;
            }
        }
        return null;
    }
});