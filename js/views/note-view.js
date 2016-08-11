var app = app || {};

(function ($){
	'use strict';

	app.NoteView = Backbone.View.extend({
		tagName: 'div',
		className: 'sticky-notes-container',
		template: _.template($('#note-template').html()),
		events: {
			'click .sticky-note-container': 'openNote',
			'click .delete': 'deleteNote',
			'keypress .text': 'closeNote',
			'keydown .close': 'closeNote',
			'click .close': 'closeNote'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);

			this.$el.attr('draggable',true);
		},
		render: function () {
			//localstorage hack
			// if(this.model.changed.id !== undefined) {
			// 	return;
			// }

			this.$el.html(this.template(this.model.toJSON()));
			this.$textarea = this.$('.front textarea');
			return this;
		},
		openNote: function () {
			this.$el.addClass('flip');
			this.$textarea.focus();
		},
		deleteNote: function () {
			this.model.destroy();
		},
		closeNote: function () {
			this.model.save({note: this.$textarea.val()});
			this.$el.removeClass('flip');
		}
	})
})(jQuery);