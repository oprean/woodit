define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/modals/plaque-edit.html',
  'backbone.modal',
], function($, _, Backbone, Constants, editPlaqueTpl){
	var EditPlaqueView = Backbone.Modal.extend({
		template: _.template(editPlaqueTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			this.realModel = this.model;
			this.model = this.realModel.clone();
		},
		
		templateHelpers : function() {
			return {
				woodTypes : Constants.woodTypes 
			};
		},
		
		onShow : function() {
			Backbone.Validation.bind(this);
		},

		fillModel : function(model) {
			model.set({
				wood : $('#wood').val(),
				image : $('#image').val(),
				title : $('#title').val(),
				width : $('#width').val(),
				height : $('#height').val(),
			});
		},
		
		beforeSubmit : function() {
			this.fillModel(this.model);
			return this.model.isValid(true);
		},
		
		submit: function() {
			this.fillModel(this.realModel);
		}				
	});

	return EditPlaqueView;
});