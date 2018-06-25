define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewPenaltiesModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        var employee_person_number = '';
        self.tracker = ko.observable();
        self.clickedButton = ko.observable("");
        self.disableSubmit = ko.observable(false);
        self.isLastApprover = ko.observable(false);
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var searchUDTArray = rootViewModel.globalUDTLookup();
        self.suggestedActionList = ko.observableArray();
        var position = rootViewModel.personDetails().positionName();
        self.refresh = ko.observable(true);

        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.payPeriodValue = ko.observable();
        self.tracker = ko.observable();
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.insideOutsideUseList = ko.observableArray(rootViewModel.globalCarInsideLov());
        self.receiveLocationList = ko.observableArray(rootViewModel.globalReceiveLocationLov());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.penalitesModel = {
            id : ko.observable(""), penaltieslabel : ko.observable(""), offenceDate : ko.observable(""), invistigationDate : ko.observable(""), violationType : ko.observable(), absenceDateFrom : ko.observable(""), absenceDateTo : ko.observable(""), occurrance : ko.observable(""), suggestedAction : ko.observable(""), deductionHours : ko.observable(""), deductionDays : ko.observable(""), rejectRessone : ko.observable(""), deductionBasicSalaryPercentage : ko.observable(""), imageBase64 : ko.observable(""), requestDate : ko.observable(""), managerId : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : ko.observable(""), personNumber : ko.observable(""), imageBase64 : ko.observable(""), personId : ko.observable(""), trsId : ko.observable(""), SSType : ko.observable("PLN"), rejectRessone : ko.observable("")
        };
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
        console.log(rootViewModel.personDetails().personId());

        var getPenaltiesCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.suggestedActionList([]);
                for (var i = 0;i < searchUDTArray.length;i++) {
                    if (searchUDTArray[i].tableName === 'XXX_HR_ADMINISTRATIVE_INVESTIGATIONS') {
                        self.suggestedActionList.push( {
                            "value" : searchUDTArray[i].rowName.toString().substring(0, searchUDTArray[i].rowName.toString().indexOf('(')), "label" : searchUDTArray[i].rowName.toString().match(/\(([^)]+)\)/)[1], "actionValue" : searchUDTArray[i].value
                        });
                    }
                }
                self.penalitesModel.id(newValue.id);
                self.penalitesModel.requestDate(newValue.request_date);
                self.penalitesModel.personNumber(newValue.person_number);
                self.penalitesModel.name(newValue.name);
                self.penalitesModel.offenceDate(newValue.offence_date);
                self.penalitesModel.invistigationDate(newValue.investigation_date);
                self.penalitesModel.violationType(searchArray(newValue.violation_type, rootViewModel.globalViolationType()));
                self.penalitesModel.absenceDateFrom(newValue.absence_date_from);
                self.penalitesModel.absenceDateTo(newValue.absence_date_to);
                self.penalitesModel.occurrance(newValue.occurrance);
                self.penalitesModel.suggestedAction(newValue.suggested_action);
                self.penalitesModel.deductionHours(newValue.deduction_hours);
                self.penalitesModel.deductionDays(newValue.deduction_days);
                self.penalitesModel.deductionBasicSalaryPercentage(newValue.deduction_basic_salary_percent);
                self.penalitesModel.imageBase64(newValue.imageBase64);
                //trsId
                self.penalitesModel.trsId(newValue.id);
            });
        };

        self.handleAttached = function (info) {
            services.getPenaltiesById(rootViewModel.selectedTableRowKeyNotifiation()).then(getPenaltiesCbFn, app.failCbFn);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
            self.isLastApprover(rootViewModel.isLastApprover(transactionId, "PLN"));
            initTranslations();
        };

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.rejectPenaltiesRequest = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                if (!self.penalitesModel.rejectRessone()) {
                    $.notify(self.addReason(), "error");
                    return;
                }
                self.disableSubmit(true);
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Penalties", "MSG_BODY" : "Request Penalties", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED", "ssType" : "PLN"
                };
                services.workflowAction(headers).then(getReject, app.failCbFn);
            }
            return true;
        }

        self.approvePenaltiesRequest = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Penalties", "MSG_BODY" : "Request Penalties", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED", "ssType" : "PLN"
                };
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }

        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                oj.Router.rootInstance.go('notifications');
                $.notify(self.adminNotify(), "error");

            }
            else {
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                ///Labor - Skilled - Production Factory 1
                if (self.isLastApprover()) {

                    var jsonBody = ko.toJSON(self.penalitesModel);
                    var updaeJson = {
                        "status" : "APPROVED", "finalApproved" : "Y", "id" : rootViewModel.personDetails().personId(), "updatedBy" : rootViewModel.personDetails().personNumber(), "updateDate" : new Date()
                    };
                    //                    jsonBody.trsId = transactionId;
                    //                    jsonBody.SSType = "PD";
                    services.editPenalties(JSON.stringify(updaeJson)).then(editPenaltiesCbFn, app.failCbFn);
                    var submitElement = function (data1) {
                    };

                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);

                }
                //                $.notify(self.notifyApproved(), "success");
                oj.Router.rootInstance.go('notifications');
            }

        };
        var editPenaltiesCbFn = function (data1) {
        };

        var getReject = function (data) {
            if (data.STATUS != 'Success') {
                oj.Router.rootInstance.go('notifications');
                $.notify(self.adminNotify(), "error");

            }
            else {

                var updaeJson = {
                    "status" : "REJECTED", "id" : self.penalitesModel.id(), "updatedBy" : rootViewModel.personDetails().personNumber(), "updateDate" : new Date()
                };
                services.editPenalties(JSON.stringify(updaeJson)).then(editPenaltiesCbFn, app.failCbFn);
                $.notify(self.notifyReject(), "error");
                document.querySelector("#rejectDialog").close();
                oj.Router.rootInstance.go('notifications');
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
        self.nodays = ko.observable();
        self.pervious = ko.observable();
        self.next = ko.observable();
        self.back = ko.observable();
        self.confirmMessage = ko.observable();
        self.approveMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.reject = ko.observable();
        self.approve = ko.observable();
        self.cancel = ko.observable();
        self.rejectMessage = ko.observable();
        self.adminNotify = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.rejectReason = ko.observable();
        self.addReason = ko.observable();
        self.notifyApproved = ko.observable();
        self.notifyReject = ko.observable("فثيصضءصء");

        self.reason = ko.observable();
        self.receiveDate = ko.observable();
        self.returnDate = ko.observable();
        self.receiveLocation = ko.observable();
        self.insideOutsideUse = ko.observable();
        self.remarks = ko.observable();
        self.placeholder = ko.observable();
        self.penaltieslabel = ko.observable();
        self.offenceDate = ko.observable();
        self.invistigationDate = ko.observable();
        self.violationType = ko.observable();
        self.absenceDateFrom = ko.observable();
        self.absenceDateTo = ko.observable();
        self.occurance = ko.observable();
        self.suggestedAction = ko.observable();
        self.deductionHours = ko.observable();
        self.deductionDays = ko.observable();
        self.deductionBasicSalaryPercentage = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.penaltieslabel(getTranslation("penalties.penaltieslabel"));
            self.offenceDate(getTranslation("penalties.offenceDate"));
            self.invistigationDate(getTranslation("penalties.invistigationDate"));
            self.violationType(getTranslation("penalties.violationType"));
            self.absenceDateFrom(getTranslation("penalties.absenceDateFrom"));
            self.absenceDateTo(getTranslation("penalties.absenceDateTo"));
            self.occurance(getTranslation("penalties.occurrance"));
            self.suggestedAction(getTranslation("penalties.suggestedAction"));
            self.deductionHours(getTranslation("penalties.deductionHours"));
            self.deductionDays(getTranslation("penalties.deductionDays"));
            self.deductionBasicSalaryPercentage(getTranslation("penalties.deductionBasicSalaryPercentage"));
            self.approve(getTranslation("others.approve"));
            self.reject(getTranslation("others.reject"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.ok(getTranslation("others.ok"));
            self.cancel(getTranslation("others.cancel"));
            self.back(getTranslation("others.back"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.submit(getTranslation("others.submit"));
            self.confirmMessage(getTranslation("penalties.approveMessage"));
            self.adminNotify(getTranslation("labels.adminNotify"));
            self.comment(getTranslation("others.comment"));
            self.rejectReason(getTranslation("labels.rejectReason"));
            self.addReason(getTranslation("labels.addReason"));

            self.reason(getTranslation("labels.reason"));
            self.receiveDate(getTranslation("labels.receiveDate"));
            self.returnDate(getTranslation("labels.returnDate"));
            self.receiveLocation(getTranslation("labels.receiveLocation"));
            self.insideOutsideUse(getTranslation("labels.insideOutsideUse"));
            self.remarks(getTranslation("labels.remarks"));
            self.notifyReject(getTranslation("penalties.rejectNotify"));
        }
        //added
    }

    return reviewPenaltiesModel;
});