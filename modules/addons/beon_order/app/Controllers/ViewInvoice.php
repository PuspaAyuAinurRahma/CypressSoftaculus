<?php

namespace BeonOrder\Controllers;

use BeonOrder\Helpers\Config;

class ViewInvoice extends Base
{
    private $hConfig;
    public function __construct($vars)
    {
        parent::__construct($vars);
        $this->hConfig = new Config();
    }


    public function execute()
    {
        try{
            if(!$this->isanOldPayment($this->vars['paymentmodule'])){

                if($this->vars['status']=='Unpaid'){
                    $this->renderNewInvoice();
                }
            }
        }catch (\Exception $e){
            $this->errorPage = 1;
        }
    }

    public function renderNewInvoice(){
//        print_r($this->vars['total']->toNumeric());
//        die;
        $dataViewTransaction    = [];
        if($this->vars['transactions']){
            $transaction = 0;
            foreach ($this->vars['transactions'] as $k => $key){
                $payment = $key['amount']->toNumeric();

                $transaction += $payment;

                $dataViewTransaction[$k]    = [
                    'gateway'   => $key['gateway'],
                    'amount'    => formatCurrency($key['amount']->toNumeric() * -1,$this->vars['uid']),
                    'date'      => $key['date'],
                ];
            }
            $mustpaid   = $this->vars['total']->toNumeric() - $transaction;
            $this->vars['detailViewTransaction'] = $dataViewTransaction;
            $this->vars['must_paid']             = formatCurrency($mustpaid);
        }

        $paymentDuration = $this->hConfig->getModulesConfig('payment_confirmation_duration');
        $this->vars['payment_check_duration']  = $paymentDuration['data']->value;
        $paymentApiInterval = $this->hConfig->getModulesConfig('payment_api_interval');
        $this->vars['payment_api_interval']  = $paymentApiInterval['data']->value;

        $notification = '';
        if(isset($_GET['act']) AND $_GET['act'] == 'konfirmasi'){
            if($this->vars['status'] != 'Paid'){
                $notification .= '<div class="alert alert-warning">Kami belum menerima pembayaran Anda, silakan tunggu 5 menit lagi</div>';
            }else{
                $notification .= '<div class="alert alert-success">Kami sudah menerima pembayaran Anda, terimakasih</div>';
            }
        }

        $paymentmodule = $this->vars['paymentmodule'];

        if($paymentmodule == 'bersamaid' OR $paymentmodule == 'gopay' OR $paymentmodule == 'snapindomaret' OR $paymentmodule == 'snapvabca' OR $paymentmodule == 'vabni' OR $paymentmodule == 'vabcadirect'){
            $paymentbutton = $this->vars['paymentbutton'];

//                if(!$this->isJSON($paymentbutton))
//                    throw new \Exception('Invalid response from payment gateway module');

            $paymentgateway = json_decode($paymentbutton, 1);

            if(!empty($paymentgateway['notification']) AND is_array($paymentgateway['notification'])){
                foreach($paymentgateway['notification'] AS $notif){
                    $notification .= '<div class="alert alert-'.$notif['class'].'">'.$notif['message'].'</div>';
                }
            }

            if(!empty($paymentgateway['order']) AND is_array($paymentgateway['order'])){
                $expireddate    = $paymentgateway['order']['expired_at'];
                $duedateday     = $this->convertDay(date('N', strtotime($expireddate)));
                $duedatedate    = date('d', strtotime($expireddate));
                $duedatemonth   = $this->convertMonth(date('m', strtotime($expireddate)));
                $duedateyear    = date('Y', strtotime($expireddate));
                $duedatehour    = date('H', strtotime($expireddate));
                $duedateminute  = date('i', strtotime($expireddate));
                $duedatesecond  = date('s', strtotime($expireddate));
                $beonamount     = $paymentgateway['order']['amount'];
                $beoncode       = $paymentgateway['order']['virtual_account'];
            }else{
                $expireddate = '0000-00-00 00-00-00';
                $duedateday     = '00';
                $duedatedate    = '00';
                $duedatemonth   = '00';
                $duedateyear    = '0000';
                $duedatehour    = '00';
                $duedateminute  = '00';
                $duedatesecond  = '00';
                $beonamount     = 0;
                $beoncode       = 0;
            }

            $duedateformatjs = date('M d, Y H:i:s', strtotime($expireddate));
            $this->vars['beonamount']       = $beonamount;
            $this->vars['beoncode']         = $beoncode;
            $this->vars['beontype']         = $paymentmodule == 'snapindomaret' ? 'Kode Pembayaran' : 'Nomor Rekening';
        }
        else{

            $duedate        = $this->vars['duedate'];
            $explode        = explode('/', $duedate);
            $expireddate    = $explode[2] . '-' . $explode[1] . '-' . $explode[0] . ' 23:59:59';
            $duedateday     = $this->convertDay(date('N', strtotime($expireddate)));
            $duedatedate    = date('d', strtotime($expireddate));
            $duedatemonth   = $this->convertMonth(date('m', strtotime($expireddate)));
            $duedateyear    = date('Y', strtotime($expireddate));
            $duedatehour    = date('H', strtotime($expireddate));
            $duedateminute  = date('i', strtotime($expireddate));
            $duedatesecond  = date('s', strtotime($expireddate));

            $duedateformatjs = date('M d, Y H:i:s', strtotime($expireddate));
            $this->vars['beonamount']       = intval($this->vars['total']->toNumeric());
            $this->vars['beoncode']         = $this->getBankAccount($this->vars['paymentmodule']);
        }

        $this->vars['notification']     = $notification;
        $this->vars['duedateformatjs']  = $duedateformatjs;
        $this->vars['duedateday']       = $duedateday;
        $this->vars['duedatedate']      = $duedatedate;
        $this->vars['duedatemonth']     = $duedatemonth;
        $this->vars['duedateyear']      = $duedateyear;
        $this->vars['duedatehour']      = $duedatehour;
        $this->vars['duedateminute']    = $duedateminute;
        $this->vars['duedatesecond']    = $duedatesecond;

        $this->vars['messageUnpaidPayment'] = strtr($this->vars['_lang']['viewInvoiceUnpaidPaymentMessage'], array('{$total}' => 'Rp. ' . number_format($this->vars['beonamount'],0,',','.') . ',-', '{$invoiceid}' => $this->vars['invoiceid']));

        GLOBAL $smarty;

        $smarty->debugging = false;
        $smarty->caching = false;
        $smarty->cache_lifetime = 120;
        $this->initAnalytic();
        foreach ($this->vars as $key=>$value){
            $smarty->assign($key, $value);
        }
        $smarty->assign('tutorial', $this->getTutorial($paymentmodule));
        $smarty->display(BEON_ORDER_BASE_DIR . '/templates/viewinvoice.tpl');

        die;
    }

    public function isanOldPayment($module){
        $oldmodules = [
            'veritrans','indomaret'
        ];
        if(in_array($module,$oldmodules))return true;
        return false;
    }

    public function initAnalytic(){
        $clients=[];
        $vars = $this->vars;
        if(isset($_SESSION['uid'])){
            $clients= [
                'email'=>$vars['clientsdetails']['email']
            ];
        }
        $scripts = "<script type='text/javascript'>
                        var analytic_config ={
                            clients: ".json_encode($clients).",
                        };
                        (function(i, s, o, g, r, a, m) {
                            i['GoogleAnalyticsObject'] = r;
                            i[r] = i[r] || function() {
                                    (i[r].q = i[r].q || []).push(arguments)
                                }, i[r].l = 1 * new Date();
                            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
                            a.async = 1;
                            a.src = g;
                            m.parentNode.insertBefore(a, m)
                        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
                        ga('create', 'UA-678047-2', 'auto', 'productionTracker', {'allowLinker': true,cookieDomain: 'member.jagoanhosting.com', cookieName: 'reference-internal', cookieExpires: '172800'});
                        ga('productionTracker.require', 'linker');
                        ga('productionTracker.linker:autoLink', ['www.jagoanhosting.com'] );
                        ga('create', 'UA-91261131-2', 'auto', 'risetTracker');
                        if(analytic_config.clients.length>0){
                            ga('productionTracker.set','userId',analytic_config.clients.email);
                            // var dimensionValue = 'SOME_DIMENSION_VALUE';
                            ga('risetTracker.set', 'dimension2', analytic_config.clients.email);
                            ga('productionTracker.set', 'dimension2', analytic_config.clients.email);
                        }
                        ga('risetTracker.require', 'ec');
                        ga('productionTracker.require', 'ec');
                    </script>";

        $scripts .= "<!-- Global site tag (gtag.js) - Google Ads: 776013746 -->
                        <script async src='https://www.googletagmanager.com/gtag/js?id=AW-776013746'></script>
                        <script>
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                        
                          gtag('config', 'AW-776013746');
                        </script>";

        $pixelcode  = self::initPixel($vars);
        $tagmanager = self::initGoogleTagManager($vars);
        $scripts    .= $tagmanager;
        $scripts    .=$pixelcode;
//        $gtmcode  = self::initGoogleTagManager($vars);
//        $scripts    .=$gtmcode;
        $this->vars['headoutput'] = $scripts;
        $this->vars['footeroutput'] = \Addons\Modules\BeonGa\Controllers\BeonGa::sendPageView($this->vars);
    }
    public static function initPixel($vars){
        $pixel_code = '1604464546488181';
        $scripts = "<!-- Facebook Pixel Code -->
                <script>
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '{$pixel_code}');
                  fbq('track', 'PageView');
                </script>
                <noscript>
                    <img height='1' width='1' style='display:none'src='https://www.facebook.com/tr?id={$pixel_code}&ev=PageView&noscript=1'/>
                </noscript>
                <!-- End Facebook Pixel Code -->
        ";
        return $scripts;
    }

    public static function initGoogleTagManager($vars){
        $gtm_code = 'GTM-KHM7G6F';
        $scripts = "
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','".$gtm_code."');</script>
        <!-- End Google Tag Manager -->
        ";
        return $scripts;
    }

    public function getTutorial($module)
    {
        switch($module){
            case 'bersamaid':
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/bersamaid.tpl');
                break;
            case 'snapindomaret':
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/snapindomaret.tpl');
                break;
            case 'snapvabca':
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/snapvabca.tpl');
                break;
            case 'snapveritrans':
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/snapveritrans.tpl');
                break;
            default:
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/'.$module.'.tpl');
        }

        return $tutorial;
    }
    public function getBankAccount($bank){
        $config =[
            'bca'=> [
                'rek'=>'8220798080',
                'desc'=>'a.n Danton Prabawanto'
            ],
            'bni'=>[
                'rek'=>'5454545000',
                'desc'=>'a.n Danton Prabawanto'
            ],
            'mandiri'=>[
                'rek'=>'1420058958959',
                'desc'=>'a.n Danton Prabawanto'
            ],
            'mandiri2'=>[
                'rek'=>'1400079990009',
                'desc'=>'a.n Beon Intermedia'
            ],
        ];
        return $config[$bank];
    }

}