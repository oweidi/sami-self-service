define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojdialog', 'ojs/ojpopup','ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services) {

    function CreateAdvHousingViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.progressValue=ko.computed(function() {
                return 0;
    }, this);

        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var personNumber = rootViewModel.personDetails().personNumber();
        var gradeId = rootViewModel.personDetails().gradeId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.months= ko.observable();
        self.isDisabled = ko.observable(false);
        self.monthDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.numbersOfMonthsDesiredArray = ko.observableArray(rootViewModel.globalHosuingInAdvMonthsLookup());
        self.clickedButton = ko.observable("");
        this.specialistSummary = ko.observable("");//added
        self.columnArrayApproval = ko.observableArray([]);
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
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
                        requestDate : ko.observable(self.formatDate(new Date())), 
			hireDate : ko.observable(rootViewModel.personDetails().hireDate()), 
                        numbersOfMonthsDesired : ko.observable(""), 
			nrOfMonthRemInContract : ko.observable(""),//rootViewModel.personDetails().assignmentProjectedEndDate()?monthDiff(new Date(), new Date(rootViewModel.personDetails().AssignmentProjectedEndDate())):"0"
                        reason : ko.observable(""), 
			installmentAmount : ko.observable(""), 
			initialAmount : ko.observable(""), 
			paymentPeriod : ko.observable(""), 
			firstInstallmentPeriod : ko.observable(""), 
                        housingAmount : ko.observable(""), 
			personNumber :  ko.observable(""), 
			managerId :  ko.observable(""), 
			personId :  ko.observable(""), 
			name : ko.observable(""),
                        createdBy:personNumber,creationDate:ko.observable(new Date()),
                        commment : ko.observable(""),
                        IS_DRAFT:ko.observable("")

        };
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
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            checkProbationPeriodEndDate();
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {       
                return precantageOField(self.advHousingModel, 8);
            },
            this);
            self.advHousingModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.advHousingModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.advHousingModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.advHousingModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            services.getNumOfMonthsRemaining(self.advHousingModel.requestDate(),self.advHousingModel.personNumber()).then(getNumMonths, app.failCbFn);
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
            var prev = document.getElementById("train").getPreviousSelectableStep();;
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
                self.monthDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.monthDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }
            return self.advancedHousing();
        };
        this.submitButton = function () {
            self.advHousingModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addAdvHousingRecord();
            return true;
        }
        //save draft
        this.submitDraft = function () {
            self.advHousingModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addAdvHousingRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('advHousingSummary');
                }
        }
                function checkProbationPeriodEndDate(){
                    if(rootViewModel.personDetails().probationPeriodEndDate() != null){
                        self.monthDisabled(true);
                        self.advHousingModel.numbersOfMonthsDesired("6");    
                        
                    }
                }    
               

        function addAdvHousingRecord() {
         if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);
            self.advHousingModel.numbersOfMonthsDesired(self.advHousingModel.numbersOfMonthsDesired()[0]);
            var jsonData = ko.toJSON(self.advHousingModel);
            var addAdvHousingCbFn = function (data) {
                $.notify(self.createNotify(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('advHousingSummary');
                }
            };
            services.addAdvHousing(jsonData).then(addAdvHousingCbFn, app.failCbFn);
         }
        }
        //get number of months
        
            var getNumMonths = (function (data) {
               var tempObject=  jQuery.parseJSON(data);      
                    self.advHousingModel.nrOfMonthRemInContract(tempObject[1].REMAINING_CONTRACT_MONTHS);
        });
        //end
        
        /*-----------------Approval List---------------------------*/
         this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "AH", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('AH').then(getApprovalList, app.failCbFn);

        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        /*function to clear table content after submit*/
        function clearContent() {
            self.advHousingModel.numbersOfMonthsDesired("");
            self.advHousingModel.housingAmount("");
            self.advHousingModel.reason("");
            self.advHousingModel.installmentAmount("");
            self.clickedButton("");
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
            self.monthsDesired= ko.observable();
            self.monthsRemaining= ko.observable();
            self.housingAmount= ko.observable();
            self.reason= ko.observable();
            self.installmentAmount= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.addMessage= ko.observable();
            self.advancedHousing= ko.observable();   
            self.createNotify= ko.observable();
            self.comment=ko.observable();
            self.firstInst= ko.observable();           
            self.instAmount= ko.observable();
            self.intialAmount= ko.observable();
            self.paymentPeriod = ko.observable();
            self.saveDraft = ko.observable();
            self.placeHolder = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.serviceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
            self.approvals = ko.observable();
            self.ok = ko.observable();
            self.notifyValidation=ko.observable();
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
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.addMessage(getTranslation("advanceHousing.addMessage"));        
          self.advancedHousing(getTranslation("pages.advancedHousing"));         
          self.createNotify(getTranslation("advanceHousing.createNotify"));     
          self.firstInst(getTranslation("advanceHousing.firstInst"));        
          self.comment(getTranslation("others.comment"));
          self.instAmount(getTranslation("advanceHousing.instAmount"));        
          self.intialAmount(getTranslation("advanceHousing.intialAmount")); 
          self.paymentPeriod(getTranslation("labels.paymentperiod"));  
          self.saveDraft(getTranslation("labels.saveDraft"));
          self.placeHolder(getTranslation("labels.placeHolder"));
          self.serviceName(getTranslation("labels.serviceName"));
          self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
          self.notificationType(getTranslation("labels.notificationType"));
          self.employeeRole(getTranslation("labels.employeeRole"));
          self.approvals(getTranslation("labels.approvals"));
          self.notifyValidation(getTranslation("advanceHousing.notifyValidation"));
          self.ok(getTranslation("others.ok"));
               self.columnArrayApproval([
            {
                "headerText" : self.serviceName(), "field" : "name"
            },
            {
                "headerText" : self.notificationType(), "field" : "type"
            },
            {
                "headerText" : self.employeeRole(), "field" : "status"
            }
]);
        }//added
         self.label = {text: self.progressValue(), style: {color:'white'}};
        
      this.thresholdValues = [{max: 33}, {max: 67}, {}];

    }
    return new CreateAdvHousingViewModel();
});