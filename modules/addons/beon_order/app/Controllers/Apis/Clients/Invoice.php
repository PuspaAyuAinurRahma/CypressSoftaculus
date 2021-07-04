<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 04/07/18
 * Time: 13:27
 */

namespace BeonOrder\Controllers\Apis\Clients;


use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\Invoices;
use BeonOrder\Helpers\InvoicesRedirect;

class Invoice extends Base
{
    public function paymentConfirmationChecker()
    {
        try {
            $invoice_id = $this->post['invoice_id'];
            $hInvoice = new Invoices();
            $check = $hInvoice->invoiceChecker($invoice_id);
            if ($check['status']==0) throw new \Exception('something wrong when get API');
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
    public function viewInvoice(){

        $redirector = $this->get['redirector'];
        $tracker    = base64_decode($this->get['tracker']);
        $encoded    = base64_decode($redirector);
        $exploded   = explode('-',$encoded);
        $userid     = $exploded[0];
        $invoiceid  = $exploded[1];
        $timestamp  = date('Y-m-d H:i:s', $exploded[2]);
        $redircect  = InvoicesRedirect::redirector($userid,$invoiceid,$timestamp, $tracker);

        if($redircect['status']==1){
            header("Location: {$redircect['data']['loginurl']}");
        }else{
            header("Location: /viewinvoice.php?id={$invoiceid}");
        }
    }
}