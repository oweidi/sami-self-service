define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojdialog'],

    function(oj, ko, $, app, commonUtil, services) {

        function CreateBankTransferAccViewModel() {
            var self = this;
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            var managerId = rootViewModel.personDetails().managerId();
            var personId = rootViewModel.personDetails().personId();
            var grade = rootViewModel.personDetails().grade();
            var personNumber = rootViewModel.personDetails().personNumber();
            var gradeId = rootViewModel.personDetails().gradeId();
            self.currentStepValue = ko.observable('stp1');
             self.nextBtnVisible = ko.observable(true);
            self.tracker = ko.observable();
            self.trackerIBAN = ko.observable();
            self.isDisabled = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.minDate = ko.observable();
            self.dataSourceTB2 = ko.observable();
             self.dataTB2 = ko.observableArray([]);
             self.minPayrollDate= ko.observable();
            this.specialistSummary = ko.observable("");//added
            self.saBank = ko.observableArray(app.getSaaSLookup(rootViewModel.globalSABanks()));
//            self.numbersOfMonthsDesiredArray= ko.observableArray(rootViewModel.globalHosuingInAdvMonthsLookup());

          self.formatDate = function (date) {
            //var date = new Date()
            var month = '' + (date.getMonth() + 1), 
                day = '' + date.getDate(), 
                year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));         //
            self.bankTransferAccModel = {
                requestDate : ko.observable(self.formatDate(new Date())),
                bankName: ko.observable(""),
                branchName: ko.observable(""),
                iban: ko.observable(""),
                effectiveStartDate: ko.observable(""),
                remarks: ko.observable(""),
                personNumber:ko.observable(""),
                name:ko.observable(""),
                imageBase64:ko.observable(""),
                IS_DRAFT:ko.observable(""),
                IS_Payroll:ko.observable(""),
                PersonId:ko.observable(""), 
                status:ko.observable("")
            };



            self.handleActivated = function(info) {
                var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');
                self.currentStepValue('stp1');
                initTranslations();
               //	clearContent();

            };
        var getMinPayrollReport = function (data) {
             var tempObject=  jQuery.parseJSON(data);                 
              self.minPayrollDate( self.formatDate(new Date(tempObject.MAX_DATE_EARNED_)));
             
        }
            self.handleAttached = function(info) {
             var searchLocation = window.location.search;
                self.currentStepValue('stp1');
                self.minDate(self.formatDate(new Date()));
               
                if (searchLocation.indexOf('Specialist')>  -1)
                {   
                  
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }
               
                if(self.specialistSummary() === 'true'){
               
                    self.bankTransferAccModel.PersonId(rootViewModel.specialistSelectedEmployee().PersonId);
                    self.bankTransferAccModel.name(rootViewModel.specialistSelectedEmployee().DisplayName);
                    self.bankTransferAccModel.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);
                    if(rootViewModel.specialistSelectedEmployee().Position=='Assistant Manager - Payroll'){
                         self.bankTransferAccModel.IS_Payroll("yse")
                    }else{
                        self.bankTransferAccModel.IS_Payroll("No")
                    }
                    
                }else{
                    self.bankTransferAccModel.PersonId( rootViewModel.personDetails().personId());
                    self.bankTransferAccModel.name(rootViewModel.personDetails().displayName());
                    self.bankTransferAccModel.personNumber(rootViewModel.personDetails().personNumber());
                    if(rootViewModel.personDetails().positionName()=='Assistant Manager - Payroll'){
                         self.bankTransferAccModel.IS_Payroll("yse")
                    }else{
                        self.bankTransferAccModel.IS_Payroll("No")
                    }
                }
                
                services.getPayrollReport().then (getMinPayrollReport , app.failCbFn) ;
                
            };
            self.handleDetached = function(info) {
             clearContent();
            };
            self.typeChangeHandler = function(event, data)
            {// self.trackerIBAN 
            if (data.value[0]=="S"&&data.value[1]=="A"){ 
              
            }
           
              
            }

            this.stopSelectListener = function(event, ui) {
           
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!self._showComponentValidationErrors(trackerObj)) {
                    event.preventDefault();
                    return;
                }
            }

            self.stepArray = ko.observableArray( 
                         [{label : 'Create', id : 'stp1'},
                          {label : 'Review', id : 'stp2'}]);

            this.previousStep = function() {
                var prev = document.getElementById("train").getPreviousSelectableStep();
                if (prev != null)
                    self.currentStepValue(prev);
            }
            
            this.nextStep = function() {
//             self.bankTransferAccModel.imageBase64(preview.src);
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
                    self.addBtnVisible(true)
                     self.nextBtnVisible(false);
                } else {
                    self.isDisabled(false);
                    self.addBtnVisible(false);
                    self.nextBtnVisible(true);
                }
                
                return self.newBank();
            };

            self.commitRecord = function(data, event) {
                self.addBankTransferAcc();
                return true;
            }
                
        this.submitButton = function () {
            self.bankTransferAccModel.IS_DRAFT("No");
            self.bankTransferAccModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
        this.submitDraft = function () {
            self.bankTransferAccModel.IS_DRAFT("YES");
          self.bankTransferAccModel.status("DRAFT");
            document.querySelector("#draftDialog").open();
        };
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            this.cancelAction = function() {
                if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }

            }

            self.addBankTransferAcc=function(data, event) {
//                self.advHousingModel.numbersOfMonthsDesired(self.advHousingModel.numbersOfMonthsDesired()[0]);
                var jsonData = ko.toJSON( self.bankTransferAccModel);
                var addNewBankTransferACCCbFn = function(data) {
                    oj.Router.rootInstance.go('bankTransferAccSummary');
		};
		services.addNewBankTransferACC(jsonData).then (addNewBankTransferACCCbFn , app.failCbFn) ;
                 return true;
            }
            
            /*function to clear table content after submit*/
            function clearContent() {
            
                self.bankTransferAccModel.requestDate("");
                self.bankTransferAccModel.bankName("");
                self.bankTransferAccModel.iban("");
                self.bankTransferAccModel.effectiveStartDate("");
                self.bankTransferAccModel.remarks("");
//                self.bankTransferAccModel.personNumber("");
//                self.bankTransferAccModel.PERSON_NUMBER("");
//                self.bankTransferAccModel.name("");
            }
             this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
        this.openDialog = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "BTA", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('BTA').then(getApprovalList, app.failCbFn);

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
            self.newBank =  ko.observable();
             self.saveDraft = ko.observable();
            self.approvals = ko.observable();
            self.viewApprovalsLbl = ko.observable();
              self.ServiceName = ko.observable();
               self.employeeRole = ko.observable();
        self.notificationType = ko.observable();
            self.columnArrayApproval = ko.observableArray([]);
            self.failPayrollErrorLbl=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });
         function initTranslations() {//newBankTransferAccountRequests
              self.approvals(getTranslation("labels.approvals"));
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
              self.ServiceName(getTranslation("labels.ServiceName"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
            self.columnArrayApproval([
            {
                "headerText" : self.ServiceName(), "field" : "name"
            },
            {
                "headerText" : self.notificationType(), "field" : "type"
            },
            {
                "headerText" : self.employeeRole(), "field" : "status"
            }
])
              self.failPayrollErrorLbl((getTranslation("newBankRequest.failPayrollError")));
            }

        }
        return new CreateBankTransferAccViewModel();
    });