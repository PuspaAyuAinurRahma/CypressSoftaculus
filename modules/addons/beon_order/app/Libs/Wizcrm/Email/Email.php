<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Email;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Email extends One
{
    public function sendEmailPremium($userId, $fromEmail, $fromName = '', $email,  $name, $subject, $content, $scheduledAt = null, $cb = null){

        $param = [
            'action' => 'send-email-premium',
            'user_id' => $userId,
            'subject' => $subject,
            'body' => $content,
            'to' => [
                0 => [
                    'email' => $email,
                    'name' => $name,
                ]
            ],
            'from_email' => $fromEmail,
            'from_name' => $fromName,
        ];

        if (!empty($cb)) {
            $param['param_callback'] = $cb;
        }

        if (empty($scheduledAt)) {
            $param['scheduled_at'] = date('Y-m-d H:i:s');
        }else{
            $param['scheduled_at'] = $scheduledAt;
        }

        $api = Request::instance()->one(ConfigUrl::instance()->urlApiEmail, $param);

        return $api->asArray();

    }

    /**
     * @param $userId
     * @param $subject
     * @param $content
     * @param $to array required
     *      to[0][email]
     *      to[0][name]
     *      to[1][email]
     * @return array
     */
    public function SendEmail($userId,$from_email,$from_name,$subject,$content,$to,$cb_success="",$cb_fail="",$scheduled_at=""){
        try{
            foreach($to as $key => $value){
                if(!array_key_exists('email',$value)) throw new \Exception('target email not found');
            }
            if(empty($scheduled_at)) $scheduled_at  = date('Y-m-d H:i:s');
            $param = [
                'action' => 'add-email',
                'user_id' => $userId,
                'from_email' => $from_email,
                'from_name' => $from_name,
                'subject' => $subject,
                'body' => $content,
                'to' => $to,
                'scheduled_at' => date('Y-m-d H:i:s'),
            ];
            if(is_array($cb_success)){
                $param['cb_success']    = $cb_success;
            }
            if(is_array($cb_fail)){
                $param['cb_fail']       = $cb_fail;
            }
            $api = Request::instance()->one(ConfigUrl::instance()->urlApiEmail, $param);
            return $api->asArray();
        }catch (\Exception $e){
            return [
                'status'=>0,
                'message'=>$e->getMessage()
            ];
        }

    }

    /**
     * @param $userId
     * @param $subject
     * @param $content
     * @param $to array required
     *      to[0][email]
     *      to[0][name]
     *      to[1][email]
     * @return array
     */
    public function SendDirectEmail($userId,$from_email,$from_name,$subject,$content,$to,$cb_success="",$cb_fail="",$scheduled_at=""){
        try{
            foreach($to as $key => $value){
                if(!array_key_exists('email',$value)) throw new \Exception('target email not found');
            }
            if(empty($scheduled_at)) $scheduled_at  = date('Y-m-d H:i:s');
            $param = [
                'action' => 'direct-send-email',
                'user_id' => $userId,
                'from_email' => $from_email,
                'from_name' => $from_name,
                'subject' => $subject,
                'body' => $content,
                'to' => $to,
                'scheduled_at' => date('Y-m-d H:i:s'),
            ];
            if(is_array($cb_success)){
                $param['cb_success']    = $cb_success;
            }
            if(is_array($cb_fail)){
                $param['cb_fail']       = $cb_fail;
            }
            $api = Request::instance()->one(ConfigUrl::instance()->urlApiEmail, $param);
//            print_r($param);
//            echo $api->asRaw();
            return $api->asArray();
        }catch (\Exception $e){
            return [
                'status'=>0,
                'message'=>$e->getMessage()
            ];
        }

    }
}