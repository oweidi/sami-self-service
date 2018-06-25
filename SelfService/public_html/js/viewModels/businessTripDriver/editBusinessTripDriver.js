define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditBusinessTripDriverModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.driverTypeArray = ko.observableArray(rootViewModel.globalBTripDriverType());
        self.driverAreaArray = ko.observableArray(rootViewModel.globalBTripDriverArea());
        self.isVisible = ko.observable(false);
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        this.selectedArea = ko.observable("");
        self.totalKmVisible = ko.observable(true);
        self.tripsVisible = ko.observable(true);
        self.disableSubmit = ko.observable(false);
        this.specialistSummary = ko.observable("");
        self.editResubmitBtnVisible = ko.observable(false);//added

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

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
                    personNumber : ko.observable(""), 
                    managerId : ko.observable(""),
                    name : ko.observable(""),
                    personId : ko.observable(""),
                    commment:ko.observable(""),
                    updateBy:rootViewModel.personDetails().personNumber(),
                    IS_DRAFT:ko.observable(""),
                    IS_LINE_MANAGER:ko.observable(""),
                    imageBase64:ko.observable("")

        };

        ko.postbox.subscribe("editBusinessTripDriverObj", function (newValue) {
            self.bTripDriverModel.id(newValue.id);
            self.bTripDriverModel.requestDate(newValue.request_date);
            self.bTripDriverModel.type([newValue.type]);
            self.bTripDriverModel.area(newValue.area);
            self.bTripDriverModel.totalKm(newValue.total_kilo_meters);
            self.bTripDriverModel.tripsNumber(newValue.trips_number);
            self.bTripDriverModel.startDate(newValue.start_date);
            self.bTripDriverModel.endDate(newValue.end_date);
            self.bTripDriverModel.notes(newValue.notes);
            self.bTripDriverModel.daysNumber(newValue.days_number);
            self.bTripDriverModel.paymentPeriod(newValue.payment_period);
            self.bTripDriverModel.imageBase64(newValue.image_base64);
            validationBusinessTripDriver();
             var statusDraft = newValue.status;
            if(statusDraft =='Draft' || statusDraft == 'مسودة'){
                self.editResubmitBtnVisible(true);
            }else{
                    self.editResubmitBtnVisible(false);
            } 
                                

        });

        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            clearContent();           
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
            
             if (self.bTripDriverModel.managerId() !=null) {
                self.bTripDriverModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.bTripDriverModel.IS_LINE_MANAGER("NO");
            }
            
            self.currentStepValue('stp1');
                        initTranslations();
                var preview = document.querySelector('.attClass');
            preview.src = self.bTripDriverModel.imageBase64();

            
        };
        self.handleDetached = function (info) {
        
        };

        self.stepArray = ko.observableArray([]);

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

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
        var preview = document.querySelector('.attClass');
             self.bTripDriverModel.imageBase64(preview.src);
             
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
                       return;
                } 

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
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);
                self.totalKmVisible(true);
                self.tripsVisible(true);

            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.businessTripDriverRequest();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            //save draft
        this.draftButton = function () {
            self.bTripDriverModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editBusinessTripDriverRecord(event);
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function () {
            editBusinessTripDriverRecord();
            return true;
        }
  
         this.startDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value  ) {
                self.bTripDriverModel.startDate(data.value);
                computeNumofDays();
            }
        }
        
          this.endDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value ) {
                self.bTripDriverModel.endDate(data.value);
                    computeNumofDays();
            }
        }

    
        this.areaChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                    self.bTripDriverModel.area(data.value);
                  validationBusinessTripDriver();
                }
            }
        }
        this.typeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                if (data.value) {
                  self.bTripDriverModel.type (data.value);
                    validationBusinessTripDriver();
                }
            }
        }
        function validationBusinessTripDriver() {
            if (self.bTripDriverModel.type() == 'D') {
                if (self.bTripDriverModel.area() == 'SAUDI_ARABIA') {
                    self.totalKmVisible(false);
                    self.tripsVisible(false);
                    //self.bTripDriverModel.tripsNumber(0);
                    //self.bTripDriverModel.daysNumber(0);
                    computeNumofDays();

                }
                else {
                    self.totalKmVisible(false);
                    self.tripsVisible(false);
                    self.bTripDriverModel.daysNumber(0);
                }

            }
            else if (self.bTripDriverModel.type() == 'PUR_DRIVER') {
                computeNumofDays();
                self.totalKmVisible(false);
                self.tripsVisible(true);
                self.bTripDriverModel.tripsNumber(0);

            }
        }
            function computeNumofDays() {

            if (self.bTripDriverModel.startDate() != '' && self.bTripDriverModel.endDate() != '' &&  self.bTripDriverModel.area() == 'SAUDI_ARABIA') {
                var startDate = self.bTripDriverModel.startDate();
                var endDate = self.bTripDriverModel.endDate();
                if (endDate && startDate) {
                    var end = new Date(endDate.split('-')[1] + "/" + endDate.split('-')[2] + "/" + endDate.split('-')[0]);
                    var start = new Date(startDate.split('-')[1] + "/" + startDate.split('-')[2] + "/" + startDate.split('-')[0]);
                    var timeDiff = Math.abs(end.getTime() - start.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    self.bTripDriverModel.daysNumber( + diffDays +  + 1);
                }
            }
        }
        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }
        this.cancelAction = function () {
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('businessTripDriverSummary');
                }
        }
        function editBusinessTripDriverRecord() { 
           self.bTripDriverModel.type(self.bTripDriverModel.type()[0]);
            self.bTripDriverModel.area(self.bTripDriverModel.area()[0]); 
            var jsonData = ko.toJSON(self.bTripDriverModel);
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
            var editBusinessTripDriverCbFn = function (data) {
                $.notify(self.notifyEdited(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('businessTripDriverSummary');
                }//added
                                self.disableSubmit(false);

            };
            services.editBusinessTripDriver(jsonData).then(editBusinessTripDriverCbFn, app.failCbFn);
        }

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
             self.bTripDriverModel.imageBase64("");
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
            self.businessTripDriverRequest= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.totalKM = ko.observable();
            self.tripsNumber = ko.observable();
            self.notes = ko.observable();
            self.notifyEdited = ko.observable();
            self.saveDraft = ko.observable();
            self.attachment = ko.observable();//added

            var getTranslation = oj.Translations.getTranslatedString
		
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
          self.editMessage(getTranslation("businessTripDriver.editMessage"));
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
          self.notifyEdited(getTranslation("businessTripDriver.notifyEdited"));
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.attachment(getTranslation("businessTrip.attachment"));//added

        }//added
    }

    return new EditBusinessTripDriverModel();
});