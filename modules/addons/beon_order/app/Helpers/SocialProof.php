<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 24/08/17
 * Time: 8:49
 */

namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;

class SocialProof
{
    public function getLastProduct(){
        $product = Capsule::table('tblinvoiceitems')
            ->leftJoin('tblinvoices','tblinvoices.id','=','tblinvoiceitems.invoiceid')
            ->leftJoin('tblclients','tblclients.id','=','tblinvoiceitems.userid')
            ->leftJoin('tblhosting','tblhosting.id','=','tblinvoiceitems.relid')
            ->leftJoin('tblproducts','tblproducts.id','=','tblhosting.packageid')
            ->where('tblinvoiceitems.type','LIKE','%hosting%')
            ->whereNotIn('tblproducts.gid',[36])
            ->select('tblclients.firstname','tblclients.lastname','tblproducts.name','tblproducts.gid','tblinvoices.created_at')
            ->orderBy('tblinvoiceitems.id','DESC')
            ->first();

        if(empty($product)) return 0;

        if($product->lastname == "-") $product->lastname = "";

        $moment = array();
        $date = new \DateTime($product->created_at);
        $since = $date->diff(new \DateTime(date('Y-m-d H:i:s')));

        if(!empty($since)) {
            $date_d = $since->d;
            $date_h = $since->h;
            $date_i = $since->i;
        }

        if(!empty($date_d)) $moment[] = $date_d.' days';
        if(!empty($date_h)) $moment[] = $date_h.' hours';
        if(!empty($date_i)) $moment[] = $date_i.' minutes';

        $product->moment = implode(" ", $moment);

        return $product;
    }
}