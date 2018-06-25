define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services',
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation',
'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 
'ojs/ojpopup','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel','ojs/ojgauge','ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function createCardsRequestViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.progressValue=ko.computed(function() {
                return 0;
       }, this);
        
        this.disableSubmit = ko.observable(false);
       
        
         self.dataTB2 = ko.observableArray([]);
        self.isBC=  ko.observable(false);
        self.isRequired= ko.observable(true);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
//        self.ageArray =ko.observableArray([ {"dependent1Age":ko.observable(),"dependent2Age":ko.observable()
//        ,"dependent3Age":ko.observable(),"dependent4Age":ko.observable()}])
       
        self.approvalDataSourceTB2 = ko.observable();
         self.approvaldataTB2 = ko.observableArray([]);
         var x = rootViewModel.personDetails().hireDate();
          this.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
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
         self.difrentDateInMonth = function ()  
        {
            var date = self.formatDate(new Date())
        
         
         var z = Math.abs(new Date( x).getTime() -  new Date(date).getTime());
      
         
         var diffDays = Math.round(z/(1000 * 3600 * 24));
          
           var years = Math.floor(diffDays/365,1);
          
         
         return years.toString();
        }
        //--------------------------End------------------------------     

     
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
            grade:ko.observable(""),
            IS_Coordinator_Travel :ko.observable("NO"),
            employeeDateOfBirth :ko.observable(""),
            IS_Line_Mannager:ko.observable("NO")
        };
        //
       
        
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
        
//----------------------------------END ------------------------
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
    self.isBC(false);
         
        

            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                   console.log(rootViewModel.specialistSelectedEmployeeName());
                self.cardsRequestModel.grade(rootViewModel.specialistSelectedEmployee().Grade);
                self.cardsRequestModel.mobileNumber(rootViewModel.specialistSelectedEmployee().mobileNumber);
                self.cardsRequestModel.employeeName(rootViewModel.specialistSelectedEmployee().DisplayName);
                self.cardsRequestModel.employeeNameAr(rootViewModel.specialistSelectedEmployeeName().ArabicName);
                self.cardsRequestModel.position(rootViewModel.specialistSelectedEmployee().positionName);
                self.cardsRequestModel.orgnizationName(rootViewModel.specialistSelectedEmployee().organizationName);
                self.cardsRequestModel.telephoneNumber(rootViewModel.specialistSelectedEmployee().workPhone);
                self.cardsRequestModel.telephoneExtension(rootViewModel.specialistSelectedEmployee().workPhoneExt);
                self.cardsRequestModel.faxNumber(rootViewModel.specialistSelectedEmployee().fax);
                self.cardsRequestModel.faxExt(rootViewModel.specialistSelectedEmployee().faxExt);
                self.cardsRequestModel.email(rootViewModel.specialistSelectedEmployee().email);
                   
                   
                   self.cardsRequestModel.email(rootViewModel.specialistSelectedEmployee().email);
                   self.cardsRequestModel.personName(rootViewModel.specialistSelectedEmployee().DisplayName);
                   self.cardsRequestModel.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);//personId
                   self.cardsRequestModel.personId(rootViewModel.specialistSelectedEmployee().PersonId);
                   self.cardsRequestModel.createdBy(rootViewModel.personDetails().personId());//personId
                   self.cardsRequestModel.managerId(rootViewModel.personDetails().personId());//employeeDateOfBirth
                }
                else {
                   self.specialistSummary("false");
                   
                self.cardsRequestModel.grade(rootViewModel.personDetails().grade());
                self.cardsRequestModel.mobileNumber(rootViewModel.personDetails().mobileNumber());
                self.cardsRequestModel.employeeName(rootViewModel.personDetails().displayName());
                self.cardsRequestModel.employeeNameAr(rootViewModel.globalPersonFuseModel.arabicName());
                self.cardsRequestModel.position(rootViewModel.personDetails().positionName());
                self.cardsRequestModel.orgnizationName(rootViewModel.personDetails().organizationName());
                self.cardsRequestModel.telephoneNumber(rootViewModel.personDetails().workPhone());
                self.cardsRequestModel.telephoneExtension(rootViewModel.personDetails().workPhoneExt());
                self.cardsRequestModel.faxNumber(rootViewModel.personDetails().fax());
                self.cardsRequestModel.faxExt(rootViewModel.personDetails().faxExt());
                self.cardsRequestModel.email(rootViewModel.personDetails().email());
                
                self.cardsRequestModel.personName(rootViewModel.personDetails().displayName());
                self.cardsRequestModel.personNumber(rootViewModel.personDetails().personNumber());//personId
                self.cardsRequestModel.personId(rootViewModel.personDetails().personId());
                self.cardsRequestModel.createdBy(rootViewModel.personDetails().personId());//personId
                self.cardsRequestModel.managerId(rootViewModel.personDetails().managerId());//employeeDateOfBirth
                self.cardsRequestModel.employeeDateOfBirth(rootViewModel.personDetails().dateOfBirth());
            }
            //addded  
            self.currentStepValue('stp1');
            self.progressValue = ko.computed(function () {       
                return precantageOField(self.cardsRequestModel, 15);
            },
            this);
             
           
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
                        var preview = document.querySelector('.attClass');
                 self.cardsRequestModel.imageBase64(preview.src);

                if(preview.src.indexOf("data:") < 0&&self.cardsRequestModel.type()=="AC") {
                       $.notify(self.AttachmentError(), "error");
                       event.preventDefault();
                       return;
                }
                
             var gradsAboveP = ["P1","P2","P3","P4","P5","M1","M2","M3","S1","S2","S3","E1","E2","E3"]
              var is_Above = gradsAboveP.indexOf(self.cardsRequestModel.grade());
                 if (is_Above==-1 &&self.cardsRequestModel.type()=="BC"){	
	               $.notify(self.gradeError(), "error");
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
                
             var gradsAboveP = ["P1","P2","P3","P4","P5","M1","M2","M3","S1","S2","S3","E1","E2","E3"]
              var is_Above = gradsAboveP.indexOf(self.cardsRequestModel.grade());
                 if (is_Above==-1 &&self.cardsRequestModel.type()=="BC"){	
	               $.notify(self.gradeError(), "error");
                         return;
           }

            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);

        }
        //---------------------------End OF Validation ----------------------
        
       //---------------------Function To Controll Screen -------------------
       function controllScreen(){
          if (self.cardsRequestModel.type()=="AC"){
              self.isBC(false)
          }else if (self.cardsRequestModel.type()=="BC"){
               self.isBC(true)
          }
       }
       //-----------------------End Of Function ----------------------

       //------------------ChangeHandler Section ------------------------------------
       self.typeChangedHandler = function(event, data){
           if (event.detail.trigger == 'option_selected' && event.detail.value !=null){
               controllScreen();
           }
       }
       //---------------------End Of Section -----------------------------



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
            addrewardRequestModelRecord();
            return true;
        }
            //save draft
        this.submitDraft = function () {
            self.cardsRequestModel.IS_DRAFT("YES");
            self.cardsRequestModel.status("DRAFT" );
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addrewardRequestModelRecord();
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
                else{
                oj.Router.rootInstance.go('home');
                }
        }
        

        function addrewardRequestModelRecord() {   
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
           

            
            var jsonData = ko.toJSON(self.cardsRequestModel);
                 
            var addCardsdRequestCbFn = function (data) {
                $.notify(self.notifySuccess(), "success");
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
                else{
                oj.Router.rootInstance.go('home');
                }
                self.disableSubmit(false); 
            };
            services.addCards(jsonData).then(addCardsdRequestCbFn, app.failCbFn);
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
                        name : "crd", type : item.notification_type, status : item.role_type

                    });

                });
                self.approvalDataSourceTB2(new oj.ArrayTableDataSource(self.approvaldataTB2));
                $("#modalApprovalDialog").ojDialog("open");
            };

            services.getWprkFlowAppovalList('CRD').then(getApprovalList, app.failCbFn);

        }
        //-----------------------End ---------------------------------------

        
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
         self.AttachmentError=  ko.observable();
         self.gradeError=  ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();

            }
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
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
               self.notifySuccess (getTranslation("cards.notifyCreate"));
               self.attachment(getTranslation("businessTrip.attachment"));
                 self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
               
               self.requestDate(getTranslation("labels.requestDate"));
                self.cardTypeLbl(getTranslation("cards.cardType"));                
               self.mobileNumberLbl(getTranslation("cards.mobileNumber"));                           
               self.employeeNameLbl(getTranslation("cards.employeeName"));             
               self.arabicNameLbl(getTranslation("cards.arabicName"));             
               self.positionNameLbl(getTranslation("cards.positionName"));
               self.arPositionName(getTranslation("cards.positionNameArabic"));
               
               
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
            self.gradeError(getTranslation("cards.gradeError"));
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
              self.approvals(getTranslation("labels.approvals"));
              // self.dependantNameArr1(BuildDependent2Array());
             
            }    
            self.label = {text: self.progressValue(), style: {color:'white'}};       
         self.thresholdValues = [{max: 33}, {max: 67}, {}];
    }
    return new createCardsRequestViewModel();
});