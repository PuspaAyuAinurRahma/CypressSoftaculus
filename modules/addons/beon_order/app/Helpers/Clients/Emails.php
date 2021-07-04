<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 21/09/18
 * Time: 12:33
 */

namespace BeonOrder\Helpers\Clients;


use BeonOrder\Helpers\Config;
use BeonOrder\Libs\Logger\Exception;

class Emails extends Base
{
    public function validate($email){
        try{
            $emailhelper    = new \BeonOrder\Libs\AutoTools\Emails($this->service_id);
            $validate       = $emailhelper->validateEmail($email);
            if($validate['status']==0)throw new Exception($validate['message']);
            $isvalid        = $validate['data']['is_valid'];
            $isemail        = $validate['data']['is_email'];


            if($isemail==0)throw new Exception("Format Email kamu salah");
            if($isvalid==0)throw new Exception("Email yang kamu masukkan tidak valid");
            return [
                'status'    =>1,
                'message'   =>'Email valid'
            ];


        }catch (Exception $exception){

            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];

        }

    }
    public static function isValidationEnabled(){
        try{
            $validator = Config::instance()->getModulesConfig('register_email_validator');
            if($validator['status']==0)throw new Exception($validator['message']);
            if($validator['data']->value!='on')throw new Exception("Email Validation OFF");
            return [
                'status'=>1,
                'message'=>'Email Validation On'
            ];
        }catch (Exception $exception){
            return [
                'status'=>0,
                'message'=>'Email Validation On'
            ];
        }
    }
}