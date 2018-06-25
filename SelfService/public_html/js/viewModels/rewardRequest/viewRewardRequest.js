define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox','appController', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, postbox,app) {

    function ViewRewardRequestModel() {
        var self = this;
        self.isVisible=ko.observable(false);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
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
           paymentPeriod : ko.observable(""),
           loan:ko.observable(""),
           commment:ko.observable("")
        };

            
              ko.postbox.subscribe("viewElementObj", function (newValue) {
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
                            self.rewardRequestModel.loan(newValue.loan);
                            self.rewardRequestModel.commment(newValue.commment);

        });
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
     

        self.handleActivated = function (info) {
           
            }
             
        

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            initTranslations();
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('rewardRequestSummary');
                    }//added
        }
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
             self.comment=ko.observable();
              self.loan=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                                    initTranslations();
                }
            });            
            function initTranslations() {               
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
               self.comment(getTranslation("others.comment"));
                self.loan(getTranslation("rewardRequest.loan"));
            }
    }

    return ViewRewardRequestModel;
});