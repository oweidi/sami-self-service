define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services) {

    function editChildrenEductionExpenseViewModel () {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.isDisabled2 = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");   
        this.specialistSummary = ko.observable("");
        self.editResubmitBtnVisible = ko.observable(false);
        this.disableSubmit = ko.observable(false);
        this.selectedRejoinDate = ko.observable("");
        this.selectedEndDate = ko.observable("");//added
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();


            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.returnAfterLeaveModel = {
            id : ko.observable(""),
            requestDate : ko.observable(""), 
            leave : ko.observable(""),
            leaveType : ko.observable(""),
            leaveStartDate : ko.observable(""),
            rejoinDate : ko.observable(""),
            leaveEndDate : ko.observable(""),
            daysAfterRejoin : ko.observable(""),
            comments : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            updatedBy:rootViewModel.personDetails().personNumber(),
            updateDate:ko.observable(new Date()),          
            personNumber : ko.observable(""), 
            personId : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT : ko.observable("")
        };
        ko.postbox.subscribe("editReturnAfterLeaveObj", function (newValue) {
            self.returnAfterLeaveModel.id(newValue.id);
            self.returnAfterLeaveModel.requestDate(newValue.request_date);
            self.returnAfterLeaveModel.leave(newValue.leave);
            self.returnAfterLeaveModel.leaveType(newValue.leave_type);
            self.returnAfterLeaveModel.leaveStartDate(newValue.leave_start_date);
            self.returnAfterLeaveModel.rejoinDate(newValue.rejoin_date);
            self.returnAfterLeaveModel.leaveEndDate(newValue.leave_end_date);
            self.returnAfterLeaveModel.daysAfterRejoin(newValue.days_after_rejoin);
            self.returnAfterLeaveModel.comments(newValue.comments);
            self.returnAfterLeaveModel.managerId(newValue.manager_id);
            self.returnAfterLeaveModel.personId(newValue.person_id);
            self.returnAfterLeaveModel.name(newValue.name);
            var statusDraft = newValue.status;
            if(statusDraft =='Draft' || statusDraft == 'مسودة'){
                self.editResubmitBtnVisible(true);
            }else{
                    self.editResubmitBtnVisible(false);
            }   
        });

        self.handleActivated = function (info) {

            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            self.currentStepValue('stp1');
            initTranslations();
        };
        
        self.handleDetached = function (info) {
          clearContent();
        };

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
                            //Rejoin Date Cannot Be Before Vacation Start Date Validation
            if(self.returnAfterLeaveModel.leaveStartDate() > self.returnAfterLeaveModel.rejoinDate()){
                  $.notify(self.leaveStartValidation(), "error");
                                  self.returnAfterLeaveModel.daysAfterRejoin("");

                  return;
            }
            //
           else if((self.returnAfterLeaveModel.leaveEndDate() > self.returnAfterLeaveModel.rejoinDate())){
                             $.notify(self.daysAfterRejoinValidate(), "error");
                                  return;
            }
            else if(self.returnAfterLeaveModel.daysAfterRejoin() > 1){
                $.notify(self.daysAfterRejoinNoValidate(), "error");
                                  return;
            }
            //

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
            return self.returnAfterLeaveRequest();
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }
        
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
            
             //save draft
        this.draftButton = function () {
            self.returnAfterLeaveModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editReturnAfterLeaveModel();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function (data, event) {
            editReturnAfterLeaveModel();
            return true;
        }//added
        this.cancelAction = function () {
            self.clickedButton("");
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryReturnAfterLeave');
                }//added
        }

        function editReturnAfterLeaveModel () {
            if(!self.disableSubmit()) {
                             self.disableSubmit(true);    
                    }
                var jsonData = ko.toJSON(self.returnAfterLeaveModel);
                var editReturnAfterLeaveCbFn = function (data) {
                    $.notify(self.notifyEdit(), "success");
                   if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryReturnAfterLeave');
                    }//added
                    self.disableSubmit(false); 
                };
                services.editReturnAfterLeave(jsonData).then(editReturnAfterLeaveCbFn, app.failCbFn);
        }

        function clearContent() {
            self.returnAfterLeaveModel.daysAfterRejoin("");
            self.returnAfterLeaveModel.comments("");
        }
        
                ///function to comupte day after rejoin/////
        function computeNumofDays() {
            if (self.selectedRejoinDate() != '' && self.returnAfterLeaveModel.leaveEndDate() != '' ) {
                var rejoinDate = self.selectedRejoinDate();
                var leaveEndDate = self.returnAfterLeaveModel.leaveEndDate();
                if (leaveEndDate && rejoinDate) {
                    if(leaveEndDate > rejoinDate){
                    self.returnAfterLeaveModel.daysAfterRejoin("");                            
                    }
                    else{
                    var rejoin = new Date(rejoinDate.split('-')[1] + "/" + rejoinDate.split('-')[2] + "/" + rejoinDate.split('-')[0]);
                    var end = new Date(leaveEndDate.split('-')[1] + "/" + leaveEndDate.split('-')[2] + "/" + leaveEndDate.split('-')[0]);
                    var timeDiff = Math.abs(rejoin.getTime() - end.getTime());                    
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    self.returnAfterLeaveModel.daysAfterRejoin( + diffDays +  + 1);
                    }
                }
            }
        }
        //-----End Function--//
        //-----rejoinDate and endDate handler----//
        this.rejoinDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value ) {
                    self.selectedRejoinDate(data.value);
                    computeNumofDays();
            }
        }
         this.endDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value ) {
                    self.selectedEndDate(data.value);
                    computeNumofDays();
            }
        }
        //-------------//
        ///////////end//////

       //language support =========================
            self.ok = ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.startdate=ko.observable();
            self.requestDate=ko.observable();
            self.enddate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.notifyEdit= ko.observable();
            self.placeholder = ko.observable();
            self.saveDraft = ko.observable();      
            
            self.leave = ko.observable();
            self.leaveType = ko.observable();
            self.leaveSD = ko.observable();
            self.leaveED = ko.observable();
            self.daysAfterRejoin = ko.observable();
            self.rejoinDate = ko.observable();
            self.comment = ko.observable();
            self.leaveStartValidation = ko.observable();
            self.daysAfterRejoinValidate = ko.observable();
            self.daysAfterRejoinNoValidate = ko.observable();
            self.returnAfterLeaveRequest = ko.observable();

            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.ok(getTranslation("others.ok"));
           self.startdate(getTranslation("labels.startdate"));
           self.enddate(getTranslation("labels.enddate"));
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
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
           self.placeholder(getTranslation("labels.placeholder"));
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.saveDraft(getTranslation("labels.saveDraft"));
            
            self.rejoinDate(getTranslation("returnAfterLeave.rejoinDate"));            
            self.leave(getTranslation("returnAfterLeave.leave"));
            self.leaveType(getTranslation("returnAfterLeave.leaveType"));
            self.leaveSD(getTranslation("returnAfterLeave.leaveSD"));
            self.leaveED(getTranslation("returnAfterLeave.leaveED"));
            self.daysAfterRejoin(getTranslation("returnAfterLeave.daysAfterRejoin"));
            self.leaveStartValidation(getTranslation("returnAfterLeave.leaveStartValidation"));
            self.daysAfterRejoinValidate(getTranslation("returnAfterLeave.daysAfterRejoinValidate"));
            self.daysAfterRejoinNoValidate(getTranslation("returnAfterLeave.daysAfterRejoinNoValidate"));  
            self.editMessage (getTranslation("returnAfterLeave.editMessage"));
            self.returnAfterLeaveRequest(getTranslation("pages.returnAfterLeave"));
            self.notifyEdit(getTranslation("returnAfterLeave.notifyEdit"));           
            self.comment(getTranslation("others.comment")); 
            
        }//added
            
    }

    return new editChildrenEductionExpenseViewModel ();
});