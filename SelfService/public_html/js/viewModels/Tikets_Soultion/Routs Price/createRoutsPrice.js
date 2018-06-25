define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox','ojs/ojknockout',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset'], 
function (oj, ko, $, app, commonUtil, services) {

    function createPersonRules() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
         self.personIndex= ko.observable();  
         this.personsObj= ko.observableArray([]);
         self.agreement = ko.observableArray();  

        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var personNumber = rootViewModel.personDetails().personNumber();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
         var x = rootViewModel.personDetails().hireDate();
          self.currentColor = ko.observableArray(["red"]);
          this.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
           this.ticketsClass= ko.observableArray([{"values":"Economy Class"},{"values":"Business Class"},{"values":"First Class"}]);
            self.ticketsRoutesArr= ko.observableArray(rootViewModel.globalticketsRoutes());
          


          self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        
        
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
       
       
        //-----------This IS  Model ----------------------
          self.RoutsPriceModel = {
             routeName: ko.observable(),
            startDate: ko.observable(),
           endDate : ko.observable( self.formatDate(new Date())),
           ticketClass: ko.observable(),
           ticketPrice: ko.observable(),
           adultPrice:ko.observable(), 
           childPrice: ko.observable(),
            infantPrice: ko.observable(),
            ceratedBY: ko.observable()  
           };

       
        
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
       
        
        
        //-------------set start and end date=----------------------------------
       var getDats = function (data) 
       {

        if (data.items.length>0)
        {
        
        self.RoutsPriceModel.startDate(data.items[0].start_date);
        self.RoutsPriceModel.endDate(data.items[0].start_date);
        }
        else 
         {
           self.RoutsPriceModel.startDate(self.formatDate(new Date()));
           self.RoutsPriceModel.endDate(self.formatDate(new Date()));
         }
       }
       //-----------end of set date ----------------------------
       //----------- This Function For Page Life Cycle -------------------------------------------
       //------------ First Function Call Function Calls ----------------
       self.handleActivated = function (info ) 
        {
         self.currentStepValue('stp1');
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');     
        };
        //-----------END-------------------
        //------------Secound Function Call ---------------------------
        self.handleAttached = function (info) {
            self.currentStepValue('stp1');         
        };
        //--------------This Function is First Function call When Leave Page-----------------
        self.handleDetached = function (info) {
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }
        //------------END------------------
     //--------------This Function is Last Function call When Leave Page--------------
        self.handleDeactivated = function ()
        {
        }
        //-----------END---------------
        //------------------------------------END OF Life Cycle ------------------------------------------------------
 
        self.stepArray = ko.observableArray( 
                         [{label : 'Create', id : 'stp1'},
                          {label : 'Review', id : 'stp2'}]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
           if (self.RoutsPriceModel.startDate()>=self.RoutsPriceModel.endDate())
           {
             $.notify("End Date less then start Date   ", "error");
             return ;
           }
           var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
           if (parseInt(self.RoutsPriceModel.ticketPrice())<0)
           {
             $.notify("ticket Price Can,t be negative  ", "error");
             return ;
           }          
            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }
        //---------------------------End OF Validation ----------------------
        self._showComponentValidationErrors = function (trackerObj) 
        {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;
                

            return true;
        };

        self.shouldDisableCreate = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
            return hasInvalidComponents;
        };

        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return "Add Routs Price";
        };
        
        //---------- THIS Function For Submit Button Open This Dialog With two ACttion --------------------------------------
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
          
          
         //-----------First Action Cancle Button IN Dialog -------------------------------
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //------------------Secound Action ok ------------------------
        self.commitRecord = function (data, event) {
            addrticketPrice();
            return true;
        }
        //---------------This Function For Send Request To Web Service //CallFrom Function (commitRecord)---------
        function addrticketPrice() {
        self.RoutsPriceModel.routeName(self.RoutsPriceModel.routeName()[0]);
         self.RoutsPriceModel.ticketClass(self.RoutsPriceModel.ticketClass()[0]);   
            var jsonData = ko.toJSON(self.RoutsPriceModel);         
            
            var addrticketPricepCbFn = function (data) {
                $.notify("summary ticket Price Added", "success");
                oj.Router.rootInstance.go('summaryRoutsPrice');
            };
            services.addRoutsPrices(jsonData).then(addrticketPricepCbFn, app.failCbFn);
        }
        //--------------End OF Subbit Dialog --------------------------------------------------------------------
      //---------------Cancle Action -----------------------------------------
        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryRoutsPrice');
        }
        //--------------END-----------------
        /*function to clear table content after submit*/
        function clearContent() {          
        }
        
       

    }
    return new createPersonRules();
});