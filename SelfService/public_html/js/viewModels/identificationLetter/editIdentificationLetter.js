define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services) {

    function editIdentificationLetters () {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        self.grade = rootViewModel.personDetails().grade();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.isDisabled2 = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");   
        this.specialistSummary = ko.observable("");//added
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


            self.identificationLettersModel = {
                id : ko.observable(),
                requestDate: ko.observable(""),
                arabicEnglish:ko.observable(""),
                arabicName  : ko.observable(""),
                englishName:  ko.observable(""),
                iqamaProfession: ko.observable(""),
                personNumber: ko.observable(""),
                mailType: ko.observable(""),
                name:ko.observable(""),
                directedTo:ko.observable(""),
                withSalary: ko.observable(""),
                reason: ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                stamped: ko.observable(""),               
                positionName : ko.observable(""),
                commment:ko.observable(""),
                IS_DRAFT:ko.observable("")
            };



        ko.postbox.subscribe("editIdentificationLettersObj", function (newValue) {

            self.identificationLettersModel.id(newValue.id);
            self.identificationLettersModel.requestDate(newValue.request_date);
            self.identificationLettersModel.arabicEnglish(newValue.arabic_english_code);
            self.identificationLettersModel.arabicName(newValue.arabic_name);
            self.identificationLettersModel.englishName(newValue.english_name);
            self.identificationLettersModel.iqamaProfession(newValue.iqama_profession);
            self.identificationLettersModel.personNumber(newValue.person_number);
            self.identificationLettersModel.name(newValue.name);
            self.identificationLettersModel.directedTo(newValue.directed_to);
            self.identificationLettersModel.mailType(newValue.mail_type_code);
            self.identificationLettersModel.withSalary(newValue.with_salary_code);
            self.identificationLettersModel.reason(newValue.reason);          
            self.identificationLettersModel.stamped(newValue.stamped);          
            self.identificationLettersModel.positionName(newValue.positionName);
            self.identificationLettersModel.commment(newValue.commment);
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
        this.validateStamped = function (event, data) {        
            if (data.option == 'value' && data.value =='No'  ) {
             self.identificationLettersModel.mailType(rootViewModel.globalMailType()[0].label);
               self.isDisabled2(true);
            }   
            else{
                self.isDisabled2(false);
            }
        }
        this.nextStep = function () {

            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            var rs = document.getElementById('checkboxSetAgreeId');
                var rs2 = document.getElementById('checkboxSetAgreeId2');
                rs.validate();
                rs2.validate();
            if (!this._showComponentValidationErrors(trackerObj)) {
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
            return self.identificationLetters();
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
            self.identificationLettersModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editIdentificationLettersModel();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function (data, event) {
            editIdentificationLettersModel();
            return true;
        }//added
        this.cancelAction = function () {
            self.clickedButton("");
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryIdentificationLetter');
                }//added
        }

        function editIdentificationLettersModel () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.identificationLettersModel.arabicEnglish(self.identificationLettersModel.arabicEnglish().toString());    
                self.identificationLettersModel.mailType(self.identificationLettersModel.mailType().toString());
                self.identificationLettersModel.withSalary(self.identificationLettersModel.withSalary().toString());    
                self.identificationLettersModel.stamped(self.identificationLettersModel.stamped().toString());
                var jsonData = ko.toJSON(self.identificationLettersModel);
                var editIdentificationLettersCbFn = function (data) {
                    $.notify(self.notifyEdit(), "success");
                   if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryIdentificationLetter');
                    }//added
                };
                services.editIdentificationLetters(jsonData).then(editIdentificationLettersCbFn, app.failCbFn);
            }
        }

        function clearContent() {
            self.identificationLettersModel.arabicEnglish("");
//            self.identificationLettersModel.arabicName("");
//            self.identificationLettersModel.englishName("");
            self.identificationLettersModel.iqamaProfession("");
            self.identificationLettersModel.mailType("");
            self.identificationLettersModel.withSalary("");
            self.identificationLettersModel.reason("");
            self.identificationLettersModel.directedTo("");          
            self.identificationLettersModel.stamped("");
            self.clickedButton("");
        }
       //language support =========================
            self.ok = ko.observable();
            self.arabicName= ko.observable();
            self.englishName= ko.observable();
            self.profession= ko.observable();
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
            self.requestReason= ko.observable();
            self.directTo= ko.observable();
            self.withSalary= ko.observable();
            self.arabicEnglish= ko.observable();
            self.mailType= ko.observable();
            self.identificationLettersRefundRequests= ko.observable();
            self.nodays= ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.identificationLetters = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.notifyEdit= ko.observable();
            self.position = ko.observable();     
            self.stamped = ko.observable();
            self.comment = ko.observable();
            self.placeholder = ko.observable();
            self.saveDraft = ko.observable();
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
           self.nodays(getTranslation("labels.nodays"));
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
           self.editMessage (getTranslation("identificationLetters.editMessage"));
           self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.arabicName(getTranslation("identificationLetters.arabicName"));
    	   self.englishName(getTranslation("identificationLetters.englishName"));
           self.profession(getTranslation("identificationLetters.profession"));
           self.requestReason(getTranslation("identificationLetters.requestReason"));
           self.directTo(getTranslation("identificationLetters.directTo"));
           self.withSalary(getTranslation("identificationLetters.withSalary"));
           self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
           self.mailType(getTranslation("identificationLetters.mailType"));
           self.identificationLetters(getTranslation("pages.identificationLetters"));
           self.notifyEdit(getTranslation("identificationLetters.notifyEdit"));          
           self.position(getTranslation("common.position"));          
           self.stamped(getTranslation("identificationLetters.stamped"));
           self.comment(getTranslation("others.comment"));
           self.placeholder(getTranslation("labels.placeholder"));
           self.saveDraft(getTranslation("labels.saveDraft"));
        }//added
            
    }

    return new editIdentificationLetters ();
});