<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 23/08/18
 * Time: 10:47
 */

namespace BeonOrder\Libs\AutoTools;

use BeonOrder\Libs\Logger\Exception;

class Emails extends Base
{
    protected $module ='emails';

    function __construct($service_id)
    {
        parent::__construct($service_id, $this->module);
    }

    public function validateEmail($email, $smtp=1, $format=1)
    {
        try {
            $action = 'get-email-validation-by-mailboxlayer';
            $params = [
                'email'     => $email,
                'smtp'      => $smtp,
                'format'    => $format,
            ];
            $result = $this->sendPost($action, $params);

            return $result;
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }


}