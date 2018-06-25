define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog',
        'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojprogressbar'
    ],
    function(oj, ko, $, app, commonUtil, services,postbox) {
    
        function SummaryContentViewModel() {
            var self = this;
            
            this.data = ko.observableArray([]);
            this.dataSource = ko.observable();
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);
            this.selectedRowKey = ko.observable();
            this.typeSelected = ko.observable('REG');
            this.editDisabled = ko.observable(true);
            this.viewDisabled = ko.observable(true);
            this.addDisabled = ko.observable(false);
            this.specialistSummary = ko.observable("");
            self.columnArrayApproval = ko.observableArray([]);
            self.columnArray = ko.observableArray([]);
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            this.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
            var selectedRow;
            self.isDraft = ko.observable(true);
            var managerId = self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId();
            self.isVisible = ko.observable(false);
            self.isShown = ko.observable(false);
            $( document ).ajaxComplete(function( event, xhr, settings ) {
            $(".se-pre-con").fadeOut("slow");;
            }); 
                this.types = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
      function builBbusinessTripTypes() {
            self.types([]);
           self.types(rootViewModel.globalTypes());
            
        }
          
            this.openDialog = function() {
                
                var getApprovalList = function(data) {
                
                   self.dataTB2([]);
                   $.each(data.items, function (i, item) {
                        self.dataTB2.push( {
                            name : item.role_type == 'EMP' ?( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName())
                            : item.role_type == 'LINE_MANAGER' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName())  
                             : item.role_type == 'LINE_MANAGER+1' ? ( self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerOfMnagerName()) 
                             : item.role_id, 
                            type : item.notification_type, 
                            status : item.response_code, 
                            approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1 ) : item.response_date
                        });
        
                    });
                    self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                     $("#modalDialog1").ojDialog("open");
                };
                
                if(self.selectedRowKey()) {
                    services.getApprovalList(self.selectedRowKey(),'BT').then(getApprovalList, app.failCbFn);
                }   
            }
            
            this.closeDialog = function() {
               $("#modalDialog1").ojDialog("close"); 
            }

             self.handleActivated = function(info) { 
            }

            if(managerId == 'null' || !managerId) {
              //  self.addDisabled(true);
            }
            self.handleAttached = function(info) {
            builBbusinessTripTypes();
              var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }
                 initTranslations();
                $.ajax({
                    type: "GET",
                    url: "https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/btrip2/",
                    headers: {
                        "personNumber": self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId() ,
                        "Authorization" : "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA=="
                    },
                    data: {

                    },
                    success: function(response) {
                if(response.items.length !=0){
                  self.isVisible(true);
                        self.data([]);
                        //status : document.documentElement.lang === 'ar' ? self.data().ar_status : val.status_en
                        
                        
                        $.each(response.items, function(index, val) {
                            self.data.push({
                                rowNumberRenderer : (index + 1),
                                id: val.id,
                                type1: searchArray(val.type1,   self.types()),
                                startdate: val.startdate,
                                enddate: val.enddate,
                                country: searchArray(val.country, rootViewModel.globalCountry()),
                                city:val.city,
                                status: document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                                personNumber: val.person_number,
                                managerPersonId : val.manager_person_id,
                                latestResponseCode: val.latest_response_code,
                                statusdraft:val.statusdraft,
                                ar_status:val.status_ar,
                                en_status:val.status_en,
                                toCityLbl:val.to_city_lbl
                            });
                        });
                        self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {
                            idAttribute: 'id'
                        })));
                  }  
                    else{   
                        self.isShown(true);
                    }
                    }
                });
            }




            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {
                idAttribute: 'id'
            })));


        this.tableSelectionListener = function (event) {
            
            
            var data = event.detail;
            var currentRow = data.currentRow;
            
            self.selectedRowKey(currentRow['rowKey']);
            selectedRow = self.data()[ currentRow['rowIndex']];
            self.viewDisabled(false);
            
            if(selectedRow.en_status === 'Draft') 
                self.isDraft(false);
            else
                self.isDraft(true);
            var latestResponseCode = selectedRow.latestResponseCode;
            if (!latestResponseCode) {
                self.editDisabled(false);
            }
            else{
                self.editDisabled(false);
            }


        }
            this.addBusinessTrip = function() {
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('createBusinessTripSpecialist');
                }
                else{
                oj.Router.rootInstance.go('createBusinessTrip');
            }
            }
            self.handleDetached = function(info) {

                ko.postbox.publish("SpecialistSummary","true");
            };
            
            this.backAction = function() {
                      oj.Router.rootInstance.go('specialist');
                
            }
            this.editBusinessTrip = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                     if(self.specialistSummary() == 'true'){
                         oj.Router.rootInstance.go('editBusinessTripSpecialist');
                    }
                     else{
                    oj.Router.rootInstance.go('editBusinessTrip');    
                }
                }

            }
            this.viewBusinessTrip = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    ko.postbox.publish("notiId", '0');
                    oj.Router.rootInstance.go('viewBusinessTrip');    
                    if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('viewBusinessTripSpecialist');
                }
                else{
                    oj.Router.rootInstance.go('viewBusinessTrip'); 
            }
                }
            }
            
            this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_BTRIP','BT',self.selectedRowKey()); 
                }
            }
                         
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
            self.back=ko.observable();            
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
              self.city=ko.observable();
            self.approvals = ko.observable();
            self.addFirstRecord=ko.observable();
            self.deleteLabel = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
                                    $.ajax({
                    type: "GET",
                    url: "https://apex-hcuk.db.em2.oraclecloudapps.com/apex/xx_selfService/btrip2/",
                    headers: {
                        "personNumber": self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId() ,
                        "Authorization" : "Basic YW1yby5hbGZhcmVzQGFwcHNwcm8tbWUuY29tOkFwcHNwcm9AMTIzNA=="
                    },
                    data: {

                    },
                    success: function(response) {
                if(response.items.length !=0){
                  self.isVisible(true);
                        self.data([]);
                        //status : document.documentElement.lang === 'ar' ? self.data().ar_status : val.status_en
                        
                        
                        $.each(response.items, function(index, val) {
                            self.data.push({
                                rowNumberRenderer : (index + 1),
                                id: val.id,
                                type1: searchArray(val.type1,   self.types()),
                                startdate: val.startdate,
                                enddate: val.enddate,
                                country: searchArray(val.country, rootViewModel.globalCountry()),
                                city:val.city,
                                status: document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                                personNumber: val.person_number,
                                managerPersonId : val.manager_person_id,
                                latestResponseCode: val.latest_response_code,
                                statusdraft:val.statusdraft,
                                ar_status:val.status_ar,
                                en_status:val.status_en,
                                 toCityLbl:val.to_city_lbl
                            });
                        });
                        self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {
                            idAttribute: 'id'
                        })));
                  }  
                    else{   
                        self.isShown(true);
                    }
                    }
                });
           
            }
        });
        function translatStatus ()
        {  
           for (var i=0;i<self.data().length;i++)
           {
              if (document.documentElement.lang === 'ar')
              {
                 self.data()[i].status(self.data()[i].ar_status)
              }
              else{
                 self.data()[i].status(self.data()[i].en_status)
              }
           }
        
           // if 
        }
        function initTranslations() {
            self.back(getTranslation("others.back"));
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
            self.businessTripRequest(getTranslation("labels.businessTripRequest"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));  
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.city(getTranslation("businessTrip.toCity"));
            self.deleteLabel(getTranslation("others.delete"));
            
            self.columnArray([{"headerText": self.rowNumber(), 
                               "field": "rowNumberRenderer"},
                              {"headerText": self.type(), 
                               "field": "type1"},
                              {"headerText":self.startdate(), 
                               "field": "startdate"},
                              {"headerText": self.enddate(), 
                               "field": "enddate"},
                              {"headerText": self.country(), 
                               "field": "country"},
                               {"headerText": self.city(), 
                               "field": "toCityLbl"},
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