<?php


namespace BeonOrder\Helpers;


use BeonOrder\Models\Promotions;
use BeonOrder\Models\ReferralPromoProduct;
use BeonOrder\Models\ReferralUser;

class Referral
{
    public function getCouponReferral($refcode, $productId) {
        try {
            $mUserReferral    = new ReferralUser();
            $mProduct         = new ReferralPromoProduct();
            $mPromotions      = new Promotions();
            $validateReferrer = $mUserReferral->getUserReferralByCode($refcode);
            if ($validateReferrer['status'] != 1)
                throw new \Exception($validateReferrer['message']);

            $getProductPromo = $mProduct->getReferralProductById($productId);
            if ($getProductPromo['status'] != 1)
                throw new \Exception($getProductPromo['message']);

            $promoId  = $getProductPromo['data']->promo_id;
            $getPromo = $mPromotions->getPromotionById($promoId);
            if ($getPromo['status'] != 1)
                throw new \Exception($getPromo['message']);

            $promoCode      = $getPromo['data']->code;
            $referrerUserId = $validateReferrer['data']->user_id;

            return [
                'status' => 1,
                'data'   => [
                    'promo_code'      => $promoCode,
                    'referrer_userid' => $referrerUserId
                ]
            ];
        } catch (\Exception $e) {
            return [
                "status"  => 0,
                "message" => $e->getMessage()
            ];
        }
    }
}