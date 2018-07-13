define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditChildrenEductionExpenseViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        this.specialistSummary = ko.observable("");//added
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        this.disableSubmit = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.isVisible = ko.observable(false);        
        self.editResubmitBtnVisible = ko.observable(false);
            
       

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.childrenExpenseModel = {
            id : ko.observable(),
            requestDate : ko.observable(self.formatDate(new Date())),
            schoolYear : ko.observable(""), 
            amount : ko.observable(""),
            comments:ko.observable(""),
            childrenNumber:ko.observable(""),
            updateddBy : rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT:ko.observable(""),
            imageBase64:ko.observable(""),
            name:ko.observable(""),
            personId:ko.observable(""),
            status : ko.observable("")
        };
        
        ko.postbox.subscribe("editChildrenEductionExpenseObj", function (newValue) { 
        console.log(newValue);
            self.childrenExpenseModel.id(newValue.id);
            self.childrenExpenseModel.requestDate(newValue.request_date);
            self.childrenExpenseModel.schoolYear(newValue.school_year);
            self.childrenExpenseModel.childrenNumber(newValue.children_number);
            self.childrenExpenseModel.amount(newValue.amount);
            self.childrenExpenseModel.comments(newValue.comments);
            self.childrenExpenseModel.imageBase64(newValue.attachment_base64);
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
            var preview = document.querySelector('.attClass');
            preview.src = self.childrenExpenseModel.imageBase64();
            
            self.currentStepValue('stp1');
                self.childrenExpenseModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.childrenExpenseModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.childrenExpenseModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.childrenExpenseModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            initTranslations(); 
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
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.childrenEductionExpense();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            //save draft
        this.draftButton = function () {
            self.childrenExpenseModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function () {
            editChildrenExpenseRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function () {
            editChildrenExpenseRecord();
            return true;
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
                    oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }

        }
        function editChildrenExpenseRecord() {     
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
                var jsonData = ko.toJSON(self.childrenExpenseModel);
                var editChildrenExpenseCbFn = function (data) {
                $.notify(self.notifyEdit(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }//added
                self.disableSubmit(false);
            };
            services.editChildrenEductionExpense(jsonData).then(editChildrenExpenseCbFn, app.failCbFn);

        }

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
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.next = ko.observable();
            self.confirmMessage= ko.observable();
            self.editMessage= ko.observable();
            self.comment=ko.observable();
            self.notifyEdit=ko.observable();
            self.saveDraft = ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();            
            self.noOfChildren = ko.observable();//added
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
                self.editMessage(getTranslation("childrenEductionExpense.editMessage"));
                self.childrenEductionExpense(getTranslation("childrenEductionExpense.childrenEductionExpense"));
                self.back(getTranslation("others.pervious"));
                self.next(getTranslation("others.next"));
                self.cancel(getTranslation("others.cancel"));
                self.comment(getTranslation("others.comment"));
                self.notifyEdit(getTranslation("childrenEductionExpense.notifyEdit"));
                self.saveDraft(getTranslation("labels.saveDraft"));
                self.attachment(getTranslation("businessTrip.attachment"));
                self.attachmentNotify(getTranslation("others.attachmentNotify"));
                self.noOfChildren(getTranslation("childrenEductionExpense.noOfChildren"));//added
        }
    }

    return new EditChildrenEductionExpenseViewModel();
});