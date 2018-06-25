define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel', 'ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services) {

    function createIdentificationLetters() {
        var self = this;

        self.currentColor = ko.observable();

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
        self.currentDate = ko.observable(formatDate(new Date()));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        this.specialistSummary = ko.observable("");//added
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.identificationLettersModel = {
            requestDate : self.currentDate(), arabicEnglish : ko.observable(""), arabicName : ko.observable(""), englishName : ko.observable(""), iqamaProfession : ko.observable(""), personNumber : ko.observable(), mailType : ko.observable(""), name : ko.observable(""), directedTo : ko.observable(""), withSalary : ko.observable(""), reason : ko.observable(""), createdBy : rootViewModel.personDetails().personNumber(), creationDate : ko.observable(new Date()), personId : ko.observable(""), stamped : ko.observable(""), positionName : ko.observable(""), commment : ko.observable(""), IS_DRAFT : ko.observable("")
        };

        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
        };

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            //addded
            var personNumber = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber();
            self.identificationLettersModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.identificationLettersModel.englishName(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.identificationLettersModel.positionName(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().AssignmentName : rootViewModel.personDetails().positionName());
            self.identificationLettersModel.arabicName(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployeeName().ArabicName : rootViewModel.globalPersonFuseModel.arabicName());
            self.identificationLettersModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.identificationLettersModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            self.identificationLettersModel.iqamaProfession(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployeeName().Profession : rootViewModel.globalPersonFuseModel.profession());
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.identificationLettersModel, 11);
            },
            this);
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
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }

        this.validateStamped = function (event, data) {
            if (data.option == 'value' && data.value == 'No') {
                self.identificationLettersModel.mailType('EXPRESS')
                self.isDisabled2(true);
            }
            else {
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

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);
                self.isDisabled2(true);
            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
                self.isDisabled2(false);
            }

            return self.identificationLetters();
        };

        this.cancelAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryIdentificationLetter');
            }
            //added
        }

        function addIdentificationLetters() {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.identificationLettersModel.arabicEnglish(self.identificationLettersModel.arabicEnglish().toString());
                self.identificationLettersModel.mailType(self.identificationLettersModel.mailType().toString());
                self.identificationLettersModel.withSalary(self.identificationLettersModel.withSalary().toString());
                self.identificationLettersModel.stamped(self.identificationLettersModel.stamped().toString());
                self.identificationLettersModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                var jsonData = ko.toJSON(self.identificationLettersModel);
                var addIdentificationLetterFn = function (data1) {
                    $.notify(self.notifyCreate(), "success");
                    if (self.specialistSummary() == 'true') {
                        oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
                    }
                    else {
                        oj.Router.rootInstance.go('summaryIdentificationLetter');
                    }
                    //added
                };
                services.addIdentificationLetters(jsonData).then(addIdentificationLetterFn, app.failCbFn);
            }
        }

        this.submitButton = function () {
            self.identificationLettersModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            addIdentificationLetters(event);
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        //save draft
        this.submitDraft = function () {
            self.identificationLettersModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            addIdentificationLetters();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        /*function to clear table content after submit*/
        function clearContent() {
            self.identificationLettersModel.arabicEnglish("");
            //            self.identificationLettersModel.arabicName("");
            //            self.identificationLettersModel.englishName("");
            self.identificationLettersModel.mailType("");
            self.identificationLettersModel.withSalary("");
            self.identificationLettersModel.reason("");
            self.identificationLettersModel.stamped("");
            self.identificationLettersModel.directedTo("");
            self.clickedButton("");
            self.identificationLettersModel.commment("");
        }
        //language support =========================
        self.ok = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.newBusinessTripDriverRequests = ko.observable();
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.pervious = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.identificationLetters = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.notifyCreate = ko.observable();
        self.position = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.saveDraft = ko.observable();
        self.placeholder = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
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
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
            self.addMessage(getTranslation("identificationLetters.addMessage"));
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
            self.notifyCreate(getTranslation("identificationLetters.notifyCreate"));
            self.position(getTranslation("common.position"));
            self.stamped(getTranslation("identificationLetters.stamped"));
            self.comment(getTranslation("others.comment"));
            self.saveDraft(getTranslation("labels.saveDraft"));
            self.placeholder(getTranslation("labels.placeHolder"));
        }
        //added
        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };
        self.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];

    }
    return new createIdentificationLetters();
});