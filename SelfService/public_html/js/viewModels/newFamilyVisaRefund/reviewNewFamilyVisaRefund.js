define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext','promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewNewFamilyVisaRefundViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        this.notiId = ko.observable();
        ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);
        self.clickedButton = ko.observable("");
        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
         self.payPeriodValue = ko.observable();
         self.attachment_base64 = ko.observable("");
         self.isLastApprover = ko.observable(false);
         self.tracker = ko.observable();
                    this.payPeriods= ko.observableArray([{
                "value": '',
                "label": ''
            }]);
            
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

           self.familyVisaRefundModel = {
                id : ko.observable(),
                requestDate: ko.observable(),
                contractType: ko.observable(""),
                reqNationality: ko.observable(""),
                amount: ko.observable(""),
                remarks: ko.observable(""),
                personNumber : ko.observable(""),
                payPeriod: ko.observable(""),
                name:ko.observable(""),
                rejectRessone: ko.observable(""),
                commment:ko.observable("")
            };


        var getNewFamilyVisaRefundByIdCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.familyVisaRefundModel.id(newValue.id);
                self.familyVisaRefundModel.requestDate(newValue.request_date);
                self.familyVisaRefundModel.contractType(newValue.contract_type);
                self.familyVisaRefundModel.reqNationality(newValue.requester_nationality);
                self.familyVisaRefundModel.amount(newValue.amount);
                self.familyVisaRefundModel.remarks(newValue.remarks);
                self.familyVisaRefundModel.personNumber(newValue.person_number);
                self.familyVisaRefundModel.payPeriod(newValue.payment_period);
                self.familyVisaRefundModel.name(newValue.name);
                self.attachment_base64(newValue.attachment_base64);
                self.familyVisaRefundModel.commment(newValue.commment);
                
            });

        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.rejectNewFamilyVisaRefund = function () {
         if (self.clickedButton() != event.currentTarget.id) {
         if (!self.familyVisaRefundModel.rejectRessone())
                {
                 $.notify(self.addReason(), "error");
                  return;
                }
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Family Visa Refund", "MSG_BODY" : "Family Visa Refund Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "FVR"
                };
    
                services.workflowAction(headers).then(getReject, app.failCbFn);
            }
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.approveNewFamilyVisaRefund = function () {
           if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Family Visa Refund", "MSG_BODY" : "Family Visa Refund Request","TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "FVR"
                };
                services.workflowAction(headers).then(getApprove, app.failCbFn);
           }
            return true;
        }

        services.getNewFamilyVisaRefundById(rootViewModel.selectedTableRowKeyNotifiation()).then(getNewFamilyVisaRefundByIdCbFn, app.failCbFn);

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
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            //rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations'
            if (self.isLastApprover()) {
                var updaeJson = {
                    "id" : self.familyVisaRefundModel.id(), 
                    "updatedBy":rootViewModel.personDetails().personNumber(),
                    "updateDate":new Date(),
                    "trsId" : transactionId,
                    "finalApproved":"Yes",
                    "status":"APPROVED"
                };
                 var jsonBody = jQuery.parseJSON(ko.toJSON(self.familyVisaRefundModel));
                 jsonBody.trsId = transactionId;
                 jsonBody.SSType = "FVR";
                 var submitElement = function (data1) {
                 };
                 
                services.editNewFamilyVisaRefund(JSON.stringify(updaeJson)).then(editFamilyVisaRefundCbFn, app.failCbFn);
                services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
                
                oj.Router.rootInstance.go('notifications');
                $.notify(self.approve(), "success");                
            }
        }

        };
          var editFamilyVisaRefundCbFn = function (data1) {
               
          };

        var getReject = function (data) {
            oj.Router.rootInstance.go('notifications');
            $.notify(self.reject(), "error");
        };
        
        this.submitButton = function () {
//             var trackerObj = ko.utils.unwrapObservable(self.tracker);
//            if (!this._showComponentValidationErrors(trackerObj)) {
//                return;
//            }
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
             self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
              self.clickedButton("");
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
        self.isLastApprover(rootViewModel.isLastApprover(transactionId,"FVR"));
        initTranslations();
        var preview = document.querySelector('.attClass');
                preview.src = self.attachment_base64();
          services.gePayPeriodReport(self.familyVisaRefundModel.personNumber()).then(function (data) {
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                self.payPeriods([]);
                documents.children('G_1').each(function () {
                var periodId = $(this).find('TIME_PERIOD_ID').text();
                var periodName = $(this).find('PERIOD_NAME').text();
                     self.payPeriods.push({
                        "value": periodId,
                        "label": periodName
                     });
                });

            },
            app.failCbFn);

        };

        self.handleDetached = function (info) {
        };
        
        //language support =========================
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.newFamilyVisaRefund = ko.observable();
            self.contractType = ko.observable();
            self.requesterNationality = ko.observable();
            self.amount = ko.observable();
            self.comments = ko.observable();
            self.remarks = ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage = ko.observable();
            self.paymentperiod = ko.observable();
            self.cancel = ko.observable();
            self.approve = ko.observable();
            self.reject = ko.observable();
            self.reviewFamilyVisaRefund = ko.observable();
            self.comment = ko.observable();
            self.addReason  = ko.observable(); 
            self.rejectReason  = ko.observable();
            self.attachment  = ko.observable();
            self.adminNotify= ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;

             self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
           self.back(getTranslation("others.back"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.newFamilyVisaRefund(getTranslation("newFamilyVisaRefund.newFamilyVisaRefund"));
           self.contractType(getTranslation("newFamilyVisaRefund.contractType"));
           self.requesterNationality(getTranslation("newFamilyVisaRefund.requesterNationality"));
           self.amount(getTranslation("newFamilyVisaRefund.amount"));
           self.comments(getTranslation("newFamilyVisaRefund.comments"));
           self.remarks(getTranslation("newFamilyVisaRefund.remarks"));
           self.yes(getTranslation("others.yes"));
           self.no(getTranslation("others.no"));
           self.submit(getTranslation("others.submit"));
           self.confirmMessage(getTranslation("labels.confirmMessage"));
           self.approveMessage (getTranslation("newFamilyVisaRefund.approveMessage"));  
           self.rejectMessage (getTranslation("newFamilyVisaRefund.rejectMessage"));
           self.reviewFamilyVisaRefund (getTranslation("newFamilyVisaRefund.reviewFamilyVisaRefund"));  
           self.paymentperiod(getTranslation("labels.paymentperiod"));
           self.cancel(getTranslation("others.cancel"));
           self.reject(getTranslation("others.reject"));
           self.approve(getTranslation("others.approve"));
           self.comment(getTranslation("others.comment")); 
           self.addReason(getTranslation("labels.addReason"));
           self.rejectReason(getTranslation("labels.rejectReason"));
           self.attachment(getTranslation("businessTrip.attachment"));
           self.adminNotify (getTranslation("employeeAllowance.adminNotify"));//added
    }
    }

    return reviewNewFamilyVisaRefundViewModel;
});