define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox','ojs/ojknockout',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset'], 
function (oj, ko, $, app, commonUtil, services) {

    function editTicketsRoutesViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
         self.personIndex= ko.observable();  
         this.personsObj= ko.observableArray([]);

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
          };
        //-------------------Get Data From Prev Page-------------------------
        ko.postbox.subscribe("editRoutsPricesObj", function (newValue) {
                            self.RoutsPriceModel.routeName(newValue.route_name);
                            self.RoutsPriceModel.startDate(newValue.start_date);
                           self.RoutsPriceModel.endDate(newValue.end_date);
                            self.RoutsPriceModel.ticketClass(newValue.ticket_class);
                            self.RoutsPriceModel.ticketPrice(newValue.ticket__price);
                           self.RoutsPriceModel.adultPrice(newValue.adult_price);
                            self.RoutsPriceModel.childPrice(newValue.child_price);
                            self.RoutsPriceModel.infantPrice(newValue.infant_price);
                            self.RoutsPriceModel.ID(newValue.id);              
                            
                            self.RoutsPriceModel.routeName([self.RoutsPriceModel.routeName()]);
                            self.RoutsPriceModel.ticketClass([self.RoutsPriceModel.ticketClass()]);          
        });
        //-----------------------END-------------------------------------------     
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
        //--------------------------End------------------------------
          //-------------This Is  Modele---------------------------
        self.RoutsPriceModel = {
             routeName: ko.observable(),
            startDate: ko.observable(),
           endDate : ko.observable( self.formatDate(new Date())),
           ticketClass: ko.observable(),
           ticketPrice: ko.observable(),
           adultPrice:ko.observable(), 
           childPrice: ko.observable(),
            infantPrice: ko.observable(),
            updatedBY: ko.observable(),
            ID: ko.observable()
           };
         //--------------End OF Model--------------------------------     
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        //------------This Functions For Page Life Cycle -----------------------------------------------
        //---------------First Function Calls -------------------
        self.handleActivated = function (info ) 
        {   
         self.currentStepValue('stp1');
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            //clearContent();
        };
       //--------------Secound Function Call ----------------------
        self.handleAttached = function (info) {
            self.currentStepValue('stp1');
        };
        //-----------First Function Call When Leave Page-----------
        self.handleDetached = function (info) {
        };
        //-------Secound Page Call When Leave Page -----------
         self.handleDeactivated = function ()
        {     
        }
        //----------------------------END OF LIFE CYCLE------------------------------------------

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }
       

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

            return "Update Routs Price";
        };
        //-----------This Function Fpr Oben Submit Dialog---------------------------------------
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
        //-------First Action In Dialog Close Dialog ---------------   
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //----------Secound Action In Dialog (OK) --------------
        self.commitRecord = function (data, event) {
            addRoutsPrice();
            return true;
        }
        //-----------Call web Service To CALL Web Service TO Update ------------------------
         function addRoutsPrice() {   
              self.RoutsPriceModel.routeName(self.RoutsPriceModel.routeName()[0]);
         self.RoutsPriceModel.ticketClass(self.RoutsPriceModel.ticketClass()[0]);   
            var jsonData = ko.toJSON(self.RoutsPriceModel);         
            var addrticketPricepCbFn= function (data) {
                $.notify("Routs Price Added", "success");
                oj.Router.rootInstance.go('summaryRoutsPrice');
            };
            services.editRoutsPrices(jsonData).then(addrticketPricepCbFn, app.failCbFn);
        }
        //--------------------End OF Function For Submit Dialog -------------------------------------
        //-------------- This Function For Cancle Button ---------------------------
        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryRoutsPrice');
        }
        /*function to clear table content after submit*/
        function clearContent() {    
        }
 

    }
    return new editTicketsRoutesViewModel();
});