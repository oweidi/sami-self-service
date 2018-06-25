define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function viewChangeHousingModel() {
        var self = this;
       var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
       this.specialistSummary = ko.observable("");//added
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy-MM-dd'
        }));
        
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
                IS_DRAFT:ko.observable(""),
                IS_LINE_MANAGER:ko.observable("")
            };

          
        ko.postbox.subscribe("viewChangeHousingTypeObj", function (newValue) {
            self.changeHousingTypeModel.id(newValue.id);
            self.changeHousingTypeModel.requestDate(newValue.request_date);
            self.changeHousingTypeModel.newHousingType(newValue.new_housing_type);
            self.changeHousingTypeModel.changeReason(newValue.change_reason);   
            self.changeHousingTypeModel.changeDate(newValue.change_date);
            self.changeHousingTypeModel.currentHousingType(newValue.current_housing_type);  
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
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChangeHousingType');
                }//added
        }
        
        //language support =========================
            self.back = ko.observable();
            self.requestDate= ko.observable();
            self.currentHousingType = ko.observable();
            self.newHousingType = ko.observable();
            self.changeDate = ko.observable();
            self.changeReason = ko.observable();

            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
                    self.requestDate(getTranslation("labels.requestDate")); 
                    self.back(getTranslation("others.back"));
                    self.currentHousingType(getTranslation("changeHousingRequest.currentHousingType"));
                    self.newHousingType(getTranslation("changeHousingRequest.newHousingType"));
                    self.changeDate(getTranslation("changeHousingRequest.changeDate"));
                    self.changeReason(getTranslation("changeHousingRequest.changeReason"));

        }

    }

    return viewChangeHousingModel;
});