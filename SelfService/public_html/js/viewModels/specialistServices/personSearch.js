define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'knockout-mapping', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup'], function (oj, ko, $, app, commonhelper, services, postbox, km) {

    function personSearchModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataEmp = ko.observableArray([]);
        this.empData = ko.observableArray([]);
        this.personResultdata = ko.observableArray([]);
        this.grievancedata = ko.observableArray([]);
        this.selfServices = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

        self.mode = ko.observable();
        self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data,
        {
            idAttribute : 'PersonNumber'
        }));
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        if (rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations') {
            this.selfServices.push( {
                code : "PLN", serviceName : "Penalties"
            });
        }
        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var personNumber = rootViewModel.personDetails().personNumber();
        var gradeId = rootViewModel.personDetails().gradeId();
        self.selectedRowKey = ko.observable();
        self.selectedEmployeeGrievance = ko.observable();
        self.selectedEmployee = ko.observable();
        self.selectedIndex = ko.observable();
        self.selectedEmployeeName = ko.observable();
        this.editDisabled = ko.observable(true);
        self.nationality= ko.observable();
        self.employeeStatus= ko.observable();
        self.grade= ko.observable();
        self.positionName= ko.observable();
        self.iban = ko.observable();
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        //

       self.selfServices(app.getPaaSLookup("SELF_TYPE"));

        self.searchModel = {
            personNumber : ko.observable(""), managerId : ko.observable(personId), firstName : ko.observable(""), lastName : ko.observable(""), nationalId : ko.observable(""), effectiveDate : ko.observable(""), name : ko.observable(""), selfServiceType : ko.observable("")
        };
        self.handleActivated = function (info) {
        };

        self.handleAttached = function (info) {
            self.data([]);
            initTranslations();
            self.dataEmp([]);
            self.selfServices(app.getPaaSLookup("SELF_TYPE"));
        };
        self.handleDetached = function (info) {
            rootViewModel.specialistSelectedEmployee(self.selectedEmployee());

            rootViewModel.specialistSelectedEmployeeName(self.selectedEmployeeName());


            ko.postbox.publish("summaryEmployeeGrievanceObj", self.selectedEmployee());
            ko.postbox.publish("Specialist", "true");
            //            ko.postbox.publish("creatStopAllowanceObj", self.selectedEmployee());
            //            ko.postbox.publish("creatPenaltiesObj", self.selectedEmployee());
            clearContent();
        };

        this.reset = function () {
            clearContent();
            self.data([]);
        }

        function clearContent() {
            self.searchModel.personNumber("");
            self.searchModel.firstName("");
            self.searchModel.lastName("");
            self.searchModel.name("");
            self.searchModel.effectiveDate("");
            self.searchModel.nationalId("");
            self.editDisabled(true);
            self.searchModel.selfServiceType("");

        }
        this.tableSelectionListener = function (event) {

            var data = event.detail;
            var currentRow = data.currentRow;
            if (currentRow['rowKey']) {
                self.selectedRowKey(currentRow['rowKey']);
                self.selectedIndex(currentRow['rowIndex']);
                self.editDisabled(false);

            }
        }
        self.editEmployeeGrievance = function () {

            if (self.selectedRowKey()) {
                self.mode('EditEmployeeGrievance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeGrievance(self.data()[self.selectedIndex()]);
                self.selectedEmployee(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editEmployeeGrievance');
            }

        }
         this.newFamilyVisible = ko.computed(function () {
            return isNewFamilyVisible(self.nationality(), self.employeeStatus());
        });//added
         this.isAdvHousingVisible = ko.computed(function () {
            return isAdvHousingVisible(self.nationality(), self.grade());
        });//added for advance housing

        var getPersonDetailsCbFn = function (data) {
            self.data([]);

           self.selfServices(app.getPaaSLookup("SELF_TYPE"));
            if (data) {
                var json_obj = jQuery.parseJSON(data);
                $.each(json_obj, function (index, value) {
                    var val = JSON.parse(JSON.stringify(value));

                        self.nationality(val.citizenshipLegislationCode);
                        self.employeeStatus(val.maritalStatus);
                        self.grade(val.grade);
                        self.positionName(val.positionName);

                    services.getEmployeeFuseModelReport(val.personId).then(function (dataEmp) {
                        var documents = jQuery.parseJSON(dataEmp);

                        self.dataEmp.push({
                            ArabicName : documents.ARABIC_NAME, Profession : documents.PROFESSION,PeopleGroup:documents.PEOPLE_GROUP

                                });
                                 self.iban(documents.IBAN_NUM);
                     if(self.iban()){
                            removeObj("BTR");
                          }
                    },
                    app.failCbFn);
                    //check  who are non eligibile and validation of each self service
                    if (!(self.newFamilyVisible())) {
                         removeObj('FVR');
                     }
                     if (!(self.isAdvHousingVisible())) {
                         removeObj('AH');
                     }
                     if((self.positionName().includes("Driver - Heavy"))){
                         removeObj('BT');
                     }
                     if (!(rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations')) {
                        removeObj("CHT");
                        removeObj("RAL");
                        removeObj('FVR');
                        removeObj('AH');
                     }
                   if((self.positionName().includes("Driver - Heavy"))){
                        removeObj("BT");
                    }
                    if (self.nationality()){
                        removeObj("TR");
                    }


                     ///end
                    self.data.push( {
                        carAllowance : val.carAllowance, mobileAllowance : val.mobileAllowance, transportationAlowance : val.transportationAlowance,
                        PersonNumber : val.personNumber, PersonId : val.personId, DisplayName : val.displayName, NationalId : (val.nationalId === 'null' || val.nationalId === null) ? '' : val.nationalId,
                        Department : val.departmentName, Position : val.positionName, Location : val.employeeLocation, HireDate : val.hireDate,
                        ManagerName : val.managerName, AssignmentName : val.assignmentName, Grade : val.grade, ManagerId : val.managerId,housingType:val.housingType,
                        AssignmentStatusTypeId:val.assignmentStatusTypeId,mobileNumber:val.mobileNumber,organizationName:val.organizationName,workPhone:val.workPhone,
                        telephoneExtension:val.telephoneExtension,faxNumber:val.faxNumber,faxExt:val.faxExt,email:val.email
                    });
                });

            }

        };
        function removeObj(code){
                self.selfServices.remove(function (item) {
                            return item.value ==code});
        }
        this.searchPerson = function () {
            if (rootViewModel.personDetails().positionName() === 'Supervisor - HR Operations') {
                self.searchModel.managerId("");
                    if (self.searchModel.name() || self.searchModel.nationalId() || self.searchModel.personNumber() || self.searchModel.managerId() || self.searchModel.effectiveDate()) {
                    services.searchEmployees(self.searchModel.name(), self.searchModel.nationalId(), self.searchModel.personNumber(), self.searchModel.managerId(), self.searchModel.effectiveDate()).then(getPersonDetailsCbFn, app.failCbFn);

                    }
                    else{
                          $.notify(self.insertValue(), "error");
                          self.data([]);
                          self.editDisabled(true);
                    }

                } else if ((self.searchModel.name() || self.searchModel.nationalId() || self.searchModel.personNumber() || self.searchModel.effectiveDate()) && self.searchModel.managerId()) {
                        services.searchEmployees(self.searchModel.name(), self.searchModel.nationalId(), self.searchModel.personNumber(),self.searchModel.managerId(), self.searchModel.effectiveDate()).then(getPersonDetailsCbFn, app.failCbFn);

                }else{
                     $.notify(self.insertValue(), "error");
                     self.data([]);
                    self.editDisabled(true);
                }
        }
        this.gotoSelfService = function () {

            if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'EMG') {

                if (self.selectedRowKey()) {
                    self.mode('SummaryEmployeeGrievance');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryEmployeeGrievance');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'EA') {

                if (self.selectedRowKey()) {
                    self.mode('summaryEmployeeAllowance');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    self.selectedEmployeeName(self.dataEmp()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryEmployeeAllowance');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'STA') {
                if (self.selectedRowKey()) {
                    self.mode('createStopAllowanceRequest');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    rootViewModel.specialistSelectedEmployee(self.selectedEmployee());

                    oj.Router.rootInstance.go('createStopAllowanceRequest');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'BT') {

                if (self.selectedRowKey()) {
                    self.mode('summaryBusinessTripSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryBusinessTripSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'BTR_RTN') {

                if (self.selectedRowKey()) {
                    self.mode('summaryBusinessTripReturnsSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryBusinessTripReturnsSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'BTD') {

                if (self.selectedRowKey()) {
                    self.mode('businessTripDriverSummarySpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('businessTripDriverSummarySpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'XIL') {

                if (self.selectedRowKey()) {
                    self.mode('summaryIdentificationLetterSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    self.selectedEmployeeName(self.dataEmp()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryIdentificationLetterSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'CEE') {

                if (self.selectedRowKey()) {
                    self.mode('summaryChildrenEductionExpenseSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryChildrenEductionExpenseSpecialist');
                }
            }
            //added
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'FVR') {

                if (self.selectedRowKey()) {
                    self.mode('summaryNewFamilyVisaRefundSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryNewFamilyVisaRefundSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'RRS') {

                if (self.selectedRowKey()) {
                    self.mode('rewardRequestSummarySpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('rewardRequestSummarySpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'AH') {

                if (self.selectedRowKey()) {
                    self.mode('advHousingSummarySpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('advHousingSummarySpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'AAL') {

                if (self.selectedRowKey()) {
                    self.mode('advAnnualLeaveSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryAdvancedAnnualLeaveSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'CRR') {

                if (self.selectedRowKey()) {
                    self.mode('employeeCarRequest');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryEmployeeCarRequestSpecialist');
                }
            }
        else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'BTR') {

                if (self.selectedRowKey()) {
                    self.mode('NewBank');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('bankTransferAccSummarySpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'PLN') {
                if (self.selectedRowKey()) {
                    self.mode('createPenalties');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    rootViewModel.specialistSelectedEmployee(self.selectedEmployee());
                    oj.Router.rootInstance.go('createPenalties');
                }
            }

        else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'TRF') {

                if (self.selectedRowKey()) {
                    self.mode('NewBank');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryTicketRequestRefundSpecialist');
                }
            }
            //added
             else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'CHT') {

                if (self.selectedRowKey()) {
                    self.mode('ChangeHousingRequest');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    self.selectedEmployeeName(self.dataEmp()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryChangeHousingTypeSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'TR') {

                if (self.selectedRowKey()) {
                    self.mode('TicketReqeust');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryTicketRequestSpecialist');
                }
            }
            else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'MICR') {

                if (self.selectedRowKey()) {
                    self.mode('medicalInsuranceSpecialist');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    console.log(self.selectedEmployee());
                    oj.Router.rootInstance.go('summaryEmployeeMedicalInsuranceSpecialist');
            }
          }  else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'RAL') {

                if (self.selectedRowKey()) {
                    self.mode('ReturnAfterLeave');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryReturnAfterLeaveSpecialist');
                }
            }
             else if (self.searchModel.selfServiceType() && self.searchModel.selfServiceType().toString() === 'CRD') {

                if (self.selectedRowKey()) {
                    self.mode('Card');
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    self.selectedEmployee(self.data()[self.selectedIndex()]);
                     self.selectedEmployeeName(self.dataEmp()[self.selectedIndex()]);
                    oj.Router.rootInstance.go('summaryCardsRequestSpecialist');
                }
            }
            //added
        }

        //language support =========================
        self.name = ko.observable();
        self.position = ko.observable();
        self.department = ko.observable();
        self.personNumber = ko.observable();
        self.goTo = ko.observable();
        self.efficitveDate = ko.observable();
        self.search = ko.observable();
        self.clear = ko.observable();
        self.personnumber = ko.observable();
        self.nationalId = ko.observable();
        self.effictiveDate = ko.observable();
        self.search = ko.observable();
        self.clear = ko.observable();
        self.goTo = ko.observable();
        self.location = ko.observable();
        self.insertValue = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.clear(getTranslation("others.clear"));
            self.search(getTranslation("others.search"));
            self.personnumber(getTranslation("common.personNumber"));
            self.name(getTranslation("common.name"));
            self.nationalId(getTranslation("personSearch.nationalId"));
            self.effictiveDate(getTranslation("personSearch.effictiveDate"));
            self.search(getTranslation("others.search"));
            self.goTo(getTranslation("personSearch.goTo"));
            self.nationalId(getTranslation("personSearch.nationalId"));
            self.location(getTranslation("labels.location"));
            self.department(getTranslation("common.department"));
            self.insertValue(getTranslation("labels.insertValue"));
            //
            self.columnArray([
            {
                "headerText" : self.personnumber(), "field" : "PersonNumber"
            },
            {
                "headerText" : self.name(), "field" : "DisplayName"
            },
            {
                "headerText" : self.nationalId(), "field" : "NationalId"
            },
            {
                "headerText" : self.department(), "field" : "Department"
            },
            {
                "headerText" : self.position(), "field" : "Position"
            },
            {
                "headerText" : self.location(), "field" : "Location"
            }
]);
        self.selfServices(app.getPaaSLookup("SELF_TYPE"));
        }

    }
    return new personSearchModel();
});
