define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox','appController', 'config/services',
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], 
function (oj, ko, $, postbox,app,services) {

    function ViewTicketRrequst() {
        var self = this;
         var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.isVisible=ko.observable(false);
         self.isDisabled =ko.observable(true);
          this.dataSourceTB2 = ko.observable();
          self.dataTB2 = ko.observableArray([]);
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
            self.dependentArray = ko.observableArray([ {
                   BIRTH_DATE:'',"FullNameEn":'', "FullNameAr":'',EMP_PERSON_NUMBER : '5', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

                }]);
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
            "SSType":"TRF"
        };
    //-----------------------------End Of Model --------------------
            
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
            self.ticketRequestModel.passengerCost1(newValue.passengerCost1);
            self.ticketRequestModel.passengerCost2(newValue.passengerCost2);
            self.ticketRequestModel.passengerCost3(newValue.passengerCost3);
            //self.ticketRequestModel.initialAmount(newValue.initial_amount);
            self.ticketRequestModel.child(newValue.child);
            self.ticketRequestModel.adult(newValue.adult);      
           self.ticketRequestModel.companyShare(newValue.companyShare);
          // self.ticketRequestModel.employeeShare(newValue.employee_share);
          // self.ticketRequestModel.installmentAmount(newValue.installment_amount);
            self.ticketRequestModel.totalAccruedTickets (newValue. totalAccruedTickets);
           self.ticketRequestModel.processingPeriod(newValue.processing_period);
            self.ticketRequestModel.firstInstallmentPeriod(newValue.first_installment_period);
            self.ticketRequestModel.createdBy(newValue.created_by);
            self.ticketRequestModel.creationDate(newValue.creation_date);
            self.ticketRequestModel.personName(newValue.personName);
            self.ticketRequestModel.personNumber(newValue.personNumber);
            self.ticketRequestModel.personId(newValue.personId);
                 
            self.ticketRequestModel.comments(newValue.comments);
            self.ticketRequestModel.managerId(newValue.manager_person_id);
           
            self.ticketRequestModel.status(newValue.status);
            self.ticketRequestModel.requestType(newValue.requestType);
            self.ticketRequestModel.contractType(newValue.contractType);
            self.ticketRequestModel.employeeIncluded(newValue.employeeIncluded);
            self.ticketRequestModel.employeeAmount(newValue.employeeAmount);
            self.ticketRequestModel.passengerCost1(newValue.passengerCost1);
            self.ticketRequestModel.passengerCost2(newValue.passengerCost2);
            self.ticketRequestModel.passengerCost3(newValue.passengerCost3);
            self.ticketRequestModel.dependent1TicketTripType(newValue.dependent1TicketTripType);
            self.ticketRequestModel.dependent2TicketTripType(newValue.dependent2TicketTripType);
            self.ticketRequestModel.dependent3TicketTripType(newValue.dependent3TicketTripType);
            self.ticketRequestModel.totalTicketsAmount(newValue.totalTicketsAmount);
            self.ticketRequestModel.returnDate(newValue.returnDate);
             self.ticketRequestModel.imageBase64(newValue.imageBase64);
        });
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
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
             
              // var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName1().toString());          
             
            
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

        self.handleActivated = function (info) {
           
            }   

        //------------------------End--------------------------------
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
        self.handleAttached = function (info) {
        builTypeArr();
          buildYesNo() ;
          buildDepType();
           var preview = document.querySelector('.attClass');
              preview.src = self.ticketRequestModel.imageBase64();
        self.ticketClassArr(rootViewModel.globalSaaSTicketClass());
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            initTranslations();
            services.getDependentsName(self.ticketRequestModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);
        }

        self.backAction = function () {
       
 if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
        }
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
             self.passengerDateOfBirth= ko.observable();
             self.relation= ko.observable();
             self.passengerDetails= ko.observable();
             self.columnArrayPassangerDetails = ko.observableArray([]);
             self.ok = ko.observable();
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
               self.ok(getTranslation("others.ok"));   
               
            }
    }

    return ViewTicketRrequst;
});