<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 24/08/17
 * Time: 8:49
 */

namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;

class ProductHighlight
{
    public function getProducts($gid=""){
        $table = Capsule::table('mod_beonorder_producthighlight')
            ->select('mod_beonorder_producthighlight.id as id',
                'mod_beonorder_producthighlight.pid as pid',
                'mod_beonorder_producthighlight.gid as gid',
                'tblproducts.name as name')
        ->join('tblproducts','mod_beonorder_producthighlight.pid','=','tblproducts.id');
        if(!empty($gid))$table->where('mod_beonorder_producthighlight.gid',$gid);
        $highlights = $table->get();
        return $highlights;
    }

    public function setProduct($gid, $pid){
        try {
            $found = Capsule::table('mod_beonorder_producthighlight')
                ->where('gid', $gid)
                ->where('pid', $pid)
                ->first();

            if(!empty($found)) throw new \Exception ("Data Exists");

            $insert = Capsule::table('mod_beonorder_producthighlight')
                ->insert([
                    'gid'   => $gid,
                    'pid'   => $pid,
                ]);

            return [
                'status'    => 1,
                'message'   => 'Insert Data OK'
            ];
        } catch(\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e,
            ];
        }
    }

    public function deleteProduct($pid){
        try {
            $found = Capsule::table('mod_beonorder_producthighlight')
                ->where('pid', $pid)
                ->first();

            if(empty($found)) throw new \Exception('Empty Data');

            $delete = Capsule::table('mod_beonorder_producthighlight')
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

    public function runUpdate($gid, $new_highlight) {
        $cur_hg = $this->getProducts($gid);
        foreach($cur_hg as $kh => $vh) {
            $found_high = false;

            foreach($new_highlight as $khg => $vhg) {
                if($vhg == $vh->gid && $khg == $vh->pid) {
                    $found_high = true;
                    unset($new_highlight[$vh->pid]);
                }
            }

            if(!$found_high) {
                $this->deleteProduct($vh->pid);
                unset($new_highlight[$vh->pid]);
            }

        }

        foreach($new_highlight as $khg => $vhg) {
            $this->setProduct($vhg, $khg);
        }
    }
}