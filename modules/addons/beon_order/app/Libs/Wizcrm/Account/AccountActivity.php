<?php
namespace BeonOrder\Libs\Wizcrm\Account;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;
use BeonOrder\Libs\Wizcrm\Basic\CacheVariable;

/**
 * Class Login
 *
 * class yang digunakan untuk mengambil data email
 *
 * @package JagoanWeb
 */
class AccountActivity extends One
{
    public function FetchActivity($user_id,$limit,$current_page=1,$condition="",$order="")
    {
        $param  = [
            'user_id'           => &$user_id,
            'action'            =>'fetch-account-activity',
        ];
        if(!empty($limit))          $param['limit'] = $limit;
        if(!empty($current_page))   $param['current_page'] = $current_page;
        if(!empty($condition))      $param['conditions'] = $condition;
        if(!empty($order))          $param['order'] = $order;

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiAccountActivity,
            $param
        )->asArray();
        return $result;
    }

    /*
     {
        "rel_type" : "revoluzio.wifi",
        "rel_id" : 1132,
        "action" : "create",
        "title" : "You create new Wifi with Mac address : <strong>{mac_address}</strong>",
        "description" : "You create new Wifi with Mac address : <strong>{mac_address}</strong>",
        "content" : {
            "mac_address" : "081982639183912"
        },
        "priority"   : 0,
        "created_at" : 1480650183
    }
     */

    public function CreateActivity($user_id,$type,$rell_id,$label,$title,$desc,$param,$priority)
    {
        $param  = [
            'user_id'           => &$user_id,
            'action'            =>'create-account-activity',
            'type'              =>$type,
            'rell_id'           =>$rell_id,
            'label'             =>$label,
            'title'             =>$title,
            'desc'              =>$desc,
            'param'             =>$param,
            'priority'          =>$priority
        ];
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiAccountActivity,
            $param
        )->asArray();
        return $result;
    }
    public function GetActivityById($user_id,$id)
    {
        $param  = [
            'user_id'           => &$user_id,
            'action'            =>'get-account-activity-by-id',
            'id'                =>$id,
        ];
        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiAccountActivity,
            $param
        )->asArray();
        return $result;
    }

}