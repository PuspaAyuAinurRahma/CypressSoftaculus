<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/29/16
 * Time: 5:39 AM
 */

namespace BeonOrder\Libs\Wizcrm\EmailEditor;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;

class EmailEditor extends One
{
    public function FetchEmailTemplate($user_id)
    {
        $param  = [
            'user_id'   => &$user_id,
            'action'    => 'email-template-default-fetch',
        ];
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiEmailEditor,
            $param
        )->asArray();

        return $result;
    }

    public function GetEmailTemplate($user_id, $template_id)
    {
        $param  = [
            'user_id'           => &$user_id,
            'action'            => 'email-template-default-get',
            'email_template_id' => $template_id
        ];
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiEmailEditor,
            $param
        )->asArray();

        return $result;
    }

    public function GetEmailByRel($user_id, $type, $rel_id)
    {
        $param  = [
            'user_id'   => &$user_id,
            'action'    => 'email-get-by-rel',
            'type'      => $type,
            'relid'     => $rel_id,
        ];
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiEmailEditor,
            $param
        )->asArray();

        return $result;
    }

    public function AddOrEditEmailByRel($user_id, $type, $rel_id, $data_content)
    {
        $param  = [
            'user_id'       => &$user_id,
            'action'        => 'add-or-edit-email-by-rel',
            'type'          => $type,
            'relid'         => $rel_id,
            'data_content'  => $data_content,
        ];

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiEmailEditor,
            $param
        );
        return $result->asArray();
    }
}