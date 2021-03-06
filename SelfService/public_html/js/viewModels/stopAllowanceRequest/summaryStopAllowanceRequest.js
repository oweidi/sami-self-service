define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function StopAllowanceRequestSummaryContentViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled = ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
        self.selectedStopAllowanceRequest = ko.observable();
        self.selectedIndex = ko.observable();

        self.mode = ko.observable();
        var managerId = rootViewModel.personDetails().managerId();
        var grade = rootViewModel.personDetails().grade();        
        self.selectedEmployee = ko.observable();        
        this.specialistSummary = ko.observable("");



         ko.postbox.subscribe("Specialist", function (data) {
                    self.specialistSummary(data);
        
        }); 
         ko.postbox.subscribe("summaryStopAllowanceObj", function (data) {
            self.selectedEmployee(data.PersonNumber);
         });
            self.isVisible = ko.observable(false);
            self.isShown = ko.observable(false);
        var getStopAllowanceRequestCbFn = function (data) {
         if(data.items.length !=0){
            self.isVisible(true)
            self.data([]);
            $.each(data.items, function (index, val) {
            self.data.push( {
            rowNumberRender:(index + 1),
            id:val.id,
            request_date:val.request_date,
            created_by: val.created_by,
            creation_date: val.creation_date,
            updated_by: val.updated_by,
            updated_date: val.updated_date,
            allowance_type : val.allowance_type,
            stopping_date : val.stopping_date,
            reason : val.reason,
            latestResponseCode : val.latest_response_code,
            person_number:val.person_number
            });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            })));
         }else{
                self.isShown(true);
         }
        };


        this.tableSelectionListener = function (event) {
            
            var data = event.detail;
            var currentRow = data.currentRow;
            var key = currentRow.rowKey;
            var index = currentRow.rowIndex;
            self.selectedRowKey(key);
            self.selectedIndex(index);
            
            if (self.data()[index]) {
             self.viewDisabled(false);
                var latestResponseCode = self.data()[index].latestResponseCode;
                if (!latestResponseCode) {
                    self.editDisabled(false);
                }
                else {
                    self.editDisabled(true);
                }
            }

        }

        self.addStopAllowanceRequest = function () {
            self.mode('Add');
            oj.Router.rootInstance.go('createStopAllowanceRequest');
        }

        self.editStopAllowanceRequest = function () {
            if (self.selectedRowKey()) {
                self.mode('Edit');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedStopAllowanceRequest(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editStopAllowanceRequest');
            }
        }

        self.viewStopAllowanceRequestBtn = function () {
             if (self.selectedRowKey()) {
                self.mode('View');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedStopAllowanceRequest(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('viewStopAllowanceRequest');
            }     
        }

        this.viewStopAllowanceApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ? rootViewModel.personDetails().displayName() : item.role_type == 'Admin Assistant' ? rootViewModel.personDetails().managerName() : item.role_id, 
                        type : item.notification_type, 
                        status : item.response_code, 
                        approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, 
                        item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                        document.querySelector("#modalDialog1").open();
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'STA').then(getApprovalList, app.failCbFn);
            }
            

        }
         
        self.backAction = function () {
            self.mode('back');
            oj.Router.rootInstance.go('specialist');
        }

        this.closeDialog = function () {
             document.querySelector("#modalDialog1").close();

        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editStopAllowanceRequestObj", self.selectedStopAllowanceRequest());
            }
            else if (self.mode() == 'View') {
                ko.postbox.publish("viewStopAllowanceRequestObj", self.selectedStopAllowanceRequest());
            }
        };

        self.handleActivated = function (info) {

        }
         if(managerId == 'null' || !managerId) {
                self.addDisabled(true);
            }
            
        self.handleAttached = function (info) {
            services.getStopAllowanceRequest(rootViewModel.stopAllowanceSelectedEmployee().PersonNumber).then(getStopAllowanceRequestCbFn, app.failCbFn);
            initTranslations();
        }
        //language support =========================
            self.back = ko.observable();
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.ok = ko.observable();
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.approvals=ko.observable();
            self.employeeAllowance=ko.observable();            
            self.rowNumber= ko.observable();        
            self.requestDate= ko.observable();
            self.allowanceType= ko.observable();            
            self.reason= ko.observable();         
            self.amount= ko.observable();
            self.stoppingDate= ko.observable();
            self.addFirstRecord=ko.observable();
            self.columnArrayApproval = ko.observableArray([]);
            self.columnArray = ko.observableArray([]);
             var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
            self.back(getTranslation("others.back"));
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.ok(getTranslation("others.ok"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));           
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.employeeAllowance(getTranslation("labels.employeeAllowanceRequest"));       
            self.requestDate(getTranslation("labels.requestDate"));          
            self.allowanceType(getTranslation("employeeAllowance.allowanceType"));
            self.amount(getTranslation("employeeAllowance.amount"));
            self.reason(getTranslation("employeeAllowance.reason"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));   
            self.stoppingDate(getTranslation("stopAllowance.stoppingDate"));  
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);//approval table
                                       
          self.columnArray([{"headerText": self.rowNumber(), 
                                          "field": "rowNumberRender"},
                                          {"headerText": self.requestDate(), 
                                           "field": "request_date"},
                                          {"headerText": self.allowanceType(), 
                                           "field": "allowance_type"},
                                           {"headerText": self.stoppingDate(), 
                                            "field": "stopping_date"},
                                          {"headerText": self.reason(), 
                                           "field": "reason"}]);//Employee Allowance Table                                          
      }

    }
    return StopAllowanceRequestSummaryContentViewModel;
});