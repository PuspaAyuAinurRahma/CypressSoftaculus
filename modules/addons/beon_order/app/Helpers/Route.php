<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 2:18 PM
 */

namespace BeonOrder\Helpers;

class Route
{

    private $_config;

    public function config()
    {
        if($this->_config == null){
            $this->_config = array(
                'api'               =>array('class'=>'\BeonOrder\Controllers\Apis\Api','method'=>'execute'),
                'viewinvoice'       =>array('class'=>'\BeonOrder\Controllers\Pages\ViewInvoice','method'=>'execute'),
                'resume-order'      =>array('class'=>'\BeonOrder\Controllers\Pages\ResumeOrder\ViewResumeOrder','method'=>'show'),
                'orders'            =>array('class'=>'\BeonOrder\Controllers\Pages\Orders\Orders','method'=>'init'),
                'add-service'       =>array('class'=>'\BeonOrder\Controllers\Pages\Orders\Orders','method'=>'addService'),
            );
        }
        return $this->_config;
    }
    public static function routeAdmin($controller, $action){
        $config = [
            'automation'=>[
                'template'=>[
                    'class'     =>'\Addons\Modules\BeonCustomNotifications\Controllers\Pages\Admin\Template',
                    'method'    =>'setting'
                ],
                'notification'=>[
                    'class'     =>'\Addons\Modules\BeonCustomNotifications\Controllers\Pages\Admin\NotifType',
                    'method'    =>'setting'
                ]
            ],
            'report'=>[
                'notification'=>[
                    'class'     =>'\Addons\Modules\BeonCustomNotifications\Controllers\Pages\Admin\Reports',
                    'method'    =>'render'
                ],
            ],
            'api'=>[
                'edit-template'=>[
                    'class'     =>'Addons\Modules\BeonCustomNotifications\Controllers\Apis\Notifications\Admin',
                    'method'    =>'edittemplate'
                ],
                'report'=>[
                    'class'     =>'Addons\Modules\BeonCustomNotifications\Controllers\Apis\Notifications\Admin',
                    'method'    =>'generateReport'
                ],
            ]
        ];
        if(array_key_exists($controller, $config)){
            if(array_key_exists($action,$config[$controller])){
                return $config[$controller][$action];
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function run($action){
        $config = $this->config();
        if(array_key_exists($action,$config)){
            return $config[$action];
        }

        return false;
    }
}