define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojgauge'], function (oj, ko, $, app, commonUtil, services) {

    function createChildrenEductionExpenseViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var gradeRate = rootViewModel.globalPersonFuseModel.childGradeNoValue();
        var amountRate = rootViewModel.globalPersonFuseModel.childGradeAmtValue();
        this.specialistSummary = ko.observable("");//added
        var personId = rootViewModel.personDetails().personId();
        var managerId = rootViewModel.personDetails().managerId();
        self.childrenNumber = ko.observable("");        
        self.amountMaxs = ko.observable("");
        self.currentStepValue = ko.observable('stp1');
        self.sum = ko.observable(0);
        self.tracker = ko.observable();        
        this.disableSubmit = ko.observable(false);
        self.isDisabled  = ko.observable(false);
        self.disableAmount = ko.observable(false);
        self.disableAmount2 = ko.observable(true);
        self.disableAmount3 = ko.observable(true);
        self.disableAmount4 = ko.observable(true);
        self.disableAmount5 = ko.observable(true);//added

        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.eduYearsArray = ko.observableArray(rootViewModel.globalEduYears());
        self.eduSemesterArray = ko.observableArray(rootViewModel.globalEduSemester());
        
        self.dependantNameArr1 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr2 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr3 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr4 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr5 = ko.observableArray([{"value" : '', "label" : ''}]);
        
        self.childrenExpenseArray = ko.observableArray([ {
                   BIRTH_DATE:'', EMP_PERSON_NUMBER : '5', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

                }]);
                 self.progressValue=ko.computed(function() {
                return 0;
    }, this);

                
        var getchildrenExpenseCbFn2 = (function (data) {
         
          var ind =0;
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
               self.childrenExpenseArray([]);              
                var documents = $xml.find('DATA_DS');
                documents.children('G_1').each(function () {              
                var EMP_PERSON_NUMBER = $(this).find('EMP_PERSON_NUMBER').text();
                var DEP_EN_FIRST_NAME = $(this).find('DEP_EN_FIRST_NAME').text();             
                var DEP_AR_FIRST_NAME = $(this).find('DEP_AR_FIRST_NAME').text();
                var DEP_EN_FATHER_NAME = $(this).find('DEP_EN_FATHER_NAME').text();
                var DEP_AR_FATHER_NAME = $(this).find('DEP_AR_FATHER_NAME').text();
                var DEP_EN_GRAND_FATHER = $(this).find('DEP_EN_GRAND_FATHER').text();
                var DEP_AR_GRAND_FATHER = $(this).find('DEP_AR_GRAND_FATHER').text();
                var DEP_EN_FAMILY_NAME = $(this).find('DEP_EN_FAMILY_NAME').text();
                var DEP_AR_FAMILY_NAME = $(this).find('DEP_AR_FAMILY_NAME').text();
                var CONTACT_TYPE = $(this).find('CONTACT_TYPE').text();
                var EMERGENCY_CONTACT_FLAG = $(this).find('EMERGENCY_CONTACT_FLAG').text();
                var BIRTH_DATE = $(this).find('BIRTH_DATE').text();
                var DEP_DOB = self.formatDate(new Date($(this).find('DOB').text()));
               
              if (((CONTACT_TYPE=="Daughter"||CONTACT_TYPE=="Son")&&BIRTH_DATE<19)){
                    self.childrenExpenseArray.push( {ind:ind,
                        EMP_PERSON_NUMBER : EMP_PERSON_NUMBER, 
                        DEP_EN_FIRST_NAME : DEP_EN_FIRST_NAME,
                        "DEP_EN_FATHER_NAME":DEP_EN_FATHER_NAME,
                        "DEP_EN_GRAND_FATHER":DEP_EN_GRAND_FATHER,
                        "DEP_EN_FAMILY_NAME" : DEP_EN_FAMILY_NAME,
                        "FullNameEn":DEP_EN_FIRST_NAME +" "+DEP_EN_FATHER_NAME + " "+ DEP_EN_GRAND_FATHER+" "+DEP_EN_FAMILY_NAME,
                        "DEP_AR_FIRST_NAME" : DEP_AR_FIRST_NAME,
                        "DEP_AR_FATHER_NAME":DEP_AR_FATHER_NAME,
                        "DEP_AR_GRAND_FATHER":DEP_AR_GRAND_FATHER,
                        "DEP_AR_FAMILY_NAME" : DEP_AR_FAMILY_NAME,
                        "FullNameAr":DEP_AR_FIRST_NAME+" "+DEP_AR_FATHER_NAME +" "+DEP_AR_GRAND_FATHER+" "+DEP_AR_FAMILY_NAME,
                        "CONTACT_TYPE" : CONTACT_TYPE,
                        "EMERGENCY_CONTACT_FLAG" : EMERGENCY_CONTACT_FLAG,
                        BIRTH_DATE : BIRTH_DATE,
                        "DOB":DEP_DOB
                    });
                    ind++;
              }
                });    
             //   BuildDependentArray ();
             // self.dependantNameArr1([]);
             self.dependantNameArr1(BuildDependent2Array());
            });
       
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        
        self.childrenExpenseModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            semesterFrom : ko.observable(""),
            semesterTo : ko.observable(""),
            schoolYear : ko.observable(""), 
            semesterNumber : ko.observable(""),
            dependentName1 : ko.observable(""),
            dependentName2 : ko.observable(""),
            dependentName3 : ko.observable(""),
            dependentName4 : ko.observable(""),
            dependentName5 : ko.observable(""),
            amount1 : ko.observable(""),
            amount2 : ko.observable(""),
            amount3 : ko.observable(""),
            amount4 : ko.observable(""),
            amount5 : ko.observable(""),
            dependentAge : ko.observable(""),
            paymentPeriod : ko.observable(""),
            dependentNumber : ko.observable(0),
            commment:ko.observable(""),
            amountNumber : ko.observable(),
            createdBy:   rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            managerId : ko.observable(""),
            personId : ko.observable(""),
            name  : ko.observable(""),
            IS_DRAFT:ko.observable(""),
            personName:ko.observable(""),
            imageBase64:ko.observable(""),
            IS_LINE_MANAGER:ko.observable("")
        };
  self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
        };
            self.handleDeactivated = function (info) {
            clearContent();
        }
          self.handleAttached = function (info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true"); 
                }
                else {
                   self.specialistSummary("false");
                }//added
            self.currentStepValue('stp1');
             self.progressValue = ko.computed(function () {       
                return precantageOField(self.childrenExpenseModel, 17);
            },
            this);
                self.childrenExpenseModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.childrenExpenseModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.childrenExpenseModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.childrenExpenseModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());

             services.getDependentsName( self.childrenExpenseModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);
             initTranslations();
        };
        self.handleDetached = function (info) {

        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
           else if(validationChildNoAndTotalAmount()==false )
            { 
            event.preventDefault();
               return ;
            }
            else if ( validationSemster() == false)
            { 
            event.preventDefault();
               return ;
            }   
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
             
                var preview = document.querySelector('.attClass');
                self.childrenExpenseModel.imageBase64(preview.src);
                
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
                       return;
                }
            if (validationChildNoAndTotalAmount() == false) {
                return;
            }
            if (validationSemster() == false) {
                return;
            }
            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }               
        //Validation for Semster Number and School Year
        function validationSemster() {
            var test;
            var getChildrenEductionExpenseValidationCbFn = function (data) {
                if (data.items.length > 0) {
                    showNotify('error', self.validateSemster());
                    test = false;
                }
                return test;
            };
            services.getChildrenEductionExpenseValidation(self.childrenExpenseModel.semesterNumber(), self.childrenExpenseModel.schoolYear(), self.childrenExpenseModel.dependentName1(), self.childrenExpenseModel.dependentName2(), self.childrenExpenseModel.dependentName3(), self.childrenExpenseModel.dependentName4(), self.childrenExpenseModel.dependentName5()).then(getChildrenEductionExpenseValidationCbFn, app.failCbFn);
            return test;
        }
        //--------End------
        //Validation for Total child Numbers and Total Amount
   function validationChildNoAndTotalAmount() {
             services.getchildrenEductionExpenseGradeValidation(self.childrenExpenseModel.personNumber(),self.childrenExpenseModel.schoolYear(),0).then(getChildrenEductionExpenseValidatCbFn, app.failCbFn);      
            var childrenNumbers=0;
            var amountMax=0;
            if (self.childrenExpenseModel.amount1() != '') {
                var amount1 = parseInt(self.childrenExpenseModel.amount1());
                amountMax = parseInt(amountMax) + amount1;
            }
            if (self.childrenExpenseModel.amount2() != '' && self.childrenExpenseModel.amount2() !=null) {
                var amount2 = parseInt(self.childrenExpenseModel.amount2());
                amountMax = amountMax + amount2;
            }
            if (self.childrenExpenseModel.amount3() != '' && self.childrenExpenseModel.amount3() !=null) {
                var amount3 = parseInt(self.childrenExpenseModel.amount3());
                amountMax = amountMax + amount3;   
            }
             if (self.childrenExpenseModel.amount4()!='' && self.childrenExpenseModel.amount4() !=null ) {
              var amount4=  parseInt(self.childrenExpenseModel.amount4());
                amountMax=amountMax+amount4;      
            }
             if (self.childrenExpenseModel.amount5()!='' && self.childrenExpenseModel.amount5() !=null) {
              var amount5=  parseInt(self.childrenExpenseModel.amount5());
                amountMax=amountMax+amount5;    
            } 
            if (self.childrenExpenseModel.dependentName1().length > 0 ) {
                childrenNumbers++;  
            }
            else {
                self.childrenExpenseModel.dependentName1('');
            }
            if (self.childrenExpenseModel.dependentName2().length > 0 ) {
                childrenNumbers++;
                
            }
            else {
                self.childrenExpenseModel.dependentName2('');
            }
            if (self.childrenExpenseModel.dependentName3().length > 0) {
                childrenNumbers++;
                
            }
            else {
                self.childrenExpenseModel.dependentName3('');
            }
            if (self.childrenExpenseModel.dependentName4().length > 0) {
                childrenNumbers++;
            }
            else {
                self.childrenExpenseModel.dependentName4('');
            }
            if (self.childrenExpenseModel.dependentName5().length > 0) {
                childrenNumbers++;
            }
            else {
                self.childrenExpenseModel.dependentName5('');
            }                
                self.childrenExpenseModel.dependentNumber(childrenNumbers);
                var totalAmount=parseInt(self.amountMaxs()+amountMax);
                var totalChildrenNo=parseInt(self.childrenNumber()+childrenNumbers);
                self.childrenExpenseModel.amountNumber(totalAmount);            
            if (totalChildrenNo > gradeRate) {
                $.notify(self.validateChildNo(), "error");
                self.addBtnVisible(false);  
                return false;
            } 
             if (totalAmount > amountRate) {
                $.notify(self.validateChildAmount(), "error");
                self.addBtnVisible(false);
                            return false;
            }
                }
                //End----
        self._showComponentValidationErrors = function (trackerObj) {
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

            return self.childrenEductionExpense();
        };
        this.submitButton = function () {
         self.childrenExpenseModel.IS_DRAFT("NO");
          document.querySelector("#yesNoDialog").open();
        };
        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addChildrenExpenseRecord();
            return true;
        }
         //save draft
        this.submitDraft = function () {
            self.childrenExpenseModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addChildrenExpenseRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction = function () {
                if(self.specialistSummary() == 'true'){
                    oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }
        }

        var getChildrenEductionExpenseValidatCbFn = function (data) {
            $.each(data.items, function (index, val) {
                 if (val.num == null){ 
                  self.childrenNumber(0);
               }else{
                    self.childrenNumber(val.num);
               }
                if (val.amountsum == null){ 
                  self.amountMaxs(0);
               }else{
                  self.amountMaxs(val.amountsum);
               }
            });
        };
        //function to check dependent name
        function setArryToValue()
        {
           if(self.childrenExpenseModel.dependentName2()!='') 
           {
           self.childrenExpenseModel.dependentName2(self.childrenExpenseModel.dependentName2()[0]); 
           }
            if(self.childrenExpenseModel.dependentName3()!='') 
           {
           self.childrenExpenseModel.dependentName3(self.childrenExpenseModel.dependentName3()[0]); 
           }
             if(self.childrenExpenseModel.dependentName4()!='') 
           {
           self.childrenExpenseModel.dependentName4(self.childrenExpenseModel.dependentName4()[0]); 
           }
             if(self.childrenExpenseModel.dependentName5()!='') 
           {
           self.childrenExpenseModel.dependentName5(self.childrenExpenseModel.dependentName5()[0]); 
           }
        }
            //End
        function addChildrenExpenseRecord() {
                if(!self.disableSubmit()) {
                         self.disableSubmit(true);    
                }
                self.childrenExpenseModel.schoolYear(self.childrenExpenseModel.schoolYear()[0]);
                self.childrenExpenseModel.semesterNumber(self.childrenExpenseModel.semesterNumber()[0]); 
                self.childrenExpenseModel.dependentName1(self.childrenExpenseModel.dependentName1()[0]); 
                setArryToValue();
                var jsonData = ko.toJSON(self.childrenExpenseModel);
                var addChildrenExpenseCbFn = function (data) {
                    $.notify(self.createNotify(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }//added
                    self.disableSubmit(false); 
                };
                services.addChildrenEductionExpense(jsonData).then(addChildrenExpenseCbFn, app.failCbFn);
        }
                   /*Check For Line Manager*/
        if (self.childrenExpenseModel.managerId() !=null) {
                self.childrenExpenseModel.IS_LINE_MANAGER("YES");
            }
            else {
               self.childrenExpenseModel.IS_LINE_MANAGER("NO");
            }
        /*function to clear table content after submit*/
        function clearContent() {
            self.childrenExpenseModel.semesterTo("");
            self.childrenExpenseModel.semesterFrom("");
            self.childrenExpenseModel.schoolYear("");
            self.childrenExpenseModel.semesterNumber("");
            self.childrenExpenseModel.dependentName1("");
            self.childrenExpenseModel.dependentName2("");
            self.childrenExpenseModel.dependentName3("");
            self.childrenExpenseModel.dependentName4("");
            self.childrenExpenseModel.dependentName5("");
            self.childrenExpenseModel.amount1("");
            self.childrenExpenseModel.amount2("");
            self.childrenExpenseModel.amount3("");
            self.childrenExpenseModel.amount4("");
            self.childrenExpenseModel.amount5("");
            self.dependantNameArr5([]);
            self.dependantNameArr4([]);
            self.dependantNameArr3([]);
            self.dependantNameArr2([]);
            self.dependantNameArr1([]);
            self.childrenExpenseArray = ko.observableArray([
            {
              "BIRTH_DATE":'',  "EMP_PERSON_NUMBER" : '', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

            }
]);          
        }
        //--------------------Selection Change Handler Section ---------------------------
self.passengerName1ChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value[0] !=null) {
                self.dependantNameArr2([]);

              self.dependantNameArr2(BuildDependent2Array());
              self.dependantNameArr3(BuildDependent2Array());
            }
}
self.passengerName2ChangedHandler = function (event, data) {

            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
             self.childrenExpenseModel.dependentName3(''); 
             self.dependantNameArr3(BuildDependent2Array());
             self.dependantNameArr4(BuildDependent2Array());
             self.dependantNameArr5(BuildDependent2Array());
             self.disableAmount2(false);
            }
            else{
            self.disableAmount2(true);
                }
             
}
self.passengerName3ChangedHandler = function (event, data) {

            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
            self.dependantNameArr4(BuildDependent2Array());
            self.dependantNameArr5(BuildDependent2Array());
                       self.disableAmount3(false);
            }
            else{
            self.disableAmount3(true);
                }
}
self.passengerName4ChangedHandler = function (event, data) {

            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
            self.disableAmount4(false);
             
            }
              else{
            self.disableAmount4(true);
                }
}
/////
//Function To Build Dependnt Array 2
function BuildDependent2Array (){
var temparr = [];

for (var i =0; i <self.childrenExpenseArray().length;i++)
{ 
   if (document.documentElement.lang == "ar")
   { 
      if(self.childrenExpenseModel.dependentName1()!=self.childrenExpenseArray()[i].FullNameAr&&
      self.childrenExpenseModel.dependentName2()!=self.childrenExpenseArray()[i].FullNameAr&&
      self.childrenExpenseModel.dependentName3()!=self.childrenExpenseArray()[i].FullNameAr)
      {
     temparr.push({"value":self.childrenExpenseArray()[i].FullNameEn,"label":self.childrenExpenseArray()[i].FullNameAr});
      }
   }
   else if (self.childrenExpenseModel.dependentName1()!=self.childrenExpenseArray()[i].FullNameEn&&
      self.childrenExpenseModel.dependentName2()!=self.childrenExpenseArray()[i].FullNameEn&&
      self.childrenExpenseModel.dependentName3()!=self.childrenExpenseArray()[i].FullNameEn)
   {
      temparr.push({"value":self.childrenExpenseArray()[i].FullNameEn,"label":self.childrenExpenseArray()[i].FullNameEn});
   }

}

       return temparr ;
}

            //language support =========================

            self.amount1 = ko.observable();
            self.amount2 = ko.observable();
            self.amount3 = ko.observable();
            self.amount4 = ko.observable();
            self.amount5 = ko.observable();
            self.name1 = ko.observable();
            self.name2 = ko.observable();
            self.name3 = ko.observable();
            self.name4 = ko.observable();
            self.name5 = ko.observable();
            self.semesterFrom = ko.observable();
            self.semesterTo = ko.observable();
            self.schoolYear = ko.observable();
            self.semesterNum = ko.observable();
            self.childrenEductionExpense = ko.observable();
            self.requestDate = ko.observable();
            self.ok = ko.observable();
            self.pervious= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.next = ko.observable();
            self.comment = ko.observable();
            self.createNotify = ko.observable();  
            self.dependentAge = ko.observable();
            self.saveDraft = ko.observable();
            self.validateSemster = ko.observable();
            self.validateChildNo = ko.observable();
            self.validateChildAmount = ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
              self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
        function initTranslations() {
                   self.pervious(getTranslation("others.pervious"));
                   self.next(getTranslation("others.next"));
                   self.cancel(getTranslation("others.cancel"));
                   self.yes(getTranslation("others.yes"));
                   self.no(getTranslation("others.no"));
                   self.submit(getTranslation("others.submit"));
                   self.confirmMessage(getTranslation("labels.confirmMessage"));
                   self.create(getTranslation("labels.create"));
                   self.review(getTranslation("others.review"));
                   self.stepArray([{label : self.create(), id : 'stp1'},
                                 {label : self.review(), id : 'stp2'}]);
                self.requestDate(getTranslation("labels.requestDate"));
                self.semesterFrom(getTranslation("childrenEductionExpense.semesterFrom"));
                self.semesterTo(getTranslation("childrenEductionExpense.semesterTo"));
                self.schoolYear(getTranslation("childrenEductionExpense.schoolYear"));
                self.semesterNum(getTranslation("childrenEductionExpense.semesterNum"));
                self.name1(getTranslation("childrenEductionExpense.name1"));
                self.name2(getTranslation("childrenEductionExpense.name2"));
                self.name3(getTranslation("childrenEductionExpense.name3"));
                self.name4(getTranslation("childrenEductionExpense.name4"));
                self.name5(getTranslation("childrenEductionExpense.name5"));
                self.amount1(getTranslation("childrenEductionExpense.amount1"));
                self.amount2(getTranslation("childrenEductionExpense.amount2"));
                self.amount3(getTranslation("childrenEductionExpense.amount3"));
                self.amount4(getTranslation("childrenEductionExpense.amount4"));
                self.amount5(getTranslation("childrenEductionExpense.amount5"));
                self.dependentAge(getTranslation("childrenEductionExpense.dependentAge"));
                self.addMessage(getTranslation("childrenEductionExpense.addMessage"));
                self.childrenEductionExpense(getTranslation("childrenEductionExpense.childrenEductionExpense"));
                self.validateSemster(getTranslation("childrenEductionExpense.validateSemster"));
                self.back(getTranslation("others.pervious"));
                self.next(getTranslation("others.next"));
                self.cancel(getTranslation("others.cancel"));
                self.comment(getTranslation("others.comment"));
                self.createNotify(getTranslation("childrenEductionExpense.createNotify"));
                self.saveDraft(getTranslation("labels.saveDraft"));
                self.validateChildNo(getTranslation("childrenEductionExpense.validateChildNo"));
                self.validateChildAmount(getTranslation("childrenEductionExpense.validateChildAmount"));
                self.attachment(getTranslation("businessTrip.attachment"));
                self.attachmentNotify(getTranslation("others.attachmentNotify"));
        }
        
        function getInd(chiledName)
        {
        var ind =0;
       
          for (var i=0;i<self.childrenExpenseArray().length ;i++)
          {
             if (self.childrenExpenseArray()[i].DEP_EN_FIRST_NAME==chiledName)
             {ind=self.childrenExpenseArray()[i].ind;
             break;
             }
          }
           return ind;
        }
        
        self.test = ko.computed(function() {
        if(self.childrenExpenseArray().length > 0)
        {
         if(self.childrenExpenseModel.dependentName1())
         {
        var x=self.childrenExpenseArray()[ getInd(self.childrenExpenseModel.dependentName1())].BIRTH_DATE
         }
        return x;
        }
        
    }, this);
    
     self.label = {text: self.progressValue(), style: {color:'white'}};       
      this.thresholdValues = [{max: 33}, {max: 67}, {}];

    }
    return new createChildrenEductionExpenseViewModel();
});