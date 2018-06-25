define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel', 'ojs/ojgauge', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function createAdvancedAnnualLeave() {
        var self = this;

        self.currentColor = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.val = ko.observable("");
        self.data1 = ko.observableArray([]);
        self.isLeave = ko.observable(true);
        self.disableNext = ko.observable(false);
        self.isRequired = ko.observable(true);
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
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        self.PayrollRunExis = ko.observable("");
        self.leaveArray = ko.observableArray([]);
        var leaveData;
        this.specialistSummary = ko.observable("");//added
           self.leaveArray =ko.observableArray([{
                "value": '',
                "label": ''
            }]);
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
        self.advancedAnnualLeaveModel = {
            requestDate : self.currentDate(),
            leave : ko.observable(""),
            leaveType : ko.observable(""), 
            leaveSD : ko.observable(""), 
            leaveED : ko.observable(""),
            commment : ko.observable(""), 
            status : ko.observable(""),
            personNumber : ko.observable(""), 
            name : ko.observable(""), 
            createdBy : rootViewModel.personDetails().personNumber(), 
            personId : ko.observable(""),
            managerId : ko.observable(""), 
            IS_DRAFT : ko.observable("")
        };
        var getAdvancedAnnualLeaveReportFn = function (data) {
                   self.leaveArray([]);
            if (data) {
            self.leaveArray([]);
                var jsonData = jQuery.parseJSON(data); 
                leaveData=jsonData;
                if(jsonData.constructor === Array){                    
//                  self.advancedAnnualLeaveModel.leave(jsonData.LEAVE);
//                    self.advancedAnnualLeaveModel.leaveType(jsonData.LEAVE_TYPE);
//                    self.advancedAnnualLeaveModel.leaveSD(jsonData.START_DATE);
//                    self.advancedAnnualLeaveModel.leaveED(jsonData.END_DATE);
                    $.each(jsonData, function (index, val) {
                        self.leaveArray.push({
                        value : jsonData.LEAVE, label :jsonData.LEAVE
                           });
                        })                                        
                }else {
                        self.leaveArray.push({
                        value : jsonData.LEAVE, label :jsonData.LEAVE
                           });
   
                    
                }
            }
            else {
                self.isLeave(false);
                self.disableNext(true);
            }
        };
                     self.leaveChangedHandler = function (event, data2) {
            if (data2.option == 'value' && data2.value[0] !=null) {
                    self.advancedAnnualLeaveModel.leaveType(leaveData.LEAVE_TYPE);
                    self.advancedAnnualLeaveModel.leaveSD(formatDate(new Date(leaveData.START_DATE)));
                    self.advancedAnnualLeaveModel.leaveED(formatDate(new Date(leaveData.END_DATE)));
            
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
            //addded
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.advancedAnnualLeaveModel, 11);
            },
            this);
            self.advancedAnnualLeaveModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.advancedAnnualLeaveModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.advancedAnnualLeaveModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            self.advancedAnnualLeaveModel.managerId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            
            services.getAdvancedAnnualLeaveReport(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvancedAnnualLeaveReportFn, app.failCbFn);

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

            return self.advancedAnnualLeave();
        };
        this.cancelAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryAdvancedAnnualLeaveSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryAdvancedAnnualLeave');
            }
            //added
        }

        function addAdvancedAnnualLeave() {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.advancedAnnualLeaveModel.leave(self.advancedAnnualLeaveModel.leave()[0]); 
                var jsonBody = ko.toJSON(self.advancedAnnualLeaveModel);
                var jsonBody2 = jQuery.parseJSON(ko.toJSON(self.advancedAnnualLeaveModel));
                jsonBody2.periodicity = "Periodicity";
                jsonBody2.fullTimeEquivalent = "No";
                jsonBody2.SSType = "AAL";
                var FirstInstallmentDate = stringToDate(self.advancedAnnualLeaveModel.leaveED(),"dd/MM/yyyy","/");
                if(self.PayrollRunExis() == null || self.PayrollRunExis == ""){
                    jsonBody2.FirstInstallmentDate = FirstInstallmentDate.getDate()+1;
                }else{
                    jsonBody2.FirstInstallmentDate = FirstInstallmentDate.getDate();
                }
                var AdvancedPaymentDate = stringToDate(self.advancedAnnualLeaveModel.leaveSD(),"dd/MM/yyyy","/");
                jsonBody2.AdvancedPaymentDate = FirstInstallmentDate.getDate();
                
                var addadvancedAnnualLeaveFn = function (data1) {
                                jsonBody2.trsId =data1.REQUEST_ID; 
                                var submitElement = function (data) {
                                    };
                    services.submitElementEntry(jsonBody2).then(submitElement, app.failCbFn);
                    $.notify(self.notifyCreate(), "success");
                    if (self.specialistSummary() == 'true') {
                        oj.Router.rootInstance.go('summaryAdvancedAnnualLeaveSpecialist');
                    }
                    else {
                        oj.Router.rootInstance.go('summaryAdvancedAnnualLeave');
                    }
                    //added
                };
                services.addAdvancedAnnualLeave(jsonBody).then(addadvancedAnnualLeaveFn, app.failCbFn);
            }
        }
        function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

        this.submitButton = function () {
            self.advancedAnnualLeaveModel.IS_DRAFT("NO");
            self.advancedAnnualLeaveModel.status("APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addAdvancedAnnualLeave();
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        //save draft
        this.submitDraft = function () {
            self.advancedAnnualLeaveModel.IS_DRAFT("YES");
            self.advancedAnnualLeaveModel.status("DRAFT");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitDraft = function (data, event) {
            addAdvancedAnnualLeave();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
                //--------------------Selection Change Handler Section ---------------------------

        /***function to clear table content after submit ***/
        function clearContent() {
            self.advancedAnnualLeaveModel = {};
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
        self.pervious = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.advancedAnnualLeave = ko.observable();
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
            self.addMessage(getTranslation("annualLeave.addMessage"));
            self.comment(getTranslation("others.comment"));

            self.ok(getTranslation("others.ok"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.approvals(getTranslation("labels.approvals"));
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
            self.advancedAnnualLeave(getTranslation("pages.advancedAnnualLeave"));
            self.notifyCreate(getTranslation("annualLeave.notifyCreate"));
            self.saveDraft(getTranslation("labels.saveDraft"));
            self.placeholder(getTranslation("labels.placeholder"));
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
    return new createAdvancedAnnualLeave();
});