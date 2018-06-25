define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext','promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewChangeHousingTypeModel() {
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
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
            self.changeHousingTypeModel = {
                id : ko.observable(),
                requestDate: ko.observable(),
                personNumber: ko.observable(),
                name: ko.observable(""),
                currentHousingType: ko.observable(""),
                newHousingType: ko.observable(""),
                changeReason: ko.observable(""),
                changeDate: ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                personId :  ko.observable(""), 
                managerId : ko.observable(""), 
                rejectReason:ko.observable(""),
                name :ko.observable("")
            };        
        var getChangeHousingTypeModelIdCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
            self.changeHousingTypeModel.id(newValue.id);
            self.changeHousingTypeModel.requestDate(newValue.request_date);
            self.changeHousingTypeModel.personNumber(newValue.person_number);
            self.changeHousingTypeModel.name(newValue.name);  
            self.changeHousingTypeModel.newHousingType(newValue.new_housing_type);
            self.changeHousingTypeModel.changeReason(newValue.change_reason);   
            self.changeHousingTypeModel.changeDate(newValue.change_date);
            self.changeHousingTypeModel.currentHousingType(newValue.current_housing_type);
            });

        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.rejectChangeHousingType = function () {
          if (!self.changeHousingTypeModel.rejectReason())
                {
                 $.notify(self.addReason(), "error");
                  return;
                }

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Change Housing Type", "MSG_BODY" : "Change Housing Type Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "CHT"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.approveChangeHousingType = function () {
          self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Change Housing Type", "MSG_BODY" : "Change Housing Type Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "CHT"
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
                
            } else {
            //rootViewModel.personDetails().positionName() === 'Manager - Center  - Taif Center'
            if (self.isLastApprover()) {
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                 var jsonBody = jQuery.parseJSON(ko.toJSON(self.changeHousingTypeModel));
                 jsonBody.trsId = transactionId;
                 jsonBody.SSType = "CHT";
                 jsonBody.personGroup = "";
                 
                 /*UPDATE STATUS AND FINAL APPROVED*/
                 var updateJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.changeHousingTypeModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/
                   var submitElement = function (data1) {
                 };
                 services.editChangeHousingType(updateJson).then(editChangeHousingCbFn, app.failCbFn);
                 services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
              
            }   
                oj.Router.rootInstance.go('notifications');
                $.notify(self.approveNotify(), "success");
            }
          
        };
        
          var editChangeHousingCbFn = function (data1) {
              oj.Router.rootInstance.go('notifications'); 
          };


        var getReject = function (data) {
            if (data.STATUS != 'Success') {
            oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
             /*UPDATE STATUS AND FINAL APPROVED*/
                 var updateJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.changeHousingTypeModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/                 
                services.editChangeHousingType(updateJson).then(editChangeHousingCbFn, app.failCbFn);
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
        self.isLastApprover(rootViewModel.isLastApprover(transactionId,"CHT"));//last approver
        services.getChangeHousingTypById(rootViewModel.selectedTableRowKeyNotifiation()).then(getChangeHousingTypeModelIdCbFn, app.failCbFn);
                     initTranslations();

        };

        self.handleDetached = function (info) {
        };
//language support =========================
            self.ok = ko.observable();
            self.requestDate= ko.observable();
            self.currentHousingType = ko.observable();
            self.newHousingType = ko.observable();
            self.changeDate = ko.observable();
            self.changeReason = ko.observable();
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
            self.reviewChangeHousingRequest= ko.observable();
            self.approveNotify= ko.observable();
            self.rejectNotify= ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable();            
            self.adminNotify= ko.observable();
            self.rejectReason= ko.observable();
            self.addReason= ko.observable();
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
            self.approveMessage(getTranslation("changeHousingRequest.approveMessage"));
            self.rejectMessage(getTranslation("changeHousingRequest.rejectMessage"));            
           self.reviewChangeHousingRequest (getTranslation("changeHousingRequest.reviewChangeHousingRequest"));
           self.approveNotify (getTranslation("changeHousingRequest.approveNotify"));
           self.rejectNotify (getTranslation("changeHousingRequest.rejectNotify"));  
           self.approve(getTranslation("others.approve"));
           self.reject(getTranslation("others.reject"));
           self.adminNotify (getTranslation("changeHousingRequest.adminNotify"));
           self.currentHousingType(getTranslation("changeHousingRequest.currentHousingType"));
           self.newHousingType(getTranslation("changeHousingRequest.newHousingType"));
           self.changeDate(getTranslation("changeHousingRequest.changeDate"));
           self.changeReason(getTranslation("changeHousingRequest.changeReason"));
           self.rejectReason(getTranslation("labels.rejectReason"));
           self.addReason(getTranslation("labels.addReason"));
        }
    }

    return reviewChangeHousingTypeModel;
});