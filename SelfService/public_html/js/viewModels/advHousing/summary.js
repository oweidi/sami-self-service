define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojpagingcontrol' , 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryContentViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
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
        self.selectedAdvHousing = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.isDraft = ko.observable(true);  //add for delete draft            
        this.specialistSummary = ko.observable("");//added
        var getAdvHousingCbFn = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.isShown(false);
            self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    request_date : val.request_date, 
                    hire_date : val.hire_date, 
                    nr_of_month_desired : val.nr_of_month_desired, 
                    months_remaining_contract : val.months_remaining_contract, 
                    housing_amount : val.housing_amount, 
                    installment_amount : val.installment_amount, 
                    person_number : val.person_number, 
                    id : val.id, reason : val.reason, 
                    initial_amount : val.initial_amount, 
                    payment_period : val.payment_period, 
                    first_installment_period : val.first_installment_period, 
                    latestResponseCode : val.latest_response_code,
                    commment:val.commment,
                    status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                    ar_status:val.status_ar,
                    en_status:val.status_en
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

        this.tableSelectionListener = function (event, data) {
            var dataTable = event.detail;
            var currentRow = dataTable.currentRow;
            if(currentRow['rowKey']){ 
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[ currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);
                    self.viewDisabled(false);
                    
                     if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);//added
                    
                    var latestResponseCode = selectedRow.latestResponseCode;
                    if (!latestResponseCode) {
                        self.editDisabled(false);
                    }
                    else{
                        self.editDisabled(false);
                    }
           }
        }
        rootViewModel.getNoOfNotifications();


        self.addAdvancedHousing = function () {
            self.mode('Add');
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('createAdvHousingSpecialist');
                }
            else{
                    oj.Router.rootInstance.go('createAdvHousing');
            }
        }

        self.editAdvancedHousing = function () {

        if (self.selectedRowKey()) {
                self.mode('Edit');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedAdvHousing(self.data()[self.selectedIndex()]);
                  if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('editAdvHousingSpecialist');
                }
                else{
                        oj.Router.rootInstance.go('editAdvHousing');
                }
         }
          

        }

        self.viewAdvancedHousing = function () {
            if (self.selectedRowKey()) {
                self.mode('View');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedAdvHousing(self.data()[self.selectedIndex()]);
               if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('viewAdvHousingSpecialist');
                }
                else{
                        oj.Router.rootInstance.go('viewAdvHousing');
                }
            }
            
        }

        this.viewAdvancedHousingApprovalStatus = function () {

            //              self.personIdSelected(self.data()[index].personId);
            //                    self.selectedRowKey(self.data()[index].TRS_ID);
            //                    self.notificationType(self.data()[index].TYPE)
            //                    rootViewModel.reviewNotiType(self.data()[index].SELF_TYPE);
            /* var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                oj.Router.rootInstance.go('editBusinessTrip'); */

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        this.openDialog = function () {

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
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'AH').then(getApprovalList, app.failCbFn);
            }
          

        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary","true");//added
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editAdvHousingObj", self.selectedAdvHousing());
            }
            else if (self.mode() == 'View') {
                ko.postbox.publish("viewAdvHousingObj", self.selectedAdvHousing());
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
                }//added
            services.getAdvHousing(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvHousingCbFn, app.failCbFn);
            initTranslations();

        }
          this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_ADV_HOUSING','AH',self.selectedRowKey()); 
                }
            }
                                //language support =========================

            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.approvals = ko.observable();
            self.ok = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.monthsDesired= ko.observable();
            self.monthsRemaining= ko.observable();
            self.housingAmount= ko.observable();
            self.installmentAmount= ko.observable();
            self.rowNumber= ko.observable();
             self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.advanceHousingRequest=ko.observable();
             self.name=ko.observable();
             self.type=ko.observable();
             self.status=ko.observable();
             self.approvalDate=ko.observable();
             self.addFirstRecord=ko.observable();
             self.back=ko.observable();
             self.status=ko.observable();
             self.deleteLabel = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
                    services.getAdvHousing(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvHousingCbFn, app.failCbFn);
				initTranslations();
            }
        });
        function initTranslations() {
            self.back(getTranslation("others.back"));//added
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.approvals(getTranslation("labels.approvals"));
            self.ok(getTranslation("others.ok"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.hireDate(getTranslation("labels.hireDate"));
            self.monthsDesired(getTranslation("advanceHousing.monthsDesired"));
            self.monthsRemaining(getTranslation("advanceHousing.monthsRemaining"));
            self.housingAmount(getTranslation("advanceHousing.housingAmount"));
            self.installmentAmount(getTranslation("advanceHousing.installmentAmount"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.advanceHousingRequest(getTranslation("labels.advanceHousingRequest"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));  
            self.status(getTranslation("labels.status"));
            self.deleteLabel(getTranslation("others.delete"));//added
            self.columnArray([{"headerText": self.rowNumber(), 
                               "field": "rowNumberRenderer"},
                            {"headerText": self.requestDate(), 
                               "field": "request_date"},
                            {"headerText": self.hireDate(), 
                               "field": "hire_date"},
                            {"headerText": self.monthsDesired(), 
                               "field": "nr_of_month_desired"},
                            {"headerText": self.monthsRemaining(), 
                               "field": "months_remaining_contract"},
                            {"headerText":self.housingAmount(), 
                               "field": "housing_amount"},
                            {"headerText": self.installmentAmount(), 
                               "field": "installment_amount"},
                            {"headerText":self.status(), 
                                "field": "status"}]);                                           
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);
        }                                  
    }
   
    return SummaryContentViewModel;
});