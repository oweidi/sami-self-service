define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox','ojs/ojknockout',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset'], 
function (oj, ko, $, app, commonUtil, services) {

    function editGradeSetup() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
         
	  self.gradeIndex2= ko.observable();     
          self.gradsobj= ko.observableArray([]);
        

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
        //Here WE Recive the Object From Previose Page
         ko.postbox.subscribe("editGradeRulesObj", function (newValue) {
             
//                            self.gradeRulespModel.id(newValue.id);
                            //   self.gradeRulespModel.gradeName(newValue.);
                           
                            self.gradeRulespModel.startDate(newValue.start_date);
                           self.gradeRulespModel.endDate(newValue.end_date);
                            self.gradeRulespModel.ticketClass(newValue.ticket_class);
                            self.gradeRulespModel.maxAccrualCarryOver(newValue.max_accrual_carry_over);
                           self.gradeRulespModel.alloweEncashmentPayment(newValue.allow_encashment_payment);
                            self.gradeRulespModel.PrrcentageOFTicketprice(newValue.percentage_of_ticket_price);
                            self.gradeRulespModel.PrrcentageOFAdultTicketprice(newValue.percentage_of_adult_ticket_pri);
                            self.gradeRulespModel.PrrcentageOFChildTicketprice(newValue.percentage_of_child_ticket_pri);
                            self.gradeRulespModel.PrrcentageOFInfantTicketprice(newValue.percentage_of_infant_ticket_pr);
                            self.gradeRulespModel.maxAge(newValue.max_age_of_child);
                            self.gradeRulespModel.AllowNationals(newValue.allow_nationals);
                            self.gradeRulespModel.NumberOFSpouseAllowed(newValue.number_of_spouse_allowed);
                            self.gradeRulespModel.AllowOtherRoutWhenApply(newValue.allow_other_rout_when_apply);
                            self.gradeRulespModel.ID(newValue.id);
                            self.gradeRulespModel.gradeName(newValue.grade_name);
                              self.gradeIndex2(newValue.ind());
                            
                            
                             self.gradeRulespModel.alloweEncashmentPayment([self.gradeRulespModel.alloweEncashmentPayment()]);
                        self.gradeRulespModel.AllowOtherRoutWhenApply([self.gradeRulespModel.AllowOtherRoutWhenApply()]);
                             self.gradeRulespModel.ticketClass([self.gradeRulespModel.ticketClass()]);
                          self.gradeRulespModel.AllowNationals([self.gradeRulespModel.AllowNationals()]);

        });
        //------------------End------------------
    //gradeRulespModel
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
        //--------------------This Function For counting Employee GratuityBalance (End OF Service Amount)
       
       
       
        self.currentColor = ko.observableArray(["red"]);
        
        

        self.gradeRulespModel = {
           ID:ko.observable(),
           gradeName: ko.observable(),
            startDate : ko.observable(),
           endDate : ko.observable( ),
            ticketClass: ko.observable(),
           maxAccrualCarryOver : ko.observable(),
           alloweEncashmentPayment :ko.observable(), 
           // alloweEncashmentPayment :ko.observableArray(["true"]),
           PrrcentageOFTicketprice : ko.observable(),
            PrrcentageOFAdultTicketprice : ko.observable(),
            PrrcentageOFChildTicketprice : ko.observable(),
            PrrcentageOFInfantTicketprice : ko.observable(),
           maxAge : ko.observable(12),
           AllowNationals:ko.observable(),
          
           NumberOFSpouseAllowed: ko.observable(""),
            AllowOtherRoutWhenApply: ko.observable(""),
            gradeCode:ko.observable(),
            gradeID:ko.observable()      
        };
       
        
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        //--------------------This Function For Get All Grades In Company --------------------------------------
              var grades = function (data) {
            self.gradsobj([]);
            var ind = 0;
            $.each(data.gradeBean, function (index, val) {
                
                self.gradsobj.push( {
                    indexs:ind,
                    activeStatus : val.activeStatus,
                    creationDate : val.creationDate,
                    effectiveEndDate : val.effectiveEndDate,
                    effectiveStartDate : val.effectiveStartDate,
                    gradeCode : val.gradeCode, 
                    gradeId : val.gradeId,
                    gradeName : val.gradeName,
                    lastUpdateDate : val.lastUpdateDate,
                    setId : val.setId
                });
                ind++;

            });

           
        }
        //-----------------End------------------------------------
        //------------------------------This Function For Page Life Cycle --------------------------------
        self.handleActivated = function (info ) 
        {
        
         self.currentStepValue('stp1');
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
             services.getGrades("x","x","x").then(grades, app.failCbFn);
           //  self.gradeIndex2(self.gradeRulespModel.gradeName());
            //clearContent();
          

        };
       

        self.handleAttached = function (info) {
            self.currentStepValue('stp1');
//                $("#ojChoiceId_payperiod").ojSelect("refresh"); 
//                $("#oj-select-choice-payperiod").ojSelect("refresh");
                 initTranslations(); 
        };
        self.handleDetached = function (info) {
        };
        //------------------------End OF Life Cycle--------------------------------

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
//-------------------Validation -----------------------------
        this.nextStep = function () 
        {
           var trackerObj = ko.utils.unwrapObservable(self.tracker);
           if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
           if (parseInt(self.gradeRulespModel.maxAccrualCarryOver())<0)
           {
             $.notify( self.notifyCarry(), "error");
             return ;
           }
           if (parseInt(self.gradeRulespModel.PrrcentageOFTicketprice())<0||parseInt(self.gradeRulespModel.PrrcentageOFTicketprice())>100)
           {
              $.notify(self.notifyTicket(), "error");
             return ;
           }
            if (parseInt(self.gradeRulespModel.PrrcentageOFAdultTicketprice())<0||parseInt(self.gradeRulespModel.PrrcentageOFAdultTicketprice())>100)
           {
             $.notify(self.notifyAdultTicket(), "error");
             return ;
           }
            if (parseInt(self.gradeRulespModel.PrrcentageOFChildTicketprice())<0||parseInt(self.gradeRulespModel.PrrcentageOFChildTicketprice())>100)
           {
             $.notify(self.notifyChildTicket(), "error");
             return ;
           }
            if (parseInt(self.gradeRulespModel.PrrcentageOFInfantTicketprice())<0||parseInt(self.gradeRulespModel.PrrcentageOFInfantTicketprice())>100)
           {
             $.notify(self.notifyInfantTicket(), "error");
             return ;
           }
            if (parseInt(self.gradeRulespModel.maxAge())<0)
           {
             $.notify(self.notifyMaxAge(), "error");
             return ;
           }
            if (parseInt(self.gradeRulespModel.NumberOFSpouseAllowed())<0)
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

            return self.gradeRules();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };
                              
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addrGenralSetUp();
            return true;
        }
        this.cancelAction = function () {
            oj.Router.rootInstance.go('summaryGradeRules');
        }
        

        function addrGenralSetUp() { 
            self.gradeRulespModel.alloweEncashmentPayment(self.gradeRulespModel.alloweEncashmentPayment()[0]);
            self.gradeRulespModel.AllowOtherRoutWhenApply(self.gradeRulespModel.AllowOtherRoutWhenApply()[0]);
             self.gradeRulespModel.ticketClass(self.gradeRulespModel.ticketClass()[0]);
             self.gradeRulespModel.AllowNationals(self.gradeRulespModel.AllowNationals()[0]);
             
             
             self.gradeIndex2(self.gradeIndex2()[0]);

             self.gradeRulespModel.gradeCode(self.gradsobj()[self.gradeIndex2()].gradeCode);
             self.gradeRulespModel.gradeID(self.gradsobj()[self.gradeIndex2()].gradeId);
             self.gradeRulespModel.gradeName(self.gradsobj()[self.gradeIndex2()].gradeName);
        
            var jsonData = ko.toJSON(self.gradeRulespModel);
           
            self.gradeRulespModel.alloweEncashmentPayment( self.gradeRulespModel.alloweEncashmentPayment()[0])
           
            var addgenralSetUpCbFn = function (data) {
                $.notify(self.notifEdit(), "success");
                oj.Router.rootInstance.go('summaryGradeRules');
            };
            services.editGradeRULES(jsonData).then(addgenralSetUpCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {
            
           

            
           
        }
        self.handleDeactivated = function ()
        {  
        }
       
//language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
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
            self.gradeRules = ko.observable();
            self.notifyDate= ko.observable();
            self.notifyCarry= ko.observable();
            self.notifyTicket= ko.observable();
            self.notifyAdultTicket= ko.observable();
            self.notifyChildTicket= ko.observable();
            self.notifyInfantTicket= ko.observable();
            self.notifyMaxAge= ko.observable();
            self.notifySpouseAllowed= ko.observable();
            self.notifEdit= ko.observable();
            self.gradeName= ko.observable();
            self.ticketClass= ko.observable();
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
               self.editMessage(getTranslation("gradeRules.editMessage"));     
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
               self.gradeRules(getTranslation("gradeRules.gradeRules")); 
               self.notifyDate(getTranslation("generalSetup.notifyDate")); 
               self.notifyCarry(getTranslation("generalSetup.notifyCarry")); 
               self.notifyTicket(getTranslation("generalSetup.notifyTicket")); 
               self.notifyAdultTicket(getTranslation("generalSetup.notifyAdultTicket")); 
               self.notifyChildTicket(getTranslation("generalSetup.notifyChildTicket")); 
               self.notifyInfantTicket(getTranslation("generalSetup.notifyInfantTicket")); 
               self.notifyMaxAge(getTranslation("generalSetup.notifyMaxAge")); 
               self.notifySpouseAllowed(getTranslation("generalSetup.notifySpouseAllowed")); 
               self.notifEdit(getTranslation("gradeRules.notifEdit"));           
               self.gradeName(getTranslation("gradeRules.gradeName")); 
               self.ticketClass(getTranslation("gradeRules.ticketClass"));           
      }
    }
    return new editGradeSetup();
});