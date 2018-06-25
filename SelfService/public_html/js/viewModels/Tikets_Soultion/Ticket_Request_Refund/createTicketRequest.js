define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper',
'config/services', 'ojs/ojtrain', 'ojs/ojbutton',
'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset', 'ojs/ojradioset',
'ojs/ojlabel','ojs/ojgauge', 'ojs/ojdialog'], 
function (oj, ko, $, app, commonUtil, services) {

    function createTicketRequestViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.progressValue=ko.computed(function() {
                return 0;
       }, this);
        
        this.disableSubmit = ko.observable(false);
         this.dataSourceTB2 = ko.observable();
         self.columnArrayPassangerDetails = ko.observableArray([]);
         self.dataTB2 = ko.observableArray([]);
        self.isEnapleClass=  ko.observable(true);
        self.isRequired= ko.observable(true);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
//        self.ageArray =ko.observableArray([ {"dependent1Age":ko.observable(),"dependent2Age":ko.observable()
//        ,"dependent3Age":ko.observable(),"dependent4Age":ko.observable()}])
        self.dependent1Age= ko.observable(0);
        self.dependent2Age= ko.observable(0);
        self.dependent3Age= ko.observable(0);
        self.dependent4Age= ko.observable(0);
        self.blanceStartDate= ko.observable("");
        self.blanceEndDate= ko.observable("");
        self.SaaSTotalAdult = ko.observable();
        self.SaaSTotalChild=ko.observable();
        self.PaaSTotalAdult = ko.observable();
        self.PaaSTotalChild=ko.observable();
        self.PaaSTotalRefundAdult = ko.observable();
        self.PaaSTotalRefundChild=ko.observable();
        self.adultBlance=ko.observable();
        self.isDesableEmloyeeAmount=ko.observable(true);
        self.isPassengerName1=ko.observable(true);
         self.isPassengerName2=ko.observable(true);
          self.isPassengerName3=ko.observable(true);
          self.isDisableDeb=ko.observable(false);
        self.chaildBlance=ko.observable();
         self.approvalDataSourceTB2 = ko.observable();
         self.approvaldataTB2 = ko.observableArray([]);
        self.prevEncludeEmployee=ko.observable();
         var x = rootViewModel.personDetails().hireDate();
          this.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
          this.specialistSummary = ko.observable("");//added
          self.columnArrayApproval = ko.observableArray([]);
         self.reasonArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
  self.routeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
   self.typeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.ticketClassArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.dependantNameArr1 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.dependantNameArr2 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.dependantNameArr3 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
self.dependantNameArr4 = ko.observableArray([
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
        self.dependentArray = ko.observableArray([ {
                   BIRTH_DATE:'',"FullNameEn":'', "FullNameAr":'',EMP_PERSON_NUMBER : '5', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

                }]);

          self.formatDate = function (date) {
            //var date = new Date()
            var month = '' + (date.getMonth() + 1), 
                day = '' + date.getDate(), 
                year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        //----------this function for culclte diffrent 
         self.difrentDateInMonth = function ()  
        {
            var date = self.formatDate(new Date())
        
         
         var z = Math.abs(new Date( x).getTime() -  new Date(date).getTime());
      
         
         var diffDays = Math.round(z/(1000 * 3600 * 24));
          
           var years = Math.floor(diffDays/365,1);
          
         
         return years.toString();
        }
        //--------------------------End------------------------------     
     //---------------Function To Set Blance Start Date And End Date ---------------------------
     self.setBlanceDate = function (hireDate) {
          var tempDate = new Date();
		  var tempmonth = tempDate.getMonth()+1 ;
             var    tempday =  tempDate.getDate();
              var   tempyear = tempDate.getFullYear();
		       tempDate = new Date( tempmonth + '/' + tempday + '/' + tempyear)
		  
		  
            var month = hireDate.getMonth()+1 ;
             var    day =  hireDate.getDate();
              var   year = hireDate.getFullYear();
			  var tempYear = tempDate.getFullYear();
              var comparesonDate  =new Date( month + '/' + day + '/' + tempYear);
            if (comparesonDate > tempDate){
                self.blanceEndDate(self.formatDate( new Date (month + '/' + day + '/' + tempYear)));
                tempYear = tempYear-1;
                self.blanceStartDate(self.formatDate( new Date( month + '/' + day + '/' + tempYear)));
            }else if(comparesonDate < tempDate){
              self.blanceStartDate(self.formatDate( new Date( month + '/' + day + '/' + tempYear)));
               tempYear = tempYear+1;
               self.blanceEndDate(self.formatDate( new Date (month + '/' + day + '/' + tempYear)));
            }
           
        } //
     //---------------------------End------------------------------------------
     //-----------------------Model ----------------------------------- self.ticketRequestModel.requestDate(self.formatDate(new Date()))
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
            imageBase64:ko.observable("")
            
        };
       
        
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info ) 
        {
        
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            //clearContent();

        };
         var getchildrenExpenseCbFn2 = (function (data) {
      
          var ind =0;
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);

               
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
                    ind++;
              }
                });    
             //   BuildDependentArray ();
             // self.dependantNameArr1([]);
             self.dependantNameArr1(BuildDependent2Array());
            });
//----------------------------getNumberOf Ticket Report call Back Function  --------------------
var getNumOfEmployeeTicketReport = (function (data) {
if(data) {
 var tempObject=  jQuery.parseJSON(data);
        self.SaaSTotalAdult(tempObject.ADULT);
        self.SaaSTotalChild(tempObject.CHILD);
          self.ticketRequestModel.contractType(tempObject.CONTRACT_STATUS);
        setEnableFeild();   
}
 
        
      
});
//----------------------------------END ------------------------
//-------------------FunctionTo Get Totol Ticket From PaaS-------------------
var getPaaSTotalTicket = (function (data) {
       
      if (data.items[0].totaladult){
        self.PaaSTotalAdult(data.items[0].totaladult);
        self.PaaSTotalChild(data.items[0].totalchild);
      }else{
          self.PaaSTotalAdult(0);
        self.PaaSTotalChild(0);
      }
        
});
//---------------------------End ---------------------------------
//---------------------Function To Get Total Refund Ticket ----------------------
var getPaaSTotalTicketRefund= (function (data) {
 if (data.items[0].totaladult){
  self.PaaSTotalRefundAdult(data.items[0].totaladult);
  self.PaaSTotalRefundChild(data.items[0].totalchild);
 }
 else{
     self.PaaSTotalRefundAdult(0);
      self.PaaSTotalRefundChild(0);
 }
});
//--------------Temp Function To Build Ticket Reasons  ------------------------
        function builTicketsReasonse() {
            self.reasonArr([]);
           
            self.reasonArr(rootViewModel.globalHrTicketsReasons());
            
        }
        function buildYesNo() {
            self.yesNoArr([]);          
            self.yesNoArr(app.getSaaSLookup(rootViewModel.globalYesNo().slice(0)));
            
        }//depTypeArr
    function buildDepType() {
            self.depTypeArr([]);///globalNadecTicketRautes
                 
             self.depTypeArr(app.getSaaSLookup(rootViewModel.globalNadecTripDirection1()));
        }
        //-------------------This Function To Build Route --------------------------
    function builTypeArr() {
            self.typeArr([]);///globalNadecTicketRautes
    
             self.typeArr(app.getSaaSLookup(rootViewModel.globalNadecTicketRefund()));
        }
  self.handleAttached = function (info) {
        builTicketsReasonse();
       
         builTypeArr();
          buildYesNo() ;
          buildDepType();
         
         self.ticketClassArr(app.getSaaSLookup(rootViewModel.globalSaaSTicketClass()));
         self.ticketRequestModel.ticketClass("E");
         self.ticketRequestModel.requestDate(self.formatDate(new Date()));
            var searchLocation = window.location.search;
           
              if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                   
                   self.ticketRequestModel.hireDate(rootViewModel.specialistSelectedEmployee().HireDate);
                   self.ticketRequestModel.personName(rootViewModel.specialistSelectedEmployee().DisplayName);
                   self.ticketRequestModel.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);//personId
                   self.ticketRequestModel.personId(rootViewModel.specialistSelectedEmployee().PersonId);
                   self.ticketRequestModel.createdBy(rootViewModel.personDetails().personId());//personId
                   self.ticketRequestModel.managerId(rootViewModel.personDetails().personId());//employeeDateOfBirth
                }
                else {
                   self.specialistSummary("false");
                   self.ticketRequestModel.hireDate(rootViewModel.personDetails().hireDate());
                   self.ticketRequestModel.personName(rootViewModel.personDetails().displayName());
                   self.ticketRequestModel.personNumber(rootViewModel.personDetails().personNumber());//personId
                   self.ticketRequestModel.personId(rootViewModel.personDetails().personId());
                   self.ticketRequestModel.createdBy(rootViewModel.personDetails().personId());//personId
                   self.ticketRequestModel.managerId(rootViewModel.personDetails().managerId());//employeeDateOfBirth
                  // self.ticketRequestModel.employeeDateOfBirth(rootViewModel.personDetails().dateOfBirth());
                }//addded
            self.currentStepValue('stp1');
            self.progressValue = ko.computed(function () {       
                return precantageOField(self.ticketRequestModel, 15);
            },
            this);
             services.getDependentsName(self.ticketRequestModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);//geNumOfEmployeeTickets
            services.geNumOfEmployeeTickets(self.ticketRequestModel.personId()).then(getNumOfEmployeeTicketReport, app.failCbFn);
            initTranslations();   
            self.setBlanceDate(new Date(self.ticketRequestModel.hireDate()));//100000000650826
             //services.getTotalTicket( "100000000650826", self.blanceStartDate(),self.blanceEndDate(),0).then(getPaaSTotalTicket, app.failCbFn);//getTotalTicketRefund
          services.getTotalTicket( self.ticketRequestModel.personId(), self.blanceStartDate(),self.blanceEndDate(),0).then(getPaaSTotalTicket, app.failCbFn);
           services.getTotalTicketRefund( self.ticketRequestModel.personId(), self.blanceStartDate(),self.blanceEndDate(),0).then(getPaaSTotalTicketRefund, app.failCbFn);
        };
        self.handleDetached = function (info) {
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
             setBlance();
             
            if(self.ticketRequestModel.requestType()=="ROAD"||self.ticketRequestModel.requestType()=="ANN"){
		if (self.adultBlance()<self.ticketRequestModel.adult()){
		  showNotify('error', self.adultBlanceError ());
                  event.preventDefault();
		  return 
		}
		
		if (self.chaildBlance()<self.ticketRequestModel.child()){
		showNotify('error',self.chaildBlanceError());
                event.preventDefault();
		  return 
		}
            }   
           var nationality =  rootViewModel.personDetails().citizenshipLegislationCode();
          
            if((self.ticketRequestModel.requestType()=="ROAD"||self.ticketRequestModel.requestType()=="ANN" ||self.ticketRequestModel.requestType()=="NEW_FAMILY")&&nationality=="SA"){
		
		  showNotify('error',self.saudiError());
                  event.preventDefault();
		  return 
		}
                
                
                var preview = document.querySelector('.attClass');
                 self.ticketRequestModel.imageBase64(preview.src);

                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.AttachmentError(), "error");
                       event.preventDefault();
                       return;
                } 
           
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        function getdateAfterOneYear()
        {
           var validDate ;
        
            var today = new Date('01/05/2013');
             var todayDay = today.getDate();
            var todaymm = today.getMonth() + 1;//January is 0!
            var todayyyyy = today.getFullYear();
            var avilableDate = new Date(self.ticketRequestModel.hireDate());//set "today" to October 31, 2008
            var dd = avilableDate.getDate();
            var mm = avilableDate.getMonth() + 1;//January is 0!
            var yyyy = avilableDate.getFullYear();
           today = todaymm + '/' + todayDay + '/' + todayyyyy;
           avilableDate = mm + '/' + ++dd + '/' + ++yyyy;
           
          
           
           if (new Date(avilableDate).valueOf() <new Date(today).valueOf())
           {
           validDate = true;
           
           }
           else {validDate = false;}
           return validDate ;
        }
        function setBlance(){
                var adultBlance = self.SaaSTotalAdult()-(self.PaaSTotalAdult()+ self.PaaSTotalRefundAdult());
		var chaildBlance = self.SaaSTotalChild()-(self.PaaSTotalChild()+self.PaaSTotalRefundChild());
		self.adultBlance(adultBlance);
		self.chaildBlance(chaildBlance);
		
        }
//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
              getdateAfterOneYear();
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }                                  
            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }
        function setEnableFeild(){
        if(self.ticketRequestModel.passengerName1().toString()){
                 self.isPassengerName1(false);
             }else{
                 self.isPassengerName1(true);
             }
             if(self.ticketRequestModel.passengerName2().toString()){
                 self.isPassengerName2(false);
             }else{
                 self.isPassengerName2(true);
             }
             if(self.ticketRequestModel.passengerName3().toString()){
                 self.isPassengerName3(false);
             }else{
                 self.isPassengerName3(true);
             }
            if( self.SaaSTotalAdult()+self.SaaSTotalChild()<=1){
                 self.isDisableDeb(true);
            }else{
              self.isDisableDeb(false);
            }
           if (self.ticketRequestModel.requestType()=="BTR"){
              self.isEnapleClass(false);     
              }else{
                   self.isEnapleClass(true); 
              }
        
             
        }
        //---------------------------End OF Validation ----------------------
        //---------------------Type Change Handler ----------------------------
        self.typeChangedHandler  = function (event, data) {
       
             
              if (self.ticketRequestModel.requestType()=="BTR"){
              self.isEnapleClass(false);     
              }else{
                   self.isEnapleClass(true); 
              }
        }
        //-----------------------End -------------------------
        //--------------------------Employee Include Change Handler ----------------------employeeIncludeChangedHandler
 self.employeeIncludeChangedHandler  = function (event, data) {
    if (data.option == 'value' && data.value[0] !=null) {
  // self.ticketRequestModel.employeeIncluded( self.ticketRequestModel.employeeIncluded().toString());
        
        if (self.ticketRequestModel.employeeIncluded().toString()=="Y"){
            self.isDesableEmloyeeAmount(false);
           self.prevEncludeEmployee("N");
        }else {
             self.isDesableEmloyeeAmount(true);
            
            
             self.ticketRequestModel.employeeAmount(0)
             if(self.ticketRequestModel.adult()>0){
              //   self.ticketRequestModel.adult(self.ticketRequestModel.adult()-1); 
             }
             
        }
        updateChildAndAdult();
        
    }
   }
        //--------------------------End ----------------------------
        ////------------------------AmountChange Handler -----------------------
    self.passengerCost1ChangedHandler  = function (event, data) {
      self.ticketRequestModel.totalTicketsAmount( parseInt(self.ticketRequestModel.passengerCost1())+   parseInt(self.ticketRequestModel.passengerCost2())+  parseInt( self.ticketRequestModel.passengerCost3())+
  parseInt(self.ticketRequestModel.employeeAmount()));
    if (data.option == 'value' && data.value[0] !=null) {
  
    }
   }
    self.passengerCost2ChangedHandler  = function (event, data) {
      self.ticketRequestModel.totalTicketsAmount( parseInt(self.ticketRequestModel.passengerCost1())+   parseInt(self.ticketRequestModel.passengerCost2())+  parseInt( self.ticketRequestModel.passengerCost3())+
  parseInt(self.ticketRequestModel.employeeAmount()));
    if (data.option == 'value' && data.value[0] !=null) {
     
    }
   }
   self.passengerCost3ChangedHandler  = function (event, data) {
    self.ticketRequestModel.totalTicketsAmount( parseInt(self.ticketRequestModel.passengerCost1())+   parseInt(self.ticketRequestModel.passengerCost2())+  parseInt( self.ticketRequestModel.passengerCost3())+
  parseInt(self.ticketRequestModel.employeeAmount()));
   if (data.option == 'value' && data.value[0] !=null) {
     
     }
   }
 self.employeeAmountChangedHandler  = function (event, data) {
  self.ticketRequestModel.totalTicketsAmount( parseInt(self.ticketRequestModel.passengerCost1())+   parseInt(self.ticketRequestModel.passengerCost2())+  parseInt( self.ticketRequestModel.passengerCost3())+
  parseInt(self.ticketRequestModel.employeeAmount()));
   if (data.option == 'value' && data.value[0] !=null) {
      self.ticketRequestModel.totalTicketsAmount( parseInt(self.ticketRequestModel.passengerCost1())+   parseInt(self.ticketRequestModel.passengerCost2())+  parseInt( self.ticketRequestModel.passengerCost3())+
  parseInt(self.ticketRequestModel.employeeAmount()));
     }
   }
   //--------------------------End --------------------------------
//--------------------Selection Change Handler Section ---------------------------
self.passengerName1ChangedHandler = function (event, data) {  
          
            if (data.option == 'value' && data.value[0] !=null) {
              var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName1().toString());
                
              var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
              self.dependent1Age(age);
             // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
             updateChildAndAdult();
             self.dependantNameArr2(BuildDependent2Array());
             if(self.ticketRequestModel.passengerName1().toString()){
                 self.isPassengerName1(false);
             }else{
                 self.isPassengerName1(true);
             }
             
               if(document.getElementById("passengerName2")){
               self.ticketRequestModel.passengerName2("")
               self.dependent2Age(-1)
                document.getElementById("passengerName2").reset();
                 self.dependantNameArr2(BuildDependent2Array());
            }
            }else{
            self.dependent1Age(-1)
            updateChildAndAdult();
                self.ticketRequestModel.passengerCost1(0)
            }
          
            
}
self.passengerName2ChangedHandler = function (event, data) {    
       if(event.detail){  
       console.log(event.detail.value);
            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
           
            if(self.ticketRequestModel.passengerName2()){
              var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName2().toString());            
              var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
              self.dependent2Age(age);
             // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
           
             self.dependantNameArr3(BuildDependent2Array());
             if(self.ticketRequestModel.passengerName2().toString()){
                 self.isPassengerName2(false);
             }else{
                 self.isPassengerName2(true);
             }
            }
            
        if(document.getElementById("passengerName3")){
        self.ticketRequestModel.passengerName3("")
               self.dependent3Age(-1)
               document.getElementById("passengerName3").reset();
               }
        }
              updateChildAndAdult();

       }else{       
          self.ticketRequestModel.passengerCost2(0);
        }
}
self.passengerName3ChangedHandler = function (event, data) {
           if(event.detail){
             if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
              var depArrIndex=  getDependentIndex(self.ticketRequestModel.passengerName3().toString());
             
              var age =self.dependentArray()[depArrIndex].BIRTH_DATE;
              self.dependent3Age(age);
             // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
             updateChildAndAdult();
             if(self.ticketRequestModel.passengerName3().toString()){
                 self.isPassengerName3(false);
             }else{
                 self.isPassengerName3(true);
                  self.ticketRequestModel.passengerCost3(0);
             }
            }
     }else{       
          self.ticketRequestModel.passengerCost3(0);
        }
}

function updateChildAndAdult()
{  self.ticketRequestModel.child(0);
   self.ticketRequestModel.adult(0);
   
   
     if (self.dependent1Age() <19 &&self.dependent1Age() >0 &&self.ticketRequestModel.passengerName1())
              {self.ticketRequestModel.child(self.ticketRequestModel.child()+1);            
              }
     else if (self.dependent1Age() >=19 &&(self.ticketRequestModel.passengerName1()&& self.ticketRequestModel.passengerName1().length>0))
              {self.ticketRequestModel.adult(self.ticketRequestModel.adult()+1);}
              
if(self.ticketRequestModel.passengerName2())  {
     if (self.dependent2Age() <19 &&self.dependent2Age() >0 && (self.ticketRequestModel.passengerName2()||self.ticketRequestModel.passengerName2().length>0))
              {self.ticketRequestModel.child(self.ticketRequestModel.child()+1);              
              }
     else if (self.dependent2Age() >=19&& (self.ticketRequestModel.passengerName2()&& self.ticketRequestModel.passengerName2().length>0))
              {self.ticketRequestModel.adult(self.ticketRequestModel.adult()+1);}
          }         
    if(self.ticketRequestModel.passengerName3())  { 
    if (self.dependent3Age() <19 &&self.dependent3Age()>0&&self.ticketRequestModel.passengerName3())
              {self.ticketRequestModel.child(self.ticketRequestModel.child()+1);             
              }
     else if (self.dependent3Age() >=19 &&(self.ticketRequestModel.passengerName3()&& self.ticketRequestModel.passengerName3().length>0))
              {self.ticketRequestModel.adult(self.ticketRequestModel.adult()+1);}
    }
    if (self.ticketRequestModel.employeeIncluded()=='Y')
              {self.ticketRequestModel.adult(self.ticketRequestModel.adult()+1);             
              }
    
               

        
       console.log("adult" + self.ticketRequestModel.adult());  
        console.log("child"+self.ticketRequestModel.child());  
   
    
}

//--------------End Selction Section ---------------------------------
//Function To Build Dependnt Array 2
function BuildDependent2Array (){
var temparr = [];

for (var i =0; i <self.dependentArray().length;i++)
{ 
   if (document.documentElement.lang == "ar")
   { 
      if(self.ticketRequestModel.passengerName1()!=self.dependentArray()[i].FullNameAr&&
      self.ticketRequestModel.passengerName2()!=self.dependentArray()[i].FullNameAr&&
      self.ticketRequestModel.passengerName3()!=self.dependentArray()[i].FullNameAr)
      {
     temparr.push({"value":self.dependentArray()[i].FullNameAr,"label":self.dependentArray()[i].FullNameAr});
      }
   }
   else if (self.ticketRequestModel.passengerName1()!=self.dependentArray()[i].FullNameEn&&
      self.ticketRequestModel.passengerName2()!=self.dependentArray()[i].FullNameEn&&
      self.ticketRequestModel.passengerName3()!=self.dependentArray()[i].FullNameEn)
   {
      temparr.push({"value":self.dependentArray()[i].FullNameEn,"label":self.dependentArray()[i].FullNameEn});
   }

}

       return temparr ;
}
//-------------------End Of Function ------------------------------
//Function To Build Dependnt Array 3,4
function BuildDependent3Array (depArrIndex1){
var temparr = [];
for (var i =0; i <self.dependentArray().length;i++)
{
   if (depArrIndex1!=i&&document.documentElement.lang == "ar")
   {
     temparr.push({"value":self.dependentArray()[i].FullNameAr,"label":self.dependentArray()[i].FullNameAr});
   }
   else if (depArrIndex1!=i)
   {
      temparr.push({"value":self.dependentArray()[i].FullNameEn,"label":self.dependentArray()[i].FullNameEn});
   }

}

       return temparr ;
}
//-------------------End Of Function ------------------------------
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
        self._showComponentValidationErrors = function (trackerObj) 
        {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;
                

            return true;
        }

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);
                     self.isPassengerName1(true);
         self.isPassengerName2(true);
          self.isPassengerName3(true);
          self.isDisableDeb(true);
                

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
                 setEnableFeild();
            }

            return self.ticketRequest();
        };
        this.submitButton = function () {
            self.ticketRequestModel.IS_DRAFT("No");
              self.ticketRequestModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
          
          
        
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addTicketRequestModelRecord();
            return true;
        }
            //save draft
        this.submitDraft = function () {
            self.ticketRequestModel.IS_DRAFT("YES");
            self.ticketRequestModel.status("DRAFT" );
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addTicketRequestModelRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction = function () {
           
                if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
        }
        

        function addTicketRequestModelRecord() {   
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
         
           self.ticketRequestModel.employeeIncluded(self.ticketRequestModel.employeeIncluded()[0]);
           self.ticketRequestModel.passengerName1(self.ticketRequestModel.passengerName1()[0]);
          // self.ticketRequestModel.passengerName2(self.ticketRequestModel.passengerName2());
           self.ticketRequestModel.passengerName3(self.ticketRequestModel.passengerName3()[0]);
           self.ticketRequestModel.dependent1TicketTripType(self.ticketRequestModel.dependent1TicketTripType().toString());
           if(self.ticketRequestModel.dependent2TicketTripType()){
               self.ticketRequestModel.dependent2TicketTripType(self.ticketRequestModel.dependent2TicketTripType().toString());
           }
         if (self.ticketRequestModel.dependent3TicketTripType()){
              self.ticketRequestModel.dependent3TicketTripType(self.ticketRequestModel.dependent3TicketTripType().toString())
         }
         
          self.ticketRequestModel.ticketClass(self.ticketRequestModel.ticketClass().toString());
            self.ticketRequestModel.route(self.ticketRequestModel.route()[0]);
            
            var jsonData = ko.toJSON(self.ticketRequestModel);
                 
            var addTicketRequestCbFn = function (data) {
                $.notify(self.notifySuccess(), "success");
                if(self.specialistSummary() == 'true'){
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
                }
                    }
                    else{
             if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
                    }//added
                self.disableSubmit(false); 
            };
            services.addNewTicketReqeustRefund(jsonData).then(addTicketRequestCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {
            self.ticketRequestModel.requestDate(" " );
            self.ticketRequestModel.travelDate("");
            self.ticketRequestModel.reason(" " );
            self.ticketRequestModel.hireDate(" " );
            self.ticketRequestModel.tso(" " );           
            self.ticketRequestModel.route(" " );
            self.ticketRequestModel.passengerName1(" " );
            self.ticketRequestModel.passengerName2(" " );
            self.ticketRequestModel.passengerName3(" " );
           
            self.ticketRequestModel.passengerCost1(" " );
            self.ticketRequestModel.passengerCost2(" " );
            self.ticketRequestModel.passengerCost3(" " );
         
            self.ticketRequestModel.initialAmount(" " );
            self.ticketRequestModel.child(" " );
            self.ticketRequestModel.adult(" " );
            self.ticketRequestModel.ticketClass(" " );
           self.ticketRequestModel.companyShare(" " );
           self.ticketRequestModel.employeeShare(" " );
           self.ticketRequestModel.installmentAmount(" " );
            self.ticketRequestModel.totalAccruedTickets(" " );  
            self.ticketRequestModel.processingPeriod(" " );
            self.ticketRequestModel.firstInstallmentPeriod(" " );
            self.ticketRequestModel.createdBy(" " );
            self.ticketRequestModel.creationDate(" " );
            self.ticketRequestModel.personName(" " );
            self.ticketRequestModel.personNumber(" " );
            self.ticketRequestModel.personId(" " );
            self.ticketRequestModel.name(" " );
            self.ticketRequestModel.comments(" " );
            self.ticketRequestModel.managerId(" " );
            self.ticketRequestModel.IS_DRAFT(" " );
            self.ticketRequestModel.status(" " );
           
            self.ticketRequestModel.IS_Coordinator_Travel (" " );
            self.dependantNameArr4([]);
            self.dependantNameArr3([]);
            self.dependantNameArr2([]);
            self.dependantNameArr1([]);

            
           
        }
        self.handleDeactivated = function ()
        {
          
          clearContent()
         
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
        //------------------------------Approval Dialog  Section -----------------------------
        this.closeApprovalDialog = function () {
            $("#modalApprovalDialog").ojDialog("close");
        }
         this.openApprovalDialog = function () {
   //approvalDataSourceTB2
            var getApprovalList = function (data) {
                self.approvaldataTB2([]);
                $.each(data.items, function (i, item) {
                    self.approvaldataTB2.push( {
                        name : "Ticket Refund ", type : item.notification_type, status : item.role_type

                    });

                });
                self.approvalDataSourceTB2(new oj.ArrayTableDataSource(self.approvaldataTB2));
                $("#modalApprovalDialog").ojDialog("open");
            };

            services.getWprkFlowAppovalList('TRF').then(getApprovalList, app.failCbFn);

        }
        //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();           
            self.notifySuccess= ko.observable();
            self.requestDate=ko.observable();
            self.hireDate=ko.observable();
            self.tso=ko.observable();
            self.reason=ko.observable();
           self.ticketRequest=ko.observable();
              self.attachment = ko.observable();          
            self.ticketsRouteLbl=ko.observable();            
            self.reason=ko.observable();
            self.ticketsTravelDatelbl=ko.observable();
            self.notifyValidation=ko.observable();
            self.notifyValidationAmount=ko.observable();
            self.notifyValidationYear=ko.observable();
            self.totalAccruedTicketsLbl = ko.observable();
            self.totalChildrenLbl = ko.observable();
            self.totalAdultsLbl = ko.observable();
            self.adminNotify=ko.observable();
               self.comment=ko.observable();
                self.AttachmentError=  ko.observable();
            self.saveDraft = ko.observable();
             self.placeholder = ko.observable();
            self.passengerNameLbl= ko.observable();
            self.passengerDetails= ko.observable();
            self.passengerDateOfBirth= ko.observable();
             self.relation= ko.observable();
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
             self.saudiError=ko.observable();
             self.adultBlanceError =ko.observable();
             self.chaildBlanceError=ko.observable();
            self.approvals = ko.observable();
             self.viewApprovalsLbl = ko.observable();
             self.ServiceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
             var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
                               
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });

            function initTranslations() {
                 builTicketsReasonse();
       
         builTypeArr();
          buildYesNo() ;
          buildDepType();
               self.ok(getTranslation("others.ok"));
               self.back(getTranslation("others.pervious"));
               self.next(getTranslation("others.next"));
               self.cancel(getTranslation("others.cancel"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));
               self.create(getTranslation("labels.create"));
               self.review(getTranslation("others.review"));           
               self.addMessage (getTranslation("ticketRequest.addMessageRefund"));
               self.notifySuccess (getTranslation("ticketRequest.notifCreate"));
               self.requestDate(getTranslation("labels.requestDate"));
               self.hireDate(getTranslation("ticketRequest.hireDate"));
               self.tso(getTranslation("ticketRequest.tso"));
               self.reason(getTranslation("ticketRequest.reason"));
               self.totalAccruedTicketsLbl(getTranslation("ticketRequest.totalAccruedTickets"));
               self.totalChildrenLbl(getTranslation("ticketRequest.totalChildren"));
                self.totalAdultsLbl(getTranslation("ticketRequest.totalAdults"));
               self.ticketRequest(getTranslation("ticketRequest.TicketRequestRefund"));
               self.ticketsRouteLbl(getTranslation("ticketRequest.ticketsRoute"));
               self.passengerNameLbl(getTranslation("ticketRequest.passengerName"));
               self.reason(getTranslation("rewardRequest.reason"));
               self.ticketsTravelDatelbl(getTranslation("ticketRequest.ticketsTravelDate"));
               self.notifyValidation(getTranslation("rewardRequest.notifyValidation"));          
              // self.notifyValidationAmount(getTranslation("rewardRequest.notifyValidationAmount")); 
              // self.notifyValidationYear(getTranslation("rewardRequest.notifyValidationYear")); 
               self.adminNotify(getTranslation("labels.adminNotify"));  
              
               self.comment(getTranslation("others.comment"));
               self.saveDraft(getTranslation("labels.saveDraft"));     
               self.placeholder(getTranslation("labels.placeholder"));
               self.passengerDetails (getTranslation("ticketRequest.passengerDetails"));
               self.passengerDateOfBirth (getTranslation("ticketRequest.DOB"));//relation
                self.relation (getTranslation("ticketRequest.relation"));
                self.returnDateLbl (getTranslation("ticketRequest.returnDate"));
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
             self.saudiError(getTranslation("ticketRequest.saudiError"));
             self.adultBlanceError(getTranslation("ticketRequest.adultBlance"));
             self.chaildBlanceError(getTranslation("ticketRequest.childBlance"));
              self.approvals(getTranslation("labels.approvals"));
               self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
            self.columnArrayApproval([
            {
                "headerText" : self.ServiceName(), "field" : "name"
            },
            {
                "headerText" : self.notificationType(), "field" : "type"
            },
            {
                "headerText" : self.employeeRole(), "field" : "status"
            }
]);
              // self.dependantNameArr1(BuildDependent2Array());
            }    
            self.label = {text: self.progressValue(), style: {color:'white'}};       
         self.thresholdValues = [{max: 33}, {max: 67}, {}];
    }
    return new createTicketRequestViewModel();
});