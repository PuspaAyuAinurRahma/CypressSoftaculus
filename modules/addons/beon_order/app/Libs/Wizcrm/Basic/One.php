<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/15/16
 * Time: 1:43 PM
 */

namespace BeonOrder\Libs\Wizcrm\Basic;


abstract class One
{
    /**
     *	Return class instance
     *	@return static
     **/
    static function instance() {
        if (!Globals::exists($class=get_called_class())) {
            $ref=new \Reflectionclass($class);
            $args=func_get_args();
            Globals::set($class,
                $args?$ref->newinstanceargs($args):new $class);
        }
        return Globals::get($class);
    }
}