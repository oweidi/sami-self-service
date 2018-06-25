define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, common, services) {

    function viewEmployeeMedicalInsuranceViewModel() {
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

        self.employeeMedicalInsuranceModel = {
            id : ko.observable(""), requestDate : ko.observable(""), requestType : ko.observable(""), reason : ko.observable(""), otherReasons : ko.observable(""), dependent_1_details : ko.observable(""), dependent_2_details : ko.observable(""), dependent_3_details : ko.observable(""), dependent_4_details : ko.observable(""), dependent_5_details : ko.observable(""), employeeGrade : ko.observable(""), IdIqamaNumber : ko.observable(""), employeBirthDate : ko.observable(""), remarks : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : ko.observable(""), creationDate : ko.observable(""), personNumber : ko.observable(""), personId : ko.observable(""), managerId : ko.observable(""), IS_DRAFT : ko.observable(""), updatedBy : ko.observable(""), updateDate : ko.observable("")
        };

        ko.postbox.subscribe("viewEmployeeMedicalInsuranceObj", function (newValue) {
        console.log(newValue);
            self.employeeMedicalInsuranceModel.id(newValue.id);
            self.employeeMedicalInsuranceModel.requestDate(newValue.request_date);
            self.employeeMedicalInsuranceModel.requestType(newValue.request_type);
            self.employeeMedicalInsuranceModel.reason(newValue.reason);
            self.employeeMedicalInsuranceModel.otherReasons(newValue.other_reasons);
            self.employeeMedicalInsuranceModel.dependent_1_details(newValue.dependent_1_details);
            self.employeeMedicalInsuranceModel.dependent_2_details(newValue.dependent_2_details);
            self.employeeMedicalInsuranceModel.dependent_3_details(newValue.dependent_3_details);
            self.employeeMedicalInsuranceModel.dependent_4_details(newValue.dependent_4_details);
            self.employeeMedicalInsuranceModel.dependent_5_details(newValue.dependent_5_details);
            self.employeeMedicalInsuranceModel.employeeGrade(newValue.employee_grade);
            self.employeeMedicalInsuranceModel.IdIqamaNumber(newValue.id_iqama_number);
            self.employeeMedicalInsuranceModel.employeBirthDate(newValue.employee_birth_date);
            self.employeeMedicalInsuranceModel.remarks(newValue.remarks);
            self.employeeMedicalInsuranceModel.personNumber(newValue.person_number);
            self.employeeMedicalInsuranceModel.personId(newValue.personId);
            self.employeeMedicalInsuranceModel.name(newValue.name);
            self.employeeMedicalInsuranceModel.status(newValue.status);
            self.employeeMedicalInsuranceModel.managerId(newValue.managerId);
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
        }

        self.backAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryEmployeeMedicalInsuranceSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryEmployeeMedicalInsurance');
            }
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

        self.employeeMedicalInsuranceLabels = ko.observable();
        self.requestType = ko.observable();
        self.reason = ko.observable();
        self.otherReasons = ko.observable();
        self.dependent_1_details = ko.observable();
        self.dependent_2_details = ko.observable();
        self.dependent_3_details = ko.observable();
        self.dependent_4_details = ko.observable();
        self.dependent_5_details = ko.observable();
        self.employeeGrade = ko.observable();
        self.IdIqamaNumber = ko.observable();
        self.employeBirthDate = ko.observable();
        self.remarks = ko.observable();
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

            self.requestType(getTranslation("employeeMedicalInsurance.requestType"));
            self.reason(getTranslation("employeeMedicalInsurance.reason"));
            self.otherReasons(getTranslation("employeeMedicalInsurance.otherReason"));
            self.dependent_1_details(getTranslation("employeeMedicalInsurance.dependent_1_details"));
            self.dependent_2_details(getTranslation("employeeMedicalInsurance.dependent_2_details"));
            self.dependent_3_details(getTranslation("employeeMedicalInsurance.dependent_3_details"));
            self.dependent_4_details(getTranslation("employeeMedicalInsurance.dependent_4_details"));
            self.dependent_5_details(getTranslation("employeeMedicalInsurance.dependent_5_details"));
            self.employeeGrade(getTranslation("employeeMedicalInsurance.employeeGrade"));
            self.IdIqamaNumber(getTranslation("employeeMedicalInsurance.idIqamaNumber"));
            self.employeBirthDate(getTranslation("employeeMedicalInsurance.employeeBirthDate"));
            self.remarks(getTranslation("employeeMedicalInsurance.remarks"));

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

    return viewEmployeeMedicalInsuranceViewModel;
});