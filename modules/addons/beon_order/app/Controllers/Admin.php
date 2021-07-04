<?php
namespace BeonOrder\Controllers;

use Illuminate\Database\Capsule\Manager as Capsule;

use BeonOrder\Helpers\ProductHighlight;
use BeonOrder\Helpers\HotPrice;

class Admin extends Base
{
    public function ConfigOrder() {
        $helper_highlight = new ProductHighlight();
        $helper_hot_price = new HotPrice();

        $products       = Capsule::table('tblproducts')
                            ->leftJoin('tblpricing','tblproducts.id','=','tblpricing.relid')
                            ->select(
                                'tblproducts.*',
                                'tblpricing.monthly',
                                'tblpricing.quarterly',
                                'tblpricing.semiannually',
                                'tblpricing.annually',
                                'tblpricing.biennially',
                                'tblpricing.triennially'
                            )
                            ->where('tblpricing.type','product')
                            //->where('tblproducts.hidden', 0)
                            ->get();

        $product_groups = Capsule::table('tblproductgroups')
                            //->where('hidden', 0)
                            ->get();

        if($this->vars['post']['action'] == 'update') {
            $gid = $this->vars['post']['group'];
            foreach($this->vars['post']['hot_price'] as $khp => $vhp) {
                $result = $helper_hot_price->setPrice($gid, $khp, $vhp, $this->vars['post']['selected_price'][$khp]);
            }

            $helper_highlight->runUpdate($gid, $this->vars['post']['highlight']);
        }

        foreach($product_groups as $kg => $vg) {
            $product_groups[$kg]->highlight = $helper_highlight->getProducts($vg->id);
        }

        foreach($products as $kp => $vp) {
            $found_price = $helper_hot_price->getPrice($vp->id);

            $products[$kp]->hot_price       = $found_price['price'];
            $products[$kp]->selected_price  = $found_price['selected'];
        }

        $this->loadTemplate("/ConfigOrder",[
            'products'          => $products,
            'product_groups'    => $product_groups,
        ]);

    }
}