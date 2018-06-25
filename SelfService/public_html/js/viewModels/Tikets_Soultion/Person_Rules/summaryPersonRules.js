define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryRewarRequesyViewModel() {
        var self = this;
        self.personIndex= ko.observable();  
         this.personsObj= ko.observableArray([]);
          self.effectiveDate = ko.observable();

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.columnArray = ko.observableArray([]); 
        self.selectedRowKey = ko.observable();
        this.tablesNamesList = ko.observable("XXX_HR_PART_OF_EOS_AMT");
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
       
        self.selectedPersonRules = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.empNumber = ko.observable("");
       
        self.mode = ko.observable();
        
        //----------This Function For push Data TO Our Model -----------------
        var getPersonRuless = function (data) {
          if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);
           
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    person_number:val.person_number,
                     person_name:val.person_name,
                    start_date : val.start_date, 
                    end_date : val.end_date, 
                    ticket_class:val.ticket_class,
                    allow_encashment_payment : val.allow_encashment_payment, 
                    allow_nationals : val.allow_nationals, 
                    allow_other_rout_when_apply : val.allow_other_rout_when_apply, 
                    max_accrual_carry_over : val.max_accrual_carry_over, 
                    max_age_of_child : val.max_age_of_child, 
                    number_of_spouse_allowed: val.number_of_spouse_allowed, 
                    percentage_of_adult_ticket_pri : val.percentage_of_adult_ticket_pri,
                    percentage_of_child_ticket_pri : val.percentage_of_child_ticket_pri,
                    percentage_of_infant_ticket_pr : val.percentage_of_infant_ticket_pr,
                    percentage_of_ticket_price : val.percentage_of_ticket_price,
                    id : val.id,
                    ind: ko.observable("0"),
                   
                    latestResponseCode: val.latest_response_code
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
        //------------------------End OF Push Data To Model ---------------------------------------------------------

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
       this.tableSelectionListener = function (event, data) {
            var dataTable = event.detail;
            var currentRow = dataTable.currentRow;
        if (currentRow!=null)
          {
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
        }
      //------------Action For Add Button ON Form ------------------------
        self.addPersonRules = function () {
            self.mode('Add');    
            oj.Router.rootInstance.go('createPersonRules');
        }
        //--------------------Action For Edit Button ON Form-------------------
         this.editPersonRules = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedPersonRules(self.data()[self.selectedIndex()]);
                 settIndex();
                
                  self.data()[self.selectedIndex()].ind( self.personIndex());

                oj.Router.rootInstance.go('editPersonRules');    
             }

            }
            //----------------------------END------------------------------
            //------------------This Function For Set index OF Next Page --------------------------
             function settIndex()
             {

               for (var i=0;i<self.personsObj().length-1;i++)
               {          
                 if ( self.data()[self.selectedIndex()].person_number==self.personsObj()[i].personNumber)
                 {
                    self.personIndex(i);
                    break;
                   
                 }
               }
               return;
             }
             //----------------------------END----------------------------------------------------------
            //--------------------Action For View Button ON Form-------------------
            this.viewPersonRules = function() {
                     if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedPersonRules(self.data()[self.selectedIndex()]);

                oj.Router.rootInstance.go('viewPersonRules');
            }
            }
            //--------------------------End-------------------------
            //---------------This Function For Search Button ------------------------------
            self.getPersonsRulesRecord = function () 
            {
                self.personIndex(self.personIndex()[0]);   
                
                if (self.empNumber()=="")
                {
                 //  self.personsObj()[self.personIndex()].personNumber;
                   services.getPersonRules(self.personsObj()[self.personIndex()].personNumber,self.effectiveDate()).then(getPersonRuless, app.failCbFn);
                }
                else 
                {
                    services.getPersonRules(self.empNumber(),self.effectiveDate()).then(getPersonRuless, app.failCbFn);
                }
            }
            //--------------------------END----------------------------------

        

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editPersonRulesObj", self.selectedPersonRules());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedPersonRules());
            }
        };
        
          var allEmployees = function (data) {
          
            self.personsObj([]);
            var ind = 0;
           $.each(data.employeeBean, function (index, val) {
                
                self.personsObj.push( {
                    indexs:ind,
                    displayName : val.displayName,
                    personId : val.personId,
                    personNumber : val.personNumber
                    
                });
                ind++;
//
            });
          
        };
        //---------------This Function For Page Life Cycle //First Function Call ----------------------
        self.handleActivated = function (info) 
        {
           services.getEmployees("x","x","x").then(allEmployees, app.failCbFn);
            
        }
        //-----------------------------END---------------------------
        var testDelete=  function()
        {
       
        };
        
        //------------Delete Button Actions------------------
        this.deleteButton = function () {
            document.querySelector("#deleteDialog").open();
        };
         this.deleteCancelButton = function () {
            document.querySelector("#deleteDialog").close();
        };
        self.deletePersonRules = function ()
        {
        self.selectedPersonRules(self.data()[self.selectedIndex()]);

        var deletedItems = {"id":self.selectedPersonRules().id};
      
        services.deletePersonRules( JSON.stringify(deletedItems)).then(testDelete, app.failCbFn);
        self.data.remove( self.selectedPersonRules());
         document.querySelector("#deleteDialog").close();
          self.editDisabled(true);
        }
        //-----------END--------------------------

        self.handleAttached = function (info) {
        
        }
        self.handleDeactivated = function ()
        {
        
          self.data([]);
        }
        //language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();          
            self.deleteLabel = ko.observable();
            self.ok = ko.observable();
            self.rowNumber=ko.observable();
            self.startdate=ko.observable();
            self.enddate=ko.observable();
            self.personRules=ko.observable();         
            self.deleteMessage=ko.observable();           
            self.confirmMessage = ko.observable();            
            self.yes = ko.observable();  
            self.no = ko.observable();          
            self.search = ko.observable();           
            self.deleteLabel = ko.observable();  
            self.gradeName = ko.observable();
            self.effectivedate = ko.observable();
            self.personName = ko.observable();         
            self.employeeNumber = ko.observable();
            self.addFirstRecord=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
       self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {   
            self.personName(getTranslation("common.name"));             
            self.employeeNumber(getTranslation("common.personNumber"));        
            self.deleteLabel(getTranslation("others.delete"));        
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.ok(getTranslation("others.ok"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.enddate(getTranslation("labels.enddate"));
            self.startdate(getTranslation("labels.startdate"));
            self.personRules(getTranslation("personRules.personRules"));            
            self.deleteMessage(getTranslation("personRules.deleteMessage"));         
            self.gradeName(getTranslation("gradeRules.gradeName"));             
            self.effectivedate(getTranslation("gradeRules.effectiveDate"));                                                           
            self.confirmMessage(getTranslation("labels.confirmMessage"));               
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));     
            self.search(getTranslation("others.search"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([{"headerText":self.rowNumber(), 
                                           "field": "rowNumberRenderer"},                                         
                                          {"headerText": self.startdate(),
                                           "field": "start_date"},
                                            {"headerText":self.enddate(),
                                           "field": "end_date"},
                                           {"headerText":self.employeeNumber(), 
                                           "field": "person_number"},
                                           {"headerText":self.personName(), 
                                           "field": "person_name"}]); 
      }
    }
    return SummaryRewarRequesyViewModel;
});