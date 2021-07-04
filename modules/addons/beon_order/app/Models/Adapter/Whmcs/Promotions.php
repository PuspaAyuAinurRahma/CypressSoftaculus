<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 13/06/20
 * Time: 15:59
 */

namespace BeonOrder\Models\Adapter\Whmcs;
use Illuminate\Database\Capsule\Manager as DB;


class Promotions extends Api
{
    protected $table= "tblpromotions";
    public function getPromotionCode($promotioncode){
        $data = [
            'code'=>$promotioncode
        ];
        return $this->sendPost('GetPromotions', $data);
    }
    public function getPromoByuser($promotioncode, $userid){
        try{
            $query = DB::table('tblorders')
                ->where('promocode', "=", $promotioncode)
                ->where('userid', "=", $userid)
                ->first();
            if(!$query)throw new \Exception("No Promotion Code used");
            return [
                'status'=>1,
                'data'  =>$query
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

}