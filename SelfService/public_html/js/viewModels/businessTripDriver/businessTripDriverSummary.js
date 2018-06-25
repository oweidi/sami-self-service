define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function BusinessTripDriverSummaryContentViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.addDisabled = ko.observable(false);
        this.viewDisabled = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
        self.selectedBusinessTripDriver = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        this.specialistSummary = ko.observable("");//added
        self.isDraft = ko.observable(true);  //add for delete draft            
        self.driverAreaArray = ko.observableArray(rootViewModel.globalBTripDriverArea());       
        self.driverTypeArray = ko.observableArray(rootViewModel.globalBTripDriverType());
//        var managerId = rootViewModel.personDetails().managerId();
        var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();//added
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        var getBusinessTripDriverCbFn = function (data) {
        if(data.items.length !=0){
            self.data([]);
            self.isVisible(true);
            self.isShown(false);
            $.each(data.items, function (index, val) {
            self.data.push( {
            rowNumberRenderer : (index + 1),
            id:val.id,
            request_date:val.request_date,
            type:val.type,
            area: val.area,
            areaName: searchArray(val.area,self.driverAreaArray()),
            dirverName:searchArray(val.type,self.driverTypeArray()),
            total_kilo_meters: val.total_kilo_meters,
            trips_number: val.trips_number,
            start_date: val.start_date,
            end_date: val.end_date,
            latestResponseCode : val.latest_response_code,
            days_number: val.days_number,
            person_number : val.person_number,
            manager_person_id:val.payment_period,
            payment_period:val.payment_period,
            notes:val.notes,
            status:document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
            ar_status:val.status_ar,                                
            en_status:val.status_en,
            image_base64: val.image_base64
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
            var key = currentRow.rowKey;
            var index = currentRow.rowIndex;
            self.selectedRowKey(key);
            self.selectedIndex(index);
            selectedRow = self.data()[ currentRow['rowIndex']];
    
             if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);//added 
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
        
        if(managerId == 'null' || !managerId) {
            self.addDisabled(true);
        }
         
        rootViewModel.getNoOfNotifications();

        self.addbBusinessTripDriver = function () {
            self.mode('Add');
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('createBusinessTripDriverSpecialist');
                }
            else{
                    oj.Router.rootInstance.go('createBusinessTripDriver');
            }
        }

        self.editBusinessTripDriver = function () {

            if (self.selectedRowKey()) {
                self.mode('Edit');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedBusinessTripDriver(self.data()[self.selectedIndex()]);
                if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editBusinessTripDriverSpecialist');
                }
                else{
                oj.Router.rootInstance.go('editBusinessTripDriver');
                }
            }
          
        }

        self.viewBusinessTripDriver = function () {
          if(self.selectedRowKey()) {
                          self.mode('View');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());    
                self.selectedBusinessTripDriver(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewBusinessTripDriverSpecialist');
                }
                else{
                oj.Router.rootInstance.go('viewBusinessTripDriver');
                }
            }
          
        }

        this.viewBusinessTripDriverApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                         name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())   
                            : item.role_type == 'LINE_MANAGER+1' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerOfMnagerName()) 
                            : item.role_id, 
                        type : item.notification_type, 
                        status : item.response_code, 
                        approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                        document.querySelector("#modalDialog1").open();
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'BTD').then(getApprovalList, app.failCbFn);
            }
            

        }

        this.closeDialog = function () {
                        document.querySelector("#modalDialog1").close();

        }

            self.handleDetached = function (info) {
                 ko.postbox.publish("SpecialistSummary","true");//added
                if (self.mode() == 'Edit') {
                    ko.postbox.publish("editBusinessTripDriverObj", self.selectedBusinessTripDriver());
                }
                else if (self.mode() == 'View') {
                    ko.postbox.publish("viewBusinessTripDriverObj", self.selectedBusinessTripDriver());
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
                services.getBusinessTripDriver(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getBusinessTripDriverCbFn, app.failCbFn);
                initTranslations();
            }
             this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_BUSINESS_TRIP_DRIVER','BTD',self.selectedRowKey()); 
                }
            }
            //language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.ok = ko.observable();
            self.totalKm= ko.observable();
            self.tripsNumber= ko.observable();
            self.rowNumber= ko.observable();
            self.columnArray=ko.observableArray([]);
            self.columnArrayApproval=ko.observableArray([]);
            self.newBusinessTripDriverRequests=ko.observable();
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.startdate=ko.observable();
            self.enddate=ko.observable();
            self.country=ko.observable();
            self.approvals = ko.observable();
            self.nodays = ko.observable();
            self.approvalList = ko.observable();
            self.addFirstRecord=ko.observable();
            self.back=ko.observable();
            self.deleteLabel = ko.observable();
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
            self.totalKm(getTranslation("businessTripDriver.totalKm"));
            self.tripsNumber(getTranslation("businessTripDriver.tripsNumber"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.country(getTranslation("labels.country"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.newBusinessTripDriverRequests(getTranslation("labels.newBusinessTripDriverRequests"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.deleteLabel(getTranslation("others.delete"));
            self.columnArray([{"headerText": self.rowNumber(), 
                                   "field": "rowNumberRenderer"},
                                  {"headerText": self.type(), 
                                   "field": "dirverName"},
                                  {"headerText": self.country(), 
                                   "field": "areaName"},
                                 {"headerText":self.status(), 
                                   "field": "status"},
                                  {"headerText": self.totalKm(), 
                                   "field": "total_kilo_meters"},
                                {"headerText": self.tripsNumber(), 
                                   "field": "trips_number"},
                               {"headerText":self.startdate(), 
                                   "field": "start_date"},
                                  {"headerText": self.enddate(), 
                                   "field": "end_date"},
                                {"headerText":self.nodays(), 
                                   "field": "days_number"}]);                                           
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
    return BusinessTripDriverSummaryContentViewModel;
});