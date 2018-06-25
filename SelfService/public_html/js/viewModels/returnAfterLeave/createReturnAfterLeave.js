define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 
'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset',
'ojs/ojradioset', 'ojs/ojlabel','ojs/ojgauge', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {
        function createReturnAfterLeaveModel () {
            var self = this;            
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            this.val = ko.observable("");
            self.isRequired = ko.observable(true);
            this.specialistSummary = ko.observable("");
            self.isLeave = ko.observable(false);
            self.disableNext = ko.observable(false);
            var managerId = rootViewModel.personDetails().managerId();
            var personId = rootViewModel.personDetails().personId();
            var gradeId = rootViewModel.personDetails().gradeId();
            self.currentStepValue = ko.observable('stp1');
            self.tracker = ko.observable();
            self.isDisabled = ko.observable(false);
            self.isDisabled2 = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.currentDate=ko.observable(formatDate(new Date()));
            this.selectedRejoinDate = ko.observable("");
            this.selectedEndDate = ko.observable("");
            self.nextBtnVisible = ko.observable(true);
            self.clickedButton = ko.observable("");
            this.specialistSummary = ko.observable("");
            self.columnArrayApproval = ko.observableArray([]);
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);
            this.disableSubmit = ko.observable(false);//added

            function formatDate(date) {
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }

        self.progressValue=ko.computed(function() {
                return 0;
    }, this);
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
                                            
        self.returnAfterLeaveModel = {
            requestDate : self.currentDate(), 
            leave : ko.observable(""),
            leaveType : ko.observable(""),
            leaveStartDate : ko.observable(""),
            rejoinDate : ko.observable(self.currentDate()),
            leaveEndDate : ko.observable(""),
            daysAfterRejoin : ko.observable(""),
            comments : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            createdBy : rootViewModel.personDetails().personNumber(),
            creationDate : self.currentDate(),
            personNumber : ko.observable(""), 
            personId : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT : ko.observable(""),
            assignmentStatus: ko.observable("")
        };

            self.handleActivated = function(info) {
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');
            };

            self.handleAttached = function(info) {
                var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }//addded            
            self.currentStepValue('stp1');
            
            services.getAdvancedAnnualLeaveReport(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvancedAnnualLeaveReportFn, app.failCbFn);
            
            self.returnAfterLeaveModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.returnAfterLeaveModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.returnAfterLeaveModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());                        
            self.returnAfterLeaveModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());               
            self.returnAfterLeaveModel.assignmentStatus(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().AssignmentStatusTypeId : rootViewModel.personDetails().assignmentStatusTypeId());  //assignment status            

             initTranslations();
             
            self.progressValue = ko.computed(function () {
                return precantageOField(self.returnAfterLeaveModel,6);
            },
            this);
            };
            self.handleDetached = function(info) {
                clearContent();
            };

            this.stopSelectListener = function(event, ui) {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!self._showComponentValidationErrors(trackerObj)) {
                    event.preventDefault();
                    return;
                }
            }

            self.stepArray = ko.observableArray([]);

            this.previousStep = function() {
                var prev = document.getElementById("train").getPreviousSelectableStep();
                if (prev != null)
                    self.currentStepValue(prev);
            }
    
            this.nextStep = function() {
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
        
            self._showComponentValidationErrors = function(trackerObj) {
                trackerObj.showMessages();
                if (trackerObj.focusOnFirstInvalid())
                    return false;

                return true;
            };                       

            self.shouldDisableCreate = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker),
                    hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
                return hasInvalidComponents;
            };
            
            self.currentStepValueText = function() {
                if (self.currentStepValue() == 'stp2') {
                    self.isDisabled(true);
                    self.addBtnVisible(true);
                    self.nextBtnVisible(false);
                    self.isDisabled2(true);
                } else {
                    self.isDisabled(false);
                    self.addBtnVisible(false);
                    self.nextBtnVisible(true);
                    self.isDisabled2(false);
                }
                
                return self.returnAfterLeaveRequest();
            };
            
        this.cancelAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryReturnAfterLeave');
                }//added
        }
        //get leave , leave type ,leave start date and end date
        var getAdvancedAnnualLeaveReportFn = function (data) {
            if (data) {
              var  jsonData = jQuery.parseJSON(data);
                if (jsonData.length != 0) {
                    self.isLeave(true);
                    self.disableNext(false);
                    self.returnAfterLeaveModel.leave(jsonData.LEAVE_TYPE);
                    self.returnAfterLeaveModel.leaveType(jsonData.LEAVE_TYPE);
                    self.returnAfterLeaveModel.leaveStartDate(formatDate(new Date(jsonData.START_DATE)));
                    self.returnAfterLeaveModel.leaveEndDate(formatDate(new Date(jsonData.END_DATE)));
                }
            }
            else {
                    self.isLeave(false);
                    self.disableNext(true);
                }
        };
        //--------------end --------------------//
        function addReturnAfterLeave(event)  {
            if(!self.disableSubmit()) {
                             self.disableSubmit(true);    
                    }
                var jsonData = ko.toJSON(self.returnAfterLeaveModel);
                var addReturnAfterLeaveFn = function (data1) {
                    $.notify(self.notifyCreate(), "success");
                     if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryReturnAfterLeave');
                    }//added
                    self.disableSubmit(false); 
                };
                services.addReturnAfterLeave(jsonData).then (addReturnAfterLeaveFn , app.failCbFn) ;
        }
            
        this.submitButton = function () {
            self.returnAfterLeaveModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addReturnAfterLeave();
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
         //save draft
        this.submitDraft = function () {
            self.returnAfterLeaveModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addReturnAfterLeave();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///function to comupte day after rejoin/////
        function computeNumofDays() {
            if (self.selectedRejoinDate() != '' && self.selectedEndDate() != '' ) {
                var rejoinDate = self.selectedRejoinDate();
                var leaveEndDate = self.selectedEndDate();
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
         /*-----------------Approval List---------------------------*/
         this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "RAL", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('RAL').then(getApprovalList, app.failCbFn);

        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }//end
        
        /*function to clear table content after submit*/
        function clearContent() {
            self.clickedButton("");           
            self.returnAfterLeaveModel.daysAfterRejoin("");
            self.returnAfterLeaveModel.comments("");
            self.returnAfterLeaveModel.rejoinDate("");            
        }
         //language support =========================
            self.ok = ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.requestDate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.returnAfterLeaveRequest = ko.observable();
            self.create= ko.observable();
            self.notifyCreate = ko.observable();  
            self.saveDraft = ko.observable();
            self.placeholder = ko.observable();
            self.review = ko.observable();
            self.notifyValidation = ko.observable();
            self.serviceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
            self.approvals = ko.observable();
            self.ok = ko.observable();
            self.viewApprovalsLbl = ko.observable();      
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
            self.noLeaveRequests = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.noLeaveRequests(getTranslation("labels.noLeaveRequests"));
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
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
           self.addMessage (getTranslation("returnAfterLeave.addMessage"));
           self.returnAfterLeaveRequest(getTranslation("pages.returnAfterLeave"));
           self.notifyCreate(getTranslation("returnAfterLeave.notifyCreate"));           
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.placeholder(getTranslation("labels.placeHolder"));
           self.serviceName(getTranslation("labels.serviceName"));
           self.notificationType(getTranslation("labels.notificationType"));
           self.employeeRole(getTranslation("labels.employeeRole"));
           self.rejoinDate(getTranslation("returnAfterLeave.rejoinDate"));            
           self.leave(getTranslation("returnAfterLeave.leave"));
            self.leaveType(getTranslation("returnAfterLeave.leaveType"));
            self.leaveSD(getTranslation("returnAfterLeave.leaveSD"));
            self.leaveED(getTranslation("returnAfterLeave.leaveED"));
            self.daysAfterRejoin(getTranslation("returnAfterLeave.daysAfterRejoin"));
            self.leaveStartValidation(getTranslation("returnAfterLeave.leaveStartValidation"));
            self.daysAfterRejoinValidate(getTranslation("returnAfterLeave.daysAfterRejoinValidate"));
            self.daysAfterRejoinNoValidate(getTranslation("returnAfterLeave.daysAfterRejoinNoValidate"));
            self.comment(getTranslation("others.comment"));           
           self.columnArrayApproval([{"headerText" : self.serviceName(), "field" : "name"},
                                     {"headerText" : self.notificationType(), "field" : "type"},
                                     {"headerText" : self.employeeRole(), "field" : "status"}]);
         self.approvals(getTranslation("labels.approvals"));
         self.ok(getTranslation("others.ok"));
         self.viewApprovalsLbl(getTranslation("others.viewApprovals"));           
        }//added
             self.label = {text: self.progressValue(), style: {color:'white'}};       
             self.thresholdValues = [{max: 33}, {max: 67}, {}];
            
        }
        return new createReturnAfterLeaveModel();
    });