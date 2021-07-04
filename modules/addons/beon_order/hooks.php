<?php

use BeonOrder\Helpers\Order;
use BeonOrder\Models\ProductGroup;

require __DIR__ . '/autoload.php';

//require 'app/helper/autoload.php';
//use WHMCS\Session;
//use WHMCS\Ticket\Watchers;


/*Hook dibawah ini digunakan untuk menanamkan script analytic ke halaman invoice*/
/*tujuannya agar user yang checkout bisa ditrack*/

add_hook('ClientAreaPageCart', 1, function ($vars) {
    $product               = new \BeonOrder\Controllers\CartPages($vars);
    $productRequiredDomain = $product->checkProductRequiredDomain($vars);

    if ($productRequiredDomain > 0)
        $vars['product_required_domain'] = 1;

    $a         = $_GET['a'];
    $dashboard = new BeonOrder\Controllers\View();

    if ($a == 'checkout') {

        if ($vars['carttpl'] == 'sobat_jagoan' || $vars['carttpl'] == 'order_vps_virtuozzo')
            $dashboard->main();

    } else if ($a == 'complete') {

        header('location: index.php?m=beon_order&action=resume-order&invoiceid=' . $vars['invoiceid']);

    }

    return $vars;

});

add_hook('ClientAreaPageCart', 2, function ($vars) {
    if ($vars['carttpl'] == 'sobat_jagoan' || $vars['carttpl'] == 'order_vps_virtuozzo') {
        $class = new \BeonOrder\Controllers\CartPages($vars);
        $cy    = $class->route($vars['templatefile']);
        $vars  = $cy;
        return $vars;
    }
});

//fix checkout subtotal
add_hook('ClientAreaPageCart', 99 , function ($vars){
    if ($vars['templatefile'] == 'viewcart'){
        $taxrate            = $vars['taxrate'];
        $subtotalraw        = ($vars['taxtotal']->toNumeric()) * 100 / $taxrate; //mengalikan dengan 100 lalu membagi angka pajak (taxrate) untuk mendapatkan subtotal

        $subtotal           = formatCurrency($subtotalraw);
        $vars['subtotal']   = $subtotal; // set custom subtotal

        return $vars;
    }
});

add_hook('ClientAreaPageViewInvoice', 1, function ($vars) {
    unset($_SESSION['cart']['bundle']);
    unset($_SESSION['cart']['OrderFormTemplate']);
    unset($_SESSION['OrderFormTemplate']);
    $vars['carttpl']    = 'sobat_jagoan';

    if (class_exists("\Addons\Modules\BeonGa\Controllers\Order")) {
        $order_controller = new \Addons\Modules\BeonGa\Controllers\Order();
        $order_controller->checkout($vars['invoiceid']);
    }

    $class = new \BeonOrder\Controllers\ViewInvoice($vars);
    $run   = $class->execute();

    return $run;

});

add_hook('ClientAreaPageCart', 1, function ($vars) {
    $_SESSION['beoncustomorderCSRFtoken'] = $vars['token'];

});

add_hook('ClientAreaPageCart', 1, function ($vars) {
    $pid        = $vars['pid'];

    $hConfig    = new BeonOrder\Helpers\Config();
    $getModule  = $hConfig->getModulesConfig('onetime_products');
    if ($getModule['status'] != 1)
        return $vars;

    if (empty($getModule['data']->value))
        $vars['is_onetime'] = false;

    $arrPid = explode(',', $getModule['data']->value);

    $vars['is_onetime'] = false;
    foreach ($arrPid as $value) {
        if ($value == $pid)
            $vars['is_onetime'] = true;
    }

    return $vars;
});

add_hook('InvoiceCreationPreEmail', 11, function ($vars) {
    $helper = new \BeonOrder\Helpers\Invoicing($vars);
    $helper->generateAdministrationFee();
});
add_hook('InvoiceChangeGateway', 1, function ($vars) {
    $helper  = new \BeonOrder\Helpers\Invoicing($vars);
    $invoice = $helper->getInvoice($vars['invoiceid']);
    $helper->updateAdministration($invoice);
    logActivity("Change Invoice #{$invoice['id']} Payment to {$invoice['paymentmethod']}", $invoice['userid']);
});

add_hook('EmailPreSend', 1, function($vars) {
    return \BeonOrder\Helpers\Clients\Registrations::injectVerificationCode($vars);
});

add_hook('ClientAreaFooterOutput', 1, function($vars) {
    if ($_SERVER['REQUEST_URI'] == '/logout.php') {
        return "<script type='text/javascript'>
            window.localStorage.removeItem('cart');
        </script>";
    }
});

// Change status order to active
add_hook('InvoicePaid', 1, function($vars) {
    $hOrder         = new Order();
    $changeStaus    = $hOrder->changeToActice($vars['invoiceid']);
});

//add_hook('ClientAreaFooterOutput', 1, function ($vars) {
//    if ($vars['templatefile'] == 'clientregister') {
//        return \BeonOrder\Controllers\Pages\Register::renderFooter();
//    }
//    return "";
//});

add_hook('ClientAreaHeaderOutput', 1, function($vars) {
    $id = 0;

    if (isset($_GET['gid'])) {
        if ($_SESSION['cart']['OrderFormTemplate'] == 'standard_cart' || $_SESSION['OrderFormTemplate'] == 'standard_cart' || $vars['cart'] == 'standard_cart' || $_SESSION['cart']['OrderFormTemplate'] == 'standart_cart' || $_SESSION['OrderFormTemplate'] == 'standart_cart' || $vars['cart'] == 'standart_cart') {
            unset($_SESSION['cart']['bundle']);
            unset($_SESSION['cart']['OrderFormTemplate']);
            unset($_SESSION['OrderFormTemplate']);
            $vars['carttpl']    = 'sobat_jagoan';
        }
    }

    if ($_GET['m'] == 'beon_order') {
        return;
    }

    if (!isset($_GET['pid']) && !isset($_GET['gid'])) {
        return;
    }

    if (!empty($_SESSION['cart']['bundle'])) {
        return;
    }

    if (isset($_GET['gid'])) {
        if (!array_key_exists('productsData', $vars)) {
            return;
        }

        $id = $vars['productsData'][0]['pid'];
    }

    if (isset($_GET['pid'])) {
        $id = $_GET['pid'];
    }

    $mProductGroup  = new ProductGroup();
    $product        = $mProductGroup->getProductById($id);
    if ($product['status'] != 1) {
        return;
    }
//    return "<script>window.location.href='/orders/products/".$id."';</script>";

    // Referral Parameter : refcode=0DFFD9C9&rs_campaign=859&rs_source=8545
    $referral_param     = "";
    if(array_key_exists('refcode',$_GET)){
        $referral_param = "?refcode=".$_GET['refcode'];

        if(array_key_exists('rs_campaign',$_GET)){
            $referral_param .= "&rs_campaign=".$_GET['rs_campaign'];
        }

        if(array_key_exists('rs_source',$_GET)){
            $referral_param .= "&rs_source=".$_GET['rs_source'];
        }
    }

    header("Location: /orders/products/".$id.$referral_param);
    die;
});