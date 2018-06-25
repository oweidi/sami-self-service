define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryGeneralSetup() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
       
        self.selectedRowKey = ko.observable();
        self.columnArray = ko.observableArray([]); 
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        self.selectedRewardRequest = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
       
        self.mode = ko.observable();
        

        var getRewardRequestCbFn = function (data) {
         if(data.items.length !=0){
             self.isVisible(true);
             self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    start_date : val.start_date, 
                    end_date : val.end_date, 
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
                    ID:"61",
                    person_number:val.person_number,
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



        self.addRwardRequest = function () {
            self.mode('Add');
            
            oj.Router.rootInstance.go('createGeneralSetup');
        }
         this.editRwardRequest = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedRewardRequest(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editGeneralSetup');    
             }

            }
            //-------------This Function For View Button --------------------------------
            this.viewGeneralSetup = function() {
                     if(self.selectedRowKey()) 
                     {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedRewardRequest(self.data()[self.selectedIndex()]);

                oj.Router.rootInstance.go('viewGeneralSetup');
                   }
            }
            //--------------------End OF View Button Function ----------------------     
            //----------This Function FOr Close Dialog -------------

        this.closeDialog = function () 
        {
            $("#modalDialog1").ojDialog("close");
        }
        
        //---------------End-------------------------
        //----------- This Function For Life Cycle ------------------------------------------
        //-------------First Function Call //Call Web Service Here ----
        self.handleActivated = function (info) 
        {
             services.getGenralSummary().then(getRewardRequestCbFn, app.failCbFn);
        }
     
         // ------------------- Secound Function Calls-----------------
        self.handleAttached = function (info) {
                    initTranslations();
        }
        //----------- Send Object TO Next Page---------------------
        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editGeneralSetuptObj", self.selectedRewardRequest());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedRewardRequest());
            }
        };
        self.handleDeactivated = function ()
        {
        
          self.data([]);
        }
        //--------------END OF LIFE CYCLE---------------------------------------------------------
        //------------Delete Button Actions----------------------------
          //------Open Dialog for Delete Row-------------
        this.deleteButton = function () {
            document.querySelector("#rejectDialog").open();
        };
            //------End-----------
           //-----------First Action Cancle----------
         this.deleteCancelButton = function () {
            document.querySelector("#rejectDialog").close();
        };
            //----------END----------
       //-----------------This FunctionCall After Delete Item ------------------------------
        var testDelete=  function()
        {
       
//           self.data.remove( self.selectedRewardRequest());
        //document.querySelector("#rejectDialog").close();
     
        }//----------End OF  FunctionCall After Delete Item------
           //---------Secound Action (YSE)------------
        self.deleteGeneralSetup = function ()
        {
        self.selectedRewardRequest(self.data()[self.selectedIndex()]);
       
        var deletedItems = {"id":self.selectedRewardRequest().id};
      
        services.deleteGenralSummary( JSON.stringify(deletedItems)).then(testDelete, app.failCbFn);
        self.data.remove( self.selectedRewardRequest());
         self.editDisabled(true);
          self.viewDisabled(true);
          document.querySelector("#rejectDialog").close();
          
        }
          //----------END------------------
       //language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();          
            self.deleteLabel = ko.observable();
            self.ok = ko.observable();
            self.rowNumber=ko.observable();
            self.startdate=ko.observable();
            self.enddate=ko.observable();
            self.generalSetup=ko.observable();         
            self.deleteMessage=ko.observable();           
            self.confirmMessage = ko.observable();            
            self.yes = ko.observable();      
            self.no = ko.observable();
            self.addFirstRecord=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {            
            self.deleteLabel(getTranslation("others.delete"));
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.ok(getTranslation("others.ok"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.enddate(getTranslation("labels.enddate"));
            self.startdate(getTranslation("labels.startdate"));
            self.generalSetup(getTranslation("generalSetup.generalSetup"));            
            self.deleteMessage(getTranslation("generalSetup.deleteMessage"));               
            self.confirmMessage(getTranslation("labels.confirmMessage"));               
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([{"headerText": self.rowNumber(), 
                                           "field": "rowNumberRenderer"},                                         
                            {"headerText":self.startdate(), 
                                           "field": "start_date"},
                            {"headerText": self.enddate(), 
                                           "field": "end_date"}]);//General Setup 
      }
        
        

    }
    return SummaryGeneralSetup;
});