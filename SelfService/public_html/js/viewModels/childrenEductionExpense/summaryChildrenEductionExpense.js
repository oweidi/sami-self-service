define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function ChildrenEductionExpenseSummaryContentViewModel() {
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
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
        self.selectedChildrenExpense = ko.observable();
        self.selectedIndex = ko.observable();
        self.mode = ko.observable();
        var managerId = rootViewModel.personDetails().managerId();
        this.specialistSummary = ko.observable("");//added
        var grade = rootViewModel.personDetails().grade();
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.isDraft = ko.observable(true);   //add for delete draft    
        
        var getChildrenEductionExpenseCbFn = function (data) {
        if(data.items.length !=0){
            self.data([]);
            self.isVisible(true);
            self.isShown(false);            
            $.each(data.items, function (index, val) {
            self.data.push( {
            rowNumberRenderer : (index + 1),
            id:val.id,
            request_date:val.request_date,
            semester_from: val.semester_from,
            semester_to: val.semester_to,
            created_by: val.created_by,
            creation_date: val.creation_date,
            updated_by: val.updated_by,
            updated_date: val.updated_date,
            school_year : val.school_year,
            semester_number: val.semester_number,
            dependent_name_1 : val.dependent_name_1,
            dependent_name_2 : val.dependent_name_2,
            dependent_name_3 : val.dependent_name_3,
            dependent_name_4 : val.dependent_name_4,
            dependent_name_5 : val.dependent_name_5,
            amount_1 : val.amount_1,
            amount_2 : val.amount_2,
            amount_3 : val.amount_3,
            amount_4 : val.amount_4,
            amount_5 : val.amount_5,
            latestResponseCode : val.latest_response_code,
            dependent_age: val.dependent_age,
            commment:val.commment,
            person_number:val.person_number,
            payment_period:val.payment_period,
            status:document.documentElement.lang === 'ar' ? val.status_ar : val.status_en, 
            ar_status:val.status_ar,
            en_status:val.status_en,
            attachment_base64 : val.attachment_base64,
            final_approved:val.final_approved
            });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            })));
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
        self.rowNumberRenderer = function (context) {
            return context.cellContext.status.rowIndex + 1;
        }

        self.addChildEductionExpense = function () {
            self.mode('Add');
             if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('createChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createChildrenEductionExpense');
                }
        }

        self.editChildEductionExpense = function () {

            if (self.selectedRowKey()) {
                self.mode('Edit');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedChildrenExpense(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('editChildrenEductionExpense');
                }
            }
          
        }

        self.viewChildEductionExpense = function () {
          if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedChildrenExpense(self.data()[self.selectedIndex()]);
                if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('viewChildrenEductionExpense');
                }
            }
          
        }

        this.viewChildEductionExpenseApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())   : item.role_id, 
                        type : item.notification_type, 
                        status : item.response_code, 
                        approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                        document.querySelector("#modalDialog1").open();
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'CEE').then(getApprovalList, app.failCbFn);
            }
            

        }

        this.closeDialog = function () {
                        document.querySelector("#modalDialog1").close();

        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editChildrenEductionExpenseObj", self.selectedChildrenExpense());
            }
            else if (self.mode() == 'View') {
                ko.postbox.publish("viewChildrenEductionExpenseObj", self.selectedChildrenExpense());
            }
        };

        self.handleActivated = function (info) {

        }
         if(managerId == 'null' || !managerId) {
                self.addDisabled(true);
            }
            

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true"); 
                }
                else {
                   self.specialistSummary("false");
                }//added
            self.personNumber = ko.observable(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            services.getChildrenEductionExpense(self.personNumber()).then(getChildrenEductionExpenseCbFn, app.failCbFn);
            initTranslations();
        }     
        this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
                    this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_CHILDREN_EDUCTION_EXPENSE','CEE',self.selectedRowKey()); 
                }
            }

            //language support =========================
            self.back=ko.observable();
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.ok = ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.approvals = ko.observable();
            self.approvalList = ko.observable();
            self.name = ko.observable();
            self.amount1 = ko.observable();
            self.name1 = ko.observable();
            self.semesterFrom = ko.observable();
            self.semesterTo = ko.observable();
            self.schoolYear = ko.observable();
            self.semesterNum = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.dependentAge = ko.observable();
            self.addFirstRecord = ko.observable();
            self.deleteLabel = ko.observable();
            self.amount_1 = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;

         self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
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
            self.childrenEductionExpense(getTranslation("labels.childrenEductionExpense"));
            self.approvals(getTranslation("labels.approvals"));
            self.approvalList(getTranslation("labels.approvalList"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.semesterFrom(getTranslation("childrenEductionExpense.semesterFrom"));
            self.semesterTo(getTranslation("childrenEductionExpense.semesterTo"));
            self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
            self.semesterNum(getTranslation("childrenEductionExpense.semesterNum"));
            self.name1(getTranslation("childrenEductionExpense.name1"));
            self.amount1(getTranslation("childrenEductionExpense.amount1"));
            self.dependentAge(getTranslation("childrenEductionExpense.dependentAge")); 
            self.amount_1(getTranslation("childrenEductionExpense.amount1")); 
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.deleteLabel(getTranslation("others.delete"));
            self.columnArrayApproval([{"headerText":  self.name(), 
                               "field": "name"},
                               {"headerText": self.type(), 
                               "field": "type"},
                               {"headerText": self.status(), 
                               "field": "status"},
                               {"headerText": self.approvalDate(), 
                               "field": "approvalDate"}]);
            self.columnArray([{"headerText": self.rowNumber(), 
                               "field": "rowNumberRenderer"},
                              {"headerText": self.requestDate(), 
                               "field": "request_date"},                               
                               {"headerText": self.status(), 
                               "field": "status"},
                              {"headerText":self.semesterFrom(), 
                               "field": "semester_from"},
                              {"headerText": self.semesterTo(), 
                               "field": "semester_to"},
                              {"headerText": self.schoolYear(), 
                                   "field": "school_year"},
                              {"headerText": self.semesterNum(), 
                                   "field": "semester_number"},
                              {"headerText": self.name1(), 
                               "field": "dependent_name_1"},
                              {"headerText": self.amount_1(), 
                               "field": "amount_1"}]);
        }  
    }  
    return ChildrenEductionExpenseSummaryContentViewModel;
});