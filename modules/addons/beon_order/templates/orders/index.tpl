


<link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@clr/icons@4.0.7/clr-icons.min.css"
/>
<link rel="stylesheet" href="/modules/addons/beon_order/templates/assets/libs/ion-rangeslider/css/ion.rangeSlider.min.css">
<link rel="stylesheet" href="/modules/addons/beon_order/templates/assets/css/style.css?v={$versionHash}">
<link rel="stylesheet" href="/modules/addons/beon_order/templates/assets/css/new-order.css?v={$versionHash}">

{if !$loggedin}
    <!-- Start of LiveChat (www.livechatinc.com) code -->
    <script type="text/javascript">
        {literal}
        window.__lc = window.__lc || {};
        window.__lc.license = 4237031;
        __lc.group = 3;
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
        {/literal}
    </script>
    <noscript>
        <a href="https://www.livechatinc.com/chat-with/4237031/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
    <!-- End of LiveChat code -->
{/if}

<div id="order-main-content">

</div>

<div id="save-form-personal" style="display: none">
    <div id="completion-form-container" style="display: none;">
        <div class="row completion-wrapper" id="completion-form-wrapper">
        <div class="col-md-12">
            <form id="completion-form" method="POST" action="">
                <input type="hidden" name="usewa" value="1">
                <input type="hidden" name="accounttype" value="Personal">
                <div class="form-group">
                    <label for="inputPhone">Nomor Telepon</label>
                    <p><small><strong>TIPS:</strong> Gunakan nomor whatsapp untuk mendapatkan update langsung melalui pesan whatsapp-mu.</small></p>
                    <input class="form-control" type="number" name="phone" required maxlength="12" minlength="7" data-toggle="tooltip"
                           data-placement="bottom"
                           data-trigger="manual"
                           title=""
                           data-original-title="Nomor tidak boleh kurang dari 6 digit"
                           oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    >
                </div>
                <div class="form-group">
                    <p>Apakah kamu menggunakan nomor tersebut untuk WhatsApp?</p>
                    <div class="row">
                        <div class="col-md-6">
                            <a class="btn btn-block btn-default wa-selector selected" href="#" data-value="1">
                                Ya
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a class="btn btn-block btn-default wa-selector" href="#" data-value="0">
                                Tidak
                            </a>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <p>Tipe Akun</p>
                    <div class="row">
                        <div class="col-md-6">
                            <a class="btn btn-block btn-default selected account-selector" href="#" data-value="Personal">
                                Personal
                            </a>
                        </div>
                        <div class="col-md-6">
                            <a class="btn btn-block btn-default account-selector" href="#" data-value="Instansi">
                                Instansi
                            </a>
                        </div>
                    </div>
                </div>
                <div class="form-group profession-control account-type" data-type="Personal">
                    <select name="profession" class="form-control">
                        <option disabled selected value>Pilih Professi</option>
                        <option value="Front End Developer">Front End Developer</option>
                        <option value="Back End Developer">Back End Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="IT Administrator">IT Administrator</option>
                        <option value="Pemilik Bisnis">Pemilik Bisnis</option>
                        <option value="Freelancer Programmer">Freelancer Programmer</option>
                        <option value="Pelajar / Mahasiswa">Pelajar / Mahasiswa</option>
                        <option value="more">Lainnya</option>
                    </select>
                </div>
                <div class="form-group profession-input hidden account-type">
                    <input class="form-control" name="profession-input" placeholder="Masukkan profesimu">
                </div>
                <div class="form-group instansi-control hidden account-type" data-type="Instansi">
                    <select name="instansi-category" class="form-control">
                        <option disabled selected value>Kategori Instansi</option>
                        <option value="Pemerintah">Pemerintah</option>
                        <option value="Nirlaba">Nirlaba</option>
                        <option value="Bank & Keuangan">Bank & Keuangan</option>
                        <option value="Kesehatan">Kesehatan</option>
                        <option value="Media & Hiburan">Media & Hiburan</option>
                        <option value="Otomotif">Otomotif</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Biro Perjalanan">Biro Perjalanan</option>
                        <option value="Pariwisata">Pariwisata</option>
                        <option value="Makanan & Minuman">Makanan & Minuman</option>
                        <option value="more">Lainnya</option>
                    </select>
                </div>
                <div class="form-group instansi-name hidden account-type">
                    <input class="form-control" name="instansi-category-input" placeholder="Masukkan nama kategori">
                </div>
                <div class="form-group instansi-name hidden account-type" data-type="Instansi">
                    <input class="form-control" name="instansi-name" placeholder="Masukkan nama instansimu">
                </div>
                <div class="form-group">
                    <button class="btn btn-block btn-fill-primary disabled" disabled type="submit"> Selanjutnya </button>
                </div>

                <div class="flex justify-space-between align-items-center">
                    <div class="progress w-100">
                        <div class="progress-bar primary-progressbar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:66%">
                        </div>
                    </div>
                    <div>
                        <strong>2/3</strong>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </div>
</div>
<script type="text/javascript">
    window.__orderconfigs = {{$orderconfigs}};
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@clr/icons@4.0.7/clr-icons.min.js"></script>
<script type="text/javascript" src="/modules/servers/jhcloudvps/assets/sweetalert/sweetalert2.all.min.js"></script>
<script type="text/javascript" src="/modules/addons/beon_order/templates/assets/libs/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
{* <script type="text/javascript" src="/modules/addons/beon_order/templates/assets/js/beon_order.js?v={$versionHash}"></script> *}
{literal}
<script type="text/javascript">
    var versionUpdate = (new Date()).getTime();  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "/modules/addons/beon_order/templates/assets/js/beon_order.js?v=" + versionUpdate;  
    document.body.appendChild(script); 
</script>
{/literal}