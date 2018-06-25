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
          self.personRulesModel = {
             personNumber: ko.observable(),
             personName: ko.observable(),
            startDate : ko.observable(),
           endDate : ko.observable( self.formatDate(new Date())),
           ticketClass: ko.observable(),
           maxAccrualCarryOver : ko.observable(0),
           alloweEncashmentPayment :ko.observable(), 
           PrrcentageOFTicketprice : ko.observable(100),
            PrrcentageOFAdultTicketprice : ko.observable(100),
            PrrcentageOFChildTicketprice : ko.observable(100),
            PrrcentageOFInfantTicketprice : ko.observable(100),
           maxAge : ko.observable(12),
           AllowNationals:ko.observable(100),
           NumberOFSpouseAllowed: ko.observable(""),
            AllowOtherRoutWhenApply: ko.observable("")  
        };
       
        
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        //-------------push All Employee------------------------------------
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
        }
        //--------------------End------------------------------------------
        //--------- This Function For Page Life Cycle //First Function Calls 
        
        
        //-------------set start and end date=----------------------------------
       var getDats = function (data) 
       {
        if (data.items.length>0)
        {
        self.personRulesModel.startDate(data.items[0].start_date);
        self.personRulesModel.endDate(data.items[0].start_date);
        }
        else 
         {
           self.personRulesModel.startDate(self.formatDate(new Date()));
           self.personRulesModel.endDate(self.formatDate(new Date()));
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
            services.getEmployees("x","x","x").then(allEmployees, app.failCbFn);
        };
        self.handleAttached = function (info) {
            self.currentStepValue('stp1');
          // services.addGradeRule().then(getRewardRequestCbFn, app.failCbFn);
          initTranslations();
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
 
        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
           if (self.personRulesModel.startDate()>=self.personRulesModel.endDate())
           {
             $$.notify(self.notifyDate(), "error");
             return ;
           }
           var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
           if (parseInt(self.personRulesModel.maxAccrualCarryOver())<0)
           {
              $.notify( self.notifyCarry(), "error");
             return ;
           }
           if (parseInt(self.personRulesModel.PrrcentageOFTicketprice())<0||parseInt(self.personRulesModel.PrrcentageOFTicketprice())>100)
           {
             $.notify(self.notifyTicket(), "error");
             return ;
           }
            if (parseInt(self.personRulesModel.PrrcentageOFAdultTicketprice())<0||parseInt(self.personRulesModel.PrrcentageOFAdultTicketprice())>100)
           {
             $.notify(self.notifyAdultTicket(), "error");
             return ;
           }
            if (parseInt(self.personRulesModel.PrrcentageOFChildTicketprice())<0||parseInt(self.personRulesModel.PrrcentageOFChildTicketprice())>100)
           {
             $.notify(self.notifyChildTicket(), "error");
             return ;
           }
            if (parseInt(self.personRulesModel.PrrcentageOFInfantTicketprice())<0||parseInt(self.personRulesModel.PrrcentageOFInfantTicketprice())>100)
           {
             $.notify(self.notifyInfantTicket(), "error");
             return ;
           }
            if (parseInt(self.personRulesModel.maxAge())<0)
           {
             $.notify(self.notifyMaxAge(), "error");
             return ;
           }
            if (parseInt(self.personRulesModel.NumberOFSpouseAllowed())<0)
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

            return self.personRules();
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
            addrPersoneRules();
            return true;
        }
        //---------------This Function For Send Request To Web Service //CallFrom Function (commitRecord)---------
        function addrPersoneRules() {
        self.personRulesModel.alloweEncashmentPayment(self.personRulesModel.alloweEncashmentPayment()[0]);
        self.personRulesModel.AllowOtherRoutWhenApply(self.personRulesModel.AllowOtherRoutWhenApply()[0]);
         self.personRulesModel.ticketClass(self.personRulesModel.ticketClass()[0]);
         self.personRulesModel.AllowNationals(self.personRulesModel.AllowNationals()[0]);
            self.personRulesModel.personName(self.personsObj()[self.personIndex()].displayName)
             self.personRulesModel.personNumber(self.personsObj()[self.personIndex()].personNumber)
            var jsonData = ko.toJSON(self.personRulesModel);
            self.personRulesModel.alloweEncashmentPayment( self.personRulesModel.alloweEncashmentPayment()[0]);
           
            var addgenralSetUpCbFn = function (data) {
                $.notify(self.notifCreate(), "success");
                oj.Router.rootInstance.go('summaryPersonRules');
            };
            services.addPersonRules(jsonData).then(addgenralSetUpCbFn, app.failCbFn);
        }
        //--------------End OF Subbit Dialog --------------------------------------------------------------------
      //---------------Cancle Action -----------------------------------------
        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryPersonRules');
        }
        //--------------END-----------------
        /*function to clear table content after submit*/
        function clearContent() {          
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
            self.maxAccrualCarryOver=ko.observable();  
            self.allowEncashmentPayment=ko.observable();  
            self.percentageOfTicketPrice=ko.observable();  
            self.percentageOfAdultTicketPricet=ko.observable();  
            self.percentageOfChildTicketPrice=ko.observable();  
            self.percentageOfInfantTicketPrice=ko.observable();  
            self.maxAgeOfChild=ko.observable();  
            self.allowNationals=ko.observable();  
            self.numberOfSpouseAllowed=ko.observable();
            self.allowOtherRoutWhenApp=ko.observable();             
            self.personRules = ko.observable();
            self.notifyDate= ko.observable();
            self.notifyCarry= ko.observable();
            self.notifyTicket= ko.observable();
            self.notifyAdultTicket= ko.observable();
            self.notifyChildTicket= ko.observable();
            self.notifyInfantTicket= ko.observable();
            self.notifyMaxAge= ko.observable();
            self.notifySpouseAllowed= ko.observable();
            self.notifCreate= ko.observable();
            self.ticketClass= ko.observable(); 
            self.personName= ko.observable();
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
               self.addMessage (getTranslation("personRules.addMessage"));     
               self.enddate(getTranslation("labels.enddate"));
               self.startdate(getTranslation("labels.startdate"));
               self.maxAccrualCarryOver(getTranslation("generalSetup.maxAccrualCarryOvert")); 
               self.allowEncashmentPayment(getTranslation("generalSetup.allowEncashmentPayment")); 
               self.percentageOfTicketPrice(getTranslation("generalSetup.percentageOfTicketPrice")); 
               self.percentageOfAdultTicketPricet(getTranslation("generalSetup.percentageOfAdultTicketPricet")); 
               self.percentageOfChildTicketPrice(getTranslation("generalSetup.percentageOfChildTicketPricet")); 
               self.percentageOfInfantTicketPrice(getTranslation("generalSetup.percentageOfInfantTicketPricet")); 
               self.maxAgeOfChild(getTranslation("generalSetup.maxAgeOfChild")); 
               self.allowNationals(getTranslation("generalSetup.allowNationals")); 
               self.numberOfSpouseAllowed(getTranslation("generalSetup.numberOfSpouseAllowed")); 
               self.allowOtherRoutWhenApp(getTranslation("generalSetup.allowOtherRoutWhenApp"));               
               self.personRules(getTranslation("personRules.personRules")); 
               self.notifyDate(getTranslation("generalSetup.notifyDate")); 
               self.notifyCarry(getTranslation("generalSetup.notifyCarry")); 
               self.notifyTicket(getTranslation("generalSetup.notifyTicket")); 
               self.notifyAdultTicket(getTranslation("generalSetup.notifyAdultTicket")); 
               self.notifyChildTicket(getTranslation("generalSetup.notifyChildTicket")); 
               self.notifyInfantTicket(getTranslation("generalSetup.notifyInfantTicket")); 
               self.notifyMaxAge(getTranslation("generalSetup.notifyMaxAge")); 
               self.notifySpouseAllowed(getTranslation("generalSetup.notifySpouseAllowed")); 
               self.notifCreate(getTranslation("personRules.notifCreate"));           
               self.personName(getTranslation("common.name")); 
               self.ticketClass(getTranslation("gradeRules.ticketClass"));           
      }   
    }
    return new createPersonRules();
});