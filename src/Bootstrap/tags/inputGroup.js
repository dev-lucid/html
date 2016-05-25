lucid.html.bootstrap.tags.inputGroup = function(){
	lucid.html.tag.call(this);
	this.tag = 'div';
	this.addClass('input-group');
};
lucid.html.bootstrap.tags.inputGroup.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.inputGroup = lucid.html.bootstrap.tags.inputGroup;

lucid.html.bootstrap.tags.inputGroup.prototype.add=function(child){
    if (typeof(child) == 'object') {
        if (child.tag == 'input' || child.tag == 'select' || child.tag == 'textarea') {
            lucid.html.tag.prototype.add.call(this, child);
        } else if (child.tag == 'button' || (child.tag == 'a' && child.hasClass('btn') === true)) {
            lucid.html.tag.prototype.add.call(this, '<span class="input-group-btn">');
            lucid.html.tag.prototype.add.call(this, child);
            lucid.html.tag.prototype.add.call(this, '</span>');
        } else {
            lucid.html.tag.prototype.add.call(this, '<span class="input-group-addon">');
            lucid.html.tag.prototype.add.call(this, child);
            lucid.html.tag.prototype.add.call(this, '</span>');
        }
    } else {
        lucid.html.tag.prototype.add.call(this, '<span class="input-group-addon">');
        lucid.html.tag.prototype.add.call(this, child);
        lucid.html.tag.prototype.add.call(this, '</span>');
    }
    return this;
};