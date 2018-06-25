define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojtrain', 'config/services', 'knockout-mapping','ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], 
function (oj, ko, $, app, commonUtil, services,km) {

    function editEmployeeGrievanceModel () {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.grevianceRefVisible= ko.observable(false);
        self.managerId = ko.observable(rootViewModel.personDetails().managerId());
        self.personId = rootViewModel.personDetails().personId();
        self.currentStepValue = ko.observable('stp1');
        self.tracker = ko.observable();
        self.selected = ko.observable('stp1');
        self.isDisabled = ko.observable(false);
        self.isManager = ko.observable(false);
        self.isManagerOfManager= ko.observable(false);
        self.isHrOperations= ko.observable(false);
        self.isHeadOfHr=ko.observable(false);
        self.editBtnVisible = ko.observable(false);
        self.isVisible = ko.observable(false);
        self.disableAdd= ko.observable(false);
        self.nextBtnVisible = ko.observable(true);
        self.managersManagerDetails = ko.observable('');
        self.grievanceTypes = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
        self.grievanceStatuses = ko.observableArray([]);
        self.grievanceStatusList = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceStatus()));
        self.managerStatuses = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievStatusDirectManager()));
        self.headHrStatuses = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievStatusHeadHR()));  
        self.specialistEdit= ko.observable("");
        self.clickedButton = ko.observable("");
        self.finalResponse = ko.observable("");
        self.grievanceReference = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
   
        self.grievanceReference = ko.observableArray([]);
//        ko.postbox.subscribe("GrievanceReferenceObj", function (newValue) {
//                     self.grievanceReference(newValue);
//             });
        ko.postbox.subscribe("GrievanceSpecialist", function (data) {
                 self.specialistEdit(data);
         }); 
     this.notiId = ko.observable();
             ko.postbox.subscribe("notiId", function (newValue) {
                
                if(newValue && newValue > 0) {
                    self.notiId(newValue);
                }
                    
             }); 

         
            self.employeeGrievanceModel = {
                id : ko.observable(),
                grievanceDate:ko.observable(""),
                grievanceType:ko.observable(""),
                grievanceDescription  : ko.observable(""),
                requestReference:  ko.observable(""),
                requestReferenceVal:  ko.observable(""),
                grievanceStatus:ko.observable(""),
                directManagerComment:ko.observable(""),
                directManagerStatus:ko.observable(""),
                directMmComment:ko.observable(""),
                directMmStatus:ko.observable(""),
                employeeRelationComment:ko.observable(""),
                employeeRelationStatus:ko.observable(""),
                headHrComment:ko.observable(""),
                headHrCommentStatus:ko.observable(""),
                personNumber: ko.observable(""),
                name:ko.observable(""),
                receiverType:ko.observable(""),
                receiverId:ko.observable(""),
                nextReceiverType:ko.observable(""),
                nextReceiverId:ko.observable(""),
                employeeAction:ko.observable(""),
                managerId:ko.observable(""),
                managerManagerId:ko.observable(""),
                latestResponse:ko.observable(""),
                updatedBy:rootViewModel.personDetails().personNumber(),
                updateDate:ko.observable(new Date()),
                responsePersonId:rootViewModel.personDetails().personNumber(),
                employeeId:ko.observable(""),//created_by,
                IS_Solved:ko.observable(""),
                IS_To_Mannager_Of_Mannager:ko.observable(""),
                IS_To_HR_Operations:ko.observable(""),
                IS_To_Head_Of_HR:ko.observable(""),
                IS_Force_Close:ko.observable("")
            };
        ko.postbox.subscribe("editEmployeeGrievanceObj", function (newValue) {
                       
              setModel(newValue);            

        });





            
            self.managerCommentDisabled = ko.computed(function () {
                if( self.employeeGrievanceModel.receiverType() === 'LINE_MANAGER'){
                    return true;
                }
                else{
                    return false;
                }
            });
             self.employeeRelationDisabled = ko.computed(function () {
                if(self.employeeGrievanceModel.receiverId() === 'Employee Relations Manager'){
                    return true;
                }
                else{
                    return false;
                }
            });
            
            self.hrHeadDisabled= ko.computed(function () {
                if( self.employeeGrievanceModel.receiverId() === 'HR General Manager' ){
                    return true;
                }
                else{
                    return false;
                }
            });
            
            self.managerCommentVisible = ko.computed(function () {
                if( self.employeeGrievanceModel.receiverType() === 'LINE_MANAGER'){
                    return true;
                }
                else{
                    return false;
                }
            });
             self.mMCommentVisible = ko.computed(function () {
                if( self.employeeGrievanceModel.receiverType() === 'LINE_MANAGERS_MANAGER'){
                    return true;
                }
                else{
                    return false;
                }
            });
             self.employeeRelationVisible = ko.computed(function () {
                if(self.employeeGrievanceModel.receiverId() === 'Employee Relations Manager'  ){

                    return true;
                }
                else{
                    return false;
                }
            });
            self.hrHeadVisible = ko.computed(function () {
                if( self.employeeGrievanceModel.receiverId() === 'HR General Manager' ){
                    return true;
                }
                else{
                    return false;
                }
            });
            
                self.specialistScreen = ko.computed(function () {
                if( self.specialistEdit() === "true"  ){
                    return true;
                }
                else{
                    return false;
                }
            });
            
        self.formatDate = function (date) {
            month = '' + (date.getMonth() + 1), day = '' + date.getDate(), year = date.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));





        self.handleActivated = function (info) {
          if (rootViewModel.selectedTableRowKeyNotifiation())
          {//getEmployeeGrievanceByID
           var getEmployeeGrievanceFn = function (data) {
           
           setModel(data.items[0]);
           }
            
             services.getEmployeeGrievanceByID(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeGrievanceFn, app.failCbFn);
          }
            self.currentStepValue('stp1');
            this.selected = ko.observable('stp1');
            self.currentStepValue('stp1');

        };
         function setModel (newValue)
         {  
            self.employeeGrievanceModel.id(newValue.id);
            self.employeeGrievanceModel.personNumber(newValue.person_number);
            self.employeeGrievanceModel.grievanceDate(newValue.grievance_date);
            self.employeeGrievanceModel.grievanceType(newValue.grievance_type);
            self.employeeGrievanceModel.grievanceDescription(newValue.grievance_description);
            self.employeeGrievanceModel.requestReference(newValue.request_reference_code);
            self.employeeGrievanceModel.requestReferenceVal(newValue.request_reference_val);
            self.employeeGrievanceModel.grievanceStatus(newValue.grievance_status);
            self.employeeGrievanceModel.directManagerComment(newValue.direct_manager_comment);
            self.employeeGrievanceModel.directManagerStatus(newValue.direct_manager_status);
            self.employeeGrievanceModel.directMmComment(newValue.direct_mm_comment);
            self.employeeGrievanceModel.directMmStatus(newValue.direct_mm_status);
            self.employeeGrievanceModel.employeeRelationComment(newValue.employee_relation_comment);
            self.employeeGrievanceModel.employeeRelationStatus(newValue.employee_relation_status);
            self.employeeGrievanceModel.headHrComment(newValue.head_hr_comment);
            self.employeeGrievanceModel.headHrCommentStatus(newValue.head_hr_status);
            self.employeeGrievanceModel.name(newValue.name); 
            self.employeeGrievanceModel.receiverType(newValue.receiver_type); 
            self.employeeGrievanceModel.receiverId(newValue.receiver_id);         
            self.employeeGrievanceModel.employeeAction(newValue.employee_action); 
            self.employeeGrievanceModel.latestResponse(newValue.latest_response);
            self.employeeGrievanceModel.managerId(newValue.manager_id);
            self.employeeGrievanceModel.managerManagerId(newValue.manager_manager_id);//employeeId
            self.employeeGrievanceModel.employeeId(newValue.created_by);
            controllScreen ();
         }
         function controllScreen (){
          if (rootViewModel.personDetails().personNumber() == self.employeeGrievanceModel.personNumber())
            {    
               self.isDisabled(false);
            }
            else 
            { 
              self.isDisabled(true);
            }
            if(self.employeeGrievanceModel.managerId()==rootViewModel.personDetails().personId())
            {
                      self.isManager(false);
            }
            else{
             
              self.isManager(true);
            }
            if(self.employeeGrievanceModel.managerManagerId()==rootViewModel.personDetails().personId())
            {
               self.isManagerOfManager(false);
            }
            else{
            self.isManagerOfManager(true);
            }
            if(rootViewModel.personDetails().positionName()=="Manager- HR Operations"){
              self.isHrOperations(false)  
            }
            else{
            self.isHrOperations(true);
            }
            if(rootViewModel.personDetails().positionName()=="General Manager - Human Resources & Support Service"){
               self.isHeadOfHr(false)  
            }else{
                self.isHeadOfHr(true) 
            }
            if(self.employeeGrievanceModel.grievanceType()=="REOPEN"){
            self.grevianceRefVisible(true);
                buildRefArr();
            }
            
         
         }
         function buildRefArr()
         {
            var getEmployeeGrievanceFn = function (data) {
                if (data.items.length != 0) {
                    self.isVisible(true);
                    self.grievanceReference([]);

                    $.each(data.items, function (index, val) {
                        var grvStatus = searchArray(val.grievance_status, rootViewModel.globalGrievanceStatus());
                        if (grvStatus && grvStatus.toUpperCase() === 'CLOSED') {
                            self.grievanceReference.push( {
                                "value" : val.id, "label" : val.grievance_description
                            });
                        }
                    });
                }
            }
            services.getEmployeeGrievance(rootViewModel.personDetails().personNumber()).then(getEmployeeGrievanceFn, app.failCbFn);
         }
        self.handleAttached = function (info) {
            self.currentStepValue('stp1');
            self.grievanceTypes(rootViewModel.globalGrievanceType());
            
            
       
           
            initTranslations();
          

        };
        self.handleDetached = function (info) {
          clearContent();
        };
//----------------------------ChangeHundler Section -------------------
 self.typeChangeHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
            
            self.employeeGrievanceModel.grievanceType(self.employeeGrievanceModel.grievanceType().toString());
            if (self.employeeGrievanceModel.grievanceType()=="REOPEN"){
                 self.grevianceRefVisible(true);
            }
            else{
             self.grevianceRefVisible(false);
             }          
            }
        }
        self.referenceChangeHandler = function (event, data) {
            if (data.option == 'value' && data.value) {
                
                self.employeeGrievanceModel.requestReference(self.employeeGrievanceModel.requestReference().toString());
            }
        }
 self.employeeStatus = function (event, data) {
 
  if (data.option == 'value' && data.value) {
  
  self.employeeGrievanceModel.grievanceStatus(self.employeeGrievanceModel.grievanceStatus());
    if(self.employeeGrievanceModel.grievanceStatus().toString()=="ESCALATE_DM1"){   
     self.employeeGrievanceModel.IS_To_Mannager_Of_Mannager("YES");
       
     }
     else if (self.employeeGrievanceModel.grievanceStatus()=="ESCALATE_HR"){
     self.employeeGrievanceModel.IS_To_HR_Operations("YES");
     self.employeeGrievanceModel.IS_Solved("NO");
      self.employeeGrievanceModel.IS_To_Mannager_Of_Mannager("NO");
     }
  }
}       
self.directMannagerStatus = function (event, data) {
  if (data.option == 'value' && data.value) {
  
  self.employeeGrievanceModel.directManagerStatus(self.employeeGrievanceModel.directManagerStatus());
    if(self.employeeGrievanceModel.directManagerStatus()=="SOLVED"){   
     self.employeeGrievanceModel.IS_Solved("YES");
     }
     else if (self.employeeGrievanceModel.directManagerStatus()=="ESCALATE"){
     self.employeeGrievanceModel.IS_To_Mannager_Of_Mannager("YES");
     self.employeeGrievanceModel.IS_Solved("NO");
     }
  }
}
self.MannagerOfMannagerStatus = function (event, data) {
  if (data.option == 'value' && data.value) {
 
  self.employeeGrievanceModel.directMmStatus(self.employeeGrievanceModel.directMmStatus());
    if(self.employeeGrievanceModel.directMmStatus()=="SOLVED"){   
     self.employeeGrievanceModel.IS_Solved("YES");
     }
     else if (self.employeeGrievanceModel.directMmStatus()=="ESCALATE"){
     self.employeeGrievanceModel.IS_To_HR_Operations("YES");
     self.employeeGrievanceModel.IS_Solved("NO");
     }
  }
}
self.hrOperationStatus = function (event, data) {
  if (data.option == 'value' && data.value) {
   
  self.employeeGrievanceModel.employeeRelationStatus(self.employeeGrievanceModel.employeeRelationStatus());
    if(self.employeeGrievanceModel.employeeRelationStatus()=="SOLVED"){   
     self.employeeGrievanceModel.IS_Solved("YES");
     }
     else if (self.employeeGrievanceModel.employeeRelationStatus()=="ESCALATE"){
     self.employeeGrievanceModel.IS_To_Head_Of_HR("YES");
     self.employeeGrievanceModel.IS_Solved("NO");
     }
  }
}
self.HeadOfHrStatus = function (event, data) {
  if (data.option == 'value' && data.value) {
  self.employeeGrievanceModel.headHrCommentStatus(self.employeeGrievanceModel.headHrCommentStatus());
    if(self.employeeGrievanceModel.headHrCommentStatus()=="SOLVED"){   
     self.employeeGrievanceModel.IS_Solved("YES");//
     self.employeeGrievanceModel.grievanceStatus("OPEN");
     }
     else if (self.employeeGrievanceModel.headHrCommentStatus()=="FC"){
     self.employeeGrievanceModel.grievanceStatus("CLOSED");
     self.employeeGrievanceModel.IS_Force_Close("YES");
      self.employeeGrievanceModel.IS_Solved("NO");
     }
  }
}
//--------------------------End of Change Handler Section ---------------------------
        self.stepArray = ko.observableArray([]);

        this.previousStep = function () {
            var prev = document.getElementById("train").getPreviousSelectableStep();
            if (prev != null)
                self.currentStepValue(prev);
        }
        self.canEdit = function(){
        var can = false;
        self.employeeGrievanceModel.grievanceDate();
             var grivDate   = new Date(self.employeeGrievanceModel.grievanceDate());
             var today = new Date();
            var numberOfDaysToAdd = 5;
             grivDate.setDate(grivDate.getDate() + numberOfDaysToAdd); 
            
            if(grivDate<today){
                can = true;
            }
            return can ;
        }
        this.nextStep = function () {

            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
          
           if(self.employeeGrievanceModel.directManagerStatus()&&self.employeeGrievanceModel.directManagerStatus().toString()=="ESCALATE"){
                if(!self.canEdit()){
               
                $.notify(self.esclateDate(), "error");
                return ;
              } 
           }
        if(self.employeeGrievanceModel.directMmStatus()&&self.employeeGrievanceModel.directMmStatus().toString()=="ESCALATE"){
                if(!self.canEdit()){
               
                $.notify(self.esclateDate(), "error");
                return ;
              } 
           }
        if(self.employeeGrievanceModel.grievanceStatus()&&((self.employeeGrievanceModel.grievanceStatus().toString()=="ESCALATE")||(self.employeeGrievanceModel.grievanceStatus().toString()=="ESCALATE_DM1")||(self.employeeGrievanceModel.grievanceStatus().toString()=="ESCALATE_HR"))){
                if(!self.canEdit()){
               
                $.notify(self.esclateDate(), "error");
                return ;
              } 
           }



            var next = document.getElementById("train").getNextSelectableStep();
            if (next != null)
                self.currentStepValue(next);
        }

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        self.currentStepValueText = function () {
            if (self.currentStepValue() == 'stp2') {
                self.isDisabled(true);
                self.editBtnVisible(true);
                self.nextBtnVisible(false);
                self.isManager(true);
                self.isManagerOfManager(true);
            }
            else {
               // self.isDisabled(false);
                self.editBtnVisible(false);
                self.nextBtnVisible(true);
                controllScreen ();
            }

            return self.employeeGrievance();
        };

        this.stopSelectListener = function (event, ui) {
            var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!self._showComponentValidationErrors(trackerObj)) {
                event.preventDefault();
                return;
            }

        }
        this.submitButton = function () {
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };


        this.cancelAction = function () {
        if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
//        if( self.specialistEdit() === "true"){
//            oj.Router.rootInstance.go('specialist');
//        }else{
//            oj.Router.rootInstance.go('summaryEmployeeGrievance'); 
//        }
        }

        self.editEmployeeGrievance= function () {
        self.disableAdd(true);
//          if (self.clickedButton() != event.currentTarget.id) {
             
            self.employeeGrievanceModel.grievanceType(self.employeeGrievanceModel.grievanceType().toString());  
            self.employeeGrievanceModel.grievanceStatus(self.employeeGrievanceModel.grievanceStatus().toString());
            if(self.employeeGrievanceModel.requestReference()){
                  self.employeeGrievanceModel.requestReference(self.employeeGrievanceModel.requestReference().toString()); 
            }
            if(self.employeeGrievanceModel.directManagerStatus()){
                  self.employeeGrievanceModel.directManagerStatus(self.employeeGrievanceModel.directManagerStatus().toString()); 
            }
            if(self.employeeGrievanceModel.directMmStatus()){
                  self.employeeGrievanceModel.directMmStatus(self.employeeGrievanceModel.directMmStatus().toString()); 
            }
            
            if(self.employeeGrievanceModel.employeeRelationStatus()){
                  self.employeeGrievanceModel.employeeRelationStatus(self.employeeGrievanceModel.employeeRelationStatus().toString()); 
            }
            if(self.employeeGrievanceModel.headHrCommentStatus()){
                  self.employeeGrievanceModel.headHrCommentStatus(self.employeeGrievanceModel.headHrCommentStatus().toString()); 
            }

          

            var editEmployeeGrievanceCbFn = function (data) {
              self.disableAdd(false);
                $.notify(self.notifyUpdateSuccess(), "success");
                  if (self.finalResponse() === 'ESCALATE') {
                   
                  }
                  else if(self.finalResponse() === 'SOLVED'){
                       $.notify(self.notifyUpdateSolved(), "success");
                  }
                 else if(self.finalResponse() === 'FORCE_CLOSED'){
                       $.notify(self.notifyUpdateForceClose(), "success");
                  }
                else if(self.finalResponse() === 'CLOSED'){
                       $.notify(self.notifyUpdateClose(), "success");
                  }
                 else if( self.employeeGrievanceModel.grievanceStatus().includes('ESC')){
                       $.notify(self.notifyUpdateEscalate(), "error");
                  }
                  else if( self.employeeGrievanceModel.grievanceStatus().includes('CLOSED')){
                        $.notify(self.notifyUpdateClose(), "success");
                  }
                
                   rootViewModel.updateNotificaiton(self.notiId());
                  
                if (self.specialistEdit() === "true") {
                    oj.Router.rootInstance.go('specialist');
                }
                else {
                    oj.Router.rootInstance.go('summaryEmployeeGrievance');
                }
            };
             var jsonData = ko.toJSON(self.employeeGrievanceModel);
         services.editEmployeeGrievance(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//            if (self.specialistEdit() === "true") {
//                if (self.employeeGrievanceModel.receiverType() === 'LINE_MANAGER') {
//                    if (self.employeeGrievanceModel.directManagerStatus() === 'ESCALATE') {
//                        self.employeeGrievanceModel.nextReceiverId(rootViewModel.personDetails().managerId());
//                        self.employeeGrievanceModel.nextReceiverType('LINE_MANAGERS_MANAGER');
//                        self.finalResponse("ESCALATE"); 
//
//                    }
//                    else {
//                        self.employeeGrievanceModel.nextReceiverType('EMP');
//                        self.employeeGrievanceModel.nextReceiverId(self.employeeGrievanceModel.personNumber());
//                         self.finalResponse("SOLVED");
//                    }
//
//                }
//                else if (self.employeeGrievanceModel.receiverType() === 'LINE_MANAGERS_MANAGER') {
//                    if (self.employeeGrievanceModel.directMmStatus() === 'ESCALATE') {
//                        self.employeeGrievanceModel.nextReceiverId('Employee Relations Manager');
//                        self.employeeGrievanceModel.nextReceiverType('POSITION');
//                         self.finalResponse("ESCALATE");
//                    }
//                    else {
//                        self.employeeGrievanceModel.nextReceiverType('EMP');
//                        self.employeeGrievanceModel.nextReceiverId(self.employeeGrievanceModel.personNumber());
//                         self.finalResponse("SOLVED");
//                    }
//
//                }
//                else if (self.employeeGrievanceModel.receiverId() === 'Employee Relations Manager') {
//                    if (self.employeeGrievanceModel.employeeRelationStatus() === 'ESCALATE') {
//                        self.employeeGrievanceModel.nextReceiverType('POSITION');
//                        self.employeeGrievanceModel.nextReceiverId('HR General Manager');
//                         self.finalResponse("ESCALATE");
//                    }
//                    else {
//                        self.employeeGrievanceModel.nextReceiverType('EMP');
//                        self.employeeGrievanceModel.nextReceiverId(self.employeeGrievanceModel.personNumber());
//                         self.finalResponse("SOLVED");
//                    }
//
//                }
//                else if (self.employeeGrievanceModel.receiverId() === 'HR General Manager') {
//                    if (self.employeeGrievanceModel.headHrCommentStatus() === 'FORCE_CLOSE') {
//                        self.employeeGrievanceModel.grievanceStatus('CLOSED');
//                         self.finalResponse("FORCE_CLOSED");
//                    }
//                    else {
//                        self.employeeGrievanceModel.nextReceiverType('EMP');
//                        self.employeeGrievanceModel.nextReceiverId(self.employeeGrievanceModel.personNumber());
//                         self.finalResponse("CLOSED");
//                    }
//
//                }
//                var jsonData = ko.toJSON(self.employeeGrievanceModel);
//                services.editEmployeeGrievanceWorkFlow(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//            }
//            else {
//                if (self.employeeGrievanceModel.grievanceStatus() == 'CLOSED' || self.employeeGrievanceModel.grievanceStatus() == 'OPEN') {
//                    jsonData = ko.toJSON(self.employeeGrievanceModel);
//                    services.editEmployeeGrievance(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//                }
//                else if (self.employeeGrievanceModel.latestResponse() === 'LINE_MANAGER') {
//
//                    if (self.employeeGrievanceModel.grievanceStatus().includes('ESC')) {
//                    
//                        
//                            self.managersManagerDetails(km.fromJSON(data));
//                            self.employeeGrievanceModel.nextReceiverId(rootViewModel.personDetails().managerOfManager());
//                            self.employeeGrievanceModel.nextReceiverType('LINE_MANAGERS_MANAGER');
//                            jsonData = ko.toJSON(self.employeeGrievanceModel);
//                            services.editEmployeeGrievanceWorkFlow(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//
//                         
//                     // services.getEmpDetailsbyPersonId(rootViewModel.personDetails().managerId(),rootViewModel.jwt(),rootViewModel.hostUrl()).then(getEmpDetails, app.failCbFn);
//                      
//                    }
//                     
//                }
//                else if (self.employeeGrievanceModel.latestResponse() === 'LINE_MANAGERS_MANAGER') {
//
//                    if (self.employeeGrievanceModel.grievanceStatus().includes('ESC')) {
//                        self.employeeGrievanceModel.nextReceiverId('Employee Relations Manager');
//                        self.employeeGrievanceModel.nextReceiverType('POSITION');
//                    }
//                        jsonData = ko.toJSON(self.employeeGrievanceModel);
//                services.editEmployeeGrievanceWorkFlow(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//
//                }
//                else if (self.employeeGrievanceModel.latestResponse() === 'Employee Relations Manager') {
//                    if (self.employeeGrievanceModel.grievanceStatus().includes('ESC')) {
//                        self.employeeGrievanceModel.nextReceiverType('POSITION');
//                        self.employeeGrievanceModel.nextReceiverId('HR General Manager');
//                    }
//                        jsonData = ko.toJSON(self.employeeGrievanceModel);
//                services.editEmployeeGrievanceWorkFlow(jsonData).then(editEmployeeGrievanceCbFn, app.failCbFn);
//
//                }
//
//            
//            }
         

        }

        function clearContent() {
            self.employeeGrievanceModel.id("");
            self.employeeGrievanceModel.grievanceDate("");
            self.employeeGrievanceModel.grievanceType("");
            self.employeeGrievanceModel.grievanceDescription("");
            self.employeeGrievanceModel.requestReference("");
            self.employeeGrievanceModel.grievanceStatus("");
            self.employeeGrievanceModel.directManagerComment("");
             self.employeeGrievanceModel.directManagerStatus("");
             self.employeeGrievanceModel.directMmComment("");
             self.employeeGrievanceModel.directMmStatus("");
             self.employeeGrievanceModel.employeeRelationComment("");
             self.employeeGrievanceModel.employeeRelationStatus("");
             self.employeeGrievanceModel.headHrComment("");
             self.employeeGrievanceModel.headHrCommentStatus("");
             self.employeeGrievanceModel.personNumber("");
             self.employeeGrievanceModel.name("");
             self.employeeGrievanceModel.receiverType("");
             self.employeeGrievanceModel.receiverId("");
             self.employeeGrievanceModel.nextReceiverType("");
             self.employeeGrievanceModel.nextReceiverId("");
             self.employeeGrievanceModel.latestResponse("");
             self.clickedButton("");
             self.finalResponse("");
        }
        //language support =========================
            self.ok = ko.observable();
            self.back= ko.observable();
            self.next= ko.observable();
            self.cancel= ko.observable();
            self.confirmMessage = ko.observable();
            self.editMessage = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();           
            self.notifyUpdateSuccess= ko.observable();
            self.notifyUpdateEscalate= ko.observable();
            self.notifyUpdateSolved= ko.observable();
            self.notifyUpdateForceClose= ko.observable();
            self.notifyUpdateClose= ko.observable();
            self.grievanceDate= ko.observable();            
            self.grievanceType= ko.observable();           
            self.grievanceDescription= ko.observable();
            self.requestReference= ko.observable();
            self.grievanceStatus= ko.observable();
            self.directManagerComment= ko.observable();
            self.directManagerStatus= ko.observable();
            self.employeeGrievance= ko.observable();
            self.directManagerManagerComment= ko.observable();
            self.directManagerManagerStatus= ko.observable();
            self.employeeRelationComment= ko.observable();
            self.employeeRelationStatus= ko.observable();
            self.headofHRComment= ko.observable();
            self.headofHRStatus= ko.observable();
            self.esclateDate= ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
            self.stepArray([{label : self.create(), id : 'stp1'},
                          {label : self.review(), id : 'stp2'}]);
        });
            function initTranslations() {
               self.headHrStatuses(app.getSaaSLookup(rootViewModel.globalGrievStatusHeadHR()));
             //  self.employeeGrievanceModel.headHrCommentStatus(self.employeeGrievanceModel.headHrCommentStatus());              
               self.grievanceTypes(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
               self.grievanceStatusList(app.getSaaSLookup(rootViewModel.globalGrievanceStatus()));
              self.managerStatuses(app.getSaaSLookup(rootViewModel.globalGrievStatusDirectManager()));
               self.ok(getTranslation("others.ok"));
               self.back(getTranslation("others.pervious"));
               self.next(getTranslation("others.next"));
               self.cancel(getTranslation("others.cancel"));
               self.yes(getTranslation("others.yes"));
               self.no(getTranslation("others.no"));
               self.submit(getTranslation("others.submit"));
               self.confirmMessage(getTranslation("labels.confirmMessage"));
               self.create(getTranslation("labels.create"));
               self.review(getTranslation("others.review"));
               self.esclateDate(getTranslation("employeeGrievance.esclateDate"));
               self.editMessage (getTranslation("employeeGrievance.editMessage"));
               self.notifyUpdateSuccess (getTranslation("employeeGrievance.notifyUpdateSuccess"));
               self.grievanceDate(getTranslation("employeeGrievance.grievanceDate"));             
               self.grievanceType(getTranslation("employeeGrievance.grievanceType"));     
               self.grievanceDescription(getTranslation("employeeGrievance.grievanceDescription"));     
               self.requestReference(getTranslation("employeeGrievance.requestReference"));     
               self.grievanceStatus(getTranslation("employeeGrievance.grievanceStatus"));     
               self.directManagerComment(getTranslation("employeeGrievance.directManagerComment"));     
               self.directManagerStatus(getTranslation("employeeGrievance.directManagerStatus")); 
               self.employeeGrievance(getTranslation("employeeGrievance.employeeGrievance"));   
               self.directManagerManagerComment(getTranslation("employeeGrievance.directManagerManagerComment"));   
               self.directManagerManagerStatus(getTranslation("employeeGrievance.directManagerManagerStatus"));
               self.employeeRelationComment(getTranslation("employeeGrievance.employeeRelationComment"));
               self.employeeRelationStatus(getTranslation("employeeGrievance.employeeRelationStatus"));
               self.headofHRComment(getTranslation("employeeGrievance.headofHRComment"));
               self.headofHRStatus(getTranslation("employeeGrievance.headofHRStatus"));
               self.notifyUpdateEscalate (getTranslation("employeeGrievance.notifyUpdateEscalate"));
               self.notifyUpdateSolved (getTranslation("employeeGrievance.notifyUpdateSolved"));
               self.notifyUpdateForceClose(getTranslation("employeeGrievance.notifyUpdateForceClose"));
               self.notifyUpdateClose(getTranslation("employeeGrievance.notifyUpdateClose"));
            }
            //---------------------Date comperison ----------------------------
        
    }

    return new editEmployeeGrievanceModel();
});