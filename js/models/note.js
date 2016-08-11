var app = app || {};


(function(){
	'use strict';
	
	app.Note = Backbone.Model.extend({
		defaults: {
			note: '',
			posx: 0,
			posy: 0
		}
	});
})();