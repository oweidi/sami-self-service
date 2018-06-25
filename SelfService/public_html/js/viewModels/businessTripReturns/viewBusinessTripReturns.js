define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'],
    function(oj, ko, $,app,common,services) {

        function ViewBusinessTripViewModel() {
         var self = this;
        this.typeSelectedValue = ko.observable();
        this.countrySelectedValue = ko.observable();
        this.accomSelectedValue = ko.observable();
        this.transSelectedValue = ko.observable();
        this.foodSelectedValue = ko.observable();
        this.selectedAcomOption = ko.observable();
        this.requesterName = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));  
        self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));
        self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
        self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));
        this.specialistSummary = ko.observable("");//added
        
    self.businessTripReturnModel = {
        id : ko.observable(),
        requestDate:  ko.observable(),
        location :  ko.observable(),
        btripId : ko.observable(""),
        btripDesc : ko.observable(""),
        name : ko.observable(),
        personId : rootViewModel.personDetails().personId(),
        type1 : ko.observable(""),
        startdate : ko.observable(""),
        enddate : ko.observable(""),
        country : ko.observable(""),
        status : ko.observable("Initiated"),
        city : ko.observable(""),
        daysbefore : ko.observable(""),
        daysafter : ko.observable(""),
        numberofdays : ko.observable(0),
        accommodation : ko.observable(),
        transport : ko.observable(""),
        food : ko.observable(""),
        accomodationAmount: ko.observable(""),
        transportationAmount: ko.observable(""),
        foodAmount: ko.observable(""),
        perdiem : ko.observable(0),
        totalamount : ko.observable(""),
        ticketclass : ko.observable(""),
        ticketamount : ko.observable(""),
        tso : ko.observable(),
        advanceamount : ko.observable(""),
        managerId : rootViewModel.personDetails().managerId(),
        pnr : ko.observable(""),
        personNumber : rootViewModel.personDetails().personNumber,
        updatedBy:rootViewModel.personDetails().personNumber(),
        updateDate:ko.observable(new Date())
                
    };

    self.handleAttached = function (info) {
         var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }
            initTranslations();
        };

        

        
           ko.postbox.subscribe("viewBtripReturnObj", function (newValue) {
            self.businessTripReturnModel.id(newValue.id);
            self.businessTripReturnModel.city(newValue.city);
            self.businessTripReturnModel.btripId(newValue.btrip_id);
            self.businessTripReturnModel.type1(newValue.type1_code);
            self.businessTripReturnModel.location(newValue.location);
            self.businessTripReturnModel.requestDate(newValue.requestDate);
            self.businessTripReturnModel.country(newValue.country_code);
            self.businessTripReturnModel.status(newValue.status);
            self.businessTripReturnModel.btripDesc(newValue.btrip_reference);
            self.businessTripReturnModel.daysbefore("0");
            self.businessTripReturnModel.daysafter("0");
            self.businessTripReturnModel.numberofdays(newValue.numberofdays);
            self.businessTripReturnModel.accommodation(newValue.accommodationprovided_code);
            self.businessTripReturnModel.transport(newValue.transportationprovided_code);
            self.businessTripReturnModel.food(newValue.foodprovided_code);
            self.businessTripReturnModel.startdate(newValue.startdate);
            self.businessTripReturnModel.enddate(newValue.enddate);

            self.businessTripReturnModel.accomodationAmount(newValue.accomodationamount);
            self.businessTripReturnModel.transportationAmount(newValue.transportationamount);
            self.businessTripReturnModel.foodAmount(newValue.foodamount);
            self.businessTripReturnModel.perdiem(newValue.perdiem);
            self.businessTripReturnModel.totalamount(newValue.totalamount);
            self.businessTripReturnModel.numberofdays(newValue.numberofdays);
            self.businessTripReturnModel.ticketclass(newValue.ticketclass);
            self.businessTripReturnModel.ticketamount(newValue.ticketamount);
            self.businessTripReturnModel.advanceamount(newValue.advanceamount);
            self.businessTripReturnModel.pnr(newValue.pnr);
            self.businessTripReturnModel.name(newValue.name);
            
        });

 
        self.handleDetached = function (info) {
               clearContent();
        };
        
          function clearContent() {
            self.businessTripReturnModel.btripId("");
            self.businessTripReturnModel.type1("");
            self.businessTripReturnModel.btripDesc("");
            self.businessTripReturnModel.startdate("");
            self.businessTripReturnModel.enddate("");
            self.businessTripReturnModel.country("");
            self.businessTripReturnModel.city("");
            self.businessTripReturnModel.daysbefore("0");
            self.businessTripReturnModel.daysafter("0");
            self.businessTripReturnModel.numberofdays("");
            self.businessTripReturnModel.accommodation("");
            self.businessTripReturnModel.transport("");
            self.businessTripReturnModel.food("");
            self.businessTripReturnModel.accomodationAmount("");
            self.businessTripReturnModel.transportationAmount("");
            self.businessTripReturnModel.foodAmount("");
            self.businessTripReturnModel.perdiem("");
            self.businessTripReturnModel.totalamount("");
            self.businessTripReturnModel.ticketclass("");
            self.businessTripReturnModel.ticketamount("");
            self.businessTripReturnModel.tso("");
            self.businessTripReturnModel.advanceamount("");
            self.businessTripReturnModel.perdiem("");
            self.businessTripReturnModel.pnr("");
        }
               this.maxAdvAmount = ko.computed(function() {

                 }
                 );

      

        var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
        var personId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId();



       self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.stepArray = ko.observableArray([]);

   

  


        this.cancelViewBusinessTrip = function () {
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryBusinessTripReturnsSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryBusinessTripReturns');
                }

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
            self.businessTripRequest=ko.observable();
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
            self.accomodationAmount= ko.observable();
            self.tranportationAmount= ko.observable();
            self.foodAmount= ko.observable();
            self.preDiem= ko.observable();
            self.totamount= ko.observable();
            self.ticketclass= ko.observable();
            self.ticketamount= ko.observable();
            self.tsolbl= ko.observable();
            self.PNRlbl= ko.observable();
            self.advanceAmount= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.overLapMessage = ko.observable();
            self.btripDetails = ko.observable();
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
          self.back(getTranslation("others.pervious"));
          self.next(getTranslation("others.next"));
          self.cancel(getTranslation("others.cancel"));
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.editMessage(getTranslation("businessTrip.editMessage"));
          self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
          self.citylbl(getTranslation("businessTrip.city"));
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.daysbefore(getTranslation("businessTrip.daysbefore"));
          self.businessTripRequest(getTranslation("pages.businessTripReturns"));
          self.daysafter(getTranslation("businessTrip.daysafter"));
          self.nodays(getTranslation("labels.nodays"));
          self.accomodationProvided(getTranslation("businessTrip.accomodationProvided"));
          self.tranportationProvided(getTranslation("businessTrip.tranportationProvided"));
          self.foodProvided(getTranslation("businessTrip.foodProvided"));
          self.preDiem(getTranslation("businessTrip.preDiem"));
          self.totamount(getTranslation("businessTrip.totamount"));
          self.ticketclass(getTranslation("businessTrip.ticketclass"));
          self.ticketamount(getTranslation("businessTrip.ticketamount"));
          self.tsolbl(getTranslation("businessTrip.tso"));
          self.PNRlbl(getTranslation("businessTrip.pnr"));
          self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.requestDate(getTranslation("businessTrip.requestDate"));
          self.overLapMessage(getTranslation("businessTrip.overLapMessage"));
          self.accomodationAmount(getTranslation("businessTrip.accomodationAmount"));
          self.tranportationAmount(getTranslation("businessTrip.transportationAmount"));
          self.foodAmount(getTranslation("businessTrip.foodAmount"));
          self.btripDetails(getTranslation("businessTrip.btripDetails"))
         

        }

    }
   

    return new ViewBusinessTripViewModel();
});