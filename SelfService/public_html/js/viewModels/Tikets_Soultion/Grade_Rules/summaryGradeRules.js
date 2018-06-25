define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services', 'knockout-postbox', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog', 'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 'ojs/ojpagingcontrol', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojdialog', 'ojs/ojprogressbar'], function (oj, ko, $, app, commonUtil, services, postbox) {

    function SummaryGradeRules() {
        var self = this;

        self.data = ko.observableArray([]);
        self.dataSource = ko.observable();
        this.dataSourceTB2 = ko.observable();
        this.dataTB2 = ko.observableArray([]);
        self.gradeIndex = ko.observable();
        self.effectiveDate = ko.observable();
        self.selectedRowKey = ko.observable();
        this.gradesObj= ko.observableArray([]);
        self.columnArray = ko.observableArray([]);
        this.editDisabled = ko.observable(true);
        this.viewDisabled = ko.observable(true);
        this.addDisabled =  ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.isVisible = ko.observable(false);
        self.isShown = ko.observable(false);
       
        self.selectedRewardRequest = ko.observable();
        self.selectedIndex = ko.observable();
        self.personNumber = ko.observable(rootViewModel.personDetails().personNumber());
       
        self.mode = ko.observable();
        

        var getRewardRequestCbFn = function (data) {
            if(data.items.length !=0){
                    self.isVisible(true);
                     self.data([]);    
            $.each(data.items, function (index, val) {
                self.data.push( {
                    rowNumberRenderer : (index + 1),
                    grade_name:val.grade_name,
                    start_date : val.start_date, 
                    end_date : val.end_date, 
                    ticket_class:val.ticket_class,
                    allow_encashment_payment : val.allow_encashment_payment, 
                    allow_nationals : val.allow_nationals, 
                    allow_other_rout_when_apply : val.allow_other_rout_when_apply, 
                    max_accrual_carry_over : val.max_accrual_carry_over, 
                    max_age_of_child : val.max_age_of_child, 
                    number_of_spouse_allowed: val.number_of_spouse_allowed, 
                    percentage_of_adult_ticket_pri : val.percentage_of_adult_ticket_pri,
                    percentage_of_child_ticket_pri : val.percentage_of_child_ticket_pri,
                    percentage_of_infant_ticket_pr : val.percentage_of_infant_ticket_pr,
                    percentage_of_ticket_price : val.percentage_of_ticket_price,
                    id : val.id,
                   grade_code:val.GRADE_CODE,
                   grade_id:val.GRADE_ID,
                    //latestResponseCode: val.latest_response_code,self.data.ind( self.gradeIndex());
                    ind: ko.observable("0")
                });
            });
            self.dataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource(self.data, 
            {
                idAttribute : 'id'
            })));
        }  
            else{   
                self.isShown(true);
            }
        };

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'yyyy/MM/dd'
        }));
       this.tableSelectionListener = function (event, data) {
            var dataTable = event.detail;
            var currentRow = dataTable.currentRow;
            if (currentRow!=null)
            {
            if(currentRow['rowKey']){ 
                    self.selectedRowKey(currentRow['rowKey']);
                    selectedRow = self.data()[ currentRow['rowIndex']];
                    self.selectedIndex(currentRow['rowIndex']);
                    self.viewDisabled(false);
                    
                    
                    var latestResponseCode = selectedRow.latestResponseCode;
                    if (!latestResponseCode) {
                        self.editDisabled(false);
                        
                    }
                    else{
                        self.editDisabled(true);
                    }
               }
            }
        }


        //-----------------This Function For Move To Next Page (ADD BUTTON )----------------------------------------
        self.addRwardRequest = function () {
            self.mode('Add');
          
            oj.Router.rootInstance.go('createGradeRules');
        }
        //------------------------End----------------------------------------
         this.editGradeRules = function() 
         {
                if(self.selectedRowKey()) {
                   rootViewModel.selectedTableRowKey(self.selectedRowKey());
                 self.mode('Edit');
                 self.selectedRewardRequest(self.data()[self.selectedIndex()]);
                self.data()[self.selectedIndex()].ind( self.gradeIndex());
                 // self.data.ind( self.gradeIndex());
                oj.Router.rootInstance.go('editGradeRules');    
             }

            }
            
           //---------------This Function For Get Data For Grade ------------------------ 
            self.getGradeRulesRecord = function () {
             self.gradeIndex(self.gradeIndex()[0]);      
            services.getGradeRule(self.gradesObj()[self.gradeIndex()].gradeId,self.effectiveDate).then(getRewardRequestCbFn, app.failCbFn);
            
            } 
            //viewRewardRequest
        this.viewGradeRules = function () {
            if (self.selectedRowKey()) {
                self.mode('View');

                rootViewModel.selectedTableRowKey(self.selectedRowKey());

                self.selectedRewardRequest(self.data()[self.selectedIndex()]);

                oj.Router.rootInstance.go('viewGradeRules');
            }
        }
       
        this.closeDialog = function () {
            $("#modalDialog1").ojDialog("close");
        }

        self.handleDetached = function (info) {
            if (self.mode() == 'Edit') {
           
                ko.postbox.publish("editGradeRulesObj", self.selectedRewardRequest());
            }
           else if (self.mode() == 'View') {
                ko.postbox.publish("viewElementObj", self.selectedRewardRequest());
            }
        };
                var grades = function (data) {
          
            var ind = 0;
            $.each(data.gradeBean, function (index, val) {
                
                self.gradesObj.push( {
                    indexs:ind,
                    activeStatus : val.activeStatus,
                    creationDate : val.creationDate,
                    effectiveEndDate : val.effectiveEndDate,
                    effectiveStartDate : val.effectiveStartDate,
                    gradeCode : val.gradeCode, 
                    gradeId : val.gradeId,
                    gradeName : val.gradeName,
                    lastUpdateDate : val.lastUpdateDate,
                    setId : val.setId
                });
                ind++;

            });
        }

        self.handleActivated = function (info) 
        {
             services.getGrades("x","x","x").then(grades, app.failCbFn);
            
        }
        var testDelete=  function()
        {
      
        };
        
        //------------Delete Button Actions------------------
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };
         this.rejectCancelButton = function () {
            document.querySelector("#rejectDialog").close();
        };
        self.rejectRewaardRequst = function ()
        {
        self.selectedRewardRequest(self.data()[self.selectedIndex()]);

        var deletedItems = {"id":self.selectedRewardRequest().id};
      
        services.deleteGradeRULES( JSON.stringify(deletedItems)).then(testDelete, app.failCbFn);
        self.data.remove( self.selectedRewardRequest());
         document.querySelector("#rejectDialog").close();
        }
        //-----------END--------------------------

        self.handleAttached = function (info) {
            initTranslations();
        
        }
        self.handleDeactivated = function ()
        {
        
          self.data([]);
        }
      
       //language support =========================
            self.addLabel = ko.observable();
            self.editLabel = ko.observable();
            self.viewLabel = ko.observable();          
            self.deleteLabel = ko.observable();
            self.ok = ko.observable();
            self.rowNumber=ko.observable();
            self.startdate=ko.observable();
            self.enddate=ko.observable();
            self.gradeRules=ko.observable();         
            self.deleteMessage=ko.observable();           
            self.confirmMessage = ko.observable();            
            self.yes = ko.observable();  
            self.no = ko.observable();          
            self.search = ko.observable();           
            self.deleteLabel = ko.observable();  
            self.gradeName = ko.observable();
            self.effectivedate = ko.observable();
            self.addFirstRecord=ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;
		
       self.refreshView = ko.computed(function() {
            if (app.refreshViewForLanguage()) {
				initTranslations();
            }
        });
        function initTranslations() {          
            self.deleteLabel(getTranslation("others.delete"));        
            self.deleteLabel(getTranslation("others.delete"));
            self.addLabel(getTranslation("others.add"));
            self.editLabel(getTranslation("others.edit"));
            self.viewLabel(getTranslation("others.view"));
            self.ok(getTranslation("others.ok"));
            self.rowNumber(getTranslation("labels.rowNumber"));
            self.enddate(getTranslation("labels.enddate"));
            self.startdate(getTranslation("labels.startdate"));
            self.gradeRules(getTranslation("gradeRules.gradeRules"));            
            self.deleteMessage(getTranslation("gradeRules.deleteMessage"));         
            self.gradeName(getTranslation("gradeRules.gradeName"));             
            self.effectivedate(getTranslation("gradeRules.effectiveDate"));                                                           
            self.confirmMessage(getTranslation("labels.confirmMessage"));               
            self.yes(getTranslation("others.yes"));
            self.no(getTranslation("others.no"));     
            self.search(getTranslation("others.search"));
            self.addFirstRecord(getTranslation("labels.addFirstRecord"));
            self.columnArray([{"headerText": self.rowNumber(), 
                                           "field": "rowNumberRenderer"},                                         
                            {"headerText":self.startdate(), 
                                           "field": "start_date"}, 
                            {"headerText": self.gradeName(), 
                                           "field": "grade_name"},
                            {"headerText": self.enddate(), 
                                           "field": "end_date"}]); 
      }
    }
    return SummaryGradeRules;
});