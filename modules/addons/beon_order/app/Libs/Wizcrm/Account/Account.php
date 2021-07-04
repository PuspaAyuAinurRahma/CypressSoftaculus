<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Account;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Account extends One
{
    public function GetAccountById($userId)
    {
        $param  = [
            'action'            =>'get-account-by-id',
            'user_id'           => $userId,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiAccount,
            $param
        )->asArray();
        return $result;
    }
}