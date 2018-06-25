define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditBankTransferAccViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        self.grade = rootViewModel.personDetails().grade();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.minPayrollDate= ko.observable();
         self.minDate = ko.observable();
        //  var preview = document.querySelector('.attClass');
        self.saBank = ko.observableArray(app.getSaaSLookup(rootViewModel.globalSABanks()));

        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
    //
        self.bankTransferAccModel = {
            id : ko.observable(), requestDate : ko.observable(),
            bankName : ko.observable(""),
             branchName: ko.observable(""),
            iban : ko.observable(""),
            effectiveStartDate : ko.observable(""), 
            remarks : ko.observable(""),
            personNumber : rootViewModel.personDetails().personNumber(),
            name : rootViewModel.personDetails().displayName(),
            personNumber : ko.observable(),
            imageBase64: ko.observable(),
            updateedBy :rootViewModel.personDetails().personId(),
            IS_DRAFT :  ko.observable(),
            IS_Payroll:  ko.observable() ,
            status:  ko.observable()
        };
        //branch_name
        ko.postbox.subscribe("editBankTransferAccObj", function (newValue) {
         
            self.bankTransferAccModel.id(newValue.id);
            self.bankTransferAccModel.requestDate(newValue.request_date);
            self.bankTransferAccModel.iban(newValue.iban_number);
            self.bankTransferAccModel.effectiveStartDate(newValue.effective_start_date);
            self.bankTransferAccModel.remarks(newValue.remarks);
            self.bankTransferAccModel.personNumber(newValue.person_number);
            self.bankTransferAccModel.bankName(newValue.bank_name);
            self.bankTransferAccModel.branchName(newValue.branch_name);
            self.bankTransferAccModel.status(newValue.status);
            self.bankTransferAccModel.imageBase64(newValue.imageBase64);
        });

        self.handleActivated = function (info) {

            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            clearContent();
            initTranslations()

        };
     var getMinPayrollReport = function (data) {
             var tempObject=  jQuery.parseJSON(data);                 
              self.minPayrollDate( self.formatDate(new Date(tempObject.MAX_DATE_EARNED_)));
             
        }

        self.handleAttached = function (info) {
            self.currentStepValue('stp1');
            initTranslations()
             self.minDate(self.formatDate(new Date()));
              var preview = document.querySelector('.attClass');
              preview.src = self.bankTransferAccModel.imageBase64();
    services.getPayrollReport().then (getMinPayrollReport , app.failCbFn) ;
            
        };
        self.handleDetached = function (info) {
        };

        self.stepArray = ko.observableArray( 
                         [{label : 'Edit', id : 'stp1'},
                          {label : 'Review', id : 'stp2'}]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        this.nextStep = function () {
           self.bankTransferAccModel.bankName( self.bankTransferAccModel.bankName().toString());
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
             if(self.bankTransferAccModel.iban().length!=24|| self.bankTransferAccModel.iban()[0]!="S"||
                     self.bankTransferAccModel.iban()[1]!="A"){
                     $.notify(self.ibanSize(), "error");
                     return ; 
//                    self.bankTransferAccModel.iban()
//                      self.bankTransferAccModel.imageBase64()
                }
            if(self.bankTransferAccModel.effectiveStartDate()< self.minPayrollDate()){
	         $.notify(self.failPayrollErrorLbl(), "error");
	               return 
	         }
                 var preview = document.querySelector('.attClass');
                 self.bankTransferAccModel.imageBase64(preview.src);
                
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.AttachmentError(), "error");
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
                self.editBtnVisible(true)
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
            }

             return self.newBank();
        };

        self.commitRecord = function () {
            editAdvHousingRecord();
            return true;
        }

        this.startDateChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value && data.previousValue && data.value.toString().trim() !== data.previousValue.toString().trim()) {
                self.selectedStartDate(data.value);
               // computeValues(false, false, true, true, true);
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
                 if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
        }

        self.editNewBankTransferACC = function () {

            var jsonData = ko.toJSON(self.bankTransferAccModel);

            var editNewBankTransferACCCbFn = function (data) {
                oj.Router.rootInstance.go('bankTransferAccSummary');
            };
            services.editNewBankTransferACC(jsonData).then(editNewBankTransferACCCbFn, app.failCbFn);

        }
        //----------------------Dialog Section -----------------------
        this.submitButton = function () {
         self.bankTransferAccModel.IS_DRAFT("Yes")
            document.querySelector("#yesNoDialog").open();
        };
         this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        this.submitDraft = function () {
           self.bankTransferAccModel.IS_DRAFT("No");
            document.querySelector("#yesNoDialog").open();
        };

        function clearContent() {
            self.bankTransferAccModel.requestDate("");
            self.bankTransferAccModel.bankName("");
            self.bankTransferAccModel.iban("");
            self.bankTransferAccModel.effectiveStartDate("");
            self.bankTransferAccModel.remarks("");
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
            self.requestDateLbl= ko.observable();            
            self.bankNameLbl= ko.observable();           
            self.IBANLbl= ko.observable();
            self.effectiveStartDateLbl= ko.observable();
            self.remarksLbl= ko.observable();
            self.branchNameLbl= ko.observable();
            self.attachment = ko.observable();
            self.ibanSize =  ko.observable();
            self.AttachmentError=  ko.observable();
             self.saveDraft = ko.observable();
             self.newBank =  ko.observable();
             self.editMessage= ko.observable();
             self.saveDraft = ko.observable();
            self.failPayrollErrorLbl=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });
         function initTranslations() {
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.editMessage(getTranslation("newBankRequest.editMessage"));
         self.newBank(getTranslation("labels.newBankTransferAccountRequests"));
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
               self.addMessage (getTranslation("newBankRequest.addMessage"));
               self.notifySuccess (getTranslation("newBankRequest.notifyCreateSuccess"));
               self.requestDateLbl(getTranslation("newBankRequest.requestDate"));             
               self.bankNameLbl(getTranslation("newBankRequest.bankName"));     
               self.IBANLbl(getTranslation("newBankRequest.IBAN"));     
               self.effectiveStartDateLbl(getTranslation("newBankRequest.effectiveStartDate"));     
               self.remarksLbl(getTranslation("newBankRequest.remarks"));     
              self.branchNameLbl(getTranslation("newBankRequest.branchName")); 
              self.attachment(getTranslation("businessTrip.attachment"));
              self.ibanSize(getTranslation("newBankRequest.ibanSize"));//ibanSize
              self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
              self.saveDraft(getTranslation("labels.saveDraft"));
              self.failPayrollErrorLbl((getTranslation("newBankRequest.failPayrollError")));
            }


    }

    return new EditBankTransferAccViewModel();
});