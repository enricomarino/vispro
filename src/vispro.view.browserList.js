vispro.view.BrowserList = Backbone.View.extend({

    el: $(
        '<div class="collection-widget-browser panel">' + 
            '<div class="collection-widget-browser-label panel-label ui-layout-north">Browser</div>' +
            '<div class="collection-widget-browser-list panel-list ui-layout-center"></div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = options.root,
            workspace = options.model,
            widgetList = workspace.widgetList,
            viewList = $(element.find('.panel-list'));
        
        element
            .appendTo(root)
            .layout({
                north__size: 35,
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 0
            });

        workspace
            .bind('remode', this.remode, this);

        widgetList.bind('add', this.add, this);
        this.element = element;
        this.workspace = workspace;
        this.widgetList = widgetList;
        this.viewList = viewList;

        return this;
    },
    
    add: function (widget) {
        
        var viewList = this.viewList,
            view = new vispro.view.Browser({}, { 
                model: widget,
                root: viewList
            });
                
        return this;
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();
        
        return this;
    },

    enable: function () {
                
        this.viewList.cover('disable');

        return this;
    },

    disable: function () {
        
        this.viewList.cover('enable');

        return this;
    },

    remode: function (mode) {
        
        if (mode === 'view') {
            this.enable();
        } else {
            this.disable();
        }

        return this;
    }
    
});