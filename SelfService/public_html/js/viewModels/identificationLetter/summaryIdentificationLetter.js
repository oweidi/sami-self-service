define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryFamilyVisaRefundViewModel() {
        var self = this;

        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.selectedIdentificationLetters = ko.observable();
        self.selectedIndex = ko.observable();
        self.selectedRowData = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();
        this.specialistSummary = ko.observable("");//added
        this.viewReportDisabled = ko.observable(true);
        self.EmbedPDFLink = ko.observable("");
        self.isDraft = ko.observable(true);  //add for delete draft            
        $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");
        });


        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
        var getIdentificationLettersFn = function (data) {

            if (data.items.length != 0) {
                self.isVisible(true);
                self.isShown(false);
                self.data([]);
               
                    $.each(data.items, function (index, val) {
                        self.data.push( {
                            rowNumberRenderer : (index + 1), id : val.id, 
                            person_number : val.person_number, 
                            request_date : val.request_date, 
                            arabic_name : val.arabic_name, 
                            english_name : val.english_name, 
                            iqama_profession : val.iqama_profession, 
                            reason : val.reason, 
                            with_salary : searchArray(val.with_salary, rootViewModel.globalHRCYesNo()), 
                            arabic_english : searchArray(val.arabic_english, rootViewModel.globalHRIdentification()), 
                            mail_type : searchArray(val.mail_type, rootViewModel.globalMailType()), 
                            with_salary_code : val.with_salary, 
                            arabic_english_code : val.arabic_english, 
                            mail_type_code : val.mail_type, name : val.name, directed_to : val.directed_to, 
                            latestResponseCode : val.latest_response_code, finalApproved : val.final_approved, 
                            stamped : val.stamped, positionName : val.position_name, commment : val.commment, 
                            status : document.documentElement.lang === 'ar' ? val.status_ar : val.status_en,
                            ar_status:val.status_ar,
                            en_status:val.status_en
                        });
                    });
                
                self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
                {
                    idAttribute : 'id'
                })));
            }
            else {
                self.isShown(true);
            }
        };
        this.tableSelectionListener = function (event) {

            var data = event.detail;
            var currentRow = data.currentRow;
            var index = currentRow.rowIndex;
            if (currentRow['rowKey']) {
                self.selectedRowKey(currentRow['rowKey']);
                selectedRow = self.data()[currentRow['rowIndex']];
                self.selectedRowData(selectedRow);
                self.selectedIndex(currentRow['rowIndex']);
                self.viewDisabled(false);
                
                 if (selectedRow.en_status === 'Draft')
                        self.isDraft(false);
                    else 
                        self.isDraft(true);//added
                        
                var latestResponseCode = self.data()[index].latestResponseCode;
                var finalApproved = selectedRow.finalApproved;
                if (!latestResponseCode) {
                    self.editDisabled(false);
                }
                else {
                    self.editDisabled(true);
                }
                if (finalApproved && finalApproved === 'Y') {
                    self.viewReportDisabled(false);
                }
                else {
                    self.viewReportDisabled(true);
                }

            }
        }

        rootViewModel.getNoOfNotifications();

        self.addIdentificationLetters = function () {
            self.mode('AddIdentificationLetters');
            if (self.specialistSummary() == 'true') {
                oj.Router.rootInstance.go('createIdentificationLetterSpecialist');
            }
            else {
                oj.Router.rootInstance.go('createIdentificationLetter');
            }
            //added
        }

        self.editIdentificationLetters = function () {

            if (self.selectedRowKey()) {
                self.mode('EditIdentificationLetters');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedIdentificationLetters(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('editIdentificationLetterSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('editIdentificationLetter');
                }
                //added
            }

        }

        self.viewIdentificationLetters = function () {
            if (self.selectedRowKey()) {
                self.mode('ViewIdentificationLetters');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedIdentificationLetters(self.data()[self.selectedIndex()]);
                if (self.specialistSummary() == 'true') {
                    oj.Router.rootInstance.go('viewIdentificationLetterSpecialist');
                }
                else {
                    oj.Router.rootInstance.go('viewIdentificationLetter');
                }
            }

        }

        this.viewIdentificationLettersApproval = function () {
            var getApprovalList = function (data) {
                self.dataTB2([]);
                $.each(data.items, function (i, item) {
                    self.dataTB2.push( {
                        name : item.role_type == 'EMP' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().DisplayName : rootViewModel.personDetails().displayName()) : item.role_type == 'LINE_MANAGER' ? (self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().ManagerName : rootViewModel.personDetails().managerName()) : item.role_id, type : item.notification_type, status : item.response_code, approvalDate : item.response_date ? item.response_date.substr(0, item.response_date.indexOf('T')) + ' ' + item.response_date.substr(item.response_date.indexOf('T') + 1, item.response_date.indexOf('Z') - 1) : item.response_date
                    });

                });
                self.dataSourceTB2(new oj.ArrayTableDataSource(self.dataTB2));
                $("#modalDialog1").ojDialog("open");
            };

            if (self.selectedRowKey()) {
                services.getApprovalList(self.selectedRowKey(), 'XIL').then(getApprovalList, app.failCbFn);
            }

        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            ko.postbox.publish("SpecialistSummary", "true");//added
            if (self.mode() == 'EditIdentificationLetters') {
                ko.postbox.publish("editIdentificationLettersObj", self.selectedIdentificationLetters());
            }
            else if (self.mode() == 'ViewIdentificationLetters') {
                ko.postbox.publish("viewIdentificationLettersObj", self.selectedIdentificationLetters());
            }
        };

        self.handleActivated = function (info) {

        }

        self.handleAttached = function (info) {
            var searchLocation = window.location.search;
            if (searchLocation.indexOf('Specialist') >  - 1) {
                self.specialistSummary("true");
            }
            else {
                self.specialistSummary("false");
            }
            //added
            services.getIdentificationLetters(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getIdentificationLettersFn, app.failCbFn);
            initTranslations();
        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }
        self.showReport = function () {
        console.log(self.selectedRowData());
            services.getIdentificationLettersReport(self.selectedRowData().with_salary_code, self.selectedRowData().arabic_english_code,self.selectedRowData().person_number,self.selectedRowData().directed_to).then(showPDF, app.failCbFn);

            return true;
        } 
        var showPDF = function (data) {
            var base64pdf = 'data:application/pdf;base64,' + data;
            self.EmbedPDFLink(base64pdf);
            document.querySelector("#pdfViewer").open();

        };
        this.backAction = function () {
            oj.Router.rootInstance.go('specialist');

        }
        //added
        this.deleteDraftSelfService = function() {
                if(self.selectedRowKey()) {
                    rootViewModel.selectedTableRowKey(self.selectedRowKey());
                    rootViewModel.deleteSelfService('XX_IDENTIFICATIONS_LETTERS','XIL',self.selectedRowKey()); 
                }
            }
        //language support =========================
        self.addLabel = ko.observable();
        self.editLabel = ko.observable();
        self.viewLabel = ko.observable();
        self.viewApprovalsLbl = ko.observable();
        self.ok = ko.observable();
        self.arabicName = ko.observable();
        self.englishName = ko.observable();
        self.profession = ko.observable();
        self.rowNumber = ko.observable();
        self.columnArray = ko.observableArray([]);
        self.columnArrayApproval = ko.observableArray([]);
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
        self.viewReport = ko.observable();
        self.identificationLettersRefundRequests = ko.observable();
        self.nodays = ko.observable();
        self.addFirstRecord = ko.observable();
        self.back = ko.observable();
        self.deleteLabel = ko.observable();//added
        var getTranslation = oj.Translations.getTranslatedString;

        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                services.getIdentificationLetters(self.specialistSummary() === 'true' ? rootViewModel.specialistSelectedEmployee().PersonNumber : rootViewModel.personDetails().personNumber()).then(getIdentificationLettersFn, app.failCbFn);
                initTranslations();
            }
        });

        function initTranslations() {
            self.back(getTranslation("others.back"));//added
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.ok(getTranslation("others.ok"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.requestDate(getTranslation("labels.requestDate"));
            self.identificationLettersRefundRequests(getTranslation("labels.identificationLettersRequests"));
            self.approvals(getTranslation("labels.approvals"));
            self.nodays(getTranslation("labels.nodays"));
            self.approvalList(getTranslation("labels.approvalList"));
            self.viewReport(getTranslation("identificationLetters.viewReport"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.arabicName(getTranslation("identificationLetters.arabicName"));
            self.englishName(getTranslation("identificationLetters.englishName"));
            self.profession(getTranslation("identificationLetters.profession"));
            self.requestReason(getTranslation("identificationLetters.requestReason"));
            self.directTo(getTranslation("identificationLetters.directTo"));
            self.withSalary(getTranslation("identificationLetters.withSalary"));
            self.arabicEnglish(getTranslation("identificationLetters.arabicEnglish"));
            self.mailType(getTranslation("identificationLetters.mailType"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.deleteLabel(getTranslation("others.delete"));
            self.columnArray([
            {
                "headerText" : self.rowNumber(), "field" : "rowNumberRenderer"
            },
            {
                "headerText" : self.requestDate(), "field" : "request_date"
            },
            {
                "headerText" : self.status(), "field" : "status"
            },
            {
                "headerText" : self.arabicName(), "field" : "arabic_name"
            },
            {
                "headerText" : self.englishName(), "field" : "english_name"
            },
            {
                "headerText" : self.profession(), "field" : "iqama_profession"
            },
            {
                "headerText" : self.requestReason(), "field" : "reason"
            },
            {
                "headerText" : self.directTo(), "field" : "directed_to"
            },
            {
                "headerText" : self.withSalary(), "field" : "with_salary_code"
            },
            {
                "headerText" : self.arabicEnglish(), "field" : "arabic_english"
            },
            {
                "headerText" : self.mailType(), "field" : "mail_type"
            }
]);
            self.columnArrayApproval([
            {
                "headerText" : self.name(), "field" : "name"
            },
            {
                "headerText" : self.type(), "field" : "type"
            },
            {
                "headerText" : self.status(), "field" : "status"
            },
            {
                "headerText" : self.approvalDate(), "field" : "approvalDate"
            }
]);
        }

    }
    return summaryFamilyVisaRefundViewModel;
});