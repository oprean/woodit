define([
  'jquery',
  'underscore',
  'backbone',
  'models/WProduct',
  'layouts/ProductsGridLayout',
  'modules/Constants',
  'text!templates/save.html'
], function($, _, Backbone, WProduct, ProductsGridLayout, Constants, saveTpl){
	var SaveView = Backbone.Modal.extend({
		template: _.template(saveTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			console.log('save product to parse');
		},
		
		onShow : function() {
			var self = this;
			Backbone.Validation.bind(this);
			html2canvas($('#product-container'), {
				onrendered: function(canvas) {         	
					var scale = (100 * Constants.thumbSize) / Math.max(canvas.width, canvas.height);
					var tw = (canvas.width * scale) / 100;
					var th = (canvas.height * scale) / 100;
					var thumbCanvas = document.createElement("canvas");
					
					thumbCanvas.setAttribute('width',tw);
					thumbCanvas.setAttribute('height',th);
					var ctx = thumbCanvas.getContext('2d');
					ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,tw,th);
					self.$('.thumb').attr('src',thumbCanvas.toDataURL());
				},
			});
		},
		
		beforeSubmit : function() {
			this.model.set({
				name: this.$('#name').val(),
				description: this.$('#description').val(),
				author: Parse.User.current().get('username'),
			});
		},
		
		submit: function() {
			console.log('save product to parse');
			var product = new WProduct();
			product.save({
				author : this.model.get('author'),
				date : moment().format('MMMM Do YYYY h:mm:ss a'),
				name : this.model.get('name'),
				description : this.model.get('description'),
				thumb : this.$('.thumb').attr('src'),
				blueprint: JSON.stringify(this.model.toJSON())
			}, {
				success: function(object) {
				console.log('product sucessfully saved to parse');
			},
				error: function(model, error) {
				console.log(error);
			}});
		}				
	});

	return SaveView;
});