define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog','ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojknockout-validation'],
function(oj, ko, $,app,common,services,postbox) {

    function viewFamilyVisaRefundViewModel() {
        var self = this;
        this.specialistSummary = ko.observable("");//added
        self.attachment_base64 = ko.observable("");
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        
           self.familyVisaRefundModel = {
                id : ko.observable(),
                requestDate: ko.observable(),
                contractType: ko.observable(""),
                reqNationality: ko.observable(""),
                amount: ko.observable(""),
                remarks: ko.observable(""),
                personNumber : ko.observable(""),
                payPeriod: ko.observable(""),
                name:ko.observable("")
            };
          
        ko.postbox.subscribe("viewFamilyVisaRefundObj", function (newValue) {
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
        });
        
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
            var preview = document.querySelector('.attClass');
            preview.src = self.attachment_base64();
        }

        self.backAction = function () {
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryNewFamilyVisaRefund');
                    }//added
        }
        
        //language support =========================
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.newFamilyVisaRefund = ko.observable();
            self.contractType = ko.observable();
            self.requesterNationality = ko.observable();
            self.amount = ko.observable();
            self.comments = ko.observable();
            self.remarks = ko.observable();    
            self.attachment = ko.observable();//added
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
           self.attachment(getTranslation("businessTrip.attachment"));//added
    }
    }

    return viewFamilyVisaRefundViewModel;
});