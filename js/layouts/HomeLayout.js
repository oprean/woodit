define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/layouts/home-layout.html',
  'modules/Constants',
  'modules/Utils',
  'modules/Events',
], function($, _, Backbone, Marionette, homeLayoutTpl, Constants, Utils, vent){
  var HomeLayout = Backbone.Marionette.LayoutView.extend({
	template : _.template(homeLayoutTpl),
	regions : {
		gallery : '.gallery-container',
	},
	
	initialize : function() {
	},

	onBeforeShow : function() {
	},
  });

  return HomeLayout;
});