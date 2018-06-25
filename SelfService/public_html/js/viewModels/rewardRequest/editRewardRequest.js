define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services) {

    function EditRewardRequestModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var hireDate="";
     
        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var personNumber = rootViewModel.personDetails().personNumber();
        this.disableSubmit = ko.observable(false);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
         this.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
         this.specialistSummary = ko.observable("");//added

          self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.rewardRequestModel = {
                  
            requestDate : ko.observable(self.formatDate(new Date())),
           servicePeriod : ko.observable(""),
           endOfServiceAmount : ko.observable(""),
           paidEndOfService : ko.observable(""), 
           lastEosPaymentDate : ko.observable("   "),
            allowedAmount : ko.observable(""),
            requestedAmount : ko.observable(""),
            reason : ko.observable(""),
           payment_period : ko.observable("    "),
            id:ko.observable()
            ,ID:ko.observable(),
             commment:ko.observable(" "),
             IS_DRAFT:ko.observable(""),
            status:ko.observable(""),
            IS_Assistant_Manager:ko.observable(""),
             hireDate:ko.observable(""),
            IS_Mannager:ko.observable("")
          
        };
           //---------------- get Object from prev Page --------------------------------------------
           ko.postbox.subscribe("editRewardREquestObj", function (newValue)
           { 
         

                            self.rewardRequestModel.requestDate(newValue.request_date);
                            self.rewardRequestModel.servicePeriod(newValue.service_period);
                            self.rewardRequestModel.endOfServiceAmount(newValue.end_of_service_amount);
                            self.rewardRequestModel.paidEndOfService(newValue.paid_end_of_service);
                            self.rewardRequestModel.lastEosPaymentDate(newValue.last_eos_payment_date);
                            self.rewardRequestModel.allowedAmount(newValue.allowed_amount);
                            self.rewardRequestModel.requestedAmount(newValue.requested_amount);
                            self.rewardRequestModel.reason(newValue.reason);
                            self.rewardRequestModel.payment_period(newValue.payment_period);
                            self.rewardRequestModel.id(newValue.id);
                            self.rewardRequestModel.ID(newValue.id);
                            self.rewardRequestModel.commment(newValue.commment);///hireDate
                            self.rewardRequestModel.hireDate(newValue.hireDate);
                              
                             
                            

        });
        //--------------------------End---------------------------------------------------
             //----------this function for culclte diffrent 
         self.difrentDateInMonth = function ()  
        {
            var date = self.formatDate(new Date());      
         var z = Math.abs(new Date( self.rewardRequestModel.hireDate()).getTime() -  new Date(date).getTime());       
         var diffDays = Math.round(z/(1000.00 * 3600.00 * 24.00));      
         var years = Math.round(diffDays/365,1);                
         return years.toString();
        }
        //--------------------------End------------------------------
                //--------------------This Function For counting Employee GratuityBalance (End OF Service Amount)
        var getEmployeeGratuityBalance =function(data)
        {
            parser = new DOMParser();
            xmlDOC = parser.parseFromString(data, "text/xml");
            $xml = $(xmlDOC);
            var documents = $xml.find('DATA_DS');
            var sum =0;
            documents.children('G_1').each(function () 
            {
               sum = sum+parseInt($(this).find('SUM_PLB_BALANCE_VALUE_').text());
            });
           
            self.rewardRequestModel.endOfServiceAmount(sum);
            
            
           
            self.getAllowedAmount();
           
    
        
          
        }
        //----------------End---------------------------------------------
 //------------This Function For counting Part of End of service Balance (Paid End OF Service)-----------------------------
        var getPartOfEosSumReport =function(data)
        {    
            parser = new DOMParser();
            xmlDOC = parser.parseFromString(data, "text/xml");
            $xml = $(xmlDOC);
             var documents = $xml.find('DATA_DS');
            var sum =0;
            documents.children('G_1').each(function () 
            {
               sum = sum+parseInt($(this).find('SUM_PLB_BALANCE_VALUE_').text());
               
            });       
            self.rewardRequestModel.paidEndOfService(sum);
            
            if (self.rewardRequestModel.endOfServiceAmount()!=0)
            {
            self.getAllowedAmount();
            }          
        }
        //---------------------End---------------------------------------------------
                self.getAllowedAmount = function ()  
        {
        
         var  allowedAmount = 0 ;
         var servicePeriod = self.difrentDateInMonth();
         if (servicePeriod<4)
         {
         self.rewardRequestModel.allowedAmount(allowedAmount);
         }
         else if (servicePeriod>4&&servicePeriod<=6)
         {
         var udtValue  = udtLookup("XXX_HR_PART_OF_EOS_AMT","Years",4)/100;
          
        allowedAmount = udtValue*self.rewardRequestModel.endOfServiceAmount()-self.rewardRequestModel.paidEndOfService();
      
        self.rewardRequestModel.allowedAmount(allowedAmount);
         }
         else 
         {
            var udtValue2  = udtLookup("XXX_HR_PART_OF_EOS_AMT","Years",6.01)/100;
           
            var endOfServiceAmount = parseInt(self.rewardRequestModel.endOfServiceAmount());
            var paidEndOfService = parseInt(self.rewardRequestModel.paidEndOfService());
                              
            allowedAmount = udtValue2*endOfServiceAmount- paidEndOfService;
             
            self.rewardRequestModel.allowedAmount(allowedAmount);
            
         }
         if (allowedAmount<0)
         {
            self.rewardRequestModel.allowedAmount(0);
         }
         
         
        }
        //---------------------End OF Allowed Amount -----------------------
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            clearContent();
        services.getPartOfEosSumReport(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getPartOfEosSumReport, app.failCbFn); 
        services.getGratuityAccruedReport(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getEmployeeGratuityBalance, app.failCbFn);

        };

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }//addded
            self.currentStepValue('stp1');
            initTranslations();
        };
        self.handleDetached = function (info) {

        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray( 
                         [{label : 'Edit', id : 'stp1'},
                          {label : 'Review', id : 'stp2'}]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        function addDays(startDate, numberOfDays) {
return new Date(startDate.getTime() + (numberOfDays * 24 *60 * 60 * 1000));
}
        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
           
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
              if (self.rewardRequestModel.endOfServiceAmount()=="")
            {
            
//               self.rewardRequestModel.allowedAmount();
//               self.rewardRequestModel.paidEndOfService()
             $.notify(self.adminNotify(), "error");
                 return;
            }
            
          
            if (parseInt(self.rewardRequestModel.allowedAmount())<parseInt(self.rewardRequestModel.requestedAmount()))
            {
             
             $.notify(self.notifyValidationAmount(), "error");
                 return;
            }
            if (udtLookup("XXX_HR_GLOBAL_VALUES","Value","Part of EOS Minimum Years")>self.rewardRequestModel.servicePeriod())
            {
               $.notify(self.notifyValidationYear(), "error");
            return ;
            }
            if(parseInt(self.rewardRequestModel.allowedAmount())<=0)
            {
                 $.notify(self.notifyValidation(), "error");
               return ;
            }
                    var date = new Date();
            
            if(self.rewardRequestModel.lastEosPaymentDate()){
            if (self.formatDate( addDays(new Date(self.rewardRequestModel.lastEosPaymentDate()),365*4 ))>self.formatDate(date)){
            $.notify(self.notifyValidationWindow(), "error");
               return ;
              }
            }

            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function ()
        {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.rewardRequest();
        };
        function udtLookup(tableName, colName, rowName) {
            var searchUDTArray = rootViewModel.globalUDTLookup();
           
            for (var i = 0;i < searchUDTArray.length;i++) 
            {
                
                if (searchUDTArray[i].tableName === tableName && searchUDTArray[i].colName === colName && searchUDTArray[i].rowName === rowName) 
                {
                      
                    return searchUDTArray[i].value;
                }
            }
        }
        this.submitButton = function () {
        self.rewardRequestModel.IS_DRAFT("No");
              self.rewardRequestModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
    function approvalMatrix(){
            if(!self.rewardRequestModel.managerId()){
                self.rewardRequestModel.IS_Mannager ("Yes");
            }else{
                 self.rewardRequestModel.IS_Mannager ("NO");
            }
        }
     this.submitDraft = function () {
           approvalMatrix()
            self.rewardRequestModel.IS_DRAFT("YES");
            self.rewardRequestModel.status("PENDING_APPROVED" );
            document.querySelector("#draftDialog").open();
        };
        self.commitRecord = function (data, event) {
            editRewardRequestModelRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        this.cancelAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('rewardRequestSummary');
                }//added
        }
        

        function editRewardRequestModelRecord() {
       
            var jsonData = ko.toJSON(self.rewardRequestModel);
           if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
            var editBTripDriverCbFn = function (data) {
               
               var editApprovalspCbFn = function (data) {
                 $.notify(self.notifyEdited(), "success");
                  if(oj.Router.rootInstance._navHistory.length > 1) {
                      oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
                      }
             }    
                 var testJson = {
	            "TransactionId":self.rewardRequestModel.id(),
	             "serviceType":"RRS"
                    };
                var ApprovalsjsonnData = ko.toJSON(testJson);
                 services.editApprovals(ApprovalsjsonnData).then(editApprovalspCbFn, app.failCbFn);
                self.disableSubmit(false);    
            };
            services.editNewRewardRequest(jsonData).then(editBTripDriverCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {
            self.rewardRequestModel.servicePeriod("");
            self.rewardRequestModel.endOfServiceAmount("");
            self.rewardRequestModel.paidEndOfService("");
            self.rewardRequestModel.lastEosPaymentDate("");
            self.rewardRequestModel.allowedAmount("");
            self.rewardRequestModel.requestedAmount("");
            self.rewardRequestModel.reason("");
            self.rewardRequestModel.commment("");
            
//            self.rewardRequestModel.paymentPeriod("");
           

            
           
        }
        self.handleDeactivated = function ()
        {
        
          clearContent()
       
        }
  //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();           
            self.notifySuccess= ko.observable();           
            self.requestDate=ko.observable();
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();            
            self.allowedAmount=ko.observable();                
            self.reason=ko.observable();
            self.servicePeriod=ko.observable();       
            self.reason=ko.observable();
            self.rewardRequest=ko.observable(); 
            self.notifyEdited=ko.observable(); 
            self.loan=ko.observable(); 
            self.notifyValidationWindow=ko.observable();
            self.comment=ko.observable();
            self.saveDraft = ko.observable();
             var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });

            function initTranslations() {
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
               self.editMessage (getTranslation("rewardRequest.editMessage"));
               self.notifySuccess (getTranslation("rewardRequest.notifyCreateSuccess"));
               self.requestDate(getTranslation("labels.requestDate"));
               self.endOfServiceAmount(getTranslation("rewardRequest.endOfServiceAmount"));
               self.paidEndOfService(getTranslation("rewardRequest.paidEndOfService"));
               self.lastEosPaymentDate(getTranslation("rewardRequest.lastEosPaymentDate"));
               self.requestAmount(getTranslation("rewardRequest.requestAmount"));
               self.rewardRequest(getTranslation("rewardRequest.rewardRequest"));
               self.allowedAmount(getTranslation("rewardRequest.allowedAmount"));
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.rewardRequest(getTranslation("rewardRequest.rewardRequest")); 
               self.notifyEdited(getTranslation("rewardRequest.notifyEdited"));  
                self.loan(getTranslation("rewardRequest.loan"))
                self.comment(getTranslation("others.comment"));
                 self.notifyValidationWindow(getTranslation("rewardRequest.notifyValidationWindow"));
                  self.saveDraft(getTranslation("labels.saveDraft"));    
            }
    }
    return new EditRewardRequestModel();
});