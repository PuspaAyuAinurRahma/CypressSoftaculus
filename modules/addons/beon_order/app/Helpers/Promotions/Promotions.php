<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 13/06/20
 * Time: 15:57
 */

namespace BeonOrder\Helpers\Promotions;


use BeonOrder\Models\Adapter\Whmcs\Clients;

class Promotions
{
    public function validate($userid, $promotioncode, $referralParams = []){
        try{
//            echo $userid;
//            die;
            $isExpired      = FALSE;
            $clientmodels   = new Clients();
            $ispromoexist   = $this->isExist($promotioncode);
            if(!$ispromoexist)throw new \Exception("Invalid Promotion Code");
            $promotion      = $ispromoexist;
            $isnewsignup    = $clientmodels->isNew($userid);
            $iseverused     = $this->isEverused($promotioncode, $userid);
            if (!is_null($promotion['expirationdate'])) {
                $isExpired      = $this->isExpired($promotion['startdate'], $promotion['expirationdate']);
            }

            if($isExpired)throw new \Exception("Kode promo sudah tidak dapat digunakan");
            if($promotion['maxuses'] <= $promotion['uses'] && $promotion['maxuses'] != 0) {
                throw new \Exception("Kode promo sudah habis");
            }
            $validatepromo = [
                'isnewsignup'   => $isnewsignup,
                'newsignup'     => $promotion['newsignups'],
                'existingclient'=> $promotion['existingclient']
            ];
//            print_r($validatepromo);
//            die;

            if($promotion['newsignups']==1 && !$isnewsignup)
                throw new \Exception("Promosi hanya untuk Pengguna Baru");

            if($promotion['existingclient']==1 && $isnewsignup)
                throw new \Exception("Promosi tidak berlaku untuk pengguna baru");

            if($promotion['onceperclient']==1 && $iseverused)
                throw new \Exception("Kode Promo Hanya Bisa Digunakan 1 kali");

            // Additional for referral promo
            $referrer_id    = 0;
            $product_id     = 0;
            if (!empty($referralParams)) {
                $referrer_id    = $referralParams['referrer_userid'];
                $product_id     = $referralParams['pid'];
            }

            $return[] = [
                'id'                => $promotion['id'],
                'type'              => 'promo',
                'appliesto'         => $promotion['appliesto'],
                'applyonce'         => $promotion['applyonce'],
                'code'              => $promotion['code'],
                'cycles'            => $promotion['cycles'],
                'existingclient'    => $promotion['existingclient'],
                'expirationdate'    => $promotion['expirationdate'],
                'maxuses'           => $promotion['maxuses'],
                'newsignups'        => $promotion['newsignups'],
                'notes'             => $promotion['notes'],
                'onceperclient'     => $promotion['onceperclient'],
                'recurfor'          => $promotion['recurfor'],
                'requires'          => $promotion['requires'],
                'requiresexisting'  => $promotion['requiresexisting'],
                'startdate'         => $promotion['startdate'],
                'type_promo'        => $promotion['type'],
                'uses'              => $promotion['uses'],
                'value'             => $promotion['value'],
                'referrer_id'       => $referrer_id,
                'for_product'       => $product_id
            ];
            return [
                'status'=>1,
                'data'  =>$return

            ];

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function getPromotion($promotioncode){
        try{
            $promotionmodels = new \BeonOrder\Models\Adapter\Whmcs\Promotions();
            $promotion = $promotionmodels->getPromotionCode($promotioncode);
            if($promotion['status']!=1)throw new \Exception("Invalid Promotion Code");
            if($promotion['data']['totalresults']==0)throw new \Exception("Invalid Promotion Code");
            return [
                'status'=>1,
                'data'  =>$promotion['data']['promotions']['promotion'][0]
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    private function isExist($promotioncode){
        $getPromo = $this->getPromotion($promotioncode);
        if($getPromo['status']==1)return $getPromo['data'];
        return false;
    }
    public function isEverused($promotioncode, $userid){
        $promotionmodels = new \BeonOrder\Models\Adapter\Whmcs\Promotions();
        $promotion = $promotionmodels->getPromoByuser($promotioncode, $userid);
        if($promotion['status']==1)return true;
        return false;
    }
    private function isExpired($startdate, $enddate){
        $datenow = strtotime(date('Y-m-d'));
        if($enddate=='0000-00-00')return false;
        if($datenow>=strtotime($startdate) && $datenow<=strtotime($enddate))
            return false;
        return  true;
    }
    private function isFull($maxuse, $numberofuse){
        if($maxuse==0)return false;
        if($maxuse<$numberofuse)return false;
        return true;
    }
}