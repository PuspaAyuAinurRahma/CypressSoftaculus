<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown\Converter;

use BeonOrder\Libs\Parser\Htmltomarkdown\Configuration;
use BeonOrder\Libs\Parser\Htmltomarkdown\ConfigurationAwareInterface;
use BeonOrder\Libs\Parser\Htmltomarkdown\ElementInterface;

class HardBreakConverter implements ConverterInterface, ConfigurationAwareInterface
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
        $return = $this->config->getOption('hard_break') ? "\n" : "  \n";

        $next = $element->getNext();
        if ($next) {
            $next_value = $next->getValue();
            if ($next_value) {
                if (in_array(substr($next_value, 0, 2), array('- ', '* ', '+ '))) {
                    $return .= '\\';
                }
            }
        }

        return $return;
    }

    /**
     * @return string[]
     */
    public function getSupportedTags()
    {
        return array('br');
    }
}
