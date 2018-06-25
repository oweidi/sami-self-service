define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function CreateBusinessTripViewModel() {
        var self = this;
         
        this.disableSubmit = ko.observable(false);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.nextBtnVisible = ko.observable(true);
        self.btripReference = ko.observableArray([]);
        self.clickedButton = ko.observable("");
        self.saveCalled = ko.observable(false);
         this.specialistSummary = ko.observable("");
         var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.progressValue=ko.computed(function() {
                return 0;
    }, this);
         
        ko.postbox.subscribe("btripReferenceObj", function (newValue) {
            self.btripReference(newValue);
            
        });

        self.handleActivated = function (info) {
//                       self.nextBtnVisible = ko.observable(true);


        };

        this.selected = ko.observable('stp1');

        this.componentRequired = ko.observable(true);
        self.isDisabled = ko.observable(false);
        self.disabledPerdiem = ko.observable(true);
        this.nextClick = ko.observable(false);
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

            self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));
            self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
            self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));
        this.maxAdvAmount = ko.computed(function() {
 
        });

    self.stepArray = ko.observableArray([]);
    self.currentDate=ko.observable(formatDate(new Date()));
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
    
            return [year, month, day].join('-');
        }
    self.businessTripReturnModel = {
        requestDate: self.currentDate(),
        location : ko.observable(rootViewModel.personDetails().employeeLocation()),
        btripId : ko.observable(""),
        name : ko.observable(""), 
        personId : ko.observable(""),
        type1 : ko.observable(""),
        startdate : ko.observable(""),
        enddate : ko.observable(""),
        country : ko.observable(""),
        status : ko.observable("Initiated"),
        city : ko.observable(""),
        daysbefore : ko.observable("0"),
        daysafter : ko.observable("0"),
        numberofdays : ko.observable(0),
        accommodation : ko.observable(),
        transport : ko.observable(""),
        food : ko.observable(""),
        accomodationAmount: ko.observable("0"),
        transportationAmount: ko.observable("0"),
        foodAmount: ko.observable("0"),
        perdiem : ko.observable(0),
        totalamount : ko.observable(""),
        ticketclass : ko.observable(""),
        ticketamount : ko.observable(""),
        tso : ko.observable(),
        advanceamount : ko.observable(""),
        managerId : ko.observable(""), 
        pnr : ko.observable(""),
        personNumber : ko.observable(""),
        creationDate : ko.observable(new Date()),
        createdBy : rootViewModel.personDetails().personNumber(),
        IS_DRAFT : ko.observable("")
    };
        self.handleAttached = function (info) {
        initTranslations();
        var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }
            self.currentStepValue('stp1');
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            initTranslations();
            self.nextClick(false);  
            self.progressValue = ko.computed(function () {       
                return precantageOField(self.businessTripReturnModel, 21);
            },
            this);
        };




        self.populateFromBtripReference = ko.computed(function () {
            if (self.businessTripReturnModel.btripId()) {

                var btripId = self.businessTripReturnModel.btripId().toString();
                  for (var i = 0;i < self.btripReference().length;i++) { 
                   if (self.btripReference()[i].id.toString() === btripId && self.saveCalled() === false) {
                    var evalStartDate = new Date(self.btripReference()[i].startdate.split('/')[2] + "/" + self.btripReference()[i].startdate.split('/')[1] + "/" +self.btripReference()[i].startdate.split('/')[0]);
                    evalStartDate.setDate(evalStartDate.getDate() + 1);
                    var evalEndDate = new Date(self.btripReference()[i].enddate.split('/')[2] + "/" + self.btripReference()[i].enddate.split('/')[1] + "/" + self.btripReference()[i].enddate.split('/')[0]);
                    evalEndDate.setDate(evalEndDate.getDate() + 1);

                       self.businessTripReturnModel.type1(self.btripReference()[i].type1_code); 
                       self.businessTripReturnModel.location(self.btripReference()[i].location); 
                       self.businessTripReturnModel.country(self.btripReference()[i].country_code); 
                       self.businessTripReturnModel.city(self.btripReference()[i].city); 
                       self.businessTripReturnModel.startdate(evalStartDate.toISOString()); 
                       self.businessTripReturnModel.enddate(evalEndDate.toISOString());
                       self.businessTripReturnModel.accommodation(self.btripReference()[i].accommodationprovided_code); 
                       self.businessTripReturnModel.transport(self.btripReference()[i].transportationprovided_code); 
                       self.businessTripReturnModel.food(self.btripReference()[i].foodprovided_code);
                       self.businessTripReturnModel.ticketclass(self.btripReference()[i].ticketclass); 
                       self.businessTripReturnModel.pnr(self.btripReference()[i].pnr); 
                       self.businessTripReturnModel.advanceamount(self.btripReference()[i].advanceamount);
                       break;
                   }
                  }
         
            }
        });
        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            self.nextClick(false);
            if (prev != null)
                self.currentStepValue(prev);
        }
        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            else {
                var next = document.getElementById("train").getNextSelectableStep();
                if (next != null) {
                    if (!this.validateAbsence()) {
                        self.nextClick(true);
                        self.currentStepValue(next);
                    }
                    else {
                     
                         $.notify(getTranslation("businessTrip.overLapMessage"), "error");
                    }
                }

            }
        }

        this.closeDialog = function () {
            document.querySelector("#modalDialogAbsenseError").close();
        }
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.validateAbsence = function () {
            var absenceExists = false;
            services.getAbsenseReport(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId(), self.businessTripReturnModel.startdate(), self.businessTripReturnModel.enddate()).then(function (data) {
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                documents.children('G_1').each(function () {
                    absenceExists = true;
                });

            },
            app.failCbFn);
            return absenceExists;
        };

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.disabledPerdiem(true);
                self.nextBtnVisible(false);

                $('#submitButton').show();
                $('#submitDraft').show();
            }
            else {
                self.isDisabled(false);
                self.nextBtnVisible(true);

                $('#submitButton').hide();
                $('#submitDraft').hide();
            }
            return self.businessTripReturns();
        };
        this.submitButton = function () {
            self.businessTripReturnModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //added
        self.commitRecord = function (data, event) {            
            addBTripReturnModelRecord();
            return true;
        }
        //save draft
        this.submitDraft = function () {
            self.businessTripReturnModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addBTripReturnModelRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        function  addBTripReturnModelRecord() {
         self.saveCalled(true);
        if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);
            self.businessTripReturnModel.type1(self.businessTripReturnModel.type1().toString());
            self.businessTripReturnModel.country(self.businessTripReturnModel.country().toString());
            self.businessTripReturnModel.accommodation(self.businessTripReturnModel.accommodation().toString());
            self.businessTripReturnModel.transport(self.businessTripReturnModel.transport().toString());
            self.businessTripReturnModel.food(self.businessTripReturnModel.food().toString());
            self.businessTripReturnModel.btripId(self.businessTripReturnModel.btripId().toString());
            self.businessTripReturnModel.startdate(formatDate(new Date(self.businessTripReturnModel.startdate().substring(0, 10))));
            self.businessTripReturnModel.enddate(formatDate(new Date(self.businessTripReturnModel.enddate().substring(0, 10))));  
            self.businessTripReturnModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.businessTripReturnModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.businessTripReturnModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.businessTripReturnModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            var jsonData = ko.toJSON(self.businessTripReturnModel);
            var addBusinessTripReturnsCbFn = function (data) {
                $.notify(self.notifyCreate(), "success");
                 if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryBusinessTripReturnsSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryBusinessTripReturns');
                }
            };
            services.addBusinessTripReturns(jsonData).then(addBusinessTripReturnsCbFn, app.failCbFn);
         }
           return true;
        }
//                self.computeDaysBeforeAfter = ko.computed(function() {
//            if (self.businessTripReturnModel.type1() && self.businessTripReturnModel.country()   ) {
//            var selCountry = self.businessTripReturnModel.country().toString() ;
//            var selType = self.businessTripReturnModel.type1().toString();
//            var tableNameDayBefore;
//            var tableNameDayAfter;
//            var colName;
//            var rowName;
//            if (selType && selType != '' && selCountry && selCountry != '' && self.saveCalled() === false) {
//
//                if (selType == 'REG') {
//                    tableNameDayBefore = "XXX_HR_REG_BTRIP_DAYS_B";
//                    tableNameDayAfter = "XXX_HR_REG_BTRIP_DAYS_A";
//                }
//                else if (selType == 'TRAIN') {
//                    tableNameDayBefore = "XXX_HR_TRAIN_BTRIP_DAYS_B";
//                    tableNameDayAfter = "XXX_HR_TRAIN_BTRIP_DAYS_A";
//                }
//                if (selCountry == 'SA') {
//                    colName = "Domestic";
//                }
//                else {
//                    colName = "International";
//                }
//                rowName = rootViewModel.personDetails().grade();
//                if (tableNameDayBefore && tableNameDayAfter && colName && rowName) {
//                    self.businessTripReturnModel.daysbefore(udtLookup(tableNameDayBefore, colName, rowName));
//                    self.businessTripReturnModel.daysafter(udtLookup(tableNameDayAfter, colName, rowName));
//                }
//            }
//            }
//        });
        self.computeNumofDays = ko.computed(function () {
            if (self.businessTripReturnModel.startdate() && self.businessTripReturnModel.enddate() && (self.businessTripReturnModel.daysbefore() || self.businessTripReturnModel.daysbefore() == '0') 
                && (self.businessTripReturnModel.daysafter() || self.businessTripReturnModel.daysbefore() == '0') && self.saveCalled() === false) {
                var startDate = self.businessTripReturnModel.startdate();
                var endDate = self.businessTripReturnModel.enddate();
                var daysBefore = self.businessTripReturnModel.daysbefore();
                var daysAfter = self.businessTripReturnModel.daysafter();
                var end = new Date(endDate.split('-')[1] + "/" + endDate.split('-')[2].substring(0, 2) + "/" + endDate.split('-')[0]);
                var start = new Date(startDate.split('-')[1] + "/" + startDate.split('-')[2].substring(0, 2) + "/" + startDate.split('-')[0]);
                var timeDiff = Math.abs(end.getTime() - start.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                self.businessTripReturnModel.numberofdays( + diffDays +  + daysBefore +  + daysAfter +  + 1);
            }
        });
        
        self.computePerDiem = ko.computed(function () {
            var selCountry = self.businessTripReturnModel.country().toString() ;
            var selType = self.businessTripReturnModel.type1().toString();
            var accomodate=self.businessTripReturnModel.accommodation();
            var food=self.businessTripReturnModel.food();
            var transport=self.businessTripReturnModel.transport();
            var tableNamePerDiem;
            var colName;
            var rowName;
            if (self.businessTripReturnModel.type1() && self.businessTripReturnModel.country() && self.businessTripReturnModel.startdate() && self.businessTripReturnModel.enddate()
                && (self.businessTripReturnModel.daysbefore() || self.businessTripReturnModel.daysbefore() == '0') 
                && (self.businessTripReturnModel.daysafter() || self.businessTripReturnModel.daysbefore() == '0')
                && (self.businessTripReturnModel.numberofdays() || self.businessTripReturnModel.numberofdays() == '0')&& accomodate
                && food && transport && self.saveCalled() === false) {
                if (selType == 'REG') {
                    tableNamePerDiem = "XXX_HR_REG_BTRIP_PERDIEM";
                }
                else if (selType == 'TRAIN') {
                    tableNamePerDiem = "XXX_HR_TRAIN_BTRIP_PERDIEM";
                }
                if (selCountry == 'SA') {
                    colName = "Domestic";
                }
                else {
                    colName = "International";
                }
                rowName = rootViewModel.personDetails().grade();

                if (tableNamePerDiem && colName && rowName) {
                    var code = udtLookup(tableNamePerDiem, colName, rowName);
//                    code='Per Invoice'; //uncommment to test per-invoice scenario
                    if (code === 'Per Invoice') {
                        self.disabledPerdiem(false);
                        $('#perDiems').attr("placeholder", "Per Invoice");
//                        if(!(self.businessTripReturnModel.accomodationAmount() && self.businessTripReturnModel.transportationAmount()&& self.businessTripReturnModel.foodAmount())){
//                            self.businessTripReturnModel.accomodationAmount("0");
//                            self.businessTripReturnModel.transportationAmount("0");
//                            self.businessTripReturnModel.foodAmount("0");
//                        }
                    }
                    else {
                        if (self.businessTripReturnModel.accommodation().toString() == 'Y') {
                            calcAccomodation = 0;
                        }
                        else if (self.businessTripReturnModel.accommodation().toString() == 'N') {
                            calcAccomodation =  + code *  + 0.5;
                        }
                        if (self.businessTripReturnModel.transport().toString() == 'Y') {
                            calcTransport = 0;
                        }
                        else if (self.businessTripReturnModel.transport().toString() == 'N') {
                            calcTransport =  + code *  + 0.25;
                        }

                        if (self.businessTripReturnModel.food().toString() == 'Y') {
                            calcFood = 0;
                        }
                        else if (self.businessTripReturnModel.food().toString()== 'N') {
                            calcFood =  + code *  + 0.25;
                        }
                        var perDM =  + calcAccomodation +  + calcTransport +  + calcFood;
                        self.businessTripReturnModel.perdiem(perDM);
                        self.businessTripReturnModel.accomodationAmount(calcAccomodation);
                        self.businessTripReturnModel.transportationAmount(calcTransport);
                        self.businessTripReturnModel.foodAmount(calcFood);
                        if (perDM == '0') {
                             self.businessTripReturnModel.ticketamount("0");
                        }
                    }

                }
            }
        });
        
         self.computeTotalAmount = ko.computed(function () {
            if ((self.businessTripReturnModel.numberofdays() || self.businessTripReturnModel.numberofdays() == '0')
                    && (self.businessTripReturnModel.perdiem() || self.businessTripReturnModel.perdiem()== '0') && self.saveCalled() === false) {
                if (self.businessTripReturnModel.perdiem()  == '0' || self.businessTripReturnModel.numberofdays() == '0') {
                    self.businessTripReturnModel.totalamount("0");
                }
                else {
                     self.businessTripReturnModel.totalamount( +self.businessTripReturnModel.numberofdays() *  +self.businessTripReturnModel.perdiem());
                }
            }
        });


        this.stopSelectListener = function (event, ui) {
            var nextSelectableStep = document.getElementById("train").getNextSelectableStep();
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

            else if (nextSelectableStep && !self.nextClick() && self.validateAbsence()) {
                 $.notify(getTranslation("businessTrip.overLapMessage"), "error");
                event.preventDefault();
                return;
            }

        }

        function udtLookup(tableName, colName, rowName) {
            var searchUDTArray = rootViewModel.globalUDTLookup();
            for (var i = 0;i < searchUDTArray.length;i++) {
                if (searchUDTArray[i].tableName === tableName && searchUDTArray[i].colName === colName && searchUDTArray[i].rowName === rowName) {
                    return searchUDTArray[i].value;
                }
            }
        }

        this.cancelAction = function () {
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
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.addMessage= ko.observable();
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
            self.btripDetails = ko.observable();
            self.businessTripReturns = ko.observable();
            self.saveDraft = ko.observable();
            self.notifyCreate = ko.observable();
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
          self.addMessage(getTranslation("businessTrip.addMessage"));
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
          self.totamount(getTranslation("businessTrip.totamount"));
          self.ticketclass(getTranslation("businessTrip.ticketclass"));
          self.ticketamount(getTranslation("businessTrip.ticketamount"));
          self.tsolbl(getTranslation("businessTrip.tso"));
          self.PNRlbl(getTranslation("businessTrip.pnr"));
          self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.requestDate(getTranslation("businessTrip.requestDate"));
          self.accomodationAmount(getTranslation("businessTrip.accomodationAmount"));
          self.tranportationAmount(getTranslation("businessTrip.transportationAmount"));
          self.foodAmount(getTranslation("businessTrip.foodAmount"));
          self.btripDetails(getTranslation("businessTrip.btripDetails"));
          self.businessTripReturns(getTranslation("pages.businessTripReturns"));
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.notifyCreate(getTranslation("businessTripReturn.notifyCreate"));
        }
        self.handleDetached = function (info) {
            clearContent();
        };

        
        function clearContent() {
            self.businessTripReturnModel.btripId("");
            self.businessTripReturnModel.type1("");
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
            self.businessTripReturnModel.accomodationAmount("0");
            self.businessTripReturnModel.transportationAmount("0");
            self.businessTripReturnModel.foodAmount("0");
            self.businessTripReturnModel.perdiem("");
            self.businessTripReturnModel.totalamount("");
            self.businessTripReturnModel.ticketclass("");
            self.businessTripReturnModel.ticketamount("");
            self.businessTripReturnModel.tso("");
            self.businessTripReturnModel.advanceamount("");
            self.businessTripReturnModel.perdiem("");
            self.businessTripReturnModel.pnr("");
            self.clickedButton("");
            self.saveCalled(false);
        }
        self.label = {text: self.progressValue(), style: {color:'white'}};       
        self.thresholdValues = [{max: 33}, {max: 67}, {}];
    }

    return new CreateBusinessTripViewModel();
});