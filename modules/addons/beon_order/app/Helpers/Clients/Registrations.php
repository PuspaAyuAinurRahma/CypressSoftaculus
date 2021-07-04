<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 13/06/20
 * Time: 15:57
 */

namespace BeonOrder\Helpers\Clients;


use BeonOrder\Controllers\Apis\Clients\Client;
use BeonOrder\Helpers\Config;
use BeonOrder\Libs\Wizcrm\Email\Email;
use BeonOrder\Models\Adapter\Whmcs\Clients;
use BeonOrder\Models\Adapter\Whmcs\CustomFields;

class Registrations extends Base
{
    public static function register($fullname, $email, $password){
        try{
            $defaultdata    = [
                "country"       => "ID",
                "state"         => "JAWA TIMUR",
                "city"          => "Kota Malang",
                "address1"      => "Jl. MT Haryono No. 1 Blok C4 / Malang",
                "phonenumber"   => "0341 565 353",
                "postcode"      => "61145"
            ];


            $explodename    = explode(' ', $fullname);
            $firstname      = $explodename[0];
            $lastname       = '';
            foreach ($explodename as $key => $name){
                if($key>0){
                    $lastname .= $name." ";
                }
            }
            $clientmodel = new Clients();
            $customfielmodel = new CustomFields();
            $compeltionfield    = $customfielmodel->getByTypeAndName('client', 'is_profile_complete');
            $verificationfield  = $customfielmodel->getByTypeAndName('client','verification_number');
            if($compeltionfield['status']!=1)throw new \Exception("There are No Customfield Configuration For Profile Completion");

            $verification = self::generateVerificationNumber(4);

            $customfields = [
                $compeltionfield['data']['id']          => 0,
                $verificationfield['data']['id']        => $verification
            ];

            $register    = $clientmodel->addClient(
                $firstname, $lastname, $email, $password,
                $defaultdata['country'], $defaultdata['state'], $defaultdata['city'],
                $defaultdata['address1'], $defaultdata['phonenumber'],
                $defaultdata['postcode'],"", $customfields
            );
            $verificationcode = self::getVerificationCode($register['data']['clientid']);


            if($verificationcode['status']!=1)throw new \Exception($verificationcode['message']);
            $configexpirycode = "5 minutes";
            $expirydate       = date('Y-m-d H:i:s',
                strtotime($verificationcode['data']['updated_at'] . "+ {$configexpirycode}"));
            $clientmodel->sendVerificationEmail($register['data']['clientid']);

            return [
                'status'=>1,
                'data'  =>[
                    'clientid'      => $register['data']['clientid'],
                    'expirydate'    => $expirydate
                ]
            ];
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   => $exception->getMessage()
            ];
        }
    }
    public static function generateVerificationNumber($length){
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return strtoupper($randomString);
    }
    public static function injectVerificationCode($vars){
        $merge_fields['customvars1']='';
        if ($vars['messagename'] =='Client Email Address Verification') {
            $userid = $vars['relid'];
            $verificationcode = self::getVerificationCode($userid);
            if($verificationcode['status']==1){
                $merge_fields['client_email_verification_link'] ="<b>{$verificationcode['data']['value']}</b>" ;
            }
        }
        return $merge_fields;
    }
    public static function getVerificationCode($clientid){
        try{
            $customfieldmodel   = new CustomFields();
            $verificationfield  = $customfieldmodel->getByTypeAndName("client", "verification_number");
            if($verificationfield['status']!=1)throw new \Exception($verificationfield['message']);
            $fieldid = $verificationfield['data']['id'];
            $verificationcode   = $customfieldmodel->getValue($fieldid, $clientid);
            if($verificationcode['status']!=1)throw new \Exception($verificationcode['message']);
            return $verificationcode;

        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   => $exception->getMessage()
            ];
        }
    }
    public static function verifyCode($clientid, $code){
        try{
            $verificationcode = self::getVerificationCode($clientid);
            if($code!=$verificationcode['data']['value'])throw new \Exception("Verification Code is Invalid");
            $datenow = date("Y-m-d H:i:s");
            $configexpirycode = "5 minutes";
            $expirydate       = date('Y-m-d H:i:s',
                strtotime($verificationcode['data']['updated_at'] . "+ {$configexpirycode}"));
            if(strtotime($datenow)>strtotime($expirydate))throw new \Exception("expired");
            $clientmodel = new Clients();
            $verifyemail = $clientmodel->verifyEmail($clientid);
            if($verifyemail['status']!=1)throw new \Exception($verifyemail['message']);
            return [
                'status'=>1,
                'data'  =>[
                    'clientid'=>$clientid
                ]
            ];


        }catch (\Exception $exception){
            $type       = $exception->getMessage();
            $message    = $exception->getMessage();
            if($exception->getMessage()=="expired"){
                $message = "Your Code Has Been Expired";
            }
            return [
                'status'    =>0,
                'message'   =>$message,
                'type'      => $type
            ];
        }
    }
    public static function rensendCode($clientid){
        try{
            $newOTP             = self::generateVerificationNumber(4);
            $dataVerification   = self::getVerificationCode($clientid);
            if ($dataVerification['status'] != 1)
                throw new \Exception($dataVerification['message']);

            $customField        = new CustomFields();
            $id                 = $dataVerification['data']['id'];
            $updateData         = $customField->updateValue($id, $newOTP);
            if ($updateData['status'] != 1)
                throw new \Exception($updateData['message']);
            $clientmodel = new Clients();
            $clientmodel->sendVerificationEmail($clientid);

            $configexpirycode = "5 minutes";
            $expirydate       = date('Y-m-d H:i:s',
                strtotime(date('Y-m-d H:i:s') . "+ {$configexpirycode}"));

            return [
                'status'=>1,
                'data'  =>[
                    'resend_at'=> $expirydate
                ]
            ];
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage(),
            ];
        }
    }
    public static function completeProfile($clientid,
        $phonenumber, $country, $state, $city, $address1, $postcode,
        $accounttype, $usewa, $dialcode, $profession="",$companyname="", $companyCategory="", $is_register_aff=0
    ){
        try{
            $wanumber = "";
            if($usewa==1)$wanumber = $dialcode . $phonenumber;

            $wafield            = self::getWaField();
            if($wafield['status']!=1) throw new \Exception($wafield['message']);

            $professionfield    = self::getProfessionField();
            if($professionfield['status']!=1) throw new \Exception($professionfield['message']);

            $accountypefield    = self::getAccountTypeField();
            if($accountypefield['status']!=1) throw new \Exception($accountypefield['message']);

            $organizationNamefield = self::getOrganizationNameField();
            if($organizationNamefield['status']!=1) throw new \Exception($organizationNamefield['message']);

            $organizationTypefield = self::getOrganizationTypeField();
            if($organizationTypefield['status']!=1) throw new \Exception($organizationTypefield['message']);

            $getIsCompleteField = self::getProfileCompleteField();
            if ($getIsCompleteField['status'] != 1) throw new \Exception($getIsCompleteField['message']);

            $customfields = [];
            $customfields[$accountypefield['data']['id']] = $accounttype;
            $customfields[$getIsCompleteField['data']['id']] = 1;

            if(!empty($wanumber))   $customfields[$wafield['data']['id']] = $wanumber;
            if ($accounttype == "Personal") {
                if(!empty($profession)) $customfields[$professionfield['data']['id']] = $profession;
            } else {
                if(!empty($companyname)) $customfields[$organizationNamefield['data']['id']] = $companyname;
                if(!empty($companyCategory)) $customfields[$organizationTypefield['data']['id']] = $companyCategory;
            }

            $clientmodel = new Clients();
            $updateClient = $clientmodel->updateClient(
                $clientid, "", "", "",
                $country, $state, $city, $address1, $phonenumber, $postcode, $companyname, $customfields);
            if($updateClient['status']!=1)throw new \Exception($updateClient['message']);

            if($is_register_aff)
                $clientmodel->activateAffiliate($clientid);

            return [
                'status'    => 1,
                'message'   => 'success'
            ];

        }catch (\Exception $exception){
            return [
                'status' => 0,
                'message'=> $exception->getMessage()
            ];
        }
    }


    public static function getWaField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "Wa Number");
    }
    public static function getProfessionField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "Job");
    }
    public static function getAccountTypeField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "Account Type");
    }

    public static function getOrganizationTypeField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "Organization Type");
    }

    public static function getOrganizationNameField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "Organization Name");
    }

    public static function getProfileCompleteField(){
        $customfieldmodel   = new CustomFields();
        return $customfieldmodel->getByTypeAndName("client", "is_profile_complete");
    }
}