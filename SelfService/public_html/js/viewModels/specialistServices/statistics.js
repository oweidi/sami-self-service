define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'util/commonhelper','config/services', 'knockout-postbox', 'knockout-mapping', 'ojs/ojchart'],

    function(oj, ko, $, app, commonUtil, services,postbox,km) {

        function statisticsModel () {
            var self = this;
           
self.threeDValue = ko.observable('off');
        
        var getApprovalList = function (data) {
               console.log(data);
                    
        };  
        services.getReport('xx').then(getApprovalList, app.failCbFn);
        /* chart data */
        var pieSeries = [{name: "Rejected", items: [55],color : '#FF0000'},
                         {name: "Approved", items: [70],color : '#078328'},
                         {name: "Pending", items: [36]}];
        this.pieSeriesValue = ko.observableArray(pieSeries);
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        var barSeries = [{name: "Nasir Ali", items: [5, 2]},
                         {name: "Mohammad Ali", items: [1, 3]},
                         {name: "Kareem Al-Dahabi", items: [0, 4]},
                         {name: "Amro Oweidi", items: [4, 0]},
                         {name: "Abdullah Al faris", items: [6, 8]}];
    
        var barGroups = ["Business Trip", "Business Trip Driver"];
   
        self.barSeriesValue = ko.observableArray(barSeries);
        self.barGroupsValue = ko.observableArray(barGroups);
            self.handleActivated = function(info) {

            };

            self.handleAttached = function(info) {
             
                	
            };
            self.handleDetached = function(info) {
               
            
            };
           
     
   
            
        }
        return new statisticsModel ();
    });