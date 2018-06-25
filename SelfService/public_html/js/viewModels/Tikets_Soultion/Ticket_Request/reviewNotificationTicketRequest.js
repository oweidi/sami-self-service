define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

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
        self.elementName =  ko.observable();
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
        self.isPayroll= ko.observable(false);
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

      //------------------Model ---------------------------- 
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
            id: ko.observable(" "),
            rejectRessone: ko.observable(" "),
            paymentPeriod: ko.observable(" "),
            "employeeDateOfBirth":ko.observable("")
        };
    //-----------------------------End Of Model --------------------
    // --------------------Call Back Function For Get Tickets By Id ------------------------
        var getRewaardRequstByIdCbFn = function (data) 
        {
            
            $.each(data.items, function (index, newValue) {
             self.ticketRequestModel.id ( newValue.id);
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
            self.ticketRequestModel.passengerName4(newValue.passenger_name_4);
            self.ticketRequestModel.passengerCost1(newValue.passenger__cost_1);
            self.ticketRequestModel.passengerCost2(newValue.passenger__cost_2);
            self.ticketRequestModel.passengerCost3(newValue.passenger__cost_3);
            self.ticketRequestModel.passengerCost4(newValue.passenger__cost_4);
            //self.ticketRequestModel.initialAmount(newValue.initial_amount);
            self.ticketRequestModel.child(newValue.child);
            self.ticketRequestModel.adult(newValue.adult);      
           self.ticketRequestModel.companyShare(newValue.company_share);
           self.ticketRequestModel.employeeShare(newValue.employee_share);
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
                            
                              
                           
                           
            });
            
             
            
          
        };


        services.getTicketReqeustById(rootViewModel.selectedTableRowKeyNotifiation()).then(getRewaardRequstByIdCbFn, app.failCbFn);
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
                 self.ticketRequestModel.paymentPeriod( self.ticketRequestModel.paymentPeriod()[0]);//initialAmount
                 self.ticketRequestModel.initialAmount( self.ticketRequestModel.initialAmount()[0]);
                 self.ticketRequestModel.firstInstallmentPeriod( self.ticketRequestModel.firstInstallmentPeriod()[0]);
               
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
         if (rootViewModel.personDetails().positionName() === 'Coordinator - Travel'||rootViewModel.personDetails().positionName() === 'Assistant Manager - Payroll') {
               if(self.isLastApprover()) {
               self.ticketRequestModel.status("APPROVED");
               }
                 var jsonData = ko.toJSON(self.ticketRequestModel);
                    jsonData.trsId = transactionId;
                    jsonData.SSType = "TR";

     var editTicketCbFn = function (data1) {
         if(self.isLastApprover()) {          
		 // var eName = "Tickets Request Driven";
                   var trId = self.ticketRequestModel.id();
                    var sourceSystemId = employee_person_number + "_TICKETREQEUST_" +trId ;
               
                    var jsonBody = {
                        personNumber : employee_person_number,
                        elementName :self.elementName(), 
                        legislativeDataGroupName : "SA Legislative Data Group", 
                        assignmentNumber : "E" + employee_person_number, 
                        entryType : "E", 
                        creatorType : "H", 
                        sourceSystemId : sourceSystemId, 
                        trsId : trId,
                        SSType : "TR",
                        InitialAmount : self.ticketRequestModel.initialAmount(),
                        CompShare : self.ticketRequestModel.companyShare(),
                        EmpShare :self.ticketRequestModel.employeeShare(),
                        InstallmentAmount: self.ticketRequestModel.installmentAmount(),
                        TRID: trId
                      
    
                    };
                    var submitElement = function (data1) {
                    };
                   
                    
                
            services.submitElementEntry(JSON.stringify(jsonBody)).then(submitElement, app.failCbFn);					
	
                };
     }              
                
                services.editTicketReqeust(jsonData).then(editTicketCbFn, app.failCbFn);
//000
         }
         }
             
             rootViewModel.getNoOfNotifications();
            oj.Router.rootInstance.go('notifications');
            $.notify(self.approveNotify(), "success");

        };
        self.approveRewaardRequst= function(data, event) {
            if (self.clickedButton() != event.currentTarget.id) {
            
            self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                     "MSG_TITLE" : "Ticket Requst",
                    "MSG_BODY" : "Ticket Requst", 
                    "TRS_ID" : transactionId, 
                   "PERSON_ID" : rootViewModel.personDetails().personId(), 
                   "RESPONSE_CODE" : "APPROVED",
                   "ssType" : "TR"
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
            oj.Router.rootInstance.go('notifications');
              rootViewModel.updateNotificaiton(self.notiId());
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
                self.isDisabledCost(false);
                self.isRequired(true);
            }
            else 
            {  self.isDisabledCost(true);
                self.isPayroll(false);
            }

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);
                self.disablePeriod(true);
                self.isDisabledCost(true);
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
             
               var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName1().toString());          
             
            
            });
 function builTicketsReasonse() {
            self.reasonArr([]);         
            self.reasonArr(rootViewModel.globalHrTicketsReasons());         
        }
          function builTicketsRoute() {
           self.routeArr([]);///globalNadecTicketRautes   
             self.routeArr(rootViewModel.globalNadecTicketRautes());            
        }
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
        self.handleAttached = function (info) {
           builTicketsReasonse();
           builTicketsRoute();
            initTranslations();
            self.ticketRequestModel.employeeDateOfBirth(rootViewModel.personDetails().dateOfBirth());
           self.ticketClassArr(rootViewModel.globalSaaSTicketClass());
            if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                self.isDisabled(false);
                initTranslations();
            }

           services.gePayPeriodReport(personNumber).then(gePayPeriod, app.failCbFn);
           
//         var getLastApprove = function (data) {
//             self.roleType(data.items[0].role_type);
//             self.roleId(data.items[0].role_id);
//        };
        var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
        self.isLastApprover(rootViewModel.isLastApprover(transactionId,"TR"));
         self.elementName(rootViewModel.getElementName("TR")); //getElementName
         console.log(self.elementName());
       // services.getLastStepApproval(transactionId,"TR").then(getLastApprove, app.failCbFn);
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
        self.openDialog4 = function (){
         var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName4().toString());    
        
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
                 self.installmentAmountLbl(getTranslation("ticketRequest.installmentAmount"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));            
               self.ok(getTranslation("others.ok"));              
               self.back(getTranslation("others.back"));
               self.requestDate(getTranslation("labels.requestDate"));
              
               
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.reviewRewardRequst(getTranslation("ticketRequest.reviewTicket"));
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
            }

    }

    return ticketReqistNotificationViewModel;
});