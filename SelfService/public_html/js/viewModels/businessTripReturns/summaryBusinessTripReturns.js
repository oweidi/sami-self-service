define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog',
        'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojprogressbar'
    ],
    function(oj, ko, $, app, commonUtil, services,postbox) {
    
        function SummaryContentViewModel() {
            var self = this;
            this.data = ko.observableArray([]);
            this.btripReference = ko.observableArray([]);            
            this.dataSource = ko.observable();
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);
            this.selectedRowKey = ko.observable();
            this.typeSelected = ko.observable('REG');
            this.editDisabled = ko.observable(true);
            this.viewDisabled = ko.observable(true);
            this.addDisabled = ko.observable(false);
            self.createBtripRef = ko.observableArray([]);
            self.editBtripRef = ko.observableArray([]);
            self.mode = ko.observable();
            this.specialistSummary = ko.observable("");//added
            self.columnArrayApproval = ko.observableArray([]);
            self.columnArray = ko.observableArray([]);
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            self.personNumber = ko.observable(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()) ;
            this.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
            var selectedRow;
            //var managerId = rootViewModel.personDetails().managerId();
            var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
            self.selectedBtripReturn = ko.observable();
            self.mode = ko.observable();
            self.selectedIndex = ko.observable();
            self.isVisible = ko.observable(false);
            self.isShown = ko.observable(false);
            
            $( document ).ajaxComplete(function( event, xhr, settings ) {
            $(".se-pre-con").fadeOut("slow");;
            });  
          
            this.openDialog = function() {
                
                var getApprovalList = function(data) {
                
                   self.dataTB2([]);
                   $.each(data.items, function (i, item) {
                        self.dataTB2.push( {
                           name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())   : item.role_id, 
                            type : item.notification_type, 
                            status : item.response_code, 
                            approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1 ) : item.response_date
                        });
        
                    });
                    self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                     $("#modalDialog1").ojDialog("open");
                };
                
                if(self.selectedRowKey()) {
                    services.getApprovalList(self.selectedRowKey(),'BTR').then(getApprovalList, app.failCbFn);
                }   
            }
            
            this.closeDialog = function() {
               $("#modalDialog1").ojDialog("close"); 
            }

             self.handleActivated = function(info) { 


            }

            if(managerId == 'null' || !managerId) {
                self.addDisabled(true);
            }
        var getBusinessTripReturnsReferenceCbFn = function (data1) {
            self.btripReference([]);
            var description;
            $.each(data1.items, function (index, val) {
             
                if (val.type1 === 'REG') {
                    description = 'Regular Business Trip started in ' + val.startdate + ' and Ended in ' + val.enddate;
                }
                else if (val.type1 === 'TRAIN') {
                    description = 'Training Business Trip started in ' + val.startdate + ' and Ended in ' + val.enddate;
                }
                self.btripReference.push( {
                    id : val.id, value : val.id, 
                    label : description, 
                    city : val.city, 
                    type1 :searchArray(val.type1, rootViewModel.globalTypes()),
                    type1_code : val.type1,
                    startdate : val.startdate,
                    enddate : val.enddate, 
                    location: val.employeelocation,
                    country : searchArray(val.country, rootViewModel.globalCountry()),
                    country_code : val.country, 
                    status : val.status_value, 
                    personNumber : val.person_number,
                    managerPersonId : val.manager_person_id, latestResponseCode : val.latest_response_code,
                    status : val.status, daysbefore : val.daysbefore, daysafter : val.daysafter, numberofdays : 
                    val.numberofdays, accommodationprovided : searchArray(val.accommodationprovided, 
                    rootViewModel.globalYesNo()),
                    transportationprovided : searchArray(val.transportationprovided, rootViewModel.globalYesNo()),
                    foodprovided : searchArray(val.foodprovided, rootViewModel.globalYesNo()),
                    accommodationprovided_code : val.accommodationprovided,
                    transportationprovided_code : val.transportationprovided,
                    foodprovided_code : val.foodprovided, perdiem : val.perdiem, 
                    totalamount : val.totalamount, 
                    transportationprovided : val.transportationprovided, foodprovided : val.foodprovided,
                    perdiem : val.perdiem, ticketclass : val.ticketclass, ticketamount : val.ticketamount,
                    advanceamount : val.advanceamount, pnr : val.pnr,
                    status:val.status
                });
            });

        };
        var getBusinessTripReturnsCbFn = function (data) {
        if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    id: val.id,
                    city : val.city, 
                    btrip_id: val.btrip_id,
                    btrip_reference:val.btrip_reference,
                    type1: searchArray(val.type1, rootViewModel.globalTypes()),
                    type1_code: val.type1,
                    location: val.employeelocation,
                    requestDate: val.request_date,
                    startdate: val.startdate,
                    enddate: val.enddate,
                    country: searchArray(val.country, rootViewModel.globalCountry()),
                    country_code: val.country,
                    status: val.status_value,
                    personNumber: val.person_number,
                    managerPersonId : val.manager_person_id,
                    latestResponseCode: val.latest_response_code,
                    status: val.status,
                    daysbefore: val.daysbefore,
                    daysafter : val.daysafter,
                    numberofdays: val.numberofdays,
                    accommodationprovided: searchArray(val.accommodationprovided,rootViewModel.globalYesNo()),
                    transportationprovided: searchArray(val.transportationprovided,rootViewModel.globalYesNo()),
                    foodprovided :searchArray( val.foodprovided,rootViewModel.globalYesNo()),
                    accommodationprovided_code: val.accommodationprovided,
                    transportationprovided_code: val.transportationprovided,
                    foodprovided_code : val.foodprovided,
                    accomodationamount : val.accomodation_amount,
                    transportationamount : val.transportation_amount,
                    foodamount : val.food_amount,
                    perdiem: val.perdiem,
                    totalamount: val.totalamount,
                    ticketclass: val.ticketclass,
                    ticketamount: val.ticketamount,
                    advanceamount : val.advanceamount,
                    pnr: val.pnr,
                    name:val.name,
                    statusdraft:val.statusdraft
                });
            });
                        self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {
                            idAttribute: 'id'
                        }))); 
            }  
            else{   
                self.isShown(true);
            }
        };
            self.handleAttached = function(info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true"); 
                }
                else {
                   self.specialistSummary("false");
                }//added
                services.getBusinessTripReturns(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getBusinessTripReturnsCbFn, app.failCbFn);
                services.getBusinessTripReturnsReference(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getBusinessTripReturnsReferenceCbFn, app.failCbFn);
                initTranslations();

            }


        this.tableSelectionListener = function (event) {
            
            
                        var dataTable = event.detail;
            var currentRow = dataTable.currentRow;
            if(currentRow['rowKey']){ 
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[ currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);
                    self.viewDisabled(false);
                    
                    
                    var latestResponseCode = selectedRow.latestResponseCode;
                    if (!latestResponseCode) {
                        self.editDisabled(false);
                    }
                    else{
                        self.editDisabled(true);
                    }
           }


        }
            this.addBusinessTrip = function() {                          
             self.mode('Add');
             self.createBtripRef([]);
                self.createBtripRef(self.btripReference().slice(0));
                for(i = 0;i < self.data().length ; i++){
                      idData= self.data()[i].btrip_id;
                  self.createBtripRef.remove(function (ref) {
                        return (ref.id == idData);
                    });     }
             if(self.createBtripRef().length === 0){
                  showNotify('error',getTranslation("businessTrip.btripRefError"));
             }
              else if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('createBusinessTripReturnsSpecialist');
                }
             else{
                oj.Router.rootInstance.go('createBusinessTripReturns');
             }
            }

            this.editBusinessTrip = function() {            
                if(self.selectedRowKey()) { 
                    self.mode('Edit');
                    self.selectedBtripReturn(self.data()[self.selectedIndex()]);
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                     if(self.specialistSummary() == 'true'){
                         oj.Router.rootInstance.go('editBusinessTripReturnsSpecialist');
                    }
                     else{
                    oj.Router.rootInstance.go('editBusinessTripReturns');    
                }
                }

            }
            this.viewBusinessTrip = function() {
                if(self.selectedRowKey()) {
                    self.mode('View');
                    self.selectedBtripReturn(self.data()[self.selectedIndex()]);
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    ko.postbox.publish("notiId", '0');
                    oj.Router.rootInstance.go('viewBusinessTripReturns');
                    if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('viewBusinessTripReturnsSpecialist');
                }
                else{
                    oj.Router.rootInstance.go('viewBusinessTripReturns'); 
            }
                }
                }
         self.handleDetached = function (info) {
         ko.postbox.publish("SpecialistSummary","true");//added
            var i ,idData;
            if (self.mode() == 'Edit') {
              ko.postbox.publish("editBtripReturnObj", self.selectedBtripReturn());
             self.editBtripRef([]);
             self.editBtripRef(self.btripReference().slice(0));
                for( i = 0;i < self.data().length ; i++){
                      idData= self.data()[i].btrip_id;
                      if(self.selectedBtripReturn().btrip_id !== idData)
                    self.editBtripRef.remove(function (ref) {
                        return (ref.id == idData);
                    });     }
              
                
                ko.postbox.publish("btripReferenceObj", self.editBtripRef());
            }
            else if (self.mode() == 'View') {
                ko.postbox.publish("viewBtripReturnObj", self.selectedBtripReturn());
            }
            else if (self.mode() == 'Add') {
               
                ko.postbox.publish("btripReferenceObj", self.createBtripRef());
            }
        };
        this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }//added
                
            //language support start=========================
            self.formats = ko.observableArray(["english"]);
            self.date = ko.observable();
            self.localeDate = ko.observable();
            self.localeDate(oj.Translations.getTranslatedString('date'));
            self.localeGreeting = ko.observable();
            self.formats = ko.observableArray(["english"]);
            self.setLang = function(data) {
                var newLang = '';
                switch (data) {
                    case 'arabic':
                        newLang = 'ar';
                        self.formats(["arabic"]);
                        break;
                    default:
                        newLang = 'en-US';
                        self.formats(["english"]);
                }
                oj.Config.setLocale(newLang, function() {
                    $('html').attr('lang', newLang);
                    if (newLang === 'ar') {
                        $('html').attr('dir', 'rtl');

                    } else {
                        $('html').attr('dir', 'ltr');
                    }
                    self.localeDate(oj.Translations.getTranslatedString('date'));
                    self.localeGreeting(oj.Translations.getTranslatedString('greeting'));
                    $('#dateInput').ojInputDateTime('refresh');
                });
            };
                        //language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
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
            self.businessTripRequest=ko.observable();
             self.name=ko.observable();
             self.type=ko.observable();
             self.status=ko.observable();
             self.approvalDate=ko.observable();
             self.startdate=ko.observable();
             self.enddate=ko.observable();
             self.country=ko.observable();
            self.approvals = ko.observable();
            self.btripDetails = ko.observable();
            self.addFirstRecord=ko.observable();
            self.back=ko.observable();
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
            self.requestDate(getTranslation("labels.requestDate"));
            self.hireDate(getTranslation("labels.hireDate"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.country(getTranslation("labels.country"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.businessTripRequest(getTranslation("pages.businessTripReturns"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals")); 
            self.btripDetails(getTranslation("businessTrip.btripDetails"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([{"headerText": self.rowNumber(), 
                               "field": "rowNumberRenderer"},
                              {"headerText": self.status(), 
                                "field": "statusdraft"},
                              {"headerText": self.btripDetails(), 
                               "field": "btrip_reference"},
                               {"headerText": self.type(), 
                               "field": "type1"},
                              {"headerText":self.startdate(), 
                               "field": "startdate"},
                              {"headerText": self.enddate(), 
                               "field": "enddate"},
                              {"headerText": self.country(), 
                               "field": "country"}]);                                               
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