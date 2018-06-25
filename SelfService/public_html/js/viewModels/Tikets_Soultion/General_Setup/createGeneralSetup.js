define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox','ojs/ojknockout',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset'], 
function (oj, ko, $, app, commonUtil, services) {

    function createGeneralSetup() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        
        
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
       
       
       
        self.currentColor = ko.observableArray(["red"]);
        
        

        self.genralSetUpModel = {
            startDate : ko.observable(),
           endDate : ko.observable( self.formatDate(new Date())),
           maxcarryover : ko.observable(0),
           alloweEncashmentPayment :ko.observable(100), 
           // alloweEncashmentPayment :ko.observableArray(["true"]),
           PrrcentageOFTicketprice : ko.observable(100),
            PrrcentageOFAdultTicketprice : ko.observable(100),
            PrrcentageOFChildTicketprice : ko.observable(100),
            PrrcentageOFInfantTicketprice : ko.observable(100),
           maxAge : ko.observable(12),
           AllowNationals:ko.observable(100),
           personNumber:ko.observable(100),
           NumberOFSpouseAllowed: ko.observable(""),
            AllowOtherRoutWhenApply: ko.observable(""),
             personeNumber:"100002"
           
       
          
        };
       
        
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
      
        
        //----------This Function For  Page Life Cycle  // First Function Call ------------------------
        self.handleActivated = function (info ) 
        {
        
         self.currentStepValue('stp1');
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            //clearContent();
             
        };
        //----------------End ----------------------------------------------
        
        //-------------set start and end date=----------------------------------
       var getRewardRequestCbFn = function (data) 
       {
        
        if (data.items.length>0)
        {
       
        self.genralSetUpModel.startDate(data.items[0].start_date);
        self.genralSetUpModel.endDate(data.items[0].start_date);
        }
        else 
         {
           self.genralSetUpModel.startDate(self.formatDate(new Date()));
           self.genralSetUpModel.endDate(self.formatDate(new Date()));
         }
       }
       //-----------end of set date ----------------------------
       //------------Secound Function Call----------------
        self.handleAttached = function (info) {     
            self.currentStepValue('stp1');
           services.getGenralSummary().then(getRewardRequestCbFn, app.failCbFn);
           initTranslations();
            
        };
        self.handleDetached = function (info) {
        };
        //--------------End OF handleAttached---------------------
        //----------This Function FOR  Table Select Item 

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }
        //-------------End OF Selection ----------------

        self.stepArray = ko.observableArray([]);
                          
    //------------------This Function FOR Action Back Button -----------------------------
        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        //-------------------End OF Back Button ---------------
//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
           if (self.genralSetUpModel.startDate()>=self.genralSetUpModel.endDate())
           {
             $.notify(self.notifyDate(), "error");
             return ;
           }
           var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
           if (parseInt(self.genralSetUpModel.maxcarryover())<0)
           {
             $.notify( self.notifyCarry(), "error");
             return ;
           }
           if (parseInt(self.genralSetUpModel.PrrcentageOFTicketprice())<0||parseInt(self.genralSetUpModel.PrrcentageOFTicketprice())>100)
           {               
             $.notify(self.notifyTicket(), "error");
             return ;
           }
            if (parseInt(self.genralSetUpModel.PrrcentageOFAdultTicketprice())<0||parseInt(self.genralSetUpModel.PrrcentageOFAdultTicketprice())>100)
           {
             $.notify(self.notifyAdultTicket(), "error");
             return ;
           }
            if (parseInt(self.genralSetUpModel.PrrcentageOFChildTicketprice())<0||parseInt(self.genralSetUpModel.PrrcentageOFChildTicketprice())>100)
           {
             $.notify(self.notifyChildTicket(), "error");
             return ;
           }
            if (parseInt(self.genralSetUpModel.PrrcentageOFInfantTicketprice())<0||parseInt(self.genralSetUpModel.PrrcentageOFInfantTicketprice())>100)
           {
             $.notify(self.notifyInfantTicket(), "error");
             return ;
           }
            if (parseInt(self.genralSetUpModel.maxAge())<0)
           {
             $.notify(self.notifyMaxAge(), "error");
             return ;
           }
            if (parseInt(self.genralSetUpModel.NumberOFSpouseAllowed())<0)
           {
             $.notify(self.notifySpouseAllowed(), "error");
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

            return self.generalSetup();
        };
        
        //----------This Function For Oben Submit Dialog ------------------------
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
       //-----Include Two Acction 1)Cancle--2)OK
          
          //------------Cancle Button  -------------------
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        //---------- Ok Action ----------------------------
        self.commitRecord = function (data, event) {
            addrGenralSetUp();
            return true;
        }
        //---------Cancle Action For Dialog Submit------------- 
        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryGeneralSetup');
        }
        //-----This Function For Call WEb Service To Add New Recorde //Call From commitRecord
        function addrGenralSetUp() {   
          
             self.genralSetUpModel.alloweEncashmentPayment(self.genralSetUpModel.alloweEncashmentPayment()[0]);
             self.genralSetUpModel.AllowOtherRoutWhenApply(self.genralSetUpModel.AllowOtherRoutWhenApply()[0]);
              self.genralSetUpModel.AllowNationals(self.genralSetUpModel.AllowNationals()[0]);
             //AllowNationals
            var jsonData = ko.toJSON(self.genralSetUpModel);
         
           
            var addgenralSetUpCbFn = function (data) {
                $.notify(self.notifCreate(), "success");
                oj.Router.rootInstance.go('summaryGeneralSetup');
            };
            services.addGenralSummary(jsonData).then(addgenralSetUpCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {    
           
        }
        // -------------This Function For Page Life Cycle 
        self.handleDeactivated = function ()
        {
   
        }
       
 //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();              
            self.startdate=ko.observable();
            self.enddate=ko.observable();   
            self.maxAccrualCarryOvert=ko.observable();  
            self.allowEncashmentPayment=ko.observable();  
            self.percentageOfTicketPrice=ko.observable();  
            self.percentageOfAdultTicketPricet=ko.observable();  
            self.percentageOfChildTicketPricet=ko.observable();  
            self.percentageOfInfantTicketPricet=ko.observable();  
            self.maxAgeOfChild=ko.observable();  
            self.allowNationals=ko.observable();  
            self.numberOfSpouseAllowed=ko.observable();
            self.allowOtherRoutWhenApp=ko.observable();             
            self.generalSetup = ko.observable();
            self.notifyDate= ko.observable();
            self.notifyCarry= ko.observable();
            self.notifyTicket= ko.observable();
            self.notifyAdultTicket= ko.observable();
            self.notifyChildTicket= ko.observable();
            self.notifyInfantTicket= ko.observable();
            self.notifyMaxAge= ko.observable();
            self.notifySpouseAllowed= ko.observable();
            self.notifCreate= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;	
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });            
        function initTranslations() {
               self.ok(getTranslation("others.ok"));
               self.back(getTranslation("others.pervious"));
               self.next(getTranslation("others.next"));
               self.cancel(getTranslation("others.cancel"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));
               self.create(getTranslation("labels.create"));
               self.review(getTranslation("others.review"));           
               self.addMessage (getTranslation("generalSetup.addMessage"));     
               self.enddate(getTranslation("labels.enddate"));
               self.startdate(getTranslation("labels.startdate"));
               self.maxAccrualCarryOvert(getTranslation("generalSetup.maxAccrualCarryOvert")); 
               self.allowEncashmentPayment(getTranslation("generalSetup.allowEncashmentPayment")); 
               self.percentageOfTicketPrice(getTranslation("generalSetup.percentageOfTicketPrice")); 
               self.percentageOfAdultTicketPricet(getTranslation("generalSetup.percentageOfAdultTicketPricet")); 
               self.percentageOfChildTicketPricet(getTranslation("generalSetup.percentageOfChildTicketPricet")); 
               self.percentageOfInfantTicketPricet(getTranslation("generalSetup.percentageOfInfantTicketPricet")); 
               self.maxAgeOfChild(getTranslation("generalSetup.maxAgeOfChild")); 
               self.allowNationals(getTranslation("generalSetup.allowNationals")); 
               self.numberOfSpouseAllowed(getTranslation("generalSetup.numberOfSpouseAllowed")); 
               self.allowOtherRoutWhenApp(getTranslation("generalSetup.allowOtherRoutWhenApp"));               
               self.generalSetup(getTranslation("generalSetup.generalSetup")); 
               self.notifyDate(getTranslation("generalSetup.notifyDate")); 
               self.notifyCarry(getTranslation("generalSetup.notifyCarry")); 
               self.notifyTicket(getTranslation("generalSetup.notifyTicket")); 
               self.notifyAdultTicket(getTranslation("generalSetup.notifyAdultTicket")); 
               self.notifyChildTicket(getTranslation("generalSetup.notifyChildTicket")); 
               self.notifyInfantTicket(getTranslation("generalSetup.notifyInfantTicket")); 
               self.notifyMaxAge(getTranslation("generalSetup.notifyMaxAge")); 
               self.notifySpouseAllowed(getTranslation("generalSetup.notifySpouseAllowed")); 
               self.notifCreate(getTranslation("generalSetup.notifCreate")); 
      }


    }
    return new createGeneralSetup();
});