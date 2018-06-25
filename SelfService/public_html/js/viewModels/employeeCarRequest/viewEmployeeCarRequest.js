define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, common, services) {

    function viewEmployeeCarRequestViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.insideOutsideUseList = ko.observableArray(rootViewModel.globalCarInsideLov());
        self.receiveLocationList = ko.observableArray(rootViewModel.globalReceiveLocationLov());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        this.specialistSummary = ko.observable("");//added
             this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             });
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

        self.employeeCarRequestModel = {
            id : ko.observable(""),
            requestDate : ko.observable(""),
            reason : ko.observable(""),
            receiveDate : ko.observable(""),
            returnDate : ko.observable(""),
            receiveLocation : ko.observable(""),
            insideOutsideUse : ko.observable(""),
            remarks : ko.observable(""),
            personNumber : ko.observable(""),
            name : ko.observable("")
        };
        var getEmployeeCarRequestCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.employeeCarRequestModel.id(newValue.id);
                self.employeeCarRequestModel.requestDate(newValue.request_date);
                self.employeeCarRequestModel.reason(newValue.reason);
                self.employeeCarRequestModel.receiveDate(newValue.receive_date);
                self.employeeCarRequestModel.returnDate(newValue.return_date);
                self.employeeCarRequestModel.receiveLocation(newValue.receive_location);
                self.employeeCarRequestModel.insideOutsideUse(newValue.inside_outside_use);
                self.employeeCarRequestModel.remarks(newValue.remarks);
                self.employeeCarRequestModel.personNumber(newValue.person_number);
                self.employeeCarRequestModel.name(newValue.name);
            });

        };
        if (rootViewModel.selectedTableRowKeyNotifiation()) {
        }
        else {
            ko.postbox.subscribe("viewEmployeeCarRequestObj", function (newValue) {
                self.employeeCarRequestModel.id(newValue.id);
                self.employeeCarRequestModel.requestDate(newValue.request_date);
                self.employeeCarRequestModel.reason(newValue.reason);
                self.employeeCarRequestModel.receiveDate(newValue.receive_date);
                self.employeeCarRequestModel.returnDate(newValue.return_date);
                self.employeeCarRequestModel.receiveLocation(newValue.receive_location);
                self.employeeCarRequestModel.insideOutsideUse(newValue.inside_outside_use);
                self.employeeCarRequestModel.remarks(newValue.remarks);
            });
        }

        self.handleActivated = function (info) {
        }
        self.handleDetached = function (info) {
            rootViewModel.selectedTableRowKeyNotifiation("");
        };
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            //addded
            if (rootViewModel.selectedTableRowKeyNotifiation()) {
                services.getEmployeeCarRequestbyId(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeCarRequestCbFn, app.failCbFn);
            }
            initTranslations();
        }

        self.backAction = function () {
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

        self.reason = ko.observable();
        self.receiveDate = ko.observable();
        self.returnDate = ko.observable();
        self.receiveLocation = ko.observable();
        self.insideOutsideUse = ko.observable();
        self.remarks = ko.observable();
        self.placeholder = ko.observable();
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
            self.placeholder(getTranslation("labels.placeHolder"));

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

            self.reason(getTranslation("labels.reason"));
            self.receiveDate(getTranslation("labels.receiveDate"));
            self.returnDate(getTranslation("labels.returnDate"));
            self.receiveLocation(getTranslation("labels.receiveLocation"));
            self.insideOutsideUse(getTranslation("labels.insideOutsideUse"));
            self.remarks(getTranslation("labels.remarks"));
        }
        //added
    }

    return viewEmployeeCarRequestViewModel;
});