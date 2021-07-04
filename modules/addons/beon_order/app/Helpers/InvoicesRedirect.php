<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 04/07/18
 * Time: 15:03
 */

namespace BeonOrder\Helpers;

use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Models\Clients;
use Illuminate\Database\Capsule\Manager as Capsule;
use BeonOrder\Models\InvoicesRedirect as mInvoicesRedirect;

class InvoicesRedirect
{
    private static $key='UiM8yt0MZHMdqOG0uqFo';
    public function getById($id)
    {
        try {
            $mInvoicesRedirect   = new mInvoicesRedirect();
            $result     = $mInvoicesRedirect->getById($id);
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

    public function addData($userid, $invoiceid)
    {
        try {
            $mInvoicesRedirect   = new mInvoicesRedirect();
            $date       = new \DateTime();
            $result     = $mInvoicesRedirect->addData($userid, $invoiceid, $date);
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
    public static function redirector($userid, $invoiceid, $datestart, $tracker){
        try{
            $config_dates   = "2 days";
            $invoicemodels  = new Invoices();
            $invoice        = $invoicemodels->getInvoiceByInvoiceId($invoiceid);
            if($invoice['status']!=1)throw new \Exception($invoice['message']);
            if($invoice['data']->userid!=$userid)throw new \Exception("No Invoice Match");
            $expiriy        = date('Y-m-d H:i:s',
                strtotime($datestart . "+ {$config_dates}"));

            if(strtotime(date('Y-m-d H:i:s'))>strtotime($expiriy))
                throw new \Exception("Redirector has been expired");
            $clientmodels  = new Clients();
            $clientdetails = $clientmodels->getById($userid);
            if($clientdetails['status']!=1)throw new \Exception("No client");
            $clientemail = $clientdetails['data']['email'];

            $redirecturl = "viewinvoice.php?id={$invoiceid}&{$tracker}";

            $loginurl   = self::createloginUrl($clientemail, $redirecturl);

            return [
                'status'=>1,
                'data'  =>[
                    'loginurl'=>$loginurl
                ]
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    private static function createloginUrl($email, $redirecturl){
        global $CONFIG;
        $whmcsurl       = $CONFIG['SystemURL'] . "/dologin.php";
        $autoauthkey    = self::$key; //$autoauthkey from configuration.php
        $timestamp      = time(); //Get current timestamp
        $hash           = sha1($email . $timestamp . $autoauthkey); //Generate Hash
//        $url            = $whmcsurl . "?email={$email}&timestamp={$timestamp}&hash={$hash}&goto=".urlencode($redirecturl);
        $url            = $whmcsurl . "?timestamp={$timestamp}&email={$email}&hash={$hash}&goto=".urlencode($redirecturl);
        return $url;
    }
}