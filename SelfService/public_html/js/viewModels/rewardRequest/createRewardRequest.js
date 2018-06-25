define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services',
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojcheckboxset',
'ojs/ojradioset', 'ojs/ojlabel','ojs/ojgauge','ojs/ojdialog'],
function (oj, ko, $, app, commonUtil, services) {

    function createBusinessTripDriverViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.progressValue=ko.computed(function() {
                return 0;
       }, this);

        this.disableSubmit = ko.observable(false);
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.approvalDataSourceTB2 = ko.observable();
         self.approvaldataTB2 = ko.observableArray([]);
         self.columnArrayApproval = ko.observableArray([]);
         var hireDate = rootViewModel.personDetails().hireDate();
          this.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
          this.specialistSummary = ko.observable("");//added


          self.formatDate = function (date) {
            //var date = new Date()
            var month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        //----------this function for culclte diffrent
         self.difrentDateInMonth = function ()
        {
            var date = self.formatDate(new Date());
         var z = Math.abs(new Date(hireDate).getTime() -  new Date(date).getTime());
         var diffDays = Math.round(z/(1000.00 * 3600.00 * 24.00));
         var years = Math.round(diffDays/365,1);
         return years.toString();
        }
        //--------------------------End------------------------------
        //--------------------This Function For counting Employee GratuityBalance (End OF Service Amount)
        var getEmployeeGratuityBalance =function(data)
        {
            parser = new DOMParser();
            xmlDOC = parser.parseFromString(data, "text/xml");
            $xml = $(xmlDOC);
            var documents = $xml.find('DATA_DS');
            var sum =0;
            documents.children('G_1').each(function ()
            {
               sum = sum+parseInt($(this).find('SUM_PLB_BALANCE_VALUE_').text());
            });

            self.rewardRequestModel.endOfServiceAmount(sum);



            self.getAllowedAmount();




        }
        //----------------End---------------------------------------------
        //------------This Function For counting Part of End of service Balance (Paid End OF Service)-----------------------------
        var getPartOfEosSumReport =function(data)
        {
            parser = new DOMParser();
            xmlDOC = parser.parseFromString(data, "text/xml");
            $xml = $(xmlDOC);
             var documents = $xml.find('DATA_DS');
            var sum =0;
            documents.children('G_1').each(function ()
            {
               sum = sum+parseInt($(this).find('SUM_PLB_BALANCE_VALUE_').text());

            });




            self.rewardRequestModel.paidEndOfService(sum);

            if (self.rewardRequestModel.endOfServiceAmount()!=0)
            {
            self.getAllowedAmount();
            }



        }
        //---------------------End---------------------------------------------------
        //---------------------This Function folr culculating Allowed Amount--------------
        self.getAllowedAmount = function ()
        {

         var  allowedAmount = 0 ;
         var servicePeriod = self.difrentDateInMonth();
         if (servicePeriod<4)
         {
         self.rewardRequestModel.allowedAmount(allowedAmount);
         }
         else if (servicePeriod>4&&servicePeriod<=6)
         {
         var udtValue  = udtLookup("XXX_HR_PART_OF_EOS_AMT","Years",4)/100;

        allowedAmount = udtValue*self.rewardRequestModel.endOfServiceAmount()-self.rewardRequestModel.paidEndOfService();

        self.rewardRequestModel.allowedAmount(allowedAmount);
         }
         else
         {
            var udtValue2  = udtLookup("XXX_HR_PART_OF_EOS_AMT","Years",6.01)/100;

            var endOfServiceAmount = parseInt(self.rewardRequestModel.endOfServiceAmount());
            var paidEndOfService = parseInt(self.rewardRequestModel.paidEndOfService());

            allowedAmount = udtValue2*endOfServiceAmount- paidEndOfService;

            self.rewardRequestModel.allowedAmount(allowedAmount);

         }
         if (allowedAmount<0)
         {
            self.rewardRequestModel.allowedAmount(0);
         }


        }
        //---------------------End OF Allowed Amount -----------------------


        self.rewardRequestModel = {
            requestDate : ko.observable(self.formatDate(new Date())),
            servicePeriod : ko.observable( self.difrentDateInMonth()),
            endOfServiceAmount : ko.observable(0),
            paidEndOfService : ko.observable(0),
            lastEosPaymentDate : ko.observable(""),
            allowedAmount : ko.observable(""),
            requestedAmount : ko.observable(1000),
            reason : ko.observable(""),
            paymentPeriod : ko.observable("  "),
            ceratedBy:rootViewModel.personDetails().personNumber(),
            personNumber:ko.observable(""),
            personId:ko.observable(""),
            name: ko.observable(""),
            commment:ko.observable(" "),
            createdBy:ko.observable("  "),
            managerId:ko.observable(""),
            IS_DRAFT:ko.observable(""),
            status:ko.observable(""),
            IS_Assistant_Manager:ko.observable(""),
            hireDate:ko.observable(""),
            IS_Mannager:ko.observable("")
        };


        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        function addDays(startDate, numberOfDays) {
            return new Date(startDate.getTime() + (numberOfDays * 24 *60 * 60 * 1000));
            }
        self.handleActivated = function (info )
        {


         self.currentStepValue('stp1');

        //  self.rewardRequestModel.servicePeriod ( self.difrentDateInMonth());

        services.getPartOfEosSumReport(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getPartOfEosSumReport, app.failCbFn);
        services.getGratuityAccruedReport(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId()).then(getEmployeeGratuityBalance, app.failCbFn);

            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');
            //clearContent();

        };
        //-----------------this Function for set lastEosPaymentDate ------------------
        var getRewardRequestCbFn = function (data)
        {
        if(data) {
            var tempObject=  jQuery.parseJSON(data);
           if (tempObject.EFFECTIVE_START_DATE)
           {
              self.rewardRequestModel.lastEosPaymentDate(tempObject.EFFECTIVE_START_DATE);
           }
           else
           {
             self.rewardRequestModel.lastEosPaymentDate("");
           }
        } else {
            self.rewardRequestModel.lastEosPaymentDate("");
        }
        
        }
        //----------------------------------------

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                    self.rewardRequestModel.hireDate(rootViewModel.specialistSelectedEmployee().HireDate);
                     self.rewardRequestModel.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);//personId
                   self.rewardRequestModel.personId(rootViewModel.specialistSelectedEmployee().PersonId);
                   self.rewardRequestModel.createdBy(rootViewModel.personDetails().personId());//personId
                   self.rewardRequestModel.managerId(rootViewModel.personDetails().personId());//employeeDateOfBirth
                }
                else {
                   self.specialistSummary("false");
                    self.rewardRequestModel.hireDate(rootViewModel.personDetails().hireDate());
                    self.rewardRequestModel.personNumber(rootViewModel.personDetails().personNumber());//personId
                   self.rewardRequestModel.personId(rootViewModel.personDetails().personId());
                   self.rewardRequestModel.managerId(rootViewModel.personDetails().managerId());
                   self.rewardRequestModel.createdBy(rootViewModel.personDetails().personId());
                   self.rewardRequestModel.name(rootViewModel.personDetails().displayName());
                }//addded
            self.currentStepValue('stp1');
            self.progressValue = ko.computed(function () {
                return precantageOField(self.rewardRequestModel, 11);
            },
            this);

            initTranslations()
            self.rewardRequestModel.servicePeriod ( self.difrentDateInMonth());
            approvalMatrix();
            services.getPartEndOfServiceElementName(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getRewardRequestCbFn, app.failCbFn);

        };
        function approvalMatrix(){
            if(!self.rewardRequestModel.managerId()){
                self.rewardRequestModel.IS_Mannager ("Yes");
            }else{
                 self.rewardRequestModel.IS_Mannager ("NO");
            }
        }
        self.handleDetached = function (info) {



        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
             if (self.rewardRequestModel.endOfServiceAmount()=="")
            {

//               self.rewardRequestModel.allowedAmount();
//               self.rewardRequestModel.paidEndOfService()
             $.notify(self.notifyValidationAmount(), "error");
             event.preventDefault();
                 return;
            }


            if (parseInt(self.rewardRequestModel.allowedAmount())<parseInt(self.rewardRequestModel.requestedAmount()))
            {

             $.notify(self.notifyValidationAmount(), "error");
             event.preventDefault();
                 return;
            }
            if (udtLookup("XXX_HR_GLOBAL_VALUES","Value","Part of EOS Minimum Years")>self.rewardRequestModel.servicePeriod())
            {
               $.notify(self.notifyValidationYear(), "error");
               event.preventDefault();
            return ;
            }
            if(parseInt(self.rewardRequestModel.allowedAmount())<=0)
            {
                 $.notify(self.notifyValidation(), "error");
                 event.preventDefault();
               return ;
            }
                    var date = new Date();

            if(self.rewardRequestModel.lastEosPaymentDate()){
            if (self.formatDate( addDays(new Date(self.rewardRequestModel.lastEosPaymentDate()),365*4 ))>self.formatDate(date)){
                $.notify(self.notifyValidationWindow(), "error");
                event.preventDefault();
                return ;
              }
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
//            var rs = document.getElementById('checkboxSetAgreeId');
//                rs.validate();
            if (!this._showComponentValidationErrors(trackerObj))
            {
                return;
            }
             if (self.rewardRequestModel.endOfServiceAmount()=="")
            {
             $.notify(self.notifyValidationAmount(), "error");
                 return;
            }


            if (parseInt(self.rewardRequestModel.allowedAmount())<parseInt(self.rewardRequestModel.requestedAmount()))
            {

             $.notify(self.notifyValidationAmount(), "error");
                 return;
            }
            if (udtLookup("XXX_HR_GLOBAL_VALUES","VALUE","Part of EOS Minimum Years")>self.rewardRequestModel.servicePeriod())
            {
               $.notify(self.notifyValidationYear(), "error");
            return ;
            }
            if(parseInt(self.rewardRequestModel.allowedAmount())<=0)
            {
                 $.notify(self.notifyValidation(), "error");
               return ;
            }
                    var date = new Date();

            if(self.rewardRequestModel.lastEosPaymentDate()){
                if (self.formatDate( addDays(new Date(self.rewardRequestModel.lastEosPaymentDate()),365*4 ))>self.formatDate(date)){
                    $.notify(self.notifyValidationWindow(), "error");
                    return ;
              }
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

            return self.rewardRequest();
        };
        this.submitButton = function () {
            self.rewardRequestModel.IS_DRAFT("NO");
             self.rewardRequestModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };


            function udtLookup(tableName, colName, rowName) {
            var searchUDTArray = rootViewModel.globalUDTLookup();

            for (var i = 0;i < searchUDTArray.length;i++)
            {
                if (searchUDTArray[i].tableName === tableName && searchUDTArray[i].colName === colName && searchUDTArray[i].rowName === rowName)
                {

                    return searchUDTArray[i].value;
                }
            }
        }

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addrewardRequestModelRecord();
            return true;
        }
            //save draft
        this.submitDraft = function () {
            self.rewardRequestModel.IS_DRAFT("YES");
             self.rewardRequestModel.status("DRAFT");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addrewardRequestModelRecord();
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///

        this.cancelAction = function () {
            if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                }
                else{
                oj.Router.rootInstance.go('rewardRequestSummary');
                }//added
        }


        function addrewardRequestModelRecord() {
            if(!self.disableSubmit()) {
                 self.disableSubmit(true);
            }
            self.rewardRequestModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.rewardRequestModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
            self.rewardRequestModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.rewardRequestModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());

            var jsonData = ko.toJSON(self.rewardRequestModel);

            var addRewardRequestCbFn = function (data) {
                $.notify(self.notifySuccess(), "success");
                if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('rewardRequestSummary');
                    }//added
                self.disableSubmit(false);
            };
            services.addNewRewardRequest(jsonData).then(addRewardRequestCbFn, app.failCbFn);
        }

        /*function to clear table content after submit*/
        function clearContent() {
            self.rewardRequestModel.servicePeriod("");
            self.rewardRequestModel.endOfServiceAmount("");
            //self.rewardRequestModel.paidEndOfService("");
            self.rewardRequestModel.lastEosPaymentDate("");
            self.rewardRequestModel.allowedAmount();
            self.rewardRequestModel.requestedAmount("");
            self.rewardRequestModel.reason("");
            self.rewardRequestModel.paymentPeriod("    ");




        }
        self.handleDeactivated = function ()
        {

          clearContent()

        }
                 this.openApprovalDialog = function () {
   //approvalDataSourceTB2
            var getApprovalList = function (data) {
                self.approvaldataTB2([]);
                $.each(data.items, function (i, item) {
                    self.approvaldataTB2.push( {
                        name : "Part End Of Service ", type : item.notification_type, status : item.role_type

                    });

                });
                self.approvalDataSourceTB2(new oj.ArrayTableDataSource(self.approvaldataTB2));
                $("#modalApprovalDialog").ojDialog("open");
            };

            services.getWprkFlowAppovalList('RRS').then(getApprovalList, app.failCbFn);

        }
                this.closeApprovalDialog = function () {
            $("#modalApprovalDialog").ojDialog("close");
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
            self.notifySuccess= ko.observable();
            self.requestDate=ko.observable();
            self.endOfServiceAmount=ko.observable();
            self.paidEndOfService=ko.observable();
            self.lastEosPaymentDate=ko.observable();
            self.requestAmount=ko.observable();
            self.rewardRequest=ko.observable();
            self.allowedAmount=ko.observable();
            self.reason=ko.observable();
            self.servicePeriod=ko.observable();
            self.notifyValidation=ko.observable();
            self.notifyValidationAmount=ko.observable();
            self.notifyValidationYear=ko.observable();
            self.notifyValidationWindow=ko.observable();
            self.adminNotify=ko.observable();
               self.comment=ko.observable();
          self.viewApprovalsLbl = ko.observable();
               self.approvals = ko.observable();
            self.saveDraft = ko.observable();
               self.ServiceName = ko.observable();
        self.notificationType = ko.observable();
        self.employeeRole = ko.observable();
             var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });

            function initTranslations() {
            self.approvals(getTranslation("labels.approvals"));
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
               self.addMessage (getTranslation("rewardRequest.addMessage"));
               self.notifySuccess (getTranslation("rewardRequest.notifyCreateSuccess"));
               self.requestDate(getTranslation("labels.requestDate"));
               self.endOfServiceAmount(getTranslation("rewardRequest.endOfServiceAmount"));
               self.paidEndOfService(getTranslation("rewardRequest.paidEndOfService"));
               self.lastEosPaymentDate(getTranslation("rewardRequest.lastEosPaymentDate"));
               self.requestAmount(getTranslation("rewardRequest.requestAmount"));
               self.rewardRequest(getTranslation("rewardRequest.rewardRequest"));
               self.allowedAmount(getTranslation("rewardRequest.allowedAmount"));
               self.reason(getTranslation("rewardRequest.reason"));
               self.servicePeriod(getTranslation("rewardRequest.servicePeriod"));
               self.notifyValidation(getTranslation("rewardRequest.notifyValidation"));
               self.notifyValidationAmount(getTranslation("rewardRequest.notifyValidationAmount"));
               self.notifyValidationYear(getTranslation("rewardRequest.notifyValidationYear"));
               self.adminNotify(getTranslation("rewardRequest.endOfServiceDate"));  
             self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
               self.comment(getTranslation("others.comment"));
               self.saveDraft(getTranslation("labels.saveDraft"));
        self.ServiceName(getTranslation("labels.serviceName"));

            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
             self.notifyValidationWindow(getTranslation("rewardRequest.notifyValidationWindow"));
                      self.columnArrayApproval([
            {
                "headerText" : self.ServiceName(), "field" : "name"
            },
            {
                "headerText" : self.notificationType(), "field" : "type"
            },
            {
                "headerText" : self.employeeRole(), "field" : "status"
            }
]);
            }
            self.label = {text: self.progressValue(), style: {color:'white'}};
         self.thresholdValues = [{max: 33}, {max: 67}, {}];
    }
    return new createBusinessTripDriverViewModel();
});
