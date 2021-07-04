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

class EmailTemplate extends One
{
    /**
     * this function used to get email content using relid and type
     * @param $userId
     * @param $type
     * @param $relid
     * @return mixed
     */
    public function GetEmailContentByRelation($userId, $type, $relid){

        $param = [
            'action'    => 'email-get-by-rel',
            'user_id'   => $userId,
            'type'      => $type,
            'relid'     => $relid,
        ];
        $api = Request::instance()->one(ConfigUrl::instance()->urlApiEmailTemplate, $param);
        return $api->asArray();

    }
}