/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.AccordionWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.TreeStore',
        'Ext.layout.container.Accordion',
        'Ext.toolbar.Spacer',
        'Ext.tree.Panel'
    ],

    id:'acc-win',

    init : function(){
        this.launcher = {
            text: 'Пользователи',
            iconCls:'accordion',
            handler: "system"
        };
    },

    createTree : function(){
        var tree = Ext.create('Ext.tree.Panel', {
            id:'im-tree',
            title: 'Пользователи он-лайн',
            rootVisible:false,
            lines:false,
            autoScroll:true,
            tools:[{
                type: 'refresh',
                handler: function(c, t) {
                    tree.setLoading(true, tree.body);
                    var root = tree.getRootNode();
                    root.collapseChildren(true, false);
                    Ext.Function.defer(function() { // mimic a server call
                        tree.setLoading(false);
                        root.expand(true, true);
                    }, 1000);
                }
            }],
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    text:'Онлайн',
                    expanded: true,
                    children:[{
                        text:'Друзья',
                        expanded:true,
                        children:[
                            { text:'Брайян', iconCls:'user', leaf:true },
                            { text:'Кевин', iconCls:'user', leaf:true },
                            { text:'Марк', iconCls:'user', leaf:true },
                            { text:'Мэт', iconCls:'user', leaf:true },
                            { text:'Миша', iconCls:'user', leaf:true },
                            { text:'Майкл', iconCls:'user', leaf:true },
                            { text:'Еще Майкл', iconCls:'user', leaf:true },
                            { text:'Джерри', iconCls:'user', leaf:true },
                            { text:'Рич', iconCls:'user', leaf:true },
                            { text:'Ниг', iconCls:'user', leaf:true },
                            { text:'Зак', iconCls:'user', leaf:true }
                        ]
                    },{
                        text:'Семья',
                        expanded:true,
                        children:[
                            { text:'Кияна', iconCls:'user-girl', leaf:true },
                            { text:'Аубрей', iconCls:'user-girl', leaf:true },
                            { text:'Кале', iconCls:'user-kid', leaf:true }
                        ]
                    }]
                }
            })
        });

        return tree;
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('acc-win');

        if (!win) {
            win = desktop.createWindow({
                id: 'acc-win',
                title: 'Пользователи',
                width: 250,
                height: 400,
                iconCls: 'accordion',
                animCollapse: false,
                constrainHeader: true,
                bodyBorder: true,
                tbar: {
                    xtype: 'toolbar',
                    ui: 'plain',
                    items: [{
                        tooltip: {
                        	title: 'Соединение с базой', 
                        	text: 'И пусть мир будет ему кляхом!'
                        },
                        iconCls:'connect'
                    },
                    '-',
                    {
                        tooltip:'Новый пользователь',
                        iconCls:'user-add'
                    },
                    ' ',
                    {
                        tooltip:'Удалить',
                        iconCls:'user-delete'
                    }]
                },

                layout: 'accordion',
                border: false,

                items: [
                    this.createTree(),
                    {
                        title: 'Настройки',
                        html:'<p>Something useful would be in here.</p>',
                        autoScroll:true
                    },
                    {
                        title: 'Материал',
                        html : '<p>Something useful would be in here.</p>'
                    },
                    {
                        title: 'Права доступа',
                        html : '<p>Something useful would be in here.</p>'
                    }
                ]
            });
        }

        return win;
    }
});
