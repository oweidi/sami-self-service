define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, common, services) {

    function viewIdentificationLettersViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        this.specialistSummary = ko.observable("");//added
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        }

        self.advancedAnnualLeaveModel = {
            id : ko.observable(""),
            requestDate : ko.observable(""),
            leave : ko.observable(""),
            leaveType : ko.observable(""),
            leaveSD : ko.observable(""),
            leaveED : ko.observable(""),
            commment : ko.observable(""),
            status : ko.observable(""),
            name : ko.observable(""),
            createdBy : ko.observable(""),
            creationDate : ko.observable(""),
            personNumber : ko.observable(""),
            personId : ko.observable(""),
            managerId : ko.observable(""),
            IS_DRAFT : ko.observable(""),
            updatedBy : ko.observable(""),
            updateDate : ko.observable("")
        };

        ko.postbox.subscribe("viewAdvancedAnnualLeaveObj", function (newValue) {
            self.advancedAnnualLeaveModel.id(newValue.id);
            self.advancedAnnualLeaveModel.requestDate(newValue.request_date);
            self.advancedAnnualLeaveModel.leaveSD(newValue.leaveSD);
            self.advancedAnnualLeaveModel.leaveED(newValue.leaveED);
            self.advancedAnnualLeaveModel.personNumber(newValue.person_number);
            self.advancedAnnualLeaveModel.personId(newValue.personId);
            self.advancedAnnualLeaveModel.name(newValue.name);
            self.advancedAnnualLeaveModel.commment(newValue.commment);
            self.advancedAnnualLeaveModel.leave(newValue.leave);
            self.advancedAnnualLeaveModel.leaveType(newValue.leaveType);
            self.advancedAnnualLeaveModel.status(newValue.status);
            self.advancedAnnualLeaveModel.managerId(newValue.managerId);
        });

        self.handleActivated = function (info) {
        }

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
                  
            //addded
            initTranslations();
              ko.postbox.subscribe("viewAdvancedAnnualLeaveObj2", function (newValue) {
                            console.log(newValue);

                    });
        }

        self.backAction = function () {
            if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
                         return true;

            //added
        }
        //language support =========================
        self.back = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.stamped = ko.observable();
        self.leave = ko.observable();
        self.leaveType = ko.observable();
        self.leaveSD = ko.observable();
        self.leaveED = ko.observable();
        self.comment = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.leave(getTranslation("annualLeave.leave"));
            self.leaveType(getTranslation("annualLeave.leaveType"));
            self.leaveSD(getTranslation("annualLeave.leaveSD"));
            self.leaveED(getTranslation("annualLeave.leaveED"));
            self.comment(getTranslation("others.comment"));

            self.back(getTranslation("others.back"));
            self.arabicName(getTranslation("identificationLetters.arabicName"));
            self.englishName(getTranslation("identificationLetters.englishName"));
            self.profession(getTranslation("identificationLetters.profession"));
            self.requestReason(getTranslation("identificationLetters.requestReason"));
            self.directTo(getTranslation("identificationLetters.directTo"));
            self.withSalary(getTranslation("identificationLetters.withSalary"));
            self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            self.mailType(getTranslation("identificationLetters.mailType"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.stamped(getTranslation("identificationLetters.stamped"));
        }
        //added
    }

    return viewIdentificationLettersViewModel;
});