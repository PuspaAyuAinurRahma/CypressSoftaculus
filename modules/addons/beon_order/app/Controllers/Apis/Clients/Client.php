<?php
namespace BeonOrder\Controllers\Apis\Clients;
use BeonOrder\Controllers\Base;
use BeonOrder\Controllers\CartPages;
use BeonOrder\Helpers\Clients\Emails;
use BeonOrder\Helpers\Clients\Registrations;
use BeonOrder\Helpers\Promotions\Promotions;
use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as Capsule;
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 17/05/18
 * Time: 15:25
 */
class Client extends Base
{
    private $key='UiM8yt0MZHMdqOG0uqFo';
    public function register(){
        try{
            $version = empty($this->get['version'])?1:$this->get['version'];

//            echo $version;
//            die;

            switch ($version){
                case 1: {
                    if(empty($this->post['fullname']))throw new \Exception("fullname is Empty");
                    if(empty($this->post['email']))throw new \Exception("email is Empty");
                    if(empty($this->post['address1']))throw new \Exception("address1 is Empty");
                    if(empty($this->post['city']))throw new \Exception("city is Empty");
                    if(empty($this->post['state']))throw new \Exception("state is Empty");
                    if(empty($this->post['country']))throw new \Exception("country is Empty");
                    if(empty($this->post['phonenumber']))throw new \Exception("phonenumber is Empty");
                    if(empty($this->post['password2']))throw new \Exception("password2 is Empty");
                    if(empty($this->post['postcode']))throw new \Exception("postcode is Empty");
                    if(!$this->validateEmail($this->post['email']))throw new \Exception("Email ini sudah digunakan sebelumnya");

                    $fullname       = $this->post['fullname'];
                    $explodename    = explode(' ', $fullname);
                    $firstname      = $explodename[0];
                    $lastname       = '';
                    foreach ($explodename as $key => $name){
                        if($key>0){
                            $lastname .= $name." ";
                        }
                    }
                    $postData=[
                        'firstname' => $firstname,
                        'lastname'  => $lastname,
                        'email'     => $this->post['email'],
                        'address1'  => $this->post['address1'],
                        'city'      => $this->post['city'],
                        'state'     => $this->post['state'],
                        'postcode'  => $this->post['postcode'],
                        'country'   => $this->post['country'],
                        'phonenumber' =>$this->post['phonenumber'],
                        'password2' => $this->post['password2'],
                    ];
                    $result = $this->sendapi('AddClient', $postData);
                    if($result['result']!='success')throw new \Exception($result['message']);
                    CartPages::generateCart($this->post['carts']);
                    return [
                        'status'=>1,
                        'loginurl'=>$this->createloginUrl($this->post['email'])
                    ];
                }
                case 2: {
                    if(empty($this->post['fullname']))throw new \Exception("fullname is Empty");
                    if(empty($this->post['email']))throw new \Exception("email is Empty");
                    if(empty($this->post['password2']))throw new \Exception("password2 is Empty");
                    if(!$this->validateEmail($this->post['email']))throw new \Exception("Email ini sudah digunakan sebelumnya");

                    $fullname       = $this->post['fullname'];
                    $email          = $this->post['email'];
                    $password       = $this->post['password2'];

//                    $fullname       = "Agam Haris";
//                    $email          = "agam31harisyah@gmail.com";
//                    $password       = "Temanamakanteman123";

                    $register       = Registrations::register($fullname, $email, $password);
                    if($register['status']!=1)throw new \Exception($register['message']);
                    return $register;
                }
            }

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function defaultregister(){
        try{
//            if(!$this->validateToken())throw new \Exception("you dont have access to do this, contact administrator");
            if(empty($this->post['fullname']))throw new \Exception("fullname is Empty");
            if(empty($this->post['email']))throw new \Exception("email is Empty");
            if(empty($this->post['address1']))throw new \Exception("address1 is Empty");
            if(empty($this->post['city']))throw new \Exception("city is Empty");
            if(empty($this->post['state']))throw new \Exception("state is Empty");
            if(empty($this->post['country']))throw new \Exception("country is Empty");
            if(empty($this->post['phonenumber']))throw new \Exception("phonenumber is Empty");
            if(empty($this->post['password2']))throw new \Exception("password2 is Empty");
            if(empty($this->post['postcode']))throw new \Exception("postcode is Empty");
//            if(empty($this->post['carts']))throw new \Exception("Cart is Empty");
            if(!$this->validateEmail($this->post['email']))throw new \Exception("Email ini sudah digunakan sebelumnya");
            $fullname       = $this->post['fullname'];
            $explodename    = explode(' ', $fullname);
            $firstname      = $explodename[0];
            $lastname       = '';
            foreach ($explodename as $key => $name){
                if($key>0){
                    $lastname .= $name." ";
                }
            }
            $postData=[
                'firstname' => $firstname,
                'lastname'  => $lastname,
                'email'     => $this->post['email'],
                'address1'  => $this->post['address1'],
                'city'      => $this->post['city'],
                'state'     => $this->post['state'],
                'postcode'  => $this->post['postcode'],
                'country'   => $this->post['country'],
                'phonenumber' =>$this->post['phonenumber'],
                'password2' => $this->post['password2'],
            ];
            $result = $this->sendapi('AddClient', $postData);
            if($result['result']!='success')throw new \Exception($result['message']);
            return [
                'status'=>1,
                'loginurl'=>$this->createloginUrl($this->post['email'])
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function login(){
        try{
            $version = empty($this->get['version'])?1:$this->get['version'];
//            echo $version;
//            die;
           switch ($version) {
               case 1: {
                       if (empty($this->post['email'])) throw new \Exception("Email is Empty");
                       if (empty($this->post['password'])) throw new \Exception("Password is Empty");
                       //            if(empty($this->post['carts']))throw new \Exception("Cart is Empty");
                       $email = $this->post['email'];
                       $password = $this->post['password'];
                       $result = $this->dologin($email, $password);
                       if ($result['status'] != 1) throw new \Exception($result['message']);
                       if (!empty($this->post['carts'])) CartPages::generateCart($this->post['carts']);

                       return [
                           'status' => 1,
                           'loginurl' => $result['loginurl']
                       ];
                   }
               case 2: {
                   // if(!$this->validateToken())     throw new \Exception("Token Not Valid");
                   if (empty($this->post['email'])) throw new \Exception("Email is Empty");
                   if (empty($this->post['password'])) throw new \Exception("Password is Empty");
                   //            if(empty($this->post['carts']))throw new \Exception("Cart is Empty");
                   $email = $this->post['email'];
                   $password = $this->post['password'];
                   $pid = $this->post['pid'];
                   $path = $this->post['path'];
                   if (empty($this->post['pid'])) return $pid = '';
                   $result = $this->dologinCustom($email, $password, $pid, $path);
                   if ($result['status'] != 1) throw new \Exception($result['message']);
                   if (!empty($this->post['carts'])) CartPages::generateCart($this->post['carts']);

                   return [
                       'status' => 1,
                       'loginurl' => $result['loginurl']
                   ];
               }
           }

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    private function sendapi($command, $data){
        return localAPI($command, $data, 'api');
    }
    private function createloginUrl($email, $goto = 'cart.php?a=checkout'){
        global $CONFIG;
        $whmcsurl       = $CONFIG['SystemURL'] . "/dologin.php";
        $autoauthkey    = $this->key; //$autoauthkey from configuration.php
        $timestamp      = time(); //Get current timestamp
        $hash           = sha1($email . $timestamp . $autoauthkey); //Generate Hash
        $url            = $whmcsurl . "?email=$email&timestamp=$timestamp&hash=$hash&goto=".urlencode($goto);
        return $url;
    }

    public function dologin($email, $password){
        try{
            $command = 'ValidateLogin';
            $postData = array(
                'email'     => $email,
                'password2' => $password,
            );
            $result = $this->sendapi($command, $postData);
            if($result['result']!='success')throw new \Exception($result['message']);

            return [
                'status'=>1,
                'loginurl'=>$this->createloginUrl($email)
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function dologinCustom($email, $password, $pid, $path){
        try{
            $command = 'ValidateLogin';
            $postData = array(
                'email'     => $email,
                'password2' => $password,
            );
            $result = $this->sendapi($command, $postData);
            if($result['result']!='success')throw new \Exception($result['message']);

            if ($path == "domains") {
                $url = 'orders/domains';
            } else {
                $url = 'orders/products/'. $pid;
            }

            return [
                'status'=>1,
                'loginurl'=> $this->createloginUrl($email, $url)
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    private function validateToken(){
        if(!isset($_SESSION['beoncustomorderCSRFtoken']))return false;
        if(!isset($this->post['token']))return false;
        if($_SESSION['beoncustomorderCSRFtoken']!=$this->post['token'])return false;
        return true;
    }
    private function validateEmail($email){
        $isexist = Capsule::table('tblclients')
            ->where('email','=',$email)
            ->first();
        if(!$isexist)return true;
        return false;
    }
    public function addtoCart(){
        try{
//            if(!$this->validateToken())     throw new \Exception("Token Not Valid");
            if(empty($this->post['carts'])) throw new \Exception("Cart is Empty");
            $carts = $this->post['carts'];
            CartPages::generateCart($carts);
            return [
                'status'=>1,
                'message'=>'success'
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function valDomainService(){
        try {
            if (empty($this->post['pid']))
                throw new Exception('PID have empty');

            return CartPages::validateDomainService($this->post['pid']);

        } catch (Exception $e) {
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }
    public function addDomain(){
        try{
            if(empty($this->post['domain']))   throw new \Exception("Domain Empty");
            $domain = $this->post['domain'];
            $type = $this->post['type'];
            $pid = $this->post['pid'];
            $billingcycle = empty($this->post['regperiod'])?"":$this->post['regperiod'];

            return CartPages::addDomain($domain, $type,$pid,$billingcycle);

        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage()
            ];
        }
    }
    public function addConfigoptions(){
        try{
            $pid            = $this->post['pid'];
            $configoptions  = $this->post['configoptions'];
            return CartPages::addConfigOptions($configoptions, $pid);
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function changeBillingcycle(){
        try{
            $pid            = $this->post['pid'];
            $billingcycle   = $this->post['billingcycle'];

            return CartPages::changeBillingcycle($pid,$billingcycle);

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function verifyCode(){
        try{
            if(empty($this->post['verificationcode']))throw new \Exception("Your Verification Code is Invalid");
            if(empty($this->post['clientid']))throw new \Exception("Your Verification Code is Invalid");
            $verificationcode = $this->post['verificationcode'];
            $clientid         = $this->post['clientid'];
            $stringcode       = implode("", $verificationcode);
            $verify           = Registrations::verifyCode($clientid, $stringcode);
            return $verify;
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage(),
                'type'      => "error"
            ];
        }
    }
    public function resendCode(){
        try{
            if(empty($this->post['clientid']))throw new \Exception("Your Client ID is Invalid");
            $clientid         = $this->post['clientid'];
            $resend           = Registrations::rensendCode($clientid);
            return $resend;
        }catch (\Exception $exception){
            return [
                'status'    =>0,
                'message'   =>$exception->getMessage(),
            ];
        }
    }
    public function completeProfile(){
        try{
            if(empty($this->post['phonenumber']))throw new \Exception("Nomor Telpon Tidak Boleh Kosong");
            if(empty($this->post['client_id']))throw new \Exception("Client ID Tidak Boleh Kosong");
            if(empty($this->post['country']))throw new \Exception("Negara Tidak Boleh Kosong");
            if(empty($this->post['state']))throw new \Exception("Provinsi Tidak Boleh Kosong");
            if(empty($this->post['city']))throw new \Exception("Kota Tidak Boleh Kosong");
            if(empty($this->post['address1']))throw new \Exception("Alamat Tidak Boleh Kosong");
            if(empty($this->post['postcode']))throw new \Exception("Kode Pos Tidak Boleh Kosong");

            $phonenumber    = $this->post['phonenumber'];
            $country        = $this->post['country'];
            $state          = $this->post['state'];
            $city           = $this->post['city'];
            $address1       = $this->post['address1'];
            $postcode       = $this->post['postcode'];
            $clientid       = $this->post['client_id'];
            $email          = $this->post['email'];
            $pid            = $this->post['pid'];
            $dialcode       = $this->post['dialcode'];

            $accounttype    = $this->post['accounttype'];
            $usewa          = $this->post['usewa'];
            $profession     = $this->post['profession'];
            $companyname    = $this->post['instansi-name'];
            $companytype    = $this->post['instansi-type'];
            $is_register_aff= array_key_exists('is_register_aff', $this->post)?
                $this->post['is_register_aff']:0;


            $complete       = Registrations::completeProfile($clientid, $phonenumber,
                                $country, $state, $city, $address1, $postcode, $accounttype,
                                $usewa, $dialcode, $profession, $companyname, $companytype, $is_register_aff);
            if($complete['status']!=1)throw new \Exception($complete['message']);

            if(empty($this->post['pid'])) $pid = '';
            $url = 'orders/products/'. $pid;
            return [
                'status'=>1,
                'loginurl'=> $this->createloginUrl($email, $url)
            ];
            
        }catch (\Exception $exception){
            return [
                'status'    => 0,
                'message'   => $exception->getMessage()
            ];
        }
    }

    public function validatePromoCode(){
        try{
            if(empty($this->post['code']))throw new \Exception("Kode promo tidak boleh kosong");

            $postData=[
                'code'     => $this->post['code'],
            ];
            $userid = $_SESSION['uid'];
            $promotionhelper = new Promotions();
            $result = $this->sendapi('GetPromotions', $postData);
            if($result['result']!='success')throw new \Exception($result['message']);

            if ($result['totalresults'] != 0) {
                $data = [];
                foreach ($result['promotions']['promotion'] as $value) {

                    $onceperclient = false;
                    if ($value['onceperclient'] == 1){
//                        $isexist = Capsule::table('tblinvoiceitems')
//                        ->where('userid','=',$_SESSION['uid'])
//                        ->first();
                        $validateisEverused = $promotionhelper->isEverused($userid, $this->post['code']);
                        if ($validateisEverused) {
                            throw new \Exception("Kode promo hanya bisa digunakan satu kali");
                        }
                    }

                    $existingclient = false;
                    if ($value['existingclient'] == 1){
                        $isexist = Capsule::table("tblorders")
                            ->where('userid','=',$_SESSION['uid'])
                            ->where('status','=',"Active")
                            ->first();
                        if(!$isexist){
                            return [
                                'status'=>0,
                                'message' => 'Member harus memiliki order aktif untuk memenuhi syarat'
                            ];
                        }
                    }

                    $expired = false;
                    $today = strtotime(date("Y-m-d"));
                    $datecheck = strtotime($value['expirationdate']);
                    if ($value['expirationdate'] == '0000-00-00'){
                        $expired = false;
                    }elseif ($today > $datecheck) {
                        return [
                            'status'=>0,
                            'message' => 'Promo telah berakhir'
                        ];
                    }else {
                        $expired = false;
                    }

                    $validateNewUser = $promotionhelper->validate($userid, $this->post['code']);
                    if ($validateNewUser['status'] != 1) {
                        throw new \Exception($validateNewUser['message']);
                    }

                    if ($onceperclient == false && $expired == false && $existingclient == false) {
                        $data[] = [
                            'id'                => $value['id'],
                            'type'              => 'promo',
                            'appliesto'         => $value['appliesto'],
                            'applyonce'         => $value['applyonce'],
                            'code'              => $value['code'],
                            'cycles'            => $value['cycles'],
                            'existingclient'    => $value['existingclient'],
                            'expirationdate'    => $value['expirationdate'],
                            'maxuses'           => $value['maxuses'],
                            'newsignups'        => $value['newsignups'],
                            'notes'             => $value['notes'],
                            'onceperclient'     => $value['onceperclient'],
                            'recurfor'          => $value['recurfor'],
                            'requires'          => $value['requires'],
                            'requiresexisting'  => $value['requiresexisting'],
                            'startdate'         => $value['startdate'],
                            'type_promo'        => $value['type'],
                            'uses'              => $value['uses'],
                            'value'             => $value['value'],
                        ];
                    }

                }
                return [
                    'status'=>1,
                    'data' => $data
                ];
            }else {
                return [
                    'status'=>0,
                    'message'=>'Promo tidak di temukan'
                ];
            }
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function getTldLists(){
       try{
         $command = 'GetTLDPricing';
         $postData = ['currencyid' => '1'];
         $results = localAPI($command, $postData);
         $data = array_keys($results['pricing']);

         return [
            'status' => 1,
            'data'   => $data
         ];
       }catch (\Exception $exception){
          return [
              'status'    =>0,
              'message'   =>$exception->getMessage()
          ];
       }
    }
}