<?php

namespace BeonOrder\Libs\Parser\Htmltomarkdown;

use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\BlockquoteConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\CodeConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\CommentConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\ConverterInterface;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\DefaultConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\DivConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\EmphasisConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\HardBreakConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\HeaderConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\HorizontalRuleConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\ImageConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\LinkConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\ListBlockConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\ListItemConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\ParagraphConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\PreformattedConverter;
use BeonOrder\Libs\Parser\Htmltomarkdown\Converter\TextConverter;

final class Environment
{
    /**
     * @var Configuration
     */
    protected $config;

    /**
     * @var ConverterInterface[]
     */
    protected $converters = array();

    public function __construct(array $config = array())
    {
        $this->config = new Configuration($config);
        $this->addConverter(new DefaultConverter());
    }

    /**
     * @return Configuration
     */
    public function getConfig()
    {
        return $this->config;
    }

    /**
     * @param ConverterInterface $converter
     */
    public function addConverter(ConverterInterface $converter)
    {
        if ($converter instanceof ConfigurationAwareInterface) {
            $converter->setConfig($this->config);
        }

        foreach ($converter->getSupportedTags() as $tag) {
            $this->converters[$tag] = $converter;
        }
    }

    /**
     * @param string $tag
     *
     * @return ConverterInterface
     */
    public function getConverterByTag($tag)
    {
        if (isset($this->converters[$tag])) {
            return $this->converters[$tag];
        }

        return $this->converters[DefaultConverter::DEFAULT_CONVERTER];
    }

    /**
     * @param array $config
     *
     * @return Environment
     */
    public static function createDefaultEnvironment(array $config = array())
    {
        $environment = new static($config);

        $environment->addConverter(new BlockquoteConverter());
        $environment->addConverter(new CodeConverter());
        $environment->addConverter(new CommentConverter());
        $environment->addConverter(new DivConverter());
        $environment->addConverter(new EmphasisConverter());
        $environment->addConverter(new HardBreakConverter());
        $environment->addConverter(new HeaderConverter());
        $environment->addConverter(new HorizontalRuleConverter());
        $environment->addConverter(new ImageConverter());
        $environment->addConverter(new LinkConverter());
        $environment->addConverter(new ListBlockConverter());
        $environment->addConverter(new ListItemConverter());
        $environment->addConverter(new ParagraphConverter());
        $environment->addConverter(new PreformattedConverter());
        $environment->addConverter(new TextConverter());

        return $environment;
    }
}
