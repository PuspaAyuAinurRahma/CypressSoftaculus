<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Wifi;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Wifi extends One
{
    public function FetchWifi($user_id)
    {
        $param  = [
            'action'            =>'fetch-wifi',
            'user_id'           =>$user_id,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiWifi,
            $param
        );

        return $result->asArray();
    }

    public function FetchProfile($user_id)
    {
        $param  = [
            'action'            =>'fetch-profiles',
            'user_id'           =>$user_id,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiWifi,
            $param
        )->asArray();
        return $result;
    }

    public function FetchVendor($user_id)
    {
        $param  = [
            'action'            =>'fetch-vendor',
            'user_id'           =>$user_id,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiWifi,
            $param
        )->asArray();
        return $result;
    }

    public function FetchOperator($user_id)
    {
        $param  = [
            'action'            =>'fetch-operator',
            'user_id'           =>$user_id,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiWifi,
            $param
        )->asArray();
        return $result;
    }
}