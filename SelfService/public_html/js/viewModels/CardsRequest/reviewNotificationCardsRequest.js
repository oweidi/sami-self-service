define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function cardsReqistNotificationViewModel() {
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
        self.isPayroll= ko.observable(false);
        self.isBC=  ko.observable(false);
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
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }


      //------------------Model ---------------------------- 
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
            status:ko.observable(""),
            grade:ko.observable(""),
            id:ko.observable(""),
            rejectRessone:ko.observable("")
        };
    //-----------------------------End Of Model --------------------
    
        var getCardsRequstByIdCbFn = function (data) 
        {
            
            $.each(data.items, function (index, newValue) {
           self.cardsRequestModel.id ( newValue.id);   
            self.cardsRequestModel.requestDate ( newValue.request_date);      
            self.cardsRequestModel.type  ( newValue.type);
            self.cardsRequestModel.mobileNumber( newValue.mobile_number);
            self.cardsRequestModel.employeeName( newValue.employee_name);
            self.cardsRequestModel.employeeNameAr( newValue.employee_name_ar);
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
            }); 

             controllScreen();	
        };

         function controllScreen(){
          if (self.cardsRequestModel.type()=="AC"){
              self.isBC(false)
          }else if (self.cardsRequestModel.type()=="BC"){
               self.isBC(true)
          }

         }
        services.getCardsReqeustById(rootViewModel.selectedTableRowKeyNotifiation()).then(getCardsRequstByIdCbFn, app.failCbFn);
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
               if(self.isLastApprover()) {
               self.cardsRequestModel.status("APPROVED");
                 var jsonData = ko.toJSON(self.cardsRequestModel);
             var editCardsCbFn = function (data1) {

                }              
                
         services.editCardsReqeust(jsonData).then(editCardsCbFn, app.failCbFn);
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
                     "MSG_TITLE" : "Cards Requst",
                    "MSG_BODY" : "Cards Requst", 
                    "TRS_ID" : transactionId, 
                   "PERSON_ID" : rootViewModel.personDetails().personId(), 
                   "RESPONSE_CODE" : "APPROVED",
                   "ssType" : "CRD"
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
            
             self.cardsRequestModel.status("REJECTED");
                 var jsonData = ko.toJSON(self.cardsRequestModel);
             var editCardsCbFn = function (data1) {

                }              
                
         services.editCardsReqeust(jsonData).then(editCardsCbFn, app.failCbFn);
            rootViewModel.getNoOfNotifications();
           oj.Router.rootInstance.go('notifications');
            $.notify(self.rejectNotify(), "error");
            }
        }

        self.rejectRewaardRequst = function (data, event) {
              if (self.clickedButton() != event.currentTarget.id) {
               if (!self.cardsRequestModel.rejectRessone())
                {                
                 $.notify(self.addReason(), "error");
                  return;
                }
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Cards Requst ", 
                    "MSG_BODY" : "Cards Requst", 
                    "TRS_ID" : transactionId,
                    "PERSON_ID" : rootViewModel.personDetails().personId(), 
                    "RESPONSE_CODE" : "REJECTED",
                    "ssType" : "CRD"
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
            return true;
        }

        self.handleActivated = function (info) {

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
        buildyesNoArr();
         buildCardsType();
         initTranslations();
     var preview = document.querySelector('.attClass');
       preview.src = self.cardsRequestModel.imageBase64();
        var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();
        self.isLastApprover(rootViewModel.isLastApprover(transactionId,"CRD"));     
       
        };
        

        self.handleDetached = function (info) {
        };
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
        
      
         //language support =========================
            self.back= ko.observable();
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
            self.reviewCardsRequst = ko.observable();        
             self.adminNotify=ko.observable(); 
            self.comment=ko.observable();
            self.rejectReason=ko.observable();
            self.rejectNotify=ko.observable();
            self.approveNotify=ko.observable();
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
            self.telephoneNumberLbl = ko.observable();
            self.faxNumberLbl = ko.observable();
            self.faxExtLbl = ko.observable();
            self.emailLbl = ko.observable();
            self.poBoxLbl = ko.observable();
            self.zipCodeLbl = ko.observable();
            self.includeMobilNumberInBCLbl = ko.observable();
            self.remarksLbl = ko.observable();      
            self.attachment = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                                    initTranslations();
                }
            });            
            function initTranslations() {  
            self.reviewCardsRequst(getTranslation("pages.Cards"));
             self.attachment(getTranslation("businessTrip.attachment"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));            
               self.ok(getTranslation("others.ok"));              
               self.back(getTranslation("others.back"));
               self.requestDate(getTranslation("labels.requestDate"));          
               self.approve(getTranslation("others.approve"));
               self.reject(getTranslation("others.reject"));
               self.cancel(getTranslation("others.cancel"));               
               self.approveMessage(getTranslation("cards.approveMessage"));  
               self.rejectMessage(getTranslation("cards.rejectMessage"));        
                self.comment(getTranslation("others.comment"));
                self.adminNotify(getTranslation("labels.adminNotify"));
                self.rejectReason(getTranslation("labels.rejectReason")); 
                self.rejectNotify(getTranslation("cards.rejectNotify"));
                self.approveNotify(getTranslation("cards.approveNotify"));
                
                
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
               
                
            }

    }

    return cardsReqistNotificationViewModel;
});