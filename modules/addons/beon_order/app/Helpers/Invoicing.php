<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 22/05/18
 * Time: 10:57
 */

namespace BeonOrder\Helpers;

use BeonOrder\Controllers\Base;
use Illuminate\Database\Capsule\Manager as Capsule;

class Invoicing extends Base
{
    public function generateAdministrationFee()
    {
        try {
            $invoiceid = $this->vars['invoiceid'];
            $invoice = $this->getInvoice($invoiceid);

            if ($this->isOtherMethod($invoice['paymentmethod']))
                throw new \Exception("Payment method is other");

            if ($this->isBankTransfer($invoice['paymentmethod'])) {
                $this->updateAdministration($invoice);
            } else {
                $gatewaydetails = $this->getGatewayDetails($invoice['paymentmethod']);
                $totaladminfee  = $this->calculateAdminFee($invoice,$gatewaydetails);
                if ($totaladminfee > 0) {
                    $this->addAdministration($invoiceid, $totaladminfee, $gatewaydetails['textbiayaadmin']->value);
                }
            }
        } catch (\Exception $exception) {
        }
    }

    public function calculateAdminFee($data_invoice,$gatewaydetails){
        try{
            $availableType  = [
                'domain'=>[
                    'DomainRegister','DomainTransfer','Domain'
                ],
                'hosting'=>[
                    'Hosting'
                ],
            ];
            $typeInvoice    = [];
            $has_hosting    = 0;
            $grossamount = 0;
            $ppn1 = 0;
            $ppn2 = 0;
            $adminfee = 0;
            $adminfee2 = 0;
            $administration = $gatewaydetails['admin'];
            $administration2 = $gatewaydetails['admin2'];
            foreach ($data_invoice['items']['item'] as $invoiceitem) {
                if ($invoiceitem['description'] != 'Administration') {
                    $grossamount += $invoiceitem['amount'];
                    if(in_array($invoiceitem['type'],$availableType['domain'])){
                        $typeInvoice[]  = 'domain';
                    }
                    if(in_array($invoiceitem['type'],$availableType['hosting'])){
                        $has_hosting    = 1;
                        $checkProduct   = Capsule::table('tblhosting')
                            ->select('tblproducts.id')
                            ->join('tblproducts','tblhosting.packageid','=','tblproducts.id')
                            ->where('tblhosting.id', $invoiceitem['relid'])
                            ->first();
                        if(empty($gatewaydetails['allowed_product_id']->value)){
                            $typeInvoice[]  = 'hosting';
                        }elseif(!in_array($checkProduct->id,explode(',',$gatewaydetails['allowed_product_id']->value))){
                            $typeInvoice[]  = 'hosting';
                        }
                    }
                }
            }
            array_unique($typeInvoice);
            $use_adminfee   = 0;
            $totaladminfee  = 0;
            if($gatewaydetails['typefee']->value=="Hosting Only" && ( in_array('hosting',$typeInvoice) || ( $has_hosting == 0 && in_array('domain',$typeInvoice) ))){
                $use_adminfee  = 1;
            }elseif($gatewaydetails['typefee']->value=="Domain Only" && in_array('domain',$typeInvoice)){
                $use_adminfee  = 1;
            }elseif($gatewaydetails['typefee']->value=="Hosting dan Domain" && (in_array('domain',$typeInvoice) && in_array('hosting',$typeInvoice))){
                $use_adminfee  = 1;
            }elseif($gatewaydetails['typefee']->value=="Hosting atau Domain" && (in_array('domain',$typeInvoice) || in_array('hosting',$typeInvoice))){
                $use_adminfee  = 1;
            }elseif($gatewaydetails['typefee']->value=="All"){
                $use_adminfee  = 1;
            }
            if($use_adminfee==1){
                if (!empty($data_invoice['tax'])) $ppn1 = $data_invoice['tax'];
                if (!empty($data_invoice['tax2'])) $ppn2 = $data_invoice['tax2'];

                if ($administration) $adminfee = ceil(($grossamount + $ppn1 + $ppn2) * floatval($administration->value) / 100);
                if ($administration2) $adminfee2 = $administration2->value;

                $totaladminfee = $adminfee + $adminfee2;
            }

            return $totaladminfee;
        }catch (\Exception $e){
            return 0;
        }

    }

    public function isBankMethod($paymentmethod)
    {
        $bankpayments = ['bca', 'bni', 'bri', 'mandiri', 'indomaret', 'veritrans', 'mandiri2'];
        if (in_array($paymentmethod, $bankpayments)) return true;
        return false;
    }

    public function isBankTransfer($paymentmethod)
    {
        $bankpayments = ['bca', 'bni', 'mandiri', 'mandiri2', 'creditbalance'];
        if (in_array($paymentmethod, $bankpayments)) return true;
        return false;
    }

    public function isOtherMethod($paymentmethod)
    {
        $bankpayments = ['indomaret', 'veritrans'];
        if (in_array($paymentmethod, $bankpayments)) return true;
        return false;
    }

    public function getGatewayDetails($name)
    {
        $config = [
            'typefee' => Capsule::table('tblpaymentgateways')
                ->where('gateway', '=', $name)
                ->where('setting', '=', 'typefee')
                ->first(),
            'textbiayaadmin' => Capsule::table('tblpaymentgateways')
                ->where('gateway', '=', $name)
                ->where('setting', '=', 'textbiayaadmin')
                ->first(),
            'admin' => Capsule::table('tblpaymentgateways')
                ->where('gateway', '=', $name)
                ->where('setting', '=', 'biayaadministrasi')
                ->first(),
            'admin2' => Capsule::table('tblpaymentgateways')
                ->where('gateway', '=', $name)
                ->where('setting', '=', 'biayaadministrasi1')
                ->first(),
        ];
        return $config;
    }

    public function addAdministration($invoiceid, $amount, $text_admin_fee="Administration")
    {
        if(empty($text_admin_fee)) $text_admin_fee  = "Administration";
        $command = 'UpdateInvoice';
        $postData = array(
            'invoiceid' => $invoiceid,
            'newitemdescription' => [$text_admin_fee],
            'newitemamount' => [$amount],
            'newitemtaxed' => [0],
        );
        $adminUsername = 'api';

        $results = localAPI($command, $postData, $adminUsername);

        return $results;
    }

    public function getInvoice($invoiceid)
    {
        $command = 'GetInvoice';
        $postData = array(
            'invoiceid' => $invoiceid,
        );
        $adminUsername = 'api';

        $results = localAPI($command, $postData, $adminUsername);

        return $results;
    }

    public function removeDecimal($invoice)
    {
        $orders = Capsule::table('tblorders')
            ->where('invoiceid', $invoice['invoiceid'])
            ->get();

        if (!empty($orders)) {
            foreach ($orders as $order) {
                $amount = round($order->amount);
                $update = Capsule::table('tblorders')
                    ->where('id', $order->id)
                    ->update(
                        [
                            'amount' => $amount,
                        ]
                    );
            }
        }
    }

    public function updateAdministration($invoice)
    {
        $adminfee = 0;
        $adminfee2 = 0;
        $invoiceid = $invoice['invoiceid'];
        $gatewaydetails = $this->getGatewayDetails($invoice['paymentmethod']);

        $this->removeDecimal($invoice);
        $this->removeAdministration($invoice,$gatewaydetails['textbiayaadmin']->value);

        if ($this->isBankTransfer($invoice['paymentmethod'])) {
            $gatewaydetails = $this->getGatewayDetails($invoice['paymentmethod']);
            $totaladminfee  = $this->calculateAdminFee($invoice,$gatewaydetails);
            if ($totaladminfee > 0) {
                $this->addAdministration($invoiceid, $totaladminfee, $gatewaydetails['textbiayaadmin']);
            }
        }
    }

    public function removeAdministration($invoice, $text_admin_fee = "Administration")
    {
        $results = NULL;
        $deletelineids = [];
        if(empty($text_admin_fee)) $text_admin_fee  = "Administration";

        foreach ($invoice['items']['item'] AS $item) {
            if ($item['description'] == $text_admin_fee || $item['description'] =='Administration') {
                $deletelineids[] = $item['id'];
            }
        }

        if (!empty($deletelineids)) {
            $command = 'UpdateInvoice';
            $postData = array(
                'invoiceid' => $invoice['invoiceid'],
                'deletelineids' => $deletelineids,
            );
            $adminUsername = 'api';

            $results = localAPI($command, $postData, $adminUsername);
        }

        return $results;
    }

    public function removeKodeUnik($invoice)
    {
        $results = NULL;
        $deletelineids = [];

        foreach ($invoice['items']['item'] AS $item) {
            if ($item['description'] == 'Kode Unik') {
                $deletelineids[] = $item['id'];
            }
        }

        if (!empty($deletelineids)) {
            $command = 'UpdateInvoice';
            $postData = array(
                'invoiceid' => $invoice['invoiceid'],
                'deletelineids' => $deletelineids,
            );
            $adminUsername = 'api';

            $results = localAPI($command, $postData, $adminUsername);
        }

        return $results;
    }

    public function payWithCreditBalanceApi()
    {
        try {
            $fullpay = false;
            $userId = $_SESSION['uid'];
            $clientDetail = $this->getClientsDetail($userId);
            $credit = floatval($clientDetail['credit']);

            $invoiceid = $this->vars['invoiceid'];
            $paymentMethod = $this->vars['paymentmethod'];
            $invoice = $this->getInvoice($invoiceid);
            if ($invoice['status'] !== 'Unpaid') throw new \Exception('status not unpaid');

            $total = floatval($invoice['total']);
            $amount = 0;

            if ($credit >= $total) {
                $this->removeKodeUnik($invoice);
                $invoice = $this->getInvoice($invoiceid);
                $total = $invoice['total'];
                $applyCredit = $this->applyCredit($invoiceid, $total);
                $amount = $total;
                $fullpay = true;
            } else {
                $applyCredit = $this->applyCredit($invoiceid, $credit);
                $this->changePaymentMethod($invoiceid, $paymentMethod);
                $amount = $credit;
            }

            $check1 = $this->checkCreditBalanceValue($userId, $credit, $amount);
            $check2 = $this->checkCreditHistory($userId, $invoiceid, $amount);

            return [
                'status' => 1,
                'message' => 'update balance success',
                'is_full_pay' => $fullpay,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function checkCreditBalanceValue($userId, $credit, $amount)
    {
        try {
            $clientDetail = $this->getClientsDetail($userId);
            $creditBalance = floatval($clientDetail['credit']);
            $creditBalanceAfterApply = floatval($credit - $amount);
            if ($creditBalance !== $creditBalanceAfterApply) {
                Capsule::table('tblclients')->where('id', '=', $userId)->update([
                    'credit' => $creditBalanceAfterApply
                ]);
            }
            return [
                'status' => 1,
                'message' => 'check Credit Balance Value success',
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function checkCreditHistory($userId, $invoiceid, $amount)
    {
        try {
            $descripton = "Credit Applied to Invoice #$invoiceid";
            $query = Capsule::table('tblcredit')->where('id', '=', $userId)->where('descripton', $descripton)->first();
            if (empty($query)) {
                Capsule::table('tblcredit')->where('id', '=', $userId)->insert([
                    'clientid' => $userId,
                    'date' => date('Y-m-d'),
                    'description' => $descripton,
                    'amount' => $amount * -1,
                ]);
            }
            return [
                'status' => 1,
                'message' => 'check Credit History success',
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function changePaymentMethod($invoiceId, $paymentMethod)
    {
        $command = 'UpdateInvoice';
        $postData = array(
            'invoiceid' => $invoiceId,
            'paymentmethod' => $paymentMethod,
        );
        $adminUsername = 'api';

        $results = localAPI($command, $postData, $adminUsername);

        return $results;
    }

    public function applyCredit($invoiceid, $amount, $noemail = false)
    {
        $command = 'ApplyCredit';
        $postData = array(
            'invoiceid' => $invoiceid,
            'amount' => $amount,
            'noemail' => $noemail,
        );
        $adminUsername = 'api';

        $results = localAPI($command, $postData, $adminUsername);

        return $results;
    }

    public function getClientsDetail($clientid, $email = null)
    {
        $command = 'GetClientsDetails';
        $postData = array(
            'clientid' => $clientid,
            'email' => $email,
        );
        $adminUsername = 'api';

        $results = localAPI($command, $postData, $adminUsername);

        return $results;
    }

}