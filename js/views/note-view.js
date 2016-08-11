var app = app || {};

(function ($){
	'use strict';

	app.NoteView = Backbone.View.extend({
		tagName: 'div',
		className: 'sticky-note-container',
		template: _.template($('#note-template').html()),
		events: {
			'click .front': 'openNote',
			'click .delete': 'deleteNote',
			'keypress .text': 'closeNote',
			'keydown .close': 'closeNote',
			'click .close': 'closeNote',
			'click .back': 'closeNote'
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
			var win = $(window),
			winHeight = win.height(),
			winWidth = win.width();

			this.$el.addClass('flip');

			this.translateToMiddle();

			this.$textarea.focus();
		},
		deleteNote: function () {
			this.model.destroy();
		},
		closeNote: function () {
			this.model.save({note: this.$textarea.val()});
			
			//transition back to original position
			this.translate(0, 0);

			this.$el.removeClass('flip');
		},
		translate: function(x,y) {
			console.log(x,y);
			this.$el.css({
				'transform': 'translate(' + x + 'px,' + y + 'px)'
			});
		},
		getDOMInfo: function () {
			var win = $(window),
			offset = this.$el.offset();

			return {
				winHeight: win.height(),
				winWidth: win.width(),
				originalX: this.model.get('posx'),
				originalY: this.model.get('posy'),
				elWidth: this.$el.width(),
				elHeight: this.$el.height(),
				currentX: offset.left,
				currentY: offset.top
			}
		},
		translateToMiddle: function () {
			var info = this.getDOMInfo(),
			midx,
			midy,
			x,
			y;

			midx = (info.winWidth/2) - (info.elWidth/2);
			midy = (info.winHeight/2) - (info.elHeight/2);

			x = midx - info.originalX;
			y = midy - info.originalY;

			this.translate(x,y);
		}
	})
})(jQuery);