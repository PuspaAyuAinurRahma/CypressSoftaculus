<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

class CommentConverter implements ConverterInterface
{
    /**
     * @param ElementInterface $element
     *
     * @return string
     */
    public function convert(ElementInterface $element)
    {
        return '';
    }

    /**
     * @return string[]
     */
    public function getSupportedTags()
    {
        return array('#comment');
    }
}
