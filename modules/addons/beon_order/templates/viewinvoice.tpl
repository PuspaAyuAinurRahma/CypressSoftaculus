<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="{$charset}"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{if $kbarticle.title}{$kbarticle.title} - {/if}{$pagetitle} - {$companyname}</title>

    {include file="$template/includes/head.tpl"}

    {$headoutput}
    {*<link href="{$WEB_ROOT}/templates/{$template}/css/invoice.css" rel="stylesheet">*}
    <link href="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/css/custom-invoice.css" rel="stylesheet">
    <script type="text/javascript"
            src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/js/custom-invoice.js"></script>
    {if $paymentmodule eq 'bersamaid' || $paymentmodule eq 'snapvabca' || $paymentmodule eq 'snapindomaret' || $paymentmodule eq 'snapveritrans' || $paymentmodule eq 'gopay' }
        <style>
            iframe#snap-midtrans {
                background: rgba(99, 1, 88, 0.96) !important;
            }
        </style>
    {/if}
    <link rel="stylesheet" href="{$WEB_ROOT}/modules/addons/beon_notifications/app/Views/clientarea/assets/css/highlight.css">
</head>
<body data-phone-cc-input="{$phoneNumberInputStyle}">

<section id="header">
    {include file="$template/includes/header.tpl"}
</section>

<section id="main-body">
    <div class="container{if $skipMainBodyContainer}-fluid without-padding{/if}">
        <div class="row">
            <!-- Container for main page display content -->
            <div class="col-md-12 main-content">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="panel border-no-radius" id="panel-invoice"
                             style="/*padding: 15px 30px 15px 30px;*/">
                            <div class="panel-body">
                                <div class="notification">
                                    {$notification}
                                </div>
                                <div class="invoice-container">
                                    <div class="row">
                                        <div class="col-sm-8 col-xs-6">
                                            <h3>{$_lang['viewInvoiceTitle']} <strong>#{$invoiceid}</strong></h3>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="pull-right">
                                                <div class="invoice-status">
                                                    {if $status eq "Draft"}
                                                        <span class="draft">{$LANG.invoicesdraft}</span>
                                                    {elseif $status eq "Unpaid"}
                                                        <span class="unpaid">{$LANG.invoicesunpaid}</span>
                                                    {elseif $status eq "Paid"}
                                                        <span class="paid">{$LANG.invoicespaid}</span>
                                                    {elseif $status eq "Refunded"}
                                                        <span class="refunded">{$LANG.invoicesrefunded}</span>
                                                    {elseif $status eq "Cancelled"}
                                                        <span class="cancelled">{$LANG.invoicescancelled}</span>
                                                    {elseif $status eq "Collections"}
                                                        <span class="collections">{$LANG.invoicescollections}</span>
                                                    {elseif $status eq "Payment Pending"}
                                                        <span class="paid">{$LANG.invoicesPaymentPending}</span>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row margin-top-10 margin-left-10">
                                        <div class="col-md-6 col-md-offset-6">
                                            <div class="pull-right margin-left-15">
                                                <a href="dl.php?type=i&id={$invoiceid}">
                                                    <i class="fa fa-download" aria-hidden="true"></i> Download
                                                </a>
                                            </div>
                                            {if $status neq 'Paid'}
                                                <div class="pull-right margin-left-15">
                                                    <a href="#" data-toggle="collapse"
                                                       data-target="#invoicedetailspanel">
                                                        <i class="fa fa-align-left" aria-hidden="true"></i> Detail
                                                        Invoice
                                                    </a>
                                                </div>
                                            {/if}
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row {if $status neq 'Paid'}collapse{/if}" id="invoicedetailspanel">
                                        <div class="col-md-12">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title"><strong>{$LANG.invoicelineitems}</strong>
                                                    </h3>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="table-responsive">
                                                        <table class="table table-condensed">
                                                            <thead>
                                                            <tr>
                                                                <td><strong>{$LANG.invoicesdescription}</strong></td>
                                                                <td width="20%" class="text-center">
                                                                    <strong>{$LANG.invoicesamount}</strong></td>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {foreach from=$invoiceitems item=item}
                                                                <tr>
                                                                    <td>{$item.description}{if $item.taxed eq "true"} *{/if}</td>
                                                                    <td class="text-center">{$item.amount}</td>
                                                                </tr>
                                                            {/foreach}
                                                            <tr>
                                                                <td class="total-row text-right">
                                                                    <strong>{$LANG.invoicessubtotal}</strong></td>
                                                                <td class="total-row text-center">{$subtotal}</td>
                                                            </tr>
                                                            {if $taxrate}
                                                                <tr>
                                                                    <td class="total-row text-right"><strong>{$taxrate}
                                                                            % {$taxname}</strong></td>
                                                                    <td class="total-row text-center">{$tax}</td>
                                                                </tr>
                                                            {/if}
                                                            {if $taxrate2}
                                                                <tr>
                                                                    <td class="total-row text-right"><strong>{$taxrate2}
                                                                            % {$taxname2}</strong></td>
                                                                    <td class="total-row text-center">{$tax2}</td>
                                                                </tr>
                                                            {/if}
                                                            <tr>
                                                                <td class="total-row text-right">
                                                                    <strong>{$LANG.invoicescredit}</strong></td>
                                                                <td class="total-row text-center">{$credit}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="total-row text-right">
                                                                    <strong>{$LANG.invoicestotal}</strong></td>
                                                                <td class="total-row text-center">{$total}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {if $must_paid}
                                        <div class="col-md-12">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h3 class="panel-title"><strong>Transaction Applied</strong>
                                                    </h3>
                                                </div>
                                                <div class="panel-body">
                                                    <div class="table-responsive">
                                                        <table class="table table-condensed">
                                                            <thead>
                                                            <tr>
                                                                <td><strong>{$LANG.invoicesdescription}</strong></td>
                                                                <td width="20%" class="text-center">
                                                                    <strong>{$LANG.invoicesamount}</strong></td>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td class="total-row text-left">
                                                                    {$LANG.invoicestotal}</td>
                                                                <td class="total-row text-center">
                                                                    {$total}
                                                                </td>
                                                            </tr>
                                                            {foreach $detailViewTransaction as $key}
                                                                <tr>
                                                                    <td class="total-row text-left">
                                                                        {$key.gateway} - {$key.date}</td>
                                                                    <td class="total-row text-center">
                                                                        {$key.amount}
                                                                    </td>
                                                                </tr>
                                                            {/foreach}
                                                            <tr>
                                                                <td class="total-row text-right">
                                                                    <strong>Must Paid</strong></td>
                                                                <td class="total-row text-center">{$must_paid}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/if}
                                    </div>
                                    {if $status eq "Unpaid"}
                                        {if $paymentmodule neq 'creditbalance'}
                                            <div class="row" id="unpaid-countdown">
                                                <div class="col-md-12">
                                                    <div class="panel panel-orange margin-top-15">
                                                        <div class="panel-body text-center">
                                                            <h3 style="" class="margin-top-15 hidden-xs">
                                                                <strong>{$_lang['OrderSuccess']}</strong></h3>
                                                            <h4 style="" class="margin-top-15 visible-xs">
                                                                <strong>{$_lang['OrderSuccess']}</strong></h4>
                                                            <h5 class="hidden-xs">{$_lang['beonOrderOrderComplete']}</h5>
                                                            <h5 class="visible-xs">{$_lang['DoPaymentBefore']}</h5>
                                                            <div class="row">
                                                                <div class="col-md-6 col-md-offset-3">
                                                                    <div class="countdown" id="invoice-countdown">
                                                                        <div class="countdown-item">
                                                                            <span class="countdown-timer countdown-days">23</span>
                                                                            <span class="countdown-label">{$_lang['CountDownLabelDay']}</span>
                                                                        </div>
                                                                        <div class="countdown-divider">:</div>
                                                                        <div class="countdown-item">
                                                                            <span class="countdown-timer countdown-hours">23</span>
                                                                            <span class="countdown-label">{$_lang['CountDownLabelHour']}</span>
                                                                        </div>
                                                                        <div class="countdown-divider">:</div>
                                                                        <div class="countdown-item">
                                                                            <span class="countdown-timer countdown-minutes">10</span>
                                                                            <span class="countdown-label">{$_lang['CountDownLabelMin']}</span>
                                                                        </div>
                                                                        <div class="countdown-divider">:</div>
                                                                        <div class="countdown-item">
                                                                            <span class="countdown-timer countdown-second">15</span>
                                                                            <span class="countdown-label">{$_lang['CountDownLabelSec']}</span>
                                                                        </div>
                                                                    </div>
                                                                    <h5 class="margin-top-15">
                                                                        ( {$_lang['beonOrderOrderDate']['one']} {$duedateday} {$duedatedate} {$duedatemonth} {$duedateyear}
                                                                        {$_lang['beonOrderOrderDate']['two']} {$duedatehour}
                                                                        :{$duedateminute} {$_lang['beonOrderOrderDate']['three']}
                                                                        )</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        {/if}
                                    {/if}

                                    <div class="row">
                                        <div class="col-md-8 col-md-offset-2">
                                            <div class="row">
                                                <div class="col-xs-5">
                                                    <h4 class="margin-top-15">
                                                        <strong>{$_lang['PaymentMethod']}</strong></h4>
                                                </div>
                                                <div class="col-xs-7 text-right">
                                                    {if $paymentmodule eq 'bni'}
                                                        <img class="paymentmethod-img"
                                                             src="http://www.jagoanhosting.com/wp-content/uploads/2018/01/bni.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'bca'}
                                                        <img class="paymentmethod-img"
                                                             src="http://www.jagoanhosting.com/wp-content/uploads/2018/01/bca.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'mandiri'}
                                                        <img class="paymentmethod-img"
                                                             src="http://www.jagoanhosting.com/wp-content/uploads/2018/01/mandiri.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'mandiri2'}
                                                        <img class="paymentmethod-img"
                                                             src="http://www.jagoanhosting.com/wp-content/uploads/2018/01/mandiri.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'indomaret'}
                                                        <img class="paymentmethod-img"
                                                             src="http://www.jagoanhosting.com/wp-content/uploads/2018/01/indomaret.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'snapvabca' OR $paymentmodule eq 'vabcadirect'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/snapvabca.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'veritrans'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/veritrans.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'bersamaid'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/bersamaid.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'snapindomaret'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/snapindomaret.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'snapveritrans'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/snapveritrans.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'creditbalance'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/creditbalance.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'gopay'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/gopay.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'shopeepay'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/shopeepay.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'ovo'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/ovo.png">
                                                    {/if}
                                                    {if $paymentmodule eq 'vabni'}
                                                        <img class="paymentmethod-img"
                                                             src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/vabni.png">
                                                    {/if}

                                                    {*{if $status eq "Unpaid"}*}
                                                    {*{if $allowchangegateway}*}
                                                    {*{if $paymentmodule eq 'bersamaid' || $paymentmodule eq 'snapindomaret' || $paymentmodule eq 'snapvabca' || $paymentmodule eq 'snapveritrans'}*}
                                                    {*<span class="hidden-xs">*}
                                                    {*{$paymentmethod}*}
                                                    {*</span>*}
                                                    {*{else}*}
                                                    {*<a href="#" class="margin-top-5" data-toggle="modal" data-target="#beoncustomorderchoosepayment">*}
                                                    {*<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Ganti*}
                                                    {*</a>*}

                                                    {*<form method="post" id="form_change_gateway" action="{$smarty.server.PHP_SELF}?id={$invoiceid}" class="form-inline hidden">*}
                                                    {*{$gatewaydropdown}*}
                                                    {*</form>*}
                                                    {*{/if}*}
                                                    {*{else}*}
                                                    {*<span class="hidden-xs">*}
                                                    {*{$paymentmethod}*}
                                                    {*</span>*}
                                                    {*{/if}*}
                                                    {*{/if}*}

                                                    {if $status eq "Unpaid"}
                                                        {if $allowchangegateway}
                                                            <a {{$beonGaTracking->Render('change-payment-btn')}}
                                                                    id="change-payment-btn" href="#"
                                                                    class="margin-top-5" data-toggle="modal"
                                                                    data-target="#beoncustomorderchoosepayment">
                                                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                {$_lang['beonChangePaymentButton']}
                                                            </a>
                                                            <form method="post" id="form_change_gateway"
                                                                  action="{$smarty.server.PHP_SELF}?id={$invoiceid}"
                                                                  class="form-inline hidden">
                                                                {$gatewaydropdown}
                                                            </form>
                                                        {/if}
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {if $status eq "Unpaid"}
                                        <div class="clearfix">
                                            <hr>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-md-offset-3 text-center">
                                                <h4>{$_lang['PaymentBillToPaid']}</h4>
                                                <p class="invoice-total margin-top-10 text-success">
                                                    {if $paymentmodule neq 'bersamaid'
                                                    && $paymentmodule neq 'snapindomaret'
                                                    && $paymentmodule neq 'snapvabca' && $paymentmodule neq 'gopay' && $paymentmodule neq 'shopeepay'
                                                    && $paymentmodule neq 'vabni' && $paymentmodule neq 'vabcadirect' && !$must_paid}
                                                        Rp. {$beonamount|number_format:0:",":"."},-
                                                    {elseif $must_paid}
                                                        {$must_paid},-
                                                    {else}
                                                        Rp. {$beonamount|number_format:0:",":"."},-
                                                    {/if}
                                                    <button class="btn btn-default btn-xs copyToClipboard"
                                                            data-clipboard="{$beonamount}"><i class="fa fa-files-o"
                                                                                              aria-hidden="true"></i>
                                                        Copy
                                                    </button>
                                                </p>
                                                <p class="payment-description">({$_lang['PaymentDescription']})</p>
                                            </div>
                                        </div>
                                        <div class="row margin-top-15">
                                            <div class="col-md-6 col-md-offset-3 text-center">
                                                {if $paymentmodule eq 'bersamaid' || $paymentmodule eq 'snapindomaret'
                                                || $paymentmodule eq 'snapvabca' || $paymentmodule eq 'creditbalance'
                                                || $paymentmodule eq 'gopay' || $paymentmodule eq 'ovo'
                                                || $paymentmodule eq 'vabni' || $paymentmodule eq 'vabcadirect' }
                                                    <h4>{$beontype}</h4>
                                                    <p class="invoice-total margin-top-10 text-success">
                                                        {if $paymentmodule neq 'gopay' && $paymentmodule neq 'ovo' && $paymentmodule neq 'shopeepay'}
                                                            {if $paymentmodule eq 'bersamaid'}
                                                                <span class="label label-default" data-toggle="tooltip"
                                                                      data-placement="top" title="Kode Bank">987</span>
                                                            {/if}
                                                            {$beoncode}
                                                            <button class="btn btn-default btn-xs copyToClipboard"
                                                                    data-clipboard="{$beoncode}"><i
                                                                        class="fa fa-files-o"
                                                                        aria-hidden="true"></i>
                                                                Copy
                                                            </button>
                                                        {/if}
                                                    </p>
                                                    {if $paymentmodule eq 'ovo'}
                                                        <div id="form-ovo">
                                                            <h4>{$_lang['OvoForm']}</h4>
                                                            <form method="post" id="form_payment_ovo"
                                                                  class="margin-top-15">
                                                                <div class="form-group">
                                                                    <div class="col-sm-12 col-md-8">
                                                                        <input type="text" class="form-control"
                                                                               name="phonenumber" id="phonenumber"
                                                                               maxlength="13"
                                                                               placeholder="{$_lang['FormPhoneNumber']}"/>
                                                                        <input type="hidden" name="submitted"
                                                                               id="submitted" value="1"/>
                                                                    </div>
                                                                    <div class="col-sm-12 col-md-4 col-sm-12 hidden-xs">
                                                                        <button class="btn btn-primary btn-payment-ovo"
                                                                                id="btn-payment-ovo">{$_lang['PayButton']}
                                                                        </button>
                                                                    </div>
                                                                    <div class="col-xs-12 hidden-lg hidden-md hidden-sm">
                                                                        <button class="btn btn-primary btn-block btn-md btn-payment-ovo"
                                                                                style="margin-top:20px"
                                                                                id="btn-payment-ovo">{$_lang['PayButton']}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div id="loading-ovo" class="margin-top-15"
                                                             style="display: none;">
                                                            <div class="margin-top-15">
                                                                <span id="waitingPay">
                                                                    <h4><strong>{$_lang['OvoWaitingPay']}</strong></h4>
                                                                </span>
                                                                <span id="waitingCheck"
                                                                      style="display:none"><h4><strong>{$_lang['WaitingCheck']}</strong></h4>
                                                                </span>
                                                                <span id="failedPayment"
                                                                      style="display:none"><h4><strong>{$_lang['FailedPayment']}</strong></h4>
                                                                </span>
                                                            </div>
                                                            <div class="margin-top-15">
                                                                <i class="fas fa-4x fa-circle-notch fa-spin"></i>
                                                            </div>
                                                            <div class="margin-top-15" id="ovoTimerDiv">
                                                                <p>
                                                                    <span>{$_lang['TimeLoading']}</span>
                                                                    <br>
                                                                    <strong>
                                                                        <h2>
                                                                            <span class="ovo-timer countdown-minutes">00</span>
                                                                            :
                                                                            <span class="ovo-timer countdown-seconds">00</span>
                                                                        </h2>
                                                                    </strong>


                                                                </p>
                                                                <p>{$_lang['Waiting']}</p>
                                                            </div>
                                                            <div class="margin-top-15" id="ovoSessionTransactionDestroy"
                                                                 style="display:none">
                                                                <p>{$_lang['OvoSessionTransactionDestroy']}</p>
                                                            </div>
                                                        </div>
                                                    {/if}
                                                    <div class="hidden">
                                                        {if $status eq "Unpaid"}
                                                            {$paymentbutton}
                                                        {/if}
                                                    </div>
                                                {elseif $paymentmodule eq 'veritrans' || $paymentmodule eq 'snapveritrans' || $paymentmodule eq 'testpayment'}
                                                    <div class="hidden">
                                                        {if $status eq "Unpaid"}
                                                            {$paymentbutton}
                                                        {/if}
                                                    </div>
                                                {else}
                                                    {$paymentbutton}
                                                {/if}
                                            </div>
                                        </div>
                                        <hr>
                                        {if $tutorial neq ''}
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="panel panel-bg-steel tutorial">
                                                    <div class="panel-body">
                                                        {$tutorial}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/if}
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="text-center">
                                                    <div id="confirm-payment-button">
                                                        <a href="{$smarty.server.PHP_SELF}?id={$invoiceid}&act=konfirmasi"
                                                           class="btn btn-success text-uppercase" id="confirm-payment"
                                                                {$beonGaTracking->Render('confirm-payment')}>
                                                            <span class="hidden-xs">{$_lang['PaidConfirmation']}</span>
                                                            <span class="visible-xs">{$_lang['Confirmation']}</span>
                                                        </a>
                                                    </div>
                                                    <div id="check-loading" style="display: none">
                                                        <div class="row">
                                                            <div>
                                                                <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
                                                                <p class="margin-top-15">{$_lang['viewInvoiceWaitPaymentConfirmationMessage']}</p>
                                                            </div>
                                                            <div class="col-md-6 col-md-offset-4">
                                                                <div class="countdown" id="check-payment-countdown"
                                                                     style="margin-left: 25px">
                                                                    <div class="countdown-item">
                                                                        <span class="countdown-timer countdown-minutes">00</span>
                                                                        <span class="countdown-label">{$_lang['viewInvoiceMenit']}</span>
                                                                    </div>
                                                                    <div class="countdown-divider">:</div>
                                                                    <div class="countdown-item">
                                                                        <span class="countdown-timer countdown-second">00</span>
                                                                        <span class="countdown-label">{$_lang['viewInvoiceDetik']}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="retry-confirm-payment-button" style="display:none">
                                                        <div>
                                                            <p class="margin-top-15">{$messageUnpaidPayment}</p>
                                                        </div>
                                                        <a {$beonGaTracking->Render('retry-confirm-payment')}
                                                                href="{$smarty.server.PHP_SELF}?id={$invoiceid}&act=konfirmasi"
                                                                class="btn btn-warning text-uppercase"
                                                                id="retry-confirm-payment">
                                                            <span>{$_lang['buttonRetryPayment']}</span>
                                                        </a>
                                                        <a {$beonGaTracking->Render('retry-open-ticket')}
                                                                href="/index.php?m=beon_custom_pages&action=support-flexible-ticket-case&header=PaymentConfirmation&body=PaymentConfirmation&invoice={$invoiceid}"
                                                                class="btn btn-default text-uppercase"
                                                                id="retry-open-ticket">
                                                            <span>{$_lang['buttonUploadPayment']}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                    {if $status eq "Paid"}
                                        <div class="row">
                                            <div class="col-md-8 col-md-offset-2">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 style="margin-top: 0px">
                                                            <strong>{$_lang['BillingRelease']}</strong>
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        {$datecreated}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8 col-md-offset-2">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <h5 style="margin-top: 0px">
                                                            <strong>{$_lang['BillingRelease']}</strong>
                                                        </h5>
                                                    </div>
                                                    <div class="col-md-6 text-right">
                                                        {$datepaid}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.main-content -->
            <div class="clearfix"></div>
        </div>
    </div>
</section>

<div class="modal fade" id="beoncustomorderchoosepayment" role="dialog">
    <div class="modal-dialog modal-sm">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header payment-modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center text-bold">{$_lang['PaymentMethodsOptions']}</h4>
            </div>
            <div class="modal-body" style="padding: 0px">
                <div id="beonchoosepaymentcontainer">
                    <div class="panel-group panel-payment-groups" id="accordion-group-payment">
                        <div class="panel panel-default">
                            <div class="panel-heading payment-modal-subheading">
                                <div class="row">
                                    <div class="col-md-6"><h5 style="margin: 0px;">
                                            <strong>{$_lang['PaymentMethodsOptions']}</strong>
                                        </h5></div>
                                    <div class="col-md-6 text-right;" style="text-align: right;">
                                        <a class="toggle-btn-hide" data-toggle="collapse" data-parent="#accordion"
                                           href="#panel-instan-payment">
                                            <small>sembunyikan <i class="fa fa-angle-up" aria-hidden="true"></i></small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="panel-instan-payment" class="panel-collapse panel-collapse-group collapse in">
                                <div class="panel-body">
                                    <div class="alert alert-success" style="margin-bottom: 0px;">
                                        <small>
                                            {$_lang['AutomaticPaymentValidation']}
                                        </small>
                                    </div>
                                    <div class="panel-group panel-paymentgateway-item" id="accordion" role="tablist"
                                         aria-multiselectable="true" style="margin-bottom: 0px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                        {*<div class="panel panel-default">*}
                            {*<div class="panel-heading payment-modal-subheading">*}
                                {*<div class="row">*}
                                    {*<div class="col-md-6"><h5 style="margin: 0px;"><strong>Transfer Bank</strong></h5>*}
                                    {*</div>*}
                                    {*<div class="col-md-6 text-right;" style="text-align: right;">*}
                                        {*<a class="toggle-btn-hide" data-toggle="collapse" data-parent="#accordion"*}
                                           {*href="#panel-banktransfer-payment">*}
                                            {*<small>tampilkan <i class="fa fa-angle-down" aria-hidden="true"></i></small>*}
                                        {*</a>*}
                                    {*</div>*}
                                {*</div>*}
                            {*</div>*}
                            {*<div id="panel-banktransfer-payment" class="panel-collapse panel-collapse-group collapse">*}
                                {*<div class="panel-body">*}
                                    {*<div class="panel-group panel-paymentgateway-item" id="accordion" role="tablist"*}
                                         {*aria-multiselectable="true">*}
                                    {*</div>*}
                                {*</div>*}
                            {*</div>*}
                        {*</div>*}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script type="text/javascript">

    BeonCustomInvoices.function.countdown("{$duedateformatjs}");
    var instantpaymnetGateway = [
        'gopay', 'shopeepay', 'ovo', 'snapvabca', 'creditbalance', 'snapindomaret', 'snapveritrans', 'vabni','vabcadirect'
    ];
    $(document).ready(function () {
        $('#form_change_gateway select option').each(function (i, obj) {
            if (instantpaymnetGateway.indexOf($(this).val()) > -1) {
                $('#panel-instan-payment').find('.panel-group').append(
                    '<div class="panel text-center" style="margin-top: 0px;">' +
                    '<div class="panel-heading" role="tab" style="padding-top: 0px; padding-bottom: 0px;">' +
                    '<div class="panel-title payment-panel-title clearfix" style="font-size: 12px;">' +
                    '<a class="choose-payment-item-btn" href="#" data-trackingtitle="Pilih Metode Pembayaran ' + $(this).val() + '"' +
                    'data-trackingcategory="SubCTA" data-trackinglabel="Popup Payment Method" data-payment="' + $(this).val() + '">' +
                    '<div style="text-align:left">' +
                    '<img src="/modules/addons/beon_order/templates/assets/images/' + $(this).val() + '.png" class="bank-img" alt="" height="50">' +
                    '&nbsp;&nbsp;&nbsp;' + $(this).text() +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            } else {
                $('#panel-banktransfer-payment').find('.panel-group').append(
                    '<div class="panel text-center" style="margin-top: 0px;">' +
                    '<div class="panel-heading" role="tab" style="padding-top: 0px; padding-bottom: 0px;">' +
                    '<div class="panel-title payment-panel-title clearfix" style="font-size: 12px;">' +
                    '<a class="choose-payment-item-btn" href="#" data-trackingtitle="Pilih Metode Pembayaran ' + $(this).val() + '"' +
                    'data-trackingcategory="SubCTA" data-trackinglabel="Popup Payment Method" data-payment="' + $(this).val() + '">' +
                    '<div style="text-align:left">' +
                    '<img src="/modules/addons/beon_order/templates/assets/images/' + $(this).val() + '.png" class="bank-img" alt="" height="50">' +
                    '&nbsp;&nbsp;&nbsp;' + $(this).text() +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            }
        });

        function toggleText(e) {
            e.preventDefault();
            if ($(e.target).hasClass('panel-payment-tutorial')) {

            } else {
                var icon = $(e.target)
                    .prev('.panel-heading')
                    .find("i.fa");
                if (icon.hasClass('fa-angle-up')) {
                    $(e.target)
                        .prev('.panel-heading')
                        .find('a').html('<small>tampilkan <i class="fa fa-angle-down" aria-hidden="true"></i></small>');
                } else {
                    $(e.target)
                        .prev('.panel-heading')
                        .find('a').html('<small>sembunyikan <i class="fa fa-angle-up" aria-hidden="true"></i></small>');
                }
            }
        }

        $('.panel-payment-groups').on('hidden.bs.collapse', toggleText);
        $('.panel-payment-groups').on('shown.bs.collapse', toggleText);

        $('a.toggle-btn-hide').on('click', function (e) {
            e.preventDefault();
            var panelgroup = $(this).closest('.panel-payment-groups');
            var panelgroupitem = panelgroup.find('.panel-collapse-group');
            panelgroupitem.collapse('hide');
            $(this).closest('.panel-collapse-group').collapse('show');
        });

        $('#beonchoosepaymentcontainer .panel a.choose-payment-item-btn').on('click', function (e) {
            e.preventDefault();
            $('#form_change_gateway select').val($(this).data('payment'));
            $('#form_change_gateway').submit();
        });

        function copyToClipboard(element) {
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(element).select();
            document.execCommand('copy');
            $temp.remove();
        }

        $('.copyToClipboard').on('click', function (e) {
            e.preventDefault();
            var cb = $(this).data('clipboard');
            copyToClipboard(cb);
        });

        var time;
        var interval;
        var timeParts;
        var durationSecond;
        var invoiceid = {$invoiceid};
        durationSecond -= interval;
        var statusPayment;

        function initDuration() {
            time = "{$payment_check_duration}";
            interval = {$payment_api_interval};
            timeParts = time.split(":");
            durationSecond = (+timeParts[0] * 60) + (+timeParts[1]);
            durationSecond -= interval;
        }

        $('#confirm-payment,#retry-confirm-payment').on('click', function (e) {
            e.preventDefault();
            $('#unpaid-countdown').hide();
            $('#retry-confirm-payment-button').hide();
            var time = "{$payment_check_duration}";
            var timeParts = time.split(":");
            var durationMilisecond = (+timeParts[0] * 60000) + (+timeParts[1] * 1000);
            $('#confirm-payment').hide();
            BeonCustomInvoices.function.checkerpaymentcountdown(durationMilisecond + 1000);
            $('#check-loading').show();
            initDuration();
        });

        $('#check-payment-countdown .countdown-second').on('DOMSubtreeModified', function () {
            var min = $('body #check-payment-countdown .countdown-minutes').html();
            var sec = $('body #check-payment-countdown .countdown-second').html();
            var test = ((parseInt(min) * 60) + parseInt(sec));
            if (!isNaN(test) && test == durationSecond) {
                if (statusPayment == 1) {
                    window.stop();
                }
                else {
                    checkPayment(invoiceid);
                    durationSecond -= interval;
                }
            }
            if (min == '0' && sec == '0' || min == '00' && sec == '00') {
                $('#check-loading').hide();
                renderRetryButton();
            }
        });

        function checkPayment(invoiceid) {
            var data = {
                invoice_id: invoiceid
            };

            $.post('/index.php?m=beon_order&action=api&api=check-payment-confirmation', data, function (result) {
                if (result.status == 1) {
                    if (result.data.status == 1) {
                        if (result.data.is_valid) {
                            statusPayment = 1;
                            location.reload();
                        }
                        else {
                            // console.log('unpaid');
                        }
                    }
                }
            });
        }

        function openTicket(invoiceid) {
            window.location = "/index.php?m=beon_custom_pages&action=support-flexible-ticket-case&header=PaymentConfirmation&body=PaymentConfirmation&invoice=" + invoiceid + "&utm_source=Member%20Area&utm_medium=Button%20-%20Invoice%20Payment%20Confirmation";
        }

        function renderRetryButton() {
            $('#retry-confirm-payment-button').show();
        }


        $('.btn-payment-ovo').off().on('click', function (e) {
            e.preventDefault();
            var phonenumber = $('#form_payment_ovo #phonenumber').val();
            var submitted = $('#form_payment_ovo #submitted').val();
            var url = window.location.pathname + window.location.search;

            if ($.trim(phonenumber) === '') {
                swal({
                    title: '{$_lang['OvoTitle']}',
                    text: "{$_lang['HanphoneNumberValidation']}" ,
                    icon: "warning",
                }).then(() => {
                    $('#form_payment_ovo #phonenumber').focus();
                });
                return false;
            }

            var ovoTime = "01:00";
            var ovoTimeParts = ovoTime.split(":");
            var ovoDurationMilisecond = (+ovoTimeParts[0] * 60000) + (+ovoTimeParts[1] * 1000);
            var countDownDate = new Date((new Date().getTime()) + ovoDurationMilisecond);

            $('#form-ovo').hide();
            $('#loading-ovo').show();
            $("#ovoTimerDiv").show();
            $("#waitingCheck").show();
            $('#failedPayment').hide();
            $("#ovoSessionTransactionDestroy").hide();


            $("#waitingPay").show();
            $("#waitingCheck").hide();

            var ErrorInRequestTimeout = undefined;
            var currentTimeInterval = undefined;
            // Update the count down every 1 second
            var x = setInterval(function () {
                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now an the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result in an element with id="demo"
                $('.ovo-timer.countdown-minutes').html(minutes);
                $('.ovo-timer.countdown-seconds').html(seconds);

                // If the count down is over, write some text
                // console.log(seconds);
                if (minutes == 0 && seconds == 46) {
                    $("#waitingPay").hide();
                    $("#waitingCheck").show();
                }
                currentTimeInterval = distance;

                if (distance < 0) {
                    clearInterval(x);
                    $('.ovo-timer.countdown-minutes').html("00");
                    $('.ovo-timer.countdown-seconds').html("00");
                    $("#waitingCheck").hide();
                    $('#failedPayment').show();
                    $("#ovoTimerDiv").hide();

                    // swal({
                    //     title: '{$_lang['Title']}',
                    //     text: '{$_lang['OvoSessionTransactionDestroy']}',
                    //     icon: "error",
                    // }).then(() => {
                    //     location.reload();
                    // });

                    $("#ovoSessionTransactionDestroy").show();
                    // ErrorInRequestTimeout = true;
                    // location.reload();
                }
            }, 1000);

            var data = {
                "phonenumber": phonenumber,
                "submitted": submitted
            };

            $.post(url, data, function (result) {
                var response = JSON.parse(result);
                $('.ovo-timer.countdown-minutes').html("00");
                $('.ovo-timer.countdown-seconds').html("00");
                var notif = response.notification;
                var order = response.order;

                if (order != null) {
                    clearInterval(x);
                    swal({
                        title: '{$_lang['Title']}',
                        text: '{$_lang['PaymentSuccess']}',
                        icon: "success",
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    if (ErrorInRequestTimeout) {
                        location.reload();
                    } else {
                        if (currentTimeInterval < 0) {
                            $('#form-ovo').show();
                            $('#loading-ovo').hide();
                            $("#waitingPay").show();
                            $("#waitingCheck").hide();
                            swal({
                                title: '{$_lang['Title']}',
                                text: '{$_lang['PaymentNotFound']}',
                                icon: "error",
                            });
                            clearInterval(x);
                        } else {
                            var errorCode = notif[0].errorCode;
                            if (errorCode === 26 || errorCode === 408 || errorCode === 40) {
                                console.log(notif[0].errorMsg);
                            } else {
                                swal({
                                    title: '{$_lang['Title']}',
                                    text: notif[0].errorMsg,
                                    icon: "error",
                                });
                                $('#form-ovo').show();
                                $('#loading-ovo').hide();
                                $("#waitingPay").show();
                                $("#waitingCheck").hide();
                                clearInterval(x);
                            }
                        }
                    }
                }
            });
        });

        // autoCheckPayment();
        // function autoCheckPayment() {
        //     if (statusPayment == 1) {
        //         window.stop();
        //     }
        //     else {
        //         var setValueCreditBalance = localStorage.getItem('setValueCreditBalance');
        //         if (setValueCreditBalance == null) {
        //             var data = {
        //                 invoice_id: invoiceid
        //             };
        //
        //             $.post('/index.php?m=beon_order&action=api&api=check-payment-confirmation', data, function (result) {
        //                 if (result.status == 1) {
        //                     if (result.data.status == 1) {
        //                         if (result.data.is_valid) {
        //                             statusPayment = 1;
        //                             location.reload();
        //                         } else {
        //                             // console.log('unpaid');
        //                         }
        //                     }
        //                 }
        //             });
        //         }
        //         else {
        //             localStorage.removeItem('setValueCreditBalance')
        //         }
        //     }
        //     setInterval(autoCheckPayment, 60000);
        // }
    });
</script>
<section id="footer">
    <div class="container">
        <a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
        <p>Copyright &copy; {$date_year} {$companyname}. All Rights Reserved.</p>
    </div>
</section>
<script src='https://unpkg.com/rxjs/bundles/rxjs.umd.min.js'></script>
<script src='{$WEB_ROOT}/modules/addons/beon_notifications/app/Views/clientarea/assets/js/notification-rx.js'></script>

{$footeroutput}

{*{debug}*}
</body>
</html>
