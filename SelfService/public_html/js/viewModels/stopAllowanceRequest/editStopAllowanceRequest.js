define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'], function (oj, ko, $, app, commonUtil, services) {

    function EditStopAllowanceRequestContentViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        var personId = rootViewModel.personDetails().personId();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        var managerId = rootViewModel.personDetails().managerId();

        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.disableSubmit = ko.observable(false);
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        
        self.stopAllowanceRequestModel = {
            id:ko.observable(),
            requestDate : ko.observable(self.formatDate(new Date())),
            allowanceType:ko.observable(""),
            stoppingDate:ko.observable(""),
            reason:ko.observable(""),
            createdBy:   rootViewModel.personDetails().personNumber(),
            personNumber :  rootViewModel.stopAllowanceSelectedEmployee().PersonNumber
        };
        ko.postbox.subscribe("editStopAllowanceRequestObj", function (newValue) {
            self.stopAllowanceRequestModel.id(newValue.id);
            self.stopAllowanceRequestModel.requestDate(newValue.request_date);
            self.stopAllowanceRequestModel.reason(newValue.reason);
            self.stopAllowanceRequestModel.allowanceType(newValue.allowance_type);
            self.stopAllowanceRequestModel.stoppingDate(newValue.stopping_date);

        });
		self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            

        };
            self.handleDeactivated = function (info) {
            clearContent();
        }
      
        
          self.handleAttached = function (info) {
            self.currentStepValue('stp1');
        };
        self.handleDetached = function (info) {

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
        
           
      
        this.nextStep = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!this._showComponentValidationErrors(trackerObj)) {
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

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);
            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.stopAllowanceRequest();
        };
        this.submitButton = function () {
          document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addStopAllowanceRequestRecord();
            return true;
        }

        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryStopAllowanceRequest');
        }

           

        function addStopAllowanceRequestRecord() {
            if(!self.disableSubmit()) {
                             self.disableSubmit(true);    
                        }
            var jsonData = ko.toJSON(self.stopAllowanceRequestModel);
            var editStopAllowanceRequestCbFn = function (data) {
                $.notify(self.notifyEdit(), "success");
                oj.Router.rootInstance.go('summaryStopAllowanceRequest');
                self.disableSubmit(false);
            };
           
                
                services.editStopAllowanceRequest(jsonData).then(editStopAllowanceRequestCbFn, app.failCbFn);
        }



        /*function to clear table content after submit*/
        function clearContent() {
            self.stopAllowanceRequestModel.allowanceType("");
            self.stopAllowanceRequestModel.stoppingDate("");
            self.stopAllowanceRequestModel.reason("");
            self.stopAllowanceRequestModel.requestDate("");
        }
        
        //language support =========================
            self.submit = ko.observable(); 
            self.yes = ko.observable(); 
            self.no = ko.observable(); 
            self.next = ko.observable(); 
            self.cancel = ko.observable(); 
            self.back = ko.observable(); 
            self.create = ko.observable(); 
            self.review = ko.observable(); 
            self.yes = ko.observable(); 
            self.confirmMessage = ko.observable(); 
            self.editMessage= ko.observable(); 
            self.ok = ko.observable();            
            self.employeeAllowance=ko.observable();            
            self.requestDate= ko.observable();
            self.allowanceType= ko.observable();            
            self.reason= ko.observable();         
            self.stoppingDate= ko.observable();
            self.next = ko.observable();
            self.stopAllowanceRequest=ko.observable();
            self.notifyEdit = ko.observable();
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
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.employeeAllowance(getTranslation("labels.employeeAllowanceRequest"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.stoppingDate(getTranslation("stopAllowance.stoppingDate")); 
            self.stopAllowanceRequest(getTranslation("stopAllowance.stopAllowanceRequest"));
            self.notifyEdit(getTranslation("stopAllowance.notifyEdit"));
            self.editMessage(getTranslation("stopAllowance.editMessage"));
      }

    }
    return new EditStopAllowanceRequestContentViewModel();
});