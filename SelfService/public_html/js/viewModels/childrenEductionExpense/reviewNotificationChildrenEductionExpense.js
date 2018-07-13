define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function ChildrenEductionExpenseNotificationViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var position = rootViewModel.position();
        self.refresh = ko.observable(true);
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.disableSubmit = ko.observable(false);
        self.isRequired = ko.observable(false)
        self.isDisabled = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
         self.attachment_base64 = ko.observable("");
        self.isLastApprover = ko.observable(false);
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.childrenExpenseModel = {
            id : ko.observable(""), 
            requestDate : ko.observable(self.formatDate(new Date())),
            schoolYear : ko.observable(""), 
            amount : ko.observable(""),
            childrenNumber:ko.observable(""),
            comments:ko.observable(""),
            createdBy:   rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            managerId : ko.observable(""),
            personId : ko.observable(""),
            name  : ko.observable(""),
            IS_DRAFT:ko.observable(""),
            personName:ko.observable(""),
            imageBase64:ko.observable("")
        };
        
             var getChildrenEductionExpenseCbFn = function (data) {
            $.each(data.items, function (index, val) {
            console.log(val);
                    self.childrenExpenseModel.id(val.id);
                    self.childrenExpenseModel.requestDate(val.request_date);
                    self.childrenExpenseModel.schoolYear(val.school_year);
                    self.childrenExpenseModel.childrenNumber(val.children_number);
                    self.childrenExpenseModel.amount(val.amount);
                    self.childrenExpenseModel.comments(val.comments);
                    self.attachment_base64(val.attachment_base64);


            });
 
        };

        services.getChildrenEductionExpenseById(rootViewModel.selectedTableRowKeyNotifiation()).then(getChildrenEductionExpenseCbFn, app.failCbFn);
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        var getApprove = function (data) {
        console.log(data);
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {        
            if (self.isLastApprover()) {
                    var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
//                    self.childrenExpenseModel.paymentPeriod(self.childrenExpenseModel.paymentPeriod()[0]);
                    var jsonBody = jQuery.parseJSON(ko.toJSON(self.childrenExpenseModel));
                                    jsonBody.trsId = transactionId;
                                    jsonBody.SSType = "CEE";
                                    /*UPDATE STATUS AND FINAL APPROVED*/
                 var updateJson = {
                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.childrenExpenseModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                     "updateDate":new Date()
                };
                 /**/
                    var editChildrenEductionExpenseCbFn = function (data1) {
    
                    };
                    services.editChildrenEductionExpense(updateJson).then(editChildrenEductionExpenseCbFn, app.failCbFn);
                    var submitElement = function (data1) {
                    };
                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);

                              
    
                }
                oj.Router.rootInstance.go('notifications');
                $.notify(self.notifyApproved(), "success");
            }        
        };
        

        var getReject = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
                oj.Router.rootInstance.go('notifications');
                $.notify(self.notifyRejected(), "error");
            }
        };

        self.approveChildEductionExpense= function () {           
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            console.log(transactionId);
            self.disableSubmit(true);
            var headers = {
                "MSG_TITLE" : "New Child Eduction Expense Request", "MSG_BODY" : "New Child Eduction Expense Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "CEE"
            };
            console.log(headers);
            services.workflowAction(headers).then(getApprove, app.failCbFn);
            return true;
        }

        self.rejectBTripDriver = function () {
        if (!self.childrenExpenseModel.rejectRessone())
                {
                 $.notify(self.notifyRejected(), "error");
                  return;
                }
             self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Child Eduction Expense ", "MSG_BODY" : "Child Eduction Expense", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "CEE"
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
             if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
             
            
            return true;
        }

        self.handleActivated = function (info) {

            if (self.isLastApprover()) {
                self.isVisible(true);
                self.isRequired(true);
            }

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

            self.handleAttached = function (info) {
            initTranslations();
                    var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
                    self.isLastApprover(rootViewModel.isLastApprover(transactionId,"CEE"));
            var preview = document.querySelector('.attClass');
            preview.src = self.attachment_base64();


        };

        self.handleDetached = function (info) {
        };
        
        //language support =========================

            self.amount= ko.observable();
            self.schoolYear = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage = ko.observable();
            self.reviewEductionExpense = ko.observable();
            self.confirmMessage = ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable();
            self.comment= ko.observable();
            self.adminNotify= ko.observable();
            self.notifyApproved= ko.observable();
            self.rejectReason= ko.observable();
            self.notifyRejected= ko.observable();
            self.dependentAgeTr= ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();
            self.noOfChildren = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
                self.back(getTranslation("others.back"));
                self.requestDate(getTranslation("labels.requestDate"));
                self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
                self.amount(getTranslation("childrenEductionExpense.amount"));
                self.cancel(getTranslation("others.cancel"));
                self.yes(getTranslation("others.yes"));
                self.no(getTranslation("others.no"));
                self.confirmMessage(getTranslation("labels.confirmMessage"));
                self.approveMessage (getTranslation("childrenEductionExpense.approveMessage"));
                self.rejectMessage (getTranslation("childrenEductionExpense.rejectMessage"));
                self.reviewEductionExpense(getTranslation("childrenEductionExpense.reviewEductionExpense"));
                self.approve(getTranslation("others.approve"));
                self.reject(getTranslation("others.reject"));
                self.comment(getTranslation("others.comment"));
                self.adminNotify(getTranslation("labels.adminNotify"));
                self.notifyApproved(getTranslation("childrenEductionExpense.notifyApproved"));
                self.notifyRejected(getTranslation("childrenEductionExpense.notifyRejected"));
                self.rejectReason(getTranslation("labels.rejectReason"));
                self.attachment(getTranslation("businessTrip.attachment"));
                self.attachmentNotify(getTranslation("others.attachmentNotify"));
                self.noOfChildren(getTranslation("childrenEductionExpense.noOfChildren"));//added

    }

    }

    return ChildrenEductionExpenseNotificationViewModel;
});