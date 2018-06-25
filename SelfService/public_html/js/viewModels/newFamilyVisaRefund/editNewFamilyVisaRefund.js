define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'knockout-postbox', 'ojs/ojbutton','notifyjs', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], 
function (oj, ko, $, app, commonUtil, services,postbox) {

    function editFamilyVisaRefundModell() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
        self.grade = rootViewModel.personDetails().grade();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        self.editResubmitBtnVisible = ko.observable(false);
        //added
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


           self.familyVisaRefundModel = {
                id : ko.observable(),
                requestDate: ko.observable(),
                contractType: ko.observable(""),
                reqNationality: ko.observable(""),
                amount: ko.observable(""),
                remarks: ko.observable(""),
                personNumber : ko.observable(""),
                payPeriod: ko.observable(""),
                name:ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                commment:ko.observable(""),
                IS_DRAFT:ko.observable(""),
                managerId:ko.observable(""),
                personId:ko.observable(""),
                name:ko.observable(""),
                imageBase64:ko.observable("")
            };



        ko.postbox.subscribe("editFamilyVisaRefundObj", function (newValue) {
            console.log(newValue);
            self.familyVisaRefundModel.id(newValue.id);
            self.familyVisaRefundModel.requestDate(newValue.request_date);
            self.familyVisaRefundModel.contractType(newValue.contract_type);
            self.familyVisaRefundModel.reqNationality(newValue.requester_nationality);
            self.familyVisaRefundModel.amount(newValue.amount);
            self.familyVisaRefundModel.remarks(newValue.remarks);
            self.familyVisaRefundModel.personNumber(newValue.person_number);
            self.familyVisaRefundModel.payPeriod(newValue.payment_period);
            self.familyVisaRefundModel.name(newValue.name);
            self.familyVisaRefundModel.imageBase64(newValue.attachment_base64);
            self.familyVisaRefundModel.commment(newValue.commment);  
            self.familyVisaRefundModel.managerId(newValue.managerId);
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
            var preview = document.querySelector('.attClass');
            preview.src = self.familyVisaRefundModel.imageBase64();

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

            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            
             var preview = document.querySelector('.attClass');
             self.familyVisaRefundModel.imageBase64(preview.src);
             
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
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

                return self.familyVisaRefund();
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
            document.querySelector("#yesNoDialog").close();
        };


        this.cancelAction = function () {
          self.clickedButton("");
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryNewFamilyVisaRefund');
                }//added
        }

          //save draft
        this.draftButton = function () {
            self.familyVisaRefundModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function (data, event) {
            editFamilyVisaRefundRecord(event);
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
     self.commitRecord = function (data, event) {
            editFamilyVisaRefundRecord(event);
            return true;
        }//added
        function editFamilyVisaRefundRecord (event) {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                
                self.familyVisaRefundModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.familyVisaRefundModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.familyVisaRefundModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.familyVisaRefundModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
                
                var jsonData = ko.toJSON(self.familyVisaRefundModel);
                var editNewFamilyVisaRefundCbFn = function (data) {
                    $.notify(self.editMessage(), "success");
                     if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryNewFamilyVisaRefund');
                    }//added
                };
                services.editNewFamilyVisaRefund(jsonData).then(editNewFamilyVisaRefundCbFn, app.failCbFn);
                 }
        }

        function clearContent() {
                self.familyVisaRefundModel.requestDate("");
                self.familyVisaRefundModel.contractType("");
                self.familyVisaRefundModel.amount("");
                self.familyVisaRefundModel.remarks("");
                self.familyVisaRefundModel.reqNationality("");
                self.familyVisaRefundModel.payPeriod("");
                self.clickedButton("");
                self.familyVisaRefundModel.imageBase64("");
        }
        //language support =========================
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.newFamilyVisaRefund = ko.observable();
            self.contractType = ko.observable();
            self.requesterNationality = ko.observable();
            self.amount = ko.observable();
            self.comments = ko.observable();
            self.remarks = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create = ko.observable();
            self.review = ko.observable();
            self.familyVisaRefund = ko.observable();
            self.comment = ko.observable();
            self.editMessage = ko.observable();
            self.saveDraft = ko.observable();
            self.attachment = ko.observable();//added
             var getTranslation = oj.Translations.getTranslatedString;

             self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
           self.back(getTranslation("others.back"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.newFamilyVisaRefund(getTranslation("newFamilyVisaRefund.newFamilyVisaRefund"));
           self.contractType(getTranslation("newFamilyVisaRefund.contractType"));
           self.requesterNationality(getTranslation("newFamilyVisaRefund.requesterNationality"));
           self.amount(getTranslation("newFamilyVisaRefund.amount"));
           self.comments(getTranslation("newFamilyVisaRefund.comments"));
           self.remarks(getTranslation("newFamilyVisaRefund.remarks"));
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
           self.editMessage (getTranslation("newFamilyVisaRefund.editMessage"));  
           self.familyVisaRefund (getTranslation("newFamilyVisaRefund.familyVisaRefund"));
           self.editMessage (getTranslation("newFamilyVisaRefund.editMessage"));
           self.comment(getTranslation("others.comment"));
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.attachment(getTranslation("businessTrip.attachment"));//added
    }
    }

    return new editFamilyVisaRefundModell();
});