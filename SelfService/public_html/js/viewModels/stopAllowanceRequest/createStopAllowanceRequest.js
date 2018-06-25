define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function CreateStopAllowanceRequestContentViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        var personId = rootViewModel.personDetails().personId();
        //        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        //        var managerId = rootViewModel.personDetails().managerId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.current = ko.observable();
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.disableSubmit = ko.observable(false);
        self.disableNext = ko.observable(false);
        self.isNoData = ko.observable(true);
        this.specialistSummary = ko.observable("");//added
        self.allowanceTypeList = ko.observableArray([]);
        //ko.observableArray(rootViewModel.globalEmployeeAllowance());
        self.mobileAllowance = ko.observable(rootViewModel.personDetails().mobileAllowance());
        self.carAllowance = ko.observable(rootViewModel.personDetails().carAllowance());
        self.transportationAlowance = ko.observable(rootViewModel.personDetails().transportationAlowance());
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        self.stopAllowanceRequestModel = {
            managerId : rootViewModel.specialistSelectedEmployee().ManagerId,
            requestDate : ko.observable(self.formatDate(new Date())),
            allowanceType : ko.observable(""), 
            mobileAllowance : ko.observable(""),
            carAllowance : ko.observable(""),
            transportationAlowance : ko.observable(""),
            stoppingDate : ko.observable(""),
            reason : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            createdBy : rootViewModel.personDetails().personNumber(),
            personNumber : rootViewModel.specialistSelectedEmployee().PersonNumber,
            personId : rootViewModel.specialistSelectedEmployee().PersonId
        };

        //        ko.postbox.subscribe("creatStopAllowanceObj", function (data) {
        //            self.stopAllowanceRequestModel.carAllowance(data.carAllowance);
        //            self.stopAllowanceRequestModel.mobileAllowance(data.mobileAllowance);
        //            self.stopAllowanceRequestModel.transportationAlowance(data.transportationAlowance);
        //
        //        });
        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };
        this.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];

        //
        self.now = new Date();
        if (self.now.getDate() == 1) {
            self.current = self.formatDate(new Date());
        }
        else {
            if (self.now.getMonth() == 11) {
                self.current = self.formatDate(new Date(self.now.getFullYear() + 1, 0, 1));
            }
            else {
                self.current = self.formatDate(new Date(self.now.getFullYear(), self.now.getMonth() + 1, 1));
            }
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };
        self.handleDeactivated = function (info) {
            clearContent();

        }

        self.handleAttached = function (info) {
            services.getEmpDetailsbyPersonId(rootViewModel.specialistSelectedEmployee().PersonId, "", "").then(function (data) {
                //        services.getEmpDetailsbyPersonId(rootViewModel.specialistSelectedEmployee().PersonId, "", "").then(function (data) {
                self.allowanceTypeList([]);
                var documents = jQuery.parseJSON(data);
                if (documents.mobileAllowance == "Y") {
                    self.allowanceTypeList.push( {
                        "value" : "mobileAllowance", "label" : "Mobile Allowance"
                    });
                }
                if (documents.carAllowance == "Y") {
                    self.allowanceTypeList.push( {
                        "value" : "carAllowance", "label" : "Car Allowance"
                    });
                }
                if (documents.transportationAlowance == "CASH") {
                    self.allowanceTypeList.push( {
                        "value" : "transportationAlowance", "label" : "Transportation Alowance"
                    });
                }
                if (!(self.allowanceTypeList().length > 0)) {
                    self.isNoData(false);
                    self.disableNext(true);
                }

                //                self.bTripDriverModel.managerOfManager(documents.managerId);
            });
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            //addded
//            self.stopAllowanceRequestModel.managerId(rootViewModel.specialistSelectedEmployee().ManagerId);
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                //  self.label = ko.observable({text: self.progressValue(), style: {color:'white'}});
                return precantageOField(self.stopAllowanceRequestModel, 9);
            },
            this);
        };
        self.handleDetached = function (info) {
            rootViewModel.specialistSelectedEmployee(" ");
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray([]);

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

            return self.stopAllowanceRequest();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addStopAllowanceRequestRecord();
            return true;
        }

        this.cancelAction = function () {
            //            oj.Router.rootInstance.go('personSearch');
            if (oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
            }
        }

        function addStopAllowanceRequestRecord() {
            if (!self.disableSubmit()) {
                self.disableSubmit(true);
            }

            self.stopAllowanceRequestModel.allowanceType(self.stopAllowanceRequestModel.allowanceType().toString());

            var jsonData = ko.toJSON(self.stopAllowanceRequestModel);
            var addStopAllowanceRequestCbFn = function (data) {
                $.notify(self.notifyCreate(), "success");
                //                oj.Router.rootInstance.go('personSearch');
                if (oj.Router.rootInstance._navHistory.length > 1) {
                    oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
                }
                self.disableSubmit(false);
            };
            services.addStopAllowanceRequest(jsonData).then(addStopAllowanceRequestCbFn, app.failCbFn);
        }
        //
        //added
        /*function to clear table content after submit*/
        function clearContent() {
            rootViewModel.specialistSelectedEmployee(" ");
            self.stopAllowanceRequestModel.carAllowance("");
            self.stopAllowanceRequestModel.mobileAllowance("");
            self.stopAllowanceRequestModel.transportationAlowance("");
            self.stopAllowanceRequestModel.stoppingDate("");
            self.stopAllowanceRequestModel.reason("");
        }

        //language support =========================
        self.submit = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.back = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.yes = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.ok = ko.observable();
        self.employeeAllowance = ko.observable();
        self.requestDate = ko.observable();
        self.allowanceType = ko.observable();
        self.reason = ko.observable();
        self.stoppingDate = ko.observable();
        self.next = ko.observable();
        self.placeholder = ko.observable();
        self.stopAllowanceRequest = ko.observable();
        self.notifyCreate = ko.observable();
        self.noEmployeeAllowance = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.noEmployeeAllowance(getTranslation("labels.noEmployeeAllowance"));

            self.submit(getTranslation("others.submit"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.back(getTranslation("others.pervious"));
            self.next(getTranslation("others.next"));
            self.cancel(getTranslation("others.cancel"));
            self.create(getTranslation("labels.create"));
            self.review(getTranslation("others.review"));
            self.placeholder(getTranslation("labels.placeHolder"));
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.employeeAllowance(getTranslation("labels.employeeAllowanceRequest"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.stoppingDate(getTranslation("stopAllowance.stoppingDate"));
            self.stopAllowanceRequest(getTranslation("stopAllowance.stopAllowanceRequest"));
            self.notifyCreate(getTranslation("stopAllowance.notifyCreate"));
            self.addMessage(getTranslation("stopAllowance.addMessage"));
        }

    }
    return new CreateStopAllowanceRequestContentViewModel();
});