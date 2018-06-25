define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function viewReturnAfterLeaveModel() {
        var self = this;
       var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
       this.specialistSummary = ko.observable("");//added
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy-MM-dd'
        }));
        
        self.returnAfterLeaveModel = {
            id : ko.observable(""),
            requestDate : ko.observable(""), 
            leave : ko.observable(""),
            leaveType : ko.observable(""),
            leaveStartDate : ko.observable(""),
            rejoinDate : ko.observable(""),
            leaveEndDate : ko.observable(""),
            daysAfterRejoin : ko.observable(""),
            comments : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            updatedBy:rootViewModel.personDetails().personNumber(),
            updateDate:ko.observable(new Date()),          
            personNumber : ko.observable(""), 
            personId : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT : ko.observable("")
        };

          
        ko.postbox.subscribe("viewReturnAfterLeaveObj", function (newValue) {
            self.returnAfterLeaveModel.id(newValue.id);
            self.returnAfterLeaveModel.requestDate(newValue.request_date);
            self.returnAfterLeaveModel.leave(newValue.leave);
            self.returnAfterLeaveModel.leaveType(newValue.leave_type);
            self.returnAfterLeaveModel.leaveStartDate(newValue.leave_start_date);
            self.returnAfterLeaveModel.rejoinDate(newValue.rejoin_date);
            self.returnAfterLeaveModel.leaveEndDate(newValue.leave_end_date);
            self.returnAfterLeaveModel.daysAfterRejoin(newValue.days_after_rejoin);
            self.returnAfterLeaveModel.comments(newValue.comments);        });
        
        self.handleActivated = function (info) {
        }
        
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
               self.specialistSummary("true");
            }
            else {
               self.specialistSummary("false");
            }//addded
            initTranslations();
        }

        self.backAction = function () {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryReturnAfterLeave');
                }//added
        }
        
        //language support =========================
            self.back = ko.observable();
            self.requestDate= ko.observable();       
            self.leave = ko.observable();
            self.leaveType = ko.observable();
            self.leaveSD = ko.observable();
            self.leaveED = ko.observable();
            self.daysAfterRejoin = ko.observable();
            self.rejoinDate = ko.observable();
            self.comment = ko.observable();
            self.leaveStartValidation = ko.observable();
            self.daysAfterRejoinValidate = ko.observable();
            self.daysAfterRejoinNoValidate = ko.observable();
            self.returnAfterLeaveRequest = ko.observable();


            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
                    self.requestDate(getTranslation("labels.requestDate")); 
                    self.back(getTranslation("others.back"));
                    self.rejoinDate(getTranslation("returnAfterLeave.rejoinDate"));            
                    self.leave(getTranslation("returnAfterLeave.leave"));
                    self.leaveType(getTranslation("returnAfterLeave.leaveType"));
                    self.leaveSD(getTranslation("returnAfterLeave.leaveSD"));
                    self.leaveED(getTranslation("returnAfterLeave.leaveED"));
                    self.daysAfterRejoin(getTranslation("returnAfterLeave.daysAfterRejoin"));
                    self.leaveStartValidation(getTranslation("returnAfterLeave.leaveStartValidation"));
                    self.daysAfterRejoinValidate(getTranslation("returnAfterLeave.daysAfterRejoinValidate"));
                    self.daysAfterRejoinNoValidate(getTranslation("returnAfterLeave.daysAfterRejoinNoValidate"));  
                    self.comment(getTranslation("others.comment"));
        }

    }

    return viewReturnAfterLeaveModel;
});