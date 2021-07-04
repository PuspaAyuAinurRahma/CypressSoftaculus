<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 13/06/20
 * Time: 15:59
 */

namespace BeonOrder\Models\Adapter\Whmcs;
use Illuminate\Database\Capsule\Manager as DB;


class Payments extends Api
{
    protected $table= "tblpaymentgateways";

    public function getPaymentMethod() {
        try{
            $getMethod = $this->sendPost('GetPaymentMethods');
            if ($getMethod['status'] != 1)
                throw new \Exception($getMethod['message']);

            return [
                'status'    => 1,
                'data'      => $getMethod['data']['paymentmethods']['paymentmethod']
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

}