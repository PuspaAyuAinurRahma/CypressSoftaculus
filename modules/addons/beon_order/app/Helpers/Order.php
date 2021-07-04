<?php


namespace BeonOrder\Helpers;


use BeonOrder\Models\Orders;

class Order
{
    public function changeToActice($invoice_id) {
        try{
            $mOrder     = new Orders();
            $getOrder   = $mOrder->getOrderByInvoice($invoice_id);
            if ($getOrder['status'] != 1)
                throw new \Exception($getOrder['message']);

            $order      = $getOrder['data'];
            $update     = $mOrder->updateToActive($order['id']);
            if ($update['status'] != 1)
                throw new \Exception($update['message']);

            return [
                'status'    => 1,
                'message'   => 'Success change status order to active'
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }
}