define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'],
function (oj, ko, $, app, commonUtil, services, postbox) {

    function ticketReqistNotificationViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
         var employee_person_number = '';
        self.tracker = ko.observable();
         this.dataSourceTB2 = ko.observable();
          self.dataTB2 = ko.observableArray([]);
         self.columnArrayPassangerDetails = ko.observableArray([]);
        self.typeSelectedValue = ko.observable();
        self.countrySelectedValue = ko.observable();
        self.accomSelectedValue = ko.observable();
        self.transSelectedValue = ko.observable();
        self.foodSelectedValue = ko.observable();
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        self.is_Travel = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var position = rootViewModel.personDetails().positionName();
        self.refresh = ko.observable(true);
        self.isRequired = ko.observable(false)
        var personNumber = rootViewModel.personDetails().personNumber();
          self.clickedButton = ko.observable("");
           this.checkValues= ko.observableArray([{"values":"Y"},{"values":"N"}]);
        self.isDisabled = ko.observable(true);
        self.isDisabledCost = ko.observable(false);
          self.disableSubmit = ko.observable(false);
         self.disablePeriod = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.isPayroll= ko.observable(false);
        self.name = ko.observable();
        self.roleType= ko.observable();
        self.roleId= ko.observable();
        self.isLastApprover = ko.observable(false); 
        this.payPeriods= ko.observableArray([{ 
                "value": '',
                "label": '',
                 "month": '',
                 "year": '',
                 "monthYear":''
            }]);
            self.dependentArray = ko.observableArray([ {
                   BIRTH_DATE:'',"FullNameEn":'', "FullNameAr":'',EMP_PERSON_NUMBER : '5', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

                }]);
         this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });

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
         self.yesNoArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
         self.depTypeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
   self.typeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

      //------------------Model ---------------------------- 
 self.ticketRequestModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            travelDate:ko.observable(""),
            reason : ko.observable(""),
            hireDate:ko.observable(""),
            tso:ko.observable(" "),
            ticketClass:ko.observable(" "),
            route:ko.observable(" "),
            passengerName1:ko.observable(""),
            passengerName2:ko.observable(""),
            passengerName3:ko.observable(""),
            passengerCost1:ko.observable("0 "),
            passengerCost2:ko.observable(" 0"),
            passengerCost3:ko.observable(" 0"),
            initialAmount:ko.observable(" "),
            child:ko.observable(0),
            adult:ko.observable(0),
          //  ticketClass:ko.observable(" "),
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
            IS_HR_Operations:ko.observable("NO"),
            status:ko.observable(" "),
            name:ko.observable(" "),
            IS_Coordinator_Travel :ko.observable("NO"),
            employeeDateOfBirth :ko.observable(""),
            returnDate:ko.observable(""),
            requestType:ko.observable(""),
            contractType:ko.observable(""),
            employeeIncluded:ko.observable(""),
            employeeAmount:ko.observable("0"),
            passengerCost1:ko.observable("0"),
            passengerCost2:ko.observable("0"),
            passengerCost3:ko.observable("0"),
            dependent1TicketTripType:ko.observable(""),
            dependent2TicketTripType:ko.observable(""),
            dependent3TicketTripType:ko.observable(""),
            totalTicketsAmount:ko.observable("0"),
            imageBase64:ko.observable(""),
            id:ko.observable(""),               
            "employeeDateOfBirth":ko.observable(""),
            trsId:ko.observable(""),
            "SSType":"TRF",
            elementName:ko.observable(""),
            sourceSystemId:ko.observable("")
        };
    //-----------------------------End Of Model --------------------
 
    // --------------------Call Back Function For Get Tickets By Id ------------------------
        var getRewaardRequstByIdCbFn = function (data) 
        {
           
            $.each(data.items, function (index, newValue) {
             self.ticketRequestModel.id ( newValue.id);//trsId
             self.ticketRequestModel.trsId ( newValue.id);
             self.ticketRequestModel.requestDate ( newValue.request_date);
            self.ticketRequestModel.travelDate(newValue.travel_date);
            self.ticketRequestModel.reason ( newValue.reason);
            self.ticketRequestModel.hireDate(newValue.hire_date);
            self.ticketRequestModel.tso(newValue.tso);
            self.ticketRequestModel.ticketClass(newValue.ticket_class);
            self.ticketRequestModel.route(newValue.route);
            self.ticketRequestModel.passengerName1(newValue.passenger_name_1);
            self.ticketRequestModel.passengerName2(newValue.passenger_name_2);
            self.ticketRequestModel.passengerName3(newValue.passenger_name_3);
            self.ticketRequestModel.passengerCost1(newValue.passenger__cost_1);
            self.ticketRequestModel.passengerCost2(newValue.passenger__cost_2);
            self.ticketRequestModel.passengerCost3(newValue.passenger__cost_3);
       
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
             employee_person_number =newValue.person_number;
            self.ticketRequestModel.personId(newValue.person_id);
            
            self.ticketRequestModel.comments(newValue.comments);
            self.ticketRequestModel.managerId(newValue.manager_person_id);
           
            self.ticketRequestModel.status(newValue.status);
            self.ticketRequestModel.requestType(newValue.request_type);
            self.ticketRequestModel.contractType(newValue.contract_type);
            self.ticketRequestModel.employeeIncluded(newValue.employee_included);
            self.ticketRequestModel.employeeAmount(newValue.employee_amount);
            self.ticketRequestModel.passengerCost1(newValue.passenger__cost_1);
            self.ticketRequestModel.passengerCost2(newValue.passenger__cost_2);
            self.ticketRequestModel.passengerCost3(newValue.passenger__cost_3);
            self.ticketRequestModel.dependent1TicketTripType(newValue.dependent_1_ticket_trip_type);
            self.ticketRequestModel.dependent2TicketTripType(newValue.dependent_2_ticket_trip_type);
            self.ticketRequestModel.dependent3TicketTripType(newValue.dependent_3_ticket_trip_type);
            self.ticketRequestModel.totalTicketsAmount(newValue.total_tickets_amount);
            self.ticketRequestModel.returnDate(newValue.return_date);
            self.ticketRequestModel.imageBase64(newValue.image_base64);
                            
                              
                           
                           
            });
            
             
            
          
        };


        services.getTicketRrfundReqeustById(rootViewModel.selectedTableRowKeyNotifiation()).then(getRewaardRequstByIdCbFn, app.failCbFn);
        self._showComponentValidationErrors = function (trackerObj) 
        {
//            trackerObj.showMessages();
//            if (trackerObj.focusOnFirstInvalid())
//                return false;
//
            return true;
        };

        var getApprove = function (data) {
         if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");           
            }
              else{      
                 if(self.isLastApprover()){
                     self.ticketRequestModel.status("APPROVED");
                      var trId = self.ticketRequestModel.id();
                     self.ticketRequestModel.sourceSystemId(employee_person_number + "_TICKETREFUNDREQEUST_" +trId)
                     var jsonBody =    ko.toJSON(self.ticketRequestModel);
                     var editTicketRCbFn = function (data1) {
                    };
                     var submitElement = function (data1) {
                   };
                    services.editTicketRefundReqeust(jsonBody).then(editTicketRCbFn, app.failCbFn);
                    services.submitElementEntry(jsonBody).then(submitElement, app.failCbFn);
                
            }           
          // var jsonBody =  jQuery.parseJSON(ko.toJSON(self.rewardRequestModel));
          //---------------------This For Supmit Element When we Need Test---------------
//                  var x=   ko.toJSON(self.ticketRequestModel);
//                    var submitElement = function (data1) {
//                    };
//                   
//              
//                
//            services.submitElementEntry(x).then(submitElement, app.failCbFn);
//-----------------------------------End Test -------------------------------------------
             
             rootViewModel.getNoOfNotifications();
            oj.Router.rootInstance.go('notifications');
            $.notify(self.approveNotify(), "success");
           }
        };
        self.approveRewaardRequst= function(data, event) {
            if (self.clickedButton() != event.currentTarget.id) {
            
            self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                     "MSG_TITLE" : "Ticket Refund Requst",
                    "MSG_BODY" : "Ticket Refund Requst", 
                    "TRS_ID" : transactionId, 
                   "PERSON_ID" : rootViewModel.personDetails().personId(), 
                   "RESPONSE_CODE" : "APPROVED",
                   "ssType" : "TRF"
                };
    
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }

 

              var getReject = function (data) {
               if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
            rootViewModel.getNoOfNotifications();
           oj.Router.rootInstance.go('notifications');
            $.notify(self.rejectNotify(), "error");
            }
        }

        self.rejectRewaardRequst = function (data, event) {
              if (self.clickedButton() != event.currentTarget.id) {
               if (!self.rewardRequestModel.rejectRessone())
                {                
                 $.notify(self.addReason(), "error");
                  return;
                }
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Ticket Requst ", 
                    "MSG_BODY" : "Ticket Requst", 
                    "TRS_ID" : transactionId,
                    "PERSON_ID" : rootViewModel.personDetails().personId(), 
                    "RESPONSE_CODE" : "REJECTED",
                    "ssType" : "TR"
                };
    
                services.workflowAction(headers).then(getReject, app.failCbFn);
              }
            return true;
        }
           self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        

        this.submitButton = function () {
        
          
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
//RewaardRequst --cancelBTDriver
        this.cancelRewaardRequst = function () {
         rootViewModel.updateNotificaiton(self.notiId());
            oj.Router.rootInstance.go('notifications');
            
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                self.isVisible(true);
                self.isRequired(true);
            }
            //Coordinator - Travel
             if (rootViewModel.personDetails().positionName() === 'Coordinator - Travel') {
               // self.isVisible(true);
                self.isDisabledCost(false);
                self.is_Travel(true);
            }else 
            {
               self.isDisabledCost(true);
               self.is_Travel(false);
            }//self.isShown
            
            if (rootViewModel.personDetails().positionName() === 'Assistant Manager - Payroll') {
                self.isPayroll(true);
               
                self.isRequired(true);
            }
            else 
            { 
                self.isPayroll(false);
            }

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);
                self.disablePeriod(true);

            }
        };
        //This Function calculating paynent period -------------------------call from handleActivated
        var gePayPeriod =function(data)
        {
          
           parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');
                self.payPeriods([]);
                documents.children('G_1').each(function () {
                    var periodId = $(this).find('TIME_PERIOD_ID').text();
                    var periodName = $(this).find('PERIOD_NAME').text();
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
                        "monthYear":monthYear
                        
                     });
                    });
        };
        //------------------------End-----------------------------
        //---------------------Call Back Function For Debendant ---------------------
          var getchildrenExpenseCbFn2 = (function (data) {
          var ind =0;
          
          self.dependentArray([]);
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
               self.dependentArray.push( {ind:ind,
                        EMP_PERSON_NUMBER : self.ticketRequestModel.personNumber(), 
                        
                        "FullNameEn":self.ticketRequestModel.personName(),
                        
                        "FullNameAr":self.ticketRequestModel.personName(),
                        "CONTACT_TYPE" : "Employee",
                       
                        BIRTH_DATE : "50",
                        "DOB":self.ticketRequestModel.employeeDateOfBirth()
                    });
                 ind++;
                var documents = $xml.find('DATA_DS');
                documents.children('G_1').each(function () {              
                var EMP_PERSON_NUMBER = $(this).find('EMP_PERSON_NUMBER').text();
                var DEP_EN_FIRST_NAME = $(this).find('DEP_EN_FIRST_NAME').text();             
                var DEP_AR_FIRST_NAME = $(this).find('DEP_AR_FIRST_NAME').text();
                var DEP_EN_FATHER_NAME = $(this).find('DEP_EN_FATHER_NAME').text();
                var DEP_AR_FATHER_NAME = $(this).find('DEP_AR_FATHER_NAME').text();
                var DEP_EN_GRAND_FATHER = $(this).find('DEP_EN_GRAND_FATHER').text();
                var DEP_AR_GRAND_FATHER = $(this).find('DEP_AR_GRAND_FATHER').text();
                var DEP_EN_FAMILY_NAME = $(this).find('DEP_EN_FAMILY_NAME').text();
                var DEP_AR_FAMILY_NAME = $(this).find('DEP_AR_FAMILY_NAME').text();
                var CONTACT_TYPE = $(this).find('CONTACT_TYPE').text();
                var EMERGENCY_CONTACT_FLAG = $(this).find('EMERGENCY_CONTACT_FLAG').text();
                var BIRTH_DATE = $(this).find('BIRTH_DATE').text();
                var DEP_DOB = self.formatDate(new Date($(this).find('DOB').text()));
                 
             //    self.childrenExpenseModel.dependentAge(BIRTH_DATE)
              if (((CONTACT_TYPE=="Daughter"||CONTACT_TYPE=="Son")&&BIRTH_DATE<19)||CONTACT_TYPE=="Wife"){
                    self.dependentArray.push( {ind:ind,
                        EMP_PERSON_NUMBER : EMP_PERSON_NUMBER, 
                        DEP_EN_FIRST_NAME : DEP_EN_FIRST_NAME,
                        "DEP_EN_FATHER_NAME":DEP_EN_FATHER_NAME,
                        "DEP_EN_GRAND_FATHER":DEP_EN_GRAND_FATHER,
                        "DEP_EN_FAMILY_NAME" : DEP_EN_FAMILY_NAME,
                        "FullNameEn":DEP_EN_FIRST_NAME +" "+DEP_EN_FATHER_NAME + " "+ DEP_EN_GRAND_FATHER+" "+DEP_EN_FAMILY_NAME,
                        "DEP_AR_FIRST_NAME" : DEP_AR_FIRST_NAME,
                        "DEP_AR_FATHER_NAME":DEP_AR_FATHER_NAME,
                        "DEP_AR_GRAND_FATHER":DEP_AR_GRAND_FATHER,
                        "DEP_AR_FAMILY_NAME" : DEP_AR_FAMILY_NAME,
                        "FullNameAr":DEP_AR_FIRST_NAME+" "+DEP_AR_FATHER_NAME +" "+DEP_AR_GRAND_FATHER+" "+DEP_AR_FAMILY_NAME,
                        "CONTACT_TYPE" : CONTACT_TYPE,
                        "EMERGENCY_CONTACT_FLAG" : EMERGENCY_CONTACT_FLAG,
                        BIRTH_DATE : BIRTH_DATE,
                         "DOB":DEP_DOB
                    });
                  //  self.dependantNameArr1([]);
                    
                    ind++;
              }
                  
                });    
             
             //  var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName1().toString());          
             
            
            });

 function getDependentIndex(selctedDepFullName){
   var selectedIndex = 0 ;
   for (var i =-0 ; i <self.dependentArray().length;i++)
   {
      if (self.dependentArray()[i].FullNameEn == selctedDepFullName || self.dependentArray()[i].FullNameAr==selctedDepFullName)
      {
        selectedIndex = i ; 
        break;
      }
   }
   return selectedIndex ; 
}
    function buildDepType() {
            self.depTypeArr([]);///globalNadecTicketRautes
                 
             self.depTypeArr(rootViewModel.globalNadecTripDirection1());
        }
        //-------------------This Function To Build Route --------------------------
    function builTypeArr() {
            self.typeArr([]);///globalNadecTicketRautes
    
             self.typeArr(rootViewModel.globalNadecTicketRefund());
        }
        //------------------------Function fro build yesNo --------------------------
    function buildYesNo() {
            self.yesNoArr([]);          
            self.yesNoArr(rootViewModel.globalYesNo().slice(0));
            
        }
        //-----------------------------End-------------------------------
        self.handleAttached = function (info) {
         builTypeArr();
          buildYesNo() ;
          buildDepType();
           var preview = document.querySelector('.attClass');
              preview.src = self.ticketRequestModel.imageBase64();
              
            self.ticketRequestModel.employeeDateOfBirth(rootViewModel.personDetails().dateOfBirth());
           self.ticketClassArr(rootViewModel.globalSaaSTicketClass());
            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                self.isDisabled(false);
                initTranslations();
            }
           services.gePayPeriodReport(personNumber).then(gePayPeriod, app.failCbFn);
          initTranslations();
       var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
           self.isLastApprover(rootViewModel.isLastApprover(transactionId,"TRF"));
           self.ticketRequestModel.elementName(rootViewModel.getElementName("TRF"));
         services.getDependentsName(self.ticketRequestModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);
        };
        

        self.handleDetached = function (info) {
        };
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
        //-------------------Passanger Details Section ---------------------------------
        self.openDialog = function (){
         var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName1().toString());    
         self.dataTB2([]);
          self.dataTB2.push( {
                           name :self.dependentArray()[depArrIndex].FullNameEn,
                        type : self.dependentArray()[depArrIndex].DOB, 
                        status : self.dependentArray()[depArrIndex].CONTACT_TYPE
                       
                    });

               
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
            //  var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
            document.querySelector("#modalDialog1").open();
        }
        self.openDialog2 = function (){
         var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName2().toString());        
         self.dataTB2([]);
          self.dataTB2.push( {
                           name :self.dependentArray()[depArrIndex].FullNameEn,
                        type : self.dependentArray()[depArrIndex].DOB, 
                        status : self.dependentArray()[depArrIndex].CONTACT_TYPE
                       
                    });

               
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
            //  var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
            document.querySelector("#modalDialog1").open();
        }
        self.openDialog3 = function (){
         var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName3().toString());    
         
         self.dataTB2([]);
          self.dataTB2.push( {
                           name :self.dependentArray()[depArrIndex].FullNameEn,
                        type : self.dependentArray()[depArrIndex].DOB, 
                        status : self.dependentArray()[depArrIndex].CONTACT_TYPE
                       
                    });

               
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
            //  var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
            document.querySelector("#modalDialog1").open();
        }

        //------------------------------End Section -----------------------------------------
         //language support =========================
            self.back= ko.observable();
            self.requestDate=ko.observable();
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();            
            self.allowedAmount=ko.observable();            
            self.reason=ko.observable();
            self.servicePeriod=ko.observable();
            self.paymentPeriod=ko.observable();  
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.approveMessage = ko.observable();
            self.rejectMessage  = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();   
            self.submit = ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable(); 
            self.ok = ko.observable();
            self.reviewRewardRequst = ko.observable();
             self.loan=ko.observable(); 
             self.adminNotify=ko.observable(); 
            self.comment=ko.observable();
            self.rejectReason=ko.observable();
            self.rejectNotify=ko.observable();
            self.approveNotify=ko.observable();
            self.addReason=ko.observable();
            self.ticketsTravelDatelbl=ko.observable();
            self.hireDate=ko.observable("");
            self.tso=ko.observable();
            self.ticketsRouteLbl=ko.observable(); 
            self.passengerNameLbl= ko.observable();
            self.passengerCost1Lbl= ko.observable();
            self.passengerCost2Lbl= ko.observable();
            self.passengerCost3Lbl= ko.observable();
            self.passengerCost4Lbl= ko.observable();
            self.totalAccruedTicketsLbl = ko.observable();
            self.totalChildrenLbl = ko.observable();
            self.totalAdultsLbl = ko.observable();
            self.employeeShareLbl = ko.observable();
             self.companyShareLbl = ko.observable();
             self.installmentAmountLbl = ko.observable();
             self.firstinstallmentAmountLbl= ko.observable();
             self.passengerDateOfBirth= ko.observable();
                self.relation= ko.observable();
                self.passengerDetails= ko.observable();
             self.returnDateLbl = ko.observable();
             self.typeLbl = ko.observable();
             self.ticketClassLbl =ko.observable();
             self.contractTypeLbl=ko.observable();
             self.employeeIncludedLbl =ko.observable();
             self.employeeAmountLbl=ko.observable();
             self.dep1TypeLbl=ko.observable();
             self.dep2TypeLbl=ko.observable();
             self.dep3TypeLbl=ko.observable();
             self.dep1AmountLbl=ko.observable();
             self.dep2AmountLbl=ko.observable();
             self.dep3AmountLbl=ko.observable();
             self.totalAmountLbl=ko.observable();
             self.AttachmentError=  ko.observable();
             self.attachment = ko.observable();  
            var getTranslation = oj.Translations.getTranslatedString;
            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                                    initTranslations();
                }
            });            
            function initTranslations() {           
             self.firstinstallmentAmountLbl(getTranslation("ticketRequest.1stInstallmentPeriod"));
               self.ticketsTravelDatelbl(getTranslation("ticketRequest.ticketsTravelDate"));
                self.hireDate(getTranslation("ticketRequest.hireDate"));
                self.tso(getTranslation("ticketRequest.tso"));
                self.ticketsRouteLbl(getTranslation("ticketRequest.ticketsRoute"));
                self.passengerNameLbl(getTranslation("ticketRequest.passengerName"));
                self.passengerCost1Lbl(getTranslation("ticketRequest.passengerNameCost")+'1');
                self.passengerCost2Lbl(getTranslation("ticketRequest.passengerNameCost")+'2');
                self.passengerCost3Lbl(getTranslation("ticketRequest.passengerNameCost")+'3');
                self.passengerCost4Lbl(getTranslation("ticketRequest.passengerNameCost")+'4');
                self.totalAccruedTicketsLbl(getTranslation("ticketRequest.totalAccruedTickets"));
                self.totalChildrenLbl(getTranslation("ticketRequest.totalChildren"));
                self.totalAdultsLbl(getTranslation("ticketRequest.totalAdults"));
                self.employeeShareLbl(getTranslation("ticketRequest.employeesShareDebit"));
                self.companyShareLbl(getTranslation("ticketRequest.companysShare"));
                 self.installmentAmountLbl(getTranslation("ticketRequest.initialAmount"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));            
               self.ok(getTranslation("others.ok"));              
               self.back(getTranslation("others.back"));
               self.requestDate(getTranslation("labels.requestDate"));
              
               
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.reviewRewardRequst(getTranslation("ticketRequest.reviewTicketRefund"));
               self.paymentPeriod(getTranslation("labels.paymentperiod")); 
               self.approve(getTranslation("others.approve"));
               self.reject(getTranslation("others.reject"));
               self.cancel(getTranslation("others.cancel"));               
               self.approveMessage(getTranslation("ticketRequest.approveMessage"));  
               self.rejectMessage(getTranslation("ticketRequest.rejectMessage"));
              
                self.comment(getTranslation("others.comment"));
                self.adminNotify(getTranslation("labels.adminNotify"));
                self.rejectReason(getTranslation("labels.rejectReason")); 
                self.rejectNotify(getTranslation("ticketRequest.rejectNotify"));
                self.approveNotify(getTranslation("ticketRequest.approveNotify"));
                self.addReason(getTranslation("labels.addReason"));
                self.passengerDetails (getTranslation("ticketRequest.passengerDetails"));
                self.passengerDateOfBirth (getTranslation("ticketRequest.DOB"));//relation
                self.relation (getTranslation("ticketRequest.relation"));
                self.columnArrayPassangerDetails([{"headerText":  self.passengerNameLbl(), 
                                       "field": "name"},
                                       {"headerText": self.passengerDateOfBirth(), 
                                       "field": "type"},
                                       {"headerText": self.relation(), 
                                       "field": "status"}
                                       ]);
            self.typeLbl(getTranslation("ticketRequest.reqeustType"));
            self.ticketClassLbl(getTranslation("ticketRequest.ticketsClass"));
            self.contractTypeLbl(getTranslation("ticketRequest.contractType"));
            self.employeeIncludedLbl (getTranslation("ticketRequest.employeeIncluded"));
            self.employeeAmountLbl(getTranslation("ticketRequest.employeeAmount"));
            self.dep1TypeLbl(getTranslation("ticketRequest.dep1Type"));
            self.dep2TypeLbl(getTranslation("ticketRequest.dep2Type"));
            self.dep3TypeLbl(getTranslation("ticketRequest.dep3Type"));
            self.dep1AmountLbl(getTranslation("ticketRequest.dep1Amount"));
            self.dep2AmountLbl(getTranslation("ticketRequest.dep2Amount"));
            self.dep3AmountLbl(getTranslation("ticketRequest.dep3Amount"));
            self.totalAmountLbl(getTranslation("ticketRequest.totalAmount"));
            self.attachment(getTranslation("businessTrip.attachment"));
            self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
             self.returnDateLbl (getTranslation("ticketRequest.returnDate"));
            }

    }

    return ticketReqistNotificationViewModel;
});