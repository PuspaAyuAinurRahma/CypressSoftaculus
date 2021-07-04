<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 04/07/18
 * Time: 13:27
 */

namespace BeonOrder\Controllers\Apis\Clients;


use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\InvoicesRedirect;

class InvoiceRedirect extends Base
{
    public function addData()
    {
        try {
            $invoiceid  = $this->post['invoice_id'];
            $userid     = $this->post['user_id'];
            $hInvoicesRedirect = new InvoicesRedirect();
            $add        = $hInvoicesRedirect->addData($userid, $invoiceid);
            if ($add['status']==0) throw new \Exception($add['message']);
            return [
                'status' => 1,
                'data' => $add,
                'message' => 'API success'
            ];

        } catch (\Exception $exception) {
            return [
                'status' => 0,
                'message' => $exception->getMessage()
            ];
        }
    }
}