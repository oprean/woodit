define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/Plaque',
  'models/Column',
  'models/Header',
  'models/Item',
  'collections/Columns',
  'collections/Items',
  'text!templates/layouts/calendar-layout.html',
  'views/PlaqueView',
  'views/ColumnsView',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, Plaque, Column, Header, Item, Columns, Items, calendarLayoutTpl, PlaqueView, ColumnsView, Constants, vent){
  var CalendarLayout = Backbone.Marionette.LayoutView.extend({
	template : _.template(calendarLayoutTpl),
	regions : {
		plaque : '#plaque-container',
		columns : '#columns-container'
	},
	
	initialize : function(options) {
		var self = this;
		//console.log('init calendar layout');
		this.model = options.calendarData;	
		console.log(this.model);
		if (this.model.cid === undefined || 
			(this.model.cid !== undefined && 
			this.model.get('plaque').cid === undefined)) {
			this.buildModel();
		} 

		this.plaqueView = new PlaqueView({
			dataModel : this.model
		});
		this.columnView = new ColumnsView({
			dataModel : this.model
		});
		
		this.listenTo(vent, 'plaque.width', function(width){
			this.$('#columns-container').css('width', width * Constants.scale);
		});
	},

	buildModel : function() {
		//console.log('build calendar model');
		if (this.model.get('plaque').cid === undefined) {
			var plaqueData = this.model.get('plaque');
			//console.log(plaqueData); 
			this.model.set({'plaque' : new Plaque(plaqueData)});
		}
		if (this.model.get('columns').cid === undefined) {
			var columnsData = this.model.get('columns');
			var columns = new Columns();
			console.log(columnsData);
			_.each(columnsData, function(column){
				var items = new Items();
				_.each(column.items, function(item){
					items.add(new Item(item));
				});
				var column = new Column({
					header : new Header(column.header),
					items : items
				});
				columns.add(column);				
			}); 
			this.model.set({'columns' : columns});
		}
	},
	
	onBeforeShow : function() {
		this.showChildView('plaque', this.plaqueView);
		this.showChildView('columns', this.columnView);
	},
  });

  return CalendarLayout;
});