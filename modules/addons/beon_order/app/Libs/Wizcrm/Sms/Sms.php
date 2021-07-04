<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Sms;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Sms extends One
{
    public function SendByPhoneNumber($userId,$phone,$message,$rel_id="",$scheduled_at="")
    {
        $param  = [
            'action'            =>'send-message-by-phone-number',
            'user_id'           => $userId,
            'phone_number'      => $phone,
            'message'           => $message,
        ];
        if(!empty($rel_id))         $param['rel_id']            = $rel_id;
        if(!empty($scheduled_at))   $param['scheduled_at']      = $scheduled_at;

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiSms,
            $param
        );
        print_r($result->asArray());
        return $result->asArray();
    }
    public function SendBroadcastMessage($userId,$phone,$broadcast_id,$contact_id,$message,$scheduled_at="")
    {
        $param  = [
            'action'        =>'send-message',
            'user_id'       =>$userId,
            'phone'         =>$phone,
            'broadcast_id'  =>$broadcast_id,
            'contact_id'    =>$contact_id,
            'message'       =>$message,
        ];
        if(!empty($scheduled_at))   $param['scheduled_at']      = $scheduled_at;
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiSms,
            $param
        );
        return $result->asArray();
    }
}