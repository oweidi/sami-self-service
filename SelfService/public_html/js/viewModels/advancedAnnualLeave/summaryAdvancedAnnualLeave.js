define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryAdvancedAnnualLeaveViewModel() {
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
        self.selectedAdvancedAnnualLeave = ko.observable();
        self.selectedIndex = ko.observable();
        self.selectedRowData = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        this.specialistSummary = ko.observable("");//added
        self.isDraft = ko.observable(true);   //add for delete draft           

        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        
        var getAdvancedAnnualLeaveFn = function (data) {

            if (data.items.length != 0) {
                self.isVisible(true)
                self.data([]);
               
                    $.each(data.items, function (index, val) {
                        self.data.push( {
                            rowNumberRenderer : (index + 1), id : val.id, 
                            person_number : val.person_number, 
                            request_date : val.request_date, 
                            leave : val.leave, 
                            leaveType : val.leave_type, 
                            leaveSD : val.leave_start_date, 
                            leaveED : val.leave_end_date, 
                            commment : val.commment, 
                            status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                            ar_status:val.status_ar,
                            en_status:val.status_en,            
                            final_approved:val.final_approved
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
                    {
                        self.isDraft(false);
                    }
                    else 
                    {
                        self.isDraft(true);
                    }                        
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

        self.addAdvancedAnnualLeave = function () {
            self.mode('AddAdvancedAnnualLeave');
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('createAdvancedAnnualLeaveSpecialist');
            }
            else {
                oj.Router.rootInstance.go('createAdvancedAnnualLeave');
            }
            //added
        }

        self.editAdvancedAnnualLeave = function () {

            if (self.selectedRowKey()) {
                self.mode('EditAdvancedAnnualLeave');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedAdvancedAnnualLeave(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('editAdvancedAnnualLeaveSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('editAdvancedAnnualLeave');
                }
                //added
            }

        }

        self.viewAdvancedAnnualLeave = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewAdvancedAnnualLeave');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedAdvancedAnnualLeave(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('viewAdvancedAnnualLeaveSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('viewAdvancedAnnualLeave');
                }
            }

        }

        this.viewAdvancedAnnualLeaveApproval = function () {
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
                services.getApprovalList(self.selectedRowKey(), 'AAL').then(getApprovalList, app.failCbFn);
            }

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary", "true");//added
            if (self.mode() == 'EditAdvancedAnnualLeave') {
                ko.postbox.publish("editAdvancedAnnualLeaveObj", self.selectedAdvancedAnnualLeave());
            }
            else if (self.mode() == 'ViewAdvancedAnnualLeave') {
                ko.postbox.publish("viewAdvancedAnnualLeaveObj", self.selectedAdvancedAnnualLeave());
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
            services.getAdvancedAnnualLeave(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvancedAnnualLeaveFn, app.failCbFn);
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
                console.log(self.selectedRowKey());
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_ADVANCED_ANNUAL_LEAVE','AAL',self.selectedRowKey()); 
                }
            }
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
        self.leave = ko.observable();
        self.leaveType = ko.observable();
        self.leaveSD = ko.observable();
        self.leaveED = ko.observable();
        self.enddate = ko.observable();
        self.commment = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.annualLeaveLabels = ko.observable();
        self.nodays = ko.observable();
        self.addFirstRecord = ko.observable();
        self.back = ko.observable();
        self.deleteLabel = ko.observable();//added
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                services.getAdvancedAnnualLeave(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvancedAnnualLeaveFn, app.failCbFn);
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
            self.leave(getTranslation("annualLeave.leave"));
            self.leaveType(getTranslation("annualLeave.leaveType"));
            self.leaveSD(getTranslation("annualLeave.leaveSD"));
            self.leaveED(getTranslation("annualLeave.leaveED"));
            
            self.annualLeaveLabels(getTranslation("labels.AnnualLeave"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
//            self.viewReport(getTranslation("identificationLetters.viewReport"));
            
            self.name(getTranslation("labels.name"));
            self.commment(getTranslation("others.comment"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
        
            self.deleteLabel(getTranslation("others.delete"));        
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            {
                "headerText" : self.leave(), "field" : "leave"
            },
            {
                "headerText" : self.leaveType(), "field" : "leaveType"
            },
            {
                "headerText" : self.leaveSD(), "field" : "leaveSD"
            },
            {
                "headerText" : self.leaveED(), "field" : "leaveED"
            },
            {
                "headerText" : self.commment(), "field" : "commment"
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
    return summaryAdvancedAnnualLeaveViewModel;
});