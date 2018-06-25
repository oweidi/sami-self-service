/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain', 'ojs/ojknockout','ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojbutton'],
 function(oj, ko, $) {
  
    function AboutViewModel() {
         
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

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
      self.handleActivated = function(info) {
        // Implement if needed
      };
      ChartModel();
function ChartModel() {
       //var self = this;
        self.threeDValue = ko.observable('on');
        self.orientationValue = ko.observable('vertical');
        
        /* chart data */
        var funnelSeries = [{name: "Series 1", items: [42]},
                            {name: "Series 2", items: [55]},
                            {name: "Series 3", items: [36]},
                            {name: "Series 4", items: [22]},
                            {name: "Series 5", items: [22]}];
        self.funnelSeriesValue = ko.observableArray(funnelSeries);
        
        /* toggle buttons*/
        self.threeDOptions = [
            {id: '2D', label: '2D', value: 'off', icon: 'oj-icon demo-2d'},
            {id: '3D', label: '3D', value: 'on', icon: 'oj-icon demo-3d'}
        ];
        self.orientationOptions = [
            {id: 'vertical', label: 'vertical', value: 'vertical', icon: 'oj-icon demo-funnel-vert'},
            {id: 'horizontal', label: 'horizontal', value: 'horizontal', icon: 'oj-icon demo-funnel-horiz'}
        ];
    }
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
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
      self.handleDetached = function(info) {
        // Implement if needed
      };
      
      self.currentStepValue = ko.observable('stp1');
		self.stepArray = 
		  ko.observableArray(
			  [{label:'Step One', id:'stp1'},
				 {label:'Step Two', id:'stp2'},
				 {label:'Step Three', id:'stp3'},
				 {label:'Step Four', id:'stp4'}, 
				 {label:'Step Five', id:'stp5'}]);
                             
     self.currentStepValueText = function() {
		return "Review";
	};
                             
    }
   	


    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new AboutViewModel();
  }
);
