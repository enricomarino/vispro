vispro.view.App = Backbone.View.extend({

    el: $(
        'body'
    ),

    template: _.template(
        '<div id="panel-north" class="ui-layout-north"> \n' +
        '    <div id="panel-north-north" class="ui-layout-north"></div> \n' + 
        '    <div id="panel-north-center" class="ui-layout-center"></div> \n' +
        '</div> \n' +

        '<div id="panel-west" class="panel ui-layout-west"></div> \n' + 

        '<div id="panel-center" class="ui-layout-center"> \n' +
        '    <div id="panel-center-north" class="ui-layout-north"></div> \n' +
        '    <div id="panel-center-center" class="ui-layout-center"></div> \n' +
        '</div> \n' +

        '<div id="panel-east" class="ui-layout-east"> \n' + 
        '    <div id="panel-east-north" class="panel ui-layout-north"></div> \n' + 
        '    <div id="panel-east-center" class="panel ui-layout-center"></div> \n' +
        '</div>'
    ),

    initialize: function (attributes, options) {

        var element = this.el,
            template = this.template,
            model = options.model,
            workspace = model.workspace,
            views = {};

        element
            .html(template())
            .layout({ 
                north__size: 40,
                north__closable: false, 
                north__resizable: false,
                north__spacing_open: 0,
                west__spacing_open: 0,
                east__spacing_open: 0
            });
        
        panel_north = element.find('#panel-north');
        panel_north_north = element.find('#panel-north-north');
        panel_north_center = element.find('#panel-north-center');
        panel_west = element.find('#panel-west');
        panel_center = element.find('#panel-center');
        panel_center_north = element.find('#panel-center-north');
        panel_center_center = element.find('#panel-center-center');
        panel_east = element.find('#panel-east');
        panel_east_north = element.find('#panel-east-north');
        panel_east_center = element.find('#panel-east-center');
        
        panel_north.layout({
            north__closable: false, 
            north__resizable: false,
            north__spacing_open: 0
        });
        
        panel_east.layout({
            north__size: .4,
            center__spacing_open: 2
        });
        
        panel_center.layout({
            north__size: 40,
            north__closable: false, 
            north__resizable: false,
            north__spacing_open: 0
        });

        views.descriptorList = new vispro.view.DescriptorList({}, { 
            model: workspace,
            root: panel_west
        });
        
        views.workspaceBar = new vispro.view.WorkspaceBar({}, { 
            model: workspace,
            root: panel_north_center
        });

        views.widgetBarList = new vispro.view.WidgetBarList({}, {
            model: workspace,
            root: panel_center_north
        });

        views.workspace = new vispro.view.Workspace({}, { 
            model: workspace,
            root: panel_center_center
        });

        views.linkerLayer = new vispro.view.WidgetLinkerLayer({}, { 
            model: workspace,
            root: panel_center_center
        });
        
        views.code = new vispro.view.Code({}, { 
            model: workspace,
            root: panel_center_center
        });

        views.labelList = new vispro.view.LabelList({}, { 
            model: workspace,
            root: panel_east_north
        });

        views.inspectorList = new vispro.view.InspectorList({}, { 
            model: workspace,
            root: panel_east_center
        });

        $.beautyOfCode.init({
            brushes: ['Xml', 'JScript', 'Plain', 'Css']
        });

        this.views = views;
        this.model = model;

        return this;
    }

});