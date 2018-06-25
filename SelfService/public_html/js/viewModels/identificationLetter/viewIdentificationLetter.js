define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog','ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojknockout-validation','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'],function(oj, ko, $,app,common,services) {

    function viewIdentificationLettersViewModel() {
        var self = this;
       var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
            self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
            self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        this.specialistSummary = ko.observable("");//added
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        
        
           self.identificationLettersModel = {
                id : ko.observable(),
                requestDate: ko.observable(""),
                arabicEnglish:ko.observable(""),
                arabicName  : ko.observable(""),
                englishName:  ko.observable(""),
                iqamaProfession: ko.observable(""),
                personNumber: ko.observable(""),
                mailType: ko.observable(""),
                name:ko.observable(""),
                directedTo:ko.observable(""),
                withSalary: ko.observable(""),
                reason: ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                stamped: ko.observable("")
            };
          
        ko.postbox.subscribe("viewIdentificationLettersObj", function (newValue) {
            self.identificationLettersModel.id(newValue.id);
            self.identificationLettersModel.requestDate(newValue.request_date);
            self.identificationLettersModel.arabicEnglish(newValue.arabic_english_code);
            self.identificationLettersModel.arabicName(newValue.arabic_name);
            self.identificationLettersModel.englishName(newValue.english_name);
            self.identificationLettersModel.iqamaProfession(newValue.iqama_profession);
            self.identificationLettersModel.personNumber(newValue.person_number);
            self.identificationLettersModel.name(newValue.name);
            self.identificationLettersModel.directedTo(newValue.directed_to);
            self.identificationLettersModel.mailType(newValue.mail_type_code);
            self.identificationLettersModel.withSalary(newValue.with_salary_code);
            self.identificationLettersModel.reason(newValue.reason);
            self.identificationLettersModel.stamped(newValue.stamped);
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
                     oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryIdentificationLetter');
                }//added
        }
          //language support =========================
            self.back = ko.observable();
            self.arabicName= ko.observable();
            self.englishName= ko.observable();
            self.profession= ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.startdate=ko.observable();
            self.requestDate=ko.observable();
            self.enddate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.requestReason= ko.observable();
            self.directTo= ko.observable();
            self.withSalary= ko.observable();
            self.arabicEnglish= ko.observable();
            self.mailType= ko.observable();
            self.identificationLettersRefundRequests= ko.observable();
            self.nodays= ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.stamped = ko.observable()
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.back(getTranslation("others.back"));
           self.arabicName(getTranslation("identificationLetters.arabicName"));
    	   self.englishName(getTranslation("identificationLetters.englishName"));
           self.profession(getTranslation("identificationLetters.profession"));
           self.requestReason(getTranslation("identificationLetters.requestReason"));
           self.directTo(getTranslation("identificationLetters.directTo"));
           self.withSalary(getTranslation("identificationLetters.withSalary"));
           self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
           self.mailType(getTranslation("identificationLetters.mailType"));
           self.startdate(getTranslation("labels.startdate"));
           self.enddate(getTranslation("labels.enddate"));
           self.rowNumber(getTranslation("labels.rowNumber"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
           self.approvals(getTranslation("labels.approvals"));
           self.nodays(getTranslation("labels.nodays"));
           self.approvalList(getTranslation("labels.approvalList"));
           self.yes(getTranslation("others.yes"));
           self.no(getTranslation("others.no"));
           self.stamped(getTranslation("identificationLetters.stamped"));
        }//added
    }

    return viewIdentificationLettersViewModel;
});