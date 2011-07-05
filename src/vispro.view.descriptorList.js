vispro.view.DescriptorList = Backbone.View.extend({

    init: function (options) {
        
        var element = $(this.el),
            model = options.model,
            label = $('<div>'),
            viewList = [];

        this.model = model;
        this.viewList = viewList;

        label
            .addClass('descriptorList-label')
            .text('Widgets');
        
        element
            .append(label)
            .cover();
                
        model
            .each(function (item) {
                this.add(item);
            }, this);
        
        model
            .bind('add', $.proxy(this.add, this));

        return this;
    },

    add: function (descriptor) {

        var element = $(this.el),
            viewList = this.viewList,
            view = new vispro.view.Descriptor();

        view.init({ model: descriptor });
        element.append(view.render().el);
        viewList.push(view);

        return this;            
    },

    show: function () {
        
        this.render();
        $(this.el).show();

        return this;
    },

    hide: function () {
        
        $(this.el).hide();
        
        return this;
    },

    enable: function () {
                
        $(this.el)
            .cover('disable');
        
        return this;
    },

    disable: function () {
        
        $(this.el)
            .cover('enable');
        
        return this;
    }
    
});