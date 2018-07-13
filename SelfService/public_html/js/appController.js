/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'util/commonhelper', 'config/services', 'knockout-mapping', 'notifyjs', 'ojs/ojrouter', 'ojs/ojknockout-validation', 'ojs/ojbutton', 'ojs/ojanimation', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojchart', 'ojs/ojknockout', 'ojs/ojoffcanvas'], function (oj, ko, commonhelper, services, km) {

    function ControllerViewModel() {
        var self = this;
        var getTranslation = oj.Translations.getTranslatedString;

        self.tracker = ko.observable();
        self.userName = ko.observable();
        self.userNameLabel = ko.observable();
        self.password = ko.observable();
        self.passwordLabel = ko.observable();
        self.loginLabel = ko.observable();
        self.resetLabel = ko.observable();
        self.loginFailureText = ko.observable();
        self.isUserLoggedIn = ko.observable();
        self.hasErrorOccured = ko.observable(false);
        self.PaaSLookup = ko.observableArray();
        self.elementNameARR = ko.observableArray();
        self.name_lng = ko.observable();
        self.job_lng = ko.observable();
        self.managerName_lng = ko.observable("");
        self.position_lng = ko.observable();
        self.personNumber_lng = ko.observable();
        self.department_lng = ko.observable();
        self.grade_lng = ko.observable();
        self.preferences_lng = ko.observable();
        self.help_lng = ko.observable();
        self.about_lng = ko.observable();
        self.signOut_lng = ko.observable();
        self.languageSwitch_lng = ko.observable();
        self.refreshViewForLanguage = ko.observable(false);

        self.refreshViewContent = ko.observable(false);
        self.userLogin = ko.observable("");
        self.grade = ko.observable('');
        self.stopAllowanceSelectedEmployee = ko.observable('');
        self.penaltiesSelectedEmployee = ko.observable('');

        self.managerId = ko.observable('');
        self.managerName = ko.observable('');
        self.personId = ko.observable('');
        self.personGrade = ko.observable('');

        self.displayName = ko.observable('');
        self.jobName = ko.observable('');
        self.position = ko.observable('');
        self.department = ko.observable('');
        self.personDetails = ko.observable('');

        self.selectedTableRowKey = ko.observable('');
        self.selectedTableRowKeyNotifiation = ko.observable('');
        self.jwt = ko.observable('');
        self.username = ko.observable('');
        self.hostUrl = ko.observable('');
        self.userPriviledge = ko.observable('');
        self.aor = ko.observable('');
        self.reviewNotiType = ko.observable('');
        self.recieveType = ko.observable('');
        self.aorExecute = ko.observable(false);
        self.specialistSelectedEmployee = ko.observable('');
        self.specialistSelectedEmployeeName = ko.observable('');

                    self.globalTypes = ko.observableArray([{
                        "value": '',
                        "label": ''
                    }]);
        //            self.globalTypesExecute = ko.observable(false);
        //
        //            self.globalCountry = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalCountryExecute = ko.observable(false);
        //
                    self.globalYesNo = ko.observableArray([{
                        "value": '',
                        "label": ''
                    }]);
        //            self.globalYesNoExecute = ko.observable(false);
        //
        //
        //
        //            self.globalSABanks = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //             self.globalHRHeadGRstatus = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);//NADEC_TICKET_RAUTES_NEW_US
        //            self.globalNadecTicketRautes = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalNadecTicketRefund = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);//NADEC_TRIP_DIRECTION_1
        //            self.globalNadecTripDirection1 = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
                    self.globalUDTLookup = ko.observableArray([{
                        "tableName": '',
                        "colName": '',
                        "rowName": '',
                        "value": ''
                    }]);
        
                    self.globalFuseModel = ko.observableArray([{
                        "dataType": '',
                        "tableName": '',
                        "colName": '',
                        "rowName": '',
                        "udtValue": '',
                        "lookupCode": '',
                        "lookupValue": '',
                        "lookupType": '',
                        "territoryCode": '',
                        "territoryValue": ''
                    }]);
        //            self.globalPayPeriod= ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        self.globalHRCYesNo = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);

                    self.globalHRIdentification= ko.observableArray([{
                        "value": '',
                        "label": ''
                    }]);
        
                    self.globalMailType = ko.observableArray([{
                        "value": '',
                        "label": ''
                    }]);
        //            self.globalGrievanceType = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalGrievanceStatus = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalGrievStatusDirectManager = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalGrievStatusHeadHR = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalEmployeeAllowance = ko.observableArray([{   //added
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalCarInsideLov = ko.observableArray([{   //added
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalReceiveLocationLov = ko.observableArray([{   //added
        //                "value": '',
        //                "label": ''
        //            }]);
        //             self.globalNewHousingTypeLov = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);//// New Housing Type
        //            self.passReturnArr = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalNadecMedicalInsuranceType = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalNadecMedicalInsuranceReason = ko.observableArray([{
        //                "value" : '',
        //                "label" : ''
        //            }]);
        //            self.globalViolationType = ko.observableArray([{   //added
        //                "value": '',
        //                "label": ''
        //            }]);
        self.globalPersonFuseModel = {
            personNumber : ko.observable(), personId : ko.observable(), fullName : ko.observable(), nationality : ko.observable(), profession : ko.observable(), childGradeNoValue : ko.observable(), childGradeAmtValue : ko.observable(), arabicName : ko.observable(), bankIBAN : ko.observable()
        };
        self.globalUDTLookupExecute = ko.observable(false);

        //NADEC_HOUSING_IN_ADV_MONTHS
        //            self.globalHosuingInAdvMonthsLookup =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalUDTLookupExecute = ko.observable(false);
        //
        //			//NADEC City
        //            self.globalCityLookup =ko.observableArray([{
        //                "value": '',
        //                "label": '',
        //                "tag": ''
        //            }]);
        //
        //            //NADEC_BTRIPDRIVER_TPYE
        //            self.globalBTripDriverType =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            //NADEC_BTRIPDRIVER_AREA
        //            self.globalBTripDriverArea =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalEduYears = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //         self.globalEduSemester = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            //children expense
        //            self.globalEduChildNoMax = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalEduAmtMax = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //             //NADEC_BTRIPDRIVER_TPYE
        //            self.globalticketsRoutes =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //            self.globalNadecBTRoute =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalSaaSTicketClass = ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //            self.globalHrTicketsReasons =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        //
        //        self.globalHrCardsType =ko.observableArray([{
        //                "value": '',
        //                "label": ''
        //            }]);
        self.noOfNotification = ko.observable('');
        // Media queries for repsonsive layouts
        self.display = ko.observable('');

        self._showComponentValidationErrors = function (trackerObj) {
            if (trackerObj !== undefined) {
                trackerObj.showMessages();
                if (trackerObj.focusOnFirstInvalid())
                    return false;
            }
            return true;
        };

        self.getNoOfNotifications = function getNoOfNotifications() {

            function getNoOfNotification(data) {
                self.noOfNotification(data.num);
            }
            // alert(self.aor());
            services.getNoOfNotification( {
                'POSITION' : self.personDetails().assignmentName(), 'MANAGER_ID' : self.personDetails().personId(), 'AOR' : self.aor(), 'EMP' : self.personDetails().personId()
            }).then(getNoOfNotification, self.failCbFn);
        }
        self.refresh = function () {
            if (!self.personDetails()) {
                showEmplDetails(ko, services, self, km);

                // alert('IN');
                if (self.personDetails()) {
                    //   alert('IN1');
                    self.isUserLoggedIn(true);
                    self.userLogin(self.personDetails().displayName());
                    addFuseModelToIndexedDB(services, this, this, commonhelper);
                    addGlobalPersonFuseModel(services, this, this, commonhelper);
                    self.getNoOfNotifications();
                    getPaaSLookup(services, this, this);
                    getElementName(services, this, this);
                }
                else {
                    // alert('IN2');
                    self.isUserLoggedIn(false);
                }

            }
            else {
                self.isUserLoggedIn(true);
            }

            initTranslations();
        };
        self.refresh();
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        if (self.smScreen()) {
            self.display('icons');
        }
        else {
            self.display('all');
        }
        var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
        self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

        self.screenRange = oj.ResponsiveKnockoutUtils.createScreenRangeObservable();
        self.windowSize = ko.observable();
        self.displaySreenRange = ko.computed(function () {
            var range = self.screenRange();
            if (range === oj.ResponsiveUtils.SCREEN_RANGE.SM) {
                self.windowSize('SM');
            }
            else if (range === oj.ResponsiveUtils.SCREEN_RANGE.MD) {
                self.windowSize('MD');
            }
            else if (range === oj.ResponsiveUtils.SCREEN_RANGE.LG) {
                self.windowSize('LG');
            }
            else if (range === oj.ResponsiveUtils.SCREEN_RANGE.XL) {
                self.windowSize('XL');
            }
        });
        self.isScreenSMorMD = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_DOWN));

        self.router = oj.Router.rootInstance;
        self.router.dispose();
        self.router.configure(buildRouter(oj));

        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

        self.navTopArray = ko.observableArray();
        self.navDataSourceTop = ko.observable();
        self.navLeftArray = ko.observableArray();
        self.navDataSourceLeft = ko.observable();
        self.subModule = ko.computed(function () {
            if (self.router.currentState()) {
                constructNavLeftData();
            }
        });

        self.refreshData = ko.computed(function () {
            if (self.refreshViewForLanguage()) {
                constructNavTopData();
                constructNavLeftData();
                initFooterLinks();
            }
        });

        self.footerLinks = ko.observableArray();

        function constructNavTopData() {
            // Navigation top setup
            var navDataTop = buildTopNavigationPage(oj);

            self.navTopArray(navDataTop);
            self.navDataSourceTop(new oj.ArrayTableDataSource(self.navTopArray, 
            {
                idAttribute : 'id'
            }));
        }
        constructNavTopData();

        function constructNavLeftData() {
            // Navigation left setup
            var id = self.router.currentState().id;
            var lastScreen = self.router._navHistory[self.router._navHistory.length - 1];
            var navDataLeft = [];
            var homePages = ["home", "summaryIdentificationLetter", "createIdentificationLetter", "editIdentificationLetter", "viewIdentificationLetter", "reviewIdentificationLetter",
                            "summaryChildrenEductionExpense","createChildrenEductionExpense","editChildrenEductionExpense","viewChildrenEductionExpense","reviewNotificationChildrenEductionExpense"];
            var notificationPages = ["notifications", "review"];
            var adminPages = ["elementEntrySummary", "createElement", "editElement", "viewElement", "elementEntryValueSummary", "createElementValue", "editElementValue", "viewElementValue"];
            var payrollPages = ["payroll"];

            if (homePages.indexOf(id) >  - 1) {
                self.navLeftArray([]);
                navDataLeft = buildHomeNavigationPage(oj, this);
                
                //added

                     self.navLeftArray(navDataLeft);
                self.navDataSourceLeft(new oj.ArrayTableDataSource(self.navLeftArray, 
                {
                    idAttribute : 'id'
                }));
            }
            else if (notificationPages.indexOf(id) >  - 1) {
                self.navLeftArray([]);
                navDataLeft = buildNotificationNavigationPage(oj);
                self.navLeftArray(navDataLeft);
                self.navDataSourceLeft(new oj.ArrayTableDataSource(self.navLeftArray, 
                {
                    idAttribute : 'id'
                }));
            }
            else if ((lastScreen !== "elementEntrySummary") && (id === "elementEntrySummary")) {
                self.navLeftArray([]);

                var navDataLeftElement = buildSetupNavigationPage(oj);

                navDataLeftElement.push( {
                    name : 'Element Entery', id : 'elementEntrySummary', iconClass : 'oj-navigationlist-item-icon fa fa-pencil'
                },
                {
                    name : 'Element Entery Value', id : 'elementEntryValueSummary', iconClass : 'oj-navigationlist-item-icon fa fa-pencil-square-o'
                });

                self.navLeftArray(navDataLeftElement);
                self.navDataSourceLeft(new oj.ArrayTableDataSource(self.navLeftArray, 
                {
                    idAttribute : 'id'
                }));
            }
            else if ((lastScreen !== "specialist") && (id === "specialist")) {
                //added
                self.navLeftArray([]);

                var navDataLeftSpecialist = buildSpecialistNavigationPage(oj);
                self.navLeftArray(navDataLeftSpecialist);
                self.navDataSourceLeft(new oj.ArrayTableDataSource(self.navLeftArray, 
                {
                    idAttribute : 'id'
                }));
            }
            else if (payrollPages.indexOf(id) >  - 1) {
                //added
                self.navLeftArray([]);
                var navDataLeftpayroll = buildPayrollNavigationPage(oj);
                self.navLeftArray(navDataLeftpayroll);
                self.navDataSourceLeft(new oj.ArrayTableDataSource(self.navLeftArray, 
                {
                    idAttribute : 'id'
                }));
            }

        }

        // Drawer
        // Close offcanvas on medium and larger screens
        self.mdScreen.subscribe(function () {
            oj.OffcanvasUtils.close(self.drawerParams);
        });

        // Keep track of whether the front or back is showing
        self.showingFront = true;

        self.buttonClick = function () {
            var elem = document.getElementById('animatableCard');

            // Determine startAngle and endAngle
            var startAngle = self.showingFront ? '0deg' : '180deg';
            var endAngle = self.showingFront ? '180deg' : '0deg';

            // Animate the element
            oj.AnimationUtils['flipOut'](elem, 
            {
                'flipTarget' : 'children', 'persist' : 'all', 'startAngle' : startAngle, 'endAngle' : endAngle
            });
            self.showingFront = !self.showingFront;
        };

        self.drawerParams = {
            displayMode : 'push', selector : '#navDrawer', content : '#pageContent'
        };
        self.rightDrawerParams = {
            displayMode : 'push', selector : '#navRightDrawer', content : '#pageContent'
        };
        // Called by navigation drawer toggle button and after selection of nav drawer item
        self.toggleDrawer = function () {
            return oj.OffcanvasUtils.toggle(self.drawerParams);
        }
        // Called by navigation drawer toggle button and after selection of nav drawer item
        self.toggleRightDrawer = function () {
            return oj.OffcanvasUtils.toggle(self.rightDrawerParams);
        }
        // Add a close listener so we can move focus back to the toggle button when the drawer closes
        $("#navDrawer").on("ojclose", function () {
            $('#drawerToggleButton').focus();
        });

        self.updateNotificaiton = function updateNotificaiton(notiId) {

            function updateNotificaitonCallback(data) {
                self.getNoOfNotifications();
                return true;
            }
            services.updateNotification(notiId).then(updateNotificaitonCallback, self.failCbFn);
        };

        self.sendNotification = function sendNotification(positionCode, personId, notiType, ssType) {

            function sendNotificaitonCallback(data) {
                parser = new DOMParser();
                xmlDOC = parser.parseFromString(data, "text/xml");
                $xml = $(xmlDOC);
                var documents = $xml.find('DATA_DS');

                documents.children('G_1').each(function () {
                    var emailAddress = $(this).find('EMAIL_ADDRESS').text();

                    function sendEmailCallback(data1) {
                    }
                    if (emailAddress) {
                        services.sendEmail(notiType, ssType, emailAddress).then(sendEmailCallback, self.failCbFn);
                    }

                });

            }
            if (positionCode === 'KSA Travel Agency Specialist') {
                services.getAOREmails(positionCode).then(sendNotificaitonCallback, self.failCbFn);
            }
            else {
                services.getPositionEmails(positionCode, personId).then(sendNotificaitonCallback, self.failCbFn);
            }

        }
        // Header

        self.showPreloader = function () {
            $("#preloader").removeClass("oj-sm-hide");
            $("#globalBody").css("pointer-events", "none");
            $("#globalBody").css("opacity", "0.5");
            $('body').css("overflowY", "hidden");
        };

        self.hidePreloader = function () {
            $("#preloader").addClass("oj-sm-hide");
            $("#globalBody").css("pointer-events", "");
            $("#globalBody").css("opacity", "");
            $('body').css("overflowY", "hidden");
        };
        self.failCbFn = function (xhr) {
            self.hidePreloader();
        };

        self.menuItemSelect = function (event, ui) {
            switch (ui.item.attr("id")) {
                case "about":
                    $("#aboutDialog").ojDialog("open");
                    break;
                case "out":
                    window.location.href = "/SamiSelfService/logout";
                default :
            }
        };

        this.selectedItem = ko.observable("home");
        this.display = ko.observable("all");
        this.edge = ko.observable("top");

        self.setLocale = function (lang) {
            oj.Config.setLocale(lang, function () {
                self.refreshViewForLanguage(false);
                if (lang === 'ar') {
                    $("html").attr("lang", lang);
                    $("html").attr("dir", "rtl");
                }
                else {
                    $("html").attr("lang", lang);
                    $("html").attr("dir", "ltr");
                }
                initTranslations();
                self.refreshViewForLanguage(true);
            });
        };

        self.getLocale = function () {
            return oj.Config.getLocale();
        };

        self.switchLanguage = function () {
            if (self.getLocale() === "ar") {
                self.setLocale("en-US");
                localStorage.setItem("selectedLanguage", "en-US");
            }
            else if (self.getLocale() === "en-US") {
                self.setLocale("ar");
                localStorage.setItem("selectedLanguage", "ar");
            }
        };

        self.onLogin = function () {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            self.loginFailureText("");
            // Validating the components
            if (!self._showComponentValidationErrors(trackerObj)) {
                return;
            }

            var loginSuccessCbFn = function () {
                self.loginFailureText("");
                self.isUserLoggedIn(true);
                self.hidePreloader();
                self.refresh();
                self.router.go('home');

            };

            var loginFailCbFn = function () {
                self.isUserLoggedIn(false);
                self.loginFailureText(getTranslation("login.loginFailureText"));
                self.hidePreloader();
            };

            self.showPreloader();

            function authinticate(data) {
                var result = jQuery.parseJSON(data.replace('\'', '"').replace('\'', '"'));
                var check = result.result;
                if (check) {
                    loginSuccessCbFn();
                }
                else {
                    loginFailCbFn();
                }

            }
            services.authenticate(self.userName(), self.password()).then(authinticate, self.failCbFn);

        };

        self.onReset = function () {
            self.userName("");
            self.password("");
            $("#userName").ojInputText("reset");
            $("#password").ojInputPassword("reset");
            self.loginFailureText("");
        };

        // Footer
        function footerLink(name, id, linkTarget) {
            this.name = name;
            this.linkId = id;
            this.linkTarget = linkTarget;
        }

        function initFooterLinks() {
            self.footerLinks([new footerLink(getTranslation("others.aboutNadec"), 'aboutConduent', 'https://www.sami.com.sa/en/about-us'), new footerLink(getTranslation("others.contactUs"), 'contactUs', 'https://www.sami.com.sa/en/contact'), new footerLink(getTranslation("others.media"), 'legalNotices', 'https://www.sami.com.sa/en/news')// new footerLink(getTranslation("others.serviceOfferings"), 'yourPrivacyRights', 'http://appspro-me.com/appspro-services/')
]);
        };

        function initTranslations() {
            self.userNameLabel(getTranslation("login.userName"));
            self.passwordLabel(getTranslation("login.password"));
            self.loginLabel(getTranslation("login.loginLabel"));
            self.resetLabel(getTranslation("login.resetLabel"));
            if (self.loginFailureText() !== undefined && self.loginFailureText() !== "") {
                self.loginFailureText(getTranslation("login.loginFailureText"));
            }
            //                if (self.isUserLoggedIn() !== undefined) {
            //                    $("#userName").ojInputText("refresh");
            //                    $("#password").ojInputPassword("refresh");
            //                }
            self.name_lng(getTranslation("common.name"));
            self.job_lng(getTranslation("common.job"));
            self.managerName_lng(getTranslation("common.managerName"));
            self.position_lng(getTranslation("common.position"));
            self.personNumber_lng(getTranslation("common.personNumber"));
            self.department_lng(getTranslation("common.department"));
            self.grade_lng(getTranslation("common.grade"));
            self.preferences_lng(getTranslation("others.preferences"));
            self.help_lng(getTranslation("others.help"));
            self.about_lng(getTranslation("others.about"));
            self.signOut_lng(getTranslation("others.signOut"));
            self.languageSwitch_lng(getTranslation("common.switchLang"));
        }
        //             self.PaaSLookup ={
        //                ID: ko.observable(),
        //                name: ko.observable(),
        //                code: ko.observable(),
        //                valuAr: ko.observable(),
        //                valuEn: ko.observable()
        //
        //                }
        self.getPaaSLookup = function (lookupName) {
            var temparry = [];
            self.passReturnArr([]);
            for (var i = 0;i < self.PaaSLookup().length;i++) {
                if (self.PaaSLookup()[i].name == lookupName) {
                    if (document.documentElement.lang == "ar") {
                        temparry.push( {
                            value : self.PaaSLookup()[i].code, label : self.PaaSLookup()[i].valuAr
                        });
                    }
                    else {
                        temparry.push( {
                            value : self.PaaSLookup()[i].code, label : self.PaaSLookup()[i].valuEn
                        });
                    }
                }

            }

            return temparry;

        }
        self.getSaaSLookup = function (lookupArray) {
            var temparry = [];
            for (var i = 0;i < lookupArray.length;i++) {
                if (document.documentElement.lang == "ar") {
                    temparry.push( {
                        value : lookupArray[i].value, label : lookupArray[i].labelAr
                    });
                }
                else {
                    temparry.push( {
                        value : lookupArray[i].value, label : lookupArray[i].label
                    });
                }

            }

            return temparry;

        }

        if (typeof (Storage) !== "undefined") {
            var selectedLanguage = localStorage.getItem("selectedLanguage");
            if (selectedLanguage !== null && (selectedLanguage === "en-US" || selectedLanguage === "ar")) {
                self.setLocale(selectedLanguage);
            }
        }

        self.isLastApprover = function (transationId, ss_type) {
            var roleType, roleId;
            var isLast;
            var getLastApprove = function (data) {
                roleType = data.items[0].role_type;
                roleId = data.items[0].role_id;
                if (roleType == "POSITION" && roleId == self.personDetails().positionName()) {
                    isLast = true;
                }
                else if ((roleType == "LINE_MANAGER" || roleType == "LINE_MANAGER+1") && roleId == self.personDetails().personId()) {
                    isLast = true;
                }
                else {
                    isLast = false;
                }
            };

            services.getLastStepApproval(transationId, ss_type).then(getLastApprove, self.failCbFn);
            return isLast;
        }

        self.deleteSelfService = function (table_name, ss_type, trsId) {

            var header = {
                tableName : table_name, type : ss_type, id : trsId
            };
            var getDeleteSelfService = function (data) {

                if (data.v_status === 'ERROR') {
                    showNotify('error', 'Exception happened');
                }
                else {
                    showNotify('success', 'Deleted successfully');
                }

            };
            services.deleteSelfService(header).then(getDeleteSelfService, self.failCbFn);
        }
        self.getElementName = function (SSType) {
            var tempName = "";

            for (var i = 0;i < self.elementNameARR().length;i++) {
                console.log(self.elementNameARR()[i].name);
                if (self.elementNameARR()[i].ss_type == SSType) {
                    tempName = self.elementNameARR()[i].name
                    break;
                }

            }

            return tempName;

        }

        initFooterLinks();
    }

    return new ControllerViewModel();
});