define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox','appController', 'config/services', 
'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 
'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], 
function (oj, ko, $, postbox,app,services) {

    function viewEmployeeGrievanceViewModel() {
        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.grievanceTypes =ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
        self.grievanceStatuses = ko.observableArray(rootViewModel.globalGrievanceStatus());
        self.grievanceTypes = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
        self.grievanceStatusList =  ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievanceStatus()));
        self.managerStatuses = ko.observableArray(app.getSaaSLookup(rootViewModel.globalGrievStatusDirectManager()));
        self.headHrStatuses = ko.observableArray(app.getSaaSLookup(rootViewModel.globalHRHeadGRstatus())); 
        self.specialistEdit= ko.observable("");
        self.grievanceReference = ko.observableArray([]);
         ko.postbox.subscribe("GrievanceReferenceObj", function (newValue) {
         
                     self.grievanceReference(newValue);
             });
        ko.postbox.subscribe("GrievanceSpecialist", function (data) {
                 self.specialistEdit(data);
         }); 
        self.grevianceRefVisible = ko.computed(function () {
                if(self.grievanceReference  && self.grievanceReference().length !== 0 ){
                    return true;
                }
                else{
                    return false;
                }
            });
      
        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));
        

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
          
        ko.postbox.subscribe("viewEmployeeGrievanceObj", function (newValue) {
            setModel (newValue);
            
        });
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
            
         }
        
        self.handleActivated = function (info) {
      if (rootViewModel.selectedTableRowKeyNotifiation())
          {//getEmployeeGrievanceByID
           var getEmployeeGrievanceFn = function (data) {
           
           setModel(data.items[0]);
           }
            
             services.getEmployeeGrievanceByID(rootViewModel.selectedTableRowKeyNotifiation()).then(getEmployeeGrievanceFn, app.failCbFn);
          }
        }
        
        self.handleAttached = function (info) {
            initTranslations();
        }
        
        self.handleDetached = function (info) {
          clearContent();
        };

        self.backAction = function () {
           if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
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
        }
 //language support =========================
            self.back= ko.observable();
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
            var getTranslation = oj.Translations.getTranslatedString;
		
        self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
            function initTranslations() {
               self.headHrStatuses(app.getSaaSLookup(rootViewModel.globalHRHeadGRstatus()));
            //   self.headHrStatuses(app.getSaaSLookup(rootViewModel.globalHRHeadGRstatus()));
             //  self.employeeGrievanceModel.headHrCommentStatus(self.employeeGrievanceModel.headHrCommentStatus());              
               self.grievanceTypes(app.getSaaSLookup(rootViewModel.globalGrievanceType()));
               self.grievanceStatusList(app.getSaaSLookup(rootViewModel.globalGrievanceStatus()));
              self.managerStatuses(app.getSaaSLookup(rootViewModel.globalGrievStatusDirectManager()));
               self.back(getTranslation("others.back"));
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
            }
    }

    return viewEmployeeGrievanceViewModel;
});