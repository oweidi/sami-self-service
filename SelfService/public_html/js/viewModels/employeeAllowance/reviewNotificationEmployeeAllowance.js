define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext','promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewEmployeeAllowanceViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();

        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);
			 this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.tracker = ko.observable();
        self.disableSubmit = ko.observable(false);
        self.isLastApprover = ko.observable(false);
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });   

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

            self.employeeAllowanceModel = {
                id : ko.observable(),
                personNumber:ko.observable(""),
                requestDate: ko.observable(""),
                hireDate: ko.observable(rootViewModel.personDetails().hireDate()),
                housingType  : ko.observable(rootViewModel.personDetails().housingType()),
                housingAllowance:  ko.observable(""),
                allowanceAmount: ko.observable(""),
                reason:  ko.observable(""),
                name:ko.observable(""),
                startDate: ko.observable(""),
                endDate: ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                 rejectRessone: ko.observable("")
            };

        var getEmployeeAllowanceByIdCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
            self.employeeAllowanceModel.id(newValue.id);
            self.employeeAllowanceModel.requestDate(newValue.request_date);
            self.employeeAllowanceModel.hireDate(newValue.hire_date);
            self.employeeAllowanceModel.housingAllowance(newValue.allowance_type);
            self.employeeAllowanceModel.allowanceAmount(newValue.allowance_amount);
            self.employeeAllowanceModel.reason(newValue.reason);
            self.employeeAllowanceModel.personNumber(newValue.person_number);
            self.employeeAllowanceModel.name(newValue.name);           
            self.employeeAllowanceModel.startDate(newValue.start_date);
            self.employeeAllowanceModel.endDate(newValue.end_date);
            
            });

        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.rejectEmployeeAllowance = function () {
          if (!self.employeeAllowanceModel.rejectRessone())
                {
                 $.notify("Add Ressone", "error");
                  return;
                }

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Employee Allowance", "MSG_BODY" : "Employee Allowance Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "EA"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.approveEmployeeAllowance = function () {
          self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Employee Allowance", "MSG_BODY" : "Employee Allowance Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "EA"
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
        console.log(rootViewModel.personDetails().positionName());
        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
            //rootViewModel.personDetails().positionName() === 'General Manager - Human Resources & Support Service'
            if (self.isLastApprover()) {
                 var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                 var jsonBody = jQuery.parseJSON(ko.toJSON(self.employeeAllowanceModel));
                 jsonBody.trsId = transactionId;
                 jsonBody.SSType = "EA";
                 jsonBody.personGroup = "";
                 
                 /*UPDATE STATUS AND FINAL APPROVED*/
                 var updateJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.employeeAllowanceModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/
                   var submitElement = function (data1) {
                 };
                 services.editEmployeeAllowance(updateJson).then(editEmployeeAllowanceCbFn, app.failCbFn);
                 
                 services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
              
            }   
                oj.Router.rootInstance.go('notifications');
                $.notify(self.approveNotify(), "success");
            }
          
        };
          var editEmployeeAllowanceCbFn = function (data1) {
              oj.Router.rootInstance.go('notifications'); 
          };


        var getReject = function (data) {
            if (data.STATUS != 'Success') {
            oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
             /*UPDATE STATUS AND FINAL APPROVED*/
                 var updaeJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.employeeAllowanceModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/
                 services.editEmployeeAllowance(updaeJson).then(editEmployeeAllowanceCbFn, app.failCbFn);

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

        this.cancelAdvHousing = function () {
            var prevoisPage = oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1];
           if (prevoisPage == 'notifications' && rootViewModel.reviewNotiType() == 'FYI') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             } else {
                 oj.Router.rootInstance.go('home');
             }
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
        var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
        self.isLastApprover(rootViewModel.isLastApprover(transactionId,"EA"));
        services.getEmployeeAllowanceById(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeAllowanceByIdCbFn, app.failCbFn);
                     initTranslations();

        };

        self.handleDetached = function (info) {
        };
//language support =========================
            self.ok = ko.observable();
            self.requestDate= ko.observable();
            self.allowanceType= ko.observable();            
            self.reason= ko.observable();         
            self.amount= ko.observable();
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
            self.hireDate= ko.observable();
            self.startDate= ko.observable();
            self.endDate= ko.observable();
            self.housingType= ko.observable();
            self.amount= ko.observable();
            self.reviewEmployeeAllowanceRefund= ko.observable();
            self.approveNotify= ko.observable();
            self.rejectNotify= ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable();            
            self.adminNotify= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
            self.ok(getTranslation("others.ok"));
            self.requestDate(getTranslation("labels.requestDate")); 
            self.hireDate(getTranslation("labels.hireDate"));   
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.amount(getTranslation("employeeAllowance.amount"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.back(getTranslation("others.back"));
           self.next(getTranslation("others.next"));
           self.cancel(getTranslation("others.cancel"));
           self.yes(getTranslation("others.yes"));
           self.no(getTranslation("others.no"));
           self.submit(getTranslation("others.submit"));
           self.confirmMessage(getTranslation("labels.confirmMessage"));
           self.create(getTranslation("labels.create"));
           self.review(getTranslation("others.review"));
           self.approveMessage(getTranslation("employeeAllowance.approveMessage"));
           self.rejectMessage(getTranslation("employeeAllowance.rejectMessage"));
           self.housingType (getTranslation("employeeAllowance.housingType"));
           self.amount (getTranslation("employeeAllowance.amount"));
           self.startDate(getTranslation("labels.startdate"));
           self.endDate(getTranslation("labels.enddate"));
           self.reviewEmployeeAllowanceRefund (getTranslation("employeeAllowance.reviewEmployeeAllowanceRefund"));
           self.approveNotify (getTranslation("employeeAllowance.approveNotify"));
           self.rejectNotify (getTranslation("employeeAllowance.rejectNotify"));  
           self.approve(getTranslation("others.approve"));
           self.reject(getTranslation("others.reject"));
           self.adminNotify (getTranslation("employeeAllowance.adminNotify"));
        }
    }

    return reviewEmployeeAllowanceViewModel;
});