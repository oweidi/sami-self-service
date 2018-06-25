define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox' ,'knockout-mapping','promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], 
function (oj, ko, $, app, commonUtil, services, postbox,km) {

    function SummaryTicketRequestViewModel() {
        var self = this;
        self.canRebuild=ko.observable(false);
        self.data = ko.observableArray([]);
        self.datatest = ko.observableArray([]);
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
        self.selectedObj = ko.observable();
        self.selectedIndex = ko.observable();
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.mode = ko.observable();
        

        var getTicketRefundCbFn = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);//TKT_ROUTE_80
            $.each(data.items, function (index, val) {
           self.data.push({
           rowNumberRenderer:++index,
            id:val.id,
            requestDate : val.request_date,
            travelDate:val.travel_date,
            reason : val.reason,
            hireDate:val.hire_date,
            tso:val.tso,
            ticketClass:searchArray(val.ticket_class, rootViewModel.globalSaaSTicketClass()),
            route:val.route,
           // rourteLbl:searchArray(val.route, rootViewModel.globalNadecTicketRautes()),
            passengerName1:val.passenger_name_1,
            passengerName2:val.passenger_name_2,
            passengerName3:val.passenger_name_3,
            passengerName4:val.passenger_name_4,
            passengerCost1:val.passenger__cost_1,
            passengerCost2:val.passenger__cost_2,
            passengerCost3:val.passenger__cost_3,
            initialAmount:val.initial_amount,
            child:val.child,
            adult:val.adult,      
           companyShare:val.company_share,
           employeeShare:val.employee_share,
           installmentAmount:val.installment_amount,
            totalAccruedTickets :val. total_accrued_tickets,
            processingPeriod:val.processing_period,
            firstInstallmentPeriod:val.first_installment_period,
            createdBy:val.created_by,
            creationDate:val.creation_date,
            personName:val.person_name,
            personNumber:val.person_number,
            personId:val.person_id,           
            comments:val.comments,
            managerId:val.manager_person_id,          
            status:val.status,
            requestType:val.request_type,
            contractType:val.contract_type,
            employeeIncluded:val.employee_included,
            employeeAmount:val.employee_amount,
            passengerCost1:val.passenger__cost_1,
            passengerCost2:val.passenger__cost_2,
            passengerCost3:val.passenger__cost_3,
            dependent1TicketTripType:val.dependent_1_ticket_trip_type,
            dependent2TicketTripType:val.dependent_2_ticket_trip_type,
            dependent3TicketTripType:val.dependent_3_ticket_trip_type,
            totalTicketsAmount:val.total_tickets_amount,
            returnDate:val.return_date,
            requestTypeLbl:searchArray(val.request_type, rootViewModel.globalNadecTicketRefund()),
           dependent1TicketTripTypeLbl:searchArray(val.dependent_1_ticket_trip_type, rootViewModel.globalNadecTripDirection1()),
           statusLbl:document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
           statusAr:val.status_ar,
           statusEn:val.status_en,
            imageBase64: val.image_base64
            
        });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            }))); 
           self.canRebuild(true);
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
        //    if(selectedRow.en_status === 'Draft') //DRAFT
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
                    rootViewModel.deleteSelfService('XX_TICKET_REFUND','TRF',self.selectedRowKey()); 
                    self.data.remove(removeObj);
                     self.isDraft(true);
                }
            }

        self.addTicketRefund = function () {
            self.mode('Add');
            if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('createTicketRequestRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createTicketRequestRefund');
                }//added
        }
         this.editTicketRefund = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedObj(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('editTicketRequestRefund');
                }
                else{
                oj.Router.rootInstance.go('editTicketRequestRefund');
                }//added
             }

            }//viewRewardRequest
            this.viewTicketRefunf = function() {
                     if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedObj(self.data()[self.selectedIndex()]);
                 if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('viewTicketRequestRefund');
                }
                else{
                oj.Router.rootInstance.go('viewTicketRequestRefund');
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
                 var personID ;
                
                if (searchLocation.indexOf('Specialist') >  - 1) {
               
                   self.specialistSummary("true"); 
                   personID =rootViewModel.specialistSelectedEmployee().PersonId; 
                }
                else {
                   self.specialistSummary("false");
                  personID= rootViewModel.personDetails().personId()
                }//added
                
            services.getTicketReqeustRefund(personID).then(getTicketRefundCbFn, app.failCbFn);
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
                services.getApprovalList(self.selectedRowKey(), 'TRF').then(getApprovalList, app.failCbFn);
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
            self.ticketsTravelDatelbl=ko.observable();
            self.reason=ko.observable();
            self.tecketClassLbl = ko.observable();
             self.ticketsRouteLbl=ko.observable();
             self.passengerNameLbl= ko.observable();
              self.passengerCostLbl= ko.observable();
            self.returnDateLbl = ko.observable();
             self.typeLbl = ko.observable();
             self.ticketClassLbl =ko.observable();
             self.contractTypeLbl=ko.observable();
             self.employeeIncludedLbl =ko.observable();
             self.employeeAmountLbl=ko.observable();
             self.dep1TypeLbl=ko.observable();
             self.dep2TypeLbl=ko.observable();
             self.dep3TypeLbl=ko.observable();
             self.dep1AmountLbl=ko.observable();
             self.dep2AmountLbl=ko.observable();
             self.dep3AmountLbl=ko.observable();
             self.totalAmountLbl=ko.observable();
             self.deleteLabel = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            

        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
            // 
				initTranslations();
                              
                              if(self.canRebuild()==true){
                               services.getTicketReqeustRefund(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getTicketRefundCbFn, app.failCbFn);
                              }
            }
        });
        function initTranslations() {
            self.deleteLabel(getTranslation("others.delete"));
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
            self.ticketsTravelDatelbl(getTranslation("ticketRequest.ticketsTravelDate"));
             self.rewardRequest(getTranslation("ticketRequest.TicketRequestRefund"));
             self.reason(getTranslation("ticketRequest.reason"));
             self.tecketClassLbl(getTranslation("ticketRequest.ticketsClass"));
              self.ticketsRouteLbl(getTranslation("ticketRequest.ticketsRoute"));
               self.passengerNameLbl(getTranslation("ticketRequest.passengerName"));
              self.passengerCostLbl(getTranslation("ticketRequest.passengerNameCost")); 
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.typeLbl(getTranslation("ticketRequest.reqeustType"));
            self.ticketClassLbl(getTranslation("ticketRequest.ticketsClass"));
            self.contractTypeLbl(getTranslation("ticketRequest.contractType"));
            self.employeeIncludedLbl (getTranslation("ticketRequest.employeeIncluded"));
            self.employeeAmountLbl(getTranslation("ticketRequest.employeeAmount"));
            self.dep1TypeLbl(getTranslation("ticketRequest.dep1Type"));
            self.dep2TypeLbl(getTranslation("ticketRequest.dep2Type"));
            self.dep3TypeLbl(getTranslation("ticketRequest.dep3Type"));
            self.dep1AmountLbl(getTranslation("ticketRequest.dep1Amount"));
            self.dep2AmountLbl(getTranslation("ticketRequest.dep2Amount"));
            self.dep3AmountLbl(getTranslation("ticketRequest.dep3Amount"));
             self.totalAmountLbl(getTranslation("ticketRequest.totalAmount"));
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
                                           "field": "requestDate"},
                            {"headerText": self.typeLbl(), 
                                           "field": "requestTypeLbl"},
                            {"headerText": self.reason(), 
                                           "field": "reason"},
                             {"headerText": self.contractTypeLbl(), 
                                           "field": "contractType"},
                             {"headerText": self.passengerNameLbl(), 
                                           "field": "passengerName1"},
                            {"headerText": self.passengerCostLbl(), 
                                           "field": "passengerCost1"},
                             {"headerText": self.dep1TypeLbl(), 
                                           "field": "dependent1TicketTripTypeLbl"},                           
                            {"headerText": self.ticketsTravelDatelbl(), 
                                           "field": "travelDate"},
                            {"headerText": self.reason(), 
                                           "field": "reasonLbl"},
                            {"headerText": self.tecketClassLbl(), 
                                           "field": "ticketClass"},                         
                          {"headerText":self.status(), 
                                           "field": "statusLbl"},]);//Reward Request
      }
    }
    return SummaryTicketRequestViewModel;
});