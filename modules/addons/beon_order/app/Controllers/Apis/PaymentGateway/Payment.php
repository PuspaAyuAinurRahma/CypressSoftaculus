<?php
namespace BeonOrder\Controllers\Apis\PaymentGateway;

use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\Invoicing;
use BeonOrder\Helpers\PaymentHelper;

class Payment extends Base
{
    public function  creditBalance()
    {
        try {
            $vars['invoiceid'] = $this->post['invoice_id'];
            $vars['paymentmethod'] = $this->post['paymentmethod'];
            $hInvoice = new Invoicing($vars);
            $check = $hInvoice->payWithCreditBalanceApi();
            if ($check['status'] == 0) throw new \Exception('something wrong when get API');
            return [
                'status' => 1,
                'data' => $check,
                'message' => 'API success'
            ];

        } catch (\Exception $exception) {
            return [
                'status' => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function  getVisiblePayment()
    {
        try {
            $hPayment   = new PaymentHelper();
            $getPayment = $hPayment->getVisiblePayment();
            if ($getPayment['status'] == 0)
                throw new \Exception($getPayment['message']);

            return [
                'status'    => 1,
                'data'      => $getPayment['data'],
                'message'   => 'API success'
            ];

        } catch (\Exception $exception) {
            return [
                'status' => 0,
                'message' => $exception->getMessage()
            ];
        }
    }
}