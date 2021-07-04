<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 07/05/18
 * Time: 11:08
 */

namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;

class Product
{
    public static function getPricing($productid, $productype='product'){
        $config = [
            'quarterly'     =>3,
            'semiannually'  =>6,
            'annually'      =>12,
            'biennially'    =>24,
            'triennially'   =>36
        ];
        $minPrice = [
            'billingcycle'   => '',
            'price'         => 0
        ];
        $billingcyclecount = 0;

        $product = Capsule::table('tblpricing')
            ->select('monthly','quarterly','semiannually','annually','biennially','triennially')
            ->where('relid','=',$productid)
            ->where('type','=',$productype)
            ->first();
        foreach ($product as $key =>$value){
            if($value!=-1){
                if ($minPrice['price'] == 0) {
                    $minPrice['billingcycle'] = $key;
                    $minPrice['price'] = $value;
                }

                $billingcyclecount+=1;
            };
        }
        $return = (array)$product;
        $datareturn  = $return;

//        echo intval($datareturn['annually']);
//        die;
//
//        print_r($datareturn);
//        die;
        $matchmonthlyprice = [
            'quarterly'     => 'qmonthprice',
            'semiannually'  => 'smonthprice',
            'annually'      => 'amonthprice',
            'biennially'    => 'bmonthprice',
            'triennially'   => 'tmonthprice',

        ];

        foreach ($return as $key => $item) {
            if(intval($item)==-1){
                $datareturn[$key]=-1;
                if($key!='monthly')$datareturn[$matchmonthlyprice[$key]] = -1;
            }else{
                if($key!='monthly')$datareturn[$matchmonthlyprice[$key]] = $return[$key]/$config[$key];
            }
        }




//        $return['qmonthprice']= $return['quarterly']!=false?$return['quarterly']/$config['quarterly']:-1;
//        $return['smonthprice']= $return['semiannually']!=false?$return['semiannually']/$config['semiannually']:-1;
//        $return['amonthprice']= $return['annually']!=false?$return['annually']/$config['annually']:-1;
//        $return['bmonthprice']= $return['biennially']!=false?$return['biennially']/$config['biennially']:-1;
//        $return['tmonthprice']= $return['triennially']!=false?$return['triennially']/$config['triennially']:-1;
        return [
            'productpricing'=>$datareturn,
            'billingcyclecount'=>$billingcyclecount,
            'minprice' => $minPrice
        ];
    }
    public static function getProductAddons($pid){
        $products = Capsule::table('tbladdons')
            ->where('packages','LIKE',"%{$pid}%")
            ->get();
        $return = [];
        foreach ($products as $product){
            $data    = (array)$product;
            $pricing = self::getPricing($product->id,'addon');
            $data['pricing'] = $pricing['productpricing']['monthly'];
            $return[] = $data;
        }
        return $return;
    }

    public static function getProductConfigOption($pid){
        $slider_configoptions = [
            'speed', // MixMatch
            'quota', // MixMatch
            'pmem', // MixMatch
            'storage', // Object Storage
            'Jumlah Akun', // for Espresso
            'RCM_REEHM_182', // for Cloud Mail
            'RCM_REEHM_183', // for Cloud Mail
            'RCM_REEHM_184', // for Cloud Mail
            'RCM_REEHM_185', // for Cloud Mail
        ];

        $productsConfig = Capsule::table('tblproductconfiglinks')
            ->join('tblproductconfigoptions','tblproductconfiglinks.gid','=','tblproductconfigoptions.gid')
            ->where('tblproductconfiglinks.pid',$pid)
            ->where('tblproductconfigoptions.hidden', '=', 0)
            ->orderBy('tblproductconfigoptions.order', 'ASC')
            ->get();
        $result     = [];

        foreach($productsConfig as $key => $value){
            $spltName   = explode("|",$value->optionname);
            $total      = count($spltName);
            if($total>1){
                $value->optionname  = $spltName[1];
            }
            $productssubConfig = Capsule::table('tblproductconfigoptionssub')
                ->where('tblproductconfigoptionssub.configid',$value->id)
                ->get();
            $options    = [];
            foreach($productssubConfig as $k => $v){
                $productssubConfigPricing = Capsule::table('tblpricing')
                    ->where('type','configoptions')
                    ->where('relid',$v->id)
                    ->first();
                $options[$k]  = [
                    "id" => $v->id,
                    "hidden" => $v->hidden,
                    "name" => $v->optionname,
                    "nameonly" => $v->optionname,
                    "recurring" => $productssubConfigPricing->monthly,
                    "all_recuring" => [
                        "monthly"       => $productssubConfigPricing->monthly,
                        "quarterly"     => $productssubConfigPricing->quarterly,
                        "semiannually"  => $productssubConfigPricing->semiannually,
                        "annually"      => $productssubConfigPricing->annually,
                        "biennially"    => $productssubConfigPricing->biennially,
                        "triennially"   => $productssubConfigPricing->triennially,
                    ],
                ];
            }

            $result[$key]   = [
                "id" => $value->id,
                "hidden" => $value->hidden,
                "optionname" => $value->optionname,
                "optioncode" => $spltName[0],
                "optiontype" => $value->optiontype,
                "selectedvalue" => $options[0]['id'],
                "selectedqty" => $value->qtyminimum,
                "selectedname" => $value->qtyminimum,
                "order" => $value->order,
                "selectedoption" => $options[0]['name'],
                "selectedsetup" => 0,
                "selectedrecurring" => 0,
                "qtyminimum" => $value->qtyminimum,
                "qtymaximum" => $value->qtymaximum,
                "options" => $options,
                "is_slider"=> in_array($spltName[0],$slider_configoptions)
            ];
        }
        return $result;
    }

    public static function getCustomfields($pid) {
        $apps_detailfields = [
            'WP_include_divi' => "Wordpress",
            'WP_include_LS' => "Wordpress",
        ];
        $products = Capsule::table('tblcustomfields')
            ->where('relid','=',$pid)
            ->get();
        $customfields = [];
        foreach ($products as $product){
            $product->description = htmlspecialchars_decode($product->description);
            $product->related_apps = array_key_exists($product->fieldname, $apps_detailfields)?
                $apps_detailfields[$product->fieldname]:"None";
            $product->value  = "";
            $customfields[] = $product;
        }
        return $customfields;
    }
}