<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 21/09/18
 * Time: 16:06
 */

namespace BeonOrder\Controllers\Pages;


use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\Clients\Emails;

class Register extends Base
{
    public static function renderFooter(){
//        $validation = Emails::isValidationEnabled();
//        if($validation['status']==1){
//            $string  = self::getModalValidateEmail();
//            $string .= '<script type="text/javascript" src="/modules/addons/beon_order/templates/assets/js/register.js"></script>';
//            return $string;
//        }
        return "";
    }
    public static function getModalValidateEmail(){
        return '<div class="modal" id="loading-validate-email" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="dialog">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <div class="container-fluid">
                        <div class="col-md-12" id="loading-spinner">
                            <i class="fa fa-3x fa-spinner fa-spin"></i>
                            <br>
                            <p class="text-center">Kami sedang memproses Registrasi Kamu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>';
    }
}