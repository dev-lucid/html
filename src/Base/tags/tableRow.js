lucid.html.base.tags.tableRow = function(){
	lucid.html.tag.call(this);
	this.tag = 'tr';
};
lucid.html.base.tags.tableRow.prototype = Object.create(lucid.html.tag.prototype);
lucid.html.builder.tags.tableRow = lucid.html.base.tags.tableRow;

lucid.html.base.tags.tableRow.prototype.checkValidChild=function(child){
	if (['th', 'td'].indexOf(child.tag) < 0) {
		throw 'Invalid child. Tag tr only allows these tags as children: th, td';
	}
};