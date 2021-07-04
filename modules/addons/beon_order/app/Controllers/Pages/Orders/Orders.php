<?php

namespace BeonOrder\Controllers\Pages\Orders;

use BeonOrder\Controllers\Apis\Vps\Vps;
use BeonOrder\Helpers\Config;
use BeonOrder\Controllers\Pages\PageBase;
use BeonOrder\Helpers\Invoices;
use BeonOrder\Helpers\OrderView;
use BeonOrder\Helpers\Promotions\Promotions;
use BeonOrder\Helpers\Referral;
use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Helpers\ResumeOrderHelper;
use BeonOrder\Controllers\Base;
use BeonOrder\Models\Adapter\Whmcs\Payments;
use BeonOrder\Models\AppsHosting;

class Orders extends PageBase
{
    public $hConfig;
    private $systemuri;
    private $base_api_uri='index.php?m=beon_order&action=api';
    public function __construct($vars)
    {
        parent::__construct($vars);
        $this->hConfig = new Config();
        $this->setSystemUri();
    }
    private function setSystemUri(){
        $uri = $this->hConfig->getSystemConfig('SystemURL');
        $this->systemuri = $uri['data']->value;
    }

    public function init(){
        try{
            $data               = [
                'base_url'              => $this->systemuri,
                'base_api_url'          => $this->base_api_uri,
                'is_loggedin'           => (isset($_SESSION['uid'])) ? true : false,
                'products'              => [],
                'product_groups'        => [],
                'product_in_group'      => [],
                'group_type'            => [],
                'ttl'                   => '',
                'vps_x'                 => [],
                'payment'               => [],
                'use_domain_only'       => [],
                'persyaratan_domain'    => [],
                'vpsx_link_tutorial'    => [],
                'referral_promocode'    => [],
                'user_id'               => $_SESSION['uid'],
                'upsales_product'       => []
            ];

            $this->templatefile = 'orders/index.tpl';
            $this->requirelogin = false;

            // Get TTL
            $hOrder         = new OrderView();
            $getExpiryTime  = $hOrder->getExpiryTime();
            if ($getExpiryTime['status'] != 1)
                throw new \Exception($getExpiryTime['message']);

            $data["ttl"] = $getExpiryTime['data'];

            $this->vars['orderconfigs'] = json_encode($data);

            $this->products();
            $this->getPaymentMethod();
            $this->getUseDomainOnly();
            $this->getPersyaratanDomain();
            $this->getTutorialVpsX();
            $this->getDetailReferral();
            $this->getUpsalesProduct();
            $this->getDefaultProducTConfig();
            $this->getHostingAppsConfig();
            $this->getGimmickPrice();
            $this->getGimmickSelection();
            $this->getGimmickDomain();

        }catch (\Exception $exception){
            $this->errorPage = 1;
        }
    }

    public function products() {
        try{
            $hOrder         = new OrderView();
            $showProduct    = $hOrder->showProducts();
            if ($showProduct['status'] != 1)
                throw new \Exception($showProduct['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);

            $orderconfigs['products']           = $showProduct['data']['products'];
            $orderconfigs['product_groups']     = $showProduct['data']['product_groups'];
            $orderconfigs['product_in_group']   = $showProduct['data']['product_in_group'];
            $orderconfigs['group_type']         = $showProduct['data']['group_type'];
            $orderconfigs['vps_x']              = $showProduct['data']['vps_x'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
        }
    }

    public function getPaymentMethod() {
        try{
            $paymentmodels = new Payments();
            $getPayment = $paymentmodels->getPaymentMethod();
            if ($getPayment['status'] != 1)
                throw new \Exception($getPayment['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['payment']           = $getPayment['data'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getUseDomainOnly() {
        try {
            $hConfig    = new Config();
            $getModule  = $hConfig->getModulesConfig('use_domain_only');
            if ($getModule['status'] != 1)
                throw new \Exception($getModule['message']);

            $arrValue   =  explode(",", $getModule['data']->value);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['use_domain_only']    = $arrValue;

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getPersyaratanDomain() {
        try{
            $hOrder         = new OrderView();
            $get            = $hOrder->getPersyaratanDomain();
            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['persyaratan_domain']    = $get['data'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getTutorialVpsX() {
        try{
            $hVps   = new \BeonOrder\Helpers\Vps();
            $fetch  = $hVps->fetchOsTemplates();
            if ($fetch['status'] != 1)
                throw new \Exception($fetch['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['vpsx_link_tutorial']    = $fetch['data'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    // Add promo for referral
    public function getDetailReferral() {
        try{
            if ($_GET['order'] != 'products') {
                throw new \Exception('URL cannot use in this page');
            }

            $userid     = $_SESSION['uid'];
            $pid        = $_GET['pid'];

            $url_components = parse_url($_SERVER['REQUEST_URI']);
            parse_str(html_entity_decode($url_components['query']), $params);

            if (!array_key_exists('refcode', $params)) {
                throw new \Exception('Cannot find refcode');
            }

            $refcode    = $params['refcode'];
            $mReferral  = new Referral();
            $get        = $mReferral->getCouponReferral($refcode, $pid);
            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            $params = [
                "pid"   => $pid,
                "referrer_userid"   => $get['data']['referrer_userid']
            ];

            $promotionhelper = new Promotions();
            $validate = $promotionhelper->validate($userid, $get['data']['promo_code'], $params);
            if ($validate['status'] != 1)
                throw new \Exception($validate['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['referral_promocode']    = $validate['data'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage(),
            ];
        }
    }

    public function getUpsalesProduct() {
        try{
            $hOrder         = new OrderView();
            $get            = $hOrder->getUpsalesProduct();
            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
            $orderconfigs['upsales_product']    = $get['data'];

            $this->vars['orderconfigs'] = json_encode($orderconfigs);

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }
    private function getDefaultProducTConfig(){
        $defaul_configurations= [
            'configoptions' =>[],
            'billingcycle'  =>'',
            'customfields'  =>[],
            'promocode'     =>'',
            'apps_template' =>null
        ];
        $url_components = parse_url($_SERVER['REQUEST_URI']);
        parse_str(html_entity_decode($url_components['query']), $params);

        if(array_key_exists('configoptions', $params)){
            foreach ($params['configoptions'] as $key =>$value){
                $defaul_configurations['configoptions'][] = [
                    'id'=>$key,
                    'value'=>$value
                ];
            }
        }
        if(array_key_exists('billingcycle', $params))
            $defaul_configurations['billingcycle'] = $params['billingcycle'];
        if(array_key_exists('customfields', $params)){
            foreach ($params['customfields'] as $key =>$value){
                $defaul_configurations['customfields'][] = [
                    'id'=>$key,
                    'value'=>$value
                ];
            }
        }
        if(array_key_exists('promocode', $params))
            $defaul_configurations['promocode'] = $params['promocode'];

        if(array_key_exists('apps_template', $params)){
            $defaul_configurations['apps_template'] =
                $this->getAppInstaller(
                    $params['apps_template'],
                    $params['app_domain'],
                    $params['app_id']
                );
        }

        $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
        $orderconfigs['default_configurations']    = $defaul_configurations;
        $this->vars['orderconfigs'] = json_encode($orderconfigs);
    }
    private function getGimmickPrice(){
        $gimmickprice = [];

        $url_components = parse_url($_SERVER['REQUEST_URI']);
        parse_str(html_entity_decode($url_components['query']), $params);

        $helper = new OrderView();
        $gimmickpricedata = $helper->getGimmickPrice();
        if($gimmickpricedata['status']==1)
            $gimmickprice = $gimmickpricedata['data'];

        $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
        $orderconfigs['product_gimmickprice']    = $gimmickprice;
        $this->vars['orderconfigs'] = json_encode($orderconfigs);

    }
    private function getGimmickDomain(){
        $gimmickprice = [];

        $url_components = parse_url($_SERVER['REQUEST_URI']);
        parse_str(html_entity_decode($url_components['query']), $params);

        $helper = new OrderView();
        $gimmickpricedata = $helper->getGimmickDomain();
        if($gimmickpricedata['status']==1)
            $gimmickprice = $gimmickpricedata['data'];

        $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
        $orderconfigs['domains_gimmick']    = $gimmickprice;
        $this->vars['orderconfigs'] = json_encode($orderconfigs);

    }
    private function getGimmickSelection(){
        $gimmickprice = [];

        $url_components = parse_url($_SERVER['REQUEST_URI']);
        parse_str(html_entity_decode($url_components['query']), $params);
        $helper = new OrderView();
        $gimmickpricedata = $helper->getGimmickSelection();
        if($gimmickpricedata['status']==1)
            $gimmickprice = $gimmickpricedata['data'];
        $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
        $orderconfigs['product_gimmickselection']    = $gimmickprice;
        $this->vars['orderconfigs'] = json_encode($orderconfigs);
    }

    private function getHostingAppsConfig(){
        $mAppsHosting   = new AppsHosting();
        $dataHosting    = $mAppsHosting->get();
        $category       = [];
        $apps           = [
            'None'=>array(
                'tag'=>'',
                'desc'=>'',
                'link'=>''
            )
        ];
        if($dataHosting['status']==1){
            foreach($dataHosting['data'] as $key => $value){
                $category[]     = $value->category;
                $apps[$value->name]         = [
                    'tag'       => $value->name.",".$value->tag,
                    'desc'      => $value->desc,
                    'link'      => $value->link,
                    'img'       => $value->img,
                ];
            }
        }
        $dataApps   = [
            'Category'  => array_values(array_unique($category)),
            'Apps'      => $apps
        ];
        $orderconfigs = (array)json_decode($this->vars['orderconfigs']);
        $orderconfigs['default_installerhostingapps']    = $dataApps;
        $this->vars['orderconfigs'] = json_encode($orderconfigs);
    }

    private function getAppInstaller($apps, $app_url, $configid){
        $template_apps = [
            'moodle'=>[
                'hostname'                  => "host.{$app_url}",
                'vps_pwd'                   => $this->generateRandomString(12),
                'apps_name'                 => 'moodle',
                'configid'                  => $configid,
                'apps_type'                 => 'aio',
                'apps_Os'                   => 'Centos 7',
                'config'                    => [
                    ['name'=>'moodle_blog_admin_name',  'value'=>'admin123'],
                    ['name'=>'moodle_blog_admin_email', 'value'=>"admin@{$app_url}"],
                    ['name'=>'moodle_blog_url',         'value'=>$app_url],
                    ['name'=>'moodle_blog_admin_pass',  'value'=>$this->generateRandomString(12)],
                    ['name'=>'moodle_db_name',  'value'=>"moodle_db"],
                    ['name'=>'moodle_db_user',  'value'=>"moodle_user"],
                    ['name'=>'moodle_db_pass',  'value'=>$this->generateRandomString(12)],
                ]
            ],
            'zyacbt'=>[
                'hostname'              => "host.{$app_url}",
                'vps_pwd'               => $this->generateRandomString(12),
                'apps_name'             => 'zyacbt',
                'configid'              => $configid,
                'apps_type'             => 'aio',
                'apps_Os'               => 'Ubuntu 18.04',
                'config'                    => [
                    ['name'=>'zyacbt_cbt_url',          'value'=>$app_url],
                    ['name'=>'zyacbt_cbt_admin_name',   'value'=>"admin_123"],
                    ['name'=>'zyacbt_cbt_admin_pass',   'value'=>$this->generateRandomString(12)],
                    ['name'=>'zyacbt_db_name',          'value'=>"zya_db"],
                    ['name'=>'zyacbt_db_user',          'value'=>"zya_user"],
                    ['name'=>'zyacbt_db_pass',          'value'=>$this->generateRandomString(12)],
                ]
            ],
            'wordpress'=>[
                'hostname'              => "host.{$app_url}",
                'vps_pwd'               => $this->generateRandomString(12),
                'apps_name'             => 'wordpress',
                'configid'              => $configid,
                'apps_type'             => 'aio',
                'apps_Os'               => 'Centos 7',
                'config'                    => [
                    ['name'=>'wordpress_blog_url',          'value'=>$app_url],
                    ['name'=>'wordpress_blog_admin_name',   'value'=>"admin_123"],
                    ['name'=>'wordpress_blog_admin_email', 'value'=>"admin@{$app_url}"],
                    ['name'=>'wordpress_blog_admin_pass',   'value'=>$this->generateRandomString(12)],
                    ['name'=>'wordpress_db_name',          'value'=>"wordpress_db"],
                    ['name'=>'wordpress_db_user',          'value'=>"wordpress_user"],
                    ['name'=>'wordpress_db_pass',          'value'=>$this->generateRandomString(12)],
                ]
            ],

        ];
        return array_key_exists($apps, $template_apps)
            ?$template_apps[$apps]:null;
    }
    private function generateRandomString($length = 12) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&_+-';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }


    public function addService(){
        try{
            $data               = [
                'base_url'              => $this->systemuri,
                'base_api_url'          => $this->base_api_uri,
                'is_loggedin'           => (isset($_SESSION['uid'])) ? true : false,
                'products'              => [],
                'product_groups'        => [],
                'product_in_group'      => [],
                'group_type'            => [],
                'ttl'                   => '',
                'vps_x'                 => [],
                'payment'               => [],
                'use_domain_only'       => [],
                'persyaratan_domain'    => [],
                'vpsx_link_tutorial'    => [],
                'referral_promocode'    => [],
                'user_id'               => $_SESSION['uid'],
                'upsales_product'       => []
            ];
            $this->templatefile = 'orders/productgroup.tpl';
            $this->requirelogin = false;
            $this->pagetitle= 'Tambah Layanan Baru';
            $this->breadcrumb = [
                'clientarea.php'=>'Client Area',
                'index.php?m=beon_order&action=add-service'=>'Add Services'
            ];

            // Get TTL
            $hOrder         = new OrderView();
            $getExpiryTime  = $hOrder->getExpiryTime();
            if ($getExpiryTime['status'] != 1)
                throw new \Exception($getExpiryTime['message']);

            $data["ttl"] = $getExpiryTime['data'];

            $this->vars['orderconfigs'] = json_encode($data);

            $this->products();
            $order_configs = json_decode($this->vars['orderconfigs'],1);

            foreach ($order_configs['group_type'] as $type_name => $order_config){
                $product_group = [
                    'product_group'     =>[],
                    'total_product'     =>0,
                ];
                foreach ($order_config as $group_item){
                    $product_group['total_product'] +=
                        count($order_configs['product_in_group'][$group_item['gid']]);
                    $group_item['product_ingroup'] = $order_configs['product_in_group'][$group_item['gid']];
                    $product_group['product_group'][] = $group_item;
                }
                $product_grouping[$type_name] = $product_group;
            }
            $order_configs['group_type'] = $product_grouping;
            $this->vars['orderconfigs'] = $order_configs;
        }catch (\Exception $exception){

        }
    }

}