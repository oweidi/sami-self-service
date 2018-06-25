define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewEmployeeMedicalInsurance() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();

        self.tracker = ko.observable();
        self.clickedButton = ko.observable("");
        self.disableSubmit = ko.observable(false);

        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.refresh = ko.observable(true);

        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.payPeriodValue = ko.observable();
        self.tracker = ko.observable();
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());

        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.employeeMedicalInsuranceModel = {
            id : ko.observable(""), rejectRessone : ko.observable(""), requestDate : ko.observable(""), requestType : ko.observable(""), reason : ko.observable(""), otherReasons : ko.observable(""), dependent_1_details : ko.observable(""), dependent_2_details : ko.observable(""), dependent_3_details : ko.observable(""), dependent_4_details : ko.observable(""), dependent_5_details : ko.observable(""), employeeGrade : ko.observable(""), IdIqamaNumber : ko.observable(""), employeBirthDate : ko.observable(""), remarks : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : ko.observable(""), creationDate : ko.observable(""), personNumber : ko.observable(""), personId : ko.observable(""), managerId : ko.observable(""), IS_DRAFT : ko.observable(""), updatedBy : ko.observable(""), updateDate : ko.observable("")
        };

        self.rejectEmployeeMedicalInsurance = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                if (!self.employeeMedicalInsuranceModel.rejectRessone()) {
                    $.notify(self.addReason(), "error");
                    return;
                }
                self.disableSubmit(true);
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Employee Medical Insurance", "MSG_BODY" : "Employee Medical Insurance Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED", "ssType" : "MICR"
                };
                services.workflowAction(headers).then(getReject, app.failCbFn);
            }
            return true;
        }

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.approveEmployeeMedicalInsurance = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Employee Medical Insurance", "MSG_BODY" : "Employee Medical Insurance Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED", "ssType" : "MICR"
                };
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self.isLastApprover = ko.observable(false);

        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                oj.Router.rootInstance.go('notifications');
                $.notify(self.adminNotify(), "error");

            }
            else {
                if (self.isLastApprover()) {
                   var updaeJson = {
                        "status" : "APPROVED", "finalApproved" : "Y",
                        "id" : self.employeeMedicalInsuranceModel.id(),
                        "updatedBy" : rootViewModel.personDetails().personNumber(),
                        "updateDate" : new Date()
                    };
                    var editEmployeeMedicalInsuranceCbFn = function (data1) {
                        oj.Router.rootInstance.go('notifications');

                    };
                    services.editEmployeeMedicalInsurance(JSON.stringify(updaeJson)).then(editEmployeeMedicalInsuranceCbFn, app.failCbFn);
                }
                else {
                    oj.Router.rootInstance.go('notifications');
                    $.notify("Approve", "success");
                }
            }
        };

        var getReject = function (data) {
            if (data.STATUS != 'Success') {
                oj.Router.rootInstance.go('notifications');
                $.notify(self.adminNotify(), "error");

            }
            else {
                if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                    var updaeJson = {
                        "status" : "REJECTED", "finalApproved" : "Y", "id" : self.employeeMedicalInsuranceModel.id(), "updatedBy" : rootViewModel.personDetails().personNumber(), "updateDate" : new Date()
                    };
                    services.editEmployeeMedicalInsurance(JSON.stringify(updaeJson)).then(editEmployeeMedicalInsuranceCbFn, app.failCbFn);

                    $.notify(self.notifyReject(), "error");
                }
            }
        };

        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            self.clickedButton("");
            document.querySelector("#rejectDialog").close();
        };

        this.cancelAdvHousing = function () {
            oj.Router.rootInstance.go('notifications');
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
            self.isLastApprover(rootViewModel.isLastApprover(transactionId, "MICR"));

            services.getEmployeeMedicalInsuranceById(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeMedicalInsuranceCbFn, app.failCbFn);
            initTranslations();
        };
        var getEmployeeMedicalInsuranceCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.employeeMedicalInsuranceModel.id(newValue.id);
                self.employeeMedicalInsuranceModel.requestDate(newValue.request_date);
                self.employeeMedicalInsuranceModel.requestType(newValue.request_type);
                self.employeeMedicalInsuranceModel.reason(newValue.reason);
                self.employeeMedicalInsuranceModel.otherReasons(newValue.other_reasons);
                self.employeeMedicalInsuranceModel.dependent_1_details(newValue.dependent_1_details);
                self.employeeMedicalInsuranceModel.dependent_2_details(newValue.dependent_2_details);
                self.employeeMedicalInsuranceModel.dependent_3_details(newValue.dependent_3_details);
                self.employeeMedicalInsuranceModel.dependent_4_details(newValue.dependent_4_details);
                self.employeeMedicalInsuranceModel.dependent_5_details(newValue.dependent_5_details);
                self.employeeMedicalInsuranceModel.employeeGrade(newValue.employee_grade);
                self.employeeMedicalInsuranceModel.IdIqamaNumber(newValue.id_iqama_number);
                self.employeeMedicalInsuranceModel.employeBirthDate(newValue.employee_birth_date);
                self.employeeMedicalInsuranceModel.remarks(newValue.remarks);
                self.employeeMedicalInsuranceModel.personNumber(newValue.person_number);
                self.employeeMedicalInsuranceModel.personId(newValue.personId);
                self.employeeMedicalInsuranceModel.name(newValue.name);
                self.employeeMedicalInsuranceModel.status(newValue.status);
                self.employeeMedicalInsuranceModel.managerId(newValue.managerId);
            });

        };

        self.handleDetached = function (info) {
        };
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
        self.back = ko.observable();
        self.confirmMessage = ko.observable();
        self.approveMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.identificationLetters = ko.observable();
        self.reject = ko.observable();
        self.approve = ko.observable();
        self.cancel = ko.observable();
        self.rejectMessage = ko.observable();
        self.reviewEmployeeMedicalInsurance = ko.observable();
        self.adminNotify = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.rejectReason = ko.observable();
        self.addReason = ko.observable();
        self.notifyApproved = ko.observable();
        self.notifyReject = ko.observable();

        self.employeeMedicalInsuranceLabels = ko.observable();
        self.requestType = ko.observable();
        self.reason = ko.observable();
        self.otherReasons = ko.observable();
        self.dependent_1_details = ko.observable();
        self.dependent_2_details = ko.observable();
        self.dependent_3_details = ko.observable();
        self.dependent_4_details = ko.observable();
        self.dependent_5_details = ko.observable();
        self.employeeGrade = ko.observable();
        self.IdIqamaNumber = ko.observable();
        self.employeBirthDate = ko.observable();
        self.remarks = ko.observable();

        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.reviewEmployeeMedicalInsurance(getTranslation("employeeMedicalInsurance.reviewLabel"));
            self.requestType(getTranslation("employeeMedicalInsurance.requestType"));
            self.reason(getTranslation("employeeMedicalInsurance.reason"));
            self.otherReasons(getTranslation("employeeMedicalInsurance.otherReason"));
            self.dependent_1_details(getTranslation("employeeMedicalInsurance.dependent_1_details"));
            self.dependent_2_details(getTranslation("employeeMedicalInsurance.dependent_2_details"));
            self.dependent_3_details(getTranslation("employeeMedicalInsurance.dependent_3_details"));
            self.dependent_4_details(getTranslation("employeeMedicalInsurance.dependent_4_details"));
            self.dependent_5_details(getTranslation("employeeMedicalInsurance.dependent_5_details"));
            self.employeeGrade(getTranslation("employeeMedicalInsurance.employeeGrade"));
            self.IdIqamaNumber(getTranslation("employeeMedicalInsurance.idIqamaNumber"));
            self.employeBirthDate(getTranslation("employeeMedicalInsurance.employeeBirthDate"));
            self.remarks(getTranslation("employeeMedicalInsurance.remarks"));

            self.approve(getTranslation("others.approve"));
            self.reject(getTranslation("others.reject"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.ok(getTranslation("others.ok"));
            self.back(getTranslation("others.back"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.submit(getTranslation("others.submit"));
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.approveMessage(getTranslation("identificationLetters.approveMessage"));
            self.rejectMessage(getTranslation("identificationLetters.rejectMessage"));

            self.arabicName(getTranslation("identificationLetters.arabicName"));
            self.englishName(getTranslation("identificationLetters.englishName"));
            self.profession(getTranslation("identificationLetters.profession"));
            self.requestReason(getTranslation("identificationLetters.requestReason"));
            self.directTo(getTranslation("identificationLetters.directTo"));
            self.withSalary(getTranslation("identificationLetters.withSalary"));
            self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            self.mailType(getTranslation("identificationLetters.mailType"));
            self.identificationLetters(getTranslation("pages.identificationLetters"));
            self.adminNotify(getTranslation("labels.adminNotify"));
            self.stamped(getTranslation("identificationLetters.stamped"));
            self.comment(getTranslation("others.comment"));
            self.rejectReason(getTranslation("labels.rejectReason"));
            self.addReason(getTranslation("labels.addReason"));
            self.notifyApproved(getTranslation("identificationLetters.notifyApproved"));
            self.notifyReject(getTranslation("identificationLetters.notifyReject"));
        }
        //added
    }

    return reviewEmployeeMedicalInsurance;
});