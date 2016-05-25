lucid.html.bootstrap.tags.card = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.header = null;
	this.footer = null;
	this.addClass('card');
};
lucid.html.bootstrap.tags.card.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.card = lucid.html.bootstrap.tags.card;

lucid.html.bootstrap.tags.card.prototype.getHeader=function(){
    if (this.header === null) {
        this.header = this.build('cardHeader');
    }
    return this.header;
};

lucid.html.bootstrap.tags.card.prototype.setHeader=function(newValue){
    var header = this.get('header');
    header.children = [];
    header.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.getFooter=function(){
    if (this.footer === null) {
        this.footer = this.build('cardFooter');
    }
    return this.footer;
};

lucid.html.bootstrap.tags.card.prototype.setFooter=function(newValue){
    var footer = this.get('footer');
    footer.children = [];
    footer.add(newValue);
    return this;
};

lucid.html.bootstrap.tags.card.prototype.preChildren=function(){
    if (this.header !== null) {
        this.preChildrenHtml += String(this.header.render());
    }
    if (this.footer !== null) {
        this.postChildrenHtml += String(this.footer.render());
    }
    return lucid.html.tag.prototype.preChildren.call(this);
};
