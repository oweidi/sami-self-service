define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton','notifyjs', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function editEmployeeAllowanceModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));        
        self.personId = rootViewModel.personDetails().personId();
        self.grade = rootViewModel.personDetails().grade();
        self.stepArray = ko.observableArray([]);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.editResubmitBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        this.nextClick = ko.observable(false);
        this.totalScreenValue = ko.observable(0);
        this.specialistSummary = ko.observable("");
        self.clickedButton = ko.observable("");   
        self.hrAllowances = ko.observableArray(rootViewModel.globalEmployeeAllowance());
        this.allowanceAmount =ko.observableArray([{
                "value": '',
                "label": ''
            }]); 

        self.formatDate = function (date) {
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


            self.employeeAllowanceModel = {
                id : ko.observable(),
                personNumber:ko.observable(""),
                requestDate: ko.observable(""),
                hireDate: ko.observable(rootViewModel.personDetails().hireDate()),
                housingType  : ko.observable(""),
                housingAllowance:  ko.observable(""),
                allowanceAmount: ko.observable(""),
                reason:  ko.observable(""),
                name:ko.observable(""),
                startDate: ko.observable(""),
                endDate: ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                commment:ko.observable(""),
                IS_DRAFT:ko.observable(""),
                IS_LINE_MANAGER:ko.observable(""),
                managerId:ko.observable("")
            };



        ko.postbox.subscribe("editEmployeeAllowanceObj", function (newValue) {
            self.employeeAllowanceModel.id(newValue.id);
            self.employeeAllowanceModel.requestDate(newValue.request_date);
            self.employeeAllowanceModel.hireDate(newValue.hire_date);
            self.employeeAllowanceModel.housingType(newValue.housing_type);
            self.employeeAllowanceModel.housingAllowance(newValue.allowance_type_code);
            self.employeeAllowanceModel.allowanceAmount(newValue.allowance_amount);
            self.employeeAllowanceModel.reason(newValue.reason);
            self.employeeAllowanceModel.personNumber(newValue.person_number);
            self.employeeAllowanceModel.name(newValue.name);           
            self.employeeAllowanceModel.startDate(newValue.start_date);
            self.employeeAllowanceModel.endDate(newValue.end_date);
            self.employeeAllowanceModel.commment(newValue.commment);
            self.employeeAllowanceModel.managerId(newValue.managerId);
            var test = newValue.statusdraft;
            if(test =='Draft' || test == 'مسودة'){
                self.editResubmitBtnVisible(true);
            }else{
                    self.editResubmitBtnVisible(false);
            }
        });
        this.allowanceAmountCompute = ko.computed(function () {
            if (self.employeeAllowanceModel.housingAllowance()) {
                self.allowanceAmount([]);
                $("#allowanceAmount").ojSelect("option", "value",  self.allowanceAmount());                
                var searchUDTArray = rootViewModel.globalUDTLookup();
                for (var i = 0;i < searchUDTArray.length;i++) {

                    if (searchUDTArray[i].tableName === 'XXX_HR_ALLOWANCES_DETAILS' && searchUDTArray[i].colName .toUpperCase().includes(self.employeeAllowanceModel.housingAllowance())) {
                        self.allowanceAmount.push( {
                            "value" : searchUDTArray[i].rowName, "label" : searchUDTArray[i].value
                        });
                    }
                }
            }
            return;
        });
        self.handleActivated = function (info) {

//            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };

        self.handleAttached = function (info) {
            self.specialistSummary("true");
            self.currentStepValue('stp1');
             initTranslations();

        };
        self.handleDetached = function (info) {
          clearContent();
        };


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

            else {
                var next = document.getElementById("train").getNextSelectableStep();
                if (next != null) {
                    if (!self.validatePersonElementEntry()) {
                        self.nextClick(true);
                        self.currentStepValue(next);
                    }
                    else {
                        showNotify('error',self.notifyError());
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
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);
//                self.editResubmitBtnVisible(true);
            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
//                self.editResubmitBtnVisible(false);
            }

            return self.employeeAllowance();
        };

            this.stopSelectListener = function(event, ui) {  
            var nextSelectableStep = document.getElementById("train").getNextSelectableStep();
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

            else if (nextSelectableStep && !self.nextClick() && self.validatePersonElementEntry()) {
                showNotify('error',self.notifyError());
                event.preventDefault();
                return;
            }
            }
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };


        this.cancelAction = function () {
            self.clickedButton("");
            oj.Router.rootInstance.go('summaryEmployeeAllowance');
        }
        //
       
          //save draft
        this.draftButton = function () {
            self.employeeAllowanceModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editEmployeeAllowanceRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function (data, event) {
            editEmployeeAllowanceRecord();
            return true;
        }//added
       function editEmployeeAllowanceRecord () {
          if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
            self.employeeAllowanceModel.allowanceAmount(self.employeeAllowanceModel.allowanceAmount().toString());    
            self.employeeAllowanceModel.housingAllowance(self.employeeAllowanceModel.housingAllowance().toString());
            self.employeeAllowanceModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            var jsonData = ko.toJSON(self.employeeAllowanceModel);
            /*-----------*/
            var updateApproval = {
                    "TransactionId":rootViewModel.selectedTableRowKey(),
                    "serviceType":"EA"
              };           
            var approvalsJsonData = ko.toJSON(updateApproval);
            var editApprovalsCbFn = function (data1){
            $.notify(self.notifyUpdateSuccess(), "success");            
            oj.Router.rootInstance.go('summaryEmployeeAllowance');                
            }          
            /*----------*/
            var editEmployeeAllowanceCbFn = function (data) {
            services.editApprovals(approvalsJsonData).then(editApprovalsCbFn, app.failCbFn);
                $.notify(self.notifyUpdateSuccess(), "success");
                oj.Router.rootInstance.go('summaryEmployeeAllowance');
            };
            services.editEmployeeAllowance(jsonData).then(editEmployeeAllowanceCbFn, app.failCbFn);
            
            }

        }
         /*Check For Line Manager*/
        if (rootViewModel.specialistSelectedEmployee().ManagerId !=null) {
                self.employeeAllowanceModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.employeeAllowanceModel.IS_LINE_MANAGER("NO");
            }
            //
        function clearContent() {
                self.employeeAllowanceModel.housingType("");
                self.employeeAllowanceModel.housingAllowance("");
                self.employeeAllowanceModel.allowanceAmount("");
                self.employeeAllowanceModel.reason("");
                self.employeeAllowanceModel.startDate("");
                self.employeeAllowanceModel.endDate("");
                self.nextClick(false);
                self.totalScreenValue(0);
                self.clickedButton("");
        }
                    
        self.validatePersonElementEntry = function () {
            var validatePersonElementEntryCbFn = function (data) {
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                documents.children('G_1').each(function () {
                    var screenValue = $(this).find('SCREEN_ENTRY_VALUE').text();
                    self.totalScreenValue(self.totalScreenValue() +  + screenValue);

                });
            };

            var allowanceType = self.employeeAllowanceModel.housingAllowance().toString();
            if (allowanceType === 'MOTIVATION_ALLOWANCE' || allowanceType === 'HOUSING_ALLOWANCE' || allowanceType === 'FIELD_ALLOWANCE' || allowanceType === 'TRANSPORTATION_ALLOWANCE' || allowanceType === 'DUTY_ALLOWANCE') {
                services.getPersonElementEntry(rootViewModel.specialistSelectedEmployee().PersonId, self.employeeAllowanceModel.startDate()).then(validatePersonElementEntryCbFn, app.failCbFn);
                 var allowanceAmount= self.employeeAllowanceModel.allowanceAmount().toString();
                if ((self.totalScreenValue() + +allowanceAmount) >= 30) {
                    return true;
                }
                else {
                    return false;
                }
            }

            else {
                return false;
            }

        }
        
         //language support =========================
            self.ok = ko.observable();
            self.requestDate= ko.observable();
            self.allowanceType= ko.observable();            
            self.reason= ko.observable();         
            self.amount= ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage  = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.hireDate= ko.observable();
            self.startDate= ko.observable();
            self.endDate= ko.observable();
            self.housingType= ko.observable();
            self.amount= ko.observable();
            self.employeeAllowance= ko.observable();
            self.notifyUpdateSuccess= ko.observable();
            self.notifyError= ko.observable();
            self.comment= ko.observable();
            self.saveDraft = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });
        function initTranslations() {
            self.ok(getTranslation("others.ok"));
            self.requestDate(getTranslation("labels.requestDate")); 
            self.hireDate(getTranslation("labels.hireDate"));   
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.amount(getTranslation("employeeAllowance.amount"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.back(getTranslation("others.pervious"));
           self.next(getTranslation("others.next"));
           self.cancel(getTranslation("others.cancel"));
           self.yes(getTranslation("others.yes"));
           self.no(getTranslation("others.no"));
           self.submit(getTranslation("others.submit"));
           self.confirmMessage(getTranslation("labels.confirmMessage"));
           self.create(getTranslation("labels.create"));
           self.review(getTranslation("others.review"));
           self.editMessage(getTranslation("employeeAllowance.editMessage"));
           self.housingType (getTranslation("employeeAllowance.housingType"));
           self.amount (getTranslation("employeeAllowance.amount"));
           self.startDate(getTranslation("labels.startdate"));
           self.endDate(getTranslation("labels.enddate"));
           self.employeeAllowance (getTranslation("employeeAllowance.employeeAllowance"));
           self.notifyUpdateSuccess (getTranslation("employeeAllowance.notifyUpdateSuccess"));
           self.notifyError (getTranslation("employeeAllowance.notifyError"));     
           self.comment(getTranslation("others.comment"));
           self.saveDraft(getTranslation("labels.saveDraft"));
        }
    }

    return new editEmployeeAllowanceModel();
});