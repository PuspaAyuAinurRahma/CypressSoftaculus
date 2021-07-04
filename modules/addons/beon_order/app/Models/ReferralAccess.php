<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class ReferralAccess
{
    private $table = 'jagoanpoin_referral_access';

    public function addRefereeAccess($invoiceId, $serviceId, $refereeUserId, $referrerUserId, $status)
    {
        try {

            if (empty($invoiceId))
                throw new \Exception("invoice id cannot be empty");

            if (empty($serviceId))
                throw new \Exception("service id cannot be empty");

            if (empty($refereeUserId))
                throw new \Exception("referee user id cannot be empty");

            if (empty($referrerUserId))
                throw new \Exception("referrer user id cannot be empty");

            if (empty($status))
                throw new \Exception("status cannot be empty");

            $params                    = [];
            $params['invoice_id']      = $invoiceId;
            $params['service_id']      = $serviceId;
            $params['referee_userid']  = $refereeUserId;
            $params['referrer_userid'] = $referrerUserId;
            $params['status']          = $status;
            $params['created_at']      = date("Y-m-d h:i:s");
            $add                       = Capsule::table($this->table)->insertGetId($params);

            if (!$add OR empty($add))
                throw new \Exception("failed insert new data referral access");

            return [
                'status' => 1,
                'data'   => $add
            ];

        } catch (\Exception $e) {
            return [
                'status'  => 0,
                'message' => $e->getMessage()
            ];
        }
    }
}
