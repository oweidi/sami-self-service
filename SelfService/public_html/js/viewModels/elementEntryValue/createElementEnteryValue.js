define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'], function (oj, ko, $, app, commonUtil, services) {

    function CreateElementEnteryValueViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.elementEntryArray = ko.observableArray([]);

        var getElementEntryCbFn = (function (data) {
            $.each(data.items, function (index, val) {
                self.elementEntryArray.push( {
                    source_system_owner : val.source_system_owner, source_system_id : val.source_system_id, effective_start_date : val.effective_start_date, effective_end_date : val.effective_end_date, element_name : val.element_name, legislative_data_group_name : val.legislative_data_group_name, assignment_number : val.assignment_number, id : val.id, entry_type : val.entry_type, creator_type : val.creator_type

                });

            });
        });

        services.getElementEntry().then(getElementEntryCbFn, app.failCbFn);

        self.elementEnteryModel = {
            source_system_owner : ko.observable(""), source_system_id : ko.observable(""), effective_start_date : ko.observable(""), effective_end_date : ko.observable(""), element_name : ko.observable(""), legislative_data_group_name : ko.observable(""), assignment_number : ko.observable(""), entry_type : ko.observable(""), creator_type : ko.observable(""), name : rootViewModel.personDetails().displayName()
        };
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.elementEnteryValueModel = {
            id : ko.observable(), element_entery_id : ko.observable(""), source_system_owner : ko.observable(""), source_system_id : ko.observable(""), effective_start_date : ko.observable(""), effective_end_date : ko.observable(""), element_name : ko.observable(""), legislative_data_group_name : ko.observable(""), assignment_no : ko.observable(""), input_value_name : ko.observable(""), screen_entery_value : ko.observable("")
        };

        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            clearContent();

        };

        self.handleAttached = function (info) {
            self.currentStepValue('stp1');

        };
        self.handleDetached = function (info) {

        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray([
        {
            label : 'Create', id : 'stp1'
        },
        {
            label : 'Review', id : 'stp2'
        }
]);

        this.previousStep = function () {
            var prev = $("#train").ojTrain("previousSelectableStep");
            if (prev != null)
                self.currentStepValue(prev);
        }

        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            var next = $("#train").ojTrain("nextSelectableStep");
            if (next != null)
                self.currentStepValue(next);
        }

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return ($("#train").ojTrain("getStep", self.currentStepValue())).label;
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addElmentValueRecord();
            return true;
        }

        this.cancelAction = function () {
            oj.Router.rootInstance.go('elementEntryValueSummary');
        }

        function addElmentValueRecord() {
            self.elementEnteryValueModel.element_entery_id(self.elementEnteryValueModel.element_entery_id()[0]);
            var jsonData = ko.toJSON(self.elementEnteryValueModel);
            var addElementValuegCbFn = function (data) {
                $.notify("Element Entry Value Request Sent", "success");
                oj.Router.rootInstance.go('elementEntryValueSummary');
            };
            services.addElementEntryValue(jsonData).then(addElementValuegCbFn, app.failCbFn);
        }

        function clearContent() {
            self.elementEnteryValueModel.source_system_owner("");
            self.elementEnteryValueModel.source_system_id("");
            self.elementEnteryValueModel.effective_start_date("");
            self.elementEnteryValueModel.effective_end_date("");
            self.elementEnteryValueModel.element_name("");
            self.elementEnteryValueModel.legislative_data_group_name("");
            self.elementEnteryValueModel.assignment_no("");
            self.elementEnteryValueModel.input_value_name("");
            self.elementEnteryValueModel.screen_entery_value("");
            self.elementEnteryValueModel.element_entery_id("");

        }

    }
    return new CreateElementEnteryValueViewModel();
});