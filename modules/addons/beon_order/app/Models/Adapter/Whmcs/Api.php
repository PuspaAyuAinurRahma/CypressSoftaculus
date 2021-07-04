<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/15/18
 * Time: 5:32 AM
 */

namespace BeonOrder\Models\Adapter\Whmcs;


use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Models\Adapter\ApiInterface;

class Api extends Base implements ApiInterface
{

    protected $admin_username = 'api';

    function sendPost($action, $params = [])
    {
        try{
            $result = localAPI($action, $params);
            if($result['result'] !== 'success')
                throw new Exception('Failed on calling ' . $action." ({$result['message']})");

            return [
                'status' => 1,
                'data' => $result,
            ];
        }catch (Exception $e){
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    function authenticate($username, $password)
    {
        // TODO: Implement authenticate() method.
    }

}