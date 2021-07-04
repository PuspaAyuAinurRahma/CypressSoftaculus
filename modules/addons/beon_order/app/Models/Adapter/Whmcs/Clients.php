<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 13/06/20
 * Time: 15:59
 */

namespace BeonOrder\Models\Adapter\Whmcs;
use Illuminate\Database\Capsule\Manager as DB;


class Clients extends Api
{
    protected $table = "tblclients";

    public function addClient(
        $firstname, $lastname, $email, $password2,
        $country, $state, $city, $address1, $phonenumber, $postcode, $companyname="", $customfields=[]){
        try{
            $params = [
                "firstname"     => $firstname,
                "lastname"      => $lastname,
                "email"         => $email,
                "password2"     => $password2,
                "country"       => $country,
                "state"         => $state,
                "city"          => $city,
                "address1"      => $address1,
                "phonenumber"   => $phonenumber,
                "postcode"      => $postcode

            ];

            if(!empty($companyname))    $params['companyname']  = $companyname;
            if(!empty($customfields))   $params['customfields'] = base64_encode(serialize($customfields));

//            print_r($params);
//            die;

            return $this->sendPost('AddClient',$params);
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];
        }
    }
    public function verifyEmail($userid){
        try{
            $query = DB::table($this->table)
                ->where('id','=',$userid)
                ->update([
                    'email_verified'    =>1,
                ]);
            if(!$query)throw new \Exception("Couldnt Verify Email");
            return [
                'status'    =>1,
                'message'   =>'Success Activate Clients'
            ];
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];
        }
    }
    public function updateClient(

        $clientid,
        $firstname="", $lastname="", $email="",
        $country="", $state="", $city="", $address1="",
        $phonenumber="", $postcode="", $companyname="", $customfields=[]

    ){
        try{
            $params = [
                "clientid" => $clientid
            ];

            if(!empty($companyname))    $params['companyname']  = $companyname;
            if(!empty($firstname))      $params['firstname']  = $firstname;
            if(!empty($lastname))       $params['lastname']  = $lastname;
            if(!empty($email))          $params['email']  = $email;
            if(!empty($country))        $params['country']  = $country;
            if(!empty($state))          $params['state']  = $state;
            if(!empty($city))           $params['city']  = $city;
            if(!empty($address1))       $params['address1']  = $address1;
            if(!empty($phonenumber))    $params['phonenumber']  = $phonenumber;
            if(!empty($postcode))       $params['postcode']  = $postcode;
            if(!empty($customfields))   $params['customfields'] = base64_encode(serialize($customfields));

            return $this->sendPost('UpdateClient',$params);
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];
        }
    }

    public function isNew($userid){
        $query = DB::table("tblorders")
            ->where('userid','=',$userid)
            ->where('status','=',"Active")
            ->first();
        if(!$query) return true;
        return false;
    }

    public function sendVerificationEmail($clientid){
        $params = [
            "id"            => $clientid,
            "messagename"   => "Client Email Address Verification",
        ];
        return $this->sendPost('SendEmail', $params);
    }

    public function activateAffiliate($clientid){
        $params = [
            "userid"            => $clientid,
        ];
        return $this->sendPost('AffiliateActivate', $params);
    }

}