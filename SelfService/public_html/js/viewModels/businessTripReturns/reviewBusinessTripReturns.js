define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'notifyjs', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, common, services) {

    function ReviewNotificationsViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        var employee_person_number = '';
        self.tracker = ko.observable();
        self.typeSelectedValue = ko.observable();
        self.countrySelectedValue = ko.observable();
        self.accomSelectedValue = ko.observable();
        self.transSelectedValue = ko.observable();
        self.foodSelectedValue = ko.observable();
        self.selfServiceURL = ko.observable();
        self.requesterName = ko.observable();
        self.isShown = ko.observable(true);
        self.clickedButton = ko.observable("");
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
         $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });
        this.maxAdvAmount = ko.computed(function() {

         }
         );

      
        
            self.businessTripReturnModel = {
                id : ko.observable(),
                requestDate:  ko.observable(),
                location :  ko.observable(),
                btripId : ko.observable(""),
                btripDesc : ko.observable(""),
                name : ko.observable(),
                personId : rootViewModel.personDetails().personId(),
                type1 : ko.observable(""),
                typeVal:ko.observable(""),
                startdate : ko.observable(""),
                enddate : ko.observable(""),
                country : ko.observable(""),
                status : ko.observable("Initiated"),
                city : ko.observable(""),
                daysbefore : ko.observable(""),
                daysafter : ko.observable(""),
                numberofdays : ko.observable(0),
                accommodation : ko.observable(),
                transport : ko.observable(""),
                food : ko.observable(""),
                accomodationAmount: ko.observable(""),
                transportationAmount: ko.observable(""),
                foodAmount: ko.observable(""),
                perdiem : ko.observable(0),
                totalamount : ko.observable(""),
                ticketclass : ko.observable(""),
                ticketamount : ko.observable(""),
                tso : ko.observable(),
                advanceamount : ko.observable(""),
                managerId : rootViewModel.personDetails().managerId(),
                pnr : ko.observable(""),
                personNumber : rootViewModel.personDetails().personNumber,
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date())
                
    };
        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify("We found an error please call adminstrator", "error");
                
            } else {
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                 var jsonBody = jQuery.parseJSON(ko.toJSON(self.businessTripReturnModel));
                if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                   
                    jsonBody.trsId = transactionId;
                    jsonBody.SSType = "BTR";
                    var submitElement = function (data1) {

                    };
                    
                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
    
                }
               rootViewModel.getNoOfNotifications();
               $.notify(getTranslation("businessTrip.requestReturnApprove"), "success");
               oj.Router.rootInstance.go('notifications');
               
            }
        };

        var getReject = function (data) {
        if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify("We found an error please call adminstrator", "error");
                
            } else {
                rootViewModel.getNoOfNotifications();
                $.notify(getTranslation("businessTrip.requestReturnReject"), "error");
    
                oj.Router.rootInstance.go('notifications');
            }
        };


        this.approveBusinessTrip = function () {
             if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);

            var btripId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Business Trip Returns	", "MSG_BODY" : "Business Trip Returns Request for "+self.businessTripReturnModel.name(), "TRS_ID" : btripId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "BTR"
            };
            

            services.workflowAction(headers).then(getApprove, app.failCbFn);
             }
            return true;
        }
        

        this.rejectBusinessTrip = function () {
        if (self.clickedButton() != event.currentTarget.id) {
            self.clickedButton(event.currentTarget.id);

            var btripId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_BODY" : "MSG_BODY_MANAGER", "MSG_TITLE" : "MSG_TITLE_MANAGER", "TRS_ID" : btripId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "BTR"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
        }
            return true;
        }
        this.submitButton = function () {
          
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
              self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };

        this.cancelBusinessTrip = function () {
            oj.Router.rootInstance.go('notifications');
            return true;
        }
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            self.clickedButton("");
            document.querySelector("#rejectDialog").close();
        };

        self.handleActivated = function (info) {
        if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }

        };

        self.handleAttached = function (info) {
            initTranslations()
            self.types = ko.observableArray(rootViewModel.globalTypes().slice(0));
            self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
            self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));

            if (rootViewModel.reviewNotiType() == 'BTR') {
                self.selfServiceURL(rootViewModel.selectedTableRowKeyNotifiation());
            }
             services.getBusinessTripReturnsbyId(rootViewModel.selectedTableRowKeyNotifiation()).then(function (btrip){
                self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
                    pattern : 'dd/MM/yyyy'
                }));
                $.each(btrip.items, function (index, newValue) {
                        self.businessTripReturnModel.id(newValue.id);
                        self.businessTripReturnModel.city(newValue.city);
                        self.businessTripReturnModel.btripId(newValue.btrip_id);
                        self.businessTripReturnModel.type1(newValue.type1);
                        self.businessTripReturnModel.typeVal(searchArray(newValue.type1, rootViewModel.globalTypes()));
                        self.businessTripReturnModel.location(newValue.employeelocation);
                        self.businessTripReturnModel.requestDate(newValue.request_date);
                        self.businessTripReturnModel.country(newValue.country);
                        self.businessTripReturnModel.status(newValue.status);
                        self.businessTripReturnModel.btripDesc(newValue.btrip_reference);
                        self.businessTripReturnModel.daysbefore("0");
                        self.businessTripReturnModel.daysafter("0");
                        self.businessTripReturnModel.numberofdays(newValue.numberofdays);
                        self.businessTripReturnModel.accommodation(newValue.accommodationprovided);
                        self.businessTripReturnModel.transport(newValue.transportationprovided);
                        self.businessTripReturnModel.food(newValue.foodprovided);
                        self.businessTripReturnModel.startdate(newValue.startdate);
                        self.businessTripReturnModel.enddate(newValue.enddate);            
                        self.businessTripReturnModel.accomodationAmount(newValue.accomodation_amount);
                        self.businessTripReturnModel.transportationAmount(newValue.transportation_amount);
                        self.businessTripReturnModel.foodAmount(newValue.food_amount);
                        self.businessTripReturnModel.perdiem(newValue.perdiem);
                        self.businessTripReturnModel.totalamount(newValue.totalamount);
                        self.businessTripReturnModel.numberofdays(newValue.numberofdays);
                        self.businessTripReturnModel.ticketclass(newValue.ticketclass);
                        self.businessTripReturnModel.ticketamount(newValue.ticketamount);
                        self.businessTripReturnModel.advanceamount(newValue.advanceamount);
                        self.businessTripReturnModel.pnr(newValue.pnr);
                        self.businessTripReturnModel.name(newValue.name);
                        self.requesterName(newValue.name);

                });
            });
        };
        self.handleDetached = function (info) {
            self.typeSelectedValue('');
            self.countrySelectedValue('');
            self.accomSelectedValue('');
            self.transSelectedValue('');
            self.foodSelectedValue('');
            self.selfServiceURL('');
            self.requesterName('');
            self.clickedButton("");
             self.isShown(true);
        };

        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();

        this.selected = ko.observable('stp1');
        this.empLoc = ko.observable("");
        this.city = ko.observable("");
        this.daysBefore = ko.observable("");
        this.daysAfter = ko.observable("");
        this.noDays = ko.observable("");
        this.perDiems = ko.observable("");
        this.totAmount = ko.observable(0);
        this.ticketAmount = ko.observable("");
        this.ticketClass = ko.observable("");
        this.tso = ko.observable("");
        this.pnr = ko.observable("");
        this.advAmount = ko.observable("");
        this.val = ko.observable("");
        this.startDate = ko.observable();
        this.selectedCountry = ko.observable("");
        this.selectedAcomProvided = ko.observable("");
        this.selectedFoodProvided = ko.observable("");
        this.selectedTransProvided = ko.observable("");
        this.selectedType = ko.observable("");
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");

        this.selectedDayBefore = ko.observable("");
        this.selectedDayAfter = ko.observable("");

        this.endDate = ko.observable();
        this.componentRequired = ko.observable(true);

        self.isDisabled = ko.observable(true);
        this.types = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.yesNo = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.country = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.commitRecord = function (data, event) {
            editRecord();
            return true;
        }
        //language support =========================
           self.next = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.employeeLocation= ko.observable();
            self.citylbl= ko.observable();
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.editMessage= ko.observable();
            self.daysafter= ko.observable();
            self.nodays= ko.observable();
            self.accomodationProvided= ko.observable();
            self.tranportationProvided= ko.observable();
            self.foodProvided= ko.observable();
            self.accomodationAmount= ko.observable();
            self.tranportationAmount= ko.observable();
            self.foodAmount= ko.observable();
            self.preDiem= ko.observable();
            self.totalamount= ko.observable();
            self.ticketclass= ko.observable();
            self.ticketamount= ko.observable();
            self.tsolbl= ko.observable();
            self.PNRlbl= ko.observable();
            self.advanceAmount= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.overLapMessage = ko.observable();
            self.reviewBusinessTrip = ko.observable();
            self.approve = ko.observable();
            self.reject = ko.observable();
            self.rejectMessage = ko.observable();
            self.approveMessage = ko.observable();
            self.btripDetails = ko.observable();
            self.totamount= ko.observable();

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
          self.next(getTranslation("others.next"));
          self.cancel(getTranslation("others.cancel"));
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.approveMessage(getTranslation("businessTrip.approveReturnMessage"));
          self.rejectMessage(getTranslation("businessTrip.rejectReturnMessage"));
          self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
          self.citylbl(getTranslation("businessTrip.city"));
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.daysbefore(getTranslation("businessTrip.daysbefore"));
          self.daysafter(getTranslation("businessTrip.daysafter"));
          self.nodays(getTranslation("labels.nodays"));
          self.accomodationProvided(getTranslation("businessTrip.accomodationProvided"));
          self.tranportationProvided(getTranslation("businessTrip.tranportationProvided"));
          self.foodProvided(getTranslation("businessTrip.foodProvided"));
          self.preDiem(getTranslation("businessTrip.preDiem"));
          self.totalamount(getTranslation("businessTrip.totamount"));
          self.ticketclass(getTranslation("businessTrip.ticketclass"));
          self.ticketamount(getTranslation("businessTrip.ticketamount"));
          self.tsolbl(getTranslation("businessTrip.tso"));
          self.totamount(getTranslation("businessTrip.totamount"));
          self.PNRlbl(getTranslation("businessTrip.pnr"));
          self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.overLapMessage(getTranslation("businessTrip.overLapMessage"));
          self.reviewBusinessTrip(getTranslation("businessTrip.reviewBusinessTripReturns"));
          self.requestDate(getTranslation("businessTrip.requestDate"));
          self.accomodationAmount(getTranslation("businessTrip.accomodationAmount"));
          self.tranportationAmount(getTranslation("businessTrip.transportationAmount"));
          self.foodAmount(getTranslation("businessTrip.foodAmount"));
          self.btripDetails(getTranslation("businessTrip.btripDetails"));

        }//added

    }

    return new ReviewNotificationsViewModel();
});