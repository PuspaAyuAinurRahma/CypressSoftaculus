<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown;

interface ConfigurationAwareInterface
{
    /**
     * @param Configuration $config
     */
    public function setConfig(Configuration $config);
}
