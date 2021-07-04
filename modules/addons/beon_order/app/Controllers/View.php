<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 22/05/17
 * Time: 9:13
 */

namespace BeonOrder\Controllers;
use BeonOrder\Helpers\BeonOrderHelper;
use BeonOrder\Helpers\LogHelper;
use BeonOrder\Helpers\ProductHighlight;
use BeonOrder\Helpers\SocialProof;
use BeonOrder\Helpers\HotPrice;

class View
{
    public function main(){
        try{
            if(!BeonOrderHelper::is_active())throw new \Exception('Module Not Active');

            $js_script = '<script src="/modules/addons/beon_order/templates/six/assets/js/main.js"></script>';

            return [
                'status'=>1,
                'data'=> $js_script
            ];
        }catch (\Exception $e){
            return [
                'status'=>0,
                'message'=>$e->getMessage()
            ];
        }
    }
    public function renderHighlight($vars){
        $gid                        = $vars['gid'];
        $highlighthelper            = new ProductHighlight();
        $products                   = $highlighthelper->getProducts($gid);
//        echo $gid;
//        die;

        if(empty($products))return"";
        $highlightproducts          = [];
        foreach ($products as $product){
            $highlightproducts[$product->name] = $product;
        }
        $beon_ga_vars['gid']        = $gid;
        $beon_ga_vars['products']   = $highlightproducts;

        return "

            window.beon_highlighting_page = {
                config : ".json_encode($beon_ga_vars)."
            };

            var scriptHighlight = document.createElement('script');
            scriptHighlight.src = '/modules/addons/beon_order/templates/six/assets/js/highlighting.js';

            var readyHighlight = setInterval(function() {
                if (document.body) {
                    document.body.appendChild(scriptHighlight);
                    clearInterval(readyHighlight);
                }
            }, 1);
        ";
    }

    public function renderSocialProof($vars){
        $helper     = new SocialProof();
        $product    = $helper->getLastProduct();

        if(empty($product)) return "";

        return "
            window.beon_social_proof = {
                config : ".json_encode($product)."
            };

            var scriptSocialProof = document.createElement('script');
            scriptSocialProof.src = '/modules/addons/beon_order/templates/six/assets/js/social_proof.js';

            var readySocialProof = setInterval(function() {
                if (document.body) {
                    document.body.appendChild(scriptSocialProof);
                    clearInterval(readySocialProof);
                }
            }, 1);
        ";
    }

    public function renderHotPrice($vars){
        $gid        = $vars['gid'];
        $helper     = new HotPrice();
        $products   = $helper->getProducts($gid);
//        echo $gid;
//        die;

        if(empty($products))return"";
        $hotprice = [];
        foreach ($products as $product){
            $hotprice[$product->name] = $product;
        }
        $beon_ga_vars['gid']        = $gid;
        $beon_ga_vars['products']   = $hotprice;

        return "

            window.beon_hot_price_page = {
                config : ".json_encode($beon_ga_vars)."
            };

            var scriptHotPrice = document.createElement('script');
            scriptHotPrice.src = '/modules/addons/beon_order/templates/six/assets/js/hot_price.js';

            var readyHotPrice = setInterval(function() {
                if (document.body) {
                    document.body.appendChild(scriptHotPrice);
                    clearInterval(readyHotPrice);
                }
            }, 1);
        ";
    }
}