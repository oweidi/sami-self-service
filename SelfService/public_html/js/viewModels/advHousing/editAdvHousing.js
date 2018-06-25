define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','config/services', 'ojs/ojbutton', 'ojs/ojtrain','ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditAdvHousingViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        self.grade = rootViewModel.personDetails().grade();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.monthDisabled = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.months= ko.observable();
        self.clickedButton = ko.observable("");
        self.numbersOfMonthsDesiredArray = ko.observableArray(rootViewModel.globalHosuingInAdvMonthsLookup());
        self.isVisible = ko.observable(false);
        this.specialistSummary = ko.observable("");//added
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.advHousingModel = {
            id : ko.observable(), requestDate : ko.observable(self.formatDate(new Date())),
            hireDate : ko.observable(rootViewModel.personDetails().hireDate()),
            numbersOfMonthsDesired : ko.observable(""),
            nrOfMonthRemInContract : ko.observable(rootViewModel.personDetails().AssignmentProjectedEndDate()?monthDiff(new Date(), new Date(rootViewModel.personDetails().AssignmentProjectedEndDate())):"0"),
            reason : ko.observable(""),
            installmentAmount : ko.observable(""),
            housingAmount : ko.observable(""),
            personNumber : ko.observable(""), 
            managerId : ko.observable(""), 
            PERSON_NUMBER : ko.observable(""),
            updatedBy:rootViewModel.personDetails().personNumber(),
            updateDate:ko.observable(new Date()),
            commment : ko.observable(""),
            IS_DRAFT:ko.observable(""),
            name : ko.observable("")

        };

        ko.postbox.subscribe("editAdvHousingObj", function (newValue) {
            self.advHousingModel.id(newValue.id);
            self.advHousingModel.nrOfMonthRemInContract(newValue.months_remaining_contract);
            self.advHousingModel.requestDate(newValue.request_date);
            self.advHousingModel.numbersOfMonthsDesired(newValue.nr_of_month_desired);
            self.advHousingModel.housingAmount(newValue.housing_amount);
            self.advHousingModel.installmentAmount(newValue.installment_amount);

            self.advHousingModel.hireDate(newValue.hire_date);
            self.advHousingModel.requestDate(newValue.request_date);
            self.advHousingModel.reason(newValue.reason);
             self.advHousingModel.commment(newValue.commment);
        });

        self.handleActivated = function (info) {

            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            
        };

        self.handleAttached = function (info) {
            checkProbationPeriodEndDate();
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            self.currentStepValue('stp1');
            initTranslations();
            
        };
        self.handleDetached = function (info) {
        clearContent();
        };

   

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
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
             if (self.advHousingModel.housingAmount() == 0) {
                $.notify(self.notifyValidation(), "error");
                return;
                }//added
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
                self.monthDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.monthDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.advancedHousing();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
           self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        
         //save draft
        this.draftButton = function () {
            self.advHousingModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editAdvHousingRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function () {
            editAdvHousingRecord();
            return true;
        }

        self.advHousingModel.numbersOfMonthsDesired.subscribe(function(newValue) {
                var months;
                var salary= 0;
                 if(rootViewModel.personDetails().salaryAmount()){
                     salary=rootViewModel.personDetails().salaryAmount();
                 }
                var contractMonth=self.advHousingModel.nrOfMonthRemInContract();
                
                 if(newValue < contractMonth){
                     month=newValue;
                 }
                 else{
                   month=contractMonth;  
                 }
                 self.months(month);
                  self.advHousingModel.housingAmount(Math.ceil(+.25 * +month * +salary));                
        });
        
          self.advHousingModel.housingAmount.subscribe(function(newValue) {
                var month;
                var contractMonth=self.advHousingModel.nrOfMonthRemInContract();
                if(contractMonth === "0"  || contractMonth === 0){
                    self.advHousingModel.installmentAmount("0");

                }
                    else{
                     if( self.months() < contractMonth){
                         month= self.months();
                     }
                     else{
                       month=contractMonth;  
                     }
                      self.advHousingModel.installmentAmount(Math.ceil(+newValue / +month ));
                }
                
        });

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

        }

        this.cancelAction = function () {
            resetForm();
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('advHousingSummary');
                }

        }

        function resetForm() {
        }

        function editAdvHousingRecord() {
         if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);
            self.advHousingModel.numbersOfMonthsDesired(self.advHousingModel.numbersOfMonthsDesired().toString());
            self.advHousingModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.advHousingModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.advHousingModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.advHousingModel.PERSON_NUMBER(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            var jsonData = ko.toJSON(self.advHousingModel);
            /*-----------*/
            var updateApproval = {
                    "TransactionId":rootViewModel.selectedTableRowKey(),
                    "serviceType":"AH"
              };           
            var ApprovalsjsonnData = ko.toJSON(updateApproval);
            var editApprovalspCbFn = function (data){
            $.notify(self.editNotify(), "success");

                  if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('advHousingSummary');
                }
            }          
            /*----------*/
          
        
           var editAdvHousingCbFn = function (data) {
                
                 services.editApprovals(ApprovalsjsonnData).then(editApprovalspCbFn, app.failCbFn);
            };
            services.editAdvHousing(jsonData).then(editAdvHousingCbFn, app.failCbFn);

         }
         }

          function checkProbationPeriodEndDate(){
                    if(rootViewModel.personDetails().probationPeriodEndDate() != null){
                        self.monthDisabled(true);
                        self.advHousingModel.numbersOfMonthsDesired("6");    
                        
        }
                }  
         function monthDiff(d1, d2) {

        if(d1 && d2){
                var months;
                months = (d2.getFullYear() - d1.getFullYear()) * 12;
                months -= d1.getMonth() + 1;
                months += d2.getMonth();
                return (months == 0 ? 1 : (months < 0 ?0 : (months+1)));
            }else{
                return "0";
            }
        }

        function clearContent() {
            self.advHousingModel.numbersOfMonthsDesired("");
            self.advHousingModel.nrOfMonthRemInContract("");
            self.advHousingModel.housingAmount("");
            self.advHousingModel.reason("");
            self.advHousingModel.installmentAmount("");
             self.clickedButton("");
        }
                            //language support =========================
            self.editNotify = ko.observable();
            self.next = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.monthsDesired= ko.observable();
            self.monthsRemaining= ko.observable();
            self.housingAmount= ko.observable();
            self.reason= ko.observable();
            self.installmentAmount= ko.observable();
            self.requestDate= ko.observable();
            self.hireDate= ko.observable();
            self.edit= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.addMessage= ko.observable();
            self.advancedHousing= ko.observable();
            self.comment= ko.observable();
            self.saveDraft = ko.observable();
            self.notifyValidation=ko.observable();//added
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
          self.monthsDesired(getTranslation("advanceHousing.monthsDesired"));
          self.monthsRemaining(getTranslation("advanceHousing.monthsRemaining"));
          self.housingAmount(getTranslation("advanceHousing.housingAmount"));
          self.reason(getTranslation("advanceHousing.reason"));
          self.installmentAmount(getTranslation("advanceHousing.installmentAmount"));
          self.requestDate(getTranslation("labels.requestDate"));
          self.hireDate(getTranslation("labels.hireDate"));
          self.edit(getTranslation("others.edit"));
          self.review(getTranslation("others.review"));
          self.stepArray([{label : self.edit(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.addMessage(getTranslation("advanceHousing.editMessage"));
          self.advancedHousing(getTranslation("pages.advancedHousing"));       
          self.editNotify(getTranslation("advanceHousing.editNotify"));
          self.comment(getTranslation("others.comment"));
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.notifyValidation(getTranslation("advanceHousing.notifyValidation"));
        }//added

}
    return new EditAdvHousingViewModel();
});