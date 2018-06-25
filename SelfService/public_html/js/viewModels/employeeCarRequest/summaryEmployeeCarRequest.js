define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryEmployeeCarRequestViewModel() {
        var self = this;

        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.selectedEmployeeCarRequest = ko.observable();
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
        
        var getEmployeeCarRequestFn = function (data) {

            if (data.items.length != 0) {
                self.isVisible(true)
                self.data([]);
               
                    $.each(data.items, function (index, val) {
                        self.data.push( {
                            rowNumberRenderer : (index + 1), id : val.id, 
                            person_number : val.person_number, 
                            request_date : val.request_date, 
                            reason : val.reason, 
                            receive_date : val.receive_date, 
                            return_date : val.return_date, 
                            receive_location : val.receive_location, 
                            inside_outside_use : val.inside_outside_use, 
                            remarks : val.remarks, 
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
            var index = currentRow.rowIndex;
            if (currentRow['rowKey']) {
                self.selectedRowKey(currentRow['rowKey']);
                selectedRow = self.data()[currentRow['rowIndex']];
                self.selectedRowData(selectedRow);
                self.selectedIndex(currentRow['rowIndex']);
                self.viewDisabled(false);
                var latestResponseCode = self.data()[index].status;
                if (latestResponseCode == "Draft") {
                    self.editDisabled(false);
                }else if(latestResponseCode == "مسودة"){
                    self.editDisabled(false);
                }
                else {
                    self.editDisabled(true);
                }

            }
        }

        rootViewModel.getNoOfNotifications();

        self.addEmployeeCarRequest = function () {
            self.mode('AddEmployeeCarRequest');
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('createEmployeeCarRequestSpecialist');
            }
            else {
                oj.Router.rootInstance.go('createEmployeeCarRequest');
            }
            //added
        }

        self.editEmployeeCarRequest = function () {

            if (self.selectedRowKey()) {
                self.mode('EditEmployeeCarRequest');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeCarRequest(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('editEmployeeCarRequestSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('editEmployeeCarRequest');
                }
                //added
            }

        }

        self.viewEmployeeCarRequest = function () {
        
            if (self.selectedRowKey()) {
                self.mode('ViewEmployeeCarRequest');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeCarRequest(self.data()[self.selectedIndex()]);
                
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('viewEmployeeCarRequestSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('viewEmployeeCarRequest');
                }
            }

        }

        this.viewEmployeeCarRequestApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName()) : item.role_type == 'LINE_MANAGER' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName()) : item.role_id, type : item.notification_type, status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });
                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };
            
            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'XECR').then(getApprovalList, app.failCbFn);
            }

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary", "true");//added
            if (self.mode() == 'EditEmployeeCarRequest') {
                ko.postbox.publish("editEmployeeCarRequestObj", self.selectedEmployeeCarRequest());
            }
            else if (self.mode() == 'ViewEmployeeCarRequest') {
                ko.postbox.publish("viewEmployeeCarRequestObj", self.selectedEmployeeCarRequest());
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
            services.getEmployeeCarRequest(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getEmployeeCarRequestFn, app.failCbFn);
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
        self.reason = ko.observable();
        self.receiveDate = ko.observable();
        self.returnDate = ko.observable();
        self.receiveLocation = ko.observable();
        self.insideOutsideUse = ko.observable();
        self.remarks = ko.observable();
        self.enddate = ko.observable();
        self.commment = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
//        self.viewReport = ko.observable();
        self.employeeCarRequest = ko.observable();
        self.nodays = ko.observable();
        self.addFirstRecord = ko.observable();
        self.back = ko.observable();//added
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                services.getEmployeeCarRequest(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getEmployeeCarRequestFn, app.failCbFn);
                initTranslations();
            }
        });

        function initTranslations() {
            self.back(getTranslation("others.back"));//added
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.ok(getTranslation("others.ok"));
            
            self.employeeCarRequest(getTranslation("labels.employeeCarRequest"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
//            self.viewReport(getTranslation("identificationLetters.viewReport"));
            
            self.name(getTranslation("labels.name"));
            self.commment(getTranslation("others.comment"));
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
            
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.reason(getTranslation("labels.reason"));
            self.receiveDate(getTranslation("labels.receiveDate"));
            self.returnDate(getTranslation("labels.returnDate"));
            self.receiveLocation(getTranslation("labels.receiveLocation"));
            self.insideOutsideUse(getTranslation("labels.insideOutsideUse"));
            self.remarks(getTranslation("labels.remarks"));
            
            
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            {
                "headerText" : self.reason(), "field" : "reason"
            },
            {
                "headerText" : self.receiveDate(), "field" : "receive_date"
            },
            {
                "headerText" : self.returnDate(), "field" : "return_date"
            },
            {
                "headerText" : self.receiveLocation(), "field" : "receive_location"
            },
            {
                "headerText" : self.insideOutsideUse(), "field" : "inside_outside_use"
            },
            {
                "headerText" : self.remarks(), "field" : "remarks"
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
    return summaryEmployeeCarRequestViewModel;
});