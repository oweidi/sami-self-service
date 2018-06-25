define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryRewarRequesyViewModel() {
        var self = this;
        self.routeValue= ko.observable();  
        
          self.effectiveDate = ko.observable();

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
       
        self.selectedRowKey = ko.observable();
        this.tablesNamesList = ko.observable("XXX_HR_PART_OF_EOS_AMT");
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
       self.ticketsRoutesArr= ko.observableArray(rootViewModel.globalticketsRoutes());
       self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
       
        self.selectedRoutsPric = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.empNumber = ko.observable("");
       
        self.mode = ko.observable();
        
        //----------This Function For push Data TO Our Model -----------------
        var getRoutsPrice = function (data) {
          if(data.items.length !=0){
            self.isVisible(true);
            self.data([]);
          
            $.each(data.items, function (index, val) {
               self.data.push( {
                    rowNumberRenderer : (index + 1),
                    route_name:val.route_name,
                     start_date:val.start_date,
                     end_date : val.end_date, 
                     ticket_class:val.ticket_class,
                     ticket__price : val.ticket__price, 
                      infant_price : val.infant_price,                     
                      adult_price : val.adult_price, 
                      child_price : val.child_price,
                       id : val.id

                   
                   
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
        self.butAddAction = function () {
            self.mode('Add');    
            oj.Router.rootInstance.go('createRoutsPrice');
        }
        //--------------------Action For Edit Button ON Form-------------------
         this.butEditAction = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedRoutsPric(self.data()[self.selectedIndex()]);
                 
                
                oj.Router.rootInstance.go('editRoutsPrice');    
             }

            }
            //----------------------------END------------------------------
            
            //--------------------Action For View Button ON Form-------------------
            this.butViewAction = function() {
                     if(self.selectedRowKey()) {
                          self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());
    
                self.selectedRoutsPric(self.data()[self.selectedIndex()]);

                oj.Router.rootInstance.go('viewRoutsPrice');
            }
            }
            //--------------------------End-------------------------
            //---------------This Function For Search Button ------------------------------
            self.getRoutsPriceRecord = function () 
            {
              services.getRoutsPrice(self.routeValue()).then(getRoutsPrice, app.failCbFn);
              
            }
            //--------------------------END----------------------------------

        

       
        
         
        //---------------This Function For Page Life Cycle ----------------------
        //-----------------First Function Call when OPen Page ------------
        self.handleActivated = function (info) 
        {    
        }
      //-----------------Secound Function Call when OPen Page ------------
         self.handleAttached = function (info) {
        }
        //-----------------First Function Call when Leave Page ------------
         self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editRoutsPricesObj", self.selectedRoutsPric());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedRoutsPric());
            }
        };
         //-----------------Secound Function Call when Leave Page ------------
        self.handleDeactivated = function ()
        {
        
          self.data([]);
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
        self.deleteAction = function ()
        {
        self.selectedRoutsPric(self.data()[self.selectedIndex()]);
        var deletedItems = {"id":self.selectedRoutsPric().id};
        services.deleteRoutsPrices( JSON.stringify(deletedItems)).then(testDelete, app.failCbFn);
        self.data.remove( self.selectedRoutsPric());
         document.querySelector("#deleteDialog").close();
          self.editDisabled(true);
        }
        //-----------END--------------------------

       
       

    }
    return SummaryRewarRequesyViewModel;
});