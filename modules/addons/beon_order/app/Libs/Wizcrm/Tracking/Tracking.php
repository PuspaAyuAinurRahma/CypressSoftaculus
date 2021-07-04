<?php
namespace BeonOrder\Libs\Wizcrm\Tracking;
use BeonOrder\Libs\Wizcrm\Basic\Post as Request;
use BeonOrder\Libs\Wizcrm\Basic\One;
use BeonOrder\Libs\Wizcrm\Basic\ConfigUrl;


class Tracking extends One{

    public function GetTrackingUrlByCallback($user_id, $redirect, $param="", $callback=""){
        $params = [
            'action'    => 'get-tracking-url-by-callback',
            'user_id'   => $user_id,
            'redirect'  => $redirect,
            'callback'  => $callback
        ];

        if(!empty($param) && is_array($param)) $params["param"] = $param;
        if(!empty($callback) && is_array($callback)) $params["callback"] = $callback;

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiTracking,
            $params
        )->asArray();
        return $result;
    }

    public function GenerateTrackingUrl($user_id, $link, $is_short=0, $param="", $callback=""){
        $params  = [
            "action"    => "add-tracking-url",
            "user_id"   => $user_id,
            "redirect"  => (string) $link,
            "is_short"  => $is_short
        ];

        if(!empty($param) && is_array($param)) $params["param"] = $param;
        if(!empty($callback) && is_array($callback)) $params["callback"] = $callback;

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiTracking,
            $params
        )->asArray();
        return $result;
    }
    public function GenerateTrackingImage($user_id, $param="", $callback=""){
        $params  = [
            "action"    => "add-tracking-img",
            "user_id"   => $user_id,
        ];

        if(!empty($param) && is_array($param)) $params["param"] = $param;
        if(!empty($callback) && is_array($callback)) $params["callback"] = $callback;

        $result = Request::instance()->one(
            ConfigUrl::instance()->urlApiTracking,
            $params
        )->asArray();
        return $result;
    }
}