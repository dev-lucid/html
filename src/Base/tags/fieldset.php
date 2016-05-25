<?php
namespace Lucid\Html\Base\Tags;

class fieldset extends \Lucid\Html\Tag
{
	public $tag = 'fieldset';
	public $parameters = ['legend'];
	public $legend = null;

    public function getLegend()
    {
        if (is_null($this->legend) === true) {
            $this->legend = $this->build('legend');
        }
        return $this->legend;
    }
    
    public function setLegend($newValue)
    {
        $legend = $this->get('legend');
        $legend->children = [];
        $legend->add($newValue);
        return $this;
    }
    
    public function preChildren() 
    {
        if (is_null($this->legend) === false) {
            $this->preChildrenHtml .= $this->legend->render();
        }
        return parent::preChildren();
    }
}
