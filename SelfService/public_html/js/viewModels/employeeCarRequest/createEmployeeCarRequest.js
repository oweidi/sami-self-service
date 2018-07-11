define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel', 'ojs/ojgauge','ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function createEmployeeCarRequest() {
        var self = this;

        self.currentColor = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.val = ko.observable("");
        self.data1 = ko.observableArray([]);
        self.isRequired = ko.observable(true);
        self.isOtherLocation = ko.observable(true);
        self.reqOtherLocation = ko.observable(false);
        this.specialistSummary = ko.observable("");//added
        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var gradeId = rootViewModel.personDetails().gradeId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.isDisabled2 = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.currentDate = ko.observable(formatDate(new Date()));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.insideOutsideUseList = ko.observableArray(rootViewModel.globalCarInsideLov());
        self.receiveLocationList = ko.observableArray(rootViewModel.globalReceiveLocationLov());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        this.specialistSummary = ko.observable("");//added
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        }
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.employeeCarRequestModel = {
            requestDate : ko.observable(self.currentDate()),
            reason : ko.observable(""),
            receiveDate : ko.observable(""),
            returnDate : ko.observable(""),
            receiveLocation : ko.observable(""),
            insideOutsideUse : ko.observable(""),
            remarks : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            createdBy : rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            personId : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT : ko.observable(""),
            IS_LINE_MANAGER : ko.observable("")
        };
        this.receiveLocationChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {
                if (data.value.toString() == "OTHERS") {
                    self.isOtherLocation(false);
                    self.reqOtherLocation(true);
                    self.employeeCarRequestModel.receiveLocation("");
                }
                else {
                    self.isOtherLocation(true);
                    self.reqOtherLocation(false);
                }
            }
        }
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
        };
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            var personNumber = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber();
            self.employeeCarRequestModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.employeeCarRequestModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.employeeCarRequestModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            self.employeeCarRequestModel.managerId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.employeeCarRequestModel, 11);
            },
            this);
        };
        self.handleDetached = function (info) {
            clearContent();
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
                self.isDisabled2(true);
            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
                self.isDisabled2(false);
            }

            return self.employeeCarRequest();
        };
        this.cancelAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryEmployeeCarRequestSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryEmployeeCarRequest');
            }
            //added
        }

        function addEmployeeCarRequest() {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                
                self.employeeCarRequestModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.employeeCarRequestModel.managerId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                if(self.employeeCarRequestModel.managerId()){
                    self.employeeCarRequestModel.IS_LINE_MANAGER('YES');
                }else{
                    self.employeeCarRequestModel.IS_LINE_MANAGER('NO');
                }
                self.employeeCarRequestModel.insideOutsideUse(self.employeeCarRequestModel.insideOutsideUse().toString());
                self.employeeCarRequestModel.receiveLocation(self.employeeCarRequestModel.receiveLocation().toString());
                var jsonData = ko.toJSON(self.employeeCarRequestModel);
                var addEmployeeCarRequestFn = function (data1) {
                    $.notify(self.notifyCreate(), "success");
                    if (self.specialistSummary() == 'true') {
                        oj.Router.rootInstance.go('summaryEmployeeCarRequestSpecialist');

                    }
                    else {
                        oj.Router.rootInstance.go('summaryEmployeeCarRequest');
                    }
                    //added
                };
                services.addEmployeeCarRequest(jsonData).then(addEmployeeCarRequestFn, app.failCbFn);
            }
        }

        this.submitButton = function () {
            self.employeeCarRequestModel.IS_DRAFT("NO");
            self.employeeCarRequestModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addEmployeeCarRequest();
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        //save draft
        this.submitDraft = function () {
            self.employeeCarRequestModel.IS_DRAFT("YES");
            self.employeeCarRequestModel.status("DRAFT");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitDraft = function (data, event) {
            addEmployeeCarRequest();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        /***function to clear table content after submit ***/
        function clearContent() {
            self.employeeCarRequestModel.reason("");
            self.employeeCarRequestModel.receiveDate("");
            self.employeeCarRequestModel.returnDate("");
            self.employeeCarRequestModel.receiveLocation("");
            self.employeeCarRequestModel.insideOutsideUse("");
            self.employeeCarRequestModel.remarks("");
        }
        //language support =========================
        self.ok = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.newBusinessTripDriverRequests = ko.observable();
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.pervious = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.employeeCarRequest = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.notifyCreate = ko.observable();
        self.position = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.saveDraft = ko.observable();
        self.placeholder = ko.observable();
        self.leave = ko.observable();
        self.leaveType = ko.observable();
        self.leaveSD = ko.observable();
        self.leaveED = ko.observable();
        self.comment = ko.observable();
        self.noLeaveRequests = ko.observable();

        self.reason = ko.observable();
        self.receiveDate = ko.observable();
        self.returnDate = ko.observable();
        self.receiveLocation = ko.observable();
        self.otherReceiveLocation = ko.observable();
        self.insideOutsideUse = ko.observable();
        self.remarks = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.noLeaveRequests(getTranslation("labels.noLeaveRequests"));
            self.leave(getTranslation("annualLeave.leave"));
            self.leaveType(getTranslation("annualLeave.leaveType"));
            self.leaveSD(getTranslation("annualLeave.leaveSD"));
            self.leaveED(getTranslation("annualLeave.leaveED"));
            self.comment(getTranslation("others.comment"));

            self.ok(getTranslation("others.ok"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.pervious(getTranslation("others.pervious"));
            self.next(getTranslation("others.next"));
            self.cancel(getTranslation("others.cancel"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.submit(getTranslation("others.submit"));
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.create(getTranslation("labels.create"));
            self.review(getTranslation("others.review"));
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]); 
            self.addMessage(getTranslation("car.addMessage"));
            self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.arabicName(getTranslation("identificationLetters.arabicName"));
            self.englishName(getTranslation("identificationLetters.englishName"));
            self.profession(getTranslation("identificationLetters.profession"));
            self.requestReason(getTranslation("identificationLetters.requestReason"));
            self.directTo(getTranslation("identificationLetters.directTo"));
            self.withSalary(getTranslation("identificationLetters.withSalary"));
            self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            self.mailType(getTranslation("identificationLetters.mailType"));
            self.employeeCarRequest(getTranslation("labels.employeeCarRequest"));
            self.notifyCreate(getTranslation("identificationLetters.notifyCreate"));
            self.position(getTranslation("common.position"));
            self.stamped(getTranslation("identificationLetters.stamped"));
            self.comment(getTranslation("others.comment"));
            self.saveDraft(getTranslation("labels.saveDraft"));
           self.placeholder(getTranslation("labels.placeHolder"));

            self.reason(getTranslation("labels.reason"));
            self.receiveDate(getTranslation("labels.receiveDate"));
            self.returnDate(getTranslation("labels.returnDate"));
            self.receiveLocation(getTranslation("labels.receiveLocation"));
            self.otherReceiveLocation(getTranslation("labels.otherReceiveLocation"));
            self.insideOutsideUse(getTranslation("labels.insideOutsideUse"));
            self.remarks(getTranslation("labels.remarks"));
        }
        //added
        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };
        self.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];

    }
    return new createEmployeeCarRequest();
});