define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper', 'config/services',
'notifyjs', 'promise', 'ojs/ojinputtext', 'ojs/ojcollectiontabledatasource', 'ojs/ojdialog',
'ojs/ojinputnumber', 'ojs/ojtable', 'ojs/ojarraytabledatasource', 'ojs/ojdatetimepicker', 
'ojs/ojpagingcontrol', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox',
'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup',
'ojs/ojknockout-validation'],
function (oj, ko, $, app, common, services) {

    function ReviewNotificationsViewModel() {
        var self = this;
        this.data = ko.observableArray([]);
        this.dataSource = ko.observable();
        this.selectedRowKey = ko.observable();
        var employee_person_number = '';
        self.tracker = ko.observable();
        self.BTArea= ko.observable();
        self.typeSelectedValue = ko.observable();
        self.countrySelectedValue = ko.observable();
        self.accomSelectedValue = ko.observable();
        self.transSelectedValue = ko.observable();
        self.foodSelectedValue = ko.observable();
        self.selfServiceURL = ko.observable();
        self.requesterName = ko.observable();
        self.showButton = ko.observable(true);
         self.rejectRessone = ko.observable("");
         self.disableSubmit = ko.observable(false);
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        self.AllowadvAmount= ko.observable("");
       self.isAllowadvAmount= ko.observable(true);
       self.checkValues= ko.observableArray([{"values":"Yes"},{"values":"NO"}]);
       self.comment = ko.observable("");
       self.toCityLbl= ko.observable("");
       self.fCityLbl= ko.observable("");
         $(document).ajaxComplete(function (event, xhr, settings) {
            $(".se-pre-con").fadeOut("slow");;
        });
        var getApprove = function (data) {
            if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
                if (rootViewModel.personDetails().positionName() === 'Assistant Manager - C&B') {
                      var eName = "Business Mission Assignment";
                    var tso = $("#tso").val();
                   // var sourceSystemId = employee_person_number + "_BTRIPADVANCE_" + tso;  
                    //btripId
                     var btripId = rootViewModel.selectedTableRowKeyNotifiation();
                      var sourceSystemId = btripId; 
                      if(self.typeSelectedValue()=="TBT"){
                          eName = "Training Business Mission Assignment";
                      }
                      
                    var jsonBody = {
                        personNumber : employee_person_number,
                        elementName :eName, 
                        legislativeDataGroupName : "SA Legislative Data Group", 
                        assignmentNumber : "E" + employee_person_number, 
                        entryType : "E", 
                        creatorType : "H", 
                        sourceSystemId : sourceSystemId, 
                        trsId : btripId,
                        SSType : "BT",
                        BTType : self.typeSelectedValue(),
                        BTArea :self.BTArea(),
                        BTFood :self.foodSelectedValue(),
                        BTHousing: self.accomSelectedValue(),
                        BTTransportation: self.transSelectedValue(),
                        BTDuration :self.noDays(),
                        BTID:btripId
    
                    };
                    var submitElement = function (data1) {
                    };
                
                    services.submitElementEntry(JSON.stringify(jsonBody)).then(submitElement, app.failCbFn);
                    
                    
                   
                    var ticketamount = $("#ticketAmount").val();
                    var pnr = $("#pnr").val();
    
                    var updaeJson = {
                        "ticketamount" : ticketamount, "pnr" : pnr, "id" : btripId
                    };
                    
                    var editBusinessTripCbFn = function (data1) {
                        $.notify(self.updateRequest(), "success");
                        oj.Router.rootInstance.go('notifications');
                    };
                     services.editBusinessTrip( JSON.stringify(updaeJson)).then(editBusinessTripCbFn, app.failCbFn);
                }
                rootViewModel.getNoOfNotifications();
                $.notify(self.requestApprove(), "success");
                //rootViewModel.sendNotification(data.NEXT_ROLE_ID,null,'FYA','BT');
                
                oj.Router.rootInstance.go('notifications');
            }
        };

        var getReject = function (data) {
        if (data.STATUS != 'Success') {
                 oj.Router.rootInstance.go('notifications');
                 $.notify(self.adminNotify(), "error");
                
            } else {
                rootViewModel.getNoOfNotifications();
                $.notify(self.requestReject(), "error");
    
                oj.Router.rootInstance.go('notifications');
            }
        };

        self._showComponentValidationErrors = function (trackerObj) {
            trackerObj.showMessages();
            if (trackerObj.focusOnFirstInvalid())
                return false;

            return true;
        };
        this.approveBusinessTrip = function () {

                  self.disableSubmit(true);
            var btripId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_TITLE" : "Business trip", "MSG_BODY" : "Request business trip", "TRS_ID" : btripId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "APPROVED","ssType" : "BT"
            };
        
            services.workflowAction(headers).then(getApprove, app.failCbFn);
            
            return true;
        }

        this.rejectBusinessTrip = function () {
                
                if (!self.rejectRessone())
                {
                 $.notify("Add Ressone", "error");
                  return;
                }
                 self.disableSubmit(true);
            var btripId = rootViewModel.selectedTableRowKeyNotifiation();
            var headers = {
                "MSG_BODY" : "MSG_BODY_MANAGER", "MSG_TITLE" : "MSG_TITLE_MANAGER", "TRS_ID" : btripId, "PERSON_ID" : rootViewModel.personDetails().personId(), "RESPONSE_CODE" : "REJECTED","ssType" : "BT"
            };

            services.workflowAction(headers).then(getReject, app.failCbFn);
            return true;
        }
        this.submitButton = function () {
          var trackerObj = ko.utils.unwrapObservable(self.tracker);
            if (!this._showComponentValidationErrors(trackerObj)) {
                return;
            }
            document.querySelector("#yesNoDialog").open();
        };

        this.cancelButton = function () {
            document.querySelector("#yesNoDialog").close();
        };

        this.cancelBusinessTrip = function () {
             if(oj.Router.rootInstance._navHistory.length > 1) {
                oj.Router.rootInstance.go(oj.Router.rootInstance._navHistory[oj.Router.rootInstance._navHistory.length-1]);
             }
            return true;
        }
        this.rejectButton = function () {
            document.querySelector("#rejectDialog").open();
        };

        this.rejectCancelButton = function () {
            document.querySelector("#rejectDialog").close();
        };

        self.handleActivated = function (info) {


        };
        //--------------Temp Function To Build BT Types ------------------------
        function builBbusinessTripTypes() {
            self.types([]);
           self.types(rootViewModel.globalTypes());
            
        }
         //--------------Temp Function To Build BT Route ------------------------
        function builBbusinessTripRoute() {
            self.businessTripRoute([]);
           self.businessTripRoute(rootViewModel.globalNadecBTRoute());
        }
           //-----------------Temp Function To Build City ----------------------
         function buildAllCityArray() {
            self.allCityArray([]);
            self.allCityArray.push( {
                country : "SA", City : "Riydh"
            });
            self.allCityArray.push( {
                country : "SA", City : "Jeddah"
            });
            self.allCityArray.push( {
                country : "SA", City : "Haradh project"
            });
            self.allCityArray.push( {
                country : "JO", City : "Amman"
            });
            self.allCityArray.push( {
                country : "BH", City : "Al Manamah"
            });
             self.allCityArray.push( {
                country : "BH", City : "Al Manamah"
            });
             self.allCityArray.push( {
                country : "CA", City : "Candiac"
            });
            
        }
        self.handleAttached = function (info) {
             initTranslations();
             buildAllCityArray();
             self.travelBy( app.getPaaSLookup("Travel_BY"));
            self.types = ko.observableArray();
            builBbusinessTripTypes();
            builBbusinessTripRoute();
            self.country = ko.observableArray(rootViewModel.globalCountry().slice(0));
            self.yesNo = ko.observableArray(rootViewModel.globalYesNo().slice(0));

            if (rootViewModel.reviewNotiType() == 'BT') {
                self.selfServiceURL(rootViewModel.selectedTableRowKeyNotifiation());
            }
             services.getBusinessTripById(rootViewModel.selectedTableRowKeyNotifiation()).then(function (btrip){
                self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
                    pattern : 'dd/MM/yyyy'
                }));
                $.each(btrip.items, function (index, val) {
               
                    self.typeSelectedValue(val.type1);
                    if(self.typeSelectedValue=="TBT")
                    {
                      self.isTrainingEvent(true);
                    }
                    else 
                       self.isTrainingEvent(false);
                       
                       
                    self.tripDetails(val.trip_details)
                    self.countrySelectedValue(val.country);
                    self.accomSelectedValue(val.accommodationprovided);
                    self.foodSelectedValue(val.foodprovided);
                    self.transSelectedValue(val.transportationprovided);
                    self.city(val.city);
                    self.empLoc(val.employeelocation);
                    self.requesterName(val.name);
                    self.selectedTravelBy(val.travel_by)
                    var evalStartDate = new Date(val.startdate.split('/')[2] + "/" + val.startdate.split('/')[1] + "/" + val.startdate.split('/')[0]);
                    evalStartDate.setDate(evalStartDate.getDate() + 1);
                    var evalEndDate = new Date(val.enddate.split('/')[2] + "/" + val.enddate.split('/')[1] + "/" + val.enddate.split('/')[0]);
                    evalEndDate.setDate(evalEndDate.getDate() + 1);
                    self.startDate(evalStartDate.toISOString());
                    self.endDate(evalEndDate.toISOString());
                    self.daysBefore(val.daysbefore);
                    self.daysAfter(val.daysafter);
                    self.noDays(val.numberofdays);
                    self.perDiems(val.perdiem);
                    self.totAmount(val.totalamount);
                    self.ticketClass(val.ticketclass);
                    self.ticketAmount(val.ticketamount);
                    self.tso(val.tso);
                     self.toCityLbl(val.to_city_lbl);
                      self.fCityLbl(val.from_city_lbl);
                    self.selectedBusinessTripRoute(val.route);
                    if (self.selectedBusinessTripRoute() == "L") {
                       
                        self.FromDestinationArray([]);
                        self.selectedCountry("SA");
                        self.FromDestinationArray(rebuildCity('SA', self.FromDestinationArray()));
                        self.selectedCountryFrom(val.from_country);
                      //  self.toDestinationArray(rebuildCity('SA', self.toDestinationArray()));

                    }
                    else {
                       
                        self.FromDestinationArray([]);
                        self.FromDestinationArray(rootViewModel.globalCountry().slice(0));
                        self.selectedCountryFrom(val.from_country);
                    }
                    self.advAmount(val.advanceamount);
                    self.selectedBusinessTripExtension(val.extension);
                     self.AllowadvAmount(val.allowadvamount);
                    employee_person_number = val.person_number;
                    var preview = document.querySelector('.attClass');
                    preview.src = val.image_base64;
                    getArea();
                   
                });
            });
        };
        self.handleDetached = function (info) {
            self.typeSelectedValue('');
            self.countrySelectedValue('');
            self.accomSelectedValue('');
            self.transSelectedValue('');
            self.foodSelectedValue('');
            self.selfServiceURL('');
            self.requesterName('');
              self.disableSubmit(false);
        };

        var managerId = rootViewModel.personDetails().managerId();
        self.selectedBusinessTripExtension= ko.observable("");
        var personId = rootViewModel.personDetails().personId();
        self.isTrainingEvent =  ko.observable(false);
        self.selectedTravelBy = ko.observable("");
        self.trainEvent = ko.observable("");
        this.selected = ko.observable('stp1');
        this.empLoc = ko.observable("");
        this.city = ko.observable("");
        this.daysBefore = ko.observable("");
        this.daysAfter = ko.observable("");
        this.noDays = ko.observable("");
        this.perDiems = ko.observable("");
        this.totAmount = ko.observable(0);
        this.ticketAmount = ko.observable("");
        this.ticketClass = ko.observable("");
        this.tso = ko.observable("");
        this.pnr = ko.observable("");
        this.advAmount = ko.observable("");
        this.val = ko.observable("");
        this.startDate = ko.observable();
        this.selectedCountry = ko.observable("");
        this.selectedAcomProvided = ko.observable("");
        this.selectedFoodProvided = ko.observable("");
        this.selectedTransProvided = ko.observable("");
        this.selectedType = ko.observable("");
        this.selectedStartDate = ko.observable("");
        this.selectedEndDate = ko.observable("");
        self.tripDetails =  ko.observable(" ");
        this.selectedDayBefore = ko.observable("");
        this.selectedDayAfter = ko.observable("");
        self.selectedBusinessTripRoute = ko.observable("");
        this.endDate = ko.observable();
        this.componentRequired = ko.observable(true);
        self.selectedCountryFrom = ko.observable("");
        self.isDisabled = ko.observable(true);
        self.allCityArray = ko.observableArray([]);
        this.types = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.yesNo = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.country = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.travelBy = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        this.businessTripRoute = ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
      self.FromDestinationArray= ko.observableArray([
        {
            "value" : '', "label" : ''
        }
]);
        

        self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));

        self.commitRecord = function (data, event) {
            editRecord();
            return true;
        }
        //language support =========================
           self.next = ko.observable();
            self.yes = ko.observable();
            self.no = ko.observable();
            self.submit = ko.observable();
            self.back = ko.observable();
            self.cancel = ko.observable();
            self.requestDate = ko.observable();
            self.hireDate = ko.observable();
            self.employeeLocation= ko.observable();
            self.citylbl= ko.observable();
            self.startdate= ko.observable();
            self.enddate= ko.observable();
            self.daysbefore= ko.observable();
            self.create= ko.observable();
            self.review= ko.observable();
            self.confirmMessage= ko.observable();
            self.editMessage= ko.observable();
            self.daysafter= ko.observable();
            self.nodays= ko.observable();
            self.accomodationProvided= ko.observable();
            self.tranportationProvided= ko.observable();
            self.foodProvided= ko.observable();
            self.preDiem= ko.observable();
            self.totalamount= ko.observable();
            self.ticketclass= ko.observable();
            self.ticketamount= ko.observable();
            self.tsolbl= ko.observable();
            self.PNRlbl= ko.observable();
            self.advanceAmount= ko.observable();
            self.type = ko.observable();
            self.countrylbl = ko.observable();
            self.overLapMessage = ko.observable();
            self.reviewBusinessTrip = ko.observable();
            self.approve = ko.observable();
            self.reject = ko.observable();
            self.rejectMessage = ko.observable();
            self.approveMessage = ko.observable();
            self.adminNotify = ko.observable();
            self.requestReject = ko.observable();
            self.updateRequest = ko.observable();
            self.requestApprove = ko.observable();
            self.trainingEvent= ko.observable();
            self.travelByLbl= ko.observable();
            self.tripDetailsLbl = ko.observable();
            self.businessTripRouteLbl = ko.observable();
            self.fromDestinationLbl = ko.observable();
            self.businessTripExtensionLbl = ko.observable();
             self.tocountryLbl =ko.observable();
            self.citylabel=ko.observable();
             self.fromCityLbl = ko.observable();
            var getTranslation = oj.Translations.getTranslatedString;		
            self.refreshView = ko.computed(function() {
                    if (app.refreshViewForLanguage()) {
                                        initTranslations();
                    }
         });
        function initTranslations() {
          self.submit(getTranslation("others.submit"));
          self.reject(getTranslation("others.reject"));
          self.approve(getTranslation("others.approve"));
          self.yes(getTranslation("others.yes"));
          self.no(getTranslation("others.no"));
          self.back(getTranslation("others.back"));
          self.next(getTranslation("others.next"));
          self.cancel(getTranslation("others.cancel"));
          self.create(getTranslation("labels.create"));
          self.review(getTranslation("others.review"));
          self.confirmMessage(getTranslation("labels.confirmMessage"));
          self.approveMessage(getTranslation("businessTrip.approveMessage"));
          self.rejectMessage(getTranslation("businessTrip.rejectMessage"));
          self.employeeLocation(getTranslation("businessTrip.employeeLocation"));
          self.citylbl(getTranslation("businessTrip.city"));
          self.startdate(getTranslation("labels.startdate"));
          self.enddate(getTranslation("labels.enddate"));
          self.daysbefore(getTranslation("businessTrip.daysbefore"));
          self.daysafter(getTranslation("businessTrip.daysafter"));
          self.nodays(getTranslation("labels.nodays"));
          self.accomodationProvided(getTranslation("businessTrip.accomodationProvided"));
          self.tranportationProvided(getTranslation("businessTrip.tranportationProvided"));
          self.foodProvided(getTranslation("businessTrip.foodProvided"));
          self.preDiem(getTranslation("businessTrip.preDiem"));
          self.totalamount(getTranslation("businessTrip.totamount"));
          self.ticketclass(getTranslation("businessTrip.ticketclass"));
          self.ticketamount(getTranslation("businessTrip.ticketamount"));
          self.tsolbl(getTranslation("businessTrip.tso"));
          self.PNRlbl(getTranslation("businessTrip.pnr"));
          self.advanceAmount(getTranslation("businessTrip.advanceAmount"));
          self.type(getTranslation("labels.type"));
          self.countrylbl(getTranslation("labels.country"));
          self.overLapMessage(getTranslation("businessTrip.overLapMessage"));
          self.reviewBusinessTrip(getTranslation("businessTrip.reviewBusinessTrip"));
          self.requestReject(getTranslation("businessTrip.requestReject"));
          self.adminNotify(getTranslation("labels.adminNotify"));
          self.updateRequest(getTranslation("businessTrip.updateRequest"));
          self.requestApprove(getTranslation("businessTrip.requestApprove"));
          self.trainingEvent(getTranslation("businessTrip.trainingEvent"));
          self.travelByLbl(getTranslation("businessTrip.travelBy"));
          self.tripDetailsLbl(getTranslation("businessTrip.tripDetails"));
          self.businessTripRouteLbl(getTranslation("businessTrip.businessTripRoute"));
          self.fromDestinationLbl(getTranslation("businessTrip.fromDestination"));
          self.businessTripExtensionLbl(getTranslation("businessTrip.businessTripExtension"));
          self.tocountryLbl(getTranslation("businessTrip.toCountry"));
           self.citylabel(getTranslation("businessTrip.toCity"));
            self.fromCityLbl(getTranslation("businessTrip.fromCity"));
        }//added
        
        
        
     function rebuildCity(countryCode ,cityArray)
        { 
             cityArray = [];
           for (var i =0;i<self.allCityArray().length ; i++)
           {
               
              if (self.allCityArray()[i].country == countryCode )
              {
             
                 cityArray.push({value:self.allCityArray()[i].City,
                  label:self.allCityArray()[i].City });
                   
              }
           }
           return cityArray;
            
        }
 var area1 =["AO","BF","BH","BI","BJ","BW","CD","CF","CG","CI","CM","CV","DJ","DZ","EG","EH","ER","ET","GA","GH","GM","GN","GQ","GW","IQ","IR","JO","KE","KM","KW","LB","LR","LS","LY","MA","MG","ML","MR","MU","MV","MW","MZ","NA","NE","NG","OM","PS","QA","RW","SC","SD","SL","SN","SO","ST","SY","SZ","TD","TG","TN","TZ","UG","YE","ZM","ZW"]
var area2=["AD","AE","AI","AL","AM","AN","AT","AX","AZ","BA","BE","BG","BL","BM","BO","BV","BY","CH","CY","CZ","DE","DK","EE","ES","FI","FJ","FO","FR","GB","GG","GI","GL","GP","GR","GS","HR","HU","IE","IM","IO","IS","IT","JE","KI","LI","LT","LU","LV","MC","MD","ME","MK","MT","NL","NO","PF","PL","PT","RE","RO","RS","RU","SE","SI","SJ","SK","SM","TF","TJ","TM","TR","UA","UZ","VA","WF","YT","ZA"]
var area3=["AG","AQ","AR","AS","AU","AW","BB","BR","BS","BZ","CA","CC","CK","CL","CO","CR","CU","CX","DM","DO","EC","FK","FM","GD","GE","GF","GT","GU","GY","HM","HN","HT","JM","KN","KY","LC","MF","MH","MP","MQ","MS","MX","NC","NF","NI","NR","NU","NZ","PA","PE","PG","PM","PN","PR","PW","PY","SB","SH","SR","SV","TC","TK","TO","TT","TV","UM","US","UY","VC","VE","VG","VI","VU"]
var area4=["AF","BD","BN","BT","IN","KG","KH","KZ","LA","LK","MM","NP","PH","PK"]
var area5=["CN","HK","ID","JP","KP","KR","MN","MO","MY","SG","TH","TL","TW","VN","WS"]


function getArea()
{
     if(self.countrySelectedValue()=="SA"){
         self.BTArea('INSIDE SAUDI ARABIA')
			return ;
     }
	for (var i = 0 ; i<area1.length;i++)
	{
		
		if(area1[i]==self.countrySelectedValue()){
			self.BTArea('ARABIAN COUNTRIES & AFRICA')
			return ;
		}
		
	}
	for (var i = 0 ; i<area2.length;i++)
	{
		
		if(area2[i]==self.countrySelectedValue()){
			self.BTArea('EURO & TURKEY & S.AFRICA & UAE')
			return ;
		}
		
	}
	for (var i = 0 ; i<area3.length;i++)
	{
		
		if(area3[i]==self.countrySelectedValue()){
			self.BTArea('N.S.AMERICA,ASUTRALIA,N.ZEALAND')
			return ;
		}
		
	}
	for (var i = 0 ; i<area4.length;i++)
	{
		
		if(area4[i]==self.countrySelectedValue()){
			self.BTArea('SOUTH & MIDDLE ASIA')
			return ;
		}
		
	}
		for (var i = 0 ; i<area5.length;i++)
	{
		
		if(area5[i]==self.countrySelectedValue()){
			self.BTArea('SOUTH EAST ASIA')
			return ;
		}
		
	}
	
	
	
	
} 

    }

    return new ReviewNotificationsViewModel();
});