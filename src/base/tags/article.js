lucid.html.base.tags.article = function(){
	lucid.html.tag.call(this);
	this.tag = 'article';
};
lucid.html.base.tags.article.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.base.tags.article.prototype.constructor = lucid.html.base.tags.article;
lucid.html.builder.tags.article = lucid.html.base.tags.article;