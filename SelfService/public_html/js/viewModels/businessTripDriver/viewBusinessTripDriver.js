define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog','ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojknockout-validation'],function(oj, ko, $,app,common,services) {

    function ViewBusinessTripDriverModel() {
        var self = this;
        self.isVisible=ko.observable(false);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        
        self.driverAreaArray = ko.observableArray(rootViewModel.globalBTripDriverArea());
        self.driverTypeArray = ko.observableArray(rootViewModel.globalBTripDriverType());
        
         self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        this.specialistSummary = ko.observable("");//added
        self.bTripDriverModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            id:ko.observable(),
            type : ko.observable(""),
            area : ko.observable(""),
            totalKm : ko.observable(""), 
            tripsNumber : ko.observable(""),
            startDate : ko.observable(""),
            endDate : ko.observable(""),
            daysNumber : ko.observable(""),
            notes : ko.observable(""),
            paymentPeriod : ko.observable(""),
            personNumber : rootViewModel.personDetails().personNumber(), 
            managerId : rootViewModel.personDetails().managerId(),
            name : rootViewModel.personDetails().displayName(),
            imageBase64 : ko.observable("")

        };

            
              ko.postbox.subscribe("viewBusinessTripDriverObj", function (newValue) {
                            self.bTripDriverModel.id(newValue.id);
                            self.bTripDriverModel.requestDate(newValue.request_date);
                            self.bTripDriverModel.type(searchArray(newValue.type,self.driverTypeArray()));
                             self.bTripDriverModel.area(searchArray(newValue.area,self.driverAreaArray()));
                            self.bTripDriverModel.totalKm(newValue.total_kilo_meters);
                            self.bTripDriverModel.tripsNumber(newValue.trips_number);
                            self.bTripDriverModel.startDate(newValue.start_date);
                            self.bTripDriverModel.endDate(newValue.end_date);
                            self.bTripDriverModel.notes(newValue.notes);
                            self.bTripDriverModel.daysNumber(newValue.days_number);
                            self.bTripDriverModel.paymentPeriod(newValue.payment_period);
                            self.bTripDriverModel.imageBase64(newValue.image_base64);

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
            var preview = document.querySelector('.attClass');
            preview.src = self.bTripDriverModel.imageBase64();

                 initTranslations();
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('businessTripDriverSummary');
                }
        }
 //language support =========================
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.citylbl= ko.observable();
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.nodays= ko.observable();
            self.businessTripDriverRequest= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.totalKM = ko.observable();
            self.tripsNumber = ko.observable();
            self.notes = ko.observable();
            self.paymentperiod = ko.observable();
            self.attachment = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
       
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.nodays(getTranslation("labels.nodays"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.businessTripDriverRequest(getTranslation("pages.businessTripDriverRequest"));
          self.totalKM(getTranslation("businessTripDriver.totalKm"));
          self.tripsNumber(getTranslation("businessTripDriver.tripsNumber"));
          self.notes(getTranslation("businessTripDriver.notes"));
          self.requestDate(getTranslation("labels.requestDate"));
          self.back(getTranslation("others.back"));
          self.paymentperiod(getTranslation("labels.paymentperiod")); 
          self.attachment(getTranslation("businessTrip.attachment"));//added


        }//added

    }

    return ViewBusinessTripDriverModel;
});