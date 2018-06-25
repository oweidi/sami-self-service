define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox','appController', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation','ojs/ojdialog'],
function (oj, ko, $, postbox,app) {

    function ViewTicketRrequst() {
        var self = this;
         self.isBC=  ko.observable(false);
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
 self.cardsRequestModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
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
           
            IS_Coordinator_Travel :ko.observable("NO"),
            employeeDateOfBirth :ko.observable(""),
            IS_Line_Mannager:ko.observable("NO")
        };
            
              ko.postbox.subscribe("viewElementObj", function (newValue) {
                       
          
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
           
	   controllScreen();		
        });
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
     

        self.handleActivated = function (info) {
           
            }
             
        
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
            initTranslations();
        }
    function controllScreen(){
          if (self.cardsRequestModel.type()=="AC"){
              self.isBC(false)
          }else if (self.cardsRequestModel.type()=="BC"){
               self.isBC(true)
          }
       }

        self.backAction = function () {
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
                else{
                oj.Router.rootInstance.go('home');
                }
        }
                //language support =========================
       self.back= ko.observable();
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
        self.placeholder = ko.observable();
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
                self.back(getTranslation("others.back"));  
               self.attachment(getTranslation("businessTrip.attachment"));    
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
                self.faxNumberLbl (getTranslation("cards.faxNumber"));                        
                self.faxExtLbl (getTranslation("cards.faxExt"));//relation
                self.emailLbl(getTranslation("cards.email"));               
                self.poBoxLbl (getTranslation("cards.poBox"));              
                self.zipCodeLbl(getTranslation("cards.zipCode"));                
             self.includeMobilNumberInBCLbl(getTranslation("cards.includeMobilNumberInBC"));         
               self.remarksLbl(getTranslation("cards.remarks"));
               
            }
    }

    return ViewTicketRrequst;
});