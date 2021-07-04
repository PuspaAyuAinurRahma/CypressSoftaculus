<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Billing;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Billing extends One
{
    public function CheckCharging($userId, $activity_action, $total=0){
        $param = [
            'action'                =>'check-charging',
            'user_id'               =>$userId,
            'activity_action'       =>$activity_action,
        ];
        if(!empty($total)){
            $param['total_request_quota']   = $total;
        }
        $api = Request::instance()->one(ConfigUrl::instance()->urlApiBilling, $param);
        return $api->asArray();
    }
    public function Charging($userId, $activity_action, $total=0){
        $param = [
            'action'                =>'charging',
            'user_id'               =>$userId,
            'activity_action'       =>$activity_action,
        ];
        if(!empty($total)){
            $param['total_request_quota']   = $total;
        }
        $api = Request::instance()->one(ConfigUrl::instance()->urlApiBilling, $param);
        return $api->asArray();
    }
}