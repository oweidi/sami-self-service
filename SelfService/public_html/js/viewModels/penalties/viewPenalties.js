define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'config/services', 'knockout-postbox', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, app, services, postbox) {

    function ViewPenaltiesModel() {
        var self = this;
        self.isVisible = ko.observable(false);
        this.notiId = ko.observable();
        ko.postbox.subscribe("notiId", function (newValue) {

            if (newValue && newValue > 0) {
                self.notiId(newValue);
            }

        }); 
        
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var searchUDTArray = rootViewModel.globalUDTLookup();  
        self.suggestedActionList = ko.observableArray();
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
        self.penalitesModel = {
            id : ko.observable(""), penaltieslabel : ko.observable(""), offenceDate : ko.observable(""), invistigationDate : ko.observable(""), violationType : ko.observable(), absenceDateFrom : ko.observable(""), absenceDateTo : ko.observable(""), occurance : ko.observable(""), suggestedAction : ko.observable(""), deductionHours : ko.observable(""), deductionDays : ko.observable(""), deductionBasicSalaryPercentage : ko.observable(""), imageBase64 : ko.observable(""), requestDate : ko.observable(""), managerId : ko.observable(""), status : ko.observable(""), name : ko.observable(""), createdBy : ko.observable(""), personNumber : ko.observable(""), personId : ko.observable("")
        };
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.handleActivated = function (info) {

        }

        var getPenaltiesCbFn = function (data) {
            $.each(data.items, function (index, newValue) {
                
                self.suggestedActionList([]);
                for (var i = 0;i < searchUDTArray.length;i++) {
                    if (searchUDTArray[i].tableName === 'XXX_HR_ADMINISTRATIVE_INVESTIGATIONS') {
                        self.suggestedActionList.push( {
                            "value" : searchUDTArray[i].rowName.toString().substring(0, searchUDTArray[i].rowName.toString().indexOf('(')),
                            "label" : searchUDTArray[i].rowName.toString().match(/\(([^)]+)\)/)[1],
                            "actionValue" : searchUDTArray[i].value
                        });
                    }
                }
                console.log(self.suggestedActionList());
                self.penalitesModel.id(newValue.id);
                self.penalitesModel.requestDate(newValue.request_date);
                self.penalitesModel.personNumber(newValue.person_number);
                self.penalitesModel.name(newValue.name);
                self.penaltieslabel(newValue.penaltieslabel);
                self.penalitesModel.offenceDate(newValue.offence_date);
                self.penalitesModel.invistigationDate(newValue.investigation_date);
                self.penalitesModel.violationType(searchArray(newValue.violation_type, rootViewModel.globalViolationType()));
                self.penalitesModel.absenceDateFrom(newValue.absence_date_from);
                self.penalitesModel.absenceDateTo(newValue.absence_date_to);
                self.penalitesModel.occurance(newValue.occurrence);
                self.penalitesModel.suggestedAction(newValue.violation_type);
                self.penalitesModel.deductionHours(newValue.deduction_hours);
                self.penalitesModel.deductionDays(newValue.deduction_days);
                self.penalitesModel.deductionBasicSalaryPercentage(newValue.deduction_basic_salary_percent);
                //                self.imageBase64(newValue.imageBase64);
            });

        };

        self.handleAttached = function (info) {
            console.log();
            services.getPenaltiesById(rootViewModel.selectedTableRowKeyNotifiation()).then(getPenaltiesCbFn, app.failCbFn);
            initTranslations();
        }

        self.backAction = function () {
            var prevoisPage = oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1];
            if (prevoisPage == 'notifications' && rootViewModel.reviewNotiType() == 'FYI') {
                rootViewModel.updateNotificaiton(self.notiId());
                oj.Router.rootInstance.go('notifications');
            }
            if (oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length - 1]);
            }
            else {
                oj.Router.rootInstance.go('home');
            }

        }
        //trasnlation added
        self.penaltieslabel = ko.observable();
        self.offenceDate = ko.observable();
        self.invistigationDate = ko.observable();
        self.violationType = ko.observable();
        self.absenceDateFrom = ko.observable();
        self.absenceDateTo = ko.observable();
        self.occurance = ko.observable();
        self.suggestedAction = ko.observable();
        self.deductionHours = ko.observable();
        self.deductionDays = ko.observable();
        self.deductionBasicSalaryPercentage = ko.observable();
        self.back = ko.observable();
        self.requestDate = ko.observable();
        self.reason = ko.observable();
        self.stoppingDate = ko.observable();
        var getTranslation = oj.Translations.getTranslatedString;
        self.refreshView = ko.computed(function () {
            if (app.refreshViewForLanguage()) {
                initTranslations();
            }
        });

        function initTranslations() {
            self.penaltieslabel(getTranslation("penalties.penaltieslabel"));
            self.offenceDate(getTranslation("penalties.offenceDate"));
            self.invistigationDate(getTranslation("penalties.invistigationDate"));
            self.violationType(getTranslation("penalties.violationType"));
            self.absenceDateFrom(getTranslation("penalties.absenceDateFrom"));
            self.absenceDateTo(getTranslation("penalties.absenceDateTo"));
            self.occurance(getTranslation("penalties.occurrance"));
            self.suggestedAction(getTranslation("penalties.suggestedAction"));
            self.deductionHours(getTranslation("penalties.deductionHours"));
            self.deductionDays(getTranslation("penalties.deductionDays"));
            self.deductionBasicSalaryPercentage(getTranslation("penalties.deductionBasicSalaryPercentage"));
            self.back(getTranslation("others.back"));
            self.requestDate(getTranslation("labels.requestDate"));
        }
    }

    return ViewPenaltiesModel;
});