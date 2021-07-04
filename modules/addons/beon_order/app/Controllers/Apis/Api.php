<?php
namespace BeonOrder\Controllers\Apis;
use BeonOrder\Controllers\Base;

/**
 * Created by PhpStorm.
 * User: agam
 * Date: 17/05/18
 * Time: 15:20
 */
class Api extends Base
{
    private $_config;

    public function config()
    {
        if($this->_config == null){
            $this->_config = array(
                'register-client'       => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'register'),
                'confirm-code'          => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'verifyCode'),
                'resend-code'           => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'resendCode'),
                'checkout'              => array('class'=>'\BeonOrder\Controllers\Apis\Order\Order','method'=>'checkout'),
                'complete-registration' => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'completeProfile'),
                'validate-email'        => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Email','method'=>'validate'),
                'register-default'      => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'defaultregister'),
                'add-to-cart'           => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'addtoCart'),
                'login'                 => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'login'),
                'add-domain'            => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'addDomain'),
                'val-domain-service'    => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'valDomainService'),
                'change-billingcycle'   => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'changeBillingcycle'),
                'add-config-options'    => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'addConfigoptions'),
                'validate-promo-code'   => array('class'=>'\BeonOrder\Controllers\Apis\Order\Order','method'=>'validatePromoCode'),
                'get-tld-list'           => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client', 'method'=>'getTldLists'),

//                'validate-promo-code'   => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Client','method'=>'validatePromoCode'),
                'check-payment-confirmation'    => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Invoice','method'=>'paymentConfirmationChecker'),
                'pay-with-creditbalance'        => array('class'=>'\BeonOrder\Controllers\Apis\PaymentGateway\Payment','method'=>'creditBalance'),
                'add-server-config'             => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'addConfigServer'),
                'add-app-config'                => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'addAppServer'),
                'get-information-template'      => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'getInformationTemplate'),
                'insert-log-tutorial'           => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'insertLogTutorial'),
                'get-rating-tutorial'           => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'getRatingTutorial'),
                'add-rating-tutorial'           => array('class'=>'\BeonOrder\Controllers\Apis\Vps\Vps','method'=>'addRatingTutorial'),
                'redirect-invoice'              => array('class'=>'\BeonOrder\Controllers\Apis\Clients\Invoice','method'=>'viewInvoice'),
                'get-visible-payment'           => array('class'=>'\BeonOrder\Controllers\Apis\PaymentGateway\Payment','method'=>'getVisiblePayment'),
            );
        }
        return $this->_config;
    }

    public function run($action){
        $config = $this->config();
        if(array_key_exists($action,$config)){
            return $config[$action];
        }

        return false;
    }
    public function execute(){
        try
        {
            $api = $this->get['api'];
            if(empty($api))
                throw new \Exception("API cannot be empty");
            unset($this->get['api']);
            $config = $this->run($api);
            if(!$config)
                throw new \Exception('API not found');
            $class = $config['class'];
            $method = $config['method'];
            $classObject = new $class($this->vars);
            $response = $classObject->$method();
            $this->responseJson($response);
            return true;
        }
        catch(\Exception $e)
        {
            $this->responseJson([
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);
            return false;
        }
    }
}