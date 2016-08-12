var app = app || {};

(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.main-app',
		events: {
			'click button.create-note': 'newNote',
			'dragstart .content': 'dragStart',
			'dragover .content': 'dragOver',
			'drop .content': 'dragDrop'
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
		},
		dragStart: function (event) {
			var left,
			top;

			if($(event.target).hasClass('sticky-note-container')){
				this.dragItem = $(event.target);
				left = this.dragItem.css('left');
				top = this.dragItem.css('top');

				event.originalEvent.dataTransfer.setData("text/plain", (left.replace(/px/,'') - event.clientX) + ',' + (top.replace(/px/,'') - event.clientY));
			}
		},
		dragOver: function (event) {
			event.preventDefault(); 
			return false; 
		},
		dragDrop: function (event) {
		if($(event.target)){
			console.log('in2',event);
			var offset = event.originalEvent.dataTransfer.getData("text/plain").split(',');
			this.dragItem.css('left', (event.clientX + parseInt(offset[0],10)) + 'px');
			this.dragItem.css('top' , (event.clientY + parseInt(offset[1],10)) + 'px');
			event.preventDefault();
			return false;
		}
		}
	})	
})();