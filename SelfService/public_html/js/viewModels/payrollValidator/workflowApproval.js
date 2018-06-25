define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 
        'ojs/ojarraydataprovider', 'knockout-mapping', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 
        'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 
        'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog','ojs/ojcheckboxset','ojs/ojmodel','ojs/ojlabel',
        'ojs/ojflattenedtreedatagriddatasource', 'ojs/ojjsontreedatasource', 'ojs/ojrowexpander','ojs/ojdatagrid'], 
function (oj, ko, $, app, commonUtil, services, postbox, km) {

    function workflowApproval() {
        var self = this;
        var options = [];
        var editedJson = [];
        this.dataProvider = ko.observable();
        this.selectVal = ko.observable('');
        self.datasource = ko.observable();
                self.positions = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

        // function to determine which renderer to use for 
        // rendering depending on mode
        self.rowRenderer = function(context)
        {
            var mode = context['rowContext']['mode'];
            
            if (mode === 'edit')
            {
                return oj.KnockoutTemplateUtils.getRenderer('row_template_editable', true)(context);
            }
            else if (mode === 'navigation')
            {
                return oj.KnockoutTemplateUtils.getRenderer('row_template', true)(context);
            }
        };
        
        
        self.beforeRowEditEndListener = function(event)
        {
            var data = event.detail;
            var rowIdx = data.rowContext.status.rowIndex;
            self.datasource().at(rowIdx).then(function(rowObj)
            {
                editedJson.push(rowObj['data']);
            });
            return oj.DataCollectionEditUtils.basicHandleRowEditEnd(event, data);
        }
        
          var getEmployeePayrollCBFN = function (data) {
               
                 self.positions(jQuery.parseJSON(data));
                 
                console.log(self.positions());
                 
            }
        services.getAllPositions().then(getEmployeePayrollCBFN, app.failCbFn);
        this.dataProvider = new oj.ArrayDataProvider(self.positions(), {idAttribute: 'value'});
        function  getWorkflowApprovalPAAS(data) {
            console.log(data);
            var wholeJSon = [];
            var attr = {};
            var children = [];
            $.each(data.items, function (index, val) {
                
                
                if((val.step_level == 0 || index == (data.items.length - 1))) {
                    if(index != 0) 
                    wholeJSon.push( {
                                  "attr": attr ,
                                  "children": children

                   }); 
                    attr = {};
                    children = [];
                    attr.id =index;
                    attr.service_type =  val.service_type;
                    attr.notification_type =  '';
                    attr.role_id =  '';
                    attr.step_level = '';
                   
                }
                var childAttr = {};
                childAttr.id = val.id ;
                childAttr.service_type= '';
                childAttr.notification_type =val.notification_type;
                childAttr.role_id = val.role_id;
                childAttr.step_level = val.step_level;
                children.push( {
                           "attr": childAttr        
                   });
                  
                   
              //  self.data.push( {
                   

                //});
            });
            console.log(wholeJSon);
            json = wholeJSon;
            self.datasource(new oj.FlattenedTreeTableDataSource(
                            new oj.FlattenedTreeDataSource(
                                new oj.JsonTreeDataSource(json), options)));
        }
        services.getWorkflowApprovalPAAS().then(getWorkflowApprovalPAAS, app.failCbFn);
        
              
            
        this.submitButton = function () {
            
            document.querySelector("#yesNoDialog").open();
        };
        
         self.commitRecord = function (data, event) {
            console.log(editedJson);
            function  getWorkflowApprovalPAAS(data1) {
                
            }
            services.updateWorkflowApprovalPAAS(editedJson).then(getWorkflowApprovalPAAS, app.failCbFn);
            return true;
        }
        
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
    }
        

    return new workflowApproval();

});