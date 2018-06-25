define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services',
'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog',
'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 
'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog'
, 'ojs/ojprogressbar'],
function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryRewarRequesyViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.isDraft = ko.observable(true);
        self.selectedRowKey = ko.observable();
        this.tablesNamesList = ko.observable("XXX_HR_PART_OF_EOS_AMT");
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]); 
        self.selectedRewardRequest = ko.observable();
        self.selectedIndex = ko.observable();
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.mode = ko.observable();
        self.deleteLabel = ko.observable();

        var getRewardRequestCbFn = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    request_date : val.request_date, 
                    service_period : val.service_period, 
                    end_of_service_amount : val.end_of_service_amount, 
                    paid_end_of_service : val.paid_end_of_service, 
                    last_eos_payment_date : val.last_eos_payment_date, 
                    allowed_amount : val.allowed_amount, 
                    requested_amount : val.requested_amount, 
                    reason: val.reason, 
                    payment_period : val.payment_period,
                    id : val.id,
                    ID:val.id,
                    latestResponseCode: val.latest_response_code,
                     commment:val.commment,
                     loan:val.loan,
                     status:val.status,
                     hireDate:val.hire_date,
                    statusLbl:document.documentElement.lang === 'ar' ? val.status_ar : val.status_en
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

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
       this.tableSelectionListener = function (event, data) {
            var dataTable = event.detail;
            var currentRow = dataTable.currentRow;
              if (currentRow){
            if(currentRow['rowKey']){ 
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[ currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);
                    self.viewDisabled(false);
                    
                    var status = self.data()[self.selectedIndex()].status
                    var latestResponseCode = selectedRow.latestResponseCode;
                    if (status!="APPROVED") {
                        self.editDisabled(false);                   
                    }
                    else{
                        self.editDisabled(true);
                    }
         if(selectedRow.status === 'DRAFT')
                self.isDraft(false);
            else
                self.isDraft(true);
           }
           }
        }


       this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()){ 
               
                var  removeObj=self.data()[self.selectedIndex()]
//                    rootViewModel.selectedTableRowKey(removeObj);
                    rootViewModel.deleteSelfService('XX_TICKET_REQUEST','TR',self.selectedRowKey()); 
                    self.data.remove(removeObj);
                     self.isDraft(true);
                }
            }
        self.addRwardRequest = function () {
            self.mode('Add');
            if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('createRewardRequestSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createRewardRequest');
                }//added
        }
         this.editRwardRequest = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedRewardRequest(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editRewardRequestSpecialist');
                }
                else{
                oj.Router.rootInstance.go('editRewardRequest');
                }//added
             }

            }//viewRewardRequest
            this.viewRwardRequest = function() {
                     if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedRewardRequest(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewRewardRequestSpecialist');
                }
                else{
                oj.Router.rootInstance.go('viewRewardRequest');
                }//added
            }
            }




       

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editRewardREquestObj", self.selectedRewardRequest());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedRewardRequest());
            }
        };

        self.handleActivated = function (info) 
        {
           
        }

        self.handleAttached = function (info) {
                 var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true"); 
                }
                else {
                   self.specialistSummary("false");
                }//added
            services.getRewardRequest(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getRewardRequestCbFn, app.failCbFn);
                initTranslations();   
        }
        self.handleDeactivated = function ()
        {
        
          self.data([]);
        }
        this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
        //----------------------------this for View Approval (Approval Button )---------------------------------------- 
         this.viewRwardRequestApproval = function () 
         {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                           name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())   : item.role_id,type : item.notification_type, 
                        type : item.notification_type, 
                        status : item.response_code, 
                        approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                        document.querySelector("#modalDialog1").open();
            };

            if (self.selectedRowKey()) 
            {
                services.getApprovalList(self.selectedRowKey(), 'RRS').then(getApprovalList, app.failCbFn);
            }
            

        }
//language support =========================
            self.back=ko.observable();
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
            self.rowNumber=ko.observable();
            self.requestDate=ko.observable();
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();
            self.addFirstRecord=ko.observable();
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
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.endOfServiceAmount(getTranslation("rewardRequest.endOfServiceAmount"));
            self.paidEndOfService(getTranslation("rewardRequest.paidEndOfService"));
            self.lastEosPaymentDate(getTranslation("rewardRequest.lastEosPaymentDate"));
            self.requestAmount(getTranslation("rewardRequest.requestAmount"));
            self.rewardRequest(getTranslation("rewardRequest.rewardRequest"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);//approval table
         self.columnArray([{"headerText":self.rowNumber(), 
                                           "field": "rowNumberRenderer"},
                            {"headerText": self.requestDate(), 
                                           "field": "request_date"},
                            {"headerText":self.status(), 
                                           "field": "statusLbl"},
                            {"headerText": self.endOfServiceAmount(), 
                                           "field": "end_of_service_amount"},
                            {"headerText": self.paidEndOfService(), 
                                           "field": "paid_end_of_service"},
                            {"headerText": self.lastEosPaymentDate(), 
                                           "field": "last_eos_payment_date"}, 
                            {"headerText": self.requestAmount(), 
                                           "field": "requested_amount"}]);//Reward Request
          self.deleteLabel(getTranslation("others.delete"));
      }
    }
    return SummaryRewarRequesyViewModel;
});