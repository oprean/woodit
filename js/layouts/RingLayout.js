define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/Ring',
  'text!templates/layouts/ring-layout.html',
  'views/ring/RingView',
  'views/ring/OptionsView',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, Ring, ringLayoutTpl, RingView, OptionsView, Constants, vent){
  var RingLayout = Backbone.Marionette.LayoutView.extend({
	template : _.template(ringLayoutTpl),
	regions : {
		ring : '.ring-container',
		//options : '.options-container'
	},
	
	initialize : function(options) {
		var self = this;
		//console.log('init ring layout');
		this.model = options.ringData;	
		console.log(this.model);

		this.ringView = new RingView({
			dataModel : this.model
		});
		/*this.optionsView = new OptionsView({
			dataModel : this.model
		});*/
	},
	
	onBeforeShow : function() {
		this.showChildView('ring', this.ringView);
		//this.showChildView('options', this.optionsView);
	},
  });

  return RingLayout;
});