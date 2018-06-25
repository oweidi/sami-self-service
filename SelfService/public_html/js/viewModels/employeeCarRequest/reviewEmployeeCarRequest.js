define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewIdentificationLettersModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        var employee_person_number = '';
        self.tracker = ko.observable();
        self.clickedButton = ko.observable("");
        self.disableSubmit = ko.observable(false);

        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var position = rootViewModel.personDetails().positionName();
        self.refresh = ko.observable(true);
        self.isLastApprover = ko.observable(false);

        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.payPeriodValue = ko.observable();
        self.tracker = ko.observable();
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.insideOutsideUseList = ko.observableArray(rootViewModel.globalCarInsideLov());
        self.receiveLocationList = ko.observableArray(rootViewModel.globalReceiveLocationLov());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
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

        self.employeeCarRequestModel = {
            id : ko.observable(""), requestDate : ko.observable(""), reason : ko.observable(""), 
            receiveDate : ko.observable(""), returnDate : ko.observable(""), receiveLocation : ko.observable(""),
            insideOutsideUse : ko.observable(""), remarks : ko.observable(""), personNumber : ko.observable(""), 
            rejectRessone : ko.observable(""), name : ko.observable("")
        };

        self.handleAttached = function (info) {
            services.getEmployeeCarRequestbyId(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeCarRequestCbFn, app.failCbFn);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
            self.isLastApprover(rootViewModel.isLastApprover(transactionId, "CRR"));
            initTranslations();
        };
        var getEmployeeCarRequestCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.employeeCarRequestModel.id(newValue.id);
                self.employeeCarRequestModel.requestDate(newValue.request_date);
                self.employeeCarRequestModel.reason(newValue.reason);
                self.employeeCarRequestModel.receiveDate(newValue.receive_date);
                self.employeeCarRequestModel.returnDate(newValue.return_date);
                self.employeeCarRequestModel.receiveLocation(newValue.receive_location);
                self.employeeCarRequestModel.insideOutsideUse(newValue.inside_outside_use);
                self.employeeCarRequestModel.remarks(newValue.remarks);
                self.employeeCarRequestModel.personNumber(newValue.person_number);
                self.employeeCarRequestModel.name(newValue.name);

            });

        };

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.rejectCarRequest = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                if (!self.employeeCarRequestModel.rejectRessone()) {
                    $.notify(self.addReason(), "error");
                    return;
                }
                self.disableSubmit(true);
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "EMPLOYEE CAR REQUEST", "MSG_BODY" : "Request EMPLOYEE CAR Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED", "ssType" : "XECR"
                };
                services.workflowAction(headers).then(getReject, app.failCbFn);
            }
            return true;
        }

        self.approveCarRequest = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Request EMPLOYEE CAR REQUEST for", "MSG_BODY" : "Request EMPLOYEE CAR Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED", "ssType" : "XECR"
                };
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }

        var getApprove = function (data) {
            if (self.isLastApprover()) {
                self.employeeCarRequestModel.status("APPROVED")
                var jsonData = ko.toJSON(self.employeeCarRequestModel);
                var editEmployeeCarRequestCbFn = function (data) {
                    oj.Router.rootInstance.go('notifications');
                    $.notify("Approve", "success");
                };
                services.editEmployeeCarRequest(jsonData).then(editEmployeeCarRequestCbFn, app.failCbFn);
            }
            else {
                oj.Router.rootInstance.go('notifications');
                $.notify("Approve", "success");
            }

            oj.Router.rootInstance.go('notifications');

        };
        var editEmployeeCarRequestCbFn = function (data1) {
            oj.Router.rootInstance.go('notifications');

        };

        var getReject = function (data) {
                        if (data.STATUS != 'Success') {
                            oj.Router.rootInstance.go('notifications');
                            $.notify(self.adminNotify(), "error");
            
                        }
                        else {
                            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                                var updaeJson = {
                                    "status" : "REJECTED", "finalApproved" : "Y", "id" : self.employeeCarRequestModel.id(), "updatedBy" : rootViewModel.personDetails().personNumber(), "updateDate" : new Date()
                                };
                                services.editEmployeeCarRequest(JSON.stringify(updaeJson)).then(editEmployeeCarRequestCbFn, app.failCbFn);
            
                                $.notify(self.notifyReject(), "error");
                            }
                        }
        };

        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };
        this.cancelButton = function () {
            oj.Router.rootInstance.go('notifications');
            return true;
        }
        this.aCancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        this.rCancelButton = function () {
            self.clickedButton("");
            document.querySelector("#rejectDialog").close();
        };

        self.handleActivated = function (info) {
            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);
            }
        };

        self.handleDetached = function (info) {
            rootViewModel.selectedTableRowKeyNotifiation("");
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
        self.reviewIdentificationLetters = ko.observable();
        self.adminNotify = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.rejectReason = ko.observable();
        self.addReason = ko.observable();
        self.notifyApproved = ko.observable();
        self.notifyReject = ko.observable();

        self.reason = ko.observable();
        self.receiveDate = ko.observable();
        self.returnDate = ko.observable();
        self.receiveLocation = ko.observable();
        self.insideOutsideUse = ko.observable();
        self.remarks = ko.observable();
        self.placeholder = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
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
            self.reviewIdentificationLetters(getTranslation("identificationLetters.reviewIdentificationLetters"));
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

            self.reason(getTranslation("labels.reason"));
            self.receiveDate(getTranslation("labels.receiveDate"));
            self.returnDate(getTranslation("labels.returnDate"));
            self.receiveLocation(getTranslation("labels.receiveLocation"));
            self.insideOutsideUse(getTranslation("labels.insideOutsideUse"));
            self.remarks(getTranslation("labels.remarks"));
        }
        //added
    }

    return reviewIdentificationLettersModel;
});