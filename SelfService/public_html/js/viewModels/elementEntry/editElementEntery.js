define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'], function (oj, ko, $, app, commonUtil, services) {

    function EditElementEnteryViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.editBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));

        self.elementEnteryModel = {
            id : ko.observable(), source_system_owner : ko.observable(""), source_system_id : ko.observable(""), effective_start_date : ko.observable(""), effective_end_date : ko.observable(""), element_name : ko.observable(""), legislative_data_group_name : ko.observable(""), assignment_number : ko.observable(""), entry_type : ko.observable(""), creator_type : ko.observable("")
        };
        ko.postbox.subscribe("editElementObj", function (newValue) 
        { 
       
           self.elementEnteryModel.id(newValue.id);
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
        self.handleActivated = function (info) {
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
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

        self.stepArray = ko.observableArray([
        {
            label : 'Edit', id : 'stp1'
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

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);

            }

            return ($("#train").ojTrain("getStep", self.currentStepValue())).label;
        };

        self.commitRecord = function (data, event) {
            editElmentRecord();
            return true;
        }
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        this.cancelAction = function () {
            oj.Router.rootInstance.go('elementEntrySummary');
        }
        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        function editElmentRecord() {
            var jsonData = ko.toJSON(self.elementEnteryModel);
            var editElementgCbFn = function (data) {
                $.notify("Element Entry Request Edited", "success");
                oj.Router.rootInstance.go('elementEntrySummary');
            };
            services.editElementEntry(jsonData).then(editElementgCbFn, app.failCbFn);
        }

        function clearContent() {
            self.elementEnteryModel.source_system_owner("");
            self.elementEnteryModel.source_system_id("");
            self.elementEnteryModel.effective_start_date("");
            self.elementEnteryModel.effective_end_date("");
            self.elementEnteryModel.element_name("");
            self.elementEnteryModel.legislative_data_group_name("");
            self.elementEnteryModel.assignment_number("");
            self.elementEnteryModel.entry_type("");
            self.elementEnteryModel.creator_type("");
        }

    }
    return new EditElementEnteryViewModel();
});