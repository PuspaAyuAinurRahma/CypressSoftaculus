<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 21/09/18
 * Time: 15:52
 */

namespace BeonOrder\Controllers\Apis\Clients;


use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\Clients\Emails;

class Email extends Base
{
    public function validate(){
        try{
            if(empty($this->post['email']))throw new \Exception("Email is Empty");
            $email          = $this->post['email'];
            $emailhelper    = new Emails();
            $validate       = $emailhelper->validate($email);
            return $validate;
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];
        }

    }
}