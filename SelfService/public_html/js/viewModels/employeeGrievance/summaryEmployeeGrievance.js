define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource','ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function summaryEmployeeGrievanceViewModel() {
        var self = this;

        this.data = ko.observableArray([]);
//        this.dataSource = ko.observable();
        this.dataSource= new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {idAttribute: 'id'}));
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.selectedRowKey = ko.observable();
        self.typeSelected = ko.observable('REG');
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        self.columnArrayApproval = ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        this.specialistSummary = ko.observable("");
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.userPriv = ko.observable('T');
        self.selectedEmployeeGrievance = ko.observable();
        self.selectedIndex = ko.observable();
        self.selectedEmployee = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
        self.mode = ko.observable();    
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
         ko.postbox.subscribe("Specialist", function (data) {
            self.specialistSummary(data);
         }); 
        ko.postbox.subscribe("summaryEmployeeGrievanceObj", function (data) {
            self.selectedEmployee(data);
         }); 
        $( document ).ajaxComplete(function( event, xhr, settings ) {
            $(".se-pre-con").fadeOut("slow");
            });  
          
        this.grievanceReference = ko.observableArray([{
                "value": '',
                "label": ''
            }]);
        var getEmployeeGrievanceFn = function (data) {
       
        if(data.items.length !=0){
            self.isVisible(true);
         self.grievanceReference([]);

            $.each(data.items, function (index, val) {
              var grvStatus= searchArray(val.grievance_status, rootViewModel.globalGrievanceStatus());
              if(grvStatus && grvStatus.toUpperCase() === 'CLOSED'){
                  self.grievanceReference.push( {
                    "value":  val.id,
                    "label":val.grievance_description
                  });
              }
               });
           $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    id : val.id, person_number : val.person_number, grievance_date : val.grievance_date, 
                    grievance_type : val.grievance_type,
                    grievance_type_Lbl: searchArray(val.grievance_type, rootViewModel.globalGrievanceType()),
                    grievance_description : val.grievance_description, 
                    request_reference_val : val.request_reference_val, 
                    request_reference_code : val.request_reference, 
                    request_reference :searchArrayValue(val.request_reference,  self.grievanceReference()),
                    grievance_status : val.grievance_status,
                    grievance_status_Lbl :  searchArray(val.grievance_status,  rootViewModel.globalGrievanceStatus()),
                    direct_manager_comment:val.direct_manager_comment, 
                    direct_manager_status_Lbl : searchArray(val.direct_manager_status, rootViewModel.globalGrievStatusDirectManager()),
                    direct_manager_status : val.direct_manager_status,
                    direct_mm_comment : val.direct_mm_comment,
                    direct_mm_status : val.direct_mm_status,
                    direct_mm_status_Lbl : searchArray(val.direct_mm_status, rootViewModel.globalGrievStatusDirectManager()),
                    employee_relation_comment : val.employee_relation_comment,
                    employee_relation_status : val.employee_relation_status,
                    employee_relation_status_Lbl : searchArray(val.employee_relation_status, rootViewModel.globalGrievStatusDirectManager()),
                    head_hr_comment : val.head_hr_comment,
                    head_hr_status : val.head_hr_status,
                    head_hr_status_Lbl : searchArray(val.head_hr_status, rootViewModel.globalGrievStatusHeadHR()),
                    name:val.name,
                    latest_response :val.latest_response,
                    employee_action :val.employee_action,
                    created_by:val.created_by,
                    manager_manager_id:val.manager_manager_id
                });
            }); 
        }  
            else{   
                self.isShown(true);
            }
          
//             self.dataSource( new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {idAttribute: 'id'})));
        };
        
        function searchArrayValue(nameKey, searchArray) {
            for (var i = 0;i < searchArray.length;i++) {
             if(nameKey){
                if (searchArray[i].value == nameKey) {
                    return searchArray[i].label;
                }
             }
            }
}

        
           this.tableSelectionListener = function (event) {
            
            
            var data = event.detail;
            var currentRow = data.currentRow;
            if(currentRow['rowKey']){
                self.selectedRowKey(currentRow['rowKey']);
                selectedRow = self.data()[ currentRow['rowIndex']];
                self.selectedIndex(currentRow['rowIndex']);
                self.viewDisabled(false); 
                var grvStatus = selectedRow.grievance_status;
                if(grvStatus === 'CLOSED'){
                         self.editDisabled(true);
                    }else{
                         self.editDisabled(false);
                    }

            }
        }
        
        rootViewModel.getNoOfNotifications();

        self.addEmployeeGrievance = function () {
            self.mode('CreateEmployeeGrievance');
            oj.Router.rootInstance.go('createEmployeeGrievance');
        }

        self.editEmployeeGrievance= function () {

            if (self.selectedRowKey()) {
                self.mode('EditEmployeeGrievance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeGrievance(self.data()[self.selectedIndex()]);
                self.selectedEmployee(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('editEmployeeGrievance');
            }
          
        }

        self.viewEmployeeGrievance= function () {
            if (self.selectedRowKey()) {
                self.mode('ViewEmployeeGrievance');
                rootViewModel.selectedTableRowKey(self.selectedRowKey());
                self.selectedEmployeeGrievance(self.data()[self.selectedIndex()]);
                oj.Router.rootInstance.go('viewEmployeeGrievance');
            }
          
        }



        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'EditEmployeeGrievance') {
                ko.postbox.publish("editEmployeeGrievanceObj", self.selectedEmployeeGrievance());
                ko.postbox.publish("GrievanceReferenceObj", self.grievanceReference());
                 if( self.specialistSummary() === 'true'){                 
                    ko.postbox.publish("GrievanceSpecialist", "true");
                 }
                 else{
                    ko.postbox.publish("GrievanceSpecialist", "false");
                 }
                
            }
            else if (self.mode() == 'ViewEmployeeGrievance') {
                ko.postbox.publish("viewEmployeeGrievanceObj", self.selectedEmployeeGrievance());
                ko.postbox.publish("GrievanceReferenceObj", self.grievanceReference());
            }
            else if (self.mode() == 'CreateEmployeeGrievance') {
                ko.postbox.publish("GrievanceReferenceObj", self.grievanceReference());
            }
        };

        self.handleActivated = function (info) {

        }



        self.handleAttached = function (info) {
                initTranslations();
        if( self.specialistSummary() === 'true'){
        
          self.personNumber(rootViewModel.specialistSelectedEmployee().PersonNumber);
          services.getEmployeeGrievance(self.personNumber()).then(getEmployeeGrievanceFn, app.failCbFn);
//                     var position = rootViewModel.personDetails().positionName();
//             personId = rootViewModel.personDetails().personId();
//             services.getEmployeeGrievanceWorkFlow( {
//                    'POSITION' : position, 'MANAGER_ID' : personId, 'AOR' : rootViewModel.aor(),'EMP' : personId 
//                }).then(getEmployeeGrievanceWorkFlowCbFn, app.failCbFn);
        }
        else{
            services.getEmployeeGrievance(self.personNumber()).then(getEmployeeGrievanceFn, app.failCbFn);
        }
        }
            
            this.closeDialog = function() {
               $("#modalDialog1").ojDialog("close"); 
            }
            
        var getEmployeeGrievanceWorkFlowCbFn = function (data) {
             self.data([]);
              $.each(data.items, function (i, val) {
                if (self.selectedEmployee().PersonNumber === val.person_number) {
                self.data.push( {
                 rowNumberRenderer : (i + 1),
                    id :val.id,
                    grievance_date:val.grievance_date,
                    person_number :val.person_number,
                    name :val.name,
                    receiver_type :val.receiver_type,
                    receiver_id :val.receiver_id,
                    grievance_type_code:val.grievance_type,
                    grievance_type: searchArray(val.grievance_type, rootViewModel.globalGrievanceType()),
                    grievance_description : val.grievance_description, 
                    request_reference_val : val.request_reference_val, 
                    request_reference : val.request_reference, 
                    grievance_status_code : val.grievance_status,
                    grievance_status :  searchArray(val.grievance_status,  rootViewModel.globalGrievanceStatus()),
                    direct_manager_comment:val.direct_manager_comment, 
                    direct_manager_status : searchArray(val.direct_manager_status, rootViewModel.globalGrievStatusDirectManager()),
                    direct_manager_status_code : val.direct_manager_status,
                    direct_mm_comment : val.direct_mm_comment,
                    direct_mm_status_code : val.direct_mm_status,
                    direct_mm_status : searchArray(val.direct_mm_status, rootViewModel.globalGrievStatusDirectManager()),
                    employee_relation_comment : val.employee_relation_comment,
                    employee_relation_status_code : val.employee_relation_status,
                    employee_relation_status : searchArray(val.employee_relation_status, rootViewModel.globalGrievStatusDirectManager()),
                    head_hr_comment : val.head_hr_comment,
                    head_hr_status_code : val.head_hr_status,
                    head_hr_status : searchArray(val.head_hr_status, rootViewModel.globalGrievStatusHeadHR())
                });
//                 self.dataSource( new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, {idAttribute: 'id'})));
                             }

                             

            });
                
        }
            self.backAction = function () {
            oj.Router.rootInstance.go('specialist');
        }
//language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();
            self.viewApprovalsLbl = ko.observable();
            self.ok = ko.observable();
            self.name=ko.observable();
            self.type=ko.observable();
            self.status=ko.observable();
            self.approvalDate=ko.observable();
            self.approvals=ko.observable();
            self.employeeGrievance=ko.observable();
            self.back=ko.observable();
            self.rowNumber= ko.observable();      
            self.grievanceDate= ko.observable();            
            self.grievanceType= ko.observable();           
            self.grievanceDescription= ko.observable();
            self.requestReference= ko.observable();
            self.grievanceStatus= ko.observable();
            self.directManagerComment= ko.observable();
            self.directManagerStatus= ko.observable();
            self.addFirstRecord=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {
            self.back(getTranslation("others.back"));
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.viewApprovalsLbl(getTranslation("others.viewApprovals"));
            self.ok(getTranslation("others.ok"));
            self.name(getTranslation("labels.name"));
            self.type(getTranslation("labels.type"));
            self.status(getTranslation("labels.status"));
            self.approvalDate(getTranslation("labels.approvalDate"));
            self.approvals(getTranslation("labels.approvals"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.employeeGrievance(getTranslation("labels.employeeGrievanceRequest"));      
            self.grievanceDate(getTranslation("employeeGrievance.grievanceDate"));             
            self.grievanceType(getTranslation("employeeGrievance.grievanceType"));     
            self.grievanceDescription(getTranslation("employeeGrievance.grievanceDescription"));     
            self.requestReference(getTranslation("employeeGrievance.requestReference"));     
            self.grievanceStatus(getTranslation("employeeGrievance.grievanceStatus"));     
            self.directManagerComment(getTranslation("employeeGrievance.directManagerComment"));     
            self.directManagerStatus(getTranslation("employeeGrievance.directManagerStatus"));     
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));


           
            self.columnArrayApproval([{"headerText":  self.name(), 
                                       "field": "name"},
                                       {"headerText": self.type(), 
                                       "field": "type"},
                                       {"headerText": self.status(), 
                                       "field": "status"},
                                       {"headerText": self.approvalDate(), 
                                       "field": "approvalDate"}]);//approval table
           if(self.specialistSummary() !== 'true'){
            self.columnArray([{"headerText":self.rowNumber(), 
                                           "field": "rowNumberRenderer"},
                                          {"headerText": self.grievanceDate(), 
                                           "field": "grievance_date"},
                                          {"headerText": self.grievanceType(), 
                                           "field": "grievance_type_Lbl"},
                                          {"headerText": self.grievanceDescription(), 
                                           "field": "grievance_description"},
                                          {"headerText":  self.requestReference(), 
                                           "field": "request_reference"},
                                           {"headerText": self.grievanceStatus(), 
                                           "field": "grievance_status_Lbl"},
                                           {"headerText": self.directManagerComment(), 
                                           "field": "direct_manager_comment"},
                                          {"headerText": self.directManagerStatus(), 
                                           "field": "direct_manager_status"}]);//Employee Grievancetable
           }
           else{
          self.columnArray([{"headerText":self.rowNumber(), 
                                           "field": "rowNumberRenderer"},
                                          {"headerText": self.grievanceDate(), 
                                           "field": "grievance_date"},
                                          {"headerText": self.grievanceType(), 
                                           "field": "grievance_type"},
                                          {"headerText": self.grievanceDescription(), 
                                           "field": "grievance_description"},
                                          {"headerText":  self.requestReference(), 
                                           "field": "request_reference_val"},
                                           {"headerText": self.grievanceStatus(), 
                                           "field": "grievance_status"},
                                           {"headerText": self.directManagerComment(), 
                                           "field": "direct_manager_comment"},
                                          {"headerText": self.directManagerStatus(), 
                                           "field": "direct_manager_status"}]);//Employee Grievancetable
                                           }


        }
    }
    return summaryEmployeeGrievanceViewModel;
});