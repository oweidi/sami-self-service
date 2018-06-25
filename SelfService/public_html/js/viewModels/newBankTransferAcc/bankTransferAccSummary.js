define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services',
'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 
'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext',
'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 
'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'],
function (oj, ko, $, app, commonUtil, services, postbox) {

    function BankTransferSummaryContentViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.selectedRowData = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
        self.selectedBankTransferACC = ko.observable();
        self.selectedIndex = ko.observable();
        self.specialistSummary = ko.observable("");
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        self.isDraft = ko.observable(true);
        var getNewBankTransferACCCbFn = function (data) {
            self.data([]);
           
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    id : val.id, 
                    person_number : val.person_number, 
                    name : val.name, 
                    request_date : val.request_date, 
                    bank_name : val.bank_name, 
                    branch_name:val.branch_name,
                    iban_number : val.iban_number, 
                    effective_start_date : val.effective_start_date, 
                    remarks : val.remarks,
                    bank_name_Lbl:searchArray(val.bank_name, rootViewModel.globalSABanks()),
                    status:val.status,
                    imageBase64: val.image_base64

                });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            })));

        };

        this.tableSelectionListener = function (event, data) {
           var data = event.detail;
            var currentRow = data.currentRow;
            var index = currentRow.rowIndex;
            if (currentRow){
            if (currentRow['rowKey']) {
                self.selectedRowKey(currentRow['rowKey']);
                selectedRow = self.data()[currentRow['rowIndex']];
                self.selectedRowData(selectedRow);
                self.selectedIndex(currentRow['rowIndex']);
                self.viewDisabled(false);
                var latestResponseCode = self.data()[index].latestResponseCode;
                var finalApproved = selectedRow.finalApproved;
                if (!latestResponseCode) {
                    self.editDisabled(false);
                }
                else {
                    self.editDisabled(true);
                }
         if(selectedRow.status === 'DRAFT')
                self.isDraft(false);
            else
                self.isDraft(true);
                

            }
         }
        }
        rootViewModel.getNoOfNotifications();
     this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()){ 
           
                var  removeObj=self.data()[self.selectedIndex()]
//                    rootViewModel.selectedTableRowKey(removeObj);
                    rootViewModel.deleteSelfService('XX_BANK_TRANS_ACC','BTA',self.selectedRowKey()); 
                    self.data.remove(removeObj);
                     self.isDraft(true);
                }
            }
        self.addBankTransferAccSummary = function () {
            self.mode('AddBankTransfer');
            oj.Router.rootInstance.go('createBankTransferAcc');
        }

        self.editBankTransferAccSummary = function () {

            if (self.selectedRowKey()) {
                self.mode('EditBankTransferAcc');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedBankTransferACC(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editBankTransferAcc');
            }
          
        }

        self.viewBankTransferAccSummary = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewBankTransferAcc');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedBankTransferACC(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('viewBankTransferAcc');
            }
          
        }

        this.viewBankTransferAccApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ? rootViewModel.personDetails().displayName() : item.role_type == 'LINE_MANAGER' ? rootViewModel.personDetails().managerName() : item.role_id, type : item.notification_type, status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'BTA').then(getApprovalList, app.failCbFn);
            }
            

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'EditBankTransferAcc') {
                ko.postbox.publish("editBankTransferAccObj", self.selectedBankTransferACC());
            }
            else if (self.mode() == 'ViewBankTransferAcc') {
                ko.postbox.publish("viewBankTransferAccObj", self.selectedBankTransferACC());
            }
        };

        self.handleActivated = function (info) {

        }

        self.handleAttached = function (info) {
         var searchLocation = window.location.search;
            initTranslations();
         if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
                self.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);
            }
            else {
                self.specialistSummary("false");
                 self.personNumber(rootViewModel.personDetails().personNumber());
            }
          
            services.getNewBankTransferACC(self.personNumber()).then(getNewBankTransferACCCbFn, app.failCbFn);
        }
        //language support =========================
        self.addLabel = ko.observable();
        self.editLabel = ko.observable();
        self.viewLabel = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.ok = ko.observable();
        self.bankNameLbl= ko.observable();
        self.englishName = ko.observable();
       self.effectiveStartDateLbl= ko.observable();
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
        self.deleteLabel = ko.observable();
        self.remarksLbl= ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.viewReport = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.addFirstRecord = ko.observable();
        self.IBANLbl= ko.observable();
        self.back = ko.observable();//added
        self.bankLbl= ko.observable();
         var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
               // services.getIdentificationLetters(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getIdentificationLettersFn, app.failCbFn);
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
            self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
           self.deleteLabel(getTranslation("others.delete"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.bankNameLbl(getTranslation("newBankRequest.bankName")); 
             self.IBANLbl(getTranslation("newBankRequest.IBAN"));
            self.effectiveStartDateLbl(getTranslation("newBankRequest.effectiveStartDate"));
            self.remarksLbl(getTranslation("newBankRequest.remarks"));  
           self.bankLbl(getTranslation("pages.bankTransferRequest"));  
            
           
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
           self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            
            {
                "headerText" : self.bankNameLbl(), "field" : "bank_name_Lbl"
            },
            {
                "headerText" : self.IBANLbl(), "field" : "iban_number"
            },
            {
                "headerText" : self.effectiveStartDateLbl(), "field" : "effective_start_date"
            },
            {
                "headerText" : self.remarksLbl(), "field" : "remarks"
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
    return BankTransferSummaryContentViewModel;
});