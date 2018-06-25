define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext','promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewReturnAfterLeaveModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);

        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.tracker = ko.observable();
        self.disableSubmit = ko.observable(false);
        self.isLastApprover = ko.observable(false);
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        } 
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
            rejectReason : ko.observable(""),
            assignmentStatus:ko.observable("")
        };
        var getReturnAfterLeaveIdCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
            self.returnAfterLeaveModel.id(newValue.id);
            self.returnAfterLeaveModel.requestDate(newValue.request_date);
            self.returnAfterLeaveModel.rejoinDate(newValue.rejoin_date);
            self.returnAfterLeaveModel.leave(newValue.leave);   
            self.returnAfterLeaveModel.leaveType(newValue.leave_type);
            self.returnAfterLeaveModel.leaveStartDate(newValue.leave_start_date);
            self.returnAfterLeaveModel.leaveEndDate(newValue.leave_end_date);   
            self.returnAfterLeaveModel.daysAfterRejoin(newValue.days_after_rejoin); 
            self.returnAfterLeaveModel.comments(newValue.comments); 
            self.returnAfterLeaveModel.personNumber(newValue.person_number);
            self.returnAfterLeaveModel.name(newValue.name);  
            self.returnAfterLeaveModel.assignmentStatus(newValue.assignment_status); 
            });            
        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self.rejectReturnAfterLeave = function () {
          if (!self.returnAfterLeaveModel.rejectReason())
                {
                 $.notify(self.addReason(), "error");
                  return;
                }

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Return Afte Leave", "MSG_BODY" : "Return Afte Leave Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "RAL"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.approveReturnAfterLeave = function () {
          self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Return After Leave", "MSG_BODY" : "Return After Leave Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "RAL"
            };

            services.workflowAction(headers).then(getApprove, app.failCbFn);

            return true;
        }


        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } 
            else if(self.isLastApprover())  {
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                console.log(self.returnAfterLeaveModel);
                     var jsonBody = jQuery.parseJSON(ko.toJSON(self.returnAfterLeaveModel));
                     console.log(jsonBody);
                     jsonBody.trsId = transactionId;
                     jsonBody.SSType = "RAL";
                 
                 /*UPDATE STATUS AND FINAL APPROVED*/
                     var updateJson = {
                        "status":"APPROVED","finalApproved" : "Yes",  "id" : self.returnAfterLeaveModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                         "updateDate":new Date()
                    };
                 /**/
                   var submitElement = function (data1) {
                 };
                 services.editReturnAfterLeave(updateJson).then(editReturnAfterLeaveCbFn, app.failCbFn);
                 services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
              
                oj.Router.rootInstance.go('notifications');
                $.notify(self.approveNotify(), "success");
            }
          
        };
        
          var editReturnAfterLeaveCbFn = function (data1) {
              oj.Router.rootInstance.go('notifications'); 
          };


        var getReject = function (data) {
            if (data.STATUS != 'Success') {
            oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
             /*UPDATE STATUS AND FINAL APPROVED*/
                 var updateJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.returnAfterLeaveModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/                 
                services.editReturnAfterLeave(updateJson).then(editReturnAfterLeaveCbFn, app.failCbFn);
                $.notify(self.rejectNotify(), "error");
            }
        };
        
        this.submitButton = function () {

            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            document.querySelector("#rejectDialog").close();
        };

        this.cancelReturnAfterLeave = function () {
            oj.Router.rootInstance.go('notifications');
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
        services.getReturnAfterLeaveById(rootViewModel.selectedTableRowKeyNotifiation()).then(getReturnAfterLeaveIdCbFn, app.failCbFn);
         var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
         self.isLastApprover(rootViewModel.isLastApprover(transactionId,"RAL"));
                     initTranslations();

        };

        self.handleDetached = function (info) {
        };
//language support =========================
            self.ok = ko.observable();
            self.requestDate= ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage  = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.reviewReturnAfterLeaveRequest= ko.observable();
            self.approveNotify= ko.observable();
            self.rejectNotify= ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable();            
            self.adminNotify= ko.observable();
            self.rejectReason= ko.observable();
            self.addReason= ko.observable();                   
            
            self.requestDate= ko.observable();       
            self.leave = ko.observable();
            self.leaveType = ko.observable();
            self.leaveSD = ko.observable();
            self.leaveED = ko.observable();
            self.daysAfterRejoin = ko.observable();
            self.rejoinDate = ko.observable();
            self.comment = ko.observable();

            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
                self.ok(getTranslation("others.ok"));
                self.requestDate(getTranslation("labels.requestDate")); 
                self.back(getTranslation("others.back"));
                self.next(getTranslation("others.next"));
                self.cancel(getTranslation("others.cancel"));
                self.yes(getTranslation("others.yes"));
                self.no(getTranslation("others.no"));
                self.submit(getTranslation("others.submit"));
                self.confirmMessage(getTranslation("labels.confirmMessage"));
                self.create(getTranslation("labels.create"));
                self.review(getTranslation("others.review"));
                self.approveMessage(getTranslation("returnAfterLeave.approveMessage"));
                self.rejectMessage(getTranslation("returnAfterLeave.rejectMessage"));            
                self.reviewReturnAfterLeaveRequest (getTranslation("returnAfterLeave.reviewReturnAfterLeaveRequest"));
                self.approveNotify (getTranslation("returnAfterLeave.approveNotify"));
                self.rejectNotify (getTranslation("returnAfterLeave.rejectNotify"));  
                self.approve(getTranslation("others.approve"));
                self.reject(getTranslation("others.reject"));
                self.adminNotify (getTranslation("returnAfterLeave.adminNotify"));
                self.rejectReason(getTranslation("labels.rejectReason"));
                self.addReason(getTranslation("labels.addReason"));
                
                self.rejoinDate(getTranslation("returnAfterLeave.rejoinDate"));            
                self.leave(getTranslation("returnAfterLeave.leave"));
                self.leaveType(getTranslation("returnAfterLeave.leaveType"));
                self.leaveSD(getTranslation("returnAfterLeave.leaveSD"));
                self.leaveED(getTranslation("returnAfterLeave.leaveED"));
                self.daysAfterRejoin(getTranslation("returnAfterLeave.daysAfterRejoin"));
                self.comment(getTranslation("others.comment"));
        }
    }

    return reviewReturnAfterLeaveModel;
});