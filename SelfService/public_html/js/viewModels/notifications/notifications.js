define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services','knockout-postbox', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojknockout', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojbutton', 'ojs/ojpagingcontrol', 'ojs/ojtable', 'ojs/ojarraytabledatasource'], function (oj, ko, $, app, commonUtil, services,postbox) {

    function NotificationsViewModel() {

        var self = this;
        this.selectedRowKey = ko.observable();
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.typeSelected = ko.observable('REG');
        this.personIdSelected = ko.observable();
        this.notificationType = ko.observable();
        self.notificationStatus = ko.observable();
        this.selfServiceType= ko.observable();
        this.reviewDisabled = ko.observable(true);
        this.notiId =  ko.observable();
        this.receiverType = ko.observable();
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var personId = '300000002295335';

        var jwt = rootViewModel.jwt();
        var username = rootViewModel.username();

        this.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data,
        {
            idAttribute : 'id'
        })));
        console.log("personId = "+rootViewModel.personDetails().personId());
        console.log("managerId = "+rootViewModel.personDetails().managerId());
        var getNotificationCbFn = function (data) {
            self.data([]);
            $.each(data.items, function (i, item) {
                self.data.push( {
                    rowNumberRenderer : (i + 1),
                    id : item.id,
                    MSG_TITLE : item.msg_title,
                    MSG_BODY : item.msg_body,
                    CREATION_DATE : item.creation_date,
                    TYPE : item.type,
                    TRS_ID : item.request_id,
                    SELF_TYPE : item.self_type,
                    receiver_type : item.receiver_type,
                    person_number : item.person_number,
                    status: item.status
                });

            });
            app.hidePreloader();
        };

        this.tableSelectionListener = function (event) {
            var data = event.detail;

            var currentRow = data.currentRow;
                var index = currentRow['rowIndex'];
                self.selectedRowKey(self.data()[index].TRS_ID)
                self.reviewDisabled(false);
                self.personIdSelected(self.data()[index].personId);
                self.notificationType(self.data()[index].TYPE);
                self.selfServiceType(self.data()[index].SELF_TYPE);
                rootViewModel.reviewNotiType(self.data()[index].SELF_TYPE);
                self.notiId(self.data()[index].id);
                self.receiverType(self.data()[index].receiver_type);
                self.notificationStatus(self.data()[index].status);

        }

        this.reviewNotification = function () {
            if(self.selectedRowKey()) {
                rootViewModel.recieveType(self.receiverType());
                rootViewModel.selectedTableRowKeyNotifiation(self.selectedRowKey());

                if(self.selfServiceType()=="BT"){
                     if (rootViewModel.personDetails().personId() == self.personIdSelected()) {
                    return false;
                    } else if (self.notificationType() == 'FYI') {

                            rootViewModel.selectedTableRowKey(self.selectedRowKey());
                            oj.Router.rootInstance.go('viewBusinessTrip');

                    } else {
                        oj.Router.rootInstance.go('reviewNotificationBusinessTrip');
                        return true;
                    }
                }else if (self.selfServiceType()=="AH") {

                    if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());
                             ;

                    }
                        oj.Router.rootInstance.go('reviewNotificationAdvHousing');
                        return true;

                }else if (self.selfServiceType()=="BTA"){

                 if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());


                    }
                         oj.Router.rootInstance.go('reviewBankTransferAccNotification');
                         return true;



                }else if (self.selfServiceType()=="FVR"){
                 if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());


                    }
                        oj.Router.rootInstance.go('reviewNewFamilyVisaRefund');
                        return true;



                }else if (self.selfServiceType()=="BTD"){

                 if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());


                    }
                     oj.Router.rootInstance.go('reviewNotificationBusinessTripDriver');

                }else if (self.selfServiceType() == 'XIL'){

                 if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());


                    }
                        oj.Router.rootInstance.go('reviewIdentificationLetter');
                        return true;



                } else if (self.selfServiceType()=="RRS"){
                     if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());


                    }
                     oj.Router.rootInstance.go('reviewNotificationRewardRequst');

                }else if (self.selfServiceType()=="CEE"){

                 if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());

                    }
                     oj.Router.rootInstance.go('reviewChildrenEductionExpense');

                }else if (self.selfServiceType() == 'EA'){//added
                 if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());

                    }
                    oj.Router.rootInstance.go('reviewNotificationEmployeeAllowance');
                    return true;



                }
                 else if (self.selfServiceType() == 'BTR'){//added
                 if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());

                    }
                    oj.Router.rootInstance.go('reviewBusinessTripReturns');
                    return true;
                }
              else if (self.selfServiceType() == 'STA'){//added
                 if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());

                    }
                    oj.Router.rootInstance.go('reviewStopAllowanceRequest');
                    return true;
                }
                else if (self.selfServiceType() == 'EG'){//added
                 if (self.notificationType() == 'FYI'&&self.notificationStatus()=="CLOSED") {
                       oj.Router.rootInstance.go('viewEmployeeGrievance');
                 }else{
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('editEmployeeGrievance');
                    }

                    return true;
                }
                else if (self.selfServiceType() == "XECR") {
                    if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('viewEmployeeCarRequest');
                    }
                    else {
                        oj.Router.rootInstance.go('reviewEmployeeCarRequest');
                    }
                }else if (self.selfServiceType()=="TR"){

                 if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());
                              oj.Router.rootInstance.go('reviewNotificationTicketRequest');

                    } else if(self.notificationType() == 'FYA')
                         oj.Router.rootInstance.go('reviewNotificationTicketRequest');
                         return true;



                }else if (self.selfServiceType() == "PLN") {
                    if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('viewPenalties');
                    }
                    else {
                        oj.Router.rootInstance.go('reviewPenalties');
                    }
                }
                else if (self.selfServiceType()=="TRF"){

                 if (self.notificationType() == 'FYI') {

                            rootViewModel.reviewNotiType(self.notificationType());
                              oj.Router.rootInstance.go('reviewNotificationTicketRequestRefund');

                    } else if(self.notificationType() == 'FYA')
                         oj.Router.rootInstance.go('reviewNotificationTicketRequestRefund');
                         return true;



                }
                else if (self.selfServiceType() == "CHT") {
                    if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('reviewChangeHousingType');
                    }
                    else {
                        oj.Router.rootInstance.go('reviewChangeHousingType');
                    }
                }
                 else if (self.selfServiceType() == "RAL") {
                    if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('reviewReturnAfterLeave');
                    }
                    else {
                        oj.Router.rootInstance.go('reviewReturnAfterLeave');
                    }
                }// add return after leave


             else if (self.selfServiceType()=="CRD"){
                 if (self.notificationType() == 'FYI') {
                            rootViewModel.reviewNotiType(self.notificationType());
                              oj.Router.rootInstance.go('reviewNotificationCardsRequest');
                    } else if(self.notificationType() == 'FYA')
                         oj.Router.rootInstance.go('reviewNotificationCardsRequest');
                         return true;



              }  else if (self.selfServiceType() == "MICR") {
                    if (self.notificationType() == 'FYI') {
                        rootViewModel.reviewNotiType(self.notificationType());
                        oj.Router.rootInstance.go('viewEmployeeMedicalInsurance');
                    }
                    else {
                        oj.Router.rootInstance.go('reviewEmployeeMedicalInsurance');
                    }
                }
            }
        };


        /**
         * Optional ViewModel method invoked when this ViewModel is about to be
         * used for the View transition.  The application can put data fetch logic
         * here that can return a Promise which will delay the handleAttached function
         * call below until the Promise is resolved.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
         * the promise is resolved
         */
        self.handleActivated = function (info) {
            // Implement if needed
        };

        /**
         * Optional ViewModel method invoked after the View is inserted into the
         * document DOM.  The application can put logic that requires the DOM being
         * attached here.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
         */
        self.handleAttached = function (info) {
            initTranslations();
            self.reviewDisabled(true);
            app.showPreloader();
                services.getNotification( {
                    'POSITION' : rootViewModel.personDetails().assignmentName(), 'MANAGER_ID' : rootViewModel.personDetails().personId(), 'AOR' : rootViewModel.aor(),'EMP' : rootViewModel.personDetails().personId()
                }).then(getNotificationCbFn, app.failCbFn);

        };



        /**
         * Optional ViewModel method invoked after the bindings are applied on this View.
         * If the current View is retrieved from cache, the bindings will not be re-applied
         * and this callback will not be invoked.
         * @param {Object} info - An object with the following key-value pairs:
         * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
         * @param {Function} info.valueAccessor - The binding's value accessor.
         */
        self.handleBindingsApplied = function (info) {
            // Implement if needed
        };

        /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
        self.handleDetached = function (info) {
            // Implement if needed
            if(self.notificationType() == 'FYI') {
                ko.postbox.publish("notiId", self.notiId());
            }


        };

    }
//language support =========================
            self.review = ko.observable();
            self.rowNumber= ko.observable();
            self.msgTitle= ko.observable();
            self.msgBody= ko.observable();
            self.creationDate= ko.observable();
            self.type= ko.observable();
            self.notifications= ko.observable();
            self.requesterNumber= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
            self.columnArray = ko.observableArray([]);

        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });

        function initTranslations() {
            self.review(getTranslation("others.review"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.msgTitle(getTranslation("notification.msgTitle"));
            self.msgBody(getTranslation("notification.msgBody"));
            self.notifications(getTranslation("notification.notifications"));
            self.type(getTranslation("labels.type"));
            self.creationDate(getTranslation("notification.creationDate"));
            self.requesterNumber(getTranslation("notification.requesterNumber"));
            self.columnArray([
                                            {"headerText" : self.rowNumber(), "field": "rowNumberRenderer"},
                                            {"headerText" : self.msgTitle(), "field" : "MSG_TITLE"},
                                            {"headerText" : self.msgBody(), "field" : "MSG_BODY"},
                                            {"headerText" : self.requesterNumber(), "field" : "person_number"},
                                            {"headerText" : self.type(), "field" : "TYPE"},
                                            {"headerText" : self.creationDate(), "field" : "CREATION_DATE"}]);
            }
    /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
    return new NotificationsViewModel();
});
