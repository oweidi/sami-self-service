define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services) {

    function createChildrenEductionExpenseViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
        var personId = rootViewModel.personDetails().personId();
        var managerId = rootViewModel.personDetails().managerId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();        
        this.disableSubmit = ko.observable(false);
        self.isDisabled  = ko.observable(false);

        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        
        
                 self.progressValue=ko.computed(function() {
                return 0;
    }, this);

       
       
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        
        self.childrenExpenseModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            schoolYear : ko.observable(""), 
            amount : ko.observable(""),
            childrenNumber:ko.observable(""),
            comments:ko.observable(""),
            createdBy:   rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            managerId : ko.observable(""),
            personId : ko.observable(""),
            name  : ko.observable(""),
            IS_DRAFT:ko.observable(""),
            personName:ko.observable(""),
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
            self.handleDeactivated = function (info) {
            clearContent();
        }
          self.handleAttached = function (info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true"); 
                }
                else {
                   self.specialistSummary("false");
                }//added
            self.currentStepValue('stp1');
             self.progressValue = ko.computed(function () {       
                return precantageOField(self.childrenExpenseModel, 17);
            },
            this);
                self.childrenExpenseModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.childrenExpenseModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.childrenExpenseModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.childrenExpenseModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());

             initTranslations();
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
        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
             
                var preview = document.querySelector('.attClass');
                self.childrenExpenseModel.imageBase64(preview.src);
                
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

            return self.childrenEductionExpense();
        };
        this.submitButton = function () {
         self.childrenExpenseModel.IS_DRAFT("NO");
          document.querySelector("#yesNoDialog").open();
        };
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addChildrenExpenseRecord();
            return true;
        }
         //save draft
        this.submitDraft = function () {
            self.childrenExpenseModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addChildrenExpenseRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction = function () {
                if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }
        }

        function addChildrenExpenseRecord() {
                if(!self.disableSubmit()) {
                         self.disableSubmit(true);    
                }
                var jsonData = ko.toJSON(self.childrenExpenseModel);
                console.log(jsonData);
                var addChildrenExpenseCbFn = function (data) {
                    $.notify(self.createNotify(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }//added
                    self.disableSubmit(false); 
                };
                services.addChildrenEductionExpense(jsonData).then(addChildrenExpenseCbFn, app.failCbFn);
        }
        /*function to clear table content after submit*/
        function clearContent() {
            self.childrenExpenseModel.schoolYear("");
            self.childrenExpenseModel.amount("");
            self.childrenExpenseModel.comments("");
            self.childrenExpenseModel.imageBase64("");
            self.childrenExpenseModel.childrenNumber("");
                 }
            //language support =========================

            self.amount = ko.observable();
            self.schoolYear = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.ok = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.next = ko.observable();
            self.comment = ko.observable();
            self.createNotify = ko.observable();  
            self.saveDraft = ko.observable();
            self.validateSemster = ko.observable();
            self.validateChildNo = ko.observable();
            self.validateChildAmount = ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();  
            self.noOfChildren = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
              self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
        function initTranslations() {
                   self.pervious(getTranslation("others.pervious"));
                   self.next(getTranslation("others.next"));
                   self.cancel(getTranslation("others.cancel"));
                   self.yes(getTranslation("others.yes"));
                   self.no(getTranslation("others.no"));
                   self.submit(getTranslation("others.submit"));
                   self.confirmMessage(getTranslation("labels.confirmMessage"));
                   self.create(getTranslation("labels.create"));
                   self.review(getTranslation("others.review"));
                   self.stepArray([{label : self.create(), id : 'stp1'},
                                 {label : self.review(), id : 'stp2'}]);
                self.requestDate(getTranslation("labels.requestDate"));
                self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
                self.amount(getTranslation("childrenEductionExpense.amount"));
                self.addMessage(getTranslation("childrenEductionExpense.addMessage"));
                self.childrenEductionExpense(getTranslation("childrenEductionExpense.childrenEductionExpense"));
                self.back(getTranslation("others.pervious"));
                self.next(getTranslation("others.next"));
                self.cancel(getTranslation("others.cancel"));
                self.comment(getTranslation("others.comment"));
                self.createNotify(getTranslation("childrenEductionExpense.createNotify"));
                self.saveDraft(getTranslation("labels.saveDraft"));
                self.attachment(getTranslation("businessTrip.attachment"));
                self.attachmentNotify(getTranslation("others.attachmentNotify"));
                self.noOfChildren(getTranslation("childrenEductionExpense.noOfChildren"));
        }       
        
    
     self.label = {text: self.progressValue(), style: {color:'white'}};       
      this.thresholdValues = [{max: 33}, {max: 67}, {}];

    }
    return new createChildrenEductionExpenseViewModel();
});