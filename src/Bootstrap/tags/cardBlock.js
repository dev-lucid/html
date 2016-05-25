lucid.html.bootstrap.tags.cardBlock = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.title = null;
	this.subtitle = null;
	this.addClass('card-block');
};
lucid.html.bootstrap.tags.cardBlock.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.cardBlock = lucid.html.bootstrap.tags.cardBlock;

lucid.html.bootstrap.tags.cardBlock.prototype.getTitle=function(){
    if (this.title === null) {
        this.title = this.build('cardTitle');
    }
    return this.title;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setTitle=function(newValue){
    var title = this.get('title');
    title.children = [];
    title.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.getSubtitle=function(){
    if (this.subtitle === null) {
        this.subtitle = this.build('cardSubtitle');
    }
    return this.subtitle;
};

lucid.html.bootstrap.tags.cardBlock.prototype.setSubtitle=function(newValue){
    var subtitle = this.get('subtitle');
    subtitle.children = [];
    subtitle.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.cardBlock.prototype.preChildren=function(){
    if (this.title !== null) {
        this.preChildrenHtml += String(this.title.render());
    }
    if (this.subtitle !== null) {
        this.preChildrenHtml += String(this.subtitle.render());
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};
