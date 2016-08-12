var app = app || {};

(function ($){
	'use strict';

	app.NoteView = Backbone.View.extend({
		tagName: 'div',
		className: 'sticky-note-container',
		template: _.template($('#note-template').html()),
		events: {
			'dragstart': 'dragStart',
			'dblclick .front': 'flipNote',
			'click .delete': 'deleteNote',
			'keypress .text': 'closeNote',
			'click .back': 'flipNote',
			'click textarea': 'editNote',
			'blur textarea': 'saveNote'
		},
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'note:unflip', this.unflipNote);

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
		editNote: function () {
			this.$textarea.focus();
		},
		saveNote: function () {
			this.model.save({note: this.$textarea.val()});
		},
		openNote: function () {
			

			this.$textarea.focus();
		},
		deleteNote: function () {
			this.model.destroy();
		},
		flipNote: function () {
			
			if(!this.$el.hasClass('flip')) {
				this.$el.attr('draggable','false');
				this.model.trigger('note:flip');
				this.translateToCenterScreen();
			} else {
				this.unflipNote();
			}
			
		},
		unflipNote: function () {

			if(this.$el.hasClass('flip')) {

				this.$el.attr('draggable', 'true');

				//transition back to original position
				this.translate(0,0);
			}
		},
		translate: function(x,y) {
			console.log(x,y);
			this.$el.css({
				'transition': '1s',
				'transform': 'translate(' + x + 'px,' + y + 'px)'
			}).toggleClass('flip');
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
		translateToCenterScreen: function () {
			var info = this.getDOMInfo(),
			midx,
			midy,
			x,
			y;

			midx = (info.winWidth/2) - (info.elWidth/2);
			midy = (info.winHeight/2) - (info.elHeight/2);

			x = midx - info.currentX;
			y = midy - info.currentY;

			this.translate(x,y);
		},
		dragStart: function () {
			this.model.trigger('note:dragging');
		}
	})
})(jQuery);