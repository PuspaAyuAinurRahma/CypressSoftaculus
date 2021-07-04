<?php

namespace BeonOrder\Controllers\Pages\ResumeOrder;

use BeonOrder\Helpers\Config;
use BeonOrder\Controllers\Pages\PageBase;
use BeonOrder\Helpers\Invoices;
use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Helpers\ResumeOrderHelper;
use BeonOrder\Controllers\Base;

class ViewResumeOrder extends PageBase
{
    public $hConfig;

    public function __construct($vars)
    {
        parent::__construct($vars);
        $this->hConfig = new Config();
    }


    public function show()
    {
        try {
            $hInvoice = new Invoices();
            $hResumeOrderHelper = new ResumeOrderHelper();
            $invoiceid = $this->get['invoiceid'];
            $checkStatus = $hInvoice->invoiceChecker($invoiceid);
            if ($checkStatus['status'] != 1) throw new Exception($checkStatus['message']);
            if (empty($checkStatus['is_valid'])) throw new Exception('Your invoice is Unpaid');

            $getInvoice = $hInvoice->getInvoiceLocalApiByInvoiceId($invoiceid);
            if ($getInvoice['status'] != 1) throw new Exception($getInvoice['message']);

            $getData = $hResumeOrderHelper->getDataByRellIdAndType($getInvoice['data'], $invoiceid);
            if ($getData['status'] != 1) throw new Exception($getData['message']);

            $this->vars = [
                'resume_order' => $getData['data']
            ];
            $this->pagetitle    = 'Resume Order Overview';
            $this->templatefile = 'viewresumeorder.tpl';
            $this->requirelogin = true;

        } catch (Exception $e) {
            $this->errorPage = 1;
        }
    }

    public function initAnalytic()
    {
        $clients = [];
        $vars = $this->vars;
        if (isset($_SESSION['uid'])) {
            $clients = [
                'email' => $vars['clientsdetails']['email']
            ];
        }
        $scripts = "<script type='text/javascript'>
                        var analytic_config ={
                            clients: " . json_encode($clients) . ",
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

        $pixelcode = self::initPixel($vars);
        $tagmanager = self::initGoogleTagManager($vars);
        $scripts .= $tagmanager;
        $scripts .= $pixelcode;
//        $gtmcode  = self::initGoogleTagManager($vars);
//        $scripts    .=$gtmcode;
        $this->vars['headoutput'] = $scripts;
        $this->vars['footeroutput'] = \Addons\Modules\BeonGa\Controllers\BeonGa::sendPageView($this->vars);
    }

    public static function initPixel($vars)
    {
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

    public static function initGoogleTagManager($vars)
    {
        $gtm_code = 'GTM-KHM7G6F';
        $scripts = "
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','" . $gtm_code . "');</script>
        <!-- End Google Tag Manager -->
        ";
        return $scripts;
    }

    public function getTutorial($module)
    {
        switch ($module) {
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
                $tutorial = file_get_contents(BEON_ORDER_BASE_DIR . '/templates/includes/' . $module . '.tpl');
        }

        return $tutorial;
    }

    public function getBankAccount($bank)
    {
        $config = [
            'bca' => [
                'rek' => '8220798080',
                'desc' => 'a.n Danton Prabawanto'
            ],
            'bni' => [
                'rek' => '5454545000',
                'desc' => 'a.n Danton Prabawanto'
            ],
            'mandiri' => [
                'rek' => '1420058958959',
                'desc' => 'a.n Danton Prabawanto'
            ],
            'mandiri2' => [
                'rek' => '1400079990009',
                'desc' => 'a.n Beon Intermedia'
            ],
        ];
        return $config[$bank];
    }

}