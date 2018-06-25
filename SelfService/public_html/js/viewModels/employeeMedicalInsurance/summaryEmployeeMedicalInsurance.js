define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryEmployeeMedicalInsuranceViewModel() {
        var self = this;

        //***********   var String=str.substring(str.lastIndexOf(":")+1,str.lastIndexOf(";"));    ************//
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.isDraft = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.selectedEmployeeMedicalInsurance = ko.observable();
        self.selectedIndex = ko.observable();
        self.selectedRowData = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        this.specialistSummary = ko.observable("");//added
        this.viewReportDisabled = ko.observable(true);
        self.EmbedPDFLink = ko.observable("");
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");
        });

        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);

        var getEmployeeMedicalInsuranceCbFn = function (data) {

            if (data.items.length != 0) {
                self.isVisible(true)
                self.data([]);

                $.each(data.items, function (index, val) {
                    self.data.push( {
                        rowNumberRenderer : (index + 1), id : val.id,
                        person_number : val.person_number,
                        person_id : val.person_id,
                        name : val.name,
                        request_date : val.request_date,
                        request_type : val.request_type,
                        reason : val.reason,
                        other_reasons : val.other_reasons,
                        employee_birth_date : val.employee_birth_date,
                        id_iqama_number : val.id_iqama_number,
                        employee_grade : val.employee_grade,
                        dependent_1_details : val.dependent_1_details,
                        dependent_2_details : val.dependent_2_details,
                        dependent_3_details : val.dependent_3_details,
                        dependent_4_details : val.dependent_4_details,
                        dependent_5_details : val.dependent_5_details,
                        remarks : val.remarks,
                        dependent_relationship_1 : val.dependent_1_details.substring(val.dependent_1_details.toString().indexOf("- ") + 2, val.dependent_1_details.toString().lastIndexOf(" -")),
                        dependent__birth_date_1 : val.dependent_1_details.substring(val.dependent_1_details.toString().lastIndexOf(" - ") + 2, val.dependent_1_details.toString().lastIndexOf(")")),
                        status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en

                    });
                });

                self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
                {
                    idAttribute : 'id'
                })));
            }
            else {
                self.isShown(true);
            }
        };

        this.tableSelectionListener = function (event) {

            var data = event.detail;
            var currentRow = data.currentRow;
            if (currentRow) {
                if (currentRow['rowKey']) {
                    var index = currentRow.rowIndex;
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[currentRow['rowIndex']];
                    self.selectedRowData(selectedRow);
                    self.selectedIndex(currentRow['rowIndex']);
                    self.viewDisabled(false);
                    console.log(self.data()[index]);
                    var latestResponseCode = self.data()[index].status;
                    if (latestResponseCode == "Draft") {
                        self.editDisabled(false);
                        self.isDraft(true);
                    }
                    else if (latestResponseCode == "مسودة") {
                        self.editDisabled(false);
                        self.isDraft(true);
                    }
                    else {
                        self.editDisabled(true);
                    }

                }
            }
        }

        rootViewModel.getNoOfNotifications();

        this.deleteDraftSelfService = function () {
            if (self.selectedRowKey()) {
                console.log(self.data()[self.selectedIndex()])
                var removeObj = self.data()[self.selectedIndex()]
                //                    rootViewModel.selectedTableRowKey(removeObj);
                rootViewModel.deleteSelfService('XX_MEDICAL_INSURANCE', 'MICR', self.selectedRowKey());
                self.data.remove(removeObj);
                self.isDraft(true);
            }
        }

        self.addEmployeeMedicalInsurance = function () {
            self.mode('AddEmployeeMedicalInsurance');
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('createEmployeeMedicalInsuranceSpecialist');
            }
            else {
                oj.Router.rootInstance.go('createEmployeeMedicalInsurance');
            }
            //added
        }

        self.editEmployeeMedicalInsurance = function () {

            if (self.selectedRowKey()) {
                self.mode('EditEmployeeMedicalInsurance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeMedicalInsurance(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('editEmployeeMedicalInsuranceSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('editEmployeeMedicalInsurance');
                }
                //added
            }

        }

        self.viewEmployeeMedicalInsurance = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewEmployeeMedicalInsurance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeMedicalInsurance(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('viewEmployeeMedicalInsuranceSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('viewEmployeeMedicalInsurance');
                }
            }

        }

        this.viewEmployeeMedicalInsuranceApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName()) : item.role_type == 'LINE_MANAGER+1' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerOfMnagerName()) : item.role_type == 'LINE_MANAGER' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName()) : item.role_id,
                         
                        type : item.notification_type,
                        status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });
                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'MICR').then(getApprovalList, app.failCbFn);
            }

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary", "true");//added
            if (self.mode() == 'EditEmployeeMedicalInsurance') {
                ko.postbox.publish("editEmployeeMedicalInsuranceObj", self.selectedEmployeeMedicalInsurance());
            }
            else if (self.mode() == 'ViewEmployeeMedicalInsurance') {
                ko.postbox.publish("viewEmployeeMedicalInsuranceObj", self.selectedEmployeeMedicalInsurance());
            }
        };

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
            //added
            services.getEmployeeMedicalInsurance(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getEmployeeMedicalInsuranceCbFn, app.failCbFn);
            initTranslations();
        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
        this.backAction = function () {
            oj.Router.rootInstance.go('specialist');

        }
        
        //added
        //language support =========================
        self.addLabel = ko.observable();
        self.editLabel = ko.observable();
        self.viewLabel = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.ok = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.rowNumber = ko.observable();
        self.requestDate = ko.observable();
        self.requestType = ko.observable();
        self.reason = ko.observable();
        self.otherReasons = ko.observable();
        self.dependent_1_details = ko.observable();
        self.dependentRelationship_1 = ko.observable();
        self.dependent_birth_date_1 = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        //        self.viewReport = ko.observable();
        self.annualLeaveLabels = ko.observable();
        self.employeeMedicalInsuranceLabels = ko.observable();
        self.nodays = ko.observable();
        self.addFirstRecord = ko.observable();
        self.deleteLabel = ko.observable();
        self.back = ko.observable();//added
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                services.getEmployeeMedicalInsurance(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getEmployeeMedicalInsuranceCbFn, app.failCbFn);
                initTranslations();
            }
        });

        function initTranslations() {
            self.deleteLabel(getTranslation("others.delete"));
            self.back(getTranslation("others.back"));//added
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.ok(getTranslation("others.ok"));

            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.requestType(getTranslation("employeeMedicalInsurance.requestType"));
            self.reason(getTranslation("employeeMedicalInsurance.reason"));
            self.otherReasons(getTranslation("employeeMedicalInsurance.otherReason"));
            self.dependent_1_details(getTranslation("employeeMedicalInsurance.dependent_1_details"));
            self.dependentRelationship_1(getTranslation("employeeMedicalInsurance.dependent_relationship_1"));
            self.dependent_birth_date_1(getTranslation("employeeMedicalInsurance.dependent__birth_date_1"));

            self.employeeMedicalInsuranceLabels(getTranslation("employeeMedicalInsurance.label"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
            //            self.viewReport(getTranslation("identificationLetters.viewReport"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));

            //     self.arabicName(getTranslation("identificationLetters.arabicName"));
            //     self.englishName(getTranslation("identificationLetters.englishName"));
            //     self.profession(getTranslation("identificationLetters.profession"));
            //     self.requestReason(getTranslation("identificationLetters.requestReason"));
            //     self.directTo(getTranslation("identificationLetters.directTo"));
            //     self.withSalary(getTranslation("identificationLetters.withSalary"));
            //     self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            //     self.mailType(getTranslation("identificationLetters.mailType"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            {
                "headerText" : self.requestType(), "field" : "request_type"
            },
            {
                "headerText" : self.reason(), "field" : "reason"
            },
            {
                "headerText" : self.otherReasons(), "field" : "other_reasons"
            },
            {
                "headerText" : self.dependent_1_details(), "field" : "dependent_1_details"
            },
            {
                "headerText" : self.dependentRelationship_1(), "field" : "dependent_relationship_1"
            },
            {
                "headerText" : self.dependent_birth_date_1(), "field" : "dependent__birth_date_1"
            },
            {
                "headerText" : self.status(), "field" : "status"
            }
]);
            self.columnArrayApproval([
            {
                "headerText" : self.name(), "field" : "name"
            },
            {
                "headerText" : self.type(), "field" : "type"
            },
            {
                "headerText" : self.status(), "field" : "status"
            },
            {
                "headerText" : self.approvalDate(), "field" : "approvalDate"
            }
]);
        }

    }
    return summaryEmployeeMedicalInsuranceViewModel;
});