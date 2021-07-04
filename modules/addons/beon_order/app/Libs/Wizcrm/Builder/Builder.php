<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\Builder;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class Builder extends One
{
    public function FetchSite($user_id)
    {
        $param  = [
            'action'            =>'fetch-all-site',
            'user_id'           =>$user_id,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiBuilder,
            $param
        )->asArray();
        return $result;
    }
}