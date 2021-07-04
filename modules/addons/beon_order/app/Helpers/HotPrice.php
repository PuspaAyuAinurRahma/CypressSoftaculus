<?php
namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;

class HotPrice
{
    public function getProducts($gid=""){
        $config_cycle = [
            'monthly'=>1,
            'quarterly'=>3,
            'semiannually'=>6,
            'annually'=>12,
            'biennially'=>24,
            'triennially'=>36
        ];

        $table = Capsule::table('mod_beonorder_hot_price')
            ->select('mod_beonorder_hot_price.id',
                'mod_beonorder_hot_price.pid as pid',
                'mod_beonorder_hot_price.gid as gid',
                'mod_beonorder_hot_price.value as price',
                'mod_beonorder_hot_price.selected_price as selected',
                'tblproducts.name as name',
                'tblpricing.monthly',
                'tblpricing.quarterly',
                'tblpricing.semiannually',
                'tblpricing.annually',
                'tblpricing.biennially',
                'tblpricing.triennially'
            )
            ->join('tblproducts','mod_beonorder_hot_price.pid','=','tblproducts.id')
            ->join('tblpricing','tblpricing.relid','=','tblproducts.id')
            ->where('tblpricing.type','product');
        if(!empty($gid))$table->where('mod_beonorder_hot_price.gid',$gid);
        $hot_price = $table->get();
        foreach($hot_price as $k => $v) {
            $hot_price[$k]->price_view = 'Rp. ' . number_format($v->price, 2, ',', '.');
            if(!empty($v->selected)) {
                $selected = $v->selected;
                $hot_price[$k]->price_annually_view = 'Rp. ' . number_format(($v->$selected/12), 2, ',', '.');
                $hot_price[$k]->price_monthly_view = 'Rp. ' . number_format(($v->$selected/$config_cycle[$selected]), 2, ',', '.');
            } else {
                $hot_price[$k]->price_annually_view = "";
                $hot_price[$k]->price_monthly_view = "";
            }
        }

        return $hot_price;
    }

    public function setPrice($gid, $pid, $price, $selected_price){
        try {
            $found = Capsule::table('mod_beonorder_hot_price')
                ->where('pid', $pid)
                ->first();

            if(!empty($found)) {
                Capsule::table('mod_beonorder_hot_price')
                    ->where('pid', $pid)
                    ->update([
                        'value' => $price,
                        'selected_price' => $selected_price,
                    ]);

            } else {
                $insert = Capsule::table('mod_beonorder_hot_price')
                            ->insert([
                                'pid'   => $pid,
                                'gid'   => $gid,
                                'value' => $price,
                                'selected_price' => $selected_price,
                            ]);
            }

            return [
                'status'    => 1,
                'message'   => 'Update Data OK'
            ];
        } catch(\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e,
            ];
        }
    }

    public function deletePrice($pid){
        try {
            $found = Capsule::table('mod_beonorder_hot_price')
                ->where('pid', $pid)
                ->first();

            if(empty($found)) throw new \Exception('Empty Data');

            $delete = Capsule::table('mod_beonorder_hot_price')
                ->where('pid', $pid)
                ->delete();

            return [
                'status'    => 1,
                'message'   => 'Delete Data OK'
            ];
        } catch(\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e,
            ];
        }
    }

    public function getPrice($pid){
        try {
            $found = Capsule::table('mod_beonorder_hot_price')
                ->where('pid', $pid)
                ->first();

            if(empty($found)) throw new \Exception('Empty Data');

            return [
                'price'     => $found->value,
                'selected'  => $found->selected_price,
            ];
        } catch(\Exception $e) {
            return [
                'price'     => 0,
                'selected'  => '',
            ];
        }
    }
}