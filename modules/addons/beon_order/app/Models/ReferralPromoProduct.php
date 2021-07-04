<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class ReferralPromoProduct
{

    private $table = "jagoanpoin_referral_product";
    private $product_table = "tblproducts";
    private $product_group_table = "tblproductgroups";

    public function getReferralProductById($productId)
    {
        try {

            $get = Capsule::table($this->table)
                ->where('product_id', $productId)
                ->where('status', 'active')->first();

            if (!$get OR empty($get))
                throw new \Exception('referral product and promo not found');

            return [
                'status' => 1,
                'data'   => $get
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage()
            ];
        }
    }

    public function fetchActiveReferralProduct()
    {
        try {
            $get = Capsule::table($this->table . ' as p')
                ->leftJoin($this->product_table . ' as pd', 'p.product_id', '=', 'pd.id')
                ->leftJoin($this->product_group_table . ' as pgd', 'pd.gid', '=', 'pgd.id')
                ->select("p.*", "pd.name as product_name", "pgd.name as package_name", "pgd.id as package_id")
                ->where('p.status', 'active')->get();

            if (!$get OR empty($get))
                throw new \Exception('Product for referral not found');

            return [
                'status' => 1,
                'data'   => $get
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage()
            ];
        }
    }

    public function getProductById($productId)
    {
        try {

            if (empty($productId))
                throw new \Exception('product id cant be empty');

            $get = Capsule::table($this->product_table . ' as pd')
                ->leftJoin($this->product_group_table . ' as pgd', 'pd.gid', '=', 'pgd.id')
                ->select("pd.*", "pd.name as product_name", "pgd.name as package_name", "pgd.id as package_id")
                ->where('pd.id', $productId)->first();

            if (!$get OR empty($get))
                throw new \Exception('Product not found');

            return [
                'status' => 1,
                'data'   => $get
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage()
            ];
        }
    }

}
