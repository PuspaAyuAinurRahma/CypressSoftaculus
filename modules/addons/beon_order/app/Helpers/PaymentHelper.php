<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 22/05/18
 * Time: 10:57
 */

namespace BeonOrder\Helpers;

use BeonOrder\Controllers\Base;
use BeonOrder\Libs\WHmcs\Payment;
use BeonOrder\Models\Payments;
use Illuminate\Database\Capsule\Manager as Capsule;

class PaymentHelper
{
    public function getVisiblePayment()
    {
        try {
            $mPayment           = new Payments();
            $command            = 'GetPaymentMethods';
            $postData           = array();
            $fetchPayment       = localAPI($command, $postData);
            $response           = [];
            if ($fetchPayment['result'] != 'success')
                throw new \Exception('Failed to get payment gateway');
            if (empty($fetchPayment['paymentmethods']))
                throw new \Exception('Payment gateway is empty');

            foreach ($fetchPayment['paymentmethods']['paymentmethod'] as $key => $val) {
                $paymentName    = $val['module'];
                $getPayment     = $mPayment->fetchByGateway($paymentName);
                if ($getPayment['status'] != 1)
                    throw new \Exception($getPayment['message']);

                $paymentRes     = json_decode(json_encode($getPayment['data']), true);
                foreach ($paymentRes as $paymentData) {
                    if ($paymentData['setting'] == 'visible') {
                        if ($paymentData['value'] != 'on')
                            continue 1;

                        $response[] = [
                            'gateway'   => $paymentData['gateway'],
                            'visible'   => 'on'
                        ];
                    }
                }
            }

            return [
                'status'    => 1,
                'data'      => $response,
            ];
        } catch (\Exception $exception) {
            return [
                'status' => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

}