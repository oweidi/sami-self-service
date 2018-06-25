define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function StopAllowanceRequestViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        self.typeSelectedValue = ko.observable();
        self.countrySelectedValue = ko.observable();
        self.accomSelectedValue = ko.observable();
        self.transSelectedValue = ko.observable();
        self.foodSelectedValue = ko.observable();
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        self.isLastApprover = ko.observable(false); 
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.notiId = ko.observable();
        ko.postbox.subscribe("notiId", function (newValue) {

            if (newValue && newValue > 0) {
                self.notiId(newValue);
            }

        });
        self.disableSubmit = ko.observable(false);
        self.refresh = ko.observable(true);

        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        self.stopAllowanceRequestModel = {
            id : ko.observable(), requestDate : ko.observable(self.formatDate(new Date())), allowanceType : ko.observable(""), stoppingDate : ko.observable(""), reason : ko.observable(""), personNumber : ko.observable(""), rejctReason : ko.observable("")
        };

        var getStopAllowanceRequestByIdCbFn = function (data) {
            $.each(data.items, function (index, val) {
                self.stopAllowanceRequestModel.id(val.id);
                self.stopAllowanceRequestModel.requestDate(val.request_date);
                self.stopAllowanceRequestModel.reason(val.reason);
                self.stopAllowanceRequestModel.allowanceType(val.allowance_type);
                self.stopAllowanceRequestModel.stoppingDate(val.stopping_date);
                self.stopAllowanceRequestModel.personNumber(val.person_number);

            });

        };

        services.getStopAllowanceRequestById(rootViewModel.selectedTableRowKeyNotifiation()).then(getStopAllowanceRequestByIdCbFn, app.failCbFn);
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        var getApprove = function (data) {
            self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            if (self.isLastApprover()) {
                self.bankTransferAccModel.status("APPROVED")
                var jsonBody = jQuery.parseJSON(ko.toJSON(self.stopAllowanceRequestModel));
                jsonBody.trsId = transactionId;
                jsonBody.SSType = "STA";
                jsonBody.peopleGroup = "";
                var editStopAllowanceRequestCbFn = function (data) {
                    oj.Router.rootInstance.go('notifications');
                    $.notify("Approve", "success");
                };

                services.editStopAllowanceRequest(jsonBody).then(editStopAllowanceRequestCbFn, app.failCbFn);
                var submitElement = function (data1) {
                };
                services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
            }
            else {
                oj.Router.rootInstance.go('notifications');
                $.notify("Approve", "success");
            }
        };

        var getReject = function (data) {
            if (!self.stopAllowanceRequestModel.rejctReason()) {
                //                alert(self.stopAllowanceRequestModel.rejctReason());
                //                 $.notify(self.addReason(), "error");
                $.notify("error", "error");
                return;
            }
            oj.Router.rootInstance.go('notifications');
            $.notify(self.notifyReject(), "error");
            self.disableSubmit(true);
        };

        self.approveStopAllowanceRequest = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "New Stop Allowance", "MSG_BODY" : "New Stop Allowance Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED", "ssType" : "STA"
            };
            services.workflowAction(headers).then(getApprove, app.failCbFn);
            return true;
        }

        self.rejectStopAllowanceRequest = function () {

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "New Stop Allowance ", "MSG_BODY" : "New Stop Allowance Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED", "ssType" : "STA"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        this.submitButton = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            document.querySelector("#rejectDialog").close();
        };

        this.cancelBTDriver = function () {
            oj.Router.rootInstance.go('notifications');
            return true;
        }
        self.backAction = function () {
            var prevoisPage = oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1];
            if (prevoisPage == 'notifications' && rootViewModel.reviewNotiType() == 'FYI') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            if (oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
            }
            else {
                oj.Router.rootInstance.go('home');
            }
            return true;
        }
        self.handleActivated = function (info) {

            if (rootViewModel.personDetails().positionName() === 'Admin Assistant') {
                self.isVisible(false);
            }
            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);
                self.isVisible(true);

            }
        };
        self.handleAttached = function (info) {
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
            self.isLastApprover(rootViewModel.isLastApprover(transactionId, "BTA"));

            initTranslations();
            if (rootViewModel.personDetails().positionName() === 'Admin Assistant') {
                self.isDisabled(false);
            }
        };

        self.handleDetached = function (info) {
        };
        //trasnlation added
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.back = ko.observable();
        self.cancel = ko.observable();
        self.requestDate = ko.observable();
        self.allowanceType = ko.observable();
        self.reason = ko.observable();
        self.stoppingDate = ko.observable();
        self.approveMessage = ko.observable();
        self.rejectMessage = ko.observable();
        self.confirmMessage = ko.observable();
        self.reject = ko.observable();
        self.approve = ko.observable();
        self.addMessage = ko.observable();
        self.notifyApprove = ko.observable();
        self.notifyReject = ko.observable();
        self.reviewStopAllowance = ko.observable();
        self.addReason = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;
        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.back(getTranslation("others.back"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.stoppingDate(getTranslation("stopAllowance.stoppingDate"));
            self.rejectMessage(getTranslation("stopAllowance.rejectMessage"));
            self.approveMessage(getTranslation("stopAllowance.approveMessage"));
            self.reviewStopAllowance(getTranslation("stopAllowance.reviewStopAllowance"));
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.back(getTranslation("others.back"));
            self.cancel(getTranslation("others.cancel"));
            self.approve(getTranslation("others.approve"));
            self.reject(getTranslation("others.reject"));
            self.notifyApprove(getTranslation("stopAllowance.notifyApprove"));
            self.notifyReject(getTranslation("stopAllowance.notifyReject"));
        }

    }

    return StopAllowanceRequestViewModel;
});