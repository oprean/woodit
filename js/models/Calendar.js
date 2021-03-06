 define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'i18n!nls/names',
  'models/Product',
  'models/Plaque',
  'models/Column',
  'models/Header',
  'models/Item',
  'collections/Columns',
  'collections/Items',
  'moment'
], function($, _, Backbone, Constants, names, Product, Plaque, Column, Header, Item, Columns, Items, moment){
	function columnsDefault() {
		var columns = new Columns();
		var months = moment.months();
		_.each(months, function(month){
			var column = new Column({
				header : new Header({title:month}),
				items : new Items()
			});
			columns.add(column);
		});
		
		return columns;
	};
	
	var Calendar = Product.extend({
		defaults : _.extend({},Product.prototype.defaults, {
			plaque : new Plaque({width:320}),
			columns : columnsDefault(),
		}),
		
		initialize : function(options) {
			if (options != undefined && options.init != undefined) {
				console.log(options.init);
				switch(options.init) {
					case 'blank-calendar':
						var columns = new Columns();
						columns.add(new Column({
							header : new Header({title:'_blank_'}),
							items : new Items()
						}));
						this.set({
							name : Constants.quickSaveName, 
							plaque : new Plaque({title:'_blank_', width:null}),
							columns : columns
						}); 
						break;
					case 'month-calendar':
						break;
					case 'random-calendar':
					case 'home-calendar':
						this.randomize(options.init);
						break;
					default:
				}
				this.unset('init');
				delete options.init;
			}
		},
		
		randomColumnItems : function() {
			var items = new Items();
			var firstNames = (names.firstNameFemale + '|' + names.firstNameMale).split('|');
			for(i=0; i<_.random(0, 4);i++) {
				var item = new Item({
					line1: _.random(1, 28),
					line2: firstNames[_.random(0,firstNames.length-1)],
				});
				items.add(item);
			} 
			return items;
		},
		
		randomize : function(type) {
			var self = this;
			moment.locale(app.locale);
			var columns = new Columns();
			var months, width;
			if (type != 'home-calendar') {
				width = 320;
				months = moment.months();
			} else {
				width = 160;
				var startWith = _.random(0, 5);
				months = moment.months().slice(startWith, startWith+6);
			}
			_.each(months, function(month){
				var column = new Column({
					header : new Header({title:month.ucfirst()}),
					items : self.randomColumnItems(type)
				});
				columns.add(column);
			});
			this.set({
				name : Constants.quickSaveName, 
				plaque : new Plaque({width:width}),
				columns : columns
			});			
		}
	});

	return Calendar;
});