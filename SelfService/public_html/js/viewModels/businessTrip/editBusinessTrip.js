define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditBusinessTripViewModel() {
        var self = this;
        self.isHavePayroll = ko.observable(false);
        self.isTrainingEvent = ko.observable(true);
        self.currentStepValue = ko.observable('stp1');
        this.disableSubmit = ko.observable(false);
        var id =0;
         self.isAcomProvide= ko.observable(false);
        self.tracker = ko.observable();
         self.transProvaided = ko.observable(false);
        this.typeSelectedValue = ko.observable();
        this.countrySelectedValue = ko.observable();
        this.accomSelectedValue = ko.observable();
        this.transSelectedValue = ko.observable();
        this.foodSelectedValue = ko.observable();
        this.selectedAcomOption = ko.observable();
        this.nextClick = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        this.specialistSummary = ko.observable("");
        self.IS_DRAFT = ko.observable("");
        this.selectedBusinessTripExtension = ko.observable("");
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });
        self.handleActivated = function (info) {

        };
        //This Function for Build Types
        function builBbusinessTripTypes() {
            self.types([]);
            self.types(rootViewModel.globalTypes());
        }
        //--------------Temp Function To Build BT Route ------------------------
        //--------------Temp Function To Build BT Route ------------------------
        function builBbusinessTripRoute() {
            self.businessTripRoute([]);
            self.businessTripRoute(rootViewModel.globalNadecBTRoute());
        }
        //------------------------------------------
        //-----------------Temp Function To Build City ----------------------
        function buildAllCityArray() {
            self.allCityArray([]);
            self.allCityArray(rootViewModel.globalCityLookup());

        }
        //------------------------------------------------
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

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
        //-----------------End OF Min Start Date ------------------------
        self.handleAttached = function (info) {
            getPrevMonth();
            self.FromDestinationArray.push( {
                value : " ", label : " "
            });
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
         buildAllCityArray();
            initTranslations();
            self.currentStepValue('stp1');
            self.types("");
            self.country("");
            self.yesNo("");
            //           self.travelBy( app.getPaaSLookup("Travel_BY"));
            builBbusinessTripRoute();
            builBbusinessTripTypes();
            services.getBusinessTripById(rootViewModel.selectedTableRowKey()).then(function (btrip) {
                self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
                    pattern : 'dd/MM/yyyy'
                }));
                // self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));
                self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
                self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));

                $.each(btrip.items, function (index, val) {
                    
                    self.typeSelectedValue(val.type1);

                    if (self.typeSelectedValue() == "TBT") {
                        self.isTrainingEvent(true);
                        
                    }
                    else if (self.typeSelectedValue() == "P") {
                        self.isTrainingEvent(false);
                       // self.isProvide(true);
                        

                    }
                    else {
                        self.isTrainingEvent(false);
                    }

                    //self.countrySelectedValue(val.country);
                    self.selectedCityFrom(val.from_city);
                    
                    self.city(val.city);
                    
                    self.accomSelectedValue(val.accommodationprovided);
                    self.foodSelectedValue(val.foodprovided);
                    self.transSelectedValue(val.transportationprovided);
                    self.tripDetails(val.trip_details);
                    self.selectedBusinessTripRoute(val.route);
                    if (self.selectedBusinessTripRoute() == "L") {
                        self.isLocal(true);
                        // self.FromDestinationArray([]);
                        self.selectedCountry("SA");
                        //selectedCountryFrom
                        self.selectedCountryFrom(val.from_country);

                        getFromCity(self.selectedCountryFrom().toString());
                        getCountryLabel(self.selectedCountry().toString());

                    }
                    else {
                        self.isLocal(false);
                        //self.FromDestinationArray([]);
                        self.selectedCountryFrom(val.from_country);
                        getFromCity(self.selectedCountryFrom().toString());
                        self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
                        self.selectedCountry(val.country);

                        getCountryLabel(self.selectedCountry().toString());

                    }

                    // self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
                    self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));

                    self.empLoc(val.employeelocation);
                        PersonId=    val.person_id  ;  
                    var evalStartDate = new Date(val.startdate.split('/')[2] + "/" + val.startdate.split('/')[1] + "/" + val.startdate.split('/')[0]);
                    evalStartDate.setDate(evalStartDate.getDate() + 1);
                    var evalEndDate = new Date(val.enddate.split('/')[2] + "/" + val.enddate.split('/')[1] + "/" + val.enddate.split('/')[0]);
                    evalEndDate.setDate(evalEndDate.getDate() + 1);
                    self.startDate(evalStartDate.toISOString());
                    self.endDate(evalEndDate.toISOString());
                    self.comment(val.commment);
                    self.noDays(val.numberofdays);
                    self.selectedTravelBy(val.travel_by);
                    self.selectedBusinessTripExtension(val.transportationprovided);
                    self.ticketClass(val.ticketclass);
                    self.ticketAmount(val.ticketamount);
                    self.nextClick(false);
                    self.tso(val.tso);
                    self.trainEvent(val.training_event);              

                    var preview = document.querySelector('.attClass');
                    preview.src = val.image_base64;
                    if( self.noDays()==1){
                   
                        self.isAcomProvide(true);
                    }
                    if(self.city()=="HARADHPROJECT"){
                         self.isAcomProvide(true);
                          self.transProvaided(true);
                           self.isProvide(true);
                    }

                });
            });

            var getEmployeePayrollCBFN = function (data) {
                
                var payroll = jQuery.parseJSON(data);
                if (payroll.length >= 1) {
                    self.isHavePayroll(true)
                }

            }
            //getCityReport
            services.getEmployeePayrollReport(PersonId).then(getEmployeePayrollCBFN, app.failCbFn);
        };
        self.handleDetached = function (info) {
            self.typeSelectedValue('');
            self.countrySelectedValue('');
            self.accomSelectedValue('');
            self.transSelectedValue('');
            self.foodSelectedValue('');
        };

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        var managerId = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
        var personId = 0;
        self.isLocal = ko.observable(false);
        self.toDestinationArray = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.trainEvent = ko.observable("");
        this.selected = ko.observable('stp1');
        this.empLoc = ko.observable("");
        self.city = ko.observable(" ");
        self.isProvide = ko.observable(false);
        self.tripDetails = ko.observable(" ");
        self.selectedCountryFrom = ko.observable("");
        this.noDays = ko.observable("");
        this.perDiems = ko.observable("");
        this.totAmount = ko.observable(0);
        this.ticketAmount = ko.observable("");
        this.ticketClass = ko.observable("");
        this.tso = ko.observable("");
        this.pnr = ko.observable("");
        this.advAmount = ko.observable(0);
        this.val = ko.observable("");
        this.startDate = ko.observable();
        this.selectedCountry = ko.observable("");
        this.selectedAcomProvided = ko.observable("");
        this.selectedFoodProvided = ko.observable("");
        this.selectedTransProvided = ko.observable("");
        self.selectedCityFrom = ko.observable(" ");
        this.selectedType = ko.observable("");
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        self.comment = ko.observable("");
        this.selectedDayBefore = ko.observable("");
        this.selectedDayAfter = ko.observable("");
        self.selectedTravelBy = ko.observable("");
        this.endDate = ko.observable();
        this.componentRequired = ko.observable(true);
        self.allCityArray = ko.observableArray([]);
        self.minDate = ko.observable();
        self.FromDestinationArray = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

        self.selectedBusinessTripRoute = ko.observable("");
        self.checkValues = ko.observableArray([
        {
            "values" : "Yes"
        },
        {
            "values" : "NO"
        }
]);

        self.isDisabled = ko.observable(false);
        self.disabledPerdiem = ko.observable(true);

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

        this.maxAdvAmount = ko.computed(function () {

            return (Math.ceil(self.totAmount() / 2));
        });

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
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (mm<10){
             return dd+"/"+"0"+mm+"/"+yyyy
            }
            return dd+"/"+mm+"/"+yyyy
        }
        function overLapPaas (){
           var is_Over_Lap= false 
          var strDate =  changeDateFormat(new Date(self.startDate()));
           var eDate= changeDateFormat(new Date(self.selectedEndDate()));
           
           
             services.getBtPaaSOverLab(strDate,eDate,PersonId).then(function (data) {

         for (var i =0 ; i<data.items.length;i++){
             if(data.items[i].id != rootViewModel.selectedTableRowKey()){
             is_Over_Lap= true ;
            }
         }
            
            });
            return is_Over_Lap ; 
        }
        this.nextStep = function () {
            if (self.specialistSummary() && rootViewModel.personDetails().city().toUpperCase() == self.city().toString().toUpperCase()) {
                showNotify('error', self.sameCity());
                return;
            }
            if (self.tripDetails().length < 15) {
                showNotify('error', self.minCharacters());
                return;
            }
            if (self.isHavePayroll() == false) {
                showNotify('error', "No Payroll");
                return;
            }
            if(overLapPaas ()){
                   showNotify('error', self.overLapMessage());
             return;
            }

            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            else if (self.maxAdvAmount() < self.advAmount()) {
                $("#advAmount").ojInputNumber("validate");
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
                        document.querySelector("#modalDialogAbsenseError").open();
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
        function controllScreen (){
                if (self.city().toString() == "HARADHPROJECT" && self.empLoc().toString() == "Head Office") {
              
                    self.isProvide(true);
                    self.transProvaided(true);
                    self.isAcomProvide(true);
                    //  isProvide
                } else if (self.city().toString() == "HAILPROJECT" ||self.city().toString() == "WADIDAWASERPROJECT"
        ||self.city().toString() == "JOUFPROJECT"||self.city().toString() == "HARADHPROJECT") {
                   
                    self.isProvide(true);
                    self.isAcomProvide(true);
                    if (self.city().toString() != "HARADHPROJECT" ){
                          self.transProvaided(false);
                          
                    }
                    
                    
                    
                    //  isProvide
                }
                else {
                     self.transProvaided(false);
                     if(self.noDays()!=1){
                    
                    self.isAcomProvide(false);
                     }
                        self.isProvide(false);
                        
               

                }
			computeNumofDays();


}
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.isProvide(true);
                self.isAcomProvide(true);
                self.isLocal(true)
                self.disabledPerdiem(true);
                self.nextBtnVisible(false);
                 self.transProvaided(true);

                $('#add').show();
                 $('#submitDraft').show();
            }
            else {
                self.isDisabled(false);
                self.nextBtnVisible(true);
                controllScreen ();
                $('#add').hide();
                 $('#submitDraft').hide();
            }
            return self.businessTrip();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //save draft
        this.draftButton = function () {
            self.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editBTripModelRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        //added
        self.commitRecord = function (data, event) {
            editBTripModelRecord();
            return true;
        }
        function editBTripModelRecord () {
            if (!self.disableSubmit()) {
                self.disableSubmit(true);
            }
            var preview = document.querySelector('.attClass');
            var json = {
               "IS_DRAFT" : self.IS_DRAFT(),
               "id" : rootViewModel.selectedTableRowKey(), 
               "name" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName(), 
               "job" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().AssignmentName : rootViewModel.personDetails().assignmentName(), 
               "position" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Position : rootViewModel.personDetails().positionName(), 
               "department" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Department : rootViewModel.personDetails().departmentName(), 
               "grade" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Grade : rootViewModel.personDetails().grade(), 
               "number" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId(), 
               "type1" : self.typeSelectedValue().toString(),
               "startdate" : formatDate(self.startDate()),
               "enddate" : formatDate(self.endDate()),
               "country" : self.selectedCountry().toString(),
               "city" : self.city(),
               "location" : self.empLoc(),
               "status" : "PENDING_APPROVED",
               "commment" : self.comment(),
               "numberofdays" : self.noDays(),
               "accommodation" : self.accomSelectedValue().toString(),
               "transport" : self.transSelectedValue().toString(),
               "food" : self.foodSelectedValue().toString(), "ticketclass" : self.ticketClass(), "ticketamount" : self.ticketAmount(), "tso" : self.tso(), "managerId" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId(), "pnr" : self.pnr(), "personNumber" : self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber(), "imageBase64" : preview.src, "updatedBy" : rootViewModel.personDetails().personId(), "updatedDate" : ko.observable(new Date())

            };

            function formatDate(date) {
                var d = new Date(date || Date.now()), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;

                return [day, month, year].join('/');
            }

            var Approvalsjson = {
                "TransactionId " : rootViewModel.selectedTableRowKey(), "serviceType" : "BT"
            }
                        var testJson = {
	"TransactionId":rootViewModel.selectedTableRowKey(),
	"serviceType":"BT"
	
};
            var jsonData = ko.toJSON(json);
            var ApprovalsjsonnData = ko.toJSON(testJson);

           
            var editApprovalspCbFn = function (data) {
            
                $.notify(self.editNotify(), "success");
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('summaryBusinessTrip');
                }
                self.disableSubmit(false);
            }
            var editBusinessTripCbFn = function (data) {
                // editApprovals
                
                
                services.editApprovals(ApprovalsjsonnData).then(editApprovalspCbFn, app.failCbFn);

            };
            services.editBusinessTrip(jsonData).then(editBusinessTripCbFn, app.failCbFn);
            return true;
        }

        this.startDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                computeValues(false, true, true, true);
            }
        }

        this.endDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedEndDate(data.value);
                computeValues(false, true, true, true);

            }
        }

        function getCountryLabel(code) {

            var label;
            var selctedCity = self.city();
            

            for (var i = 0;i < self.country().length;i++) {
                if (code == self.country()[i].value.toString()) {
                    label = self.country()[i].label
                }
                //value
            }
            var getEmployeePayrollReport = function (data) {
                self.toDestinationArray([]);

                var x = jQuery.parseJSON(data);
                $.each(x, function (index, val) {
                    self.toDestinationArray.push( {
                        value : val.LOOKUP_CODE, label : val.MEANING
                    });
                })
                self.city(selctedCity);
                
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
                    //   self.selectedCityFrom(self.selectedCityFrom().toString());
                }
            }
        }
        this.cityChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.city(self.city().toString());
                }
                if (self.city().toString() == "HARADHPROJECT" && self.empLoc().toString() == "Head Office") {
                    self.accomSelectedValue('Y');
                    self.transSelectedValue('Y');
                    self.foodSelectedValue('Y');
                    self.isProvide(true);
                    self.transProvaided(true);
                    self.isAcomProvide(true);
                    //  isProvide
                } else if (self.city().toString() == "HAILPROJECT" ||self.city().toString() == "WADIDAWASERPROJECT"
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
                     self.transProvaided(false);
                     if(self.noDays()!=1){
                    
                    self.isAcomProvide(false);
                     }
                        self.isProvide(false);
                        
               

                }
            }
        }

        function getFromCity(code) {

            var label;
            var selectFromCity = self.selectedCityFrom();
            
            for (var i = 0;i < self.country().length;i++) {
                if (code == self.country()[i].value.toString()) {
                    label = self.country()[i].label

                    break;
                }
                //value
            }
            var getCityArray = function (data) {
                
                self.FromDestinationArray([]);
                
                var x = jQuery.parseJSON(data);
                $.each(x, function (index, val) {
                    self.FromDestinationArray.push( {
                        value : val.LOOKUP_CODE, label : val.MEANING
                    });
                })
                
                self.selectedCityFrom(selectFromCity)
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

        function computeValues(updateTicketClass, updateNumofDays, updatePerDiem, updateTotalAmount) {
            if (self.countrySelectedValue() && self.typeSelectedValue() && self.countrySelectedValue() != '' && self.typeSelectedValue() != '' && updateTicketClass == true) {
                computeDaysBeforeAfter();
                computeTicketClass();
            }
            if (self.typeSelectedValue() && self.startDate() && self.endDate() && updateNumofDays == true) {
                computeNumofDays();

            }
        }

        this.stopSelectListener = function (event, ui) {
            var nextSelectableStep = $("#train").ojTrain("getNextSelectableStep");
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
            else if (self.maxAdvAmount() < self.advAmount()) {
                $("#advAmount").ojInputNumber("validate");
                event.preventDefault();
                return;
            }

            else if (nextSelectableStep && !self.nextClick() && self.validateAbsence()) {
                document.querySelector("#modalDialogAbsenseError").open();
                event.preventDefault();
                return;
            }

        }
        this.closeDialog = function () {
            document.querySelector("#modalDialogAbsenseError").close();
        }

        self.validateAbsence = function () {
            var absenceExists = false;
            services.getAbsenseReport(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId(), self.startDate(), self.endDate()).then(function (data) {
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

        this.typeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {
                self.selectedType(data.value);
                computeValues(true, true, true, true);
            }
            if (self.typeSelectedValue() == "TBT") {
                self.isTrainingEvent(true);
            }
            else if (self.typeSelectedValue() == "P") {
                self.isTrainingEvent(false);
               // self.isProvide(true);
              //  self.accomSelectedValue('Y');
                //self.foodSelectedValue('Y');

            }
            else {
                self.isTrainingEvent(false);
             //   self.isProvide(false);
            }
            

        }

        this.transChangedHandler = function (event, data) {

            if (data.option == 'value' && data.value && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.transSelectedValue(data.value);
                computeValues(false, false, true, true);
            }
        }
        this.foodChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedFoodProvided(data.value);
                computeValues(false, false, true, true);
            }
        }
        this.acomChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.value != '' && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedAcomProvided(data.value);
                computeValues(false, false, true, true);
            }
        }
        this.daysBeforeChangedHandler = function (event, data) {
            //            if (data.option == 'value' || data.value == '0') {
            if (data.option == 'value' && data.value && data.value != '' && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedDayBefore(data.value);
                computeValues(false, true, true, true);
            }
        }
        this.daysAfterChangedHandler = function (event, data) {
            //            if (data.option == 'value' || data.value == '0') {
            if (data.option == 'value' && data.value && data.value != '' && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedDayAfter(data.value);
                computeValues(false, true, true, true);
            }
        }

        this.perDiemChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.value != '' && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                computeValues(false, false, false, true);
            }
        }



        function computeNumofDays(before, after) {
            var startDate = self.startDate();
            var endDate = self.endDate();

            if (endDate && startDate) {
                var end = new Date(endDate.split('-')[1] + "/" + (endDate.split('-')[2]).substr(0, 2) + "/" + endDate.split('-')[0]);
                var start = new Date(startDate.split('-')[1] + "/" + (startDate.split('-')[2]).substr(0, 2) + "/" + startDate.split('-')[0]);

                var timeDiff = Math.abs(end.getTime() - start.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if ((diffDays + 1) == 1) {
                    self.accomSelectedValue("Y");
                    self.foodSelectedValue("Y");
                    self.transSelectedValue("Y");
                    
                      self.isAcomProvide(true);
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
            var selCountry = self.countrySelectedValue();
            var selType = self.typeSelectedValue();
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

        function computeTicketClass() {
            var selCountry = self.countrySelectedValue();
            var selType = self.typeSelectedValue();
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
        this.BTExtensionChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != '') {
                self.selectedBusinessTripExtension(data.value.toString());

            }
        }
        this.cancelAction = function () {
           
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryBusinessTrip');
            }
             resetForm();

        }

        function resetForm() {
            self.accomSelectedValue(null);
            self.typeSelectedValue(null);
            self.empLoc(null);
            self.countrySelectedValue(null);
            self.city(null);
            self.startDate(null);
            self.endDate(null);

            self.noDays(null);
            self.transSelectedValue(null);
            self.foodSelectedValue(null);
            self.perDiems(null);
            self.totAmount(null);
            self.ticketClass(null);
            self.ticketAmount(null);
            self.pnr(null);
            self.advAmount(null);

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
        self.citylbl = ko.observable();
        self.startdate = ko.observable();
        self.enddate = ko.observable();
        self.travelByLbl = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.confirmMessage = ko.observable();
        self.editMessage = ko.observable();
        self.tripDetailsLbl = ko.observable();
        self.nodays = ko.observable();
        self.accomodationProvided = ko.observable();
        self.tranportationProvided = ko.observable();
        self.foodProvided = ko.observable();
        self.preDiem = ko.observable();
        self.totalamount = ko.observable();
        self.ticketclass = ko.observable();
        self.ticketamount = ko.observable();
        self.tsolbl = ko.observable();
        self.PNRlbl = ko.observable();
        self.advanceAmount = ko.observable();
        self.type = ko.observable();
        self.countrylbl = ko.observable();
        self.overLapMessage = ko.observable();
        self.editNotify = ko.observable();
        self.businessTrip = ko.observable();
        self.comment = ko.observable();
        self.businessTripRouteLbl = ko.observable();
        self.fromDestinationLbl = ko.observable();
        self.trainingEvent = ko.observable();
        self.businessTripExtensionLbl = ko.observable();
        self.sameCity = ko.observable();
        self.minCharacters = ko.observable();
        self.saveDraft = ko.observable();
        self.fromCityLbl= ko.observable();
        self.toCityLbl= ko.observable();
        self.tocountryLbl= ko.observable();
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
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.editMessage(getTranslation("businessTrip.editMessage"));
            self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
            self.citylbl(getTranslation("businessTrip.city"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.travelByLbl(getTranslation("businessTrip.travelBy"));
            self.tripDetailsLbl(getTranslation("businessTrip.tripDetails"));
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
            self.editNotify(getTranslation("businessTrip.editNotify"));
            self.businessTrip(getTranslation("pages.businessTrip"));
            self.comment(getTranslation("others.comment"));
            self.businessTripRouteLbl(getTranslation("businessTrip.businessTripRoute"));
            self.travelBy(app.getPaaSLookup("Travel_BY"));
            self.fromDestinationLbl(getTranslation("businessTrip.fromDestination"));
            self.trainingEvent(getTranslation("businessTrip.trainingEvent"));
            self.businessTripExtensionLbl(getTranslation("businessTrip.businessTripExtension"));
            self.sameCity(getTranslation("businessTrip.sameCity"));
            self.minCharacters(getTranslation("businessTrip.minCharacters"));
            self.saveDraft(getTranslation("labels.saveDraft"));
            self.fromCityLbl(getTranslation("businessTrip.fromCity"));
             self.toCityLbl(getTranslation("businessTrip.toCity"));
             self.tocountryLbl(getTranslation("businessTrip.toCountry"));

        }
        //added

    }

    return new EditBusinessTripViewModel();
});