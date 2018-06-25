define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, commonUtil, services) {

    function EditChildrenEductionExpenseViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.managerId = rootViewModel.personDetails().managerId();
        self.personId = rootViewModel.personDetails().personId();
        this.specialistSummary = ko.observable("");//added
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        this.disableSubmit = ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.eduYearsArray = ko.observableArray(rootViewModel.globalEduYears());
        self.eduSemesterArray = ko.observableArray(rootViewModel.globalEduSemester());
        self.childrenNumber = ko.observable("");        
        self.amountMaxs = ko.observable("");
        self.isVisible = ko.observable(false);        
        var gradeRate = rootViewModel.globalPersonFuseModel.childGradeNoValue();
        var amountRate = rootViewModel.globalPersonFuseModel.childGradeAmtValue();
        self.editResubmitBtnVisible = ko.observable(false);
            
        self.dependantNameArr1 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr2 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr3 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr4 = ko.observableArray([{"value" : '', "label" : ''}]);
        self.dependantNameArr5 = ko.observableArray([{"value" : '', "label" : ''}]);

self.childrenExpenseArray = ko.observableArray([ {
                    "BIRTH_DATE":'',"EMP_PERSON_NUMBER" : '', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

                }]);
        
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
                          self.dependantNameArr1(BuildDependent2Array());
            });

        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.childrenExpenseModel = {
            id : ko.observable(),
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
            amount1 : ko.observable(),
            amount2 : ko.observable(""),
            amount3 : ko.observable(""),
            amount4 : ko.observable(""),
            amount5 : ko.observable(""), 
            paymentPeriod : ko.observable(""), 
            dependentAge : ko.observable(""), 
            dependentNumber : ko.observable(0),
            amountNumber : ko.observable(),
            createdBy : rootViewModel.personDetails().personNumber(),
            personNumber : ko.observable(""),
            managerId : ko.observable(""),
            commment:ko.observable(""),
            IS_DRAFT:ko.observable(""),
            imageBase64:ko.observable(""),
            name:ko.observable(""),
            personId:ko.observable(""),
            status : ko.observable("")
        };
        
        ko.postbox.subscribe("editChildrenEductionExpenseObj", function (newValue) { 
            self.childrenExpenseModel.id(newValue.id);
            self.childrenExpenseModel.requestDate(newValue.request_date);
            self.childrenExpenseModel.semesterFrom(newValue.semester_from);
            self.childrenExpenseModel.semesterTo(newValue.semester_to);
            self.childrenExpenseModel.schoolYear(newValue.school_year);
            self.childrenExpenseModel.semesterNumber(newValue.semester_number);
            self.childrenExpenseModel.dependentName1(newValue.dependent_name_1);
            self.childrenExpenseModel.dependentName2(newValue.dependent_name_2);
            self.childrenExpenseModel.dependentName3(newValue.dependent_name_3);
            self.childrenExpenseModel.dependentName4(newValue.dependent_name_4);
            self.childrenExpenseModel.dependentName5(newValue.dependent_name_5);
            self.childrenExpenseModel.amount1(newValue.amount_1);
            self.childrenExpenseModel.amount2(newValue.amount_2);
            self.childrenExpenseModel.amount3(newValue.amount_3);
            self.childrenExpenseModel.amount4(newValue.amount_4);
            self.childrenExpenseModel.amount5(newValue.amount_5);
            self.childrenExpenseModel.dependentAge(newValue.dependent_age);
            self.childrenExpenseModel.dependentName5([self.childrenExpenseModel.dependentName5()]);
            self.childrenExpenseModel.schoolYear([self.childrenExpenseModel.schoolYear()]);
            self.childrenExpenseModel.dependentName4([self.childrenExpenseModel.dependentName4()]);
            self.childrenExpenseModel.dependentName3([self.childrenExpenseModel.dependentName3()]);
            self.childrenExpenseModel.dependentName2([self.childrenExpenseModel.dependentName2()]);
            self.childrenExpenseModel.dependentName1([self.childrenExpenseModel.dependentName1()]);
            self.childrenExpenseModel.commment(newValue.commment);
            self.childrenExpenseModel.imageBase64(newValue.attachment_base64);
            var statusDraft = newValue.status;
            if(statusDraft =='Draft' || statusDraft == 'مسودة'){
                self.editResubmitBtnVisible(true);
            }else{
                    self.editResubmitBtnVisible(false);
            }                    

        });
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
            var preview = document.querySelector('.attClass');
            preview.src = self.childrenExpenseModel.imageBase64();
            
            self.currentStepValue('stp1');
                self.childrenExpenseModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.childrenExpenseModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.childrenExpenseModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.childrenExpenseModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            services.getDependentsName(self.childrenExpenseModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);
            initTranslations(); 
        };
        self.handleDetached = function (info) {
        };

        self.stepArray = ko.observableArray([]);

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

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
            if (validationChildNoAndTotalAmount() == false) {
                return;
            }
            if (validationSemster() == false) {
                return;
            }
            var preview = document.querySelector('.attClass');
             self.childrenExpenseModel.imageBase64(preview.src);
             
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
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

                if (data.items.length > 1) {
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
             services.getchildrenEductionExpenseGradeValidation(self.childrenExpenseModel.personNumber(),self.childrenExpenseModel.schoolYear(),self.childrenExpenseModel.id()).then(getChildrenEductionExpenseValidatCbFn, app.failCbFn);      
            var childrenNumbers=0;
            var amountMax=0;
            if (self.childrenExpenseModel.amount1() != '' && self.childrenExpenseModel.amount1() !=null ) {
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
            if (self.childrenExpenseModel.dependentName1().length > 0 && self.childrenExpenseModel.dependentName1() !=''  ) {
                childrenNumbers++;  
            }
            else {
                self.childrenExpenseModel.dependentName1('');
            }
            if (self.childrenExpenseModel.dependentName2().length >0 && self.childrenExpenseModel.dependentName2() !='' ) {
           
                childrenNumbers++;       
            }
            else {
                self.childrenExpenseModel.dependentName2('');
            }
            if (self.childrenExpenseModel.dependentName3().length >0 && self.childrenExpenseModel.dependentName3() !='' ) {
                       
                childrenNumbers++;
            }
            else {
                self.childrenExpenseModel.dependentName3('');
            }
            if (self.childrenExpenseModel.dependentName4().length >0  && self.childrenExpenseModel.dependentName4() !='' ) {
                childrenNumbers++;
            }
            else {
                self.childrenExpenseModel.dependentName4('');
            }
           
            if (self.childrenExpenseModel.dependentName5().length > 0 && self.childrenExpenseModel.dependentName5() !='' ) {
                        
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
                self.editBtnVisible(false);  
                return false;
            } 
             if (totalAmount > amountRate) {
                $.notify(self.validateChildAmount(), "error");
                self.editBtnVisible(false);
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
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);

            }
            else {
                self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
            }

            return self.childrenEductionExpense();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            //save draft
        this.draftButton = function () {
            self.childrenExpenseModel.IS_DRAFT("SUBMIT");
            document.querySelector("#draftDialog").open();
        };
        self.commitDraft = function () {
            editChildrenExpenseRecord();
            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        self.commitRecord = function () {
            editChildrenExpenseRecord();
            return true;
        }


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
                    self.childrenNumber(val.num-self.childrenExpenseModel.dependentNumber());
               }
                if (val.amountsum == null){ 
                  self.amountMaxs(0);
               }else{
                  self.amountMaxs(val.amountsum);
               }
            });
//         }
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
        function editChildrenExpenseRecord() {     
            self.childrenExpenseModel.schoolYear(self.childrenExpenseModel.schoolYear()[0]);
            self.childrenExpenseModel.semesterNumber(self.childrenExpenseModel.semesterNumber()[0]);   
            self.childrenExpenseModel.dependentName1(self.childrenExpenseModel.dependentName1()[0]); 
                setArryToValue();
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);    
            }
                var jsonData = ko.toJSON(self.childrenExpenseModel);
                var editChildrenExpenseCbFn = function (data) {
                $.notify(self.notifyEdit(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryChildrenEductionExpense');
                }//added
                self.disableSubmit(false);
            };
            services.editChildrenEductionExpense(jsonData).then(editChildrenExpenseCbFn, app.failCbFn);

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
            }
             
}
self.passengerName3ChangedHandler = function (event, data) {

            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
            self.dependantNameArr4(BuildDependent2Array());
            self.dependantNameArr5(BuildDependent2Array());
            }
}
self.passengerName4ChangedHandler = function (event, data) {

            if (event.detail.trigger == 'option_selected' && event.detail.value !=null) {
             
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
//end

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
               "BIRTH_DATE":'', "EMP_PERSON_NUMBER" : '', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

            }
]);
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
            self.addMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.next = ko.observable();
            self.confirmMessage= ko.observable();
            self.editMessage= ko.observable();
            self.dependentAge = ko.observable();
            self.comment=ko.observable();
            self.notifyEdit=ko.observable();
            self.saveDraft = ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();
            self.validateSemster = ko.observable();
            self.validateChildNo = ko.observable();
            self.validateChildAmount = ko.observable();//added
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
                self.editMessage(getTranslation("childrenEductionExpense.editMessage"));
                self.childrenEductionExpense(getTranslation("childrenEductionExpense.childrenEductionExpense"));
                self.back(getTranslation("others.pervious"));
                self.next(getTranslation("others.next"));
                self.cancel(getTranslation("others.cancel"));
                self.comment(getTranslation("others.comment"));
                self.notifyEdit(getTranslation("childrenEductionExpense.notifyEdit"));
                self.saveDraft(getTranslation("labels.saveDraft"));
                self.attachment(getTranslation("businessTrip.attachment"));
                self.attachmentNotify(getTranslation("others.attachmentNotify")); 
                self.validateSemster(getTranslation("childrenEductionExpense.validateSemster"));
                self.validateChildNo(getTranslation("childrenEductionExpense.validateChildNo"));
                self.validateChildAmount(getTranslation("childrenEductionExpense.validateChildAmount"));
                //added
        }
    }

    return new EditChildrenEductionExpenseViewModel();
});