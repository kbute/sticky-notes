var app = app || {};

(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.main-app',
		events: {
			'click button.create-note': 'newNote'
		},
		initialize: function () {
			this.$content = this.$('.content');

			this.listenTo(app.notes, 'add', this.createNote);
			this.listenTo(app.notes, 'reset', this.allNotes);

			app.notes.fetch({reset: true});
		},
		newNote: function () {
			app.notes.create();
		},
		createNote: function (note) {
			this.addNote(note).openNote();
		},
		allNotes: function () {
			this.$content.html('');
			app.notes.each(this.addNote, this);
		},
		addNote: function (note) {
			var view = new app.NoteView({model: note});
			var viewEl = view.render().el;
			this.$content.append(viewEl);
			return view;
		}
	})	
})();