define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryChangeHousingTypeModel() {
        var self = this;

        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.selectedIndex = ko.observable();
        self.selectedRowData = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        this.specialistSummary = ko.observable("");//added
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.selecteChangeHousingType = ko.observable();
        self.isDraft = ko.observable(true);   //add for delete draft           
        var getChangeHousingTypeFn = function (data) {
            if (data.items.length != 0) {
                self.data([]);
                self.isVisible(true);
                self.isShown(false);                
                    $.each(data.items, function (index, val) {                    
                        self.data.push( {
                            rowNumberRenderer : (index + 1), 
                            id : val.id, 
                            person_number : val.person_number, 
                            request_date : val.request_date, 
                            change_date  : val.change_date,
                            change_reason  : val.change_reason,
                            current_housing_type  : val.current_housing_type,
                            new_housing_type  : val.new_housing_type,
                            name:val.name,
                            created_by: val.created_by,
                            creation_date:val.creation_date,
                            updated_by:val.updated_by,
                            updated_date: val.updated_date,
                            status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                            ar_status:val.status_ar,                                
                            en_status:val.status_en,
                            final_approved:val.final_approved,
                            latest_response_code:val.latest_response_code
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
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);

                    self.viewDisabled(false);
                    if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);

                    var latestResponseCode = selectedRow.latest_response_code;
                    var finalApproved = selectedRow.final_approved;

                    if (latestResponseCode && finalApproved) {
                        self.editDisabled(true);
                    }
                    else {
                        self.editDisabled(false);
                    }
                }
            }
        }

        rootViewModel.getNoOfNotifications();

        self.addChangeHousingType = function () {
            self.mode('AddChangeHousingType');
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('createChangeHousingTypeSpecialist');
            }
            else {
                oj.Router.rootInstance.go('createChangeHousingType');
            }
            //added
        }

        self.editChangeHousingType = function () {

            if (self.selectedRowKey()) {
                self.mode('EditChangeHousingType');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selecteChangeHousingType(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('editChangeHousingTypeSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('editChangeHousingType');
                }
                //added
            }

        }

        self.viewChangeHousingType = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewChangeHousingType');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selecteChangeHousingType(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('viewChangeHousingTypeSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('viewChangeHousingType');
                }
            }

        }

        this.viewIdentificationLettersApproval = function () {
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
                services.getApprovalList(self.selectedRowKey(), 'CHT').then(getApprovalList, app.failCbFn);
            }

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary", "true");//added
            if (self.mode() == 'EditChangeHousingType') {
                ko.postbox.publish("editChangeHousingTypeObj", self.selecteChangeHousingType());
            }
            else if (self.mode() == 'ViewChangeHousingType') {
                ko.postbox.publish("viewChangeHousingTypeObj", self.selecteChangeHousingType());
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
            services.getChangeHousingType(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getChangeHousingTypeFn, app.failCbFn);
           
            initTranslations();
        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }       
        this.backAction = function () {
            oj.Router.rootInstance.go('specialist');

        }
        //added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_EMPLOYEE_CHANGE_HOUSING','CHT',self.selectedRowKey()); 
                }
            }
        //language support =========================
        self.addLabel = ko.observable();
        self.editLabel = ko.observable();
        self.viewLabel = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.ok = ko.observable();   
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.changeHousingTypeRequest = ko.observable();
        self.addFirstRecord = ko.observable();
        self.back = ko.observable();        
        self.currentHousingType = ko.observable();
        self.newHousingType = ko.observable();
        self.changeDate = ko.observable();
        self.changeReason = ko.observable();
        self.deleteLabel = ko.observable();//added
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                services.getChangeHousingType(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getChangeHousingTypeFn, app.failCbFn);
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
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.changeHousingTypeRequest(getTranslation("labels.changeHousingTypeRequest"));
            self.approvals(getTranslation("labels.approvals"));
            self.approvalList(getTranslation("labels.approvalList"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.currentHousingType(getTranslation("changeHousingRequest.currentHousingType"));
            self.newHousingType(getTranslation("changeHousingRequest.newHousingType"));
            self.changeDate(getTranslation("changeHousingRequest.changeDate"));
            self.changeReason(getTranslation("changeHousingRequest.changeReason"));
            self.deleteLabel(getTranslation("others.delete"));
            self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            {
                "headerText" : self.currentHousingType(), "field" : "current_housing_type"
            },
            {
                "headerText" : self.newHousingType(), "field" : "new_housing_type"
            },
            {
                "headerText" : self.changeDate(), "field" : "change_date"
            },
            {
                "headerText" : self.changeReason(), "field" : "change_reason"
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
    return summaryChangeHousingTypeModel;
});