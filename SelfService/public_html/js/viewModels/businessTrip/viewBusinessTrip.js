define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper',
'config/services','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource',
'ojs/ojdialog','ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 
'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 
'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 
'ojs/ojpopup','ojs/ojknockout-validation'
    ],
    function(oj, ko, $,app,common,services) {

        function ViewBusinessTripViewModel() {
            var self = this;
             var rootViewModel = ko.dataFor(document.getElementById('globalBody'));  
            self.isTravel = ko.observable(false);
            self.isVisable= ko.observable(false);
            self.isEnabeEdit = ko.observable(false);
            this.data = ko.observableArray([]);
            this.dataSource = ko.observable();
            this.selectedRowKey = ko.observable();
            var employee_person_number = '';
            this.specialistSummary = ko.observable("");
            this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
            this.tracker = ko.observable();
            this.typeSelectedValue = ko.observable();
            this.countrySelectedValue = ko.observable();
            this.accomSelectedValue = ko.observable();
            this.transSelectedValue = ko.observable();
            this.foodSelectedValue = ko.observable();
            this.selfServiceURL = ko.observable();
            this.requesterName = ko.observable();
            this.showButton = ko.observable(true);
            self.isTrainingEvent =  ko.observable(false);
            
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            var position = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().Position : rootViewModel.personDetails().positionName();
            
           if (position.toLowerCase() === 'Ticket Agent'.toLowerCase()) {
                                           
                self.showButton(false);
        }

        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");
            });


        this.cancelViewBusinessTrip = function () {
            var prevoisPage = oj.Router.rootInstance._navHistory[2];
            if (prevoisPage == 'notifications') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            else  if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
                }
                else{
                     oj.Router.rootInstance.go('summaryBusinessTrip');
                }

            return true;
        }

        self.handleActivated = function (info) {

        };
        //Temp Array To BUILD Types 
     function builBbusinessTripTypes() {
            self.types([]);
           
           self.types(rootViewModel.globalTypes());
           

        }
 //--------------Temp Function To Build BT Route ------------------------
        function builBbusinessTripRoute() {
            self.businessTripRoute([]);
              self.businessTripRoute(rootViewModel.globalNadecBTRoute());
        }
        //------------------------------------------
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            self.travelBy(app.getPaaSLookup("Travel_BY"));
            self.ticketclassArr(app.getPaaSLookup("Ticket_Class"));
            builBbusinessTripRoute();
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }
            initTranslations();
            self.types = ko.observableArray();
            builBbusinessTripTypes();
            self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
            self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));
            services.getBusinessTripById(rootViewModel.selectedTableRowKey()).then(function (btrip) {  
                                self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
                     pattern : 'dd/MM/yyyy'

                }));
                $.each(btrip.items, function (index, val) {
                    
                    self.typeSelectedValue(val.type1);
                    if (self.typeSelectedValue() == "TBT") {
                        self.isTrainingEvent(true);
                        c
                    }
                    else if (self.typeSelectedValue() == "P") {
                        self.isTrainingEvent(false);
                       

                    }
                    else {
                        self.isTrainingEvent(false);
                    }
                    self.trainEvent(val.training_event);
                    self.selectedTravelBy(val.travel_by);
                    self.tripDetails(val.trip_details);
                    self.selectedBusinessTripRoute(val.route);
                    self.selectedCountryFrom(val.from_country);
                    self.countrySelectedValue(val.country);
                    self.accomSelectedValue(val.accommodationprovided);
                    self.foodSelectedValue(val.foodprovided);
                    self.transSelectedValue(val.transportationprovided);
                    self.city(val.city);
                    self.empLoc(val.employeelocation);
                    self.requesterName(val.name);
                    var evalStartDate = new Date(val.startdate.split('/')[2] + "/" + val.startdate.split('/')[1] + "/" + val.startdate.split('/')[0]);
                    evalStartDate.setDate(evalStartDate.getDate() + 1);
                    var evalEndDate = new Date(val.enddate.split('/')[2] + "/" + val.enddate.split('/')[1] + "/" + val.enddate.split('/')[0]);
                    evalEndDate.setDate(evalEndDate.getDate() + 1);
                    self.startDate(evalStartDate.toISOString());
                    self.endDate(evalEndDate.toISOString());
                   
                    self.noDays(val.numberofdays);
                   
                   
                    self.ticketClass(val.ticketclass);
                    self.ticketAmount(val.ticketamount);
                    self.tso(val.tso);
                    self.pnr(val.pnr);
                    self.fromCity(val.from_city);
                    self.advAmount(val.advanceamount);
                    self.selectedBusinessTripExtension(val.extension);
                    employee_person_number = val.person_number;
                    var preview = document.querySelector('.attClass');
                    preview.src = val.image_base64;

                });

            });
            
            if ( rootViewModel.personDetails().positionName()=='Coordinator - Travel')
            {
                self.isTravel(false);
                self.isVisable(false);
                self.isEnabeEdit(true);
            }
            else{
                self.isTravel(true);
                self.isVisable(true);
            }
          
        };
        self.handleDetached = function (info) {
            self.typeSelectedValue('');
            self.countrySelectedValue('');
            self.accomSelectedValue('');
            self.transSelectedValue('');
            self.foodSelectedValue('');
            self.selfServiceURL('');
            self.requesterName('');
        };

        var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
        var personId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId();
        self.isTrainingEvent =  ko.observable(false);
        this.selected = ko.observable('stp1');
        this.empLoc = ko.observable("");
        this.city = ko.observable("");
        this.daysBefore = ko.observable("");
        this.daysAfter = ko.observable("");
        this.noDays = ko.observable("");
        self.fromCity= ko.observable("");
        self.selectedBusinessTripExtension= ko.observable("");
        self.selectedCountryFrom = ko.observable("");
        self.tripDetails = ko.observable(" ");
        this.totAmount = ko.observable(0);
        this.ticketAmount = ko.observable("");
        this.ticketClass = ko.observable("");
        this.tso = ko.observable("");
        this.pnr = ko.observable("");
        this.advAmount = ko.observable("");
        this.val = ko.observable("");
        this.startDate = ko.observable();
        this.selectedCountry = ko.observable("");
        this.selectedAcomProvided = ko.observable("");
        this.selectedFoodProvided = ko.observable("");
        this.selectedTransProvided = ko.observable("");
        this.selectedType = ko.observable("");
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        self.trainEvent = ko.observable("");
        this.selectedDayBefore = ko.observable("");
        this.selectedDayAfter = ko.observable("");
        self.trainEvent = ko.observable("");
        this.endDate = ko.observable();
        this.componentRequired = ko.observable(true);
        self.selectedTravelBy = ko.observable("");
        self.isDisabled = ko.observable(true);
        self.selectedBusinessTripRoute = ko.observable("");
        this.types = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
this.travelBy = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.yesNo = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.country = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
       this.businessTripRoute = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
     this.ticketclassArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

//ticketclassArr
        this.maxAdvAmount = ko.observable(self.totAmount());

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.commitRecord = function (data, event) {
            editRecord();
            return true;
        }
          //language support =========================
           self.next = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.employeeLocation= ko.observable();
            self.citylbl= ko.observable();
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.editMessage= ko.observable();
            self.daysafter= ko.observable();
            self.nodays= ko.observable();
            self.accomodationProvided= ko.observable();
            self.tranportationProvided= ko.observable();
            self.foodProvided= ko.observable();
            self.preDiem= ko.observable();
            self.totalamount= ko.observable();
            self.ticketclass= ko.observable();
            self.ticketamount= ko.observable();
            self.tsolbl= ko.observable();
            self.PNRlbl= ko.observable();
            self.advanceAmount= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.overLapMessage = ko.observable();
            self.businessTripRequest = ko.observable();
            self.trainingEvent= ko.observable();
            self.travelByLbl = ko.observable();
            self.tripDetailsLbl = ko.observable();
            self.businessTripRouteLbl = ko.observable();
            self.fromDestinationLbl = ko.observable();
            self.submit = ko.observable();
            self.businessTripExtensionLbl = ko.observable();
            self.tocountryLbl =ko.observable();
            self.toCityLbl=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
          self.submit(getTranslation("others.submit"));
          self.yes(getTranslation("others.yes"));
          self.no(getTranslation("others.no"));
          self.back(getTranslation("others.back"));
          self.next(getTranslation("others.next"));
          self.cancel(getTranslation("others.cancel"));
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.editMessage(getTranslation("businessTrip.editMessage"));
          self.businessTripExtensionLbl(getTranslation("businessTrip.businessTripExtension"));
          self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
          self.citylbl(getTranslation("businessTrip.city"));
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.daysbefore(getTranslation("businessTrip.daysbefore"));
          self.daysafter(getTranslation("businessTrip.daysafter"));
          self.nodays(getTranslation("labels.nodays"));
          self.accomodationProvided(getTranslation("businessTrip.accomodationProvided"));
          self.tranportationProvided(getTranslation("businessTrip.tranportationProvided"));
          self.foodProvided(getTranslation("businessTrip.foodProvided"));
          self.preDiem(getTranslation("businessTrip.preDiem"));
          self.totalamount(getTranslation("businessTrip.totamount"));
          self.ticketclass(getTranslation("businessTrip.ticketclass"));
          self.ticketamount(getTranslation("businessTrip.ticketamount"));
          self.tsolbl(getTranslation("businessTrip.tso"));
          self.PNRlbl(getTranslation("businessTrip.pnr"));
          self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.overLapMessage(getTranslation("businessTrip.overLapMessage"));
          self.businessTripRequest(getTranslation("labels.businessTripRequest"));
          self.trainingEvent(getTranslation("businessTrip.trainingEvent"));
          self.travelByLbl(getTranslation("businessTrip.travelBy"));
          self.tripDetailsLbl(getTranslation("businessTrip.tripDetails"));
          self.businessTripRouteLbl(getTranslation("businessTrip.businessTripRoute"));
          self.fromDestinationLbl(getTranslation("businessTrip.fromDestination"));
            self.travelBy(app.getPaaSLookup("Travel_BY"));
            self.ticketclassArr(app.getPaaSLookup("Ticket_Class"));
            self.tocountryLbl(getTranslation("businessTrip.toCountry"));
           self.toCityLbl(getTranslation("businessTrip.toCity"));
        }//added
        
        this.submitButton = function () {
           var json = {
                "id" : rootViewModel.selectedTableRowKey(), 
                 "ticketclass" : self.ticketClass().toString(),
                 "ticketamount" : self.ticketAmount()               
                }
                 var jsonData = ko.toJSON(json);
                  var editBusinessTripCbFn = function (data) {
                $.notify("Done", "success");
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('summaryBusinessTrip');
                }
              
            };
                 services.editBusinessTrip(jsonData).then(editBusinessTripCbFn, app.failCbFn);
        };


    }

    return new ViewBusinessTripViewModel();
});