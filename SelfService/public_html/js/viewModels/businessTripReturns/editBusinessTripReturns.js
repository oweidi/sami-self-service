define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditBusinessTripViewModel() {
        var self = this;
        self.currentStepValue = ko.observable('stp1');
        this.disableSubmit = ko.observable(false);
        self.tracker = ko.observable();
        this.typeSelectedValue = ko.observable();
        this.countrySelectedValue = ko.observable();
        this.accomSelectedValue = ko.observable();
        this.transSelectedValue = ko.observable();
        this.foodSelectedValue = ko.observable();
        this.selectedAcomOption = ko.observable();
        this.nextClick = ko.observable(false);
        self.saveCalled = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));  
        self.btripReference = ko.observableArray([]);
        self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));
        self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
        self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));
        this.specialistSummary = ko.observable(""); 
        self.oldBtripId = ko.observable();
        
    self.businessTripReturnModel = {
        id : ko.observable(),
        requestDate:  ko.observable(),
        location :  ko.observable(),
        btripId : ko.observable(""),
        btripDesc : ko.observable(""),
        name : ko.observable(),
        personId : ko.observable(""),
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
        managerId : ko.observable(""),
        pnr : ko.observable(""),
        personNumber : ko.observable(""),
        updatedBy:rootViewModel.personDetails().personNumber(),
        updateDate:ko.observable(new Date())
                
    };
        self.handleActivated = function (info) {
                    
        };
    self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            initTranslations();
            self.nextClick(false);        
        };

        
             ko.postbox.subscribe("btripReferenceObj", function (newValue) {
               self.btripReference(newValue);
               if(self.businessTripReturnModel.btripId()){
                   var btrip=self.businessTripReturnModel.btripId().toString();
                   self.businessTripReturnModel.btripId(btrip);
               }
             
        });
        
           ko.postbox.subscribe("editBtripReturnObj", function (newValue) {
            self.businessTripReturnModel.id(newValue.id);
            self.businessTripReturnModel.city(newValue.city);
            self.businessTripReturnModel.btripId(newValue.btrip_id);
            self.businessTripReturnModel.type1(newValue.type1_code);
            self.businessTripReturnModel.location(newValue.location);
            self.businessTripReturnModel.requestDate(newValue.requestDate);
            self.businessTripReturnModel.startdate(newValue.startdate);
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
            self.clickedButton("");
            self.oldBtripId("");
            self.saveCalled(false);
        }

      

        var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
        var personId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId();

        this.selected = ko.observable('stp1');

        this.componentRequired = ko.observable(true);

        self.isDisabled = ko.observable(false);
        self.disabledPerdiem = ko.observable(true);


               this.maxAdvAmount = ko.computed(function() {

                 }
                 );


        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.stepArray = ko.observableArray([]);

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

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.disabledPerdiem(true);
                self.nextBtnVisible(false);

                $('#add').show();
            }
            else {
                self.isDisabled(false);
                  self.nextBtnVisible(true);
                $('#add').hide();
            }
            return getTranslation("pages.businessTripReturns");
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
                this.populateFromBtripHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.value != '' && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                 var btripId=self.businessTripReturnModel.btripId().toString();
                           if (self.businessTripReturnModel.btripId()  ) {
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
            }
        }

//                self.computeDaysBeforeAfter = ko.computed(function() {
//            if (self.businessTripReturnModel.type1() && self.businessTripReturnModel.country()   ) {
//            var selCountry = self.businessTripReturnModel.country().toString() ;
//            var selType = self.businessTripReturnModel.type1().toString();
//            var tableNameDayBefore;
//            var tableNameDayAfter;
//            var colName;
//            var rowName;
//            if (selType && selType != '' && selCountry && selCountry != '') {
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
                && (self.businessTripReturnModel.daysafter() || self.businessTripReturnModel.daysbefore() == '0')  && self.saveCalled() === false) {
                var startDate = self.businessTripReturnModel.startdate();
                var endDate = self.businessTripReturnModel.enddate();
                var daysBefore = self.businessTripReturnModel.daysbefore();
                var daysAfter = self.businessTripReturnModel.daysafter();
                var end = new Date(endDate.split('-')[1] + "/" + endDate.split('-')[2].substr(0,2)+ "/" + endDate.split('-')[0]);
                var start = new Date(startDate.split('-')[1] + "/" + startDate.split('-')[2].substr(0,2) + "/" + startDate.split('-')[0]);
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
                && food && transport  && self.saveCalled() === false) {
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
//                    code='Per Invoice'; //luncommment to test per-invoice scenario
                    if (code === 'Per Invoice') {
                        self.disabledPerdiem(false);
                        $('#perDiems').attr("placeholder", "Per Invoice");
                         if (self.businessTripReturnModel.accommodation().toString() == 'Y') {
                            self.businessTripReturnModel.accomodationAmount("0");                            
                         }
                          if (self.businessTripReturnModel.transport().toString() == 'Y') {
                             self.businessTripReturnModel.transportationAmount("0");
                        }
                        if (self.businessTripReturnModel.food().toString() == 'Y') {
                             self.businessTripReturnModel.foodAmount("0");
                        }
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
                    && (self.businessTripReturnModel.perdiem() || self.businessTripReturnModel.perdiem()== '0')  && self.saveCalled() === false) {
                if (self.businessTripReturnModel.perdiem()  == '0' || self.businessTripReturnModel.numberofdays() == '0') {
                    self.businessTripReturnModel.totalamount("0");
                }
                else {
                     self.businessTripReturnModel.totalamount( +self.businessTripReturnModel.numberofdays() *  +self.businessTripReturnModel.perdiem());
                }
            }
        });

        self.commitRecord = function () {
         self.saveCalled(true);
           if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);
            self.businessTripReturnModel.type1(self.businessTripReturnModel.type1().toString());
            self.businessTripReturnModel.country(self.businessTripReturnModel.country().toString());
            self.businessTripReturnModel.accommodation(self.businessTripReturnModel.accommodation().toString());
            self.businessTripReturnModel.transport(self.businessTripReturnModel.transport().toString());
            self.businessTripReturnModel.food(self.businessTripReturnModel.food().toString());
            self.businessTripReturnModel.btripId(self.businessTripReturnModel.btripId().toString());
            self.businessTripReturnModel.startdate(self.businessTripReturnModel.startdate().substr(0, 10));
            self.businessTripReturnModel.enddate(self.businessTripReturnModel.enddate().substr(0, 10)); 
             self.businessTripReturnModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.businessTripReturnModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.businessTripReturnModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.businessTripReturnModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            var jsonData = ko.toJSON(self.businessTripReturnModel);
            var editBusinessTripReturnsCbFn = function (data) {
                $.notify(self.notfiyEdited(), "success");
                oj.Router.rootInstance.go('summaryBusinessTripReturns');
            };
            services.editBusinessTripReturns(jsonData).then(editBusinessTripReturnsCbFn, app.failCbFn);
           }
        }


        this.stopSelectListener = function (event, ui) {
            var nextSelectableStep = $("#train").ojTrain("getNextSelectableStep");
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
        this.closeDialog = function () {
            document.querySelector("#modalDialogAbsenseError").close();
        }

        self.validateAbsence = function () {
            var absenceExists = false;
            services.getAbsenseReport(rootViewModel.personDetails().personId(),  self.businessTripReturnModel.startdate(), self.businessTripReturnModel.enddate()).then(function (data) {
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
            self.notfiyEdited = ko.observable();
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
          self.notfiyEdited(getTranslation("businessTripReturn.notfiyEdited"));
        }

    }

    return new EditBusinessTripViewModel();
});