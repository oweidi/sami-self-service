define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset', 'ojs/ojradioset',
'ojs/ojlabel','ojs/ojgauge','ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function editCardsRequestViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.progressValue=ko.computed(function() {
                return 0;
       }, this);
        
        this.disableSubmit = ko.observable(false);
        self.isBC=  ko.observable(false);
        self.isEnapleClass=  ko.observable(false);
        self.isRequired= ko.observable(true);
        self.currentStepValue = ko.observable('stp1');
         this.dataSourceTB2 = ko.observable();
          self.dataTB2 = ko.observableArray([]);
         self.columnArrayPassangerDetails = ko.observableArray([]);
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
         var x = rootViewModel.personDetails().hireDate();   
          this.specialistSummary = ko.observable("");//added   
         self.typeArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
         self.yesNoArr = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
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

        //--------------------------End------------------------------
        //--------------Model-------------------------
        self.cardsRequestModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            travelDate:ko.observable(""),
            type : ko.observable(""),
            mobileNumber:ko.observable(""),
            employeeName:ko.observable(""),
            employeeNameAr:ko.observable(""),
            position:ko.observable(""),
            positionAr:ko.observable(""),
            orgnizationName:ko.observable(""),
            telephoneNumber:ko.observable(""),
            telephoneExtension:ko.observable(""),
            faxNumber:ko.observable(""),
            faxExt:ko.observable(""),
            email:ko.observable(""),
            poBox:ko.observable(""),
            zipCode:ko.observable(""),
            includeMobilNumberInBC:ko.observable(),
            remarks:ko.observable(),
            imageBase64:ko.observable(""),
            createdBy:ko.observable(""),
            creationDate:ko.observable(""),
            personName:ko.observable(""),
            personNumber:ko.observable(""),
            personId:ko.observable(""),
            name: ko.observable(""),
            comments:ko.observable(""),
            managerId:ko.observable(""),
            IS_DRAFT:ko.observable(""),
            IS_HR_Operations:ko.observable("NO"),
            status:ko.observable(""),
            id :ko.observable(""),
            IS_Coordinator_Travel :ko.observable("NO"),
            employeeDateOfBirth :ko.observable(""),
            IS_Line_Mannager:ko.observable("NO"),
            updateedBy:ko.observable(""),
            grade:ko.observable("")
        };
        //---------------------------End oF Model------------------
        //-----------------------Set Model From Object Send From Previos Page-------------------------------
ko.postbox.subscribe("editObj", function (newValue)
           {    
         
           self.cardsRequestModel.id ( newValue.id);   
            self.cardsRequestModel.requestDate ( newValue.request_date);      
            self.cardsRequestModel.type  ( newValue.type);
            self.cardsRequestModel.mobileNumber( newValue.mobile_number);
            self.cardsRequestModel.employeeName( newValue.employee_name);
            self.cardsRequestModel.employeeNameAr( newValue.employee_namear);
            self.cardsRequestModel.position( newValue.position);
            self.cardsRequestModel.positionAr( newValue.position_ar);
            self.cardsRequestModel.orgnizationName( newValue.orgnization_name);
            self.cardsRequestModel.telephoneNumber( newValue.telephone_number);
            self.cardsRequestModel.telephoneExtension( newValue.telephone_extension);
            self.cardsRequestModel.faxNumber( newValue.fax_number);
            self.cardsRequestModel.faxExt( newValue.fax_ext);
            self.cardsRequestModel.email( newValue.email);
            self.cardsRequestModel.poBox( newValue.pobox);
            self.cardsRequestModel.zipCode( newValue.zip_code);
            self.cardsRequestModel.includeMobilNumberInBC( newValue.include_mobil_number_in_bc);
            self.cardsRequestModel.remarks( newValue.remarks);
            self.cardsRequestModel.personName( newValue.person_name);
            self.cardsRequestModel.personNumber( newValue.person_number);
            self.cardsRequestModel.personId( newValue.person_id);
            self.cardsRequestModel.name ( newValue.name);
            self.cardsRequestModel.comments( newValue.comments);
            self.cardsRequestModel.managerId( newValue.manager_id);
            self.cardsRequestModel.imageBase64(newValue.image_base64);
            self.cardsRequestModel.status( newValue.status);
             self.cardsRequestModel.grade( newValue.grade);
             controllScreen();	
            
     });
       
         function controllScreen(){
          if (self.cardsRequestModel.type()=="AC"){
              self.isBC(false)
          }else if (self.cardsRequestModel.type()=="BC"){
               self.isBC(true)
          }
       }   
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info ) 
        {
         
        
         self.currentStepValue('stp1');
         
       
            
       
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            //clearContent();

        };
      
         



//--------------Temp Function To Build Card Type  ------------------------
        function buildCardsType() {
            self.typeArr([]);        
          self.typeArr( app.getSaaSLookup(rootViewModel.globalHrCardsType()));         
        }//yesNoArr
        //-------------------This Function To Build yesNoArr --------------------------
        function buildyesNoArr() {
            self.yesNoArr([]);
           self.yesNoArr( app.getSaaSLookup(rootViewModel.globalYesNo()));                   
        }

  self.handleAttached = function (info) {  
          buildCardsType();
         buildyesNoArr();
          var preview = document.querySelector('.attClass');
             preview.src = self.cardsRequestModel.imageBase64();
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }//addded
            self.currentStepValue('stp1');
            self.progressValue = ko.computed(function () {       
                return precantageOField(self.cardsRequestModel, 15);
            },
            this);
            initTranslations()        
        };
        self.handleDetached = function (info) {
         
    

        };
       //------------------ChangeHandler Section ------------------------------------
       self.typeChangedHandler = function(event, data){
           if (event.detail.trigger == 'option_selected' && event.detail.value !=null){
              
               controllScreen();
           }
       }
       //---------------------End Of Section -----------------------------
        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        
            
         var preview = document.querySelector('.attClass');
            self.cardsRequestModel.imageBase64(preview.src);

                if(preview.src.indexOf("data:") < 0&&self.cardsRequestModel.type()=="AC") {
                       $.notify(self.AttachmentError(), "error");
                       return;
                } 
        var gradsAboveP = ["P1","P2","P3","P4","P5","M1","M2","M3","S1","S2","S3","E1","E2","E3"]
              var is_Above = gradsAboveP.indexOf(self.cardsRequestModel.grade());
                 if (is_Above==-1 &&self.cardsRequestModel.type()=="BC"){	
	               $.notify(self.gradeError(), "error");
                         return;
           }

           
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }


//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
              
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
            var preview = document.querySelector('.attClass');
            self.cardsRequestModel.imageBase64(preview.src);

                if(preview.src.indexOf("data:") < 0&&self.cardsRequestModel.type()=="AC") {
                       $.notify(self.AttachmentError(), "error");
                       return;
                } 
        
            

            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }
        //---------------------------End OF Validation ----------------------
        



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

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.cardsRequest();
        };
        this.submitButton = function () {
            self.cardsRequestModel.IS_DRAFT("No");
              self.cardsRequestModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
          
          

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            editTicket();
            return true;
        }
            //save draft
        this.submitDraft = function () {
            self.cardsRequestModel.IS_DRAFT("YES");
            self.cardsRequestModel.status("PENDING_APPROVED" );
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            editTicket();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction= function () {
                        if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
        }
        

        function editTicket() {   
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
            
            var jsonData = ko.toJSON(self.cardsRequestModel);
                 
 var editCardstRCbFn = function (data) {
            							  
         var testJson = {
	   "TransactionId":self.cardsRequestModel.id(),
	   "serviceType":"TR"	
             };
            var ApprovalsjsonnData = ko.toJSON(testJson);
             var editApprovalspCbFn = function (data) {
             }
  
   services.editApprovals(ApprovalsjsonnData).then(editApprovalspCbFn, app.failCbFn);
                $.notify(self.notifySuccess(), "success");
             if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
                self.disableSubmit(false); 
            };
            services.editCardsReqeust(jsonData).then(editCardstRCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {         
             self.cardsRequestModel.type  ("");
            self.cardsRequestModel.mobileNumber("");
            self.cardsRequestModel.employeeName("");
            self.cardsRequestModel.employeeNameAr("");
            self.cardsRequestModel.position("");
            self.cardsRequestModel.positionAr("");
            self.cardsRequestModel.orgnizationName("");
            self.cardsRequestModel.telephoneNumber("");
            self.cardsRequestModel.telephoneExtension("");
            self.cardsRequestModel.faxNumber("");
            self.cardsRequestModel.faxExt("");
            self.cardsRequestModel.email("");
            self.cardsRequestModel.poBox("");
            self.cardsRequestModel.zipCode("");
            self.cardsRequestModel.includeMobilNumberInBC("");
            self.cardsRequestModel.remarks("");
        }
        self.handleDeactivated = function ()
        {         
          clearContent()
        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
       
       
        //language support =========================
         self.ok = ko.observable();
        self.back = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.notifySuccess = ko.observable();
        self.requestDate = ko.observable();
        self.mobileNumberLbl = ko.observable();
        self.employeeNameLbl = ko.observable();
        self.cardTypeLbl = ko.observable();
        self.cardsRequest = ko.observable();

        self.orgnizationNameLbl = ko.observable();

        self.telephoneExtensionLbl = ko.observable();
        self.arabicNameLbl = ko.observable();
        self.positionNameLbl = ko.observable();
        self.arPositionName = ko.observable();
        self.adminNotify = ko.observable();
        self.comment = ko.observable();

        self.saveDraft = ko.observable();
        self.placeholder = ko.observable();
        self.telephoneNumberLbl = ko.observable();
        self.faxNumberLbl = ko.observable();
        self.faxExtLbl = ko.observable();
        self.emailLbl = ko.observable();
        self.poBoxLbl = ko.observable();
        self.approvals = ko.observable();
        self.columnArrayApproval = ko.observableArray([]);
        self.viewApprovalsLbl = ko.observable();
        self.ServiceName = ko.observable();
        self.notificationType = ko.observable();
        self.employeeRole = ko.observable();
        self.zipCodeLbl = ko.observable();
        self.includeMobilNumberInBCLbl = ko.observable();
        self.remarksLbl = ko.observable();
        self.propattionPeriodError = ko.observable();
        self.attachment = ko.observable();
        self.editMessage= ko.observable();
         self.AttachmentError=  ko.observable();
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
               self.addMessage (getTranslation("cards.addMessage"));
               self.notifySuccess (getTranslation("cards.notifyEdit"));
               self.attachment(getTranslation("businessTrip.attachment"));
                 self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
               
               self.requestDate(getTranslation("labels.requestDate"));
                self.cardTypeLbl(getTranslation("cards.cardType"));                
               self.mobileNumberLbl(getTranslation("cards.mobileNumber"));                           
               self.employeeNameLbl(getTranslation("cards.employeeName"));             
               self.arabicNameLbl(getTranslation("cards.arabicName"));             
               self.positionNameLbl(getTranslation("cards.positionName"));
               self.arPositionName(getTranslation("cards.positionNameArabic"));
               self.editMessage(getTranslation("cards.editMessage"));
               
               self.cardsRequest(getTranslation("pages.Cards"));
                self.orgnizationNameLbl(getTranslation("cards.orgnizationName"));              
                self.telephoneNumberLbl(getTranslation("cards.telephoneNumber"));            
                self.telephoneExtensionLbl(getTranslation("cards.telephoneExtension"));              
                self.adminNotify(getTranslation("labels.adminNotify"));                         
                self.faxNumberLbl (getTranslation("cards.faxNumber"));                        
                self.faxExtLbl (getTranslation("cards.faxExt"));//relation
                self.emailLbl(getTranslation("cards.email"));               
                self.poBoxLbl (getTranslation("cards.poBox"));              
                self.zipCodeLbl(getTranslation("cards.zipCode"));                
             self.includeMobilNumberInBCLbl(getTranslation("cards.includeMobilNumberInBC"));
             
               self.remarksLbl(getTranslation("cards.remarks"));
              // self.propattionPeriodError(getTranslation("ticketRequest.propattionPeriodError"));
               
               
               self.comment(getTranslation("others.comment"));
               self.saveDraft(getTranslation("labels.saveDraft"));     
               self.placeholder(getTranslation("labels.placeholder"));
              

            self.ServiceName(getTranslation("labels.serviceName"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));


              self.approvals(getTranslation("labels.approvals"));
              // self.dependantNameArr1(BuildDependent2Array());
             
            }    
            self.label = {text: self.progressValue(), style: {color:'white'}};       
         self.thresholdValues = [{max: 33}, {max: 67}, {}];
    }
    return new editCardsRequestViewModel();
});