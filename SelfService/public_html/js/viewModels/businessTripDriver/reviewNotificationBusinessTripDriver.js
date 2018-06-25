define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function BusinessTripDriverNotificationViewModel() {
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
        self.refresh = ko.observable(true);
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        
        self.driverAreaArray = ko.observableArray(rootViewModel.globalBTripDriverArea());
        self.driverTypeArray = ko.observableArray(rootViewModel.globalBTripDriverType());
        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
        self.isRequired = ko.observable(false)
        self.periodName = ko.observable();
        self.periodFiltered  = ko.observable();
        var recieverManager =rootViewModel.recieveType();
        self.disableSubmit = ko.observable(false);
        self.isLastApprover = ko.observable(false);
        this.payPeriods= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":''
            }]);

        self.formatDate = function (date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.bTripDriverModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            id:ko.observable(),
            type : ko.observable(""),
            area : ko.observable(""),
            totalKm : ko.observable(""), 
            tripsNumber : ko.observable(""),
            startDate : ko.observable(""),
            endDate : ko.observable(""),
            daysNumber : ko.observable(""),
            notes : ko.observable(""),
            paymentPeriod : ko.observable(""),
            personNumber : ko.observable(""), 
            name : ko.observable(""),
            rejectRessone: ko.observable(""),
            finalApproved: ko.observable(""),
            status: ko.observable(""),
            imageBase64: ko.observable("")
        };

 
        var getBusinessTripDriverByIdCbFn = function (data) {
            $.each(data.items, function (index, val) {
                self.bTripDriverModel.id(val.id);
                self.bTripDriverModel.requestDate(val.request_date);
//                self.bTripDriverModel.type(searchArray(val.type,self.driverTypeArray()));
//                self.bTripDriverModel.area(searchArray(val.area,self.driverAreaArray()));
                self.bTripDriverModel.type(val.type);
                self.bTripDriverModel.area(val.area);
                self.bTripDriverModel.totalKm(val.total_kilo_meters);
                self.bTripDriverModel.tripsNumber(val.trips_number);
                self.bTripDriverModel.startDate(val.start_date);
                self.bTripDriverModel.endDate(val.end_date);
                self.bTripDriverModel.daysNumber(val.days_number);
                self.bTripDriverModel.personNumber(val.person_number);
                self.bTripDriverModel.paymentPeriod(val.payment_period);
                self.bTripDriverModel.notes(val.notes);
                self.bTripDriverModel.imageBase64(val.image_base64);
            });                  
        };

        services.getBusinessTripDriverId(rootViewModel.selectedTableRowKeyNotifiation()).then(getBusinessTripDriverByIdCbFn, app.failCbFn);
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
           
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
          
                if (self.isLastApprover()) {
                
                self.bTripDriverModel.status("APPROVED");
                self.bTripDriverModel.finalApproved("Yes");
                    var jsonBody = jQuery.parseJSON(ko.toJSON(self.bTripDriverModel));
                    jsonBody.trsId = transactionId;
                    jsonBody.SSType = "BTD";
//                    var updateJson = {
//                    "status":"APPROVED","finalApproved" : "Yes",  "id" : self.bTripDriverModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
//                     "updateDate":new Date(),"type":self.bTripDriverModel.type()
//                };
//    
                    var editBusinessTripDriverCbFn = function (data1) {
    
                    };
                    services.editBusinessTripDriver(jsonBody).then(editBusinessTripDriverCbFn, app.failCbFn);
    
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
                $.notify(self.notifyReject(), "error");
            }
        };

        self.approveBTripDriver = function () {
              var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }

            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
                  self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "New Business Trip Driver", "MSG_BODY" : "New Business Trip Driver Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "BTD"
            };
            services.workflowAction(headers).then(getApprove, app.failCbFn);
            return true;
        }

        self.rejectBTripDriver = function () {
          if (!self.bTripDriverModel.rejectRessone())
                {
                 $.notify("Add Ressone", "error");
                  return;
                }
             self.disableSubmit(true);
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Business Trip Driver ", "MSG_BODY" : "Business Trip Driver", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType":"BTD"
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
            if (recieverManager == 'LINE_MANAGER'){
                self.isVisible(true);
                self.isRequired(true);
            }

            if (recieverManager === 'LINE_MANAGER+1') {
                self.isVisible(false);
                 self.isRequired(false);                

            }

            if (rootViewModel.reviewNotiType() == 'FYI' ) {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
            var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
             self.isLastApprover(rootViewModel.isLastApprover(transactionId,"BTD"));
                    initTranslations();
//                        if (recieverManager == 'LINE_MANAGER') {
//                self.isDisabled(false);
//                services.gePayPeriodReport(self.personNumber()).then(function (data) {
//                    parser = new DOMParser();
//                    xmlDOC = parser.parseFromString(data, "text/xml");
//                    $xml = $(xmlDOC);
//                    var documents = $xml.find('DATA_DS');
//                    self.payPeriods([]);
//                    documents.children('G_1').each(function () {
//                        var periodId = $(this).find('TIME_PERIOD_ID').text();
//                        var periodName = $(this).find('PERIOD_NAME').text();
//                        var fields = periodName.split(' ');
//                        var month = fields[0];
//                        var year = fields[1];
//                        if (month.length < 2) {
//                            month = '0' + month;
//                        }
//                        var monthYear = year + '' + month;
//                        self.payPeriods.push( {
//                            "value" : periodId, "label" : periodName, "month" : month, "year" : year, "monthYear" : monthYear
//
//                        });
//                    });
//                    self.payPeriods.sort(function (left, right) {
//                        return left.monthYear == right.monthYear ? 0 : (left.monthYear < right.monthYear ?  - 1 : 1)
//                    })
//                },
//                app.failCbFn);
//            }
        };

        self.handleDetached = function (info) {
        };
//language support =========================
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.citylbl= ko.observable();
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.nodays= ko.observable();
            self.businessTripDriverRequest= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.totalKM = ko.observable();
            self.tripsNumber = ko.observable();
            self.notes = ko.observable();
            self.paymentperiod = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage = ko.observable();
            self.reviewBusinessTripDriver = ko.observable();
            self.confirmMessage = ko.observable();
            self.reject = ko.observable();
            self.approve = ko.observable();
            self.rejectReason = ko.observable();
            self.adminNotify= ko.observable();
            self.notifyApproved= ko.observable();
            self.notifyReject= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString
		
		self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {    
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.nodays(getTranslation("labels.nodays"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.businessTripDriverRequest(getTranslation("pages.businessTripDriverRequest"));
          self.totalKM(getTranslation("businessTripDriver.totalKm"));
          self.tripsNumber(getTranslation("businessTripDriver.tripsNumber"));
          self.notes(getTranslation("businessTripDriver.notes"));
          self.requestDate(getTranslation("labels.requestDate"));
          self.back(getTranslation("others.back"));
          self.paymentperiod(getTranslation("labels.paymentperiod"));
          self.rejectMessage(getTranslation("businessTripDriver.rejectMessage"));
          self.approveMessage(getTranslation("businessTripDriver.approveMessage"));
          self.reviewBusinessTripDriver(getTranslation("businessTripDriver.reviewBusinessTripDriver"));
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.yes(getTranslation("others.yes"));
          self.no(getTranslation("others.no"));
          self.back(getTranslation("others.back"));
          self.cancel(getTranslation("others.cancel"));
         self.approve(getTranslation("others.approve"));
         self.reject(getTranslation("others.reject"));
         self.rejectReason(getTranslation("labels.rejectReason"));
         self.adminNotify(getTranslation("labels.adminNotify"));
         self.notifyApproved(getTranslation("businessTripDriver.notifyApproved"));
         self.notifyReject(getTranslation("businessTripDriver.notifyReject"));
        }//added

    }

    return BusinessTripDriverNotificationViewModel;
});