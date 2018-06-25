define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'knockout-postbox', 'ojs/ojtrain',
'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox','ojs/ojdatetimepicker', 'ojs/ojtimezonedata',
'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'],
function (oj, ko, $, app,postbox) {

    function ViewBankTransferAccViewModel() {
        var self = this;
       var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
//         self.formatDate = function (date) {
//            //var date = new Date()
//            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();
//
//            if (month.length < 2)
//                month = '0' + month;
//            if (day.length < 2)
//                day = '0' + day;
//
//            return [year, month, day].join('-');
//        }

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.bankTransferAccModel = {
            id : ko.observable(),
            requestDate: ko.observable(),
            bankName: ko.observable(rootViewModel.personDetails().hireDate()),
            iban: ko.observable(""),
            effectiveStartDate: ko.observable(""),
            remarks: ko.observable(""),
            personNumber: rootViewModel.personDetails().personNumber(),
            name:rootViewModel.personDetails().displayName(),
            personNumber  : ko.observable(),
            branchName:ko.observable("")
        };
          
        ko.postbox.subscribe("viewBankTransferAccObj", function (newValue) {
            self.bankTransferAccModel.id(newValue.id);
            self.bankTransferAccModel.requestDate(newValue.request_date);
            self.bankTransferAccModel.iban(newValue.iban_number);
            self.bankTransferAccModel.effectiveStartDate(newValue.effective_start_date);
            self.bankTransferAccModel.remarks(newValue.remarks);
            self.bankTransferAccModel.personNumber(newValue.person_number);
            self.bankTransferAccModel.bankName(searchArray(newValue.bank_name, rootViewModel.globalSABanks()));
            self.bankTransferAccModel.branchName(newValue.branch_name);
             
        });
        
        self.handleActivated = function (info) {
        }
        
        self.handleAttached = function (info) {
        initTranslations();
        }

        self.backAction = function () {
            oj.Router.rootInstance.go('bankTransferAccSummary');
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
            self.requestDateLbl= ko.observable();            
            self.bankNameLbl= ko.observable();           
            self.IBANLbl= ko.observable();
            self.effectiveStartDateLbl= ko.observable();
            self.remarksLbl= ko.observable();
            self.branchNameLbl= ko.observable();
            self.attachment = ko.observable();
            self.ibanSize =  ko.observable();
            self.AttachmentError=  ko.observable();
             self.saveDraft = ko.observable();
           
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
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
               self.addMessage (getTranslation("newBankRequest.addMessage"));
               self.notifySuccess (getTranslation("newBankRequest.notifyCreateSuccess"));
               self.requestDateLbl(getTranslation("newBankRequest.requestDate"));             
               self.bankNameLbl(getTranslation("newBankRequest.bankName"));     
               self.IBANLbl(getTranslation("newBankRequest.IBAN"));     
               self.effectiveStartDateLbl(getTranslation("newBankRequest.effectiveStartDate"));     
               self.remarksLbl(getTranslation("newBankRequest.remarks"));     
              self.branchNameLbl(getTranslation("newBankRequest.branchName")); 
              self.attachment(getTranslation("businessTrip.attachment"));
              self.ibanSize(getTranslation("newBankRequest.ibanSize"));//ibanSize
              self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
              self.saveDraft(getTranslation("labels.saveDraft"));
            }

    }

    return ViewBankTransferAccViewModel;
});