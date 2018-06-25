define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function CreateElementEnteryViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);

        this.elementEnteryModel = {
            source_system_owner : ko.observable(""), source_system_id : ko.observable(""), effective_start_date : ko.observable(""), effective_end_date : ko.observable(""), element_name : ko.observable(""), legislative_data_group_name : ko.observable(""), assignment_number : ko.observable(""), entry_type : ko.observable(""), creator_type : ko.observable("")
            //           
        };

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
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

        self.stepArray = ko.observableArray( 
                         [{label : 'Create', id : 'stp1'},
                          {label : 'Review', id : 'stp2'}]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }

        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            var next = document.getElementById("train").getNextSelectableStep();
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

            return "Element Entry";
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addElmentRecord();
            return true;
        }

        this.cancelAction = function () {
            oj.Router.rootInstance.go('elementEntrySummary');
        }

        function addElmentRecord() {
            var jsonData = ko.toJSON(self.elementEnteryModel);
            var addElementgCbFn = function (data) {
                $.notify("Element Entry Request Sent", "success");
                oj.Router.rootInstance.go('elementEntrySummary');
            };
            services.addElementEntry(jsonData).then(addElementgCbFn, app.failCbFn);
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
    return new CreateElementEnteryViewModel();
});