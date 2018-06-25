define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation', 'ojs/ojcheckboxset', 'ojs/ojradioset', 'ojs/ojlabel'], function (oj, ko, $, app, commonUtil, services) {

    function editEmployeeMedicalInsurance() {
        var self = this;

        self.currentColor = ko.observable();

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        this.val = ko.observable("");
        self.isRequired = ko.observable(true);
        this.specialistSummary = ko.observable("");//added
        var managerId = rootViewModel.personDetails().managerId();
        var personId = rootViewModel.personDetails().personId();
        var gradeId = rootViewModel.personDetails().gradeId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.isDisabled = ko.observable(false);
        self.isDisabled2 = ko.observable(false);
        self.isDependent1 = ko.observable(true);
        self.isDependent2 = ko.observable(true);
        self.isDependent3 = ko.observable(true);
        self.isDependent4 = ko.observable(true);
        self.isOtherReason = ko.observable(true);
        self.reqOtherReason = ko.observable(false);
        
        self.dependent_1_details = ko.observable("");
        self.dependent_2_details = ko.observable("");
        self.dependent_3_details = ko.observable("");
        self.dependent_4_details = ko.observable("");
        self.dependent_5_details = ko.observable("");
        
        self.isOtherReason = ko.observable(true);
        self.reqOtherReason = ko.observable(false);
        self.selected = ko.observable('stp1');
        self.addBtnVisible = ko.observable(false);
        self.currentDate = ko.observable(formatDate(new Date()));
        self.hrcYesNo = ko.observableArray(rootViewModel.globalHRCYesNo());
        self.hrIdentification = ko.observableArray(rootViewModel.globalHRIdentification());
        self.receiveLocationList = ko.observableArray(rootViewModel.globalReceiveLocationLov());
        self.medicalInsuranceTypeList = ko.observableArray(rootViewModel.globalNadecMedicalInsuranceType());
        self.medicalInsuranceReasonList = ko.observableArray(rootViewModel.globalNadecMedicalInsuranceReason());
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        self.approvaldataTB2 = ko.observableArray([]);
        self.approvalDataSourceTB2 = ko.observable();
        self.receiveLocationList.push( {
            label : "(AHMAD – SON – 15/JAN/1999)", value : "(AHMAD – SON – 15/JAN/1999)"
        },
        {
            label : "qwe", value : "qwe"
        });
        self.dependantNameArr1 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.dependantNameArr2 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.dependantNameArr3 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.dependantNameArr4 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.dependantNameArr5 = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        self.dependentArray = ko.observableArray([
        {
            BIRTH_DATE : '', "FullNameEn" : '', "DependentDataFormated" : '', "FullNameAr" : '', EMP_PERSON_NUMBER : '5', "DEP_EN_FIRST_NAME" : '', "DEP_EN_FAMILY_NAME" : '', "DEP_AR_FIRST_NAME" : '', "DEP_AR_FAMILY_NAME" : '', "CONTACT_TYPE" : '', "EMERGENCY_CONTACT_FLAG" : ''

        }
]);
        self.mailTypes = ko.observableArray(rootViewModel.globalMailType());
        self.nextBtnVisible = ko.observable(true);
        self.clickedButton = ko.observable("");
        this.specialistSummary = ko.observable("");//added
        function formatDate(date) {
            var month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            return [year, month, day].join('-');
        }
        self.progressValue = ko.computed(function () {
            return 0;
        },
        this);
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        self.employeeMedicalInsuranceModel = {
            id : ko.observable(""), requestDate : ko.observable(""),personName : ko.observable(""), passengerName1 : ko.observable(""), passengerName2 : ko.observable(""), passengerName3 : ko.observable(""), passengerName4 : ko.observable(""),requestType : ko.observable(""), reason : ko.observable(""), otherReasons : ko.observable(""), dependent_1_details : ko.observable(""), dependent_2_details : ko.observable(""), dependent_3_details : ko.observable(""), dependent_4_details : ko.observable(""), dependent_5_details : ko.observable(""), employeeGrade : ko.observable(""), IdIqamaNumber : ko.observable(""), employeBirthDate : ko.observable(""), remarks : ko.observable(""), imageBase64 : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : rootViewModel.personDetails().personNumber(), creationDate : ko.observable(""), personNumber : ko.observable(""), personId : ko.observable(""), managerId : ko.observable(""), IS_DRAFT : ko.observable("")
        };
//        self.employeeMedicalInsuranceModel = {
//              requestType : ko.observable(""), reason : ko.observable(""), otherReasons : ko.observable(""), dependent_1_details : ko.observable(""), dependent_2_details : ko.observable(""), dependent_3_details : ko.observable(""), dependent_4_details : ko.observable(""), dependent_5_details : ko.observable(""), employeeGrade : ko.observable(""), IdIqamaNumber : ko.observable(""), employeBirthDate : ko.observable(""), remarks : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : ko.observable(""), creationDate : ko.observable(""), personNumber : ko.observable(""), personId : ko.observable(""), managerId : ko.observable(""), IS_DRAFT : ko.observable(""), updatedBy : rootViewModel.personDetails().personNumber(), updateDate : self.currentDate()
//        };
        ko.postbox.subscribe("editEmployeeMedicalInsuranceObj", function (newValue) {
        console.log(newValue);
            self.employeeMedicalInsuranceModel.id(newValue.id);
            self.employeeMedicalInsuranceModel.requestDate(newValue.request_date);
            self.employeeMedicalInsuranceModel.requestType(newValue.request_type);
            self.employeeMedicalInsuranceModel.reason(newValue.reason);
            self.employeeMedicalInsuranceModel.otherReasons(newValue.other_reasons);
            self.employeeMedicalInsuranceModel.employeeGrade(newValue.employee_grade);
            self.employeeMedicalInsuranceModel.IdIqamaNumber(newValue.id_iqama_number);
            self.employeeMedicalInsuranceModel.employeBirthDate(newValue.employee_birth_date);
            self.employeeMedicalInsuranceModel.remarks(newValue.remarks);
            self.employeeMedicalInsuranceModel.personNumber(newValue.person_number);
            self.employeeMedicalInsuranceModel.personId(newValue.personId);
            self.employeeMedicalInsuranceModel.name(newValue.name);
            self.employeeMedicalInsuranceModel.status(newValue.status);
            self.employeeMedicalInsuranceModel.managerId(newValue.managerId);
            self.employeeMedicalInsuranceModel.imageBase64(newValue.imageBase64);
            if (self.employeeMedicalInsuranceModel.reason() == "OTHERS") {
                self.isOtherReason(false);
                self.reqOtherReason(true);
            }
            if(newValue.dependent_1_details != null){
                self.dependent_1_details(newValue.dependent_1_details);
            }
            if(newValue.dependent_2_details != null){
                self.dependent_2_details(newValue.dependent_2_details);
            }
            if(newValue.dependent_3_details != null){
                self.dependent_3_details(newValue.dependent_3_details);
            }
            if(newValue.dependent_4_details != null){
                self.dependent_4_details(newValue.dependent_4_details);
            }
            if(newValue.dependent_5_details != null){
                self.dependent_5_details(newValue.dependent_5_details);
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////////////////
        

        var getchildrenExpenseCbFn2 = (function (data) {

            var ind = 0;
            parser = new DOMParser();
            xmlDOC = parser.parseFromString(data, "text/xml");
            $xml = $(xmlDOC);
            self.dependentArray.push( {
                ind : ind, EMP_PERSON_NUMBER : self.employeeMedicalInsuranceModel.personNumber(), "FullNameEn" : self.employeeMedicalInsuranceModel.name(), "FullNameAr" : self.employeeMedicalInsuranceModel.name(), "CONTACT_TYPE" : "Employee", BIRTH_DATE : "50", "DOB" : "(" + self.employeeMedicalInsuranceModel.employeBirthDate(), "DependentDataFormatedEN" : "(" + self.employeeMedicalInsuranceModel.name() + " - Himself - " + self.employeeMedicalInsuranceModel.employeBirthDate() + ")"
            });
            ind++;

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
                var DEP_DOB = formatDate(new Date($(this).find('DOB').text()));

                //    self.childrenExpenseModel.dependentAge(BIRTH_DATE)
                if (CONTACT_TYPE == "Daughter" || (CONTACT_TYPE == "Son" && BIRTH_DATE > 23) || CONTACT_TYPE == "Wife") {
                    self.dependentArray.push( {
                        ind : ind, EMP_PERSON_NUMBER : EMP_PERSON_NUMBER, DEP_EN_FIRST_NAME : DEP_EN_FIRST_NAME, "DEP_EN_FATHER_NAME" : DEP_EN_FATHER_NAME, "DEP_EN_GRAND_FATHER" : DEP_EN_GRAND_FATHER, "DEP_EN_FAMILY_NAME" : DEP_EN_FAMILY_NAME, "FullNameEn" : DEP_EN_FIRST_NAME + " " + DEP_EN_FATHER_NAME + " " + DEP_EN_GRAND_FATHER + " " + DEP_EN_FAMILY_NAME, "DEP_AR_FIRST_NAME" : DEP_AR_FIRST_NAME, "DEP_AR_FATHER_NAME" : DEP_AR_FATHER_NAME, "DEP_AR_GRAND_FATHER" : DEP_AR_GRAND_FATHER, "DEP_AR_FAMILY_NAME" : DEP_AR_FAMILY_NAME, "FullNameAr" : DEP_AR_FIRST_NAME + " " + DEP_AR_FATHER_NAME + " " + DEP_AR_GRAND_FATHER + " " + DEP_AR_FAMILY_NAME, "CONTACT_TYPE" : CONTACT_TYPE, "EMERGENCY_CONTACT_FLAG" : EMERGENCY_CONTACT_FLAG, BIRTH_DATE : BIRTH_DATE, "DOB" : DEP_DOB, "DependentDataFormatedEN" : "(" + DEP_EN_FIRST_NAME + " - " + CONTACT_TYPE + " - " + DEP_DOB + ")", "DependentDataFormatedAR" : "(" + DEP_AR_FIRST_NAME + " - " + CONTACT_TYPE + " - " + DEP_DOB + ")"
                    });
                    console.log(self.dependentArray());
                    ind++;
                }
            });
            if(self.dependent_1_details() != null){
            self.dependantNameArr1(BuildDependent2Array());
            self.employeeMedicalInsuranceModel.dependent_1_details(self.dependent_1_details());}
            if(self.dependent_2_details() != null){
            self.dependantNameArr2(BuildDependent2Array());
            self.employeeMedicalInsuranceModel.dependent_2_details(self.dependent_2_details());}
            if(self.dependent_3_details() != null){
            self.dependantNameArr3(BuildDependent2Array());
            self.employeeMedicalInsuranceModel.dependent_3_details(self.dependent_3_details());}
            if(self.dependent_4_details() != null){
            self.dependantNameArr4(BuildDependent2Array());
            self.employeeMedicalInsuranceModel.dependent_4_details(self.dependent_4_details());}
            if(self.dependent_5_details() != null){
            self.dependantNameArr5(BuildDependent2Array());
            self.employeeMedicalInsuranceModel.dependent_5_details(self.dependent_5_details());}
            
            //   BuildDependentArray ();
            // self.dependantNameArr1([]);
//            self.dependantNameArr1(BuildDependent2Array());
        });

        //services.getDependentsName(self.ticketRequestModel.personNumber()).then(getchildrenExpenseCbFn2, app.failCbFn);  Handel Attached
        //Function To Build Dependnt Array 2
        function BuildDependent2Array() {
            var temparr = [];

            for (var i = 0;i < self.dependentArray().length;i++) {
                if (document.documentElement.lang == "ar") {
                    if (self.employeeMedicalInsuranceModel.dependent_1_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_2_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_3_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_4_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_5_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.dependentArray()[i].DependentDataFormatedEN != null) {
                        temparr.push( {
                            "value" : self.dependentArray()[i].DependentDataFormatedEN, "label" : self.dependentArray()[i].DependentDataFormatedAR
                        });
                    }
                }
                else if (self.employeeMedicalInsuranceModel.dependent_1_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_2_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_3_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_4_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.employeeMedicalInsuranceModel.dependent_5_details().toString() != self.dependentArray()[i].DependentDataFormatedEN && self.dependentArray()[i].DependentDataFormatedEN != null) {
                  
                    temparr.push( {
                        "value" : self.dependentArray()[i].DependentDataFormatedEN, "label" : self.dependentArray()[i].DependentDataFormatedEN
                    });
                }

            }

            return temparr;
        }
        //-------------------End Of Function ------------------------------
        //Function To Build Dependnt Array 3,4
        function BuildDependent3Array(depArrIndex1) {
            var temparr = [];
            for (var i = 0;i < self.dependentArray().length;i++) {
                if (depArrIndex1 != i && document.documentElement.lang == "ar") {
                    temparr.push( {
                        "value" : self.dependentArray()[i].FullNameAr, "label" : self.dependentArray()[i].FullNameAr
                    });
                }
                else if (depArrIndex1 != i) {
                    temparr.push( {
                        "value" : self.dependentArray()[i].FullNameEn, "label" : self.dependentArray()[i].FullNameEn
                    });
                }

            }

            return temparr;
        }
        //-------------------End Of Function ------------------------------
        function getDependentIndex(selctedDepFullName) {
            var selectedIndex = 0;
            for (var i =  - 0;i < self.dependentArray().length;i++) {
                if (self.dependentArray()[i].FullNameEn == selctedDepFullName || self.dependentArray()[i].FullNameAr == selctedDepFullName) {
                    selectedIndex = i;
                    break;
                }
            }
            return selectedIndex;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        this.dependent_1_ChangedHandler = function (event, data) {
            if (self.employeeMedicalInsuranceModel.dependent_1_details() != null && self.employeeMedicalInsuranceModel.dependent_1_details() != "") {
                if (data.option == 'value' && data.value[0] != null) {
                    self.isDependent1(false);
                    //   var depArrIndex = getDependentIndex(self.employeeMedicalInsuranceModel.passengerName1().toString());
                    // var age = self.dependentArray()[depArrIndex].BIRTH_DATE;
                    //  self.dependent1Age(age);
                    // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
                    //  updateChildAndAdult();
                    self.employeeMedicalInsuranceModel.dependent_2_details("");
                    self.employeeMedicalInsuranceModel.dependent_3_details("");
                    self.employeeMedicalInsuranceModel.dependent_4_details("");
                    self.employeeMedicalInsuranceModel.dependent_5_details("");
                    self.dependantNameArr2(BuildDependent2Array());
                    self.dependantNameArr3(BuildDependent2Array());
                    self.dependantNameArr4(BuildDependent2Array());
                    self.dependantNameArr5(BuildDependent2Array());
                }
            }
            else {
                self.employeeMedicalInsuranceModel.dependent_2_details("");
                self.employeeMedicalInsuranceModel.dependent_3_details("");
                self.employeeMedicalInsuranceModel.dependent_4_details("");
                self.employeeMedicalInsuranceModel.dependent_5_details("");
                self.isDependent1(true);
                self.isDependent2(true);
                self.isDependent3(true);
                self.isDependent4(true);

            }
        }
        this.dependent_2_ChangedHandler = function (event, data) {
            if (self.employeeMedicalInsuranceModel.dependent_2_details() != null && self.employeeMedicalInsuranceModel.dependent_2_details() != "") {
                if (event.detail.trigger == 'option_selected' && event.detail.value != null) {
                    self.isDependent2(false);
                    var depArrIndex = getDependentIndex(self.employeeMedicalInsuranceModel.passengerName2().toString());

                    //                    var age = self.dependentArray()[depArrIndex].BIRTH_DATE;
                    //                    self.dependent2Age(age);
                    //                    // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
                    //                    updateChildAndAdult();
                    self.employeeMedicalInsuranceModel.dependent_3_details("");
                    self.employeeMedicalInsuranceModel.dependent_4_details("");
                    self.employeeMedicalInsuranceModel.dependent_5_details("");
                    self.dependantNameArr3(BuildDependent2Array());
                    self.dependantNameArr4(BuildDependent2Array());
                    self.dependantNameArr5(BuildDependent2Array());
                }

            }
            else {
                self.isDependent2(true);
                self.isDependent3(true);
                self.isDependent4(true);
                self.employeeMedicalInsuranceModel.dependent_3_details("");
                self.employeeMedicalInsuranceModel.dependent_4_details("");
                self.employeeMedicalInsuranceModel.dependent_5_details("");
            }
        }
        this.dependent_3_ChangedHandler = function (event, data) {
            if (self.employeeMedicalInsuranceModel.dependent_3_details() != null && self.employeeMedicalInsuranceModel.dependent_3_details() != "") {
                if (event.detail.trigger == 'option_selected' && event.detail.value != null) {
                    var depArrIndex = getDependentIndex(self.employeeMedicalInsuranceModel.passengerName3().toString());

                    //                var age = self.dependentArray()[depArrIndex].BIRTH_DATE;
                    //                self.dependent3Age(age);
                    //                // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
                    //                updateChildAndAdult();
                    self.employeeMedicalInsuranceModel.dependent_4_details("");
                    self.employeeMedicalInsuranceModel.dependent_5_details("");
                    self.dependantNameArr4(BuildDependent2Array());
                    self.dependantNameArr5(BuildDependent2Array());
                    self.isDependent3(false);
                }

            }
            else {
                self.isDependent3(true);
                self.isDependent4(true);
                self.employeeMedicalInsuranceModel.dependent_4_details("");
                self.employeeMedicalInsuranceModel.dependent_5_details("");
            }
        }
        this.dependent_4_ChangedHandler = function (event, data) {
            if (self.employeeMedicalInsuranceModel.dependent_4_details() != null && self.employeeMedicalInsuranceModel.dependent_4_details() != "") {
                if (event.detail.trigger == 'option_selected' && event.detail.value != null) {
                    var depArrIndex = getDependentIndex(self.employeeMedicalInsuranceModel.passengerName4().toString());

                    //                var age = self.dependentArray()[depArrIndex].BIRTH_DATE;
                    //                self.dependent4Age(age);
                    //                // increeseChildAndAdult(self.dependentArray()[depArrIndex].BIRTH_DATE);
                    //                updateChildAndAdult();
                    self.employeeMedicalInsuranceModel.dependent_5_details("");
                    self.dependantNameArr5(BuildDependent2Array());
                    self.isDependent4(false);
                }

            }
            else {
                self.isDependent4(true);
                self.employeeMedicalInsuranceModel.dependent_5_details("");
            }
        }
        this.dependent_5_ChangedHandler = function (event, data) {
            if (self.employeeMedicalInsuranceModel.dependent_1_details() != null && self.employeeMedicalInsuranceModel.dependent_1_details() != "") {
                if (event.detail.trigger == 'option_selected' && event.detail.value != null) {

                }
            }
        }
        this.requestTypeChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != "") {

            }
        }
        this.reasonChangedHandler = function (event, data) {
            if (data.option == 'value' && data.value != "") {
                if (data.value.toString() == "OTHERS") {
                    self.isOtherReason(false);
                    self.reqOtherReason(true);
                    //                    self.employeeMedicalInsuranceModel.reason("");
                }
                else {
                    self.isOtherReason(true);
                    self.reqOtherReason(false);
                }
            }
        }

        self.handleActivated = function (info) {
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
        };
        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            self.employeeMedicalInsuranceModel.employeeGrade = ko.observable(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().Grade : rootViewModel.personDetails().grade());
            self.employeeMedicalInsuranceModel.IdIqamaNumber = ko.observable(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().NationalId : rootViewModel.personDetails().nationalId());
            self.employeeMedicalInsuranceModel.employeBirthDate = ko.observable(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().dateOfBirth : rootViewModel.personDetails().dateOfBirth());

            //addded
            // services.getAdvancedAnnualLeaveReport(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getAdvancedAnnualLeaveReportFn, app.failCbFn);
            var personNumber = self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber();
            self.employeeMedicalInsuranceModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
            self.employeeMedicalInsuranceModel.name(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName());
            self.employeeMedicalInsuranceModel.personId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonId : rootViewModel.personDetails().personId());
            self.employeeMedicalInsuranceModel.managerId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());

            services.getDependentsName(personNumber).then(getchildrenExpenseCbFn2, app.failCbFn);

            self.currentStepValue('stp1');
            initTranslations();
            self.progressValue = ko.computed(function () {
                return precantageOField(self.employeeMedicalInsuranceModel, 17);
            },
            this);
        };
        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self.handleDetached = function (info) {
            clearContent();
        };
        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
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
        document.getElementById("inputImg").required = true;
            var preview = document.querySelector('.attClass');
            self.employeeMedicalInsuranceModel.imageBase64(preview.src);

            if (preview.src.indexOf("data:") < 0) {
                $.notify(self.AttachmentError(), "error");
                return;
            }            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }

        //        self.shouldDisableCreate = function () {
        //            var trackerObj = ko.utils.unwrapObservable(self.tracker), hasInvalidComponents = trackerObj ? trackerObj["invalidShown"] : false;
        //            return hasInvalidComponents;
        //        };
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.addBtnVisible(true);
                self.nextBtnVisible(false);
                self.isDisabled2(true);
                self.isDependent1(true);
                self.isDependent2(true);
                self.isDependent3(true);
                self.isDependent4(true);
                self.isOtherReason(true);
            }
            else {
                if (self.employeeMedicalInsuranceModel.dependent_4_details() != null && self.employeeMedicalInsuranceModel.dependent_4_details() != "") {
                    self.isDependent1(false);
                    self.isDependent2(false);
                    self.isDependent3(false);
                    self.isDependent4(false);
                }
                else if (self.employeeMedicalInsuranceModel.dependent_3_details() != null && self.employeeMedicalInsuranceModel.dependent_3_details() != "") {
                    self.isDependent1(false);
                    self.isDependent2(false);
                    self.isDependent3(false);
                    self.isDependent4(true);
                }
                else if (self.employeeMedicalInsuranceModel.dependent_2_details() != null && self.employeeMedicalInsuranceModel.dependent_2_details() != "") {
                    self.isDependent1(false);
                    self.isDependent2(false);
                    self.isDependent3(true);
                    self.isDependent4(true);
                }
                else {
                    self.isDependent1(false);
                    self.isDependent2(true);
                    self.isDependent3(true);
                    self.isDependent4(true);
                }
                if (self.employeeMedicalInsuranceModel.otherReasons() == "OTHERS") {
                    self.isOtherReason(false);
                }
                else {
                    self.isOtherReason(true);
                }
                self.isDisabled(false);
                self.addBtnVisible(false);
                self.nextBtnVisible(true);
                self.isDisabled2(false);
            }

            return self.employeeMedicalInsurance();
        };
        this.cancelAction = function () {
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('summaryEmployeeMedicalInsuranceSpecialist');
            }
            else {
                oj.Router.rootInstance.go('summaryEmployeeMedicalInsurance');
            }
            //added
        }

        function editEmployeeMedicalInsurance() {
            if (self.clickedButton() != event.currentTarget.id) {
                self.clickedButton(event.currentTarget.id);
                self.employeeMedicalInsuranceModel.personNumber(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber());
                self.employeeMedicalInsuranceModel.managerId(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerId : rootViewModel.personDetails().managerId());
                var jsonData = ko.toJSON(self.employeeMedicalInsuranceModel);
                var editEmployeeMedicalInsuranceFn = function (data1) {
                    $.notify(self.notifyCreate(), "success");
                    if (self.specialistSummary() == 'true') {
                        oj.Router.rootInstance.go('summaryEmployeeMedicalInsuranceSpecialist');

                    }
                    else {
                        oj.Router.rootInstance.go('summaryEmployeeMedicalInsurance');
                    }
                    //added
                };
                services.editEmployeeMedicalInsurance(jsonData).then(editEmployeeMedicalInsuranceFn, app.failCbFn);
            }
        }
        this.closeApprovalDialog = function () {
            $("#modalApprovalDialog").ojDialog("close");
        }
        this.openApprovalDialog = function () {
            //approvalDataSourceTB2
            var getApprovalList = function (data) {
                self.approvaldataTB2([]);
                $.each(data.items, function (i, item) {
                    self.approvaldataTB2.push( {
                        name : "MICR", type : item.notification_type, status : item.role_type

                    });

                });
                self.approvalDataSourceTB2(new oj.ArrayTableDataSource(self.approvaldataTB2));
                $("#modalApprovalDialog").ojDialog("open");
            };

            services.getWprkFlowAppovalList('MICR').then(getApprovalList, app.failCbFn);

        }
        this.submitButton = function () {
            self.employeeMedicalInsuranceModel.IS_DRAFT("NO");
            self.employeeMedicalInsuranceModel.status("PENDING_APPROVED");
            document.querySelector("#yesNoDialog").open();
        };
        self.commitRecord = function (data, event) {
            editEmployeeMedicalInsurance();
            return true;
        };
        this.cancelButton = function () {
            self.clickedButton("");
            document.querySelector("#yesNoDialog").close();
        };
        //save draft
        this.submitDraft = function () {
            //            self.advancedAnnualLeaveModel.IS_DRAFT("YES");
            //            self.advancedAnnualLeaveModel.status("DRAFT");
            //            document.querySelector("#yesNoDialog").open();
        };
        self.commitDraft = function (data, event) {
            //            addAdvancedAnnualLeave();
            //            return true;
        }
        this.cancelDraft = function () {
            document.querySelector("#draftDialog").close();
        };
        ///
        /***function to clear table content after submit ***/
        function clearContent() {
            self.employeeMedicalInsuranceModel = {};
            self.dependantNameArr1([]);
            self.dependantNameArr2([]);
            self.dependantNameArr4([]);
            self.dependantNameArr3([]);
            self.dependantNameArr5([]);
        }
        //language support =========================
        self.ok = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
        self.newBusinessTripDriverRequests = ko.observable();
        self.name = ko.observable();
        self.type = ko.observable();
        self.status = ko.observable();
        self.approvalDate = ko.observable();
        self.startdate = ko.observable();
        self.requestDate = ko.observable();
        self.enddate = ko.observable();
        self.approvals = ko.observable();
        self.approvalList = ko.observable();
        self.requestReason = ko.observable();
        self.directTo = ko.observable();
        self.withSalary = ko.observable();
        self.arabicEnglish = ko.observable();
        self.mailType = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.pervious = ko.observable();
        self.next = ko.observable();
        self.cancel = ko.observable();
        self.confirmMessage = ko.observable();
        self.addMessage = ko.observable();
        self.yes = ko.observable();
        self.no = ko.observable();
        self.submit = ko.observable();
        self.employeeMedicalInsurance = ko.observable();
        self.create = ko.observable();
        self.review = ko.observable();
        self.notifyCreate = ko.observable();
        self.position = ko.observable();
        self.stamped = ko.observable();
        self.comment = ko.observable();
        self.saveDraft = ko.observable();
        self.placeholder = ko.observable();
        self.leave = ko.observable();
        self.leaveType = ko.observable();
        self.leaveSD = ko.observable();
        self.leaveED = ko.observable();
        self.comment = ko.observable();
        self.AttachmentError = ko.observable();
        self.attachment = ko.observable();
        self.viewApprovalsLbl = ko.observable();

        self.employeeMedicalInsuranceLabels = ko.observable();
        self.requestType = ko.observable();
        self.reason = ko.observable();
        self.otherReasons = ko.observable();
        self.dependent_1_details = ko.observable();
        self.dependent_2_details = ko.observable();
        self.dependent_3_details = ko.observable();
        self.dependent_4_details = ko.observable();
        self.dependent_5_details = ko.observable();
        self.employeeGrade = ko.observable();
        self.IdIqamaNumber = ko.observable();
        self.employeBirthDate = ko.observable();
        self.remarks = ko.observable();
        self.ServiceName = ko.observable();
        self.notificationType = ko.observable();
        self.employeeRole = ko.observable();
        self.employeeMedicalInsurance = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.leave(getTranslation("annualLeave.leave"));
            self.leaveType(getTranslation("annualLeave.leaveType"));
            self.leaveSD(getTranslation("annualLeave.leaveSD"));
            self.leaveED(getTranslation("annualLeave.leaveED"));
            self.comment(getTranslation("others.comment"));
            self.requestType(getTranslation("employeeMedicalInsurance.requestType"));
            self.reason(getTranslation("employeeMedicalInsurance.reason"));
            self.otherReasons(getTranslation("employeeMedicalInsurance.otherReason"));
            self.dependent_1_details(getTranslation("employeeMedicalInsurance.dependent_1_details"));
            self.dependent_2_details(getTranslation("employeeMedicalInsurance.dependent_2_details"));
            self.dependent_3_details(getTranslation("employeeMedicalInsurance.dependent_3_details"));
            self.dependent_4_details(getTranslation("employeeMedicalInsurance.dependent_4_details"));
            self.dependent_5_details(getTranslation("employeeMedicalInsurance.dependent_5_details"));
            self.employeeGrade(getTranslation("employeeMedicalInsurance.employeeGrade"));
            self.IdIqamaNumber(getTranslation("employeeMedicalInsurance.idIqamaNumber"));
            self.employeBirthDate(getTranslation("employeeMedicalInsurance.employeeBirthDate"));
            self.remarks(getTranslation("employeeMedicalInsurance.remarks"));
            self.employeeMedicalInsurance(getTranslation("employeeMedicalInsurance.label"));

            self.ok(getTranslation("others.ok"));
            self.startdate(getTranslation("labels.startdate"));
            self.enddate(getTranslation("labels.enddate"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.pervious(getTranslation("others.pervious"));
            self.next(getTranslation("others.next"));
            self.cancel(getTranslation("others.cancel"));
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));
            self.submit(getTranslation("others.submit"));
            self.confirmMessage(getTranslation("labels.confirmMessage"));
            self.create(getTranslation("labels.create"));
            self.review(getTranslation("others.review"));
            self.notificationType(getTranslation("labels.notificationType"));
            self.employeeRole(getTranslation("labels.employeeRole"));
            self.stepArray([
            {
                label : self.create(), id : 'stp1'
            },
            {
                label : self.review(), id : 'stp2'
            }
]);
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
            self.addMessage(getTranslation("identificationLetters.addMessage"));
            self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.arabicName(getTranslation("identificationLetters.arabicName"));
            self.englishName(getTranslation("identificationLetters.englishName"));
            self.profession(getTranslation("identificationLetters.profession"));
            self.requestReason(getTranslation("identificationLetters.requestReason"));
            self.directTo(getTranslation("identificationLetters.directTo"));
            self.withSalary(getTranslation("identificationLetters.withSalary"));
            self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            self.mailType(getTranslation("identificationLetters.mailType"));
            self.employeeMedicalInsurance(getTranslation("employeeMedicalInsurance.label"));
            self.notifyCreate(getTranslation("identificationLetters.notifyCreate"));
            self.position(getTranslation("common.position"));
            self.stamped(getTranslation("identificationLetters.stamped"));
            self.comment(getTranslation("others.comment"));
            self.saveDraft(getTranslation("labels.saveDraft"));
            self.placeholder(getTranslation("labels.placeHolder"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.AttachmentError(getTranslation("newBankRequest.attachmentError"));
            self.attachment(getTranslation("businessTrip.attachment"));
        }
        //added
        self.label = {
            text : self.progressValue(), style :  {
                color : 'white'
            }
        };
        self.thresholdValues = [
        {
            max : 33
        },
        {
            max : 67
        },
        {
        }
];

    }

    return new editEmployeeMedicalInsurance();
});