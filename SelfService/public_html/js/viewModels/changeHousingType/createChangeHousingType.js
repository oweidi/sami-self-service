define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel','ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services) {
        function createChangeHousingType () {
            var self = this;            
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            this.val = ko.observable("");
            self.isRequired = ko.observable(true);
            this.specialistSummary = ko.observable("");//added
            var managerId = rootViewModel.personDetails().managerId();
            var personId = rootViewModel.personDetails().personId();
            var gradeId = rootViewModel.personDetails().gradeId();
            self.currentStepValue = ko.observable('stp1');
            self.tracker = ko.observable();
            self.isDisabled = ko.observable(false);
            self.isDisabled2 = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.currentDate=ko.observable(formatDate(new Date()));
            self.newEmployeeHousingType = ko.observableArray(rootViewModel.globalNewHousingTypeLov());
            self.nextBtnVisible = ko.observable(true);
            self.clickedButton = ko.observable("");
            this.specialistSummary = ko.observable("");
            self.columnArrayApproval = ko.observableArray([]);
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);//added

            function formatDate(date) {
                var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        self.progressValue=ko.computed(function() {
                return 0;
    }, this);
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
                            

         
            self.changeHousingTypeModel = {
                requestDate: self.currentDate(),
                personNumber: ko.observable(),
                name: ko.observable(""),
                currentHousingType: ko.observable(""),
                newHousingType: ko.observable(""),
                changeReason: ko.observable(""),
                changeDate: ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                personId :  ko.observable(""), 
                managerId : ko.observable(""), 
                IS_DRAFT:ko.observable(""),
                IS_LINE_MANAGER:ko.observable("")
            };



            self.handleActivated = function(info) {
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');
            };

            self.handleAttached = function(info) {
                var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }//addded            
            self.currentStepValue('stp1');
             self.changeHousingTypeModel.currentHousingType(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().housingType : rootViewModel.personDetails().housingType());//added
             initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.changeHousingTypeModel,6);
            },
            this);
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

            self.stepArray = ko.observableArray([]);

            this.previousStep = function() {
                var prev = document.getElementById("train").getPreviousSelectableStep();
                if (prev != null)
                    self.currentStepValue(prev);
            }
    
            this.nextStep = function() {
            self.changeHousingTypeModel.newHousingType(self.changeHousingTypeModel.newHousingType().toString());
                var trackerObj = ko.utils.unwrapObservable(self.tracker);                                
                if (!this._showComponentValidationErrors(trackerObj)) {
                    return;
                }             
            //validation Cannot Request To Change From Current Housing Type To New Housing Type Of Same Type
            if(self.changeHousingTypeModel.newHousingType() === self.changeHousingTypeModel.currentHousingType()){
              $.notify(self.notifyValidation(), "error");
              return;
            }//
            
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
                    self.isDisabled2(true);
                } else {
                    self.isDisabled(false);
                    self.addBtnVisible(false);
                    self.nextBtnVisible(true);
                    self.isDisabled2(false);
                }
                
                return self.changeHousingRequest();
            };
            
        this.cancelAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChangeHousingType');
                }//added
        }

        function addChangeHousingType()  {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.changeHousingTypeModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.changeHousingTypeModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.changeHousingTypeModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());                        
                self.changeHousingTypeModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());               
                var jsonData = ko.toJSON(self.changeHousingTypeModel);
                var addChangeHousingTypeFn = function (data1) {
                    $.notify(self.notifyCreate(), "success");
                     if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryChangeHousingType');
                    }//added
                };
                services.addChangeHousingType(jsonData).then (addChangeHousingTypeFn , app.failCbFn) ;
            }
        }
            
        this.submitButton = function () {
            self.changeHousingTypeModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addChangeHousingType();
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
         //save draft
        this.submitDraft = function () {
            self.changeHousingTypeModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addChangeHousingType();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
         /*-----------------Approval List---------------------------*/
         this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "CHT", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('CHT').then(getApprovalList, app.failCbFn);

        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }//end
        ///
            /*Check For Line Manager*/
        if (self.changeHousingTypeModel.managerId !=null) {
                self.changeHousingTypeModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.changeHousingTypeModel.IS_LINE_MANAGER("NO");
            }
        /*function to clear table content after submit*/
        function clearContent() {
            self.clickedButton("");
            self.changeHousingTypeModel.newHousingType("");
            self.changeHousingTypeModel.changeReason("");
            self.changeHousingTypeModel.changeDate("");
        }
         //language support =========================
            self.ok = ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.requestDate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.changeHousingRequest = ko.observable();
            self.create= ko.observable();
            self.notifyCreate = ko.observable();  
            self.saveDraft = ko.observable();
            self.placeholder = ko.observable();
            self.currentHousingType = ko.observable();
            self.newHousingType = ko.observable();
            self.changeDate = ko.observable();
            self.changeReason = ko.observable();
            self.review = ko.observable();
            self.notifyValidation = ko.observable();
            self.serviceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
            self.approvals = ko.observable();
            self.ok = ko.observable();
            self.viewApprovalsLbl = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.ok(getTranslation("others.ok"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.approvals(getTranslation("labels.approvals"));
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
           self.addMessage (getTranslation("changeHousingRequest.addMessage"));
           self.changeHousingRequest(getTranslation("pages.changeHousingType"));
           self.notifyCreate(getTranslation("changeHousingRequest.notifyCreate"));           
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.placeholder(getTranslation("labels.placeHolder"));
           self.currentHousingType(getTranslation("changeHousingRequest.currentHousingType"));
           self.newHousingType(getTranslation("changeHousingRequest.newHousingType"));
           self.changeDate(getTranslation("changeHousingRequest.changeDate"));
           self.changeReason(getTranslation("changeHousingRequest.changeReason"));
           self.notifyValidation(getTranslation("changeHousingRequest.notifyValidation"));         
           self.serviceName(getTranslation("labels.serviceName"));
           self.notificationType(getTranslation("labels.notificationType"));
           self.employeeRole(getTranslation("labels.employeeRole"));
           self.columnArrayApproval([{"headerText" : self.serviceName(), "field" : "name"},
                                     {"headerText" : self.notificationType(), "field" : "type"},
                                     {"headerText" : self.employeeRole(), "field" : "status"}]);
         self.approvals(getTranslation("labels.approvals"));
         self.ok(getTranslation("others.ok"));
         self.viewApprovalsLbl(getTranslation("others.viewApprovals"));           
        }//added
             self.label = {text: self.progressValue(), style: {color:'white'}};       
             self.thresholdValues = [{max: 33}, {max: 67}, {}];
            
        }
        return new createChangeHousingType ();
    });