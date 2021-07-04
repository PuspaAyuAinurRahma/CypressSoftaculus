<link href="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/css/custom-resume-order.css" rel="stylesheet">

<div class="container{if $skipMainBodyContainer}-fluid without-padding{/if}">
    <div class="col-xs-12">
        <div class="row hidden-xs margin-top-20">
            <div class="col-md-10 col-md-offset-1">
                <div class="row bs-wizard" style="border-bottom:0;margin-bottom: 0px;">
                    <div class="col-xs-3 bs-wizard-step complete">
                        <div class="text-center bs-wizard-stepnum-title">Langkah 1</div>
                        <p class="text-center bs-wizard-stepnum">Pilih Layanan</p>
                        <div class="progress hidden-xs">
                            <div class="progress-bar"></div>
                        </div>
                        <div class="bs-wizard-dot hidden-xs"></div>
                    </div>
                    <div class="col-xs-3 bs-wizard-step complete"><!-- complete -->
                        <div class="text-center bs-wizard-stepnum-title">Langkah 2</div>
                        <p class="text-center">Tinjau Pesanan</p>
                        <div class="progress hidden-xs">
                            <div class="progress-bar"></div>
                        </div>
                        <div class="bs-wizard-dot hidden-xs"></div>
                    </div>

                    <div class="col-xs-3 bs-wizard-step complete"><!-- active -->
                        <div class="text-center bs-wizard-stepnum-title">Langkah 3</div>
                        <p class="text-center">Pembayaran</p>
                        <div class="progress hidden-xs">
                            <div class="progress-bar"></div>
                        </div>
                        <div class="bs-wizard-dot hidden-xs"></div>
                    </div>

                    <div class="col-xs-3 bs-wizard-step complete"><!-- active -->
                        <div class="text-center bs-wizard-stepnum-title">Selesai</div>
                        <p class="text-center">Kelola Layanan</p>
                        <div class="progress hidden-xs">
                            <div class="progress-bar"></div>
                        </div>
                        <div class="bs-wizard-dot hidden-xs"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xs-12 margin-top-20">
        <div class="alert alert-cek-email text-center cek-email-blue ">
            <i class="fa fa-envelope" style="font-size: 20px !important;"></i>
            <span style="font-weight: bold;">Cek email sekarang</span> untuk mendapatkan informasi lengkap tentang layanan kamu
        </div>
    </div>
    <div class="col-xs-12 margin-top-20 grid-service-content">
        <div class="title-service">
            <h2 class="margin-top-20">Layanan yang kamu beli</h2>
        </div>
        <div class="invoice-id-content">
            <div class="col-xs-7">
                <h4 class="margin-top-30">Nomor Invoice : </h4>
            </div>
            <div class="col-xs-5">
                <a href="{$WEB_ROOT}/viewinvoice.php?id={$resume_order.invoiceid}" target="_blank"><h3 class="margin-top-30">
                        #{$resume_order.invoiceid}</h3></a>
            </div>
        </div>
    </div>
    <div class="col-xs-12 margin-top-10" style="overflow-x:auto;">
        <table class="table resume-order-table">
            <thead>
            <tr>
                <th scope="col" class="group-name-th th-border-right min-width-40"></th>
                <th scope="col" class="text-color-purple">Layanan</th>
                <th scope="col" class="text-color-purple">Jatuh Tempo</th>
                <th scope="col" class="text-color-purple">Harga</th>
                <th scope="col" class="text-color-purple">Status</th>
                <th scope="col" class="text-color-purple">Manage</th>
            </tr>
            </thead>
            <tbody>
            {foreach from=$resume_order item=item key=key}
                {if $item.type eq 'hosting'}
                    <tr>
                        <td class="group-name-th th-border-right min-width-40 text-color-grey padding-10 padding-top-15">{$item.groupname}</td>
                        <td class="padding-10">
                            <p class="p-title-name margin-0">{$item.name}</p>
                            <p class="p-sub-name margin-0">{$item.domain}</p>
                        </td>
                        <td class="padding-10 padding-top-15">{$item.nextduedate}</td>
                        <td class="padding-10">
                            <p class="p-amount margin-0">Rp {$item.amount}</p>
                            <p class="p-amount-for margin-0">{$item.durations}</p>
                        </td>
                        {if $item.status eq 'Active'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-active">
                                    </div>
                                    <p class="text-status">Aktif</p>
                                </div>
                            </td>
                        {elseif $item.status eq 'Pending'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-pending">
                                    </div>
                                    <p class="text-status">Pending</p>
                                </div>
                            </td>
                        {elseif $item.status eq 'Terminated'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-terminate">
                                    </div>
                                    <p class="text-status">Terminated</p>
                                </div>
                            </td>
                        {/if}
                        <td class="padding-10 padding-top-15">
                            <button type="button" class="btn cover-outline-orange kelola-url-text" id="submit" onclick="window.open('{$WEB_ROOT}/clientarea.php?action=productdetails&id={$item.id}')">
                                <i class="fa fa-angle-right"></i> Kelola
                            </button>
                        </td>

                    </tr>
                {elseif $item.type eq 'domain'}
                    <tr>
                        <td class="group-name-th th-border-right min-width-40 text-color-grey padding-10 padding-top-15">{$item.groupname}</td>
                        <td class="padding-10 padding-top-15">{$item.domain}</td>
                        <td class="padding-10 padding-top-15">{$item.nextduedate}</td>
                        <td class="padding-10 padding-top-15 p-amount">Rp {$item.amount}</td>
                        {if $item.status eq 'Active'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-active">
                                    </div>
                                    <p class="text-status">Aktif</p>
                                </div>
                            </td>
                        {elseif $item.status eq 'Pending'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-pending">
                                    </div>
                                    <p class="text-status">Pending</p>
                                </div>
                            </td>
                        {elseif $item.status eq 'Terminated'}
                            <td class="padding-10 padding-top-15">
                                <div class="cover-status">
                                    <div class="cirle-status-terminate">
                                    </div>
                                    <p class="text-status">Terminated</p>
                                </div>
                            </td>
                        {/if}
                        <td class="padding-10 padding-top-15">
                            <button type="button" class="btn cover-outline-orange kelola-url-text" id="submit" onclick="window.open('{$WEB_ROOT}/clientarea.php?action=domaindetails&id={$item.id}')">
                                <i class="fa fa-angle-right"></i> Kelola
                            </button>
                        </td>
                    </tr>
                {/if}
            {/foreach}
            </tbody>
        </table>
    </div>
</div>

<script type="text/javascript" src="{$WEB_ROOT}/modules/addons/beon_order/templates/assets/js/resume-order.js"></script>
<script type="text/javascript">
    BeonCustomResumeOrder();
</script>