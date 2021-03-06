/**
 * @author enrico marino / http://onirame.no.de/
 * @author federico spini / http://spini.no.de/
 */

vispro.view.InspectorList = Backbone.View.extend({

    el: $(
        '<div class="panel inspector">' +
            '<div class="panel-label inspector ui-layout-north gradient-silver">Inspector</div>' +
            '<div class="panel-list inspector ui-layout-center"></div>' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            root = options.root,
            model = options.model,
            widgetList = model.widgetList,
            viewList = $(element.find('.panel-list')),
            inspectorWorkspace = new vispro.view.InspectorWorkspace({}, {
                model: model,
                root: viewList
            });
        
        element
            .appendTo(root)
            .layout({
                north__size: 35,
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 0
            });
                
        widgetList
            .bind('add', this.add, this);

        this.model = model;
        this.element = element;
        this.root = root;
        this.viewList = viewList;

        return this;
    },
    
    add: function (widget) {
        
        var viewList = this.viewList,
            view = new vispro.view.Inspector({}, { 
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
                
        this.element.cover('disable');
        
        return this;
    },

    disable: function () {
        
        this.element.cover('enable');
        
        return this;
    }

});