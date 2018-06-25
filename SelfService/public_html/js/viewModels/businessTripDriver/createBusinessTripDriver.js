define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojknockout','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojgauge'],
function (oj, ko, $, app, commonUtil, services) {

    function createBusinessTripDriverViewModel() {
        var self = this;
        
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.thresholdValues = [{max: 33}, {max: 67}, {}];
        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var personNumber = rootViewModel.personDetails().personNumber();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.driverTypeArray = ko.observableArray(rootViewModel.globalBTripDriverType());
        self.driverAreaArray = ko.observableArray(rootViewModel.globalBTripDriverArea());
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        this.selectedArea = ko.observable("");
        this.selectedType = ko.observable("");
        self.totalKmVisible = ko.observable(true);
        self.tripsVisible = ko.observable(true);
        this.specialistSummary = ko.observable("");//added
       // self.precantage= ko.observable();
          self.disableSubmit = ko.observable(false);
//          self.managerOfManager= ko.observable("");
          self.progressValue=ko.computed(function() {
                return 0;
    }, this);   
//      self.label = {text: self.progressValue(), style: {color:'white'}};
//        
//      this.thresholdValues = [{max: 33}, {max: 67}, {}];
//          
        self.driverDisabled = ko.observable(true);

        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.bTripDriverModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            type : ko.observable(""),
            area : ko.observable(""),
            totalKm : ko.observable(""), 
            tripsNumber : ko.observable(""),
            startDate : ko.observable(""),
            endDate : ko.observable(""),
            daysNumber : ko.observable(""),
            notes : ko.observable(""),
            paymentPeriod : ko.observable(""),
            personNumber : ko.observable(""),
            createdBy : rootViewModel.personDetails().personNumber(), 
            managerId : ko.observable(""),
            personId : ko.observable(""),
            name : ko.observable(""),
            IS_LINE_MANAGER:ko.observable(""),
            commment:ko.observable(""),
            IS_DRAFT:ko.observable(""),
            managerOfManager:ko.observable(""),
            imageBase64:ko.observable("")
        };
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
        };
       
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            self.bTripDriverModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.bTripDriverModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.bTripDriverModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.bTripDriverModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            /*Check For Line Manager*/
            if (self.bTripDriverModel.managerId() !=null) {
                self.bTripDriverModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.bTripDriverModel.IS_LINE_MANAGER("NO");
            }
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () { 
           //  self.label = ko.observable({text: self.progressValue(), style: {color:'white'}});
                return precantageOField(self.bTripDriverModel, 9);     
            },
            this);
           //self.label = {text: self.progressValue().toString(), style: {color:'white'}};
        };
        self.handleDetached = function (info) {
            clearContent();
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }

        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            //image
                var preview = document.querySelector('.attClass');
                self.bTripDriverModel.imageBase64(preview.src);
                
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
                       return;
                }//end

            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);
                self.driverDisabled(true);
                self.totalKmVisible(true);
                self.tripsVisible(true);

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);

            }

            return self.businessTripDriverRequest();
        };
        this.submitButton  = function () {
            self.bTripDriverModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addBTripDriverModelRecord();
            return true;
        }
        //save draft
        this.submitDraft = function () {
            self.bTripDriverModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addBTripDriverModelRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        this.cancelAction = function () {
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('businessTripDriverSummary');
                }
        }
                //validations

         this.startDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value  ) {
                self.selectedStartDate(data.value);
                computeNumofDays();
            }
        }
        
          this.endDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value ) {
                    self.selectedEndDate(data.value);
                    computeNumofDays();
            }
        }

    
        this.areaChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.selectedArea((data.value)[0]);
                   validationBusinessTripDriver();
                }
            }
        }
        this.typeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.selectedType(data.value);
                    validationBusinessTripDriver();
                }
            }
        }
        function validationBusinessTripDriver() {
            var selectType = self.selectedType();
            var selectedCountry = self.selectedArea();
            if (selectedCountry == 'SAUDI_ARABIA' && selectType == 'DRIVER') {
                self.totalKmVisible(false);
                self.tripsVisible(false);
                //self.bTripDriverModel.tripsNumber(0);
                self.bTripDriverModel.daysNumber(0);
                computeNumofDays();

            }
            else if (selectType == 'PUR_DRIVER') {
                computeNumofDays();
                self.totalKmVisible(false);
                self.tripsVisible(true);
                self.bTripDriverModel.tripsNumber(0);

            }
            else {
                self.bTripDriverModel.daysNumber(0);
                self.totalKmVisible(false);
                self.tripsVisible(false);
            }
        }
        function computeNumofDays() {
            if (self.selectedStartDate() != '' && self.selectedEndDate() != '' && self.selectedArea() == 'SAUDI_ARABIA') {
                var startDate = self.selectedStartDate();
                var endDate = self.selectedEndDate();
                if (endDate && startDate) {
                    var end = new Date(endDate.split('-')[1] + "/" + endDate.split('-')[2] + "/" + endDate.split('-')[0]);
                    var start = new Date(startDate.split('-')[1] + "/" + startDate.split('-')[2] + "/" + startDate.split('-')[0]);
                    var timeDiff = Math.abs(end.getTime() - start.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    self.bTripDriverModel.daysNumber( + diffDays +  + 1);
                }
            }
        }

        function addBTripDriverModelRecord() {
            var preview = document.querySelector('.attClass');
            if(!self.disableSubmit()) {
                     self.disableSubmit(true);    
                }
            self.bTripDriverModel.type(self.bTripDriverModel.type()[0]);
            self.bTripDriverModel.area(self.bTripDriverModel.area()[0]);
            self.bTripDriverModel.imageBase64(preview.src);

            services.getEmpDetailsbyPersonId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId(),"","").then(function (data) {
                var documents = jQuery.parseJSON(data);         
                self.bTripDriverModel.managerOfManager(documents.managerId);
           });
            var jsonData = ko.toJSON(self.bTripDriverModel);

            var addBTripDriverCbFn = function (data) {
                $.notify(self.notifyMessage(), "success");
               if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('businessTripDriverSummary');
                }//added
                self.disableSubmit(false); 
            };
            services.addBusinessTripDriver(jsonData).then(addBTripDriverCbFn, app.failCbFn);
        }
  

        /*function to clear table content after submit*/
        function clearContent() {
            self.bTripDriverModel.type("");
            self.bTripDriverModel.area("");
            self.bTripDriverModel.totalKm("");
            self.bTripDriverModel.tripsNumber("");
            self.bTripDriverModel.startDate("");
            self.bTripDriverModel.endDate("");
            self.bTripDriverModel.daysNumber("");
            self.bTripDriverModel.notes("");
            self.bTripDriverModel.paymentPeriod("");
            self.bTripDriverModel.notes("");
            self.selectedStartDate("");
            self.selectedEndDate("");
           
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
            self.businessTripDriverRequest= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.totalKM = ko.observable();
            self.tripsNumber = ko.observable();
            self.notes = ko.observable();
            self.notifyMessage = ko.observable();
            self.saveDraft = ko.observable();
            self.attachment = ko.observable();    
            self.attachmentNotify = ko.observable();
            
            var getTranslation = oj.Translations.getTranslatedString
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
          self.label = {text: self.progressValue(), style: {color:'white'}};
        
      this.thresholdValues = [{max: 33}, {max: 67}, {}];
          
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
          self.addMessage(getTranslation("businessTripDriver.addMessage"));
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
          self.notifyMessage(getTranslation("businessTripDriver.notifyMessage"));
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.attachment(getTranslation("businessTrip.attachment"));     
          self.attachmentNotify(getTranslation("others.attachmentNotify"));
        }//added
    }
    return new createBusinessTripDriverViewModel();
});