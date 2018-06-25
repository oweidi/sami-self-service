define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog'], function (oj, ko, $, app, commonUtil, services) {

    function CreatePenaltiesViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        var personId = rootViewModel.personDetails().personId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.current = ko.observable();
        self.addBtnVisible = ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.disableSubmit = ko.observable(false);
        self.disableNext = ko.observable(false);
        self.isNoData = ko.observable(true);
        self.isABS = ko.observable(true);
        self.isABSReq = ko.observable(false);
        var date = new Date();
         self.approvalDataSourceTB2 = ko.observable();
         self.approvaldataTB2 = ko.observableArray([]);
         self.columnArrayApproval = ko.observableArray([]);
        date.setDate(date.getDate() - 30);
        this.specialistSummary = ko.observable("");//added
        self.violationTypeList = ko.observableArray(rootViewModel.globalViolationType());
        self.suggestedActionList = ko.observableArray();
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);

        this.selectedTypeValue = ko.observable("");
        this.selectedTypeLabel = ko.observable("");
        this.selectedAction = ko.observable("");
        self.formatDate = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
         self.formatDate2 = function (date) {
            //var date = new Date()
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [day, month, year].join('-');
        }

        self.invistigationMinDate = ko.observable(self.formatDate(date));
        self.penalitesModel = {
            offenceDate : ko.observable(""),
            invistigationDate : ko.observable(""),
            violationType : ko.observable(""),
            absenceDateFrom : ko.observable(""),
            absenceDateTo : ko.observable(""),
            occurrence : ko.observable(""),
            suggestedAction : ko.observable(""),
            deductionHours : ko.observable(""),
            deductionDays : ko.observable(""), 
            deductionBasicSalaryPercentage : ko.observable(""),
            penaltieslabel : ko.observable(""),
            imageBase64 : ko.observable(""), 
            requestDate : ko.observable(self.formatDate(new Date())),
            managerId : rootViewModel.specialistSelectedEmployee().ManagerId,
            status : ko.observable(""), name : ko.observable(""),
            createdBy : rootViewModel.personDetails().personNumber(),
            personNumber : rootViewModel.specialistSelectedEmployee().PersonNumber,
            personId : rootViewModel.specialistSelectedEmployee().PersonId
        };
        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };
        this.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];

        //
        self.now = new Date();
        if (self.now.getDate() == 1) {
            self.current = self.formatDate(new Date());
        }
        else {
            if (self.now.getMonth() == 11) {
                self.current = self.formatDate(new Date(self.now.getFullYear() + 1, 0, 1));
            }
            else {
                self.current = self.formatDate(new Date(self.now.getFullYear(), self.now.getMonth() + 1, 1));
            }
        }
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
        this.typeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != null) {
                self.selectedTypeValue(data.value);
                self.selectedTypeLabel(data.label);//requestDate
                console.log(self.penalitesModel.personId);
                var getPenalitesCbFn = function (data) {
                if (data){
                    self.penalitesModel.occurrence(data.items[0].count);
                  }
                }
              var date2Occ =  self.formatDate2(new Date (self.penalitesModel.requestDate()));
               console.log(date2Occ);
                 services.getPLNOccurrence( self.penalitesModel.personId,self.selectedTypeValue().toString(),date2Occ).then(getPenalitesCbFn, app.failCbFn);
                    
            }

            var searchUDTArray = rootViewModel.globalUDTLookup();
            self.suggestedActionList([]);
            for (var i = 0;i < searchUDTArray.length;i++) {
                if (self.penalitesModel.violationType() != null || self.penalitesModel.violationType() != "") {
                    if (searchUDTArray[i].tableName === 'XXX_HR_ADMINISTRATIVE_INVESTIGATIONS' && searchUDTArray[i].colName.includes(self.penalitesModel.violationType())) {
                        self.suggestedActionList.push( {
                            "value" : searchUDTArray[i].rowName.toString().substring(0, searchUDTArray[i].rowName.toString().indexOf('(')), "label" : searchUDTArray[i].rowName.toString().match(/\(([^)]+)\)/)[1], "actionValue" : searchUDTArray[i].value
                        });
                    }
                }
            }

            ///////////   Change CAR to "ABS"  /////////////////////////// (/\(([^)]+)\)/)[1]
            if (self.selectedTypeValue().toString().match(/^ABS/)) {
                if (self.currentStepValue() == 'stp1') {
                    self.isABS(false);
                    self.isABSReq(true);
                }
            }
            else {
                if (self.currentStepValue() == 'stp1') {
                    self.isABS(true);
                    self.isABSReq(false);
                }
            }
        }
        this.actionChangedHandler = function (event, data) {
            if (self.penalitesModel.violationType() == null || self.penalitesModel.violationType() == "") {
                self.suggestedActionList([]);
            }
            if (data.option == 'rawValue' && data.value != null) {
                self.selectedTypeValue(data.value);
                self.selectedTypeLabel(data.label);
            }

        }
        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };
        self.handleDeactivated = function (info) {
            clearContent();

        }

        self.handleAttached = function (info) {
            self.penalitesModel = {
                offenceDate : ko.observable(""), invistigationDate : ko.observable(""), violationType : ko.observable(""), absenceDateFrom : ko.observable(""), absenceDateTo : ko.observable(""), occurrence : ko.observable(""), suggestedAction : ko.observable(""), deductionHours : ko.observable(""), deductionDays : ko.observable(""), deductionBasicSalaryPercentage : ko.observable(""), penaltieslabel : ko.observable(""), imageBase64 : ko.observable(""), requestDate : ko.observable(self.formatDate(new Date())), managerId : rootViewModel.specialistSelectedEmployee().ManagerId, status : ko.observable(""), name : ko.observable(""), createdBy : rootViewModel.personDetails().personNumber(), personNumber : rootViewModel.specialistSelectedEmployee().PersonNumber, personId : rootViewModel.specialistSelectedEmployee().PersonId
            };
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.penalitesModel, 11);
            },
            this);
        };
        self.handleDetached = function (info) {
            rootViewModel.specialistSelectedEmployee(" ");
        };

        this.penaltiesSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }
        }

        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null) {
                self.currentStepValue(prev);
            }
        }

        this.nextStep = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            document.getElementById("inputImg").required = true;
            var preview = document.querySelector('.attClass');
            self.penalitesModel.imageBase64(preview.src);

            if (preview.src.indexOf("data:") < 0) {
                $.notify(self.attachmentNotify(), "error");
                return;
            }

            self.isABS(true);
            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null) {
                self.currentStepValue(next);
            }

        }

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

            return self.penaltieslabel();
        };
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };
        self.commitRecord = function (data, event) {
            addPenaltiesRecord();
            return true;
        }

        this.cancelAction = function () {
            if (oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
            }
        }

        function addPenaltiesRecord() {
            var preview = document.querySelector('.attClass');
            if (!self.disableSubmit()) {
                self.disableSubmit(true);
            }

            self.penalitesModel.imageBase64(preview.src);
            self.penalitesModel.status("PENDING_APPROVED");
            self.penalitesModel.violationType(self.penalitesModel.violationType().toString());
            self.penalitesModel.suggestedAction(self.penalitesModel.suggestedAction().toString());
            var jsonData = ko.toJSON(self.penalitesModel);
            var addPenalitesCbFn = function (data) {
                $.notify(self.notifyCreate(), "success");

                if (oj.Router.rootInstance._navHistory.length > 1) {
                    oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
                }
                self.disableSubmit(false);
            };
            services.addPenalties(jsonData).then(addPenalitesCbFn, app.failCbFn);
        }
        //added
        function clearContent() {
            rootViewModel.specialistSelectedEmployee(" ");
            self.penalitesModel = {
            };
        }
              this.openApprovalDialog = function () {
   //approvalDataSourceTB2
            var getApprovalList = function (data) {
                self.approvaldataTB2([]);
                $.each(data.items, function (i, item) {
                    self.approvaldataTB2.push( {
                        name : "Penaliites  ", type : item.notification_type, status : item.role_type

                    });

                });
                self.approvalDataSourceTB2(new oj.ArrayTableDataSource(self.approvaldataTB2));
                $("#modalApprovalDialog").ojDialog("open");
            };

            services.getWprkFlowAppovalList('PLN').then(getApprovalList, app.failCbFn);

        }
                this.closeApprovalDialog = function () {
            $("#modalApprovalDialog").ojDialog("close");
        }

        //language support =========================
        self.submit = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.back = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.yes = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.ok = ko.observable();
        self.requestDate = ko.observable();
        self.next = ko.observable();
        self.placeholder = ko.observable();
        self.notifyCreate = ko.observable();

        self.penaltieslabel = ko.observable();
        self.offenceDate = ko.observable();
        self.invistigationDate = ko.observable();
        self.violationType = ko.observable();
        self.absenceDateFrom = ko.observable();
        self.absenceDateTo = ko.observable();
        self.occurrance = ko.observable();
        self.suggestedAction = ko.observable();
        self.deductionHours = ko.observable();
        self.deductionDays = ko.observable();
        self.deductionBasicSalaryPercentage = ko.observable();
        self.ServiceName = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.notificationType = ko.observable();
        self.employeeRole = ko.observable();
        self.attachment = ko.observable();
        self.attachmentNotify = ko.observable();//added
        self.approvals = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
         self.approvals(getTranslation("labels.approvals"));
         self.ok(getTranslation("others.ok"));
            self.penaltieslabel(getTranslation("penalties.penaltieslabel"));
            self.offenceDate(getTranslation("penalties.offenceDate"));
            self.invistigationDate(getTranslation("penalties.invistigationDate"));
            self.violationType(getTranslation("penalties.violationType"));
            self.absenceDateFrom(getTranslation("penalties.absenceDateFrom"));
            self.absenceDateTo(getTranslation("penalties.absenceDateTo"));
            self.occurrance(getTranslation("penalties.occurrance"));
            self.suggestedAction(getTranslation("penalties.suggestedAction"));
            self.deductionHours(getTranslation("penalties.deductionHours"));
            self.deductionDays(getTranslation("penalties.deductionDays"));
            self.deductionBasicSalaryPercentage(getTranslation("penalties.deductionBasicSalaryPercentage"));

            self.attachment(getTranslation("businessTrip.attachment"));
            self.submit(getTranslation("others.submit"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.back(getTranslation("others.pervious"));
            self.next(getTranslation("others.next"));
            self.cancel(getTranslation("others.cancel"));
            self.create(getTranslation("labels.create"));
            self.review(getTranslation("others.review"));
            self.placeholder(getTranslation("labels.placeHolder"));
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.notifyCreate(getTranslation("penalties.notifyCreate"));
            self.addMessage(getTranslation("penalties.addMessage"));
            self.attachmentNotify(getTranslation("others.attachmentNotify"));//added
            
            self.ServiceName(getTranslation("labels.serviceName"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
          
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

    }
    return new CreatePenaltiesViewModel();
});