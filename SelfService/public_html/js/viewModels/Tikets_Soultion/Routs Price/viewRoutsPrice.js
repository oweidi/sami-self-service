define(['ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox', 'ojs/ojtrain', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojselectcombobox', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojinputnumber', 'ojs/ojpopup', 'ojs/ojknockout-validation'], function (oj, ko, $, postbox) {

    function ViewPersonRulesModel() {
        var self = this;
        self.isVisible=ko.observable(false);

        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        
        
     //-------------This Is  Modele---------------------------
        self.RoutsPriceModel = {
             routeName: ko.observable(),
            startDate: ko.observable(),
           endDate : ko.observable( ),
           ticketClass: ko.observable(),
           ticketPrice: ko.observable(),
           adultPrice:ko.observable(), 
           childPrice: ko.observable(),
            infantPrice: ko.observable(),
            updatedBY: ko.observable(),
            ID: ko.observable()
           };
         //--------------End OF Model--------------------------------     
            
              ko.postbox.subscribe("viewElementObj", function (newValue) {
             
//                            self.personRulesModel.id(newValue.id);
                            self.RoutsPriceModel.routeName(newValue.route_name);
                            self.RoutsPriceModel.startDate(newValue.start_date);
                           self.RoutsPriceModel.endDate(newValue.end_date);
                            self.RoutsPriceModel.ticketClass(newValue.ticket_class);
                            self.RoutsPriceModel.ticketPrice(newValue.ticket__price);
                           self.RoutsPriceModel.adultPrice(newValue.adult_price);
                            self.RoutsPriceModel.childPrice(newValue.child_price);
                            self.RoutsPriceModel.infantPrice(newValue.infant_price);
                            self.RoutsPriceModel.ID(newValue.id);                 

        });
       
            
      self.dateConverter = ko.observable(oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter( {
            pattern : 'dd/MM/yyyy'
        }));        
     

        self.handleActivated = function (info) {
           
            }
        self.handleAttached = function (info) {
        }

       self.backAction = function () {
            oj.Router.rootInstance.go('summaryRoutsPrice');
        }

    }

    return ViewPersonRulesModel;
});