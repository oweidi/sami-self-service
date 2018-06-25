define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function ReviewADVHousingNotificationViewModel() {
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
        this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);
        self.months_remaining_contract = ko.observable();
        self.request_date = ko.observable();
        self.nr_of_month_desired = ko.observable();
        self.housing_amount = ko.observable();
        self.installment_amount = ko.observable();
        self.person_number = ko.observable();
        self.hire_date = ko.observable();
        self.request_date = ko.observable();
        self.reason = ko.observable();
        self.initial_amount = ko.observable();
        self.payment_period = ko.observable();
        self.first_installment_period = ko.observable();
        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.payPeriodValue = ko.observable();
        self.firstInstallementValue = ko.observable();
        self.periodName = ko.observable();
        self.periodFiltered  = ko.observable();
        self.clickedButton = ko.observable("");
        self.isLastApprover = ko.observable(false);
        this.payPeriods= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":'',
                 "startDate":''
            }]);
        this.firstInstallement= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":'',
                 "startDate":''
            }]);
       self.disableSubmit = ko.observable(false);

        self.formatDate = function (date) {
            //var date = new Date()
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.advHousingModel = {
            id : ko.observable(), 
            requestDate : ko.observable(self.formatDate(new Date())), 
            hireDate : ko.observable(rootViewModel.personDetails().hireDate()), 
            numbersOfMonthsDesired : ko.observable(""), 
            nrOfMonthRemInContract : ko.observable(""), 
            reason : ko.observable(""), 
            installmentAmount : ko.observable(""), 
            initialAmount : ko.observable(""), 
            paymentPeriod : ko.observable(""), 
            firstInstallmentPeriod : ko.observable(""), 
            housingAmount : ko.observable(""), 
            personNumber : ko.observable(""), 
            name : ko.observable("")

        };
               
        
        self.advHousingModel.paymentPeriod.subscribe(function (newValue) {
            if (newValue) {
            var selectedValue;
           
                for (var i = 0;i < self.payPeriods().length;i += 1) {
                    var data = self.payPeriods()[i];
                    if (data.value === newValue.toString()) {
                        selectedValue = data.label;
                    }
                }
                if(selectedValue){
                    var fields = selectedValue.split(' ');
                    var month = fields[0];
                    var year = fields[1];
                    self.firstInstallement([]);
                     $("#firstInst").ojSelect("option", "value",  self.firstInstallement());
                    self.firstInstallement(self.payPeriods().slice(0));
                    if (month.length < 2) {
                        month = '0' + month;
                    }
                    var monthYear = year + '' + month;
                    self.firstInstallement.remove(function (period) {
                        return (period.monthYear < monthYear);
                    });
                      self.advHousingModel.firstInstallmentPeriod(null); 
                }

            }

        });

        var getAdvHousingByIdCbFn = function (data) {
            $.each(data.items, function (index, val) {
                self.advHousingModel.requestDate(val.request_date);
                self.advHousingModel.hireDate(val.hire_date);
                self.advHousingModel.numbersOfMonthsDesired(val.nr_of_month_desired)
                self.advHousingModel.nrOfMonthRemInContract(val.months_remaining_contract);
                self.advHousingModel.housingAmount(val.housing_amount);
                self.advHousingModel.installmentAmount(val.installment_amount);
                self.advHousingModel.personNumber(val.person_number);
                self.advHousingModel.reason(val.reason);
                self.advHousingModel.initialAmount(val.initial_amount);
                self.advHousingModel.paymentPeriod(val.payment_period);
                self.advHousingModel.firstInstallmentPeriod(val.first_installment_period);
                self.advHousingModel.id(val.id);
                self.advHousingModel.name(val.name);
            });

        };

        services.getAdvHousingById(rootViewModel.selectedTableRowKeyNotifiation()).then(getAdvHousingByIdCbFn, app.failCbFn);

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
                //rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations'
                if (self.isLastApprover()) {
                    var jsonBody = jQuery.parseJSON(ko.toJSON(self.advHousingModel));
                    var updateJson = {
                        "paymentPeriod" : self.advHousingModel.paymentPeriod().toString(), 
                        "initialAmount" : self.advHousingModel.initialAmount(),
                        "firstInstallmentPeriod" : self.advHousingModel.firstInstallmentPeriod().toString(),
                        "id" : self.advHousingModel.id(), 
                        "updatedBy":rootViewModel.personDetails().personNumber(),
                        "updateDate":new Date(),
                        "status":"APPROVED"
                         
                    };
                    jsonBody.trsId = transactionId;
                    jsonBody.SSType = "AH";
                    jsonBody.payDate = searchArrayForDate(self.advHousingModel.paymentPeriod().toString(), self.payPeriods());
                    jsonBody.firstInsDate = searchArrayForDate(self.advHousingModel.firstInstallmentPeriod().toString(), self.payPeriods());
                    
                    services.editAdvHousing(JSON.stringify(updateJson)).then(editAdvHousingCbFn, app.failCbFn);
                    var submitElement = function (data1) {
                    };
                    
                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
    
                }
                oj.Router.rootInstance.go('notifications');
                $.notify(self.approveNotify(), "success");
            }
            

        };
        var editAdvHousingCbFn = function (data1) {
                    };
                    
        function searchArrayForDate(nameKey, searchArray) {
            for (var i = 0;i < searchArray.length;i++) {
                if (searchArray[i].value === nameKey) {
                    return searchArray[i].startDate;
                }
            }
        }
        var getReject = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
                    var updateJson = {
                        "id" : self.advHousingModel.id(), 
                        "status":"REJECTED",
                        "updatedBy":rootViewModel.personDetails().personNumber(),
                        "updateDate":new Date()
                         
                    };
                    services.editAdvHousing(JSON.stringify(updateJson)).then(editAdvHousingCbFn, app.failCbFn);
                oj.Router.rootInstance.go('notifications');
                $.notify(self.rejectNotify(), "error");
            }
        };

        self.approveAdvHousing = function () {
          if (self.clickedButton() != event.currentTarget.id) {
              self.disableSubmit(true);
            self.clickedButton(event.currentTarget.id);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Advanced Housing", "MSG_BODY" : "Advanced Housing Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "AH"
            };

            services.workflowAction(headers).then(getApprove, app.failCbFn);
          }
            return true;
        }

        self.rejectAdvHousing = function () {
        if (self.clickedButton() != event.currentTarget.id) {
            self.disableSubmit(true);
            self.clickedButton(event.currentTarget.id);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Advanced Housing", "MSG_BODY" : "Advanced Housing Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "AH"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
        }
            return true;
        }
        this.submitButton = function () {
          if (rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations') {
                    var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
          }
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
          var prevoisPage = oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1];
           if (prevoisPage == 'notifications' && rootViewModel.reviewNotiType() == 'FYI') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             } else {
                 oj.Router.rootInstance.go('home');
             }
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations') {
                self.isVisible(true);
            }

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
        var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
               self.isLastApprover(rootViewModel.isLastApprover(transactionId,"AH"));
            initTranslations();
            if (rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations') {
                self.isDisabled(false);
                 services.gePayPeriodReport(self.advHousingModel.personNumber()).then(function (data) {
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                self.payPeriods([]);
                documents.children('G_1').each(function () {
                    var periodId = $(this).find('TIME_PERIOD_ID').text();
                    var periodName = $(this).find('PERIOD_NAME').text();
                    var startDate = $(this).find('START_DATE').text();
                    var fields = periodName.split(' ');
                    var month = fields[0];
                    var year = fields[1];
                     if (month.length < 2){
                        month= '0' + month;
                     }
                    var monthYear=year+''+month;
                     self.payPeriods.push({
                        "value": periodId,
                        "label": periodName,
                        "month":month,
                        "year" :year,
                        "monthYear":monthYear,
                        "startDate":startDate
                        
                     });
                    });
                  self.payPeriods.sort(function (left, right) { return left.monthYear == right.monthYear ? 0 : (left.monthYear < right.monthYear ? -1 : 1) })  
            },
            app.failCbFn);

            }
        };

        self.handleDetached = function (info) {
        };
        //language support =========================

            self.next = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.monthsDesired= ko.observable();
            self.monthsRemaining= ko.observable();
            self.housingAmount= ko.observable();
            self.reason= ko.observable();
            self.installmentAmount= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.approveMessage = ko.observable(); 
            self.rejectMessage = ko.observable();
            self.advancedHousing= ko.observable();         
            self.firstInst= ko.observable();           
            self.instAmount= ko.observable();
            self.intialAmount= ko.observable();
            self.paymentPeriod = ko.observable();
            self.reviewAdvacneHousing= ko.observable();           
            self.approve= ko.observable();
            self.reject= ko.observable();            
            self.adminNotify= ko.observable();
            self.rejectNotify= ko.observable();
            self.approveNotify= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
          self.submit(getTranslation("others.submit"));       
          self.reject(getTranslation("others.reject"));
          self.approve(getTranslation("others.approve"));
          self.yes(getTranslation("others.yes"));
          self.no(getTranslation("others.no"));
          self.back(getTranslation("others.back"));
          self.monthsDesired(getTranslation("advanceHousing.monthsDesired"));
          self.monthsRemaining(getTranslation("advanceHousing.monthsRemaining"));
          self.housingAmount(getTranslation("advanceHousing.housingAmount"));
          self.reason(getTranslation("advanceHousing.reason"));
          self.installmentAmount(getTranslation("advanceHousing.installmentAmount"));
          self.requestDate(getTranslation("labels.requestDate"));
          self.hireDate(getTranslation("labels.hireDate"));
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.approveMessage (getTranslation("advanceHousing.approveMessage"));        
          self.advancedHousing(getTranslation("pages.advancedHousing"));
          self.firstInst(getTranslation("advanceHousing.firstInst"));        
          self.instAmount(getTranslation("advanceHousing.instAmount"));        
          self.intialAmount(getTranslation("advanceHousing.intialAmount"));   
          self.reviewAdvacneHousing(getTranslation("advanceHousing.reviewAdvacneHousing")); 
          self.rejectMessage(getTranslation("advanceHousing.rejectMessage"));   
          self.paymentPeriod(getTranslation("labels.paymentperiod"));        
          self.adminNotify(getTranslation("labels.adminNotify"));  
          self.approveNotify(getTranslation("advanceHousing.approveNotify"));
          self.rejectNotify(getTranslation("advanceHousing.rejectNotify"));         
        }//added

    }

    return ReviewADVHousingNotificationViewModel;
});