define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryElementEnteryViewModel() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.tablesNamesList = ko.observable("XXX_HR_REG_BTRIP_DAYS_B,XXX_HR_TRAIN_BTRIP_DAYS_B,XXX_HR_REG_BTRIP_DAYS_A,XXX_HR_TRAIN_BTRIP_DAYS_A,XXX_HR_REG_BTRIP_PERDIEM,XXX_HR_TRAIN_BTRIP_PERDIEM,XXX_HR_REG_BTRIP_TICKET,XXX_HR_TRAIN_BTRIP_TICKET");
        self.selectedElementEntery = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();

        var getElementEntryCbFn = function (data) {
            self.data([]);
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    source_system_owner : val.source_system_owner, 
                    source_system_id : val.source_system_id, 
                    effective_start_date : val.effective_start_date, 
                    effective_end_date : val.effective_end_date, 
                    element_name : val.element_name, 
                    legislative_data_group_name : val.legislative_data_group_name, 
                    assignment_number : val.assignment_number, 
                    id : val.id, 
                    entry_type : val.entry_type, 
                    creator_type : val.creator_type
                });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            })));

        };

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));

        this.tableSelectionListener = function (event, data) {
            if (data['option'] == 'selection') {
                var selectionObj = data['value'];
                if (selectionObj && selectionObj.length) {
                    var key = selectionObj[0].startKey.row;
                    self.selectedRowKey(key);
                    var index = selectionObj[0].endIndex.row;
                    self.selectedIndex(index);
                    self.viewDisabled(false);
                    selectedRow = self.data()[index];
                    if (selectedRow) {
                        var latestResponseCode = selectedRow.latestResponseCode;
                        if (!latestResponseCode) {
                            self.editDisabled(false);
                        }
                        else {
                            self.editDisabled(true);
                        }
                    }
                }

            }
        }

        self.addElementEntery = function () {
            self.mode('Add');
            oj.Router.rootInstance.go('createElement');
        }

        self.editElementEntery = function () {

            if (self.selectedRowKey()) {
                self.mode('Edit');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedElementEntery(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editElement');
            }
           

        }

        self.viewElementEntery = function () {
            if (self.selectedRowKey()) {
                self.mode('View');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedElementEntery(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('viewElement');
            }
            
            //                oj.Router.rootInstance.go('viewElement');
        }

        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
                ko.postbox.publish("editElementObj", self.selectedElementEntery());
            }
            else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedElementEntery());
            }
        };

        self.handleActivated = function (info) {

        }

        self.handleAttached = function (info) {
            services.getElementEntry().then(getElementEntryCbFn, app.failCbFn);

        }

    }
    return SummaryElementEnteryViewModel;
});