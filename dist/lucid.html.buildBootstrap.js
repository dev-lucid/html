if (typeof lucid == 'undefined') {
    var lucid = {};
}
lucid.html = {};

lucid.html.build=function(){
    return lucid.html.builder.build.apply(lucid.html.build, lucid.html.build.arguments);
};lucid.html.builder=function(){
    return 'called';
};

lucid.html.builder.tags = {};

lucid.html.builder.build=function(tag){
    var obj;
    if (typeof(lucid.html.builder.tags[tag]) == 'function'){
        obj = new lucid.html.builder.tags[tag]();
        
        var newArgs = [];
        for (var i=1; i<arguments.length; i++) {
            newArgs.push(arguments[i]);
        }
        obj.setProperties(newArgs);
    } else {
        obj = new lucid.html.tag();
        obj.tag = tag;
    }
    return obj;
};

lucid.html.tag = function(){
    this.tag  = null;
    this.instantiatorName = null;

    this.attributes = {};
    this.allowedAttributes = ['id', 'class', 'style', 'hidden', ];
    this.parameters = ['child'];

    this.allowChildren   = true;
    this.allowQuickClose = false;

    this.children = [];
    this.parent   = null;

    this.preHtml  = '';
    this.postHtml = '';
    this.preChildrenHtml  = '';
    this.postChildrenHtml = '';

    this.traits = [];

    this.init();
};

lucid.html.tag.prototype.addTrait=function(){
};

lucid.html.tag.prototype.setProperties=function(params) {
    if (params.length > this.parameters.length) {
        throw 'Too many parameters for construction. Tag '+this.tag+' has the following parameters: '+this.parameters.join(', ');
    }

    for (var i=0;  i<params.length; i++) {
        var property = this.parameters[i];
        if (property == 'child') {
            this.add(params[i]);
        } else {
            this.set(property, params[i]);
        }
    }
};

lucid.html.tag.prototype.set=function(name, value) {
    if (typeof(this['set_'+name]) == 'function') {
        this['set_'+name](value);
    } else {
        this.attributes[name] = value;
    }
    return this;
};

lucid.html.tag.prototype.get=function(name){
    if (typeof(this['get_'+name]) == 'function') {
        return this['get_'+name]();
    } else {
        return this.attributes[name];
    }
};

lucid.html.tag.prototype.init=function(){
};

lucid.html.tag.prototype.render=function(){
    var html = '';
    html += this.preRender();
    html += this.preHtml;
    html += this.renderTagStart();
    html += this.preChildren();
    html += this.preChildrenHtml;
    html += this.renderChildren();
    html += this.postChildrenHtml;
    html += this.postChildren();
    html += this.renderTagEnd();
    html += this.postHtml;
    html += this.postRender();
    return html;
};

lucid.html.tag.prototype.preRender=function(){
    return '';
};

lucid.html.tag.prototype.postRender=function(){
    return '';
};

lucid.html.tag.prototype.preChildren=function(){
    return '';
};

lucid.html.tag.prototype.postChildren=function(){
    return '';
};


lucid.html.tag.prototype.renderChildren=function(whichList){
    var html = '';
    if (arguments.length < 1) {
        whichList = 'children';
    }
    for(var i=0; i<this[whichList].length; i++){
        if (typeof(this[whichList][i]) == 'object') {
            html += this[whichList][i].render();
        } else {
            html += this[whichList][i];
        }
    }
    return html;
};

lucid.html.tag.prototype.add=function(child){
    if (this.setupChild(child, 'add') === true) {
        this.children.push(child);
    }
    return this;
};

lucid.html.tag.prototype.prepend=function(child){
    if (this.setupChild(child, 'prepend') === true) {
        this.children.unshift(child);
    }
    return this;
};

lucid.html.tag.prototype.setupChild=function(child, action){
    if (typeof(action) == 'undefined') {
        action = 'add';
    }
    if (this.allowChildren === false) {
        throw 'Tag '+this.tag+' does not allow children to be added.';
    }

    if ((child instanceof Array) === true) {
        for (var i=0; i<child.length; i++) {
            this[action](child[i]);
        }
        return false;
    } else if (typeof(child) == 'object') {
        this.checkValidChild(child);
        child.parent = this;
    }
    return true;
};

lucid.html.tag.prototype.firstChild = function() {
    return (this.children.length === 0)?null:this.children[0];
};

lucid.html.tag.prototype.lastChild=function() {
    return this.children[this.children.length - 1];
};

lucid.html.tag.prototype.renderTagStart=function(){
    var html = '<'+this.tag;
    for(var key in this.attributes) {
        renderMethod = 'render'+key;
        if (typeof(this[renderMethod]) == 'function') {
            value = this[renderMethod]();
        } else {
            value = this.attributes[key];
        }
        if (typeof(value) != 'undefined' && value !== null) {
            html += ' ' + String(key).replace('_', '-')+'="'+value+'"';
        }
    }


    if (this.allowQuickClose === true && this.children.length === 0) {
        return html += ' />';
    }

    return html+'>';
};

lucid.html.tag.prototype.renderTagEnd=function(){
    if (this.allowQuickClose === true && this.children.length === 0) {
        return '';
    }
    return '</'+this.tag+'>';
};

lucid.html.tag.prototype.paragraph=function(text){
    if (this.allowChildren === false) {
        throw 'Class '+this.tag+' does not support .paragraph() because this class does not support having children.';
    }
    this.add(lucid.html.build('p', text));
    return this;
};lucid.html.tag.prototype.setClass=function(newClass){
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    this.attributes['class'].push(newClass);
    return this;
};

lucid.html.tag.prototype.renderClass=function() {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
    }
    return this.attributes['class'].join(' ');
};

lucid.html.tag.prototype.hasClass=function(classToCheck) {
    if ((this.attributes['class'] instanceof Array) === false) {
        this.attributes['class'] = [];
        return false;
    }
    return (this.attributes['class'].indexOf(classToCheck) >= 0);
};

lucid.html.tag.prototype.addClass=function(classToAdd) {
    if(this.hasClass(classToAdd) === false) {
        this.attributes['class'].push(classToAdd);
    }
    return this;
};

lucid.html.tag.prototype.removeClass=function(classToRemove) {
    if (this.hasClass(classToRemove) === true){
        var newClasses = [];
        for(var i=0; i<this.attributes['class'].length; i++){
            if (this.attributes['class'][i] != classToRemove) {
                newClasses.push(classToRemove);
            }
        }
        this.attributes['class'] = newClasses;
    }

    return this;
};

lucid.html.tag.prototype.toggleClass=function(classToToggle, newState) {
    if(typeof(newState) == 'undefined' || newState === null){
        if (this.hasClass(classToToggle) === true) {
            this.removeClass(classToToggle);
        } else {
            this.addClass(classToToggle);
        }
    } else {
        if(newState === true) {
            this.addClass(classToToggle);
        } else {
            this.removeClass(classToToggle);
        }
    }
    return this;
};

/*
lucid.html.tag.prototype.setStyle=function($new_style) {
    if(isset($this->attributes['style']) === false || is_array($this->attributes['style']) === false)
    {
        $this->attributes['style'] = [];
    }

    $new_style_list = explode(';', trim($new_style));
    foreach($new_style_list as $new_style_pair)
    {
        if($new_style_pair != '')
        {
            list($key, $value) = explode(':', $new_style_pair);
            $key = strtolower(trim($key));
            $value = trim($value);
            $this->attributes['style'][$key] = $value;
        }
    }
    return $this;
}

lucid.html.tag.prototype.renderStyle=function() {
    $css = '';
    foreach($this->attributes['style'] as $key=>$value)
    {
        if(is_null($value) === false)
        {
            $css .= $key.':'.$value.';';
        }
    }
    return $css;
};

lucid.html.tag.prototype.setHidden=function($val) {
    if ($val !== true && $val !== false)
    {
        throw new \Exception('Attribute hidden only accepts values true or false.');
    }
    $this->attributes['hidden'] = $val;
    return $this;
};

lucid.html.tag.prototype.renderHidden() {
    $val = ($this->attributes['hidden'] === true)?'hidden':null;
    return $val;
};
*/
lucid.html.builder.tags.anchor = function(){
    this.tag = 'a';
    this.parameters = ['href', 'child'];
};
lucid.html.builder.tags.anchor.prototype = new lucid.html.tag();

lucid.html.builder.tags.anchor.prototype.init=function(){
    this.allowedAttributes.push('name');
    this.allowedAttributes.push('target');
};

lucid.html.builder.tags.anchor.prototype.checkValidChild=function(child){
    if (child.tag == 'a') {
        throw 'Anchor cannot contain another anchor';
    }
};
lucid.html.builder.tags.h1 = function(){
    this.tag = 'h1';
};
lucid.html.builder.tags.h1.prototype = new lucid.html.tag();lucid.html.builder.tags.bold = function(){
    this.tag = 'b';
};
lucid.html.builder.tags.bold.prototype = new lucid.html.tag();<?php

lucid.html.tags.alert = function(){
}

lucid.html.tags.alert.prototype.init=function() {

    this.bootstrapModifierPrefix = 'alert';
    this.bootstrapModifiersAllowed = ['primary', 'secondary', 'success', 'info', 'danger', 'warning'];
    this.parameters = ['modifier','title', 'msg'];
    this.autoclose = false;
    this.title = '';

    this.addTrait('bootstrap/traits/pullable', 'bootstrap/traits/modifiable');
    this.tag = 'div';
    this.addClass('alert');
    this.prototype.init();
};


lucid.html.tags.alert.prototype.preRender=function() {
    if (this.title !== '') {
        this.preChildrenHtml = lucid.html.build('strong', this.title);
    }
    return this.prototype.preRender();
};