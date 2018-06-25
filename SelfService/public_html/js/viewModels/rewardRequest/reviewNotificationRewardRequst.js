define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function RewardReqistNotificationViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        self.typeSelectedValue = ko.observable();
        self.countrySelectedValue = ko.observable();
        self.accomSelectedValue = ko.observable();
        self.transSelectedValue = ko.observable();
        self.foodSelectedValue = ko.observable();
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        self.isLastApprover = ko.observable(false); 
        this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);
        self.isRequired = ko.observable(false)
        var personNumber = rootViewModel.personDetails().personNumber();
          self.clickedButton = ko.observable("");
           this.checkValues= ko.observableArray([{"values":"Y"},{"values":"N"}]);
        self.isDisabled = ko.observable(true);
          self.disableSubmit = ko.observable(false);
         self.disablePeriod = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        this.payPeriods= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":''
            }]);

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

       
         self.rewardRequestModel = {
            id : ko.observable(),
            requestDate : ko.observable(self.formatDate(new Date())),
           servicePeriod : ko.observable(""),
           endOfServiceAmount : ko.observable(""),
           paidEndOfService : ko.observable(""), 
           lastEosPaymentDate : ko.observable(""),
            allowedAmount : ko.observable(""),
            requestedAmount : ko.observable(""),
            reason : ko.observable(""),
           paymentPeriod : ko.observable("")   ,
              personNumber:personNumber,
              rejectRessone: ko.observable(""),
              commment:ko.observable(""),
              elementName:ko.observable("")
              
        };

 
        
        var getRewaardRequstByIdCbFn = function (data) 
        {
            
            $.each(data.items, function (index, newValue) {
                            self.rewardRequestModel.id(newValue.id);
                            self.rewardRequestModel.requestDate(newValue.request_date);
                            self.rewardRequestModel.servicePeriod(newValue.service_period);
                            self.rewardRequestModel.endOfServiceAmount(newValue.end_of_service_amount);
                            self.rewardRequestModel.paidEndOfService(newValue.paid_end_of_service);
                            self.rewardRequestModel.lastEosPaymentDate(newValue.last_eos_payment_date);
                            self.rewardRequestModel.allowedAmount(newValue.allowed_amount);
                            self.rewardRequestModel.requestedAmount(newValue.requested_amount);
                            self.rewardRequestModel.reason(newValue.reason);
                            self.rewardRequestModel.paymentPeriod(newValue.payment_period);
                             self.rewardRequestModel.commment(newValue.commment);
                             
                             
                              
                           
                           
            });
            
             
            
          
        };


        services.getRewardRequstId(rootViewModel.selectedTableRowKeyNotifiation()).then(getRewaardRequstByIdCbFn, app.failCbFn);
        self._showComponentValidationErrors = function (trackerObj) 
        {
//            trackerObj.showMessages();
//            if (trackerObj.focusOnFirstInvalid())
//                return false;
//
            return true;
        };

        var getApprove = function (data) {
         if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            }
                                  

                   else{      
           self.rewardRequestModel.paymentPeriod( self.rewardRequestModel.paymentPeriod()[0]);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
           if(self.isLastApprover()){
                var jsonBody =  jQuery.parseJSON(ko.toJSON(self.rewardRequestModel));
                    jsonBody.trsId = transactionId;
                    jsonBody.SSType = "RRS";
            
                var editRewardRequestCbFn = function (data1) {

                };
                services.editNewRewardRequest(jsonBody).then(editRewardRequestCbFn, app.failCbFn);
                 var submitElement = function (data1) {
                 
                    };
                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);

            }
             }
             rootViewModel.getNoOfNotifications();
            oj.Router.rootInstance.go('notifications');
            $.notify(self.approveNotify(), "success");

        };
        self.approveRewaardRequst= function(data, event) {
            if (self.clickedButton() != event.currentTarget.id) {
            
            self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                     "MSG_TITLE" : "Reward Requst",
                    "MSG_BODY" : "Reward Requst", 
                    "TRS_ID" : transactionId, 
                   "PERSON_ID" : rootViewModel.personDetails().personId(), 
                   "RESPONSE_CODE" : "APPROVED","ssType" : "RRS"
                };
    
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }

 

              var getReject = function (data) {
               if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
            rootViewModel.getNoOfNotifications();
           oj.Router.rootInstance.go('notifications');
            $.notify(self.rejectNotify(), "error");
            }
        }

        self.rejectRewaardRequst = function (data, event) {
              if (self.clickedButton() != event.currentTarget.id) {
               if (!self.rewardRequestModel.rejectRessone())
                {                
                 $.notify(self.addReason(), "error");
                  return;
                }
                     self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Reward Requst ", 
                    "MSG_BODY" : "Reward Requst", 
                    "TRS_ID" : transactionId,
                    "PERSON_ID" : rootViewModel.personDetails().personId(), 
                    "RESPONSE_CODE" : "REJECTED","ssType" : "RRS"
                };
    
                services.workflowAction(headers).then(getReject, app.failCbFn);
              }
            return true;
        }
           self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        

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
//RewaardRequst --cancelBTDriver
        this.cancelRewaardRequst = function () {
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

            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                self.isVisible(true);
                self.isRequired(true);
            }

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);
                self.disablePeriod(true);

            }
        };
        //This Function calculating paynent period -------------------------call from handleActivated
        var gePayPeriod =function(data)
        {
          
           parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                self.payPeriods([]);
                documents.children('G_1').each(function () {
                    var periodId = $(this).find('TIME_PERIOD_ID').text();
                    var periodName = $(this).find('PERIOD_NAME').text();
                    var fields = periodName.split(' ');
                    var month = fields[0];
                    var year = fields[1];
                     if (month.length < 2){
                        month= '0' + month;
                     }
                    var monthYear=year+''+month;
                     self.payPeriods.push({
                        "value": periodId,
                        "label": periodName,
                        "month":month,
                        "year" :year,
                        "monthYear":monthYear
                        
                     });
                    });
        };
        //------------------------End-----------------------------

        self.handleAttached = function (info) {
          
//                self.isDisabled(false);
                initTranslations();
          var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
           self.isLastApprover(rootViewModel.isLastApprover(transactionId,"RRS"));
           self.rewardRequestModel.elementName(rootViewModel.getElementName("RRS"));
          
           services.gePayPeriodReport(personNumber).then(gePayPeriod, app.failCbFn);
        };
        

        self.handleDetached = function (info) {
        };
         //language support =========================
            self.back= ko.observable();
            self.requestDate=ko.observable();
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();            
            self.allowedAmount=ko.observable();            
            self.reason=ko.observable();
            self.servicePeriod=ko.observable();
            self.paymentPeriod=ko.observable();  
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage  = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();   
            self.submit = ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable(); 
            self.ok = ko.observable();
            self.reviewRewardRequst = ko.observable();
             self.loan=ko.observable(); 
             self.adminNotify=ko.observable(); 
            self.comment=ko.observable();
            self.rejectReason=ko.observable();
            self.rejectNotify=ko.observable();
            self.approveNotify=ko.observable();
            self.addReason=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                                    initTranslations();
                }
            });            
            function initTranslations() {           
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));            
               self.ok(getTranslation("others.ok"));              
               self.back(getTranslation("others.back"));
               self.requestDate(getTranslation("labels.requestDate"));
               self.endOfServiceAmount(getTranslation("rewardRequest.endOfServiceAmount"));
               self.paidEndOfService(getTranslation("rewardRequest.paidEndOfService"));
               self.lastEosPaymentDate(getTranslation("rewardRequest.lastEosPaymentDate"));
               self.requestAmount(getTranslation("rewardRequest.requestAmount"));
               self.rewardRequest(getTranslation("rewardRequest.rewardRequest"));
               self.allowedAmount(getTranslation("rewardRequest.allowedAmount"));
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.reviewRewardRequst(getTranslation("rewardRequest.reviewRewardRequst"));
               self.paymentPeriod(getTranslation("labels.paymentperiod")); 
               self.approve(getTranslation("others.approve"));
               self.reject(getTranslation("others.reject"));
               self.cancel(getTranslation("others.cancel"));               
               self.approveMessage(getTranslation("rewardRequest.approveMessage"));  
               self.rejectMessage(getTranslation("rewardRequest.rejectMessage"));
                self.loan(getTranslation("rewardRequest.loan"));
                self.comment(getTranslation("others.comment"));
                self.adminNotify(getTranslation("labels.adminNotify"));
                self.rejectReason(getTranslation("labels.rejectReason")); 
                self.rejectNotify(getTranslation("rewardRequest.rejectNotify"));
                self.approveNotify(getTranslation("rewardRequest.approveNotify"));
                self.addReason(getTranslation("labels.addReason"));
            }

    }

    return RewardReqistNotificationViewModel;
});