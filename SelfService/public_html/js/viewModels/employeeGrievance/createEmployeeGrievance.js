define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'],

    function(oj, ko, $, app, commonUtil, services) {

        function createEmployeeGrievance () {
            var self = this;
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

            var managerId = rootViewModel.personDetails().managerId();
            var personId = rootViewModel.personDetails().personId();
            var personNumber = rootViewModel.personDetails().personNumber();
            var gradeId = rootViewModel.personDetails().gradeId();
            self.currentStepValue = ko.observable('stp1');            
            self.stepArray = ko.observableArray([]);
            self.tracker = ko.observable();
            self.isDisabled = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.currentDate=ko.observable(formatDate(new Date()));
            self.grievanceTypes = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
            
            self.grievanceStatuses = ko.observableArray(rootViewModel.globalGrievanceStatus());
            self.nextBtnVisible = ko.observable(true);
     self.grievanceReference = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
            self.clickedButton = ko.observable("");


            self.grevianceRefVisible= ko.observable(false);
            function formatDate(date) {
                month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

            
         
            self.employeeGrievanceModel = {
                grievanceDate: self.currentDate(),
                grievanceType:ko.observable(""),
                grievanceDescription  : ko.observable(""),
                requestReference:  ko.observable(""),
                grievanceStatus:ko.observable("OPEN"),
                personNumber: rootViewModel.personDetails().personNumber(),
                name:rootViewModel.personDetails().displayName(),
                managerId:rootViewModel.personDetails().managerId(),
                createdBy:rootViewModel.personDetails().personId(),
                creationDate:ko.observable(new Date()),
                commment:ko.observable(""),
                personId:rootViewModel.personDetails().personId(),//personId,
                managerManagerId:rootViewModel.personDetails().managerOfManager()
            };
    var getEmployeeGrievanceFn = function (data) {
        if(data.items.length !=0){
           
         self.grievanceReference([]);
            $.each(data.items, function (index, val) {
              var grvStatus= searchArray(val.grievance_status, rootViewModel.globalGrievanceStatus());
              if(grvStatus && grvStatus.toUpperCase() === 'CLOSED'){
                  self.grievanceReference.push( {
                    "value":  val.id,
                    "label":val.grievance_description
                  });
              }
               });
			   }
			   }


            self.handleActivated = function(info) {
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');
               services.getEmployeeGrievance(rootViewModel.personDetails().personNumber()).then(getEmployeeGrievanceFn, app.failCbFn);
            };

            self.handleAttached = function(info) {
                self.currentStepValue('stp1');
                initTranslations();
                
            };
            self.handleDetached = function(info) {
                clearContent();
            };

            this.stopSelectListener = function(event, ui) {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!self._showComponentValidationErrors(trackerObj)) {
                    event.preventDefault();
                    return;
                }
            }


            this.previousStep = function() {
                var prev = document.getElementById("train").getPreviousSelectableStep();
                if (prev != null)
                    self.currentStepValue(prev);
            }
            
            this.nextStep = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!this._showComponentValidationErrors(trackerObj)) {
                    return;
                }

                var next = document.getElementById("train").getNextSelectableStep();
                if (next != null)
                    self.currentStepValue(next);
            }
            
            self._showComponentValidationErrors = function(trackerObj) {
                trackerObj.showMessages();
                if (trackerObj.focusOnFirstInvalid())
                    return false;

                return true;
            };

            self.shouldDisableCreate = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker),
                    hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
                return hasInvalidComponents;
            };
            
            self.currentStepValueText = function() {
                if (self.currentStepValue() == 'stp2') {
                    self.isDisabled(true);
                    self.addBtnVisible(true);
                    self.nextBtnVisible(false);
                    
                } else {
                    self.isDisabled(false);
                    self.addBtnVisible(false);
                    self.nextBtnVisible(true);
                }
                
                return self.employeeGrievance();
            };
            //------------------Change Handler Section ---------------------------
            self.typeChangeHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
            
            self.employeeGrievanceModel.grievanceType(self.employeeGrievanceModel.grievanceType().toString());
            if (self.employeeGrievanceModel.grievanceType()=="REOPEN"){
                 self.grevianceRefVisible(true);
            }
            else{
             self.grevianceRefVisible(false);
            }
            }
        }//referenceChangeHandler
        self.referenceChangeHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
            
            self.employeeGrievanceModel.requestReference(self.employeeGrievanceModel.requestReference().toString());
            }
        }
            //---------------------End -------------------------------------------
            
            this.cancelAction = function() {
                oj.Router.rootInstance.go('summaryEmployeeGrievance');
            }

            self.addEmployeeGrievance=function(data, event) {
              if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.employeeGrievanceModel.grievanceType(self.employeeGrievanceModel.grievanceType().toString());  
                self.employeeGrievanceModel.grievanceStatus('OPEN'); 
                if(self.employeeGrievanceModel.requestReference()){
                      self.employeeGrievanceModel.requestReference(self.employeeGrievanceModel.requestReference().toString()); 
                }
                    var jsonData = ko.toJSON( self.employeeGrievanceModel);
                    var addEmployeeGrievanceFn = function(data1) {
                         $.notify(self.notifySuccess(), "success");
                        oj.Router.rootInstance.go('summaryEmployeeGrievance');
                    };
                    services.addEmployeeGrievance(jsonData).then (addEmployeeGrievanceFn , app.failCbFn) ;
              }
            }
            
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
                this.cancelButton = function () {
                 self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
            
            /*function to clear table content after submit*/
            function clearContent() {
                self.employeeGrievanceModel.grievanceType("");
                self.employeeGrievanceModel.grievanceDescription("");
                self.employeeGrievanceModel.requestReference("");
                self.employeeGrievanceModel.grievanceStatus("");
                self.clickedButton("");
            }
              //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();           
            self.notifySuccess= ko.observable();
            self.grievanceDate= ko.observable();            
            self.grievanceType= ko.observable();           
            self.grievanceDescription= ko.observable();
            self.requestReference= ko.observable();
            self.grievanceStatus= ko.observable();
            self.directManagerComment= ko.observable();
            self.directManagerStatus= ko.observable();
            self.employeeGrievance= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });

            function initTranslations() {
               self.grievanceTypes(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
               self.ok(getTranslation("others.ok"));
               self.back(getTranslation("others.pervious"));
               self.next(getTranslation("others.next"));
               self.cancel(getTranslation("others.cancel"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));
               self.create(getTranslation("labels.create"));
               self.review(getTranslation("others.review"));           
               self.addMessage (getTranslation("employeeGrievance.addMessage"));
               self.notifySuccess (getTranslation("employeeGrievance.notifyCreateSuccess"));
               self.grievanceDate(getTranslation("employeeGrievance.grievanceDate"));             
               self.grievanceType(getTranslation("employeeGrievance.grievanceType"));     
               self.grievanceDescription(getTranslation("employeeGrievance.grievanceDescription"));     
               self.requestReference(getTranslation("employeeGrievance.requestReference"));     
               self.grievanceStatus(getTranslation("employeeGrievance.grievanceStatus"));     
               self.directManagerComment(getTranslation("employeeGrievance.directManagerComment"));     
               self.directManagerStatus(getTranslation("employeeGrievance.directManagerStatus")); 
               self.employeeGrievance(getTranslation("employeeGrievance.employeeGrievance"));    
            }
         //    self.label = {text: self.progressValue(), style: {color:'white'}};       
            // self.thresholdValues = [{max: 33}, {max: 67}, {}];
        }
        return new createEmployeeGrievance ();
    });