define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], 
function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryFamilyVisaRefundViewModel() {
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
         this.specialistSummary = ko.observable("");//added
        self.userPriv = ko.observable('T');
        self.selectedFamilyVisaRefund = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();        
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        self.addDisabled = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.isDraft = ko.observable(true);    //add for delete draft          
        $( document ).ajaxComplete(function( event, xhr, settings ) {
            $(".se-pre-con").fadeOut("slow");
            });  
          

        var getNewFamilyVisaRefundCbFn = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);
            self.isShown(false);
            
            $.each(data.items, function (index, val) {
                self.addDisabled(true);
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    id : val.id, 
                    person_number : val.person_number, 
                    request_date : val.request_date, 
                    contract_type : val.contract_type, 
                    requester_nationality : val.requester_nationality, 
                    amount : val.amount, 
                    remarks : val.remarks,
                    payment_period:val.payment_period,
                    name:val.name,
                    latestResponseCode: val.latest_response_code,
                    attachment_base64 : val.attachment_base64,
                    commment:val.commment,
                    status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
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
            if (currentRow) {

                if (currentRow['rowKey']) {
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);

                    self.viewDisabled(false);
                    
                    if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);//added

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
        self.addFamilyVisaRefund = function () {
            self.mode('AddFamilyVisaRefund');
            if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('createNewFamilyVisaRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createNewFamilyVisaRefund');
                }//added
        }

        self.editFamilyVisaRefund = function () {

            if (self.selectedRowKey()) {
                self.mode('EditFamilyVisaRefund');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedFamilyVisaRefund(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editNewFamilyVisaRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('editNewFamilyVisaRefund');
                }//added
            }
          
        }

        self.viewFamilyVisaRefund = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewFamilyVisaRefund');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedFamilyVisaRefund(self.data()[self.selectedIndex()]);
                  if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewNewFamilyVisaRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('viewNewFamilyVisaRefund');
                }//added
            }
          
        }

        this.viewNewFamilyVisaRefundApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                            name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())   : item.role_id,type : item.notification_type, 
                           type : item.notification_type, 
                           status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'FVR').then(getApprovalList, app.failCbFn);
            }
            

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'EditFamilyVisaRefund') {
                ko.postbox.publish("editFamilyVisaRefundObj", self.selectedFamilyVisaRefund());
            }
            else if (self.mode() == 'ViewFamilyVisaRefund') {
                ko.postbox.publish("viewFamilyVisaRefundObj", self.selectedFamilyVisaRefund());
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
            services.getNewFamilyVisaRefund(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getNewFamilyVisaRefundCbFn, app.failCbFn);
            initTranslations();
        }
            
            this.closeDialog = function() {
               $("#modalDialog1").ojDialog("close"); 
            }
            this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
            //added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_FAMILY_VISA_REFUND','FVR',self.selectedRowKey()); 
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
            self.requestDate = ko.observable();
            self.newFamilyVisaRefund = ko.observable();
            self.contractType = ko.observable();
            self.requesterNationality = ko.observable();
            self.amount = ko.observable();
            self.comments = ko.observable();
            self.remarks = ko.observable();
            self.addFirstRecord=ko.observable();
            self.deleteLabel = ko.observable();//added
            var getTranslation = oj.Translations.getTranslatedString;

            self.refreshView = ko.computed(function() {
                if (app.refreshViewForLanguage()) {
                services.getNewFamilyVisaRefund(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getNewFamilyVisaRefundCbFn, app.failCbFn);
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
                self.approvals(getTranslation("labels.approvals"));
                self.approvalList(getTranslation("labels.approvalList"));
                self.name(getTranslation("labels.name"));
                self.type(getTranslation("labels.type"));
                self.status(getTranslation("labels.status"));
                self.approvalDate(getTranslation("labels.approvalDate"));
                self.requestDate(getTranslation("labels.requestDate"));
                self.newFamilyVisaRefund(getTranslation("newFamilyVisaRefund.newFamilyVisaRefund"));
                self.contractType(getTranslation("newFamilyVisaRefund.contractType"));
                self.requesterNationality(getTranslation("newFamilyVisaRefund.requesterNationality"));
                self.amount(getTranslation("newFamilyVisaRefund.amount"));
                self.comments(getTranslation("newFamilyVisaRefund.comments"));
                self.remarks(getTranslation("newFamilyVisaRefund.remarks"));  
                self.addFirstRecord(getTranslation("labels.addFirstRecord"));  
                self.deleteLabel(getTranslation("others.delete"));//added
                self.columnArray([{"headerText": self.rowNumber(), 
                                   "field": "rowNumberRenderer"},
                                {"headerText": self.requestDate(), 
                                   "field": "request_date"},
                                  {"headerText": self.contractType(), 
                                   "field": "contract_type"},
                                   {"headerText": self.requesterNationality(), 
                                    "field": "requester_nationality"},
                                  {"headerText": self.amount(), 
                                   "field": "amount"},
                                  {"headerText":self.remarks(), 
                                   "field": "remarks"},
                                   {"headerText":self.status(), 
                                   "field": "status"}]);
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
]);;                                           
            }
    }
    return summaryFamilyVisaRefundViewModel;
});