<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class ReferralUser
{
    private $table = 'jagoanpoin_user';

    public function getUserReferralById($userId)
    {
        try {

            if (empty($userId))
                throw new \Exception("user id referral cannot be empty");

            $getUser = Capsule::table($this->table)->where('userid', $userId)->first();

            if (!$getUser OR empty($getUser))
                throw new \Exception("user id referral not found");

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

    public function getUserReferralByCode($code)
    {
        try {

            if (empty($code))
                throw new \Exception("code referral cannot be empty");

            $getUser = Capsule::table($this->table)->where('referral_code', $code)->first();

            if (!$getUser OR empty($getUser))
                throw new \Exception("user id referral not found");

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
