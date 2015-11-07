/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.Settings', {
    extend: 'Ext.window.Window',
    
    config: { wallpaperPath: null} ,

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',

        'Ext.ux.desktop.Wallpaper',

        'MyDesktop.WallpaperModel'
    ],

    layout: 'anchor',
    title: 'Настройки рабочего стола',
    modal: true,
    width: 640,
    height: 480,
    border: false,
    
    wallpaperPath: null,
    desktop: null,

    initComponent: function () {
        var me = this;

        me.selected = me.desktop.getWallpaper();
        me.stretch = me.desktop.wallpaper.stretch;

        me.preview = Ext.create('widget.wallpaper');
        me.preview.setWallpaper(me.selected);
        me.tree = me.createTree();

        me.buttons = [
            { text: 'OK', handler: me.onOK, scope: me },
            { text: 'Отмена', handler: me.close, scope: me }
        ];

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    me.tree,
                    {
                        xtype: 'panel',
                        title: 'Предварительный просмотр фона',
                        region: 'center',
                        layout: 'fit',
                        items: [ me.preview ]
                    }
                ]
            },
            {
                xtype: 'checkbox',
                boxLabel: 'Растянуть картинку', padding: "3 3 3 12",
                checked: me.stretch,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;
                    }
                }
            }
        ];

        me.callParent();
    },

    createTree : function() {
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        }

        var tree = new Ext.tree.Panel({
            title: 'Фон рабочего стола',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            width: 150,
            region: 'west',
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'MyDesktop.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                        { text: "Без картинки", iconCls: '', leaf: true },
                        child('blue-sencha.jpg'),
                        child('dark-sencha.jpg'),
                        child('wooden.jpg'),
                        child('blue.jpg'),
                        child('desktop.jpg'),
                        child('sky.jpg')
                    ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onOK: function () {
        var me = this;
        if (me.selected) {
            me.desktop.setWallpaper(me.selected, me.stretch);
        }
        me.destroy();
    },

    onSelect: function (tree, record) {
        var me = this;

        if (record.data.img) {
            //me.selected = '/system/js/desktop/wallpapers/' + record.data.img;
            me.selected = me.wallpaperPath + "/" + record.data.img;
        } else {
            me.selected = Ext.BLANK_IMAGE_URL;
        }

        me.preview.setWallpaper(me.selected);
    },

    setInitialSelection: function () {
        var s = this.desktop.getWallpaper();
        if (s) {
            var path = '/Wallpaper/' + this.getTextOfWallpaper(s);
            this.tree.selectPath(path, 'text');
        }
    }
});
