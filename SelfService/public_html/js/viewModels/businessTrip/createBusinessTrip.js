define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function CreateBusinessTripViewModel() {
        var self = this;
         var PersonId =0;
        self.isHavePayroll =ko.observable(false); 
        self.isTrainingEvent = ko.observable(false);
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);
        this.disableSubmit = ko.observable(false);
         self.transProvaided = ko.observable(false);
         self.isAcomProvide= ko.observable(false);
        self.IS_Assistant_Manager= ko.observable("NO");
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        this.specialistSummary = ko.observable("");
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });

        self.handleActivated = function (info) {
            //"300000002295618"
            //getEmpDetailsbyPersonId
          
                self.managerOfManager(rootViewModel.personDetails().managerOfManager());
                

            

        };
        // var prevDate = new DATE();
        //--------------Temp Function To Build BT Route ------------------------
        function builBbusinessTripRoute() {
            self.businessTripRoute([]);
            self.businessTripRoute(rootViewModel.globalNadecBTRoute());
        }
        //--------------Temp Function To Build BT Types ------------------------
        function builBbusinessTripTypes() {
            self.types([]);       
           self.types(rootViewModel.globalTypes());
        }
        //-----------------Temp Function To Build City ----------------------
        function buildAllCityArray() {
            self.allCityArray([]);
           // rootViewModel.globalCityLookup()
            self.allCityArray(rootViewModel.globalCityLookup());


        }

      function formatDate(date) {
            //var date = new Date()
            var month = '' + (date.getMonth() + 1), 
                day = '' + date.getDate(), 
                year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        //This Function To Culc Mounth Back 30 Dayes 
        function getPrevMonth() {
            var today = new Date();
            var prevMounth = new Date();//set "today" to October 31, 2008
            var dd = today.getDate();
            var mm = today.getMonth() + 1;//January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            // today.prevMonth(); //show one month earlier -> September 30, 2008 (instead of September 31, 2008 which converts to October 1st, 2008
            for (var i = 0;i < 30;i++) {
                if (dd == 1) {
                    if (mm == 1) {
                        yyyy = yyyy - 1
                        mm = 12
                        dd = 31;
                    }
                    else if (mm == 4 || mm == 6 || mm == 8 || mm == 9 || mm == 11 || mm == 2 || mm == 8) {
                        mm = mm - 1;
                        dd = 31;
                    }
                    else if (mm == 5 || mm == 7 || mm == 10 || mm == 12) {
                        dd = 30;
                        mm--
                    }
                    else if (mm == 3) {
                        dd = 28;
                        mm--
                    }

                }
                else {
                    dd--;
                }
            }

            prevMounth = mm + '/' + dd + '/' + yyyy;

            var minDate = new Date(prevMounth);
            var minDateFormat = formatDate(minDate);

            self.minDate(minDateFormat);
        }
        self.handleAttached = function (info) {
            getPrevMonth();
             self.selectedBusinessTripExtension('N');
            var searchLocation = window.location.search;
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

            //rootViewModel.specialistSelectedEmployee()
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
              //  self.IS_Assistant_Manager
             
              if (rootViewModel.specialistSelectedEmployee().Position=="Assistant Manager - C&B")
               { self.IS_Assistant_Manager('Yes');}
                // rootViewModel.specialistSelectedEmployee().ManagerId==rootViewModel.personDetails().personId()
                 PersonId = rootViewModel.specialistSelectedEmployee().PersonId  
            
             if (rootViewModel.specialistSelectedEmployee().Position=="Assistant Manager - C&B")
               { self.IS_Assistant_Manager('Yes');}
               
               if (rootViewModel.specialistSelectedEmployee().ManagerId == rootViewModel.personDetails().personId()) {
                    self.isManagerApplay("YES");
                }
                else {
                    self.isManagerApplay("NO");
                }
            }
            else {
                self.specialistSummary("false");
                self.isManagerApplay("NO");
                PersonId=  rootViewModel.personDetails().personId();
                if (rootViewModel.personDetails().positionName()=="Assistant Manager - C&B")
               { self.IS_Assistant_Manager('Yes');}
            }
            
            self.currentStepValue('stp1');

            this.selected = ko.observable('stp1');
            self.progressValue = ko.computed(function () {
                return xx();
            },
            this);
            self.empLoc(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Location : rootViewModel.personDetails().employeeLocation());
            self.city("");
            self.trainEvent(" ");
            self.tripDetails("");
            self.noDays("");
            self.selectedCountryFrom("");
            self.selectedTravelBy("");
            self.ticketAmount("");
            self.ticketClass("");
            self.selectedBusinessTripRoute("");
            self.tripDetails("");
            self.val("");
            self.selectedBusinessTripExtension("");
            self.startDate("");
            self.selectedCountry("");
            self.selectedAcomProvided("");
            self.selectedFoodProvided("");
            self.selectedTransProvided("");
            self.selectedType("");
            self.selectedStartDate("");
            self.selectedEndDate("");
            self.endDate("");
            self.nextClick(false);
            self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));

            self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
            self.FromDestinationArray.push( {
                value : " ", label : " "
            });
            self.toDestinationArray.push( {
                value : " ", label : " "
            });
            self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));

            self.yesNoTest = ko.observableArray(["Yes"]);
            //self.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
            var getIdSeqCbFn = function (data) {
                self.tso(data.nexval);
                self.id(data.nexval)
            }
            //getCityReport
            services.getBtripIdSeq().then(getIdSeqCbFn, app.failCbFn);
            //getCityxx
           
              var getEmployeePayrollCBFN = function (data) {
               
                 var payroll=  jQuery.parseJSON(data);
                 if (payroll.length >=1)
                 {self.isHavePayroll(true)}
                
                 
            }
            //getCityReport
            // PersonId = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().personId : rootViewModel.personDetails().personId();
            
            services.getEmployeePayrollReport(PersonId).then(getEmployeePayrollCBFN, app.failCbFn);

            self.nextBtnVisible = ko.observable(true);
            initTranslations();
            builBbusinessTripTypes();

            self.travelBy(app.getPaaSLookup("Travel_BY"));
            builBbusinessTripRoute();
            buildAllCityArray();
            self.selectedBusinessTripExtension('N');
        };

        self.handleDetached = function (info) {

        };

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.toCity =ko.observable("");
        self.allCityArray = ko.observableArray([]);
        self.tripDetails = ko.observable(" ");
        self.selectedTravelBy = ko.observable("");
        self.selectedBusinessTripRoute = ko.observable("");
        self.trainEvent = ko.observable("");
        var managerId = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
        var personId = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId();
        this.selected = ko.observable('stp1');
        this.empLoc = ko.observable(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Location : rootViewModel.personDetails().employeeLocation());
        this.city = ko.observable("");
        self.FromDestinationArray = ko.observableArray([]);
        self.toDestinationArray = ko.observableArray([]);
        self.cityArray = ko.observableArray([]);
        self.managerOfManager = ko.observable("");
        self.isManagerApplay = ko.observable("");
        this.noDays = ko.observable("");
        this.perDiems = ko.observable("");
        this.totAmount = ko.observable(0);
        this.ticketAmount = ko.observable("");
        this.ticketClass = ko.observable("");
        this.tso = ko.observable("");
        this.id = ko.observable(0);

        this.advAmount = ko.observable("");
        this.val = ko.observable("");
        this.startDate = ko.observable();
        this.selectedCountry = ko.observable("");
        self.selectedAcomProvided = ko.observable("");
        this.selectedFoodProvided = ko.observable("");
        this.selectedBusinessTripExtension = ko.observable("");
        this.selectedTransProvided = ko.observable("");
        this.selectedType = ko.observable("");
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        self.selectedCountryFrom = ko.observable("");
        self.selectedCityFrom = ko.observable("");
        this.selectedDayBefore = ko.observable("");
        this.selectedDayAfter = ko.observable("");
        self.isProvide = ko.observable(false);
        this.endDate = ko.observable();
        self.minDate = ko.observable();
        this.componentRequired = ko.observable(true);
        self.isDisabled = ko.observable(false);
        self.isLocal = ko.observable(false);
        self.disabledPerdiem = ko.observable(true);
        this.nextClick = ko.observable(false);
        this.imagesrc = ko.observable("");
        this.dataSourceTB2 = ko.observable();
        self.columnArrayApproval = ko.observableArray([]);
        self.AllowadvAmount = ko.observable("");
        self.isAllowadvAmount = ko.observable(true);
        self.checkValues = ko.observableArray([
        {
            "values" : "Yes"
        },
        {
            "values" : "NO"
        }
]);
        self.comment = ko.observable("");
        self.IS_DRAFT = ko.observable("");
        this.dataTB2 = ko.observableArray([]);

        this.types = ko.observableArray([
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
        this.travelBy = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.businessTripRoute = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.fromDestinationArray = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

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
        function changeDateFormat(date){
           // date.getDay();
           var d = new Date(date || Date.now()), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [day, month, year].join('/');
//            var dd = date.getDate();
//            var mm = date.getMonth() + 1;
//            var yyyy = date.getFullYear();
//            if (mm<10){
//             return dd+"/"+"0"+mm+"/"+yyyy
//            }
//            return dd+"/"+mm+"/"+yyyy
        }
        function overLapPaas (){
           var is_Over_Lap= false 
          var strDate =  changeDateFormat(new Date(self.selectedStartDate()));
           var eDate= changeDateFormat(new Date(self.selectedEndDate()));
             services.getBtPaaSOverLab(strDate,eDate,PersonId).then(function (data) {
           
            if(data.items.length>0){
           
             is_Over_Lap= true ;
            }
            });
            return is_Over_Lap ; 
        }
        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            
            if (self.specialistSummary() && rootViewModel.personDetails().city().toUpperCase() == self.city().toString().toUpperCase()) {
                showNotify('error', self.sameCity());
                return;
            }
            if(self.tripDetails().length<15)
            {
               showNotify('error', self.minCharacters());
                return;
            }
            if (self.isHavePayroll()==false )
            {
                showNotify('error', "No Payroll");
                return;
            }
                  

            if(overLapPaas ()){
                   showNotify('error', self.overLapMessage());
             return;
            }

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
                        showNotify('error', self.overLapMessage());
                        //document.querySelector("#modalDialogAbsenseError").open();
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
            services.getAbsenseReport(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId(), self.selectedStartDate(), self.selectedEndDate()).then(function (data) {
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
        function controllScreen (){
 if (self.city().toString() == "HARADHPROJECT" && self.empLoc().toString() == "Head Office") {
                     self.isProvide(true);
                     self.transProvaided(true);
                     self.isAcomProvide(true);
                    
                    //  isProvide
                }  else if (self.city().toString() == "HAILPROJECT" ||self.city().toString() == "WADIDAWASERPROJECT"
        ||self.city().toString() == "JOUFPROJECT"||self.city().toString() == "HARADHPROJECT") {
                   
                    self.isProvide(true);
                    self.isAcomProvide(true);
                    if (self.city().toString() != "HARADHPROJECT" ){
                          self.transProvaided(false);
                    }
                    
                    
                    
                    //  isProvide
                }
                else {
                    
                    self.isProvide(false);
                    self.transProvaided(false);
                    self.isAcomProvide(false);
                }
				
			computeNumofDays();
         if (self.selectedBusinessTripRoute().toString() == "L") {
				   self.isLocal(true);
				  }else{
				  self.isLocal(false);
				  }
                                  
                                  computeNumofDays();


}
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                 self.isProvide(true);
                 
                self.isDisabled(true);
                self.isLocal(true);
                 self.isProvide(true);
                self.transProvaided(true);
                self.isAcomProvide(true);
                self.isAllowadvAmount(true);
                   
                self.nextBtnVisible(false);

                $('#submitButton').show();
                $('#submitDraft').show();
            }
            else {
                self.isDisabled(false);
                
                self.isLocal(false);
                self.nextBtnVisible(true);
                 self.isProvide(false);
                     self.transProvaided(false);
                     self.isAcomProvide(false);
                     controllScreen ();

                $('#submitButton').hide();
                $('#submitDraft').hide();
            }
            return self.businessTrip();
        };
        this.submitButton = function () {
            self.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //added
        self.commitRecord = function (data, event) {
            addBTripModelRecord();
            return true;
        }
        //save draft
        this.submitDraft = function () {
            self.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            addBTripModelRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///-------------------------To Get To City Label ------------------------
        function toCityLab(code) {
            label = "";
            
            for (var i = 0;i < self.toDestinationArray().length;i++) {
                if (code == self.toDestinationArray()[i].value.toString()) {
                    label = self.toDestinationArray()[i].label;
                }
            }
            return label;
        } 
        function addBTripModelRecord() {
            var preview = document.querySelector('.attClass');
            if (!self.disableSubmit()) {
                self.disableSubmit(true);
            }
            var cityLable = toCityLab(self.city().toString());
             var fcityLable = toCityLab(self.selectedCityFrom().toString());
           
             
            var json = {
                "id" : self.id(),
                "name" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName(),
                "job" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().AssignmentName : rootViewModel.personDetails().assignmentName(),
                "position" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Position : rootViewModel.personDetails().positionName(),
                "department" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Department : rootViewModel.personDetails().departmentName(),
                "grade" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Grade : rootViewModel.personDetails().grade(),
                "number" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId(),
                "type1" : self.selectedType().toString(),
                "startdate" : formatDate(self.startDate()), 
                "enddate" : formatDate(self.endDate()),
                "country" : self.selectedCountry().toString(),
                "city" : self.city().toString(),
                "location" : self.empLoc(),
                "status" : "Pending Approve",
                "commment" : self.comment(),
                "IS_LINE_MANAGER" : self.isManagerApplay(),
                "managerOfManager" : self.managerOfManager(),
                "numberofdays" : self.noDays(),
                "accommodation" : self.selectedAcomProvided().toString(),
                "transport" : self.selectedTransProvided().toString(),
                "food" : self.selectedFoodProvided().toString(),
                "IS_Have_Manager_Of_Manager" : 'HAVE',
                "ticketclass" : self.ticketClass(), 
                "ticketamount" : self.ticketAmount(),
                "tso" : self.tso(),          
                "managerId" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId(),
                "personNumber" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber(), 
                "imageBase64" : preview.src,
                "manegerOfManegar" : self.managerOfManager(),
                "createdBy" : rootViewModel.personDetails().personId(),
                "creationDate" : ko.observable(new Date()),
                "IS_DRAFT" : self.IS_DRAFT(), 
                "TrainingEvent" : self.trainEvent(),
                "TravelBy" : self.selectedTravelBy().toString(),
                "TripDetails" : self.tripDetails(),
                "Route" : self.selectedBusinessTripRoute().toString(),
                "FromCountry" : self.selectedCountryFrom().toString(), 
                "FromCity" : self.selectedCityFrom().toString(),
                "Extension" : self.selectedBusinessTripExtension().toString(),
                "IS_Assistant_Manager":self.IS_Assistant_Manager(),
                "toCityLbl":cityLable,
                  "fromCityLbl":fcityLable
            };
            
            precantageOField(json, 20);

            function formatDate(date) {
                var d = new Date(date || Date.now()), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [day, month, year].join('/');
            }
            var jsonData = ko.toJSON(json);

            var addBusinessTripCbFn = function (data) {
                $.notify(self.createNotify(), "success");
                //  rootViewModel.sendNotification(null,rootViewModel.personDetails().managerId(),'BT','FYA');
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('summaryBusinessTrip');
                }
                self.disableSubmit(false);
            };
            services.addBusinessTrip(jsonData).then(addBusinessTripCbFn, app.failCbFn);

            return true;
        }

        this.startDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                self.selectedStartDate(data.value);
                computeValues(false, true, true, true);

            }
        }

        this.endDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.selectedEndDate(data.value);
                    computeValues(false, true, true, true);
                }
            }
        }
  function getFromCity (code)
    {
   
    var label ;
    
         for (var i=0 ; i<self.country().length;i++)
         {      
             if(code==self.country()[i].value.toString())
             {
               label= self.country()[i].label
               break;
             }
            //value
         }
         var getCityArray = function (data) {
                    self.FromDestinationArray([]);
                         
                       
                      var x=  jQuery.parseJSON(data);
                        $.each(x, function (index, val) {
                        self.FromDestinationArray.push( {
                        value : val.LOOKUP_CODE, label : val.MEANING
                           });
                        })
                   };                   
                     
         services.getCityReport(label).then(getCityArray, app.failCbFn);
         
    }
        this.countryFromChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                   getFromCity(self.selectedCountryFrom().toString());   
                    // self.FromDestinationArray(  rebuildCity(   self.selectedCountryFrom() ,self.FromDestinationArray() ));
                    // self.selectedCountry(data.value);
                    //computeValues(true, true, true, true);
                }
            }
        }
  function getCountryLabel (code)
    {
   
    var label ;
    
         for (var i=0 ; i<self.country().length;i++)
         {      
             if(code==self.country()[i].value.toString())
             {
               label= self.country()[i].label
             }
            //value
         }
         var getEmployeePayrollReport = function (data) {
                    self.toDestinationArray([]);
                         
                       
                      var x=  jQuery.parseJSON(data);
                        $.each(x, function (index, val) {
                        self.toDestinationArray.push( {
                        value : val.LOOKUP_CODE, label : val.MEANING
                           });
                        })
                   };                   
                     
                    services.getCityReport(label).then(getEmployeePayrollReport, app.failCbFn);
         
    }

        this.countryChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.selectedCountry(data.value);
                   
                    computeValues(true, true, true, true);
                     getCountryLabel(self.selectedCountry().toString());          
                   
                }

            }
        }
         this.fromCityChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                     self.selectedCityFrom(self.selectedCityFrom().toString());
                     
                }
                
//                if (self.city().toString() == "HARADHPROJECT" && self.empLoc().toString() == "Head Office") {
//                    self.selectedAcomProvided('Y');
//                    self.selectedTransProvided('Y');
//                    self.selectedFoodProvided('Y');
//                    self.isProvide(true);
//                    
//                    //  isProvide
//                }
//                else {
//                    self.selectedAcomProvided('');
//                    self.selectedTransProvided('');
//                    self.selectedFoodProvided('');
//                    self.isProvide(false);
//                }
            }
        }
        this.cityChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                }
                
                if (self.city().toString() == "HARADHPROJECT" && self.empLoc().toString() == "Head Office") {
                    self.selectedAcomProvided('Y');
                    self.selectedTransProvided('Y');
                    self.selectedFoodProvided('Y');
                     self.isProvide(true);
                     self.transProvaided(true);
                     self.isAcomProvide(true);
                    
                    //  isProvide
                }  else if (self.city().toString() == "HAILPROJECT" ||self.city().toString() == "WADIDAWASERPROJECT"
        ||self.city().toString() == "JOUFPROJECT"||self.city().toString() == "HARADHPROJECT") {
                    self.selectedAcomProvided('Y');
                    self.selectedFoodProvided('Y');
                    self.isProvide(true);
                    self.isAcomProvide(true);
                    if (self.city().toString() != "HARADHPROJECT" ){
                          self.transProvaided(false);
                           self.selectedTransProvided('');
                    }
                    
                    
                    
                    //  isProvide
                }
                else {
                    
                    self.isProvide(false);
                    self.transProvaided(false);
                    if ( self.noDays()!= 1){
                         self.isAcomProvide(false);
                    }
                   
                }
                

            }
        }

        function computeValues(updateTicketClass, updateNumofDays, updatePerDiem, updateTotalAmount) {
            if (self.selectedCountry() && self.selectedType() && self.selectedCountry() != '' && self.selectedType() != '' && updateTicketClass == true) {
                computeDaysBeforeAfter();
                computeTicketClass();
            }
            if (self.selectedCountry() && self.selectedType() && self.selectedStartDate() && self.selectedEndDate() && updateNumofDays == true) {
                computeNumofDays();
            }
            if (self.selectedCountry() && self.selectedType() && self.selectedStartDate() && self.selectedEndDate() && self.selectedAcomProvided() && self.selectedTransProvided() && self.selectedFoodProvided() && updatePerDiem == true) {
                //computePerDiem();
            }
            if (self.selectedCountry() && self.selectedType() && self.selectedStartDate() && self.selectedEndDate() && self.selectedAcomProvided() && self.selectedTransProvided() && self.selectedFoodProvided() && self.perDiems() && updateTotalAmount == true) {
                //computeTotalAmount();
            }
        }

        this.typeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {
                self.selectedType(data.value);
                computeValues(true, true, true, true);
            }
            if (self.selectedType() == "TBT") {
                self.isTrainingEvent(true);
            }
            else if (self.selectedType() == "P") {
                self.isTrainingEvent(false);
//                self.isProvide(true);
//                self.selectedAcomProvided("Y");
//                self.selectedFoodProvided("Y");

            }
            else 
               { self.isTrainingEvent(false);
                
               // self.isProvide(false)
               // self.selectedAcomProvided("");
               // self.selectedFoodProvided("");
                }

        }
        this.travelByChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {

            }

        }
        this.businessTripRouteChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {

                if (data.value.toString() == "L") {
                    self.FromDestinationArray([]);

                    self.selectedCountry("SA");
                     self.selectedCountryFrom("SA");
                    self.isLocal(true);
                    getFromCity(self.selectedCountryFrom().toString()); 
                    getCountryLabel(self.selectedCountry().toString());
                   // self.FromDestinationArray( self.toDestinationArray());
                    

                }
                else {
                    self.FromDestinationArray([]);
                    
                    self.isLocal(false);
                    self.selectedCountry('');
                     self.selectedCountryFrom('');
                    
                }

            }

        }

//        function rebuildCity(countryCode, cityArray) {
//            cityArray = [];
//
//            for (var i = 0;i < self.allCityArray().length;i++) {
//
//                if (self.allCityArray()[i].tag == countryCode) {
//                    cityArray.push( {
//                        value : self.allCityArray()[i].City, label : self.allCityArray()[i].City
//                    });
//
//                }
//            }
//            
//            return cityArray;
//
//        }
        this.stopSelectListener = function (event, ui) {
            var nextSelectableStep = document.getElementById("train").getNextSelectableStep();
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

            else if (nextSelectableStep && !self.nextClick() && self.validateAbsence()) {
                // $("#modalDialogAbsenseError").ojDialog("open");
                document.querySelector("#modalDialogAbsenseError").open();

                event.preventDefault();
                return;
            }

        }

        this.transChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != '') {
                self.selectedTransProvided(data.value);
                computeValues(false, false, true, true);
            }
        }
        this.foodChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != '') {
                self.selectedFoodProvided(data.value);
                computeValues(false, false, true, true);
            }
        }
        this.BTExtensionChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != '') {
                self.selectedBusinessTripExtension(data.value.toString());

            }
        }
        this.acomChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != '') {
                self.selectedAcomProvided(data.value);
                computeValues(false, false, true, true);
            }
        }

        function computeNumofDays(before, after) {

            var startDate = self.selectedStartDate();
            var endDate = self.selectedEndDate();

            if (endDate && startDate) {
                var end = new Date(endDate.split('-')[1] + "/" + endDate.split('-')[2] + "/" + endDate.split('-')[0]);
                var start = new Date(startDate.split('-')[1] + "/" + startDate.split('-')[2] + "/" + startDate.split('-')[0]);
                var timeDiff = Math.abs(end.getTime() - start.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if ((diffDays + 1) == 1) {
                    self.selectedAcomProvided('Y');
                    self.isAcomProvide(true);
                    //self.selectedFoodProvided(Y');
                    //  self.selectedFoodProvided("Y");
                }else if(self.city().toString() != "HAILPROJECT" &&self.city().toString() != "WADIDAWASERPROJECT"
        &&self.city().toString() != "JOUFPROJECT"&&self.city().toString() != "HARADHPROJECT"){
                     self.isAcomProvide(false);
                }
                self.noDays(diffDays + 1);
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

        function computeDaysBeforeAfter() {
            var selCountry = self.selectedCountry();
            var selType = self.selectedType();
            var tableNameDayBefore;
            var tableNameDayAfter;
            var colName;
            var rowName;
            if (selType && selType != '' && selCountry && selCountry != '') {

                if (selType == 'REG') {
                    tableNameDayBefore = "XXX_HR_REG_BTRIP_DAYS_B";
                    tableNameDayAfter = "XXX_HR_REG_BTRIP_DAYS_A";
                }
                else if (selType == 'TRAIN') {
                    tableNameDayBefore = "XXX_HR_TRAIN_BTRIP_DAYS_B";
                    tableNameDayAfter = "XXX_HR_TRAIN_BTRIP_DAYS_A";
                }
                if (selCountry == 'SA') {
                    colName = "Domestic";
                }
                else {
                    colName = "International";
                }
                rowName = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Grade : rootViewModel.personDetails().grade();
                if (tableNameDayBefore && tableNameDayAfter && colName && rowName) {
                    computeNumofDays();
                }
            }
        }

        this.cancelAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryBusinessTrip');
            }

        }

        function computeTicketClass() {
            var selCountry = self.selectedCountry();
            var selType = self.selectedType();
            var tableNameTicketClass;
            var colName;
            var rowName;
            if (selType && selCountry) {

                if (selType == 'REG') {
                    tableNameTicketClass = "XXX_HR_REG_BTRIP_TICKET";
                }
                else if (selType == 'TRAIN') {
                    tableNameTicketClass = "XXX_HR_TRAIN_BTRIP_TICKET";
                }
                if (selCountry == 'SA') {
                    colName = "Domestic";
                }
                else {
                    colName = "International";
                }
                rowName = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Grade : rootViewModel.personDetails().grade();

                if (tableNameTicketClass && colName && rowName) {
                    self.ticketClass(udtLookup(tableNameTicketClass, colName, rowName));
                }
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
        self.employeeLocation = ko.observable();
        self.trainingEvent = ko.observable();
        self.citylbl = ko.observable();
        self.startdate = ko.observable();
        self.enddate = ko.observable();
        self.travelByLbl = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.sameCity = ko.observable();
        self.nodays = ko.observable();
        self.accomodationProvided = ko.observable();
        self.tranportationProvided = ko.observable();
        self.foodProvided = ko.observable();
        self.preDiem = ko.observable();
        self.totamount = ko.observable();
        self.ticketclass = ko.observable();
        self.ticketamount = ko.observable();
        self.tsolbl = ko.observable();
        self.toCityLbl=ko.observable();
        self.advanceAmount = ko.observable();
        self.type = ko.observable();
        self.countrylbl = ko.observable();
        self.overLapMessage = ko.observable();
        self.createNotify = ko.observable();
        self.businessTrip = ko.observable();
        self.attachment = ko.observable();
        self.comment = ko.observable();
        self.commentLbl = ko.observable();
        self.allowAmount = ko.observable();
        self.tripDetailsLbl = ko.observable();
        self.saveDraft = ko.observable();
        self.businessTripRouteLbl = ko.observable();
        self.fromDestinationLbl = ko.observable();
        self.businessTripExtensionLbl = ko.observable();
        self.approvals = ko.observable();
        self.ok = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.ServiceName = ko.observable();
        self.notificationType = ko.observable();
        self.employeeRole = ko.observable();
        self.fromCityLbl = ko.observable();
        self.minCharacters =ko.observable();
         self.tocountryLbl =ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;
        self.refreshView = ko.computed(function () {
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
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
            //self.city(getTranslation("businessTrip.toCity"));
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.addMessage(getTranslation("businessTrip.addMessage"));
            self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
            self.trainingEvent(getTranslation("businessTrip.trainingEvent"));
            self.citylbl(getTranslation("businessTrip.city"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.travelByLbl(getTranslation("businessTrip.travelBy"));
            self.minCharacters(getTranslation("businessTrip.minCharacters"));
            self.nodays(getTranslation("labels.nodays"));
            self.accomodationProvided(getTranslation("businessTrip.accomodationProvided"));
            self.tranportationProvided(getTranslation("businessTrip.tranportationProvided"));
            self.foodProvided(getTranslation("businessTrip.foodProvided"));
            self.preDiem(getTranslation("businessTrip.preDiem"));
            self.totamount(getTranslation("businessTrip.totamount"));
            self.ticketclass(getTranslation("businessTrip.ticketclass"));
            self.ticketamount(getTranslation("businessTrip.ticketamount"));
            self.tsolbl(getTranslation("businessTrip.tso"));
            self.sameCity(getTranslation("businessTrip.sameCity"));
            self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
            self.type(getTranslation("labels.type"));
            self.countrylbl(getTranslation("labels.country"));
            self.overLapMessage(getTranslation("businessTrip.overLapMessage"));
            self.createNotify(getTranslation("businessTrip.createNotify"));
            self.businessTrip(getTranslation("pages.businessTrip"));
            self.comment(getTranslation("others.comment"));
             self.commentLbl(getTranslation("others.comment"));
            self.allowAmount(getTranslation("businessTrip.allowAdvanceAmount"));
            self.attachment(getTranslation("businessTrip.attachment"));
            self.saveDraft(getTranslation("labels.saveDraft"));
            self.tripDetailsLbl(getTranslation("businessTrip.tripDetails"));
            self.businessTripRouteLbl(getTranslation("businessTrip.businessTripRoute"));
            self.fromDestinationLbl(getTranslation("businessTrip.fromDestination"));
            self.businessTripExtensionLbl(getTranslation("businessTrip.businessTripExtension"));
            self.approvals(getTranslation("labels.approvals"));
            self.ok(getTranslation("others.ok"));
            self.ServiceName(getTranslation("labels.ServiceName"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
            self.fromCityLbl(getTranslation("businessTrip.fromCity"));
             self.toCityLbl(getTranslation("businessTrip.toCity"));
             self.tocountryLbl(getTranslation("businessTrip.toCountry"));

            self.columnArrayApproval([
            {
                "headerText" : self.ServiceName(), "field" : "name"
            },
            {
                "headerText" : self.notificationType(), "field" : "type"
            },
            {
                "headerText" : self.employeeRole(), "field" : "status"
            }
]);
            //self.travelBy(  lang());
            self.travelBy(app.getPaaSLookup("Travel_BY"));

        }
        //added
        this.allowAdvanceAmount = function (event, data) {

            if (self.currentStepValue() == 'stp2') {
                self.isAllowadvAmount(true)
                return;
            }
            if (self.AllowadvAmount()[0] == "Yes") {
                self.isAllowadvAmount(false)
            }
            else {
                self.isAllowadvAmount(true)
            }
        }

        function xx() {
            var count = 0;
            if (self.selectedCountry()) {
                count++
            }
            if (self.noDays()) {
                count++
            }
            if (self.selectedAcomProvided()) {
                count++
            }
            if (self.selectedFoodProvided()) {
                count++
            }
            if (self.selectedTransProvided()) {
                count++
            }
            if (self.perDiems() || self.perDiems() == "0") {
                count++
            }
            if (self.totAmount()) {
                count++
            }
            if (self.startDate()) {
                count++
            }
            if (self.selectedCountry()) {
                count++
            }
            if (self.selectedType()) {
                count++
            }
            if (self.endDate()) {
                count++
            }
            if (self.empLoc()) {
                count++
            }
            if (self.city()) {
                count++
            }
            if (self.tso()) {
                count++
            }
            var cc = count * 100 / 14
            return cc;

        }

        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };

        this.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];
        this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "BT", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('BT').then(getApprovalList, app.failCbFn);

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

    }

    return new CreateBusinessTripViewModel();
});

