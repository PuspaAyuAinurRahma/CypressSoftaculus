<?php

namespace BeonOrder\Helpers;

use BeonOrder\Models\CrossSaleProduct;
use BeonOrder\Models\GimmickDomains;
use BeonOrder\Models\GimmickPricing;
use BeonOrder\Models\GimmickSelection;
use BeonOrder\Models\PersyaratanDomain;
use BeonOrder\Models\ProductGroup;
use BeonOrder\Models\Products;
use BeonOrder\Models\UpsaleProduct;
use BeonOrder\Models\MasterCrossSales;

class OrderView
{
    public function showProducts() {
        try{
            $result = [
                'product_groups'    => [],
                'products'          => [],
                'product_in_group'  => [],
                'group_type'        => [],
                'vps_x'             => [],
            ];

            $getProductGroups = $this->getProductGroups();
            if ($getProductGroups['status'] != 1)
                throw new \Exception($getProductGroups['message']);

            $result['product_groups'] = $getProductGroups['data'];

            $getProducts = $this->getProducts();
            if ($getProducts['status'] != 1)
                throw new \Exception($getProducts['message']);

            $getGroupType = $this->getGroupType();
            if ($getGroupType['status'] != 1)
                throw new \Exception($getGroupType['message']);

            $products = $getProducts['data']['products'];
            $getCrossSale = $this->getCrossSale($products);
            if ($getCrossSale['status'] == 1) {
                $products = $getCrossSale['data'];
            }

            $getMCross = $this->getMasterCrossSales($products);
            if ($getMCross['status'] == 1){
                $products = $getMCross['data'];
            }

            $result['products']         = $products;
            $result['product_in_group'] = $getProducts['data']['product_in_group'];
            $result['group_type']       = $getGroupType['data'];
            $result['vps_x']            = $getProducts['data']['vpsx'];

            return [
                'status'    => 1,
                'data'      => $result
            ];

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage(),
            ];
        }
    }

    public function getProductGroups() {
        try{
            $mProductGroup  = new ProductGroup();
            $getGroup       = $mProductGroup->getProductGroups();
            if ($getGroup['status'] != 1)
                throw new \Exception($getGroup['message']);

            $groups = [];

            foreach ($getGroup['data'] as $value) {
                $groups[$value->id] = $value->name;
            }

            return [
                'status'    => 1,
                'data'      => $groups
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getProducts() {
        try{
            $mProductGroup  = new ProductGroup();
            $getProducts    = $mProductGroup->getProducts();
            if ($getProducts['status'] != 1)
                throw new \Exception($getProducts['message']);

            $list_pid = [];
            $results = [];
            foreach ($getProducts['data'] as $value) {
                $list_pid[] = $value->productid;
                $results['product_in_group'][$value->groupid][] = $value->productid;
            }

            $list_pid           = array_unique($list_pid);
            $getDetailProducts  = $this->getDetailProducts($list_pid);
            if ($getDetailProducts['status'] != 1)
                throw new \Exception($getDetailProducts['message']);
            $results['products'] = $getDetailProducts['data']['products'];

            // Find VPS X product
            $vpsx               = $this->findVpsX($results['products']);
            $results['vpsx']    = $vpsx;

            return [
                'status'    => 1,
                'data'      => $results
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getDetailProducts($products = []) {
        try{
            $result = [
                'products'          =>  [],
            ];

            $hProducts = new Product();
            $mProducts = new Products();
            foreach ($products as $value) {
                $getPricing         = $hProducts->getPricing($value);
                $getCustomfield     = $hProducts->getCustomfields($value);
                $getProductConfig   = $hProducts->getProductConfigOption($value);
                $getDetailProduct   = $mProducts->getProductName($value);
                if ($getDetailProduct['status'] != 1)
                    throw new \Exception($getDetailProduct['message']);

                $calculatePriceConfigoptions = $this->configoptionsCalculatePrice($getProductConfig);

                $result['products'][$value]['details']          = $getDetailProduct['data'];
                $result['products'][$value]['pricing']          = $getPricing;
                $result['products'][$value]['config']           = $getProductConfig;
                $result['products'][$value]['config_pricing']   = $calculatePriceConfigoptions["data"];
                $result['products'][$value]['customfields']     = $getCustomfield;

                if ($getPricing["minprice"]["price"] > 0) {
                    $result['products'][$value]['product_pricing']      = true;
                } else {
                    $result['products'][$value]['product_pricing']      = false;
                }
            }

            return [
                'status'    => 1,
                'data'      => $result
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getExpiryTime() {
        try{
            $hConfig    = new Config();
            $getModule  = $hConfig->getModulesConfig('cart_expiry_time');
            if ($getModule['status'] != 1)
                throw new \Exception($getModule['message']);

            return [
                "status"    => 1,
                "data"      => $getModule['data']->value
            ];
        } catch (\Exception $e) {
            return [
                "status"    => 0,
                "message"   => $e->getMessage()
            ];
        }
    }

    public function configoptionsCalculatePrice($productConfig) {
        try{
            $all_recuring = [
                "monthly"       => 0,
                "quarterly"     => 0,
                "semiannually"  => 0,
                "annually"      => 0,
                "biennially"    => 0,
                "triennially"   => 0,
            ];

            foreach ($productConfig as $config) {
                foreach ($config['options'] as $value) {
                    if ($value["id"] == $config["selectedvalue"]) {
                        $all_recuring["monthly"]        += $value["all_recuring"]["monthly"];
                        $all_recuring["quarterly"]      += $value["all_recuring"]["quarterly"];
                        $all_recuring["semiannually"]   += $value["all_recuring"]["semiannually"];
                        $all_recuring["annually"]       += $value["all_recuring"]["annually"];
                        $all_recuring["biennially"]     += $value["all_recuring"]["biennially"];
                        $all_recuring["triennially"]    += $value["all_recuring"]["triennially"];
                    }
                }
            }

            return [
                "status"    => 1,
                "data"      => $all_recuring
            ];
        } catch (\Exception $e) {
            return [
                "status"    => 0,
                "message"   => $e->getMessage()
            ];
        }
    }

    public function getGroupType() {
        try{
            $mProductGroup  = new ProductGroup();
            $getGroupType   = $mProductGroup->getGroupType();
            if ($getGroupType['status'] != 1)
                throw new \Exception($getGroupType['message']);

            $groupTypes = [];
            foreach ($getGroupType['data'] as $group) {
                $groupTypes[$group->type][] = [
                    "gid"       => $group->groupid,
                    "groupname" => $group->groupname
                ];
            }

            return [
                "status"    => 1,
                "data"      => $groupTypes
            ];
        } catch (\Exception $e) {
            return [
                "status"    => 0,
                "message"   => $e->getMessage()
            ];
        }
    }

    public function getPersyaratanDomain() {
        try{
            $mPersyaratan   = new PersyaratanDomain();
            $get            = $mPersyaratan->get();
            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            return [
                'status'    => 1,
                'data'      => $get['data']
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function findVpsX($products) {
        $vpsx = [];

        foreach ($products as $key=>$product) {
            if ($product['details']['servertype'] == 'jhcloudvps') {
                $vpsx[] = $key;
            }
        }

        return $vpsx;
    }

    public function getUpsalesProduct() {
        try{
            $mPersyaratan   = new UpsaleProduct();
            $get            = $mPersyaratan->get();
            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            return [
                'status'    => 1,
                'data'      => $get['data']
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function getCrossSale($products) {
        try{
            $mCrossSale = new CrossSaleProduct();
            $get        = $mCrossSale->get();

            if ($get['status'] != 1)
                throw new \Exception($get['message']);

            $arr_crossale = [];
            foreach ($get['data'] as $product) {
                $arr_crossale['list_pid'][] = $product->pid;
                $arr_crossale['cross_sale_to'][$product->pid] = explode(",", $product->cross_sale_to);
                $arr_crossale['text'][$product->pid] = $product->text;
                $arr_crossale['type'][$product->pid] = $product->cross_type;
            }

            $detailProduct = $this->getDetailProducts($arr_crossale['list_pid']);
            if ($detailProduct['status'] != 1)
                throw new \Exception($detailProduct['message']);

            foreach ($arr_crossale['cross_sale_to'] as $id=>$value) {
                foreach ($value as $product) {
                    $products[$product]['cross_sales'][$id] = $detailProduct['data']['products'][$id];
                    $products[$product]['cross_sales'][$id]['text'] = $arr_crossale['text'][$id];
                    $products[$product]['cross_sales'][$id]['type'] = $arr_crossale['type'][$id];
                    $products[$product]['cross_sales'][$id]['tes'] = "yeyskdsd";
                }
            }

            return [
                'status'    => 1,
                'data'      => $products
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }
    public function getGimmickPrice(){
        try{
            $return = [];
            $gimmickpricingmodel = new GimmickPricing();
            $datagimmick    = $gimmickpricingmodel->getActive();
            if($datagimmick['status']!=1)
                throw new \Exception($datagimmick['message']);
            foreach ($datagimmick['data'] as $gimmick){
                $return[$gimmick->pid][] = $gimmick;
            }
            return [
                'status'=>1,
                'data'  => $return
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function getGimmickDomain(){
        try{
            $return = [];
            $gimmickpricingmodel = new GimmickDomains();
            $datagimmick    = $gimmickpricingmodel->getActive();
            if($datagimmick['status']!=1)
                throw new \Exception($datagimmick['message']);
            foreach ($datagimmick['data'] as $gimmick){
                $return[$gimmick->extension]= $gimmick;
            }
            return [
                'status'=>1,
                'data'  => $return
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function getGimmickSelection(){
        try{
            $return = [];
            $gimmickpricingmodel = new GimmickSelection();
            $datagimmick    = $gimmickpricingmodel->getActive();
            if($datagimmick['status']!=1)
                throw new \Exception($datagimmick['message']);
            foreach ($datagimmick['data'] as $gimmick){
                $return[$gimmick->pid]= $gimmick;
            }
            return [
                'status'=>1,
                'data'  => $return
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function getMasterCrossSales($products) {
        try{
            $mCrossSales = new MasterCrossSales();
            $resMasterCross    = $mCrossSales->get();

            if ($resMasterCross['status'] != 1)
                throw new \Exception($resMasterCross['message']);

            $arr_pid = [];
            foreach ($resMasterCross['data'] as $item) {
                $arr_pid[] = $item->product_id;
            }

            $detailProduct = $this->getDetailProducts($arr_pid);
            if ($detailProduct['status'] != 1)
                throw new \Exception($detailProduct['message']);

            foreach ($resMasterCross['data'] as $key => $item) {
                $products[$item->pid]['master_cross_sales'][$item->required_billing_cycle][] = [
                    'id'        => $item->id,
                    'template'  => $item->template,
                    'product_id' => $item->product_id,
                    'product_details' => $detailProduct['data']['products'][$item->product_id],
                    'required_product' => $item->pid,
                    'required_billing_cycle' => $item->required_billing_cycle,
                    'billing_cycle_cross_sales' => $item->billing_cycle_cross_sales,
                    'description'   => $item->description
                ];
            }

            return [
                'status'    => 1,
                'data'      => $products
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }
}
