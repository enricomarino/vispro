vispro.view.WidgetBar = Backbone.View.extend({

    tagName: 'div',

    className: 'widgetbar',

    template: _.template(
        '<div class="widgetbar-button" data-action="send-back">' +
        '    <span class="toolbar-button-label">--</span>' + 
        '</div>' +
        '<div class="widgetbar-button" data-action="send-backward">' + 
        '    <span class="toolbar-button-label">-</span>' + 
        '</div>' +
        '<div class="widgetbar-button" data-action="bring-forward">' + 
        '    <span class="toolbar-button-label">+</span>' + 
        '</div>' +
        '<div class="widgetbar-button" data-action="bring-front">' + 
        '    <span class="toolbar-button-label">++</span>' + 
        '</div>' +
        '<div class="widgetbar-button" data-action="delete">' + 
        '    <span class="toolbar-button-label">x</span>' + 
        '</div>'
    ),

    initialize: function (attributes, options) {

        var model = options.model,
            root = options.root,
            element = $(this.el),
            template = this.template;
        
        element
            .html(template())
            .appendTo(root);
        
        model
            .bind('selected', this.select, this)
            .bind('remove', this.remove, this);

        this.element = element;
        this.model = model;

        return this;
    },

    appendTo: function (root) {
        
        this.render().element.appendTo(root);

        return this;
    },

    render: function () {
        
        return this;
    },

    select: function (selected) {
                
        if (selected) {
            this.show();
        }
        else {
            this.hide();
        }

        return this;
    }, 
    
    remove: function () {

        this.element.remove();
    },

    show: function () {
        
        this.render().element.show();

        return this;
    },

    hide: function () {
        
        this.element.hide();
    },

    onClickSendBack: function (event) {

        this.model.sendToBack();
    },

    onClickSendBackward: function (event) {
        
        this.model.sendBackward();
    },

    onClickBringForward: function (event) {
        
        this.model.bringForward();
    },

    onClickBringFront: function (event) {
        
        this.model.bringToFront();
    },

    onClickDelete: function (event) {
        
        var model = this.model;

        if (window.confirm('Eliminare ' + model.label + ' ' + model.id + '?')) {
            model.destroy({});
        }
    },
    
    events: {
        'click .widgetbar-button[data-action="send-back"]': 'onClickSendBack',
        'click .widgetbar-button[data-action="send-backward"]': 'onClickSendBackward',
        'click .widgetbar-button[data-action="bring-forward"]': 'onClickBringForward',
        'click .widgetbar-button[data-action="bring-front"]': 'onClickBringFront',
        'click .widgetbar-button[data-action="delete"]': 'onClickDelete'
    }
});