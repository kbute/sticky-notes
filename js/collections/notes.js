var app = app || {};

(function(){
	'use strict';

	var Notes = Backbone.Collection.extend({
		model: app.Note,
		localStorage: new Backbone.LocalStorage('sticky-notes')
	});

	app.notes = new Notes();
})();