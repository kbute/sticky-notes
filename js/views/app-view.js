var app = app || {};

(function(){
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '.main-app',
		events: {
			'click button.create-note': 'newNote',
			'dragstart .content': 'dragStart',
			'dragover .content': 'dragOver',
			'drop .content': 'dragDrop',
			'dragend .content': 'dragEnd'
		},
		initialize: function () {
			this.$content = this.$('.content');

			this.listenTo(app.notes, 'add', this.createNote);
			this.listenTo(app.notes, 'reset', this.allNotes);
			this.listenTo(app.notes, 'note:flip', this.unflipSiblings);
			this.listenTo(app.notes, 'note:dragging', this.setDraggingNote);

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
console.log('addNote',note);
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

				//prevent transition on dragging
				this.dragItem.css('transition','unset');
				event.originalEvent.dataTransfer.setData("text/plain", (left.replace(/auto/,0).replace(/px/,'') - event.clientX) + ',' + (top.replace(/auto/,0).replace(/px/,'') - event.clientY));
			}
		},
		dragOver: function (event) {
			event.preventDefault(); 
			return false; 
		},
		dragDrop: function (event) {
			console.log('dragDrop');
			if($(event.target)){
				var offset = event.originalEvent.dataTransfer.getData("text/plain").split(','),
				left = (event.clientX + parseInt(offset[0],10)) + 'px',
				top = (event.clientY + parseInt(offset[1],10)) + 'px';
				this.dragItem.css('left', left);
				this.dragItem.css('top', top);

//				this.dragItem.model.save({posx: left, posy: top});

				event.preventDefault();
				return false;
			}
		},
		dragEnd: function (event) {
		},
		setDraggingNote: function (note) {
		},
		unflipSiblings: function (note) {
			app.notes.forEach(function (item, i) {
				if(note != item) {
					item.trigger('note:unflip');
				}
			})
		}
	})	
})();