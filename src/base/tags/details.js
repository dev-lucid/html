lucid.html.base.tags.details = function(){
	lucid.html.tag.call(this);
	this.tag = 'details';
};
lucid.html.base.tags.details.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.details.prototype.constructor = lucid.html.base.tags.details;
lucid.html.builder.tags.details = lucid.html.base.tags.details;