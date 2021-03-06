<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\Configuration;
use BeonOrder\Libs\Parser\Htmltomarkdown\ConfigurationAwareInterface;
use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

class DefaultConverter implements ConverterInterface, ConfigurationAwareInterface
{
    const DEFAULT_CONVERTER = '_default';

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
        // If strip_tags is false (the default), preserve tags that don't have Markdown equivalents,
        // such as <span> nodes on their own. C14N() canonicalizes the node to a string.
        // See: http://www.php.net/manual/en/domnode.c14n.php
        if ($this->config->getOption('strip_tags', false)) {
            return $element->getValue();
        }

        return html_entity_decode($element->getChildrenAsString());
    }

    /**
     * @return string[]
     */
    public function getSupportedTags()
    {
        return array(self::DEFAULT_CONVERTER);
    }
}
