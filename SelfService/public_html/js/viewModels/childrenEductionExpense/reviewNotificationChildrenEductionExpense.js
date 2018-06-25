define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function ChildrenEductionExpenseNotificationViewModel() {
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
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var position = rootViewModel.position();
        self.refresh = ko.observable(true);
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.disableSubmit = ko.observable(false);
        self.isRequired = ko.observable(false)
        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.periodName = ko.observable();
        self.periodFiltered  = ko.observable();
        self.isLastApprover = ko.observable(false);
        this.payPeriods= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":''
            }]);
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

              self.childrenExpenseModel = {
                    requestDate : ko.observable(self.formatDate(new Date())),
                    id:ko.observable(),
                    semesterFrom : ko.observable(""),
                    semesterTo : ko.observable(""),
                    schoolYear : ko.observable(""), 
                    semesterNumber : ko.observable(""),
                    dependentName1 : ko.observable(""),
                    dependentName2 : ko.observable(""),
                    dependentName3 : ko.observable(""),
                    dependentName4 : ko.observable(""),
                    dependentName5 : ko.observable(""),
                    amount1 : ko.observable(""),
                    amount2 : ko.observable(""),
                    amount3 : ko.observable(""),
                    amount4 : ko.observable(""),
                    amount5 : ko.observable(""),
                    paymentPeriod : ko.observable(""),
                    amountNumber : ko.observable(""),
                    personNumber : ko.observable(""),
                    dependentAge : ko.observable(""),
                    comment :ko.observable(""),
                    rejectRessone: ko.observable(""),
                    amount: ko.observable("")
        };

self.childrenExpenseModel.paymentPeriod.subscribe(function (newValue) {
            if (newValue) {
            var selectedValue;
           
                for (var i = 0;i < self.payPeriods().length;i += 1) {
                    var data = self.payPeriods()[i];
                    if (data.value === newValue.toString()) {
                        selectedValue = data.label;
                    }
                }
                
               

            }

        });
        
             var getChildrenEductionExpenseCbFn = function (data) {
            $.each(data.items, function (index, val) {
                        self.childrenExpenseModel.id(val.id);
                        self.childrenExpenseModel.requestDate(val.request_date);
                        self.childrenExpenseModel.semesterFrom(val.semester_from);
                        self.childrenExpenseModel.semesterTo(val.semester_to);
                        self.childrenExpenseModel.schoolYear(val.school_year);
                        self.childrenExpenseModel.semesterNumber(val.semester_number);
                        self.childrenExpenseModel.dependentName1(val.dependent_name_1);
                        self.childrenExpenseModel.dependentName2(val.dependent_name_2);
                        self.childrenExpenseModel.dependentName3(val.dependent_name_3);
                        self.childrenExpenseModel.dependentName4(val.dependent_name_4);
                        self.childrenExpenseModel.dependentName5(val.dependent_name_5);
                        self.childrenExpenseModel.amount1(val.amount_1);
                        self.childrenExpenseModel.amount2(val.amount_2);
                        self.childrenExpenseModel.amount3(val.amount_3);
                        self.childrenExpenseModel.amount4(val.amount_4);
                        self.childrenExpenseModel.amount5(val.amount_5);
                        self.childrenExpenseModel.amount5(val.AMOUNT_NUMBER);
                        self.childrenExpenseModel.paymentPeriod(val.payment_period);
                        self.childrenExpenseModel.personNumber(val.person_number);
                        self.childrenExpenseModel.comment (val.commment);
                        self.childrenExpenseModel.dependentAge(val.dependent_age);
                        var amount1 =parseInt(val.amount_1);
                        var amount2 =parseInt(val.amount_2);
                        var amount3 =parseInt(val.amount_3);
                        var amount4 =parseInt(val.amount_4);
                        var amount5 =parseInt(val.amount_5);
                        var amount = amount1 + amount2 + amount3 + amount4 + amount5;                        
                        self.childrenExpenseModel.amount(amount);

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
              var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            self.disableSubmit(true);
            var headers = {
                "MSG_TITLE" : "New Child Eduction Expense Request", "MSG_BODY" : "New Child Eduction Expense Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "CEE"
            };
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

//            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
//                self.isDisabled(false);
//                 services.gePayPeriodReport(self.personNumber()).then(function (data) {
//                parser = new DOMParser();
//                xmlDOC = parser.parseFromString(data, "text/xml");
//                $xml = $(xmlDOC);
//                var documents = $xml.find('DATA_DS');
//                self.payPeriods([]);
//                documents.children('G_1').each(function () {
//                    var periodId = $(this).find('TIME_PERIOD_ID').text();
//                    var periodName = $(this).find('PERIOD_NAME').text();
//                    var fields = periodName.split(' ');
//                    var month = fields[0];
//                    var year = fields[1];
//                     if (month.length < 2){
//                        month= '0' + month;
//                     }
//                    var monthYear=year+''+month;
//                     self.payPeriods.push({
//                        "value": periodId,
//                        "label": periodName,
//                        "month":month,
//                        "year" :year,
//                        "monthYear":monthYear
//                        
//                     });
//                    });
//                  self.payPeriods.sort(function (left, right) { return left.monthYear == right.monthYear ? 0 : (left.monthYear < right.monthYear ? -1 : 1) })  
//            },
//            app.failCbFn);
//            
//            }
        };

        self.handleDetached = function (info) {
        };
        
        //language support =========================

            self.amount1 = ko.observable();
            self.name1 = ko.observable();
            self.amount2 = ko.observable();
            self.amount3 = ko.observable();
            self.amount4 = ko.observable();
            self.amount5 = ko.observable();
            self.name2 = ko.observable();
            self.name3 = ko.observable();
            self.name4 = ko.observable();
            self.name5 = ko.observable();
            self.semesterFrom = ko.observable();
            self.semesterTo = ko.observable();
            self.schoolYear = ko.observable();
            self.semesterNum = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.back = ko.observable();
            self.paymentPeriod = ko.observable();
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
            var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
                self.paymentPeriod(getTranslation("labels.paymentperiod"));
                self.back(getTranslation("others.back"));
                self.requestDate(getTranslation("labels.requestDate"));
                self.semesterFrom(getTranslation("childrenEductionExpense.semesterFrom"));
                self.semesterTo(getTranslation("childrenEductionExpense.semesterTo"));
                self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
                self.semesterNum(getTranslation("childrenEductionExpense.semesterNum"));
                self.name1(getTranslation("childrenEductionExpense.name1"));
                self.amount1(getTranslation("childrenEductionExpense.amount1"));
                self.name2(getTranslation("childrenEductionExpense.name2"));
                self.name3(getTranslation("childrenEductionExpense.name3"));
                self.name4(getTranslation("childrenEductionExpense.name4"));
                self.name5(getTranslation("childrenEductionExpense.name5"));
                self.amount1(getTranslation("childrenEductionExpense.amount1"));
                self.amount2(getTranslation("childrenEductionExpense.amount2"));
                self.amount3(getTranslation("childrenEductionExpense.amount3"));
                self.amount4(getTranslation("childrenEductionExpense.amount4"));
                self.amount5(getTranslation("childrenEductionExpense.amount5"));
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
                self.dependentAgeTr(getTranslation("childrenEductionExpense.dependentAge")); 
                self.adminNotify(getTranslation("labels.adminNotify"));
                self.notifyApproved(getTranslation("childrenEductionExpense.notifyApproved"));
                self.notifyRejected(getTranslation("childrenEductionExpense.notifyRejected"));
                self.rejectReason(getTranslation("labels.rejectReason"));
    }

    }

    return ChildrenEductionExpenseNotificationViewModel;
});