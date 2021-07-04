<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/12/18
 * Time: 3:30 PM
 */

namespace BeonOrder\Libs\Logger;


use BeonOrder\Libs\Logger\Logs\ILogs;
use BeonOrder\Libs\Logger\Logs\Log;

/**
 * Class Logger
 * @package BeonOrder\Libs\Logger
 */
class Logger extends Base
{

    public static $ELASTICSEARCH_CLIENT = 'ElasticSearch';

    const JSON_TYPE = 'json';
    const TEXT_TYPE = 'text';

    const LEVEL_DEBUG = 'debug';
    const LEVEL_WARNING = 'warning';
    const LEVEL_ERROR = 'error';
    const LEVELS = ['error', 'warning', 'debug'];

    public function __construct($url, $client)
    {
        $this->url = $url;
        $this->client = $client;
    }

    public function log($title, $tag, $message, $level = self::LEVEL_ERROR , $type = 'json'){
        try{
            if(empty($title))
                throw new \Exception('Title cannot be empty');
            if(empty($tag))
                throw new \Exception('Tag cannot be empty');
            if(empty($message))
                throw new \Exception('Message cannot be empty');

            $result = $this->send($title, $tag, $message, $level, $type);
            if($result['status'] != 1)
                throw new \Exception($result['message']);

            return [
                'status'    => 1,
                'message'   => 'Log successfully',
            ];
        }catch (\Exception $e){
            return [
                'status'    => $e->getCode(),
                'message'   => $e->getMessage(),
            ];
        }
    }

}