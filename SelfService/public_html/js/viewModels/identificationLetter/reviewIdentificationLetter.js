define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext','promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog','ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewIdentificationLettersModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        self.clickedButton = ko.observable("");
          self.disableSubmit = ko.observable(false);
        			 this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
        self.selfServiceURL = ko.observable();
        self.showButton = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);


        self.isDisabled = ko.observable(true);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(true);
        self.name = ko.observable();
         self.payPeriodValue = ko.observable();
         self.tracker = ko.observable();
         self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
         self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
         self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
         self.isLastApprover = ko.observable(false);
            
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });   

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

  self.identificationLettersModel = {
                id : ko.observable(),
                requestDate: ko.observable(""),
                arabicEnglish:ko.observable(""),
                arabicName  : ko.observable(""),
                englishName:  ko.observable(""),
                iqamaProfession: ko.observable(""),
                personNumber: ko.observable(""),
                mailType: ko.observable(""),
                name:ko.observable(""),
                directedTo:ko.observable(""),
                withSalary: ko.observable(""),
                reason: ko.observable(""),
                stamped: ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                 rejectRessone: ko.observable(""),
                 comment: ko.observable("")
            };

        self.rejectIdentificationLetter = function () {
            if (self.clickedButton() != event.currentTarget.id) {
             if (!self.identificationLettersModel.rejectRessone())
                {
                 $.notify(self.addReason(), "error");
                  return;
                }
                 self.disableSubmit(true);
                self.clickedButton(event.currentTarget.id);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Identification Letter", "MSG_BODY" : "Identification Letter Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "XIL"
                };
                services.workflowAction(headers).then(getReject, app.failCbFn);
            }
            return true;
        }
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        
        self.approveIdentificationLetter = function () {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.disableSubmit(true);
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation();
                var headers = {
                    "MSG_TITLE" : "Identification Letter", "MSG_BODY" : "Identification Letter Request", "TRS_ID" : transactionId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "XIL"
                };
                services.workflowAction(headers).then(getApprove, app.failCbFn);
            }
            return true;
        }
        
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        var getApprove = function (data) {
             if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
                if(self.isLastApprover()) {
//                    if (rootViewModel.personDetails().positionName() === 'Officer - Support Services  - Government Relation U') {}
                    var updaeJson = {
                        "status":"APPROVED","finalApproved" : "Y",  "id" : self.identificationLettersModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                         "updateDate":new Date()
                    };
                    services.editIdentificationLetters( JSON.stringify(updaeJson)).then(editIdentificationLettersCbFn, app.failCbFn);
                     $.notify(self.notifyApproved(), "success");                    
                } else{
                        oj.Router.rootInstance.go('notifications');
                        $.notify(self.adminNotify(), "error");
                }
            }
              
        };
          var editIdentificationLettersCbFn = function (data1) {
            oj.Router.rootInstance.go('notifications');               
               
          };
          



        var getReject = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            }
             else {
                    if (rootViewModel.personDetails().positionName() === 'KSA Payroll Specialist') {
                        var updaeJson = {
                            "status":"REJECTED","finalApproved" : "Y",  "id" : self.identificationLettersModel.id(), "updatedBy":rootViewModel.personDetails().personNumber(),
                             "updateDate":new Date()
                        };
                        services.editIdentificationLetters( JSON.stringify(updaeJson)).then(editIdentificationLettersCbFn, app.failCbFn);
                        
                        $.notify(self.notifyReject(), "error");
                    }                 
            }
        };
        
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            self.clickedButton("");
            document.querySelector("#rejectDialog").close();
        };

        this.cancelAdvHousing = function () {
            var prevoisPage = oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1];
           if (prevoisPage == 'notifications' && rootViewModel.reviewNotiType() == 'FYI') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             } else {
                 oj.Router.rootInstance.go('home');
             }
            return true;
        }

        self.handleActivated = function (info) {

            if (rootViewModel.reviewNotiType() == 'FYI') {
                self.isShown(false);

            }
        };

        self.handleAttached = function (info) {
                services.getIdentificationLettersbyId(rootViewModel.selectedTableRowKeyNotifiation()).then(getIdentificationLettersCbFn, app.failCbFn);
                            initTranslations();
                var transactionId = rootViewModel.selectedTableRowKeyNotifiation().toString();        
               self.isLastApprover(rootViewModel.isLastApprover(transactionId,"XIL"));
        };
          var getIdentificationLettersCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
            self.identificationLettersModel.id(newValue.id);
            self.identificationLettersModel.requestDate(newValue.request_date);
            self.identificationLettersModel.arabicEnglish(newValue.arabic_english);
            self.identificationLettersModel.arabicName(newValue.arabic_name);
            self.identificationLettersModel.englishName(newValue.english_name);
            self.identificationLettersModel.personNumber(newValue.person_number);
            self.identificationLettersModel.iqamaProfession(newValue.iqama_profession);
            self.identificationLettersModel.personNumber(newValue.person_number);
            self.identificationLettersModel.name(newValue.name);
            self.identificationLettersModel.directedTo(newValue.directed_to);
            self.identificationLettersModel.mailType(newValue.mail_type);
            self.identificationLettersModel.withSalary(newValue.with_salary);
            self.identificationLettersModel.reason(newValue.reason);         
            self.identificationLettersModel.stamped(newValue.stamped);
            self.identificationLettersModel.comment(newValue.commment);
            });

        };
        

        self.handleDetached = function (info) {
        };
//language support =========================
            self.ok = ko.observable();
            self.arabicName= ko.observable();
            self.englishName= ko.observable();
            self.profession= ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.newBusinessTripDriverRequests=ko.observable();
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.startdate=ko.observable();
            self.requestDate=ko.observable();
            self.enddate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.requestReason= ko.observable();
            self.directTo= ko.observable();
            self.withSalary= ko.observable();
            self.arabicEnglish= ko.observable();
            self.mailType= ko.observable();
            self.identificationLettersRefundRequests= ko.observable();
            self.nodays= ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.back= ko.observable();
            self.confirmMessage = ko.observable();
            self.approveMessage= ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.identificationLetters = ko.observable();
            self.reject= ko.observable();
            self.approve= ko.observable();
            self.cancel= ko.observable();
            self.rejectMessage= ko.observable();
            self.reviewIdentificationLetters= ko.observable();
            self.adminNotify= ko.observable();
            self.stamped= ko.observable();
            self.comment= ko.observable();
            self.rejectReason= ko.observable();
            self.addReason= ko.observable();
            self.notifyApproved= ko.observable();
            self.notifyReject= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
           self.approve(getTranslation("others.approve"));
           self.reject(getTranslation("others.reject"));
           self.yes(getTranslation("others.yes"));
           self.no(getTranslation("others.no"));
           self.ok(getTranslation("others.ok"));
           self.back(getTranslation("others.back"));
           self.startdate(getTranslation("labels.startdate"));
           self.enddate(getTranslation("labels.enddate"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.approvals(getTranslation("labels.approvals"));
           self.nodays(getTranslation("labels.nodays"));
           self.submit(getTranslation("others.submit"));
           self.confirmMessage(getTranslation("labels.confirmMessage"));
           self.approveMessage (getTranslation("identificationLetters.approveMessage"));
           self.rejectMessage (getTranslation("identificationLetters.rejectMessage"));
           self.reviewIdentificationLetters(getTranslation("identificationLetters.reviewIdentificationLetters"));
           self.arabicName(getTranslation("identificationLetters.arabicName"));
    	   self.englishName(getTranslation("identificationLetters.englishName"));
           self.profession(getTranslation("identificationLetters.profession"));
           self.requestReason(getTranslation("identificationLetters.requestReason"));
           self.directTo(getTranslation("identificationLetters.directTo"));
           self.withSalary(getTranslation("identificationLetters.withSalary"));
           self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
           self.mailType(getTranslation("identificationLetters.mailType"));
           self.identificationLetters(getTranslation("pages.identificationLetters"));
           self.adminNotify(getTranslation("labels.adminNotify"));
           self.stamped(getTranslation("identificationLetters.stamped"));
           self.comment(getTranslation("others.comment"));
           self.rejectReason(getTranslation("labels.rejectReason"));
           self.addReason(getTranslation("labels.addReason"));
           self.notifyApproved(getTranslation("identificationLetters.notifyApproved"));
           self.notifyReject(getTranslation("identificationLetters.notifyReject"));
        }//added
            
    }

    return reviewIdentificationLettersModel;
});