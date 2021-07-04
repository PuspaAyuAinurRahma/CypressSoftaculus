<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class Promotions
{
    private $table = 'tblpromotions';

    public function getPromotionById($promoId)
    {
        try {

            if (empty($promoId))
                throw new \Exception("promo id cannot be empty");

            $getUser = Capsule::table($this->table)->where('id', $promoId)->first();

            if (!$getUser OR empty($getUser))
                throw new \Exception("promotion not found");

            return [
                'status' => 1,
                'data'   => $getUser
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage()
            ];
        }
    }
}
