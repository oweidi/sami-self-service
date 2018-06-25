define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'notifyjs', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'promise', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojdialog', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function reviewAdvanceAnnualLeaveModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        self.tracker = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.refresh = ko.observable(true);
        self.isDisabled = ko.observable(true);
        self.name = ko.observable();
        self.tracker = ko.observable();

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

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

    

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));


        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };

        this.cancelAdvanceLeave = function () {
              if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
            return true;
        }

        self.handleActivated = function (info) {

        };

        self.handleAttached = function (info) {
            services.getAnnualLeaveById(rootViewModel.selectedTableRowKeyNotifiation()).then(getIdentificationLettersCbFn, app.failCbFn);
            initTranslations();
        };
       
        var getIdentificationLettersCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                self.advancedAnnualLeaveModel.id(newValue.id);
                self.advancedAnnualLeaveModel.requestDate(newValue.request_date);
                self.advancedAnnualLeaveModel.leave(newValue.leave);
                self.advancedAnnualLeaveModel.leaveSD(newValue.leave_start_date);
                self.advancedAnnualLeaveModel.leaveED(newValue.leave_end_date);
                self.advancedAnnualLeaveModel.leaveType(newValue.leave_type);      
                self.advancedAnnualLeaveModel.commment(newValue.commment);
            });

        };

        self.handleDetached = function (info) {
        };
        //language support =========================
        self.ok = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.newBusinessTripDriverRequests = ko.observable();
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.back = ko.observable();
        self.cancel = ko.observable();
        self.leave = ko.observable();
        self.leaveType = ko.observable();
        self.leaveSD = ko.observable();
        self.leaveED = ko.observable();
        self.comment = ko.observable();
        self.reviewAnnualLeave = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.back(getTranslation("others.back"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.leave(getTranslation("annualLeave.leave"));
            self.leaveType(getTranslation("annualLeave.leaveType"));
            self.leaveSD(getTranslation("annualLeave.leaveSD"));
            self.leaveED(getTranslation("annualLeave.leaveED"));
            self.comment(getTranslation("others.comment"));
            self.reviewAnnualLeave(getTranslation("annualLeave.reviewAnnualLeave"));
        }
        //added
    }

    return reviewAdvanceAnnualLeaveModel;
});