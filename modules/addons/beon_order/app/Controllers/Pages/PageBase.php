<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/15/18
 * Time: 6:17 AM
 */

namespace BeonOrder\Controllers\Pages;


use BeonOrder\Controllers\Base as BaseController;

class PageBase extends BaseController
{
    public $pagetitle;
    public $breadcrumb;
    public $templatefile;
    public $requirelogin;
    public $forcessl;
    public $errorPage;

    public function pageValidation($page){
        try{
            $data = [];
            $page = htmlspecialchars( $page, ENT_QUOTES, 'UTF-8' );

            if(strpos($_SERVER['REQUEST_URI'], $page) === false)
                throw new \Exception('Page is not valid for creating the action sidebar');

            if(isset($_GET['id']))
                $data['id'] = $_GET['id'];

            return [
                'status' => 1,
                'data' => $data,
                'message' => 'Page is valid for creating the action sidebar',
            ];
        }catch (\Exception $e){
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }


}