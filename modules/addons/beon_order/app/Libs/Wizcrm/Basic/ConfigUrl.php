<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 4/19/16
 * Time: 11:46 AM
 */

namespace BeonOrder\Libs\Wizcrm\Basic;



class ConfigUrl extends One
{
    public $urlApiBilling           = 'https://api.revoluzio.com/billing/v1/';
    public $urlApiSms               = 'https://api.revoluzio.com/sms/api/v1';
    public $urlApiEmail             = 'https://api.revoluzio.com/email/v3/api/v1';
    public $urlApiEmailTemplate     = 'https://api.revoluzio.com/email-editor/v2/';
    public $urlApiAccount           = 'https://api.revoluzio.com/account/v1/';
    public $urlApiTracking          = 'https://api.revoluzio.com/tracking/v1/';

    public $urlCallbackLink         = 'https://api.revoluzio.com/contact/v1/broadcast';
    public $urlCallbackImage        = 'https://api.revoluzio.com/contact/v1/broadcast';
    public $urlApiAccountActivity   = 'https://api.revoluzio.com/account/v1/';
    public $urlApiBuilder           = 'https://api.revoluzio.com/pagebuilder/v2/';
    public $urlApiWifi              = 'https://api.revoluzio.com/wifi/v2/';
    public $urlApiEmailEditor       = 'https://api.revoluzio.com/email-editor/v2/';

}