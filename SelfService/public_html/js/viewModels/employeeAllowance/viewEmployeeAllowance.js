define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function viewEmployeeAllowanceModel() {
        var self = this;
       var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy-MM-dd'
        }));
        
            self.employeeAllowanceModel = {
                id : ko.observable(),
                personNumber:ko.observable(""),
                requestDate: ko.observable(""),
                hireDate: ko.observable(rootViewModel.personDetails().hireDate()),
                housingType  : ko.observable(""),
                housingAllowance:  ko.observable(""),
                allowanceAmount: ko.observable(""),
                reason:  ko.observable(""),
                name:ko.observable(""),
                startDate: ko.observable(""),
                endDate: ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date())
            };

          
        ko.postbox.subscribe("viewEmployeeAllowanceObj", function (newValue) {
            self.employeeAllowanceModel.id(newValue.id);
            self.employeeAllowanceModel.requestDate(newValue.request_date);
            self.employeeAllowanceModel.hireDate(newValue.hire_date);
            self.employeeAllowanceModel.housingType(newValue.housing_type);
            self.employeeAllowanceModel.housingAllowance(newValue.allowance_type);
            self.employeeAllowanceModel.allowanceAmount(newValue.allowance_amount);
            self.employeeAllowanceModel.reason(newValue.reason);
            self.employeeAllowanceModel.personNumber(newValue.person_number);
            self.employeeAllowanceModel.name(newValue.name);           
            self.employeeAllowanceModel.startDate(newValue.start_date);
            self.employeeAllowanceModel.endDate(newValue.end_date);
        });
        
        self.handleActivated = function (info) {
        }
        
        self.handleAttached = function (info) {
            initTranslations();
        }

        self.backAction = function () {
            oj.Router.rootInstance.go('summaryEmployeeAllowance');
        }
        
        //language support =========================
            self.back = ko.observable();
            self.requestDate= ko.observable();
            self.allowanceType= ko.observable();            
            self.reason= ko.observable();         
            self.amount= ko.observable();
            self.hireDate= ko.observable();
            self.startDate= ko.observable();
            self.endDate= ko.observable();
            self.housingType= ko.observable();
            self.amount= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
                    self.requestDate(getTranslation("labels.requestDate")); 
                    self.hireDate(getTranslation("labels.hireDate"));   
                    self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
                    self.amount(getTranslation("employeeAllowance.amount"));
                    self.reason(getTranslation("employeeAllowance.reason"));
                    self.back(getTranslation("others.back"));
                    self.housingType (getTranslation("employeeAllowance.housingType"));
                    self.amount (getTranslation("employeeAllowance.amount"));
                    self.startDate(getTranslation("labels.startdate"));
                    self.endDate(getTranslation("labels.enddate"));
        }

    }

    return viewEmployeeAllowanceModel;
});