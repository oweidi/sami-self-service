define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryEmployeeAllowanceModel() {
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
        this.specialistSummary = ko.observable("");
        self.selectedEmployeeAllowance = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.selectedEmployee = ko.observable();
        self.mode = ko.observable();
        self.isDraft = ko.observable(true);  //add for delete draft      
        $( document ).ajaxComplete(function( event, xhr, settings ) {
            $(".se-pre-con").fadeOut("slow");
            });  
        ko.postbox.subscribe("Specialist", function (data) {
            self.specialistSummary(data);

         }); 
        ko.postbox.subscribe("summaryEmployeeGrievanceObj", function (data) {
            self.selectedEmployee(data);
         }); 
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);

        var getEmployeeAllowanceCbFn = function (data) {
         if(data.items.length !=0){
            self.data([]);
            self.isShown(false);
            self.isVisible(true);

            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    id : val.id, 
                    person_number : val.person_number, 
                    request_date : val.request_date, 
                    hire_date : val.hire_date, 
                    housing_type : val.housing_type, 
                    allowance_type_code : val.allowance_type, 
                    allowance_type : searchArray(val.allowance_type, rootViewModel.globalEmployeeAllowance()),
                    allowance_amount : val.allowance_amount,
                    reason:val.reason,
                    latestResponseCode: val.latest_response_code,
                    start_date:val.start_date,
                    end_date:val.end_date,
                    name:val.name,
                    created_by: val.created_by,
                    creation_date:val.creation_date,
                    updated_by:val.updated_by,
                    updated_date: val.updated_date,
                    commment:val.commment,
                    status:document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                    ar_status:val.status_ar,
                    en_status:val.status_en,
                    final_approved:val.final_approved
                });
            });
             self.dataSource( new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {idAttribute: 'id'}))); 
     }  
        else{   
            self.isShown(true);
        }
        };
        
           this.tableSelectionListener = function (event) {
            
            
            var data = event.detail;
            var currentRow = data.currentRow;
            
            self.selectedRowKey(currentRow['rowKey']);
            selectedRow = self.data()[ currentRow['rowIndex']];
            self.selectedIndex(currentRow['rowIndex']);
            self.viewDisabled(false);
            
             if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);//added
                        
            var latestResponseCode = selectedRow.latestResponseCode;
            var finalApproved = selectedRow.final_approved;   
            
            if (latestResponseCode &&  finalApproved) {
                self.editDisabled(true);
            }
            else{
                self.editDisabled(false);
            }


        }
        
        rootViewModel.getNoOfNotifications();
        self.addEmployeeAllowance = function () {
            self.mode('AddEmployeeAllowance');
            oj.Router.rootInstance.go('createEmployeeAllowance');
        }

        self.editEmployeeAllowance = function () {

            if (self.selectedRowKey()) {
                self.mode('EditEmployeeAllowance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeAllowance(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editEmployeeAllowance');
            }
          
        }

        self.viewEmployeeAllowance = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewEmployeeAllowance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeAllowance(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('viewEmployeeAllowance');
            }
          
        }

        this.viewEmployeeAllowanceApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ?rootViewModel.specialistSelectedEmployee().DisplayName : item.role_type == 'LINE_MANAGER' ? rootViewModel.specialistSelectedEmployee().ManagerName : item.role_id, type : item.notification_type, status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'EA').then(getApprovalList, app.failCbFn);
            }
            

        }
          self.backAction = function () {
            self.mode('back');
            oj.Router.rootInstance.go('specialist');
        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'EditEmployeeAllowance') {
                ko.postbox.publish("editEmployeeAllowanceObj", self.selectedEmployeeAllowance());
            }
            else if (self.mode() == 'ViewEmployeeAllowance') {
                ko.postbox.publish("viewEmployeeAllowanceObj", self.selectedEmployeeAllowance());
            }
            else if(self.mode() == 'AddEmployeeAllowance'){
                 ko.postbox.publish("addEmployeeObj", self.selectedEmployee());
            }
        };

        self.handleActivated = function (info) {

        }

        self.handleAttached = function (info) {
            services.getEmployeeAllowance(rootViewModel.specialistSelectedEmployee().PersonNumber).then(getEmployeeAllowanceCbFn, app.failCbFn);
            initTranslations();
        }
            
            this.closeDialog = function() {
               $("#modalDialog1").ojDialog("close"); 
            }
            //added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_EMPLOYEE_ALLOWANCE','EA',self.selectedRowKey()); 
                }
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
            self.addFirstRecord=ko.observable();
            self.deleteLabel = ko.observable();//added
             var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
                    services.getEmployeeAllowance(rootViewModel.specialistSelectedEmployee().PersonNumber).then(getEmployeeAllowanceCbFn, app.failCbFn);
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
            self.deleteLabel(getTranslation("others.delete"));
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);//approval table
                                       
          self.columnArray([{"headerText": self.rowNumber(), 
                                          "field": "rowNumberRenderer"},
                                          {"headerText": self.requestDate(), 
                                           "field": "request_date"},
                                          {"headerText": self.allowanceType(), 
                                           "field": "allowance_type"},
                                           {"headerText": self.amount(), 
                                            "field": "allowance_amount"},
                                          {"headerText": self.reason(), 
                                           "field": "reason"},
                                         {"headerText":self.status(), 
                                            "field": "status"}]);//Employee Allowance Table
      }
    }
    return summaryEmployeeAllowanceModel;
});