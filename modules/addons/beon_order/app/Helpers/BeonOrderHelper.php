<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 22/05/17
 * Time: 9:15
 */

namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;
use PhpImap\Exception;


class BeonOrderHelper
{

    public static function is_active(){
        $order = Capsule::table('tbladdonmodules')
            ->where('module', 'beon_order')
            ->first();
        if($order)return true;
        return false;
    }

}