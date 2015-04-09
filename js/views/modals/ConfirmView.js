define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/plaque-edit.html'
], function($, _, Backbone, Constants, editPlaqueTpl){
	var ConfirmView = Backbone.Modal.extend({
		template: _.template(editPlaqueTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			this.model.set({woodTypes : Constants.woodTypes });
			this.realModel = this.model;
			this.model = this.realModel.clone();
		},
		
		onShow : function() {
			Backbone.Validation.bind(this);
		},

		fillModel : function(model) {
			model.set({
				wood : $('#wood').val(),
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

	return ConfirmView;
});