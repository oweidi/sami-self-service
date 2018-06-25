define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function ViewAdvHousingViewModel() {
        var self = this;
        self.isVisible=ko.observable(false);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
         self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
          self.advHousingModel = {
                requestDate: ko.observable(self.formatDate(new Date())),
                hireDate: ko.observable(rootViewModel.personDetails().hireDate()),
                numbersOfMonthsDesired: ko.observable(""),
                nrOfMonthRemInContract: ko.observable(""),
                reason: ko.observable(""),
                installmentAmount: ko.observable(""),
                initialAmount: ko.observable(""),
                paymentPeriod: ko.observable(""),
                firstInstallmentPeriod: ko.observable(""),
                housingAmount: ko.observable(""),
                personNumber: rootViewModel.personDetails().personNumber(),
                managerId: rootViewModel.personDetails().managerId(),
                name: rootViewModel.personDetails().displayName()

            };
            
              ko.postbox.subscribe("viewAdvHousingObj", function (newValue) {
               self.advHousingModel.nrOfMonthRemInContract(newValue.months_remaining_contract);
              self.advHousingModel.requestDate(newValue.request_date);
               self.advHousingModel.numbersOfMonthsDesired(newValue.nr_of_month_desired);
               self.advHousingModel.housingAmount(newValue.housing_amount);
                self.advHousingModel.installmentAmount(newValue.installment_amount);
               //self.advHousingModel.personNumber(newValue.person_number);
               self.advHousingModel.hireDate(newValue.hire_date);
              self.advHousingModel.requestDate(newValue.request_date);
               self.advHousingModel.reason(newValue.reason);
               self.advHousingModel.initialAmount(newValue.initial_amount);
                self.advHousingModel.paymentPeriod(newValue.payment_period);
               self.advHousingModel.firstInstallmentPeriod(newValue.first_installment_period);
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
            }//added
           initTranslations();
        }

        self.backAction = function () {
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('advHousingSummary');
                }
        }
                                //language support =========================

           self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.monthsDesired= ko.observable();
            self.monthsRemaining= ko.observable();
            self.housingAmount= ko.observable();
            self.reason= ko.observable();
            self.installmentAmount= ko.observable();
            self.advanceHousingRequest=ko.observable();
            self.back=ko.observable();
            self.personNum=ko.observable();

                        var getTranslation = oj.Translations.getTranslatedString;
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
    function initTranslations() {
          self.back(getTranslation("others.back"));
          self.monthsDesired(getTranslation("advanceHousing.monthsDesired"));
          self.monthsRemaining(getTranslation("advanceHousing.monthsRemaining"));
          self.housingAmount(getTranslation("advanceHousing.housingAmount"));
          self.reason(getTranslation("advanceHousing.reason"));
          self.installmentAmount(getTranslation("advanceHousing.installmentAmount"));
          self.requestDate(getTranslation("labels.requestDate"));
          self.hireDate(getTranslation("labels.hireDate"));
          self.advanceHousingRequest(getTranslation("labels.advanceHousingRequest"));
          self.personNum(getTranslation("common.personNumber"));
        }//added


    }

    return ViewAdvHousingViewModel;
});