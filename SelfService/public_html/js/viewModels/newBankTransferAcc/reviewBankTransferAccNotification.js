define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper',
'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton',
'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'],
function (oj, ko, $, app, commonUtil, services, postbox) {

    function ReviewBankTransferNotificationViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        self.roleType= ko.observable();
        self.roleId= ko.observable();
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
        self.isLastApprover = ko.observable(false);

        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
           
        self.bankTransferAccModel = {
            id : ko.observable(),
            requestDate : ko.observable(),
            bankName : ko.observable(""),
            iban : ko.observable(""), effectiveStartDate : ko.observable(""),
            remarks : ko.observable(""),
            personNumber : rootViewModel.personDetails().personNumber(),
            name : rootViewModel.personDetails().displayName(),
            personNumber : ko.observable(),
             branchName:ko.observable(""),
             imageBase64:ko.observable(""),
             status:ko.observable("")
        };

        var getNewBankTransferACCIdCbFn = function (data) {
            $.each(data.items, function (index, val) {
                self.bankTransferAccModel.id(val.id);
                self.bankTransferAccModel.requestDate(val.request_date);
                self.bankTransferAccModel.iban(val.iban_number);
                self.bankTransferAccModel.effectiveStartDate(val.effective_start_date);
                self.bankTransferAccModel.remarks(val.remarks);
                self.bankTransferAccModel.personNumber(val.person_number);
                self.bankTransferAccModel.bankName(val.bank_name);
                self.bankTransferAccModel.branchName(val.branch_name);
                self.bankTransferAccModel.imageBase64(val.image_base64);

            });

        };

        self.rejectBankTransferAcc = function () {

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "New Bank Transfer Account", "MSG_BODY" : "New Bank Transfer Account Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "BTA"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.approveBankTransferAcc = function () {


            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "New Bank Transfer Account ", "MSG_BODY" : "New Bank Transfer Account Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "BTA"
            };

            services.workflowAction(headers).then(getApprove, app.failCbFn);

            return true;
        }

        services.getNewBankTransferACCId(rootViewModel.selectedTableRowKeyNotifiation()).then(getNewBankTransferACCIdCbFn, app.failCbFn);

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        var getApprove = function (data) {
         if(self.isLastApprover()) {
         self.bankTransferAccModel.status("APPROVED");
           var jsonData = ko.toJSON(self.bankTransferAccModel);
               console.log(jsonData);
            var editNewBankTransferACCCbFn = function (data) {
            oj.Router.rootInstance.go('notifications');
            $.notify("XXXXXXX", "success");
            };
            services.editNewBankTransferACC(jsonData).then(editNewBankTransferACCCbFn, app.failCbFn);
         } else {
            oj.Router.rootInstance.go('notifications');
            $.notify("Approve", "success"); 
         }
        };

        var getReject = function (data) {
            oj.Router.rootInstance.go('notifications');
            $.notify("Reject", "error");
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
        }

        self.handleActivated = function (info) {
         
            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
            initTranslations();
        };

        self.handleAttached = function (info) {
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
            self.isLastApprover(rootViewModel.isLastApprover(transactionId,"BTA"));
            initTranslations();
        };

        self.handleDetached = function (info) {
        };
        //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();           
            self.notifySuccess= ko.observable();
            self.requestDateLbl= ko.observable();            
            self.bankNameLbl= ko.observable();           
            self.IBANLbl= ko.observable();
            self.effectiveStartDateLbl= ko.observable();
            self.remarksLbl= ko.observable();
            self.branchNameLbl= ko.observable();
            self.attachment = ko.observable();
            self.ibanSize =  ko.observable();
            self.AttachmentError=  ko.observable();
             self.saveDraft = ko.observable();
           
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
         function initTranslations() {
               self.ok(getTranslation("others.ok"));
               self.back(getTranslation("others.pervious"));
               self.next(getTranslation("others.next"));
               self.cancel(getTranslation("others.cancel"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));
               self.create(getTranslation("labels.create"));
               self.review(getTranslation("others.review"));           
               self.addMessage (getTranslation("newBankRequest.addMessage"));
               self.notifySuccess (getTranslation("newBankRequest.notifyCreateSuccess"));
               self.requestDateLbl(getTranslation("newBankRequest.requestDate"));             
               self.bankNameLbl(getTranslation("newBankRequest.bankName"));     
               self.IBANLbl(getTranslation("newBankRequest.IBAN"));     
               self.effectiveStartDateLbl(getTranslation("newBankRequest.effectiveStartDate"));     
               self.remarksLbl(getTranslation("newBankRequest.remarks"));     
              self.branchNameLbl(getTranslation("newBankRequest.branchName")); 
              self.attachment(getTranslation("businessTrip.attachment"));
              self.ibanSize(getTranslation("newBankRequest.ibanSize"));//ibanSize
              self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
              self.saveDraft(getTranslation("labels.saveDraft"));
            }

    }

    return ReviewBankTransferNotificationViewModel;
});