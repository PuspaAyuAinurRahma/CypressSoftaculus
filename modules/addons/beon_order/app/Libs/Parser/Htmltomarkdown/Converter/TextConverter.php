<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

class TextConverter implements ConverterInterface
{
    /**
     * @param ElementInterface $element
     *
     * @return string
     */
    public function convert(ElementInterface $element)
    {
        $markdown = $element->getValue();

        // Remove leftover \n at the beginning of the line
        $markdown = ltrim($markdown, "\n");

        // Replace sequences of invisible characters with spaces
        $markdown = preg_replace('~\s+~u', ' ', $markdown);

        // Escape the following characters: '*', '_', '[', ']' and '\'
        $markdown = preg_replace('~([*_\\[\\]\\\\])~u', '\\\\$1', $markdown);

        $markdown = preg_replace('~^#~u', '\\\\#', $markdown);

        if ($markdown === ' ') {
            $next = $element->getNext();
            if (!$next || $next->isBlock()) {
                $markdown = '';
            }
        }

        return $markdown;
    }

    /**
     * @return string[]
     */
    public function getSupportedTags()
    {
        return array('#text');
    }
}
