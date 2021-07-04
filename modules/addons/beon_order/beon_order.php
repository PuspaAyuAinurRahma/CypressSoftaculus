<?php
//if (!defined("WHMCS"))
//    die("This file cannot be accessed directly");
// error_reporting(E_ALL);
//require 'app/helper/autoload.php';

require __DIR__ . '/autoload.php';

function beon_order_config()
{
    $configarray = array(
        "name" => "BEON Apps - Order",
        "description" => "Module for Custom Order ",
        "version" => "1.0.0",
        "author" => "Candra Kharista",
        "language" => "english",
        "fields" => array(
            "payment_confirmation_duration" => array(
                "FriendlyName" => "Payment confirmation duration",
                "Type" => "text",
                "Description" => "Format Menit:Detik , Lama durasi pengecekan payment Unpaid",
                "Default" => "00:10"
            ),
            "payment_api_interval" => array(
                "FriendlyName" => "Api Interval",
                "Type" => "text",
                "Description" => "detik, Interval pengecekan api per detik",
                "Default" => "1"
            ),
            "onetime_products" => array(
                "FriendlyName" => "Hide gunakan domain",
                "Type" => "text",
                "Description" => "Hide form gunakan domain sendiri (harus beli domain atau transfer). Gunakan delmitier ',' untuk memisahkan antar product",
                "Default" => ""
            ),
            "cart_expiry_time" => array(
                "FriendlyName" => "Cart Expiry Time",
                "Type" => "text",
                "Description" => "Lama dari penyimpanan cart pada form order, gunakan satuan menit",
                "Default" => ""
            ),
            "use_domain_only" => array(
                "FriendlyName" => "Use Domain Only",
                "Type" => "text",
                "Description" => "Hanya bisa menggunakan domain tidak bisa register atau transfer. Gunakan delmitier ',' untuk memisahkan antar product",
                "Default" => ""
            ),
//            "register_email_validator" => array(
//                "FriendlyName" => "Enable Email Validation when register",
//                "Type" => "yesno",
//                "Description" => "Validasi Email ketika registrasi customer baru",
//                "Default" => "yes"
//            ),
        ),
    );
    return $configarray;
}

function beon_order_activate()
{

    # Return Result
    return array('status' => 'success', 'description' => 'BEON Apps - Order Module Activated');

}

function beon_order_deactivate()
{

    # Remove Custom DB Table

    return array('status' => 'success', 'description' => 'BEON Apps - Order Module Deactivated');

}

function beon_order_upgrade($vars)
{

    $version = $vars['version'];

}

function beon_order_output($vars)
{
    try {
        $action = isset($_GET['a']) ? $_GET['a'] : 'ConfigOrder';
        $vars['post'] = $_POST;
        $vars['get'] = $_GET;
        $controller = "\\BeonOrder\\Controllers\\Admin";
        $Routes = new $controller($vars);
        $result = $Routes->$action();
        return $result;
    } catch (\Exception $e) {
        print_r($e);
    }
}

function beon_order_sidebar($vars)
{

}

function beon_order_clientarea($vars)
{
    try {
        $action = $_GET['action'];
        if (empty($action))
            throw new \Exception("Action cannot be empty");
        unset($_GET['action']);
        $route = new \BeonOrder\Helpers\Route();
        $config = $route->run($action);
        if (!$config)
            throw new \Exception('Action not found');
        $class = $config['class'];
        $vars['get'] = $_GET;
        $vars['post'] = $_POST;
        $method = $config['method'];
        $classObject = new $class($vars);
        $classObject->$method();

        $vars = array_merge($classObject->vars, ['get' => $_GET, 'post' => $_POST]);

        return [
            'pagetitle' => $classObject->pagetitle,
            'breadcrumb' => $classObject->breadcrumb,
            'templatefile' => 'templates/' . $classObject->templatefile,
            'requirelogin' => $classObject->requirelogin, # accepts true/false
            'forcessl' => true, # accepts true/false
            'vars' => $vars,
        ];
    } catch (\Exception $e) {
        //print_r($e);
        //error_reporting(E_ALL);
    }
}