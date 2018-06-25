define(['ojs/ojcore', 'knockout', 'jquery','appController' ,'knockout-postbox', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $,app, postbox) {

    function ViewStopAllowanceRequestModel() {
        var self = this;
        self.isVisible=ko.observable(false);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
         self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        self.stopAllowanceRequestModel = {
            id:ko.observable(),
            requestDate : ko.observable(self.formatDate(new Date())),
            allowanceType:ko.observable(""),
            stoppingDate:ko.observable(""),
            reason:ko.observable(""),
            createdBy:   rootViewModel.personDetails().personNumber(),
            personNumber : rootViewModel.personDetails().personNumber()

        };

            
        ko.postbox.subscribe("viewStopAllowanceRequestObj", function (newValue) {
				self.stopAllowanceRequestModel.id(newValue.id);
                                self.stopAllowanceRequestModel.requestDate(newValue.request_date);
                                self.stopAllowanceRequestModel.reason(newValue.reason);
                                self.stopAllowanceRequestModel.allowanceType(newValue.allowance_type);
                                self.stopAllowanceRequestModel.stoppingDate(newValue.stopping_date);
				
        });
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
     

        self.handleActivated = function (info) {
           
            }
             
        

        self.handleAttached = function (info) {
            initTranslations();
        }

        self.backAction = function () {
            oj.Router.rootInstance.go('summaryStopAllowanceRequest');
        }
        //trasnlation added
        self.back = ko.observable(); 
        self.requestDate= ko.observable();
        self.allowanceType= ko.observable();            
        self.reason= ko.observable();         
        self.stoppingDate= ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
            self.back(getTranslation("others.back"));                       
            self.requestDate(getTranslation("labels.requestDate"));
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.stoppingDate(getTranslation("stopAllowance.stoppingDate")); 
      }
    }

    return ViewStopAllowanceRequestModel;
});