<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\Configuration;
use BeonOrder\Libs\Parser\Htmltomarkdown\ConfigurationAwareInterface;
use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

class EmphasisConverter implements ConverterInterface, ConfigurationAwareInterface
{
    /**
     * @var Configuration
     */
    protected $config;

    /**
     * @param Configuration $config
     */
    public function setConfig(Configuration $config)
    {
        $this->config = $config;
    }

    /**
     * @param ElementInterface $element
     *
     * @return string
     */
    public function convert(ElementInterface $element)
    {
        $tag = $element->getTagName();
        $value = $element->getValue();

        if (!trim($value)) {
            return $value;
        }

        if ($tag === 'i' || $tag === 'em') {
            $style = $this->config->getOption('italic_style');
        } else {
            $style = $this->config->getOption('bold_style');
        }

        $prefix = ltrim($value) !== $value ? ' ' : '';
        $suffix = rtrim($value) !== $value ? ' ' : '';

        return $prefix . $style . trim($value) . $style . $suffix;
    }

    /**
     * @return string[]
     */
    public function getSupportedTags()
    {
        return array('em', 'i', 'strong', 'b');
    }
}
