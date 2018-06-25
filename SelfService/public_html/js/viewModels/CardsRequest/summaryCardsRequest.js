define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper',
'config/services', 'knockout-postbox' ,'knockout-mapping','promise', 'ojs/ojinputtext',
'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable',
'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain',
'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker',
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], 
function (oj, ko, $, app, commonUtil, services, postbox,km) {

    function SummaryCardsRequestViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.datatest = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.isDraft = ko.observable(true);
        self.selectedRowKey = ko.observable();
      
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.specialistSummary = ko.observable("");//added
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]); 
       
        self.selectedObj = ko.observable();
        self.selectedIndex = ko.observable();
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.mode = ko.observable();
        

        var getCardsCbf = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);//TKT_ROUTE_80
            $.each(data.items, function (index, val) {
           
 self.data.push({
           rowNumberRenderer:index+1,
            id:val.id,
            request_date :val.request_date,         
            type : val.type,
            typeLbl:searchArray(val.type, rootViewModel.globalHrCardsType()),
            mobile_number:val.mobile_number,
            employee_name:val.employee_name,
            employee_namear:val.employee_name_ar,
            position:val.position,
            position_ar:val.position_ar,
            orgnization_name:val.orgnization_name,
            telephone_number:val.telephone_number,
            telephone_extension:val.telephone_extension,
            fax_number:val.fax_number,
            fax_ext:val.fax_ext,
            email:val.email,
            pobox:val.pobox,
            zip_code:val.zip_code,
            include_mobil_number_in_bc:val.include_mobil_number_in_bc,
            remarks:val.remarks,
            grade:val.grade,
            created_by:val.created_by,
            creation_date:val.creation_date,
            person_name:val.person_name,
            person_number:val.person_number,
            person_id:val.person_id,
            name: val.name,
            comments:val.comments,
            manager_id:val.manager_id,
            image_base64:val.image_base64,
            status:val.status,
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
                    rootViewModel.deleteSelfService('XX_CARDS','CRD',self.selectedRowKey()); 
                    self.data.remove(removeObj);
                     self.isDraft(true);
                }
            }
        self.addRwardRequest = function () {
            self.mode('Add');
            if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('createCardsRequestSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createCardsRequest');
                }//added
        }
         this.editButAction= function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedObj(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editCardsRequest');
                }
                else{
                oj.Router.rootInstance.go('editCardsRequest');
                }//added
             }

            }
            this.viewButAction= function() {
                     if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedObj(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewCardsRequest');
                }
                else{
                oj.Router.rootInstance.go('viewCardsRequest');
                }//added
            }
            }




       

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editObj", self.selectedObj());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedObj());
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
                
            services.getCardsReqeust(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getCardsCbf, app.failCbFn);
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
                services.getApprovalList(self.selectedRowKey(), 'CRD').then(getApprovalList, app.failCbFn);
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
            //language support =========================
        self.requestDate = ko.observable();
        self.mobileNumberLbl = ko.observable();
        self.employeeNameLbl = ko.observable();
        self.cardTypeLbl = ko.observable();
        self.cardsRequest = ko.observable();

        self.orgnizationNameLbl = ko.observable();

        self.telephoneExtensionLbl = ko.observable();
        self.arabicNameLbl = ko.observable();
        self.positionNameLbl = ko.observable();
        self.arPositionName = ko.observable();
       
        self.comment = ko.observable();    
        self.telephoneNumberLbl = ko.observable();
        self.faxNumberLbl = ko.observable();
        self.faxExtLbl = ko.observable();
        self.emailLbl = ko.observable();
        self.poBoxLbl = ko.observable();
        self.approvals = ko.observable();
        self.zipCodeLbl = ko.observable();
        self.includeMobilNumberInBCLbl = ko.observable();
        self.remarksLbl = ko.observable();
       self.addFirstRecord= ko.observable();
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
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
       self.requestDate(getTranslation("labels.requestDate"));
                self.cardTypeLbl(getTranslation("cards.cardType"));                
               self.mobileNumberLbl(getTranslation("cards.mobileNumber"));                           
               self.employeeNameLbl(getTranslation("cards.employeeName"));             
               self.arabicNameLbl(getTranslation("cards.arabicName"));             
               self.positionNameLbl(getTranslation("cards.positionName"));
               self.arPositionName(getTranslation("cards.positionNameArabic"));
               
               
               self.cardsRequest(getTranslation("pages.Cards"));
                self.orgnizationNameLbl(getTranslation("cards.orgnizationName"));              
                self.telephoneNumberLbl(getTranslation("cards.telephoneNumber"));            
                self.telephoneExtensionLbl(getTranslation("cards.telephoneExtension"));              
                                    
                self.faxNumberLbl (getTranslation("cards.faxNumber"));                        
                self.faxExtLbl (getTranslation("cards.faxExt"));//relation
                self.emailLbl(getTranslation("cards.email"));               
                self.poBoxLbl (getTranslation("cards.poBox"));              
                self.zipCodeLbl(getTranslation("cards.zipCode"));                
             self.includeMobilNumberInBCLbl(getTranslation("cards.includeMobilNumberInBC"));
             
               self.remarksLbl(getTranslation("cards.remarks"));
           
          
                  self.columnArray([{"headerText":self.rowNumber(), 
                                           "field": "rowNumberRenderer"},
                            {"headerText": self.requestDate(), 
                                           "field": "request_date"},
                            
                            {"headerText": self.cardTypeLbl(), 
                                           "field": "typeLbl"},
                            {"headerText": self.mobileNumberLbl(), 
                                           "field": "mobile_number"},
                            {"headerText": self.positionNameLbl(), 
                                           "field": "position"}, 
                          {"headerText":self.status(), 
                                           "field": "statusLbl"},]);
            
           
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);//approval table

                self.deleteLabel(getTranslation("others.delete"));
      }
    }
    return SummaryCardsRequestViewModel;
});