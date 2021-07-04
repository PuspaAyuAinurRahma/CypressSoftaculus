<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

interface ConverterInterface
{
    /**
     * @param ElementInterface $element
     *
     * @return string
     */
    public function convert(ElementInterface $element);

    /**
     * @return string[]
     */
    public function getSupportedTags();
}
