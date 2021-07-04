<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 04/07/18
 * Time: 15:03
 */

namespace BeonOrder\Helpers;


use Illuminate\Database\Capsule\Manager as Capsule;
use BeonOrder\Models\Invoices as mInvoices;
use mysql_xdevapi\Exception;

class Invoices
{
    public function invoiceChecker($invoice_id)
    {
        try {
            $datum = $this->getInvoiceByInvoiceId($invoice_id);
            if ($datum['status'] == 0) throw new  \Exception('get invoice failed');
            $status = $datum['data']->status;
            $is_valid  = false;
            if ($status == 'Paid') {
                $is_valid = true;
            }
            return [
                'status' => 1,
                'is_valid' => $is_valid,
                'data' => $datum,
                'message' => 'invoice check success',
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function getInvoiceByInvoiceId($invoice_id)
    {
        try {
            $data = Capsule::table('tblinvoices')->where('id', $invoice_id)->first();
            if (!$data) throw new \Exception('something wrong when get invoice');
            return [
                'status' => 1,
                'data' => $data,
                'message' => 'success'
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function getInvoiceLocalApiByInvoiceId($invoice_id)
    {
        try {
            $command    = 'GetInvoice';
            $params     = array(
                'invoiceid' => $invoice_id
            );
            $result = $this->localApi($command, $params);
            if ($result['status'] != 1) throw new Exception($result['message']);

            $dataArr    = [];
            foreach ($result['data']['items']['item'] as $key => $data) {
                    $dataArr[$key]  = $data;
            }
            return [
                'status' => 1,
                'data' => $dataArr
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function  localApi($command, $params)
    {
        try {
            $mInvoices  = new mInvoices();
            $result     = $mInvoices->localApi($command, $params);
            if ($result['status'] != 1) throw new Exception($result['message']);

            return [
                'status' => 1,
                'data' => $result['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }
}