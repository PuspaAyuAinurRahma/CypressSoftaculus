<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 25/10/17
 * Time: 9:58
 */

namespace BeonOrder\Helpers;
use Illuminate\Database\Capsule\Manager as Capsule;
use MongoDB\Driver\Exception\ExecutionTimeoutException;


class OrderRoles
{
    public function getRole($pid){
        try{
            $roles = Capsule::table('mod_beonorder_roleitems')
                ->select([
                    'mod_beonorder_roles.role as role',
                    'mod_beonorder_roleitems.applieto as applieto',
                    'mod_beonorder_roleitems.applietobillingcycle as applietobillingcycle',
                    'mod_beonorder_roleitems.impacttobillingcycle as impacttobillingcycle',
                    'mod_beonorder_roleitems.impacttoprizerenewal as impacttoprizerenewal',
                    'mod_beonorder_roleitems.created_at as created_at',
                ])
                ->join('mod_beonorder_roles','mod_beonorder_roleitems.role_id','mod_beonorder_roles.id')
                ->where('mod_beonorder_roleitems.applieto', $pid)
                ->first();


        }catch (\Exception $exception){

        }

    }
    public function fetchRole($type){
        $roles = Capsule::table('mod_beonorder_roleitems')
            ->select([
                'mod_beonorder_roles.role as role',
                'mod_beonorder_roleitems.applieto as applieto',
                'mod_beonorder_roleitems.applietobillingcycle as applietobillingcycle',
                'mod_beonorder_roleitems.impacttobillingcycle as impacttobillingcycle',
                'mod_beonorder_roleitems.impacttoprizerenewal as impacttoprizerenewal',
                'mod_beonorder_roleitems.created_at as created_at',
            ])
            ->join('mod_beonorder_roles','mod_beonorder_roleitems.role_id','=','mod_beonorder_roles.id')
            ->where('mod_beonorder_roleitems.role_id', $type)
            ->get();
        return $roles;
    }

    public function getHosting(){

    }
    public function roleRenewals($invoiceid){
        $roles = $this->fetchRole(3);
        $arr_pid = [];
        $arr_roles = [];
        foreach ($roles as $role){
            $arr_pid[] = $role->applieto;
            $arr_roles[$role->applieto] = $role;
        }
        $invoiceitems = Capsule::table('tblinvoiceitems')
            ->select([
                'tblhosting.packageid as pid',
                'tblhosting.id as hostingid',
                'tblhosting.billingcycle as billingcycle',
                'tblhosting.nextduedate as nextduedate',
                'tblinvoiceitems.invoiceid as invoiceid',
                'tblhosting.userid as clientid'

            ])
            ->join('tblhosting', 'tblhosting.id','=','tblinvoiceitems.relid')
            ->where('tblinvoiceitems.type','Hosting')
            ->where('tblinvoiceitems.invoiceid', $invoiceid)
            ->whereIn('tblhosting.packageid', $arr_pid)
            ->get();
        $error = [];
        try{
            if(count($invoiceitems)>0){
                $products= [];
                foreach ($invoiceitems as $invoiceitem){
                        if($invoiceitem->billingcycle==$arr_roles[$invoiceitem->pid]->applietobillingcycle){
                            $newcycle   = $arr_roles[$invoiceitem->pid]->impacttobillingcycle;
                            $product    = $this->getPricing($invoiceitem->pid);
                            $products[] = $invoiceitem;
                            $str_cycle  = strtolower($newcycle);
                            $reccurring = $product->$str_cycle;
                            $update     = $this->updateHosting($invoiceitem->hostingid, $newcycle, $reccurring);
                            logActivity("Running Custom Order for Cloud Hosting :Update Billing Cycle Monthly to Quarterly, change recurring to {$reccurring}, ServiceID {$invoiceitem->hostingid}",$invoiceitem->clientid);
                            if(!$update)$error[]= "Cant Update Hosting";
                    }
                }
//                print_r($products);
//                die;
            }
            if(!empty($error)){
                $message="";
                foreach ($error as $item){
                    $message.=$item;
                }
                throw new \Exception($message);
            }
        }catch (\Exception $exception){
            echo "fdfsdfaf";
            die;
        }

    }


    public function updateHosting($hosting_id,$billing_cycle="", $recurring=""){
        $param =[];
        if(!empty($billing_cycle))$param['billingcycle']=$billing_cycle;
        if(!empty($recurring))$param['amount'] = $recurring;
        $update =  Capsule::table('tblhosting')
            ->where('id', $hosting_id)
            ->update($param);



        return $update;
    }
    public function getPricing($pid){
        $pricing =Capsule::table('tblpricing')
            ->where('type', 'product')
            ->where('relid', $pid)
            ->first();
        return $pricing;
    }

    public function updateInvoice($invoiceid, $itemdescriptions=[], $itemamount=[]){
        $command = 'UpdateInvoice';

        $postData = array(
            'invoiceid'=>$invoiceid,
//            'itemdescription' => array(13 => 'Sample Updated Invoice Item'),
//            'itemamount' => array(13 => 16.95),
//            'itemtaxed' => array(13 => false),
        );
        if(!empty($itemdescriptions))$postData['itemdescription']=$itemdescriptions;
        if(!empty($itemamount))$postData['itemamount']=$itemamount;

        $adminUsername = 'api'; // Optional for WHMCS 7.2 and later

        $results = localAPI($command, $postData, $adminUsername);
        return $results;
    }
    public function isrenewal($hosting_id){
        $check = Capsule::table('tblinvoiceitems')
            ->join('tblinvoices','tblinvoices.id','=','tblinvoiceitems.invoiceid')
            ->where('tblinvoiceitems.relid', $hosting_id)
            ->where('tblinvoiceitems.type','Hosting')
            ->where('tblinvoices.status', 'Paid')
            ->orderBy('tblinvoices.datepaid', 'ASC')
            ->get();
        if(count($check)>1)return true;
        return false;
    }
}