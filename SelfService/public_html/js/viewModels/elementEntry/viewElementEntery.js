define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'],

    function(oj, ko, $, app, commonUtil, services) {

        function ViewElementEnteryViewModel() {
            var self = this;

            self.isDisabled = ko.observable(true);
                    var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

         
            self.elementEnteryModel = {
                source_system_owner: ko.observable(""),
                source_system_id: ko.observable(""),
                effective_start_date: ko.observable(""),
                effective_end_date: ko.observable(""),
                element_name: ko.observable(""),
                legislative_data_group_name: ko.observable(""),
                assignment_number: ko.observable(""),
                entry_type: ko.observable(""),
                creator_type:ko.observable(""),
                name:rootViewModel.personDetails().displayName()
            };
                 ko.postbox.subscribe("viewElementObj", function (newValue) {
               self.elementEnteryModel.source_system_owner(newValue.source_system_owner);
              self.elementEnteryModel.source_system_id(newValue.source_system_id);
               self.elementEnteryModel.effective_start_date(newValue.effective_start_date);
               self.elementEnteryModel.effective_end_date(newValue.effective_end_date);
                self.elementEnteryModel.element_name(newValue.element_name);
               self.elementEnteryModel.legislative_data_group_name(newValue.legislative_data_group_name);
              self.elementEnteryModel.assignment_number(newValue.assignment_number);
               self.elementEnteryModel.entry_type(newValue.entry_type);
               self.elementEnteryModel.creator_type(newValue.creator_type);
                
        });
        
 self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));

            self.handleActivated = function(info) {
            
            };

            self.handleAttached = function(info) {
            };
            self.handleDetached = function(info) {

            };
           
           self.backAction = function() {
                oj.Router.rootInstance.go('elementEntrySummary');
            }      
        }
        return new ViewElementEnteryViewModel();
    });