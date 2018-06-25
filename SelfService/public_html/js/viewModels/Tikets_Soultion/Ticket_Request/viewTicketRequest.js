define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox','appController', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation','ojs/ojdialog'],
function (oj, ko, $, postbox,app) {

    function ViewTicketRrequst() {
        var self = this;
         var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.isVisible=ko.observable(false);
         self.isDisabled =ko.observable(true);
       // var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
         self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
         self.reasonArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.ticketClassArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
  self.routeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
       self.ticketRequestModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            travelDate:ko.observable(""),
            reason : ko.observable(""),
            hireDate:ko.observable(""),
            tso:ko.observable(" "),
            ticketClass:ko.observable(" "),
            route:ko.observable(" "),
            passengerName1:ko.observable(" "),
            passengerName2:ko.observable(" "),
            passengerName3:ko.observable(" "),
            passengerName4:ko.observable(" "),
            passengerCost1:ko.observable("0 "),
            passengerCost2:ko.observable(" 0"),
            passengerCost3:ko.observable(" 0"),
            passengerCost4:ko.observable(" 0"),
            initialAmount:ko.observable(" "),
            child:ko.observable(0),
            adult:ko.observable(0),
            ticketClass:ko.observable(" "),
           companyShare:ko.observable(" "),
           employeeShare:ko.observable(" "),
           installmentAmount:ko.observable(" "),
            totalAccruedTickets : ko.observable(0),  
            processingPeriod:ko.observable(" "),
            firstInstallmentPeriod:ko.observable(" "),
            createdBy:ko.observable(""),
            creationDate:ko.observable(" "),
            personName:ko.observable(" "),
            personNumber:ko.observable(" "),
            personId:ko.observable(" "),
            name: ko.observable(" "),
            comments:ko.observable(" "),
            managerId:ko.observable(" "),
            IS_DRAFT:ko.observable(" "),
            status:ko.observable(" "),
            name:ko.observable(" "),
            IS_Supmited:ko.observable(" "),
            IS_Coordinator_Travel :ko.observable(" "),
            id: ko.observable(" ")
        };
            
              ko.postbox.subscribe("viewElementObj", function (newValue) {
                           self.ticketRequestModel.id ( newValue.id);
             self.ticketRequestModel.requestDate ( newValue.requestDate);
            self.ticketRequestModel.travelDate(newValue.travelDate);
            self.ticketRequestModel.reason ( newValue.reason);
            self.ticketRequestModel.hireDate(newValue.hireDate);
            self.ticketRequestModel.tso(newValue.tso);
            self.ticketRequestModel.ticketClass(newValue.ticketClass);
            self.ticketRequestModel.route(newValue.route);
            self.ticketRequestModel.passengerName1(newValue.passengerName1);
            self.ticketRequestModel.passengerName2(newValue.passengerName2);
            self.ticketRequestModel.passengerName3(newValue.passengerName3);
            self.ticketRequestModel.passengerName4(newValue.passengerName4);
            self.ticketRequestModel.passengerCost1(newValue.passengerCost1);
            self.ticketRequestModel.passengerCost2(newValue.passengerCost2);
            self.ticketRequestModel.passengerCost3(newValue.passengerCost3);
            self.ticketRequestModel.passengerCost4(newValue.passengerCost4);
            //self.ticketRequestModel.initialAmount(newValue.initial_amount);
            self.ticketRequestModel.child(newValue.child);
            self.ticketRequestModel.adult(newValue.adult);      
           self.ticketRequestModel.companyShare(newValue.company_share);
          // self.ticketRequestModel.employeeShare(newValue.employee_share);
          // self.ticketRequestModel.installmentAmount(newValue.installment_amount);
            self.ticketRequestModel.totalAccruedTickets (newValue. total_accrued_tickets);
           self.ticketRequestModel.processingPeriod(newValue.processing_period);
            self.ticketRequestModel.firstInstallmentPeriod(newValue.first_installment_period);
            self.ticketRequestModel.createdBy(newValue.created_by);
            self.ticketRequestModel.creationDate(newValue.creation_date);
            self.ticketRequestModel.personName(newValue.person_name);
            self.ticketRequestModel.personNumber(newValue.person_number);
            self.ticketRequestModel.personId(newValue.person_id);
            
            self.ticketRequestModel.comments(newValue.comments);
            self.ticketRequestModel.managerId(newValue.manager_person_id);
           
            self.ticketRequestModel.status(newValue.status);
        });
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
     

        self.handleActivated = function (info) {
           
            }
             
        
 function builTicketsReasonse() {
            self.reasonArr([]);
           
            self.reasonArr(rootViewModel.globalHrTicketsReasons());
            
        }
        function builTicketsRoute() {
            self.routeArr([]);
    self.routeArr.push({
            "value" : 'Riyadh/London/Riyadh', "label" : 'Riyadh/London/Riyadh'
        });
		self.routeArr.push({
            "value" : 'Jeddah/Yaounde/Jeddah', "label" : 'Jeddah/Yaounde/Jeddah'
        });
            
        }
        self.handleAttached = function (info) {
        builTicketsReasonse();
        builTicketsRoute();
        self.ticketClassArr(rootViewModel.globalSaaSTicketClass());
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            initTranslations();
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryTicketRequest');
                    }//added
        }
                //language support =========================
            self.back= ko.observable();
            self.requestDate=ko.observable();
            self.hireDate=ko.observable("");
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();            
            self.allowedAmount=ko.observable();            
            self.reason=ko.observable();
            self.servicePeriod=ko.observable();
             self.comment=ko.observable();
              self.ticketsRouteLbl=ko.observable(); 
               self.tso=ko.observable();
            self.ticketsTravelDatelbl=ko.observable();
             self.passengerNameLbl= ko.observable();
             self.totalAccruedTicketsLbl = ko.observable();
              self.totalChildrenLbl = ko.observable();
              self.totalAdultsLbl = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                                    initTranslations();
                }
            });            
            function initTranslations() {               
                self.back(getTranslation("others.back"));
                self.ticketsTravelDatelbl(getTranslation("ticketRequest.ticketsTravelDate"));
                self.hireDate(getTranslation("ticketRequest.hireDate"));
                self.tso(getTranslation("ticketRequest.tso"));
                self.requestDate(getTranslation("labels.requestDate"));
               self.endOfServiceAmount(getTranslation("rewardRequest.endOfServiceAmount"));
               self.paidEndOfService(getTranslation("rewardRequest.paidEndOfService"));
               self.lastEosPaymentDate(getTranslation("rewardRequest.lastEosPaymentDate"));
               self.requestAmount(getTranslation("rewardRequest.requestAmount"));
               self.rewardRequest(getTranslation("rewardRequest.rewardRequest"));
               self.allowedAmount(getTranslation("rewardRequest.allowedAmount"));
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.comment(getTranslation("others.comment"));
               self.ticketsRouteLbl(getTranslation("ticketRequest.ticketsRoute"));
                self.passengerNameLbl(getTranslation("ticketRequest.passengerName"));
                self.totalAccruedTicketsLbl(getTranslation("ticketRequest.totalAccruedTickets"));
                 self.totalChildrenLbl(getTranslation("ticketRequest.totalChildren"));
                  self.totalAdultsLbl(getTranslation("ticketRequest.totalAdults"));
               
            }
    }

    return ViewTicketRrequst;
});