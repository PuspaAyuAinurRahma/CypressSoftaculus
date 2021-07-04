<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/5/18
 * Time: 11:09 AM
 */

namespace BeonOrder\Libs\Wizcrm\Basic;


class Log{

    static function logToFile($title, $data = [], $log_filepath = ''){
        error_log( "\n---------------------------------------------------------------------------------\n
        ****[MESSAGE]**** {$title}@" . date('Y-m-d H:i:s') . "\n" . json_encode($data) . "\n---------------------------------------------------------------------------------\n", 3, $log_filepath);
    }

}