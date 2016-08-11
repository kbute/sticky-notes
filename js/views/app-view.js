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
			this.addNote(note);
		},
		allNotes: function () {
			this.$content.html('');
			app.notes.each(this.addNote, this);
		},
		addNote: function (note) {
			var view,
			viewEl,
			offset;

			view = new app.NoteView({model: note});
			viewEl = view.render().el;
			this.$content.prepend(viewEl);

			//get position
			offset = $(viewEl).offset();

			//save position
			note.save({posx: offset.left, posy: offset.top});
			return view;
		}
	})	
})();