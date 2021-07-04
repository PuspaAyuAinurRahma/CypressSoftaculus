<!-- Modal -->
<style>
    #beoncustomorderlogin *{
        font-family: Monsterrat,sans-serif!important;
    }
    #beoncustomorderlogin label{
        font-size: ;
    }
</style>

<div class="modal fade" id="beoncustomorderchoosepayment" role="dialog">
    <div class="modal-dialog modal-sm">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title text-center text-bold">Pilih Metode Pembayaran</h4>
            </div>
            <div class="modal-body" style="padding: 0px">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <form method="post" action="{$smarty.server.PHP_SELF}?a=checkout" name="orderfrm" id="frmCheckout">
                        <input type="hidden" name="submit" value="true"/>
                        <input type="hidden" name="custtype" value="existing"/>
                        <input type="hidden" name="firstname" id="inputFirstName" value="{$clientsdetails.firstname}">
                        <input type="hidden" name="lastname" id="inputLastName" value="{$clientsdetails.lastname}">
                        <input type="hidden" name="address1" id="inputAddress1" value="{$clientsdetails.address1}"/>
                        <input type="hidden" name="country" id="inputCountry" value="{$country}">
                        <input type="hidden" name="email" id="inputEmail" value="{$clientsdetails.email}">
                        <input type="hidden" name="phonenumber" id="inputPhone" value="{$clientsdetails.phonenumber}">
                        <input type="hidden" name="password" id="inputNewPassword1"{if $remote_auth_prelinked} value="{$password}"{/if}>
                        <input type="hidden" name="password2" id="inputNewPassword2"{if $remote_auth_prelinked} value="{$password}"{/if}>
                        <input type="hidden" name="companyname" id="inputCompanyName" value="{$clientsdetails.companyname}">
                        <input type="hidden" name="state" id="inputState" value="{$clientsdetails.state}">
                        <input type="hidden" name="city" id="inputCity" value="{$clientsdetails.city}">
                        <input type="hidden" name="postcode" id="inputPostcode" value="{$clientsdetails.postcode}">
                        <input type="hidden" name="paymentmethod" value="">
                        <input type="hidden" name="accepttos" id="accepttos" value="on"/>
                        <input type="hidden" name="country-calling-code-phonenumber" id="" value="{$clientsdetails.phonecc}"/>
                        {foreach key=num item=gateway from=$gateways}
                            <div class="panel panel-default" style="margin-top: 0px;">
                                <div class="panel-heading" role="tab" id="heading{$num}" style="padding-top: 0px; padding-bottom: 0px;">
                                    <div class="panel-title clearfix" style="font-size: 12px;">
                                        <a role="button" data-toggle="collapse" data-payment="{$gateway.sysname}" data-parent="#accordion" href="#collapse{$num}" aria-expanded="true" aria-controls="collapse{$num}">
                                            {*<img src="/templates/orderforms/flowcart7/images/{$gateway.sysname}.png"*}
                                            <img src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/images/{$gateway.sysname}.png"
                                                 class="bank-img" alt="">
                                            {$gateway.name}
                                            <i class="more-less fa fa-angle-down pull-right" style="margin-top: 15px;font-size: 18px;"></i>
                                        </a>
                                    </div>
                                </div>
                                <div id="collapse{$num}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading{$num}">
                                    <div class="panel-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="submit" class="btn btn-pink btn-block btn-select-payment" disabled>Bayar Sekarang</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/foreach}
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>