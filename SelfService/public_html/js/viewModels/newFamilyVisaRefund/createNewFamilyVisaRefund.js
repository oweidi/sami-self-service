define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'notifyjs','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup','ojs/ojgauge'],

    function(oj, ko, $, app, commonUtil, services) {

        function createNewFamilyVisaRefund() {
            var self = this;
            var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
            var gradeId = rootViewModel.personDetails().gradeId();
            self.currentStepValue = ko.observable('stp1');
            self.tracker = ko.observable();
            self.isDisabled = ko.observable(false);
            self.selected = ko.observable('stp1');
            self.addBtnVisible = ko.observable(false);
            self.currentDate=ko.observable(formatDate(new Date()));
            self.nextBtnVisible = ko.observable(true);
            self.clickedButton = ko.observable("");
            self.specialistSummary = ko.observable("");
            self.columnArrayApproval = ko.observableArray([]);
            this.dataSourceTB2 = ko.observable();
            this.dataTB2 = ko.observableArray([]);//added
            function formatDate(date) {
                    var month = '' + (date.getMonth() + 1),
                    day = '' + date.getDate(),
                    year = date.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            }
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);
        
        
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

            
            self.familyVisaRefundModel = {
                requestDate: self.currentDate(),
                contractType:ko.observable(""),
                reqNationality: rootViewModel.globalPersonFuseModel.nationality(),//
                amount:  ko.observable(2000),
                remarks: ko.observable(""),
                personNumber: ko.observable(""),
                payPeriod: ko.observable(""),
                name:ko.observable(""),
                createdBy:rootViewModel.personDetails().personNumber(),
                creationDate:ko.observable(new Date()),
                personId : ko.observable(""),
                commment:ko.observable(""),
                managerId:ko.observable(""),
                IS_DRAFT:ko.observable(""),
                imageBase64:ko.observable("")
            };
        
        //
        


            self.handleActivated = function(info) {;
                self.currentStepValue('stp1');
                this.selected = ko.observable('stp1');

            };

            self.handleAttached = function(info) {
              var searchLocation = window.location.search;
                if (searchLocation.indexOf('Specialist') >  - 1) {
                   self.specialistSummary("true");
                }
                else {
                   self.specialistSummary("false");
                }//addded
                self.currentStepValue('stp1');
                initTranslations();
                self.progressValue = ko.computed(function () {       
                return precantageOField(self.familyVisaRefundModel, 4);
            },
            this);
                self.familyVisaRefundModel.personNumber(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.familyVisaRefundModel.managerId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                self.familyVisaRefundModel.name(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
                self.familyVisaRefundModel.personId(self.specialistSummary() === 'true'? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
                
                services.geNumOfEmployeeTickets(self.familyVisaRefundModel.personId()).then(getNumOfEmployeeTicketReport, app.failCbFn);
            };
            self.handleDetached = function(info) {
                clearContent();
            };
            
            //----------------------------get contract status  --------------------
var getNumOfEmployeeTicketReport = (function (data) {
 var tempObject=  jQuery.parseJSON(data);
  self.familyVisaRefundModel.contractType(tempObject.CONTRACT_STATUS);
});
//----------------------------------END ------------------------

            this.stopSelectListener = function(event, ui) {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!self._showComponentValidationErrors(trackerObj)) {
                    event.preventDefault();
                    return;
                }
            }

            self.stepArray = ko.observableArray([]);

            this.previousStep = function() {
                var prev = document.getElementById("train").getPreviousSelectableStep();
                if (prev != null)
                    self.currentStepValue(prev);
            }
            
            this.nextStep = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker);
                if (!this._showComponentValidationErrors(trackerObj)) {
                    return;
                }
                
                var preview = document.querySelector('.attClass');
                self.familyVisaRefundModel.imageBase64(preview.src);
                
                if(preview.src.indexOf("data:") < 0) {
                       $.notify(self.attachmentNotify(), "error");
                       return;
                }
                if(self.familyVisaRefundModel.contractType() != 'Family'){
                         $.notify(self.validateRequest(), "error");
                          return;
                }
                         var next = document.getElementById("train").getNextSelectableStep();
                if (next != null)
                    self.currentStepValue(next);                                                    
            }
            
            self._showComponentValidationErrors = function(trackerObj) {
                trackerObj.showMessages();
                if (trackerObj.focusOnFirstInvalid())
                    return false;

                return true;
            };

            self.shouldDisableCreate = function() {
                var trackerObj = ko.utils.unwrapObservable(self.tracker),
                    hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
                return hasInvalidComponents;
            };
            
            self.currentStepValueText = function() {
                if (self.currentStepValue() == 'stp2') {
                    self.isDisabled(true);
                    self.addBtnVisible(true)
                    self.nextBtnVisible(false);
                } else {
                    self.isDisabled(false);
                    self.addBtnVisible(false);
                    self.nextBtnVisible(true);
                }
                
                return self.familyVisaRefund();
            };

            self.commitRecord = function(data, event) {
                addNewFamilyVisaRefund(event);
                return true;
            }
             //save draft
        this.submitDraft = function () {
            self.familyVisaRefundModel.IS_DRAFT("YES");
            document.querySelector("#draftDialog").open();
        };
         self.commitDraft   = function (data, event) {
            addNewFamilyVisaRefund(event);
            return true;
        }
         this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
                this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
            /*-----------------Approval List---------------------------*/
         this.openDialog = function () {

            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : "FVR", type : item.notification_type, status : item.role_type

                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            services.getWprkFlowAppovalList('FVR').then(getApprovalList, app.failCbFn);

        }
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }//end
        ///
            this.cancelAction = function() {
             if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                }
                else{
                oj.Router.rootInstance.go('summaryNewFamilyVisaRefund');
                }//added
            }

            function addNewFamilyVisaRefund(event) {
              if (self.clickedButton() != event.currentTarget.id) {
                var preview = document.querySelector('.attClass');
//                self.familyVisaRefundModel.personNumber(100009);
                self.clickedButton(event.currentTarget.id);
                self.familyVisaRefundModel.imageBase64=preview.src;
                var jsonData = ko.toJSON(self.familyVisaRefundModel);
                var addNewFamilyVisaRefundFn = function(data1) {
                    console.log(data1);
                    $.notify(self.createdMessage(), "success");
                     if(self.specialistSummary() == 'true'){
                     oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                    }
                    else{
                    oj.Router.rootInstance.go('summaryNewFamilyVisaRefund');
                    }//added
		};
		services.addNewFamilyVisaRefund(jsonData).then (addNewFamilyVisaRefundFn , app.failCbFn) ;
              }
                 return true;
            }
            
        this.submitButton = function () {
            self.familyVisaRefundModel.IS_DRAFT("NO");
            document.querySelector("#yesNoDialog").open();
        };
                this.cancelButton = function () {
                  self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
            
            /*function to clear table content after submit*/
            function clearContent() {
                self.familyVisaRefundModel.amount(2000);
                self.familyVisaRefundModel.remarks("");
                self.familyVisaRefundModel.payPeriod("");
                 self.clickedButton("");
            }
            
            //language support =========================
            self.back = ko.observable();
            self.requestDate = ko.observable();
            self.newFamilyVisaRefund = ko.observable();
            self.contractType = ko.observable();
            self.requesterNationality = ko.observable();
            self.amount = ko.observable();
            self.comments = ko.observable();
            self.remarks = ko.observable();
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
            self.familyVisaRefund= ko.observable();
            self.comment = ko.observable();
            self.createdMessage = ko.observable();
            self.saveDraft = ko.observable();
            self.serviceName = ko.observable();
            self.notificationType = ko.observable();
            self.employeeRole = ko.observable();
            self.approvals = ko.observable();
            self.ok = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.attachment = ko.observable();
            self.attachmentNotify = ko.observable();
            self.validateRequest = ko.observable();//added
             var getTranslation = oj.Translations.getTranslatedString;

             self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
                });
    function initTranslations() {
           self.back(getTranslation("others.back"));
           self.requestDate(getTranslation("labels.requestDate"));
           self.newFamilyVisaRefund(getTranslation("newFamilyVisaRefund.newFamilyVisaRefund"));
           self.contractType(getTranslation("newFamilyVisaRefund.contractType"));
           self.requesterNationality(getTranslation("newFamilyVisaRefund.requesterNationality"));
           self.amount(getTranslation("newFamilyVisaRefund.amount"));
           self.comments(getTranslation("newFamilyVisaRefund.comments"));
           self.remarks(getTranslation("newFamilyVisaRefund.remarks"));
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
           self.addMessage (getTranslation("newFamilyVisaRefund.addMessage"));  
           self.familyVisaRefund (getTranslation("newFamilyVisaRefund.familyVisaRefund"));
           self.comment(getTranslation("others.comment"));
           self.createdMessage (getTranslation("newFamilyVisaRefund.createdMessage"));
           self.saveDraft(getTranslation("labels.saveDraft"));
           self.serviceName(getTranslation("labels.serviceName"));
           self.notificationType(getTranslation("labels.notificationType"));
           self.employeeRole(getTranslation("labels.employeeRole"));
           self.columnArrayApproval([{"headerText" : self.serviceName(), "field" : "name"},
                                     {"headerText" : self.notificationType(), "field" : "type"},
                                     {"headerText" : self.employeeRole(), "field" : "status"}]);
         self.approvals(getTranslation("labels.approvals"));
         self.ok(getTranslation("others.ok"));
         self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
         self.attachment(getTranslation("businessTrip.attachment"));
         self.attachmentNotify(getTranslation("others.attachmentNotify"));
         self.validateRequest (getTranslation("newFamilyVisaRefund.validateRequest"));//added
    }
        self.label = {text: self.progressValue(), style: {color:'white'}};       
         self.thresholdValues = [{max: 33}, {max: 67}, {}];
        }
        return new createNewFamilyVisaRefund();
    });