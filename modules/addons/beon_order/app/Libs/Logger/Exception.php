<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/22/18
 * Time: 9:05 AM
 */

namespace BeonOrder\Libs\Logger;

use BeonOrder\Helpers\Config;

class Exception extends \Exception
{

    private $log_level = 0;
    private $offset = 10;

    public function __construct($message = "", $code = 0, $previous = null)
    {
        parent::__construct($message, $code, $previous);

        $config = Config::instance()->getConfig();
        $loggerConfig = $config['logger'];
        $log_level = $this->log_level + $this->offset;
        if($code >= $log_level && $this->log_level < count(Logger::LEVELS) ){
            $error_code = $code - $this->offset;
            $logger = new Logger($loggerConfig['api_endpoint'], $loggerConfig['client']);
            json_decode($message);
            $isJson = (json_last_error() == JSON_ERROR_NONE);
            if($isJson){
                $message = json_decode($message);
            }

            $body = json_encode([
                'file' => $this->getFile(),
                'line' => $this->getLine(),
                'trace' => $this->getTraceAsString(),
                'message' => $message,
            ]);

            $logger->log($loggerConfig['title'], $loggerConfig['tag'], $body, Logger::LEVELS[$error_code], Logger::JSON_TYPE);

        }
    }

    public static function Error($message, $data = []){

    }

}