define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 
        'ojs/ojarraydataprovider', 'knockout-mapping', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 
        'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojknockout-validation', 'ojs/ojselectcombobox', 
        'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog','ojs/ojcheckboxset','ojs/ojmodel','ojs/ojlabel'], 
function (oj, ko, $, app, commonUtil, services, postbox, km) {

    function searchPayroll() {
        var self = this;
  self.tt=  ko.observable("")
        self.datatable = ko.observableArray([]);
        self.data = ko.observableArray([]);

        self.selfServices = ko.observableArray([
        {
            "value" : 'x', "label" : 'x'
        }
]);
        self.selfServicesLookup = ko.observableArray([]);

        self.yesNo = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);//yesNoLookupDP
        this.allService = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.yesNoLookupDP = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

this.assigmentStatusDP = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

        self.yesNoLookup = ko.observableArray([]);

        self.mode = ko.observable();
        self.dataSource = new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
        {
            idAttribute : 'id'
        }));
        self.columnArray = ko.observableArray([]);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        
        self.startdate = ko.observable();
        self.searchModel = {
            personName : ko.observable(""), 
            personNumber : ko.observable(""), 
            employeeName : ko.observable(""), 
            hireDate : ko.observable(""), 
            position : ko.observable(""), 
            grade : ko.observable(""), 
            location : ko.observable(""), 
            assignmentStatus : ko.observable(""), 
            latestLeaveStartDate : ko.observable(""), 
            latestLeaveEndDate : ko.observable(""), 
            advancedLeave : ko.observable(""), 
            lastApprover : ko.observable(""), 
            Action : ko.observable(""), 
            Purge : ko.observable(""), 
            selfServiceType : ko.observable(""), 
            processedInPayroll : ko.observable(""), 
            effectiveDate : ko.observable("")
        };

//        function getAllSelfServices(data) {
//            self.selfServicesLookup(data);
//            $.each(self.selfServicesLookup().items, function (index, val) {
//                self.selfServices.push( {
//                    value : val.code, label : document.documentElement.lang === 'ar' ? val.value_ar : val.value_en
//
//                });
//            });
//        }

 //       services.getApexLookup('SELF_TYPE').then(getAllSelfServices, self.failCbFn);


//        function getYesNO(data) {
//            self.yesNoLookup(data);
//            $.each(self.yesNoLookup().items, function (index, val) {
//                self.yesNo.push( {
//                    value : val.code, label : document.documentElement.lang === 'ar' ? val.value_ar : val.value_en
//
//                });
//            });
//        }

     //   services.getApexLookup('YES_NO').then(getYesNO, self.failCbFn);

        self.handleActivated = function (info) {

        };

        self.handleAttached = function (info) {
            self.data([]);
           
    //         buildAllSelfService();
            initTranslations();
            $('#tbl1').on('click', '.oj-checkboxset', self.syncCheckboxes);
             self.allService(app.getPaaSLookup("SELF_TYPE"));
             //yesNoLookupDP
             self.yesNoLookupDP(app.getPaaSLookup("YES_NO"));
             self.assigmentStatusDP(app.getPaaSLookup("ASSIGNMENT_STATUS_TYPE"));
             console.log( self.assigmentStatusDP());
        };
        self.handleDetached = function (info) {
                        clearContent();
        };

        this.reset = function () {
            clearContent();
            self.data([]);
        }

        function clearContent() {
            self.searchModel.personNumber("");
            self.searchModel.effectiveDate("");
            self.searchModel.processedInPayroll("");
            self.searchModel.selfServiceType("");
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

        var getElementDetailsCbFn = function (data) {
            self.datatable(data);
            self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    Selected : ko.observable([]), 
                    id : val.id, 
                    ucm_id : val.ucm_id, 
                    ss_type : document.documentElement.lang === 'ar' ? val.ss_ar : val.ss_en, 
                    ss_type_en : val.ss_en, 
                    ss_type_ar : val.ss_ar, 
                    ast_type : document.documentElement.lang === 'ar' ? val.ast_ar : val.ast_en, 
                    ast_en : val.ast_en, 
                    ast_ar : val.ast_ar,
                    ss_id : val.ss_id, 
                    process_id : val.process_id, 
                    person_number : val.person_number, 
                    full_name : val.full_name, 
                    hire_date : val.hire_date, 
                    position_name : val.position_name, 
                    grade_name : val.grade_name, 
                    status : val.status, 
                    sstype : val.ss_type,
                    start_date : val.start_date,
                    end_date : val.end_date,
                    advanced_leave : val.advanced_leave

                });
            });

        };
        this.searchElement = function () {
            //  if (self.searchModel.name() || self.searchModel.nationalId() || self.searchModel.personNumber() || self.searchModel.effectiveDate()) {
            services.getHDLFiles(null, self.searchModel.selfServiceType(), self.searchModel.personNumber(), self.searchModel.effectiveDate(), self.searchModel.processedInPayroll(),self.searchModel.assignmentStatus()).then(getElementDetailsCbFn, app.failCbFn);
            //}
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
        self.selfServicePlaceHolder = ko.observable();
        self.yesPlaceHolder = ko.observable();
        self.processedInPayroll = ko.observable();
        self.review = ko.observable();
        self.process = ko.observable();
        self.grade = ko.observable();
        self.position = ko.observable();
        self.hireDate = ko.observable();
        self.employeeName = ko.observable();
        self.assigmentStatus = ko.observable();
        self.latestLeaveStartDate = ko.observable();
        self.latestLeaveEndDate = ko.observable();
        self.advancedLeave = ko.observable();
        self.effectiveDate = ko.observable();
        self.processNotify = ko.observable();
        self.selectionNotify = ko.observable();
        self.oneRowNotify = ko.observable();
        
        self.language = ko.observable(document.documentElement.lang);
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {

                

                initTranslations();
            }
        });

        function initTranslations() {
      //   buildAllSelfService();
      self.allService(app.getPaaSLookup("SELF_TYPE"));
      self.yesNoLookupDP(app.getPaaSLookup("YES_NO"));
      self.assigmentStatusDP(app.getPaaSLookup("ASSIGNMENT_STATUS_TYPE"));
            self.selfServicePlaceHolder(getTranslation("payroll.selfServicePlaceHolder"));
            self.yesPlaceHolder(getTranslation("payroll.yesPlaceHolder"));
            self.clear(getTranslation("others.clear"));
            self.search(getTranslation("others.search"));
            self.personnumber(getTranslation("common.personNumber"));
            self.name(getTranslation("common.selfService"));
            self.nationalId(getTranslation("personSearch.nationalId"));
            self.effictiveDate(getTranslation("personSearch.effictiveDate"));
            self.search(getTranslation("others.search"));
            self.goTo(getTranslation("personSearch.goTo"));
            self.location(getTranslation("labels.location"));
            self.department(getTranslation("common.department"));
            self.processedInPayroll(getTranslation("payroll.processedInPayroll"));
            self.review(getTranslation("others.review"));
            self.process(getTranslation("payroll.processing"));
            self.grade(getTranslation("common.grade"));
            self.position(getTranslation("common.position"));
            self.hireDate(getTranslation("labels.hireDate"));
            self.employeeName(getTranslation("common.name"));
            self.assigmentStatus(getTranslation("payroll.assigmentStatus"));
            self.latestLeaveStartDate(getTranslation("payroll.latestLeaveStartDate"));
            self.latestLeaveEndDate(getTranslation("payroll.latestLeaveEndDate"));
            self.advancedLeave(getTranslation("payroll.advancedLeave"));
            self.effectiveDate(getTranslation("gradeRules.effectiveDate"));
            self.processNotify(getTranslation("payroll.processNotify"));
            self.selectionNotify(getTranslation("payroll.selectionNotify"));
            self.oneRowNotify(getTranslation("payroll.oneRowNotify"));
            
            //             id : val.id, 
            self.columnArray([
                        {
                            "renderer" : oj.KnockoutTemplateUtils.getRenderer("checkbox_tmpl", true), "headerRenderer" : oj.KnockoutTemplateUtils.getRenderer("checkbox_hdr_tmpl", true), "id" : "column1"
                        },
                        {
                            "headerText" : self.name(), "field" : "ss_type"
                        },
                        {
                            "headerText" : self.personnumber(), "field" : "person_number"
                        },
                        {
                            "headerText" : self.employeeName(), "field" : "full_name"
                        },
                        {
                            "headerText" : self.hireDate(), "field" : "hire_date"
                        },
                        {
                            "headerText" : self.position(), "field" : "position_name"
                        },
                        {
                            "headerText" : self.grade(), "field" : "grade_name"
                        },
                        {
                            "headerText" : self.assigmentStatus(), "field" : "ast_type"
                        },
                        {
                            "headerText" : self.latestLeaveStartDate(), "field" : "start_date"
                        },
                        {
                            "headerText" : self.latestLeaveEndDate(), "field" : "end_date"
                        },
                        {
                            "headerText" : self.advancedLeave(), "field" : "advanced_leave"
                        }
            ]);
        }

        self.selectionListener = function (event) {
            var data = event.detail;
            if (data != null) {
                var selectionObj = data.value;

                var totalSize = self.dataSource.totalSize();
                var i, j;
                for (i = 0;i < totalSize;i++) {
                    self.dataSource.at(i).then(function (row) {
                        var foundInSelection = false;
                        if (selectionObj) {

                            for (j = 0;j < selectionObj.length;j++) {
                                var range = selectionObj[j];
                                var startIndex = range.startIndex;
                                var endIndex = range.endIndex;

                                if (startIndex != null && startIndex.row != null) {
                                    if (row.index >= startIndex.row && row.index <= endIndex.row && row.data.status === 'NO') {
                                        row.data.Selected(['checked']);
                                        foundInSelection = true;
                                    }
                                }
                            }
                        }
                        if (!foundInSelection) {
                            row.data.Selected([]);
                        }
                    });
                }
            }
        };

        self.syncCheckboxes = function (event) {
            event.stopPropagation();
            setTimeout(function () {
                // sync the checkboxes with selection obj
                var selectionObj = [];
                var totalSize = self.dataSource.totalSize();
                var table = document.getElementById('tbl1');
                var i;
                for (i = 0;i < totalSize;i++) {
                    self.dataSource.at(i).then(function (row) {
                        if (row.data.Selected().length > 0 && row.data.Selected()[0] == 'checked') {
                            selectionObj.push( {
                                startIndex :  {
                                    row : row.index
                                },
                                endIndex :  {
                                    row : row.index
                                },
                                data :  {
                                    data : row.data
                                }
                            });
                        }

                        if (row.index == totalSize - 1) {
                            table.selection = selectionObj;
                        }
                    });
                }
            },
0);
        }

        self.selectAllListener = function (event) {
            var data = event.detail;
            if (data != null) {
                var table = document.getElementById('tbl1');
                if (data['value'].length > 0) {
                    var totalSize = self.dataSource.totalSize();
                    table.selection = [
                    {
                        startIndex :  {
                            "row" : 0
                        },endIndex :  {
                            "row" : totalSize - 1
                        }
                    }
];
                }
                else {
                    table.selection = [];
                }
            }
        };

        this.reviewNotification = function () {
            var element = document.getElementById('tbl1');
            var selectionObj = element.selection;
            var len = selectionObj ? selectionObj.length : 0;

            var i = 0;
            var elementIds = [];

            for (i = 0;i < len;i++) {
                var range = selectionObj[i].data.data.id;
                var trsid = selectionObj[i].data.data.ss_id;
                var ssType = selectionObj[i].data.data.sstype;

                elementIds.push( {
                    id : range, trsId : trsid, ssType : ssType
                });

            }

            if (elementIds.length == 1) {
                if (elementIds[0].trsId) {
                    //if(self.selectedRowKey()) {
                    //rootViewModel.recieveType(self.receiverType());
                    rootViewModel.selectedTableRowKeyNotifiation(elementIds[0].trsId);
                    var trsId = elementIds[0].trsId;
                    var rowSsType = elementIds[0].ssType;
                    console.log(trsId + ' ' + rowSsType);
                    if (rowSsType === "BT") {
                        rootViewModel.selectedTableRowKey(trsId);
                        oj.Router.rootInstance.go('viewBusinessTrip');

                    }
                    else if (rowSsType == "AH") {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationAdvHousing');
                        return true;

                    }
                    else if (rowSsType == "BTA") {
                        rootViewModel.reviewNotiType("FYI");
                        oj.Router.rootInstance.go('reviewBankTransferAccNotification');
                        return true;

                    }
                    else if (rowSsType == "FVR") {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNewFamilyVisaRefund');
                        return true;

                    }
                    else if (rowSsType == "BTD") {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationBusinessTripDriver');

                    }
                    else if (rowSsType == 'XIL') {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewIdentificationLetter');
                        return true;

                    }
                    else if (rowSsType == "RRS") {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationRewardRequst');

                    }
                    else if (rowSsType == "CEE") {
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewChildrenEductionExpense');

                    }
                    else if (rowSsType == 'EA') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationEmployeeAllowance');
                        return true;

                    }
                    else if (rowSsType == 'BTR') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewBusinessTripReturns');
                        return true;
                    }
                    else if (rowSsType == 'STA') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewStopAllowanceRequest');
                        return true;
                    }
                     else if (rowSsType == 'CHT') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewChangeHousingType');
                        return true;
                    }
                 else if (rowSsType == 'TR') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationTicketRequest');
                        return true;
                    }
                else if (rowSsType == 'TRF') {
                        //added
                        rootViewModel.reviewNotiType("FYI");

                        oj.Router.rootInstance.go('reviewNotificationTicketRequestRefund');
                        return true;
                    }
                      else if (rowSsType == 'AAL') {
                        //added
                        console.log("here");
                             rootViewModel.selectedTableRowKey(trsId);
//                        rootViewModel.reviewNotiType("FYI");

        
                        oj.Router.rootInstance.go('reviewAdvancedAnnualLeave');
                        return true;
                    }

                }
                   

            }
            else {
                showNotify('warning', self.oneRowNotify());
            }

        };
        
        this.openDialog = function () {
            var element = document.getElementById('tbl1');
            var selectionObj = element.selection;
            var len = selectionObj ? selectionObj.length : 0;
            
            var i = 0;
            var elementIds = [];

            for (i = 0;i < len;i++) {
                var range = selectionObj[i].data.data.id;

                elementIds.push( {
                    id : range
                });

            }

            if (elementIds.length > 0) {
                elementIds.push( {
                    startDate : self.startdate()
                });
             }
            console.log(elementIds);
            if (elementIds.length > 0) {
                $("#modalDialog1").ojDialog("open");
            }
            else {
                showNotify('warning', self.selectionNotify());
            }
           

        }

        this.closeDialog = function () {
            var element = document.getElementById('tbl1');
            var selectionObj = element.selection;
            var len = selectionObj ? selectionObj.length : 0;
            
            var i = 0;
            var elementIds = [];

            for (i = 0;i < len;i++) {
                var range = selectionObj[i].data.data.id;
                var sstype = selectionObj[i].data.data.sstype;
                elementIds.push( {
                    id : range,
                    sstype : sstype
                });

            }
            
            if (elementIds.length > 0) {
                elementIds.push( {
                    startDate : self.startdate()
                });
             }

            if (elementIds.length > 0) {
                var submitElement = function (data1) {
                   
                };
                services.processElementEntry(JSON.stringify(elementIds)).then(submitElement, app.failCbFn);
                $("#modalDialog1").ojDialog("close");
                showNotify('success', self.processNotify());
            }
            else {
                showNotify('warning', self.selectionNotify());
            }
            
        }

    }

    return new searchPayroll();

});