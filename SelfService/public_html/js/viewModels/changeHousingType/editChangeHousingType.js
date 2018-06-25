define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services) {

    function editChangeHousingModel () {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.isDisabled2 = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.newEmployeeHousingType = ko.observableArray(rootViewModel.globalNewHousingTypeLov());
        self.clickedButton = ko.observable("");   
        this.specialistSummary = ko.observable("");
        self.editResubmitBtnVisible = ko.observable(false);//added
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

            self.changeHousingTypeModel = {
                id : ko.observable(),
                requestDate: ko.observable(),
                personNumber: ko.observable(),
                name: ko.observable(""),
                currentHousingType: ko.observable(""),
                newHousingType: ko.observable(""),
                changeReason: ko.observable(""),
                changeDate: ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                personId :  ko.observable(""), 
                managerId : ko.observable(""), 
                IS_DRAFT:ko.observable(""),
                IS_LINE_MANAGER:ko.observable("")
            };

        ko.postbox.subscribe("editChangeHousingTypeObj", function (newValue) {
            self.changeHousingTypeModel.id(newValue.id);
            self.changeHousingTypeModel.requestDate(newValue.request_date);
            self.changeHousingTypeModel.newHousingType(newValue.new_housing_type);
            self.changeHousingTypeModel.changeReason(newValue.change_reason);   
            self.changeHousingTypeModel.changeDate(newValue.change_date);
            self.changeHousingTypeModel.currentHousingType(newValue.current_housing_type);  
            self.changeHousingTypeModel.personNumber(newValue.person_number);
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

        self.handleAttached = function (info) {
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

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        this.nextStep = function () {
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
            return self.changeHousingRequest();
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
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
            
             //save draft
        this.draftButton = function () {
            self.changeHousingTypeModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editChangeHousingTypeModel();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function (data, event) {
            editChangeHousingTypeModel();
            return true;
        }//added
        this.cancelAction = function () {
            self.clickedButton("");
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChangeHousingType');
                }//added
        }

        function editChangeHousingTypeModel () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                
                self.changeHousingTypeModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.changeHousingTypeModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.changeHousingTypeModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());                        
                self.changeHousingTypeModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());    
                
                var jsonData = ko.toJSON(self.changeHousingTypeModel);
                var editChangeHousingCbFn = function (data) {
                    $.notify(self.notifyEdit(), "success");
                   if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryChangeHousingType');
                    }//added
                };
                services.editChangeHousingType(jsonData).then(editChangeHousingCbFn, app.failCbFn);
            }
        }
           /*Check For Line Manager*/
        if (self.changeHousingTypeModel.managerId !=null) {
                self.changeHousingTypeModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.changeHousingTypeModel.IS_LINE_MANAGER("NO");
            }

        function clearContent() {
            self.clickedButton("");
            self.changeHousingTypeModel.currentHousingType("");
            self.changeHousingTypeModel.newHousingType("");
            self.changeHousingTypeModel.changeReason("");
            self.changeHousingTypeModel.changeDate("");
        }
       //language support =========================
            self.ok = ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.newBusinessTripDriverRequests=ko.observable();
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.startdate=ko.observable();
            self.requestDate=ko.observable();
            self.enddate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.changeHousingRequest = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.notifyEdit= ko.observable();
            self.placeholder = ko.observable();
            self.saveDraft = ko.observable();
            self.currentHousingType = ko.observable();
            self.newHousingType = ko.observable();
            self.changeDate = ko.observable();
            self.changeReason = ko.observable();
            self.notifyValidation = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.ok(getTranslation("others.ok"));
           self.startdate(getTranslation("labels.startdate"));
           self.enddate(getTranslation("labels.enddate"));
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
           self.editMessage (getTranslation("changeHousingRequest.editMessage"));
           self.changeHousingRequest(getTranslation("pages.changeHousingType"));
           self.notifyEdit(getTranslation("changeHousingRequest.notifyEdit"));          
           self.placeholder(getTranslation("labels.placeholder"));
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.currentHousingType(getTranslation("changeHousingRequest.currentHousingType"));
           self.newHousingType(getTranslation("changeHousingRequest.newHousingType"));
           self.changeDate(getTranslation("changeHousingRequest.changeDate"));
           self.changeReason(getTranslation("changeHousingRequest.changeReason"));
           self.notifyValidation(getTranslation("changeHousingRequest.notifyValidation"));
           self.saveDraft(getTranslation("labels.saveDraft"));
        }//added
            
    }

    return new editChangeHousingModel ();
});