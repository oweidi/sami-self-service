define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton','promise', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojgauge'],

    function(oj, ko, $, app, commonUtil, services) {

        function createEmployeeAllowance () {
            var self = this;
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

//            var managerId = rootViewModel.personDetails().managerId();
            var personId = rootViewModel.personDetails().personId();
            var personNumber = rootViewModel.personDetails().personNumber();
            var gradeId = rootViewModel.personDetails().gradeId();
            self.stepArray = ko.observableArray([]);
            self.currentStepValue = ko.observable('stp1');
            self.tracker = ko.observable();
            self.isDisabled = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.currentDate=ko.observable(formatDate(new Date()));
            this.nextClick = ko.observable(false);
            this.totalScreenValue = ko.observable(0);
            self.disableSubmit = ko.observable(false);//added
            self.hrAllowances = ko.observableArray(rootViewModel.globalEmployeeAllowance());
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);
            this.specialistSummary = ko.observable("");
            self.columnArrayApproval = ko.observableArray([]);//added
            this.allowanceAmount =ko.observableArray([{
                "value": '',
                "label": ''
            }]); 
            self.nextBtnVisible = ko.observable(true);
            self.selectedEmployee = ko.observable();
            ko.postbox.subscribe("addEmployeeObj", function (data) {
            self.selectedEmployee(data);
          
         });
         self.progressValue = ko.computed(function () {
            return 0;
        },
        this);

            function formatDate(date) {
                month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy-MM-dd'
        }));

            
         
            self.employeeAllowanceModel = {
                personNumber:rootViewModel.specialistSelectedEmployee().PersonNumber,
                personId:rootViewModel.specialistSelectedEmployee().PersonId,
                requestDate: self.currentDate(),
                hireDate:rootViewModel.specialistSelectedEmployee().HireDate,
                housingType  : ko.observable(""),
                housingAllowance:  ko.observable(""),
                allowanceAmount: ko.observable(""),
                reason:  ko.observable(""),
                name:rootViewModel.specialistSelectedEmployee().DisplayName,
                startDate: ko.observable(""),
                endDate: ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                commment:ko.observable(""),
                IS_DRAFT:ko.observable(""),
                managerId:ko.observable(""),
                IS_LINE_MANAGER:ko.observable("")
            };
        this.allowanceAmountCompute = ko.computed(function () {
            if (self.employeeAllowanceModel.housingAllowance()) {
                self.allowanceAmount([]);
                $("#allowanceAmount").ojSelect("option", "value",  self.allowanceAmount()); 
                var searchUDTArray = rootViewModel.globalUDTLookup();
                for (var i = 0;i < searchUDTArray.length;i++) {
                    if (searchUDTArray[i].tableName === 'XXX_HR_ALLOWANCES_DETAILS' && searchUDTArray[i].colName .toUpperCase().includes(self.employeeAllowanceModel.housingAllowance())) {
                        self.allowanceAmount.push( {
                            "value" : searchUDTArray[i].value, "label" : searchUDTArray[i].value
                        });  
                    }                   
                }
            }
            return;
        });
            self.handleActivated = function(info) {
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');
            };

            self.handleAttached = function(info) {
                   self.specialistSummary("true");
                
                self.currentStepValue('stp1');
                                initTranslations();
                                self.progressValue = ko.computed(function () {
                return precantageOField(self.employeeAllowanceModel, 7);
            },
            this);

            };
            self.handleDetached = function(info) {
                clearContent();
            };

            this.stopSelectListener = function(event, ui) {  
            var nextSelectableStep = document.getElementById("train").getNextSelectableStep();
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

            else if (nextSelectableStep && !self.nextClick() && self.validatePersonElementEntry()) {
                showNotify('error',' The requested Allowance exceeds maximum limit of allowances');
                event.preventDefault();
                return;
            }
            }


            this.previousStep = function() {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            self.nextClick(false);
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
                
                return self.employeeAllowance();
            };
            
            this.cancelAction = function() {
                oj.Router.rootInstance.go('summaryEmployeeAllowance');
            }

            function addEmployeeAllowance () {
            if(!self.disableSubmit()) {
                     self.disableSubmit(true);    
                }
            self.employeeAllowanceModel.allowanceAmount(self.employeeAllowanceModel.allowanceAmount().toString());    
            self.employeeAllowanceModel.housingAllowance(self.employeeAllowanceModel.housingAllowance().toString());   
            self.employeeAllowanceModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                var jsonData = ko.toJSON( self.employeeAllowanceModel);
                var addEmployeeAllowanceFn = function(data1) {
                    $.notify(self.notifySuccess(), "success");
                    oj.Router.rootInstance.go('summaryEmployeeAllowance');
                    self.disableSubmit(false); 
		};
		services.addEmployeeAllowance(jsonData).then (addEmployeeAllowanceFn , app.failCbFn) ;
            }
            
        this.submitButton = function () {
            self.employeeAllowanceModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addEmployeeAllowance();
            return true;
        }
        //save draft
        this.submitDraft = function () {
            self.employeeAllowanceModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addEmployeeAllowance();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
                this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            /*-----------------Approval List---------------------------*/
         this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "EA", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('EA').then(getApprovalList, app.failCbFn);

        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }//end
        /*Check For Line Manager*/
        if (rootViewModel.specialistSelectedEmployee().ManagerId !=null) {
                self.employeeAllowanceModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.employeeAllowanceModel.IS_LINE_MANAGER("NO");
            }
            /*function to clear table content after submit*/
            function clearContent() {
                self.employeeAllowanceModel.housingType("");
                self.employeeAllowanceModel.housingAllowance("");
                self.employeeAllowanceModel.allowanceAmount("");
                self.employeeAllowanceModel.reason("");
                self.employeeAllowanceModel.startDate("");
                self.employeeAllowanceModel.endDate("");
                self.employeeAllowanceModel.commment("");
                self.nextClick(false);
                self.totalScreenValue(0);
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
            self.addMessage = ko.observable();
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
            self.notifySuccess= ko.observable();
            self.notifyError= ko.observable();
            self.comment= ko.observable();
            self.saveDraft = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.approvals = ko.observable();
            self.serviceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
            self.placeHolder = ko.observable();//added
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
           self.addMessage (getTranslation("employeeAllowance.addMessage"));
           self.housingType (getTranslation("employeeAllowance.housingType"));
           self.amount (getTranslation("employeeAllowance.amount"));
           self.startDate(getTranslation("labels.startdate"));
           self.endDate(getTranslation("labels.enddate"));
           self.employeeAllowance (getTranslation("employeeAllowance.employeeAllowance"));
           self.notifySuccess (getTranslation("employeeAllowance.notifyCreateSuccess"));
           self.notifyError (getTranslation("employeeAllowance.notifyError"));
           self.comment(getTranslation("others.comment"));
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
           self.approvals(getTranslation("labels.approvals"));
           self.serviceName(getTranslation("labels.serviceName"));
           self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
           self.notificationType(getTranslation("labels.notificationType"));
           self.employeeRole(getTranslation("labels.employeeRole"));
           self.placeHolder(getTranslation("labels.placeHolder"));//added
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
         ]);//added
        }
         self.label = {text: self.progressValue(), style: {color:'white'}};       
          self.thresholdValues = [{max: 33}, {max: 67}, {}];
    };

        return new createEmployeeAllowance ();
    });