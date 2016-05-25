<?php
namespace Lucid\Html\Bootstrap\Tags;

class cardBlock extends \Lucid\Html\Tag
{
	public $tag = 'div';
	public $parameters = ['title', 'subtitle'];
	public $title = null;
	public $subtitle = null;

	public function init()
	{
		$this->addClass('card-block');
		parent::init();
	}

    public function getTitle()
    {
        if (is_null($this->title) === true) {
            $this->title = $this->build('cardTitle');
        }
        return $this->title;
    }

    public function setTitle($newValue)
    {
        $title = $this->get('title');
        $title->children = [];
        $title->add($newValue);
        return $this;
    }
    
    public function getSubtitle()
    {
        if (is_null($this->subtitle) === true) {
            $this->subtitle = $this->build('cardSubtitle');
        }
        return $this->subtitle;
    }
    
    public function setSubtitle($newValue)
    {
        $subtitle = $this->get('subtitle');
        $subtitle->children = [];
        $subtitle->add($newValue);
        return $this;
    }
    
    public function preChildren() 
    {
        if (is_null($this->title) === false) {
            $this->preChildrenHtml .= $this->title->render();
        }
        if (is_null($this->subtitle) === false) {
            $this->preChildrenHtml .= $this->subtitle->render();
        }
        
        return parent::preChildren();
    }
    
    public function add($child)
    {
        if (is_object($child) === false) {
            parent::add($this->build('paragraph')->addClass('card-text')->add($child));
        } else {
            if (
                ($child->tag == 'h3' && $child->hasClass('card-title') === true) || 
                ($child->tag == 'h4' && $child->hasClass('card-title') === true) || 
                ($child->tag == 'h6' && $child->hasClass('card-subtitle') === true) || 
                ($child->tag == 'a' && $child->hasClass('btn') === true) || 
                ($child->tag == 'a' && $child->hasClass('card-link') === true) || 
                ($child->tag == 'p' && $child->hasClass('card-text') === true) || 
                ($child->tag == 'ul')
            ) {
                parent::add($child);
            } else {
                parent::add($this->build('paragraph')->addClass('card-text')->add($child));
            }
        }
        return $this;
    }
}
