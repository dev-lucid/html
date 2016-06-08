<?php
namespace Lucid\Html\Bootstrap\Tags;

class pagination extends \Lucid\Html\Base\Tags\unorderedList
{
	use \Lucid\Html\Bootstrap\Traits\Sizeable;
	use \Lucid\Html\Bootstrap\Traits\Pullable;

	public $tag = 'ul';
	public $parameters = ['currentPage', 'nbrOfPages', 'showPreviousNextItems', 'showFirstLastItems', 'alwaysShowFirstPage', 'alwaysShowLastPage'];
	public $ariaLabel = '';
	public $currentPage = 0;
	public $nbrOfPages = 1;
	public $showRange = false;
	public $rangeShowBeforeAfter = [2,2];
	public $linkBuilder = null;
	public $labelText = [['&laquo;', 'First'], ['&lt;', 'Previous'], ' (current)', ['&gt;', 'Next'], ['&raquo;', 'Last']];
	public $autoBuildItems = true;
	public $showPreviousNextItems = true;
	public $showFirstLastItems = true;
	public $rangeShowFirstLastPage = true;
	public $rangeBoundaryStartText = '&hellip;';
	public $rangeBoundaryEndText = '&hellip;';
	public $bootstrapSizePrefix = 'pagination';
	public $bootstrapSizesAllowed = ['sm', 'lg'];

	public function init()
	{
		$this->addClass('pagination');
		$this->allowedAttributes[] = 'linkBuilder';
		$this->allowedAttributes[] = 'labelText';
		$this->allowedAttributes[] = 'ariaLabel';
		$this->allowedAttributes[] = 'showRange';
		$this->allowedAttributes[] = 'rangeShowBeforeAfter';
		$this->allowedAttributes[] = 'rangeShowFirstLastPage';
		parent::init();
	}

    public function preRender() : string
    {
        if ($this->autoBuildItems === true) {
            if (is_callable($this->linkBuilder) === true) {
                $linkBuilder = $this->linkBuilder;
            } else {
                $linkBuilder = function(){ return '#'; };
            }
            
            if ($this->showFirstLastItems === true) {
                
                $this->add($this->build(
                    'paginationItem', 
                    $linkBuilder($this, 0), 
                    '<span aria-hidden="true">'.$this->labelText[0][0].'</span><span class="sr-only">'.$this->labelText[0][1].'</span>'
                ));
                if ($this->currentPage == 0) {
                    $this->lastChild()->set('disabled', true);
                }
            }
            if ($this->showPreviousNextItems === true) {
                $prevNbr = ($this->currentPage > 0)?($this->currentPage - 1):0;
                $this->add($this->build(
                    'paginationItem', 
                    $linkBuilder($this, $prevNbr), 
                    '<span aria-hidden="true">'.$this->labelText[1][0].'</span><span class="sr-only">'.$this->labelText[1][1].'</span>'
                ));
                if ($this->currentPage == $prevNbr) {
                    $this->lastChild()->set('disabled', true);
                }
            }
            
            
            if ($this->showRange === false) {
                $startRange = 0;
                $endRange   = $this->nbrOfPages;
            } else {
                $rangeSize  = $this->rangeShowBeforeAfter[0] + 1 + $this->rangeShowBeforeAfter[1];
                $startRange = $this->currentPage - $this->rangeShowBeforeAfter[0];
                $endRange = $startRange + $rangeSize;
                while ($startRange < 0) {
                    $startRange++;
                    $endRange++;
                }
                if ($endRange > $this->nbrOfPages) {
                    $endRange = $this->nbrOfPages;
                }
            }
        
            if ($this->showRange === true && $this->rangeShowFirstLastPage === true && $startRange > 0) {
                $this->add($this->build('paginationItem', $linkBuilder($this, 0), 1));
            }
            for ($i=$startRange; $i<$endRange; $i++) {
                $text = strval($i + 1);
                if ($this->showRange === true) {
                    if ($i == $startRange && $i > 1) {
                        $text = $this->rangeBoundaryStartText;
                    }
                    if ($i == ($endRange - 1) && $i < ($this->nbrOfPages - 1)) {
                        $text = $this->rangeBoundaryEndText;
                    }
                }

                
                if ($this->currentPage == $i) {
                    $text .= '<span class="sr-only">'.$this->labelText[2].'</span>';
                    $this->add($this->build('paginationItem')->set('active', true)->add($this->build('span', $text)->addClass('page-link')));
                } else {
                    $this->add($this->build('paginationItem', $linkBuilder($this, $i), $text));
                }
            }
            if ($this->showRange === true && $this->rangeShowFirstLastPage === true && $endRange < ($this->nbrOfPages - 1)) {
                $this->add($this->build('paginationItem', $linkBuilder($this, ($this->nbrOfPages - 1)), $this->nbrOfPages));
            }
            
            
            if ($this->showPreviousNextItems === true) {
                $nextNbr = ($this->currentPage < ($this->nbrOfPages - 1))?($this->currentPage + 1):$this->currentPage;
                $this->add($this->build(
                    'paginationItem', 
                    $linkBuilder($this, $nextNbr), 
                    '<span aria-hidden="true">'.$this->labelText[3][0].'</span><span class="sr-only">'.$this->labelText[3][1].'</span>'
                ));
                if ($this->currentPage == $nextNbr) {
                    $this->lastChild()->set('disabled', true);
                }
            }
            
            if ($this->showFirstLastItems === true) {
                $this->add($this->build(
                    'paginationItem', 
                    $linkBuilder($this, ($this->nbrOfPages - 1)), 
                    '<span aria-hidden="true">'.$this->labelText[4][0].'</span><span class="sr-only">'.$this->labelText[4][1].'</span>'
                ));
                if ($this->currentPage == ($this->nbrOfPages - 1)) {
                    $this->lastChild()->set('disabled', true);
                }
            }
        }
        
        $this->attributes['data-current-page'] = $this->currentPage;
        $this->attributes['data-max-page'] = $this->nbrOfPages;
        
        if ($this->ariaLabel != '') {
            $this->preHtml .= '<nav aria-label="'.$this->ariaLabel.'">';
        } else {
            $this->preHtml .= '<nav>';
        }
        $this->postHtml = '</nav>'.$this->postHtml;
        
        return parent::preRender();
    }
}
