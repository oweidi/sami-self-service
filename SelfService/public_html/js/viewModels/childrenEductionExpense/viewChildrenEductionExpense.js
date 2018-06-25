define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog','ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojknockout-validation'],function(oj, ko, $,app,common,services) {

    function ViewBusinessTripDriverModel() {
        var self = this;
        self.isVisible=ko.observable(false);
        self.attachment_base64 = ko.observable("");
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
           self.childrenExpenseModel = {
                    requestDate : ko.observable(self.formatDate(new Date())),
                    id:ko.observable(),
                    semesterFrom : ko.observable(""),
                    semesterTo : ko.observable(""),
                    schoolYear : ko.observable(""), 
                    semesterNumber : ko.observable(""),
                    dependentName1 : ko.observable(""),
                    dependentName2 : ko.observable(""),
                    dependentName3 : ko.observable(""),
                    dependentName4 : ko.observable(""),
                    dependentName5 : ko.observable(""),
                    amount1 : ko.observable(""),
                    amount2 : ko.observable(""),
                    amount3 : ko.observable(""),
                    amount4 : ko.observable(""),
                    amount5 : ko.observable(""),
                    paymentPeriod : ko.observable(""),
                    createdBy:   rootViewModel.personDetails().personNumber(),
                    personNumber : rootViewModel.personDetails().personNumber(),
                    managerId : rootViewModel.managerId()
        };

            
                    ko.postbox.subscribe("viewChildrenEductionExpenseObj", function (newValue) { 
                        self.childrenExpenseModel.id(newValue.id);
                        self.childrenExpenseModel.requestDate(newValue.request_date);
                        self.childrenExpenseModel.semesterFrom(newValue.semester_from);
                        self.childrenExpenseModel.semesterTo(newValue.semester_to);
                        self.childrenExpenseModel.schoolYear(newValue.school_year);
                        self.childrenExpenseModel.semesterNumber(newValue.semester_number);
                        self.childrenExpenseModel.dependentName1(newValue.dependent_name_1);
                        self.childrenExpenseModel.dependentName2(newValue.dependent_name_2);
                        self.childrenExpenseModel.dependentName3(newValue.dependent_name_3);
                        self.childrenExpenseModel.dependentName4(newValue.dependent_name_4);
                        self.childrenExpenseModel.dependentName5(newValue.dependent_name_5);
                        self.childrenExpenseModel.amount1(newValue.amount_1);
                        self.childrenExpenseModel.amount2(newValue.amount_2);
                        self.childrenExpenseModel.amount3(newValue.amount_3);
                        self.childrenExpenseModel.amount4(newValue.amount_4);
                        self.childrenExpenseModel.amount5(newValue.amount_5);
                        self.attachment_base64(newValue.attachment_base64);
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
                }//added
             initTranslations();
             var preview = document.querySelector('.attClass');
            preview.src = self.attachment_base64();
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }
        }
                    //language support =========================

            self.amount1 = ko.observable();
            self.name1 = ko.observable();
            self.amount2 = ko.observable();
            self.amount3 = ko.observable();
            self.amount4 = ko.observable();
            self.amount5 = ko.observable();
            self.name2 = ko.observable();
            self.name3 = ko.observable();
            self.name4 = ko.observable();
            self.name5 = ko.observable();
            self.semesterFrom = ko.observable();
            self.semesterTo = ko.observable();
            self.schoolYear = ko.observable();
            self.semesterNum = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.back = ko.observable();
            self.paymentPeriod = ko.observable();
            self.dependentAge = ko.observable();
            self.attachment = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
                self.paymentPeriod(getTranslation("labels.paymentperiod"));
                self.back(getTranslation("others.back"));
                self.requestDate(getTranslation("labels.requestDate"));
                self.semesterFrom(getTranslation("childrenEductionExpense.semesterFrom"));
                self.semesterTo(getTranslation("childrenEductionExpense.semesterTo"));
                self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
                self.semesterNum(getTranslation("childrenEductionExpense.semesterNum"));
                self.name1(getTranslation("childrenEductionExpense.name1"));
                self.amount1(getTranslation("childrenEductionExpense.amount1"));
                self.name2(getTranslation("childrenEductionExpense.name2"));
                self.name3(getTranslation("childrenEductionExpense.name3"));
                self.name4(getTranslation("childrenEductionExpense.name4"));
                self.name5(getTranslation("childrenEductionExpense.name5"));
                self.amount1(getTranslation("childrenEductionExpense.amount1"));
                self.amount2(getTranslation("childrenEductionExpense.amount2"));
                self.amount3(getTranslation("childrenEductionExpense.amount3"));
                self.amount4(getTranslation("childrenEductionExpense.amount4"));
                self.amount5(getTranslation("childrenEductionExpense.amount5"));
                self.dependentAge(getTranslation("childrenEductionExpense.dependentAge"));
                self.attachment(getTranslation("businessTrip.attachment"));//added
    }

    }

    return ViewBusinessTripDriverModel;
});