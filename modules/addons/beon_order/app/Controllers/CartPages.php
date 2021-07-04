<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 07/05/18
 * Time: 10:54
 */

namespace BeonOrder\Controllers;


use BeonOrder\Helpers\Product;
use BeonOrder\Libs\Logger\Exception;

class CartPages extends Base
{
    private $config;

    function __construct($vars)
    {
        parent::__construct($vars);
        $this->setConfig();
    }

    private function setConfig()
    {
        $this->config = [
            'configureproductdomain' => 'parseProductDetail'
        ];
    }

    public function route($templatefile)
    {
        $function = $this->config[$templatefile];
        if (array_key_exists($templatefile, $this->config)) {
            return $this->$function();
        }
        return $this->vars;
    }

    public function parseProductDetail()
    {

        $billingcycle = 'annually';
        $productid                              = $this->vars['productinfo']['pid'];
        $productpricing                         = Product::getPricing($productid);
        $productaddons                          = Product::getProductAddons($productid);
        $dataProduct                            = Product::getProductConfigOption($productid);
        $this->vars['productinfo']['pricelist'] = $productpricing['productpricing'];
        $this->vars['productinfo']['addons']    = $productaddons;
        $this->vars['billingcyclecount']        = $productpricing['billingcyclecount'];
        $this->vars['configurableoptions']      = $dataProduct;
        $this->vars['pricelist']                = $productpricing['productpricing'];

        if (isset($_SESSION['cart']['products'])) {

            $products = $_SESSION['cart']['products'];
            foreach ($products as $key => $value)
                $productsid[] = $value['pid'];

            if (in_array($productid,$productsid))
                return $this->vars;

            self::validateDomainService($productid);
        }

        self::generateCart([
            'product' => [
                'pid'           => $productid,
                'domain'        => '',
                'billing_cycle' => $billingcycle
            ]
        ]);

        return $this->vars;
    }

    public static function generateCart($carts)
    {

        $productcart = [
            'pid'           => $carts['product']['pid'],
            'domain'        => $carts['product']['domain'],
            'billingcycle'  => $carts['product']['billing_cycle'],
            'configoptions' => [],
            'customfields'  => "   ",
            'addons'        => [],
            'server'        => [],

        ];
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [
                'domainoptionspid' => $productcart['pid'],
                'products'         => [$productcart],
                //                'domains'           => $domaincarts,
                'cartsummarypid'   => $productcart['pid']
            ];
        } else {
            $_SESSION['cart']['domainoptionspid'] = $productcart['pid'];
            $_SESSION['cart']['cartsummarypid']   = $productcart['pid'];
            $_SESSION['cart']['products'][]       = $productcart;

            $domain = [];
            foreach ($_SESSION['cart']['domains'] as $tmpdomain) {
                $domain[$tmpdomain['domain']] = $tmpdomain['type'];
            }
        }

//        self::validateDomainService($carts['product']['pid']);

        if (isset($carts['domains'])) {
            $cartdomain = [];
            foreach ($carts['domains'] as $itemdomain) {
                $cartdomain = [
                    'type'            => $itemdomain['domaintype'],
                    'domain'          => $itemdomain['domain'],
                    'regperiod'       => $itemdomain['regperiod'],
                    'isPremium'       => '',
                    'dnsmanagement'   => '',
                    'emailforwarding' => '',
                    'idprotection'    => '',
                    'eppcode'         => '',
                    'fields'          => [],
                ];

                if (isset($domain)) {
                    if (array_key_exists($itemdomain['domain'], $domain) && in_array($itemdomain['domaintype'], $domain))
                        unset($cartdomain);
                }

                if (isset($cartdomain))
                    $_SESSION['cart']['domains'][] = $cartdomain;
            }
        }
    }

    public static function validateDomainService($pid)
    {
        try {

            $cartproducts = $_SESSION['cart']['products'];
            foreach ($cartproducts as $key => $cartproduct) {
                if ($cartproduct['pid'] != $pid && empty($cartproduct['domain'])) {
                    unset($_SESSION['cart']['products'][$key]);
                }
            }

            return [
                'status'  => 1,
                'message' => 'success clean service with no domain'
            ];

        } catch (Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage(),
            ];
        }
    }

    public static function addDomain($domain, $type, $pid, $regperiod = "")
    {
        try {
            $cartproducts           = $_SESSION['cart']['products'];
            $cartdomains            = $_SESSION['cart']['domains'];
            $tmpdomain              = '';
            $BeonOrderskipInsDomain = 0;

            foreach ($cartproducts as $key => $cartproduct) {
                if ($cartproduct['pid'] == $pid) {
                    if (!empty($cartproduct['domain']))
                        $tmpdomain = $cartproduct['domain'];

                    $_SESSION['cart']['products'][$key]['domain'] = $domain;
                    break;
                }
            }
            if ($tmpdomain != '') {
                foreach ($cartdomains as $key => $cartdomain) {
                    if ($cartdomain['domain'] == $tmpdomain) unset($_SESSION['cart']['domains'][$key]);
                }
            }
            if ($type != 'owndomain') {
                foreach ($_SESSION['cart']['domains'] as $key => $cartdomain) {
                    if ($cartdomain['domain'] == $domain)
                        $BeonOrderskipInsDomain = 1;

                }

                if ($BeonOrderskipInsDomain != 1) {
                    $_SESSION['cart']['domains'][] = [
                        'type'            => $type,
                        'domain'          => $domain,
                        'regperiod'       => $regperiod,
                        'isPremium'       => '',
                        'dnsmanagement'   => '',
                        'emailforwarding' => '',
                        'idprotection'    => '',
                        'eppcode'         => '',
                        'fields'          => [],
                    ];
                }
            }
            return [
                'status'  => 1,
                'message' => 'success'
            ];
        } catch (\Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public static function addConfigOptions($configoptions, $pid)
    {
        $productkey = '';
        foreach ($_SESSION['cart']['products'] as $key => $value) {
            if ($value['pid'] == $pid) {
                $productkey = $key;
                break;
            }
        }

        foreach ($configoptions as $key => $value) {
            $_SESSION['cart']['products'][$productkey]['configoptions'][$key] = $value;
        }
        return [
            'status'  => 1,
            'message' => 'success'
        ];
    }

    public static function changeBillingcycle($pid, $billingcycle)
    {
        $productkey = '';
        foreach ($_SESSION['cart']['products'] as $key => $value) {
            if ($value['pid'] == $pid) {
                $productkey = $key;
                break;
            }
        }
        $_SESSION['cart']['products'][$productkey]['billingcycle'] = $billingcycle;
        return [
            'status'  => 1,
            'message' => 'success'
        ];
    }

    public static function addServerConfig($pid, $sever)
    {
        $productkey = '';
        foreach ($_SESSION['cart']['products'] as $key => $value) {
            if ($value['pid'] == $pid) {
                $productkey = $key;
                break;
            }
        }
        $_SESSION['cart']['products'][$productkey]['server'] = $sever;
        return [
            'status'  => 1,
            'message' => 'success'
        ];
    }

    public static function addAppConfig($pid, $customfieldId, $customfieldValue)
    {
        $productkey = '';
        foreach ($_SESSION['cart']['products'] as $key => $value) {
            if ($value['pid'] == $pid) {
                $productkey = $key;
                break;
            }
        }
        $customfieldData = FALSE;
        if (!empty($customfieldValue)) {
            $customfieldData = [];
            foreach ($customfieldValue as $each) {
                if (!empty($each['value'])) {
                    $customfieldData[$each['name']] = $each['value'];
                }
            }
            $customfieldData = json_encode($customfieldData);
        }
        if ($customfieldData == TRUE) {
            $_SESSION['cart']['products'][$productkey]['customfields'] = [$customfieldId => $customfieldData];
        }

        return [
            'status'  => 1,
            'message' => 'success'
        ];
    }

    public function checkProductRequiredDomain($vars)
    {
        $items = $vars['products'];

        $needDomain = 0;
        foreach ($items as $key) {
            $domain    = $key['domain'];
            $productId = $key['productinfo']['pid'];

            $checkModel          = new \BeonOrder\Models\Adapter\Whmcs\Product();
            $checkRequiredDomain = $checkModel->checkRequiredDomain($productId);

            $requiredDomain = $checkRequiredDomain['data']['showdomainoptions'];

            if ($requiredDomain == 1 AND $domain == '') {
                $needDomain++;
            }
        }

        return $needDomain;
    }
}
