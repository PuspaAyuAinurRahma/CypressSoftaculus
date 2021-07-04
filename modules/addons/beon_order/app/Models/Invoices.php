<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 3:11 PM
 */

namespace BeonOrder\Models;

use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as Capsule;
use MongoDB\Driver\Exception\ExecutionTimeoutException;

class Invoices
{
    public function localApi($command, $params)
    {
        try {
            $adminUsername = 'api';
            $results = localAPI($command, $params, $adminUsername);
            if (!$results) throw new Exception('Failed to do Action');

            return [
                'status'    => 1,
                'data'      => $results
            ];
        } catch (Exception $e) {
            return [
                'status'    => 0,
                'data'      => $e->getMessage()
            ];
        }
    }

}