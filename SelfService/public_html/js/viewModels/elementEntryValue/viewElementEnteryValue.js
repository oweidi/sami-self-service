define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'], function (oj, ko, $, app, commonUtil, services) {

    function ViewElementEnteryViewModel() {
        var self = this;

        self.isDisabled = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.elementEntryArray = ko.observableArray([]);

        var getElementEntryCbFn = (function (data) {
            $.each(data.items, function (index, val) {
                self.elementEntryArray.push( {
                    source_system_owner : val.source_system_owner, source_system_id : val.source_system_id, effective_start_date : val.effective_start_date, effective_end_date : val.effective_end_date, element_name : val.element_name, legislative_data_group_name : val.legislative_data_group_name, assignment_number : val.assignment_number, id : val.id, entry_type : val.entry_type, creator_type : val.creator_type

                });

            });
        });

        services.getElementEntry().then(getElementEntryCbFn, app.failCbFn);

        self.elementEnteryValueModel = {
            source_system_owner : ko.observable(""), source_system_id : ko.observable(""), effective_start_date : ko.observable(""), effective_end_date : ko.observable(""), element_name : ko.observable(""), legislative_data_group_name : ko.observable(""), assignment_no : ko.observable(""), input_value_name : ko.observable(""), screen_entery_value : ko.observable(""), element_entery_id : ko.observable(""), name : rootViewModel.personDetails().displayName()
        };
            self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        ko.postbox.subscribe("viewElementValueObj", function (newValue) {
            self.elementEnteryValueModel.source_system_owner(newValue.source_system_owner);
            self.elementEnteryValueModel.source_system_id(newValue.source_system_id);
            self.elementEnteryValueModel.effective_start_date(newValue.effective_start_date);
            self.elementEnteryValueModel.effective_end_date(newValue.effective_end_date);
            self.elementEnteryValueModel.element_name(newValue.element_name);
            self.elementEnteryValueModel.legislative_data_group_name(newValue.legislative_data_group_name);
            self.elementEnteryValueModel.assignment_no(newValue.assignment_no);
            self.elementEnteryValueModel.input_value_name(newValue.input_value_name);
            self.elementEnteryValueModel.screen_entery_value(newValue.screen_entery_value);
            self.elementEnteryValueModel.element_entery_id(newValue.element_entery_id + '');

        });

        self.handleActivated = function (info) {

        };

        self.handleAttached = function (info) {
        };
        self.handleDetached = function (info) {

        };

        self.backAction = function () {
            oj.Router.rootInstance.go('elementEntryValueSummary');
        }
    }
    return new ViewElementEnteryViewModel();
});