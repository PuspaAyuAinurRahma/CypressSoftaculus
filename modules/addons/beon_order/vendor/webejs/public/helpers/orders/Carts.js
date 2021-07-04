var Orderconfigs = require(__dirname + "/../../config/const.js");
var ApiHelper  = require(__dirname + "/../../helpers/api/api.js");
var PaymentSDK      = require(__dirname+"/../../helpers/orders/Payments.js");
var __layouts = {
    wrapper: require("ejs!" + __dirname + "/../../layouts/carts/main.ejs"),
    emptyCart: require("ejs!" + __dirname + "/../../layouts/carts/empty-cart.ejs"),
    normalCart: require("ejs!" + __dirname + "/../../layouts/carts/normal-cart.ejs"),
    loadingCart: require("ejs!" + __dirname + "/../../layouts/carts/loading-cart.ejs"),
    hostingItem: require("ejs!" + __dirname + "/../../layouts/carts/hostingItem.ejs"),
    domainItem: require("ejs!" + __dirname + "/../../layouts/carts/domainItem.ejs"),
    inputKupon: require("ejs!" + __dirname + "/../../layouts/carts/input_kupon.ejs"),
    promoItem: require("ejs!" + __dirname + "/../../layouts/carts/promoItem.ejs"),
    buttonGunakanPromo: require("ejs!" + __dirname + "/../../layouts/carts/button_gunakan_promo.ejs"),
    promoModal: require("ejs!" + __dirname + "/../../layouts/carts/promomodal.ejs"),
    gantiKupon: require("ejs!" + __dirname + "/../../layouts/carts/ganti_kupon.ejs"),
    inputTextKupon: require("ejs!" + __dirname + "/../../layouts/carts/input_text_kupon.ejs"),
    sectionListPromo: require("ejs!" + __dirname + "/../../layouts/carts/section_list_promo.ejs"),
};

var CartsSDK = {
    initiate: function () {
        CartsSDK.render.cartPanel()
    },
    render: {
        cartPanel: function () {
            $("#cart-summary-wrapper").html(__layouts.loadingCart)

            setTimeout(function () {
                $("#cart-summary-wrapper").html(__layouts.wrapper)
                    .promise()
                    .then(function () {
                        var hasCart = CartsSDK.events.hasCart()

                        if(hasCart) {
                            CartsSDK.render.renderNormalCart()
                        } else {
                            CartsSDK.render.renderEmptyCart()
                        }

                        CartsSDK.utils.floatingCart();
                    });
                CartsSDK.events.checkout();
                CartsSDK.events.gunakanKupon();
            }, 500);

        },
        renderNormalCart: function () {
            var services = CartsSDK.events.getCart()
            var promo    = CartsSDK.utils.getPromo(services)
            var subtotal = CartsSDK.utils.getSubTotal(services, promo)
            var ppn      = (10/100) * subtotal.subtotal
            var total    = subtotal.subtotal + ppn
            var gimmicktotal = CartsSDK.utils.sumGimmickTotal(subtotal, services);
            // console.log("Gimmick Total:"+gimmicktotal);

            $(".cart-summary-wrapper").html(__layouts.normalCart({
                subtotal: subtotal.subtotal,
                ppn: ppn,
                total: total,
                utils: CartsSDK.utils,
                gimmicktotal: gimmicktotal
            })).promise()
                .then(function () {

                    CartsSDK.render.renderInputKupon()
                    services.forEach(function (data, index) {
                        if (data.type == "products" && data.crosssaleparent == 0) {
                            var cekDomain = CartsSDK.events.getCartFilterDomainOnly()
                            var element = $('#order-body #order-forms-wrapper #panel'+index)
                            var pid = element.attr('data-pid')
                            var useDomainOnly = Orderconfigs.use_domain_only.find(val => val == pid)

                            if (cekDomain > 0) {
                                if (!data.hasOwnProperty('domain')) {
                                    element.find('.gunakan_domain_dari_cart').removeClass('hidden')
                                }
                                if (data.hasOwnProperty('domain')) {
                                    element.find('.gunakan_domain_dari_cart').addClass('hidden')
                                }
                                if (useDomainOnly) {
                                    element.find('.gunakan_domain_dari_cart').addClass('hidden')
                                }
                            }else{
                                element.find('.gunakan_domain_dari_cart').addClass('hidden')
                            }

                            var crossSales = []; //for master cross sales
                            services.forEach(function (item) {
                                if (data.pid == item.crosssaleparent) {
                                    crossSales.push(item)
                                }
                            })
                            CartsSDK.render.hostingItems(data, index, crossSales)
                        }

                        if (data.type == "domains") {
                            CartsSDK.render.domainItems(data, index)
                        }

                        if (data.type == "promo") {
                            CartsSDK.render.promoItems(promo, subtotal.pidPromo, subtotal.countPromoApplied, index)
                            CartsSDK.render.renderInputKupon(promo, index)
                            $(".cart-summary-wrapper").find('.item.show-promo').removeClass('hidden')
                        }
                        CartsSDK.events.scrollToPanel(index)
                    })
                    var ServicesSDK = require(__dirname+"/Services.js");
                    ServicesSDK.events.removeProductInCart();

                    var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
                    LoginSDK.checkLogin(function (isloggedin) {
                        if(!isloggedin){
                            CartsSDK.render.renderBtnGunakanPromo()
                        }
                    })
                })
        },
        renderEmptyCart: function () {
            $(".cart-summary-wrapper").html(__layouts.emptyCart)
        },
        renderBtnGunakanPromo: function () {
            $(".cart-summary-wrapper .input-promo").html(__layouts.buttonGunakanPromo)
        },
        renderInputKupon: function (item = 0, index = 0) {
            var kupon = ""
            if (item !== 0) {
                kupon = item.name
                $(".cart-summary-wrapper").find('.input-promo').addClass('hidden')
                $(".cart-summary-wrapper").find('.ganti-promo').html(__layouts.gantiKupon())
            }

            var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
            LoginSDK.checkLogin(function (isloggedin) {
                if(!isloggedin){
                    CartsSDK.render.renderBtnGunakanPromo()
                    CartsSDK.events.showModalPromo();
                    CartsSDK.events.removePromo(index)
                }else{
                    CartsSDK.utils.getAvailablePromo(function(response){
                        var total = response.total_promo_personal + response.total_promo_general
                        $(".cart-summary-wrapper").find('.input-promo').html(__layouts.inputKupon({
                            totalKupon: total
                        })).promise().then(function () {
                            CartsSDK.events.showModalPromo();
                            CartsSDK.events.removePromo(index)
                            if (item !== 0) {
                                var input = $("#cart-summary-wrapper input[name='kupon']")
                                input.val(kupon)
                                input.attr('disabled', 'disabled')
                                $('#cart-summary-wrapper button[name="cek-kupon"]').addClass('hidden')
                                $('#cart-summary-wrapper button#hapus-kupon').removeClass('hidden')
                            }
                        })
                    },false);
                }
            })
        },
        hostingItems: function (item, index, masterCrossSales = []) {
            var dataDomain = {};
            var price = 0;
            var totalMail = 0;
            var template = {};

            if (item.pricing_type == "product") {
                // var configQty = (item.configoptions.length > 0) ? item.configoptions[0].selectedqty : 1;

                // var total = parseInt(item.price) * parseInt(configQty)
                var total = parseInt(item.price)

                price += total

                // For VPS X
                var vpsx_id = Orderconfigs.vps_x;
                var search = vpsx_id.find(function (value) {
                    return value == item.pid
                })

                if (search) {
                    template = item.template
                }
            }

            dataDomain.strike_price = 0;
            // Domain
            if (item.hasOwnProperty("domain")) {
                if (item.domain.hasOwnProperty("price")) {
                    dataDomain.name = item.domain.name
                    dataDomain.billingcycle = item.domain.billingcycle + " tahun"
                    dataDomain.price = CartsSDK.utils.changeToRupiah(parseInt(item.domain.price),true)
                    dataDomain.type = item.domain.type
                    if(item.domain.price==0){
                        dataDomain.strike_price = CartsSDK.utils.changeToRupiah(parseInt(item.domain.actualprice));
                    }

                    if (item.domain.hasOwnProperty("strike_price") && item.domain.strike_price !== 0) {
                        dataDomain.strike_price = CartsSDK.utils.changeToRupiah(item.domain.strike_price);
                    }

                } else {
                    dataDomain.name = item.domain.name
                    dataDomain.billingcycle = ""
                    dataDomain.price = ""
                    dataDomain.type = item.domain.type
                }
            }

            // Confgoption price
            var configoptions = [];
            if (item.hasOwnProperty("configoptions")) {
                if(Array.isArray(item.configoptions)){
                    item.configoptions.forEach(function (item) {
                        if(item.selectedqty>0){
                            item.price = CartsSDK.utils.changeToRupiah(item.price);
                            configoptions.push(item);
                        }
                    })
                }
            }

            // Cross sale
            let cross_sale = {}
            if ("cross_sale" in item) {
                cross_sale = item.cross_sale
            }

            /*Custom Fields Item*/
            var customfields = [];
            if(item.hasOwnProperty('customfields')){
                item.customfields.forEach(function (item){
                    if(item.hasOwnProperty('value') && (item.value != "None" && item.value != "")){
                        customfields.push(item);
                    }
                });
            }



            /*Strike Price Gimmick*/
            var strike_price = 0;
            if(Orderconfigs.product_gimmickprice[item.pid]){
                Orderconfigs.product_gimmickprice[item.pid].forEach(strikeprice=>{
                    if(
                        strikeprice.billingcycle == item.billingcycle &&
                        strikeprice.strike_price !=null
                    ){
                        strike_price = CartsSDK.utils.changeToRupiah(strikeprice.strike_price);
                    }
                });
            }

            $("#item-cart").append(__layouts.hostingItem({
                index: index,
                groupname: item.groupname,
                name: item.name,
                pid: item.pid,
                billingcycle: CartsSDK.utils.changeFormatBilling(item.billingcycle),
                price: CartsSDK.utils.changeToRupiah(price),
                dataDomain: dataDomain,
                template: template,
                totalMail: totalMail,
                customfields: customfields,
                configoptions: configoptions,
                cross_sale: cross_sale,
                strike_price: strike_price,
                master_cross_sales: masterCrossSales,
                utils: CartsSDK.utils
            }))
        },
        domainItems: function (item, index) {
            var strike_price = 0;
            if(item.strike_price!=0) strike_price = CartsSDK.utils.changeToRupiah(item.strike_price);
            $("#item-cart").append(__layouts.domainItem({
                index: index,
                name: item.domain,
                billingcycle: item.billingcycle,
                price: CartsSDK.utils.changeToRupiah(item.price),
                type: item.domaintype,
                strike_price: strike_price
            }))
        },
        promoItems: function (item, nominalPidPromo, countPromoUsed, index) {
            var codeStatus = localStorage.getItem("codeStatus");
            if (codeStatus) {
                codeStatus = atob(codeStatus)
                $("#cart-summary-wrapper .show-promo").html(__layouts.promoItem({
                    index: index,
                    name: item.name,
                    type_promo: item.type_promo,
                    price: item.price,
                    nominalPidPromo: nominalPidPromo,
                    utils: CartsSDK.utils,
                    percentage: item.percentage,
                    countPromoUsed: countPromoUsed,
                    codeStatus: codeStatus
                }))
            }
            else {
                $("#cart-summary-wrapper .show-promo").html(__layouts.promoItem({
                    index: index,
                    name: item.name,
                    type_promo: item.type_promo,
                    price: item.price,
                    nominalPidPromo: nominalPidPromo,
                    utils: CartsSDK.utils,
                    percentage: item.percentage,
                    countPromoUsed: countPromoUsed,
                    codeStatus: 'Safe'
                }))
            }
        },
        renderPromoModal: function () {
            if($('#promo-modals').length){
                $('#promo-modals').modal('show');
            }else{
                $('#order-content').append(__layouts.promoModal({
                })).promise().then(function () {
                    $('#promo-modals').modal('show');
                });
            }

            $('#promo-modals').find('button[name="submit"]').attr('disabled', true);
        },
        renderSectionListPromo: function () {
            $('#section-list-promo').html('');
            var checkPromoExist     = CartsSDK.events.checkPromoExists();
            var code = '';
            var promoId = '';
            if(checkPromoExist){
                code = checkPromoExist.item['code'];
                promoId = checkPromoExist.item['id'];
            }
            CartsSDK.utils.getAvailablePromo(function(response){
                response.promo_personal = CartsSDK.utils.formatListPromo(response.promo_personal)
                response.promo_general = CartsSDK.utils.formatListPromo(response.promo_general)
                $('#section-list-promo').html(__layouts.sectionListPromo({
                    dataGeneralPromo: response,
                    promoId: promoId,
                    code: code
                })).promise().then(function () {
                    CartsSDK.events.cekKupon();
                    CartsSDK.events.btnOnlyRemovePromoCode();
                    CartsSDK.events.btnUsePromoByItem();
                    CartsSDK.events.actionOpenSectionPromo();
                    CartsSDK.events.actionOpenVoucherDetail();
                });
            })
        },
    },
    events: {
         log_ls_cart: function(func = 'not defined'){
            let temp_cart = localStorage.getItem("cart")
            let decode_cart = atob(temp_cart)
            return JSON.parse(decode_cart)
         },

        initiateProduct: function () {
            var currentpath = Orderconfigs.urlvars.paths[2];

            if (currentpath != 'products') {
                return
            }

            var pid         = Orderconfigs.urlvars.paths[3];

            if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
                return;
            }

            var hasCart = CartsSDK.events.hasCart()
            var hasDuplicateProduct = CartsSDK.events.hasDuplicateProduct(pid)

            if (hasCart && hasDuplicateProduct) {
                return;
            }

            CartsSDK.events.addProduct(
                pid,null,
                Orderconfigs.default_configurations.configoptions,
                Orderconfigs.default_configurations.billingcycle,
                Orderconfigs.default_configurations.customfields
            );
        },
        jsonChecker: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        getCart: function () {
            var cart = localStorage.getItem("cart")

            if(cart) {
                let jsonCart = atob(cart)
                let current_time = new Date().getTime()
                let parsed_cart = JSON.parse(jsonCart)

                cart = (current_time > parsed_cart.expiry) ? null : cart
            }

            if (cart == null) {
                var now = new Date()
                var ttl = Orderconfigs.ttl
                var result = {
                    data: {},
                    expiry: now.getTime() + (parseInt(ttl)* 60 * 1000)
                }

                result.data = []
                cart = localStorage.setItem("cart", btoa(JSON.stringify(result)))
                cart = localStorage.getItem("cart")

                let pid = Orderconfigs.urlvars.paths[3];
                CartsSDK.events.addProduct(
                     pid, null,
                     Orderconfigs.default_configurations.configoptions,
                     Orderconfigs.default_configurations.billingcycle,
                     Orderconfigs.default_configurations.customfields
                 );
            }

            cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }

            var jsonCart = JSON.parse(cart)
            return jsonCart.data
        },
        getCartByIndex: function (index) {
            var cart = localStorage.getItem("cart");
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart);

            return jsonCart.data[index];
        },
        getCartFilterDomainOnly: function () {
            var cart = CartsSDK.events.getCart()
            var countDomain = 0

            cart.forEach(function (data, index) {
                if (data.type == "domains") {
                    countDomain += 1;
                }
            })

            return countDomain
        },
        getCartDomain: function () {
            var cart = localStorage.getItem("cart")

            var now = new Date()
            var ttl = Orderconfigs.ttl
            var result = {
                data: {},
                expiry: now.getTime() + (parseInt(ttl)* 60 * 1000)
            }

            if (!cart) {
                result.data = []
                cart = localStorage.setItem("cart", btoa(JSON.stringify(result)))
                cart = atob(cart)
                return cart
            }else{
                var checker = CartsSDK.events.jsonChecker(cart);
                if (checker === false) {
                    cart = atob(cart)
                    cart = localStorage.setItem("cart", btoa(cart))
                    cart = localStorage.getItem("cart")
                    cart = atob(cart)
                }
                var jsonCart = JSON.parse(cart)

                return jsonCart.data
            }

        },
        getPromoOnCart: function () {
            var cart = CartsSDK.events.getCart()
            var result = false;
            cart.forEach(function (data, index) {
                if (data.type == "promo") {
                    result = index;
                }
            })

            return result
        },
        hasCart: function () {
            var cart = localStorage.getItem("cart")
            if (!cart) {
                return false
            }

            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }

            var jsonCart = JSON.parse(cart)
            if (!jsonCart.data.length) {
                return false
            }

            return true
        },
        hasDuplicateProduct: function(pid) {
            var cart = localStorage.getItem("cart")

            if (!cart) {
                return false
            }

            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            for (service in jsonCart.data) {
                if (jsonCart.data[service].type == "products" && jsonCart.data[service].pid == pid) {
                    CartsSDK.events.extendExpiry(jsonCart);
                    return true
                }
            }
        },
        addProduct: function (pid, index = null, defaultconfigoptions=[], default_billing="", default_customfields="", crosssaleParent = 0) {
            // VPS X
            var vpsx_id = Orderconfigs.vps_x;
            var search = vpsx_id.find(function (value) {
                return value == pid
            })

            if (search) {
                CartsSDK.vpsx_events.addProduct(pid, index, default_billing, crosssaleParent)
                return;
            }

            var products = Orderconfigs.products;
            var productInGroup = Orderconfigs.product_in_group;
            var productGroups = Orderconfigs.product_groups;
            var pricingType = "product";

            if (products[pid] && !products[pid].product_pricing) {
                pricingType = "config";
            }

            var product = {
                "type": "products",
                "pid": pid,
                "groupname": "",
                "gid": 0,
                "name": products[pid].details.name,
                "billingcycle": "",
                "price": "",
                "pricing_type": pricingType,
                "configoptions": [],
                "customfields": [],
                "minimize": false,
                "crosssaleparent": crosssaleParent
            }

            var getBilling = CartsSDK.events.getBilling(pid, default_billing)

            product.billingcycle = getBilling.billingcycle
            product.price = getBilling.price

            for (gid in productInGroup) {
                productInGroup[gid].find(function (element) {
                    if (element == pid) {
                        product.gid = gid
                    }
                })
            }
            product.groupname = productGroups[product.gid];


            // Configoptions
            var getConfigOptions = CartsSDK.events.getConfigOptions(pid, getBilling.billingcycle, defaultconfigoptions);
            if (getConfigOptions.length > 0) {
                product.configoptions = getConfigOptions
            }

            // Customfields
            var getCustomfield = CartsSDK.events.getCustomFields(pid);
            if (getCustomfield.length > 0) {
                product.customfields = getCustomfield
            }

            var cart = localStorage.getItem("cart")

            var now = new Date()
            var ttl = Orderconfigs.ttl

            var result = {
                data: {},
                expiry: now.getTime() + (parseInt(ttl)* 60 * 1000)
            }

            if (!cart) {
                result.data = [product];
                localStorage.setItem("cart", btoa(JSON.stringify(result)))

            } else {
                var checker = CartsSDK.events.jsonChecker(cart);
                if (checker === false) {
                    cart = atob(cart)
                    cart = localStorage.setItem("cart", btoa(cart))
                    cart = localStorage.getItem("cart")
                    cart = atob(cart)
                }
                var jsonCart = JSON.parse(cart)

                if (index != null) {
                    jsonCart.data[index] = product
                } else {
                    jsonCart.data.push(product)
                }
                localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            }

            CartsSDK.render.cartPanel()
        },
        addDomainForService: function(index, domainName, type, billingcycle = 0, price = "", actualprice="", epp = "", pricetrough=0) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            switch(type) {
                case "use":
                    var domain = {
                        type: type,
                        name: domainName,
                    }
                    break;

                case "register":
                    var numbPrice = CartsSDK.utils.onlyGetNumber(price)

                    var domain = {
                        type: type,
                        name: domainName,
                        billingcycle: billingcycle,
                        price: numbPrice,
                        actualprice: CartsSDK.utils.onlyGetNumber(actualprice),
                        strike_price: pricetrough
                    }
                    break;

                case "transfer":
                    var numbPrice = CartsSDK.utils.onlyGetNumber(price)

                    var domain = {
                        type: type,
                        name: domainName,
                        billingcycle: 1,
                        price: numbPrice,
                        epp: epp,
                        actualprice: CartsSDK.utils.onlyGetNumber(actualprice),
                        strike_price: pricetrough
                    }
                    break;
            }

            if (!jsonCart.data[index].hasOwnProperty('domain')) {
                jsonCart.data[index].domain = domain
            }else{
                if (type == "register" ||type == "transfer" || type == "use") {
                    jsonCart.data[index].domain = domain
                }
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)));
            CartsSDK.events.calculateFreeDomain(index);
            CartsSDK.render.cartPanel()
        },

        addDomainSuggestedForService: function (domainName, domaintype, billingcycle = 0, price = "", tld = "", index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            var numbPrice = CartsSDK.utils.onlyGetNumber(price)

            var domain = {
                type: "register",
                name: domainName,
                billingcycle: billingcycle,
                price: numbPrice,
                actualprice:numbPrice
            }
            var objDomain = {
                type:"domains",
                domain: domainName,
                domaintype: domaintype,
                price: numbPrice,
                billingcycle: billingcycle,
                tld: tld,
                minimize: false,
                actualprice: numbPrice
            }

            var findDomain = CartsSDK.events.findDomainInProductIndex(index)
            if (findDomain) {
                jsonCart.data[findDomain].domain = domain
            }else{
                jsonCart.data.push(objDomain)

            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            if(findDomain){
                CartsSDK.events.calculateFreeDomain(findDomain);
            }


            CartsSDK.render.cartPanel()

        },
        addDomainOnly: function(domainName, domaintype, billingcycle = 0, price = "", epp = "", tld = "", pricetrough=0) {
            var cart = localStorage.getItem("cart")
            var numbPrice = CartsSDK.utils.onlyGetNumber(price)
            switch(domaintype) {
                case "register":
                    var objDomain = {
                        type:"domains",
                        domain: domainName,
                        domaintype: domaintype,
                        price: numbPrice,
                        billingcycle: billingcycle,
                        tld: tld,
                        minimize: false,
                        actualprice: numbPrice,
                        strike_price: pricetrough
                    }
                    break;

                case "transfer":
                    var objDomain = {
                        type:"domains",
                        domain: domainName,
                        domaintype: domaintype,
                        price: numbPrice,
                        billingcycle: 1,
                        tld: tld,
                        epp: epp,
                        minimize: false,
                        actualprice: numbPrice,
                        strike_price: pricetrough
                    }
                    break;
            }
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data.push(objDomain)

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()

            return objDomain
        },
        changeBillingcycleDomainRegister: function(type, domainName, billingcycle, price, tld = "", index, pricetrough=0) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var numbPrice = CartsSDK.utils.onlyGetNumber(price)
            var domain = {
                type: "register",
                name: domainName,
                billingcycle: billingcycle,
                price: numbPrice,
                actualprice: numbPrice,
                strike_price: pricetrough
            }
            var objDomain = {
                type: "domains",
                domain: domainName,
                domaintype: "register",
                price: numbPrice,
                billingcycle: billingcycle,
                tld: tld,
                actualprice: numbPrice,
                strike_price: pricetrough
            }

            switch(type) {
                case "product":
                    var findDomain = CartsSDK.events.findDomainInProduct(index, domainName)

                    if (findDomain) {
                        jsonCart.data[index].domain = domain
                    }

                    var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domainName);
                    if (findDomainInListReturnIndex) {
                        jsonCart.data[findDomainInListReturnIndex] = objDomain
                    }
                    break;
                case "domain":
                    var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domainName);
                    if (findDomainInListReturnIndex) {
                        jsonCart.data[findDomainInListReturnIndex] = objDomain
                    }

                    break;
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)));
            CartsSDK.render.cartPanel()

        },
        changeBillingcycleDomainFindByName: function(type, domainName, billingcycle, price, tld = "", index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var numbPrice = CartsSDK.utils.onlyGetNumber(price)

            var findDomain = CartsSDK.events.findDomainInProduct(index, domainName)
            if (findDomain) {
                var domain = {
                    type: "register",
                    name: domainName,
                    billingcycle: billingcycle,
                    price: numbPrice
                }

                jsonCart.data[index].domain = domain
            }

            var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domainName);
            if (findDomainInListReturnIndex) {
                var objDomain = {
                    type: "domains",
                    domain: domainName,
                    domaintype: "register",
                    price: numbPrice,
                    billingcycle: billingcycle,
                    tld: tld
                }

                jsonCart.data[findDomainInListReturnIndex] = objDomain
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel()

        },
        changeBillingCycle: function(index, pid, billingcycle) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var price = Orderconfigs.products[pid].pricing.productpricing[billingcycle]

            if (!Orderconfigs.products[pid].product_pricing) {
                // price = Orderconfigs.products[pid].config_pricing[billingcycle]
                price = 0
            }

            jsonCart.data[index].billingcycle = billingcycle
            jsonCart.data[index].price = price

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            // CHECK DOMAIN CALCULATE
            CartsSDK.events.calculateFreeDomain(index);
            CartsSDK.render.cartPanel()

            // Update configoptions
            var configoptions = jsonCart.data[index].configoptions;
            if (configoptions.length < 1) {
                return
            }
            if(Array.isArray(configoptions)){
                configoptions.forEach(function (configitem){
                    switch (configitem.optiontype) {
                        case "4":
                            var id = configitem.id;
                            var qty =  configitem.selectedqty;
                            CartsSDK.events.updateConfigOptionsType4(index, id, qty)
                    }
                });
            }
        },
        getBilling: function(pid, defaultbilling="annually") {
            let products = Orderconfigs.products[pid]
            var result = {
                "billingcycle": "",
                "price": ""
            }
            if(!products.pricing.productpricing.hasOwnProperty(defaultbilling)){
                defaultbilling = "annually";
            }


            if (products.product_pricing) {
                if (products.pricing.productpricing[defaultbilling] > 0) {
                    result.billingcycle = defaultbilling
                    result.price = products.pricing.productpricing[defaultbilling]
                } else if (products.pricing.productpricing["annually"] > 0){
                    result.billingcycle = "annually"
                    result.price = products.pricing.productpricing.annually
                }else{
                    result.billingcycle = products.pricing.minprice.billingcycle
                    result.price = products.pricing.minprice.price
                }
            } else {
                if(products.config_pricing[defaultbilling] > 0){
                    result.billingcycle = defaultbilling
                    result.price = 0
                }else if (products.config_pricing.annually > 0) {
                    result.billingcycle = "annually"
                    result.price = 0
                } else {
                    result.billingcycle = "monthly"
                    result.price = 0
                }
            }

            return result
        },
        getConfigOptions: function(pid, billingcycle, defaultconfigoptions=[]) {

            var config = Orderconfigs.products[pid].config;

            if (config.length < 1) {
                return [];
            }

            var result = [];

            config.forEach(function (element) {
                switch (element.optiontype) {
                    case "4":
                        var subResult = {}
                        var options = element.options;

                        options.forEach(function (value) {
                            var price = value.all_recuring[billingcycle];
                            var qty = element.selectedqty;
                            defaultconfigoptions.forEach(function (optionitem){
                                if(optionitem.id == element.id && !isNaN(optionitem.value)){
                                    qty = optionitem.value;
                                }
                            });

                            subResult["optiontype"] = element.optiontype;
                            subResult["selectedqty"] = qty;
                            subResult["id"] = element.id;
                            subResult["price"] = price * qty;
                            subResult["is_slider"] = element.is_slider;
                            subResult["optioncode"] = element.optioncode;
                            subResult["optionname"] = element.optionname;
                            subResult["optionlabel"] = element.selectedoption;
                        });

                        result.push(subResult)
                        break
                }
            })

            return result;
        },
        removeProduct: function (index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data.splice(index, 1)

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        updateConfigOptionsType4: function (index, id, newValue) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var configoptions = jsonCart.data[index].configoptions;
            var pid = jsonCart.data[index].pid;
            var product = Orderconfigs.products[pid];
            var billingcycle = jsonCart.data[index].billingcycle;

            var price = 0;

            product.config.forEach(function (configitem, configindex){
                if (configitem.id == id) {
                    var options = configitem.options;
                    price = options[0].all_recuring[billingcycle];
                }
            });


            jsonCart.data[index].configoptions.forEach(function (configitem, configindex){
                if (configitem.id == id) {
                    configoptions[configindex].selectedqty = newValue;
                    configoptions[configindex].price = newValue * price
                }
            });

            jsonCart.data[index].configoptions = configoptions;

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel()
        },
        extendExpiry: function (cart) {
            var now = new Date()
            var ttl = Orderconfigs.ttl

            var newExpiry = now.getTime() + (parseInt(ttl)* 60 * 1000);

            cart.expiry = newExpiry

            localStorage.setItem("cart", btoa(JSON.stringify(cart)))
        },
        removeDomain: function (name) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            for (i in jsonCart.data) {
                if (jsonCart.data[i].domain === name) {
                    jsonCart.data.splice(i, 1)
                }
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        removeDomainWithIndex: function (index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data.splice(index, 1)

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        removeProductDomainWithIndex: function (index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            // jsonCart.data.splice(index, 1)
            delete jsonCart.data[index].domain

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        removeCrossSaleWithParentProduct: function (index, pid) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            CartsSDK.events.log_ls_cart('removeCrossSaleWithParentProduct')

            for (i in jsonCart.data) {
                if (jsonCart.data[i].crosssaleparent == pid && jsonCart.data[i].type != "domains") {
                    jsonCart.data.splice(i, 1)
                }
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        removeProductDomainWithIndexAndName: function (index, name) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var findDomain = CartsSDK.events.findDomainInProduct(index, name)
            if (findDomain) {
                delete jsonCart.data[index].domain
            }

            var findDomainInList = CartsSDK.events.findDomainInCartList(name);
            if (findDomainInList) {
                jsonCart.data.splice(findDomainInList, 1)
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel()
        },
        findDomainInProduct: function (index, name) { /** check domain di layanan & validate domain name, return true/false */
        var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            if (jsonCart.data[index].type === 'products') {
                if (!jsonCart.data[index].domain) {
                    return false
                }
                if (jsonCart.data[index].domain.name === name) {
                    return true
                }
            }

            return false
        },
        isFreeDomain : function(productindex, domainTld){
            var productcart    = CartsSDK.events.getCartByIndex(productindex);
            var productRelated = Orderconfigs.products[productcart.pid].details;
            if(productRelated.freedomain=="on" || productRelated.freedomain=="once"){
                var freedomains = productRelated.freedomaintlds.split(",");
                var cycleterms  = productRelated.freedomainpaymentterms.split(",");
                var is_termvalid = false;
                var is_tldvalid = false;
                freedomains.forEach(function (tld, key) {
                    if(tld==domainTld.trim()){is_tldvalid=true;}
                });
                cycleterms.forEach(function (cycle, key) {
                    if(cycle==productcart.billingcycle){is_termvalid=true}
                });
                if(is_termvalid && is_tldvalid){
                    return true;
                }
            }
            return false;
        },
        calculateFreeDomain: function(productindex){
            var cart = localStorage.getItem("cart");
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart);

            if(("domain" in jsonCart.data[productindex])){
                /*PROC FREE DOMAIN*/
                var domaininproduct = jsonCart.data[productindex].domain;

                if(domaininproduct.type !="use"){
                    var splitDomainName = domaininproduct.name.split(".");
                    var domainTld = '';
                    splitDomainName.forEach(function (item, keydomain) {
                        if(keydomain>0){
                            domainTld +="."+item;
                        }
                    });
                    if(CartsSDK.events.isFreeDomain(productindex, domainTld)){
                        jsonCart.data[productindex].domain.price=0;
                    }else{
                        jsonCart.data[productindex].domain.price=domaininproduct.actualprice;
                    }
                    /*END PROC FREE DOMAIN*/
                }
            }
            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)));
        },

        findDomainInProductIndex: function (index) { /** check domain di layanan & return index*/
        var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            if (!jsonCart.data[index].hasOwnProperty('domain')) {
                return index
            }

            return false
        },
        findDomainInCartList: function (name) { /** check domain di list chart dengan type domains & validate domain name, return index */
        var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            for (i in jsonCart.data) {
                if (jsonCart.data[i].type !== "domains") {
                    continue
                }

                if (jsonCart.data[i].domain === name) {
                    return i
                }
            }

            return false
        },
        findProductDomain: function (index, domain) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            var products = jsonCart.data

            // Exception in same product
            if (products[index].domain && products[index].domain.name == domain) {
                return false
            }

            for (i in products) {
                if (products[i].type != "products") {
                    continue
                }

                if (!products[i].domain) {
                    continue
                }

                if (products[i].domain.name == domain) {
                    return products[i].domain.name
                }
            }

            return false
        },
        getCustomFields: function (pid) {
            var arrCustomfields = [];

            var customfields = Orderconfigs.products[pid].customfields

            // for (index in customfields) {
            //     if (customfields[index].fieldname.includes('IP')) {
            //         customfields[index]["value"] = "";
            //         arrCustomfields.push(customfields[index])
            //     }
            // }

            return customfields
        },
        updateCustomFields: function (index, id, value = "") {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var customfields = jsonCart.data[index].customfields

            for (i in customfields) {
                if (customfields[i].id != id) {
                    continue
                }

                customfields[i].value = value
            }

            jsonCart.data[index].customfields = customfields

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            CartsSDK.render.cartPanel();
        },
        getCustomFieldByIndex: function (index){
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            return jsonCart.data[index].customfields;
        },
        removeCustomfieldValueExept: function (index, id){
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            var customfields = jsonCart.data[index].customfields
            for (i in customfields) {
                if (customfields[i].id != id) {
                    customfields[i].value="";
                }
            }
            jsonCart.data[index].customfields = customfields
            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        changeMinimize: function (index, isMinimize) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data[index].minimize = isMinimize

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
        },
        scrollToPanel: function (index) {
            $(".item[data-type='cart'] .title").off().on('click', function(event) {
                var data_id = $(this).attr('data-attr-scroll');

                $('.panel').each(function() {
                    var el = $(this);

                    if (el.attr('id') == data_id){
                        el.show();

                        var bodyPanel = el.find('.panel-heading-order').next()
                        var minimizeIcon = el.find('.minimize-icon')
                        var maximizeIcon = el.find('.maximize-icon')
                        var minimizePanel = bodyPanel.find('.minimize-panel')
                        var maximizePanel = bodyPanel.find('.maximize-panel')

                        minimizeIcon.removeClass('hidden');
                        maximizeIcon.addClass('hidden')

                        maximizePanel.removeClass('hidden')
                        minimizePanel.addClass('hidden')

                        CartsSDK.events.changeMinimize(index, false)
                    }

                    if (el.attr('id') !== data_id){
                        var bodyPanel = el.find('.panel-heading-order').next()
                        var minimizeIcon = el.find('.minimize-icon')
                        var maximizeIcon = el.find('.maximize-icon')
                        var minimizePanel = bodyPanel.find('.minimize-panel')
                        var maximizePanel = bodyPanel.find('.maximize-panel')

                        minimizeIcon.addClass('hidden');
                        maximizeIcon.removeClass('hidden')

                        maximizePanel.addClass('hidden')
                        minimizePanel.removeClass('hidden')

                        CartsSDK.events.changeMinimize(index, true)
                    }

                });

                $('html, body').animate({
                    scrollTop: $('#' + data_id).offset().top
                }, 'slow');
            })
        },
        checkout: function () {
            $('#cart-summary-wrapper').find('#payment-btn').on('click', function (e) {
                e.preventDefault();
                PaymentSDK.initiate();
                var alert = $('#order-content #login-form ').find('#alert_error')
                alert.addClass('hidden')
                alert.html('')
            });
        },
        gunakanKupon: function () {
            $('#cart-summary-wrapper').find('#gunakan-kupon').on('click', function (e) {
                e.preventDefault();
                var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
                LoginSDK.checkLogin(function (isloggedin) {

                    if(!isloggedin){
                        LoginSDK.renderLoginModal();
                        var alert = $('#order-content #login-form ').find('#alert_error')
                        alert.removeClass('hidden')
                        alert.html('Kamu harus login dulu sob! Baru bisa gunakan kode promo')
                    }else{
                        $('#cart-summary-wrapper #gunakan-kupon').addClass('hidden')
                        CartsSDK.render.renderInputKupon()
                        CartsSDK.events.removePromo()
                    }
                })

            });
        },
        cekKupon: function () {
            $(".form-input-kode-kupon input[name='kupon']").on("keyup", function () {
                var code = $(this).val()
                var button = $(this).parents('.row').find('button[name="cek-kupon"]')
                if (code.length < 4) {
                    button.attr('disabled','disabled');
                    return
                }
                button.removeAttr('disabled')
            })

            $(".form-input-kode-kupon input[name='kupon']").keypress(function (e) {
                var regex = new RegExp("^[a-zA-Z0-9-_]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }

                e.preventDefault();
                return false;
            });

            $('#promo-modals button[name="cek-kupon"]').on('click', function (e) {
                e.preventDefault();
                var parent      = $(this).parents('.row')
                var formInput   = parent.find('input[name="kupon"]')
                var btnHapus    = parent.find('#hapus-kupon')
                var btnGunakan  = $(this)
                var formdata    = formInput.val()
                var spinner     = $(this).find('.fa-spin')
                var sectionInput = $(this).parents('.input-promo') 
                var panel       = $(this).parents('.panel')

                spinner.removeClass('hidden')
                btnGunakan.attr('disabled','disabled');
                var promo = CartsSDK.events.checkPromoExists();
                if (promo) {
                    CartsSDK.events.removeProduct(promo.index);
                }

                ApiHelper.cekPromoCode(formdata, function (response) {
                    if (response.status == 1) {
                        CartsSDK.events.addPromo(response.data)
                        panel.find('.item.show-promo').removeClass('hidden')
                        spinner.addClass('hidden')
                        sectionInput.addClass('hidden')
                        btnHapus.removeClass('hidden')
                        btnGunakan.addClass('hidden')
                        formInput.attr('disabled','disabled');

                        CartsSDK.render.renderSectionListPromo();
                        Swal.fire({
                            title: "Mantap Sob!", 
                            html: "Kode promo berhasil digunakan!", 
                            type: 'success', 
                            confirmButtonText: "Tutup", 
                        })
                        CartsSDK.render.cartPanel()
                        
                    }else{
                        spinner.addClass('hidden')
                        btnGunakan.removeAttr('disabled');
                        Swal.fire({
                            title: "Wadidaw",
                            html: "Kode promo tidak valid, Sob",
                            type: 'warning',
                            confirmButtonText: "Tutup",
                        });
                    }
                })
            });
        },
        addPromo: function (data) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            data.forEach(function (val) {
                jsonCart.data.push(val)
            })
            cart = localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            return cart
        },
        removePromo: function (index) {
            $('#cart-summary-wrapper .remove-promo').on('click', function (e) {
                e.preventDefault();

                Swal.fire({
                    title: "Wadidaw",
                    html: "Kamu yakin menghapus promo ini",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Hapus'
                }).then((result) => {
                    if (result.value) {  
                        CartsSDK.events.removeProduct(index)
                        
                        var parent = $('#cart-summary-wrapper')
                        parent.find('.item.show-promo').addClass('hidden')
                        parent.find('.input-promo').removeClass('hidden')

                        CartsSDK.render.cartPanel()
                    }
                })
            })
        },
        btnOnlyRemovePromoCode: function () {
            $('#hapus-kupon').on('click', function (e) {
                e.preventDefault();
                var promo = CartsSDK.events.checkPromoExists();
                if(promo){
                    Swal.fire({
                        title: "Wadidaw",
                        html: "Kamu yakin menghapus promo ini",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Hapus'
                    }).then((result) => {
                        if (result.value) {
                            CartsSDK.events.removeProduct(promo.index)
                            CartsSDK.render.cartPanel();
                            CartsSDK.render.renderSectionListPromo();
                        }
                    })
                }
            })
        },
        btnUsePromoByItem: function () {
            $('.btn-gunakan-item-kupon').off().on('click', function () {
                var parent = $(this).parents('#section-list-promo');
                var parentList = $(this).parents('.panel-promo')
                var code = parentList.find('input[type="checkbox"]').val();

                var promo = CartsSDK.events.checkPromoExists();
                if(promo){
                    CartsSDK.events.removeProduct(promo.index)
                }
                $(this).attr('disabled', true)
                $('#promo-modals').find('input[name="kupon"]').val(code);
                parent.find('button[name="cek-kupon"]').click();
            });
        },
        removeAllCart: function () {
            window.localStorage.removeItem('cart');
        },
        checkPromoExists: function () {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            if (jsonCart.data.length < 1) {
                return false
            }

            let promo = jsonCart.data.find(o => o.type === 'promo');
            if (!promo) {
                return false
            }

            let index = jsonCart.data.findIndex(o => o.type === 'promo');

            return {
                index: index,
                item: promo
            }
        },
        checkCrossSaleExists: function (pid, crossParentPid) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            if (jsonCart.data.length < 1) {
                return false
            }

            let cross = jsonCart.data.find(o => o.pid === pid && o.crosssaleparent === crossParentPid);
            if (!cross) {
                return false
            }

            let index = jsonCart.data.findIndex(o => o.pid === pid && o.crosssaleparent === crossParentPid);

            return {
                index: index,
                item: cross
            }
        },
        showModalPromo: function () {
            $('#cart-summary-wrapper').find('#show-kupon, #ganti-promo').on('click', function (e) {
                e.preventDefault();
                    var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
                    LoginSDK.checkLogin(function (isloggedin) {
                        if (!isloggedin) {
                            LoginSDK.renderLoginModal();
                            var alert = $('#order-content #login-form ').find('#alert_error')
                            alert.removeClass('hidden')
                            alert.html('Kamu harus login dulu sob! Baru bisa gunakan kode promo')
                        }else {
                            CartsSDK.render.renderPromoModal();
                            CartsSDK.render.renderSectionListPromo();
                        }
                    });
            });
        },
        actionOpenVoucherDetail: function () {
            $('.btn-open-detail-kupon, .btn-close-detail-kupon').on('click', function (e) {
                e.preventDefault()
                const isNegative = $(e.target).closest('.btn-open-detail-kupon').is('.btn-open-detail-kupon');
                var element = $(this)
                var parent = element.parents('.panel-promo');

                if (isNegative) {
                    element.addClass('hidden')
                    parent.find('.btn-close-detail-kupon').removeClass('hidden')
                    parent.find('.detail-promo-content').removeClass('hidden')
                }else{
                    element.addClass('hidden')
                    parent.find('.btn-open-detail-kupon').removeClass('hidden')
                    parent.find('.detail-promo-content').addClass('hidden')
                }
            })
        },
        actionOpenSectionPromo: function () {
            $('.fa-chevron-down, .fa-chevron-up').on('click', function (e) {
                e.preventDefault()
                const isNegative = $(e.target).closest('.fa-chevron-up').is('.fa-chevron-up');
                var element = $(this)
                var parent = element.parents('.promo-code-available');

                if (isNegative) {
                    element.addClass('hidden')
                    parent.find('.fa-chevron-down').removeClass('hidden')
                    parent.find('.list-available-promo').addClass('hidden')
                }else{
                    element.addClass('hidden')
                    parent.find('.fa-chevron-up').removeClass('hidden')
                    parent.find('.list-available-promo').removeClass('hidden')
                }
            })
        },
        insertAddonCrossSale: function (index, id, title, type, billingcycle, pricing, parentCrossSale = null, gid = 0) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            const cross_sale = {
                billingcycle,
                pricing,
                title,
                type
            }

            if ('cross_sale' in jsonCart.data[index]) {
                jsonCart.data[index]['cross_sale'][id] = cross_sale
            } else if (parentCrossSale != null){
                var product = {
                    "type": type,
                    "pid": id,
                    "groupname": "",
                    "gid": gid,
                    "name": title,
                    "billingcycle": billingcycle,
                    "price": pricing,
                    "pricing_type": "product",
                    "configoptions": [],
                    "customfields": [],
                    "minimize": false,
                    "crosssaleparent": parentCrossSale
                }

                jsonCart.data.push(product)
            } else {
                jsonCart.data[index]['cross_sale'] = {
                    [id]: cross_sale
                }
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel()
        },
        deleteAddonCrossSale: function (index, id) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            delete jsonCart.data[index]['cross_sale'][id]

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel()
        },
    },
    vpsx_events: {
        addProduct: function (pid, index = null, default_billing='', crosssaleParent = 0) {
            var products = Orderconfigs.products;
            var productInGroup = Orderconfigs.product_in_group;
            var productGroups = Orderconfigs.product_groups;
            var pricingType = "product";

            var customfieldAppsconfig = products[pid]['customfields'].find(function (value) {
                return value.fieldname == 'apps_config'
            })

            var configImage = products[pid]['config'].find(function (value) {
                return value.optionname.toLowerCase() == 'image'
            })

            var product = {
                "type": "products",
                "pid": pid,
                "groupname": "",
                "gid": 0,
                "name": products[pid].details.name,
                "billingcycle": "",
                "price": "",
                "pricing_type": pricingType,
                "configoptions": [],
                "customfields": [],
                "template": {},
                "credentials": {
                    "hostname": "",
                    "password": ""
                },
                "apps_config_id": customfieldAppsconfig.id,
                "image_id": configImage.id,
                "minimize": false,
                "isShowResume": false,
                "crosssaleparent": crosssaleParent
            }

            // Setup billing and price
            var getBilling = CartsSDK.events.getBilling(pid, default_billing);
            product.billingcycle = getBilling.billingcycle
            product.price = getBilling.price

            // Setup group id
            for (gid in productInGroup) {
                productInGroup[gid].find(function (element) {
                    if (element == pid) {
                        product.gid = gid
                    }
                })
            }
            product.groupname = productGroups[product.gid]

            // Setup config options
            product.configoptions = CartsSDK.vpsx_events.initiateConfigoptions(pid,product.billingcycle)

            var now = new Date()
            var ttl = Orderconfigs.ttl
            var result = {
                data: {},
                expiry: now.getTime() + (parseInt(ttl)* 60 * 1000)
            }

            // Get and then set item
            var cart = localStorage.getItem("cart")
            if (!cart) {
                product = CartsSDK.vpsx_events.getDefaultApps(0,product);
                result.data = [product];
                localStorage.setItem("cart", btoa(JSON.stringify(result)))

            } else {
                var checker = CartsSDK.events.jsonChecker(cart);
                if (checker === false) {
                    cart = atob(cart)
                    cart = localStorage.setItem("cart", btoa(cart))
                    cart = localStorage.getItem("cart")
                    cart = atob(cart)
                }
                var jsonCart = JSON.parse(cart)

                if (index != null) {
                    jsonCart.data[index] = product
                } else {
                    jsonCart.data.push(product)
                }
                localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            }

            CartsSDK.render.cartPanel()
        },
        initiateConfigoptions: function (pid, billingcycle) {
            var configs = {};
            // configs.region = CartsSDK.vpsx_events.getRegion(pid, billingcycle);
            configs.ip_public = CartsSDK.vpsx_events.getIpPublic(pid, billingcycle);

            return configs
        },
        getRegion: function (pid, billingcycle, newValue = null) {
            var configs = Orderconfigs.products[pid].config;
            var region = {}
            var current = {}

            configs.forEach(function (value) {
                if (value.optionname.toLowerCase() != "region") {
                    return
                }

                region.id = value.id
                region.selectedvalue = value.selectedvalue
                current = value

                if (newValue) {
                    region.selectedvalue = newValue
                }
            })

            current.options.forEach(function (value) {
                if (region.selectedvalue != value.id) {
                    return
                }

                region.price = value.all_recuring[billingcycle]
                region.selectedoption = value.name
            })

            return region
        },
        getIpPublic: function(pid, billingcycle, checked = true) {
            var configs = Orderconfigs.products[pid].config;
            var ippublic = {}
            var current = {}

            configs.forEach(function (value) {
                if (value.optionname.toLowerCase() != "ip publik") {
                    return
                }

                ippublic.id = value.id
                ippublic.selectedvalue = value.selectedvalue
                ippublic.optiontype = value.optiontype
                ippublic.selectedqty = 1
                current = value

                if (!checked) {
                    ippublic.selectedvalue = null
                }
            })

            current.options.forEach(function (value) {
                if (ippublic.selectedvalue != value.id) {
                    return
                }

                ippublic.price = value.all_recuring[billingcycle]
                ippublic.selectedoption = value.name
            })

            return ippublic
        },
        changeConfigType1: function (index, idConfig, value) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            var pid = jsonCart.data[index].pid;
            var billingcycle = jsonCart.data[index].billingcycle;

            var configoptions = jsonCart.data[index].configoptions
            var getConfig = {}

            for (i in configoptions) {
                if (configoptions[i].id != idConfig) {
                    continue
                }

                switch (i) {
                    case "region":
                        getConfig = CartsSDK.vpsx_events.getRegion(pid, billingcycle, value)
                        break;
                }

                jsonCart.data[index].configoptions[i] = getConfig
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        changeStatusIpPublic: function (index, value) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)
            var pid = jsonCart.data[index].pid;
            var billingcycle = jsonCart.data[index].billingcycle;

            jsonCart.data[index].configoptions.ip_public = CartsSDK.vpsx_events.getIpPublic(pid, billingcycle, value)

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        changeTemplate: function (index, dataTemplate) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data[index].template = dataTemplate

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        saveConfigurationApps: function (index, data) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data[index].template.config = data
            jsonCart.data[index].template.isComplete = 1

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();

            // Remove alert in credentials
            if (jsonCart.data[index].credentials.hostname.length > 1
                && jsonCart.data[index].credentials.password.length > 1) {
                $("#panel"+index).find('#config-error-'+index).addClass('hidden')
            }
        },
        deleteConfigurationApps: function (index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            delete jsonCart.data[index].template.config

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
        },
        saveCredentials: function(index, type, value) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            switch (type) {
                case "hostname":
                    jsonCart.data[index].credentials.hostname = value
                    break;
                case "password":
                    jsonCart.data[index].credentials.password = value
                    break;
            }

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))

            // Remove alert in credentials and show button
            if (jsonCart.data[index].credentials.hostname.length > 1
                && jsonCart.data[index].credentials.password.length > 1) {

                $("#panel"+index).find('#config-error-'+index).addClass('hidden')
                CartsSDK.vpsx_events.showButton($("#panel"+index), "next-configuration")
            }
        },
        getCartByIndex: function (index) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            return jsonCart.data[index]
        },
        showButton: function (element, buttonName) {
            element.find("button[name='" + buttonName + "']").removeClass('hidden')
        },
        toggleConfigAppsVisibility: function (index, value) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data[index].template.isComplete = value
            
            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        toggleRingkasanConfig: function (index, value) {
            var cart = localStorage.getItem("cart")
            var checker = CartsSDK.events.jsonChecker(cart);
            if (checker === false) {
                cart = atob(cart)
                cart = localStorage.setItem("cart", btoa(cart))
                cart = localStorage.getItem("cart")
                cart = atob(cart)
            }
            var jsonCart = JSON.parse(cart)

            jsonCart.data[index].isShowResume = value

            localStorage.setItem("cart", btoa(JSON.stringify(jsonCart)))
            CartsSDK.render.cartPanel();
        },
        getDefaultApps: function (index, productdata){
            var apps_template = Orderconfigs.default_configurations.apps_template;
            if(apps_template==null){
                return productdata;
            }
            productdata.template = {
                apps: apps_template.apps_name,
                configid:apps_template.configid,
                osName:apps_template.apps_Os,
                type:apps_template.apps_type,
                config:apps_template.config,
                isComplete:1
            }
            productdata.isShowResume=1;
            productdata.credentials = {
                hostname:apps_template.hostname,
                password:apps_template.vps_pwd
            }
            return productdata;
        }
    },
    utils: {
        changeToRupiah: function (money, forDomain = false) {
            if(money==0 && forDomain){
                return '<span class="label label-success text-bold">FREE!</span>';
            }
            var reverse = money.toString().split('').reverse().join(''),
                ribuan = reverse.match(/\d{1,3}/g);

            if (ribuan.length > 1 && ribuan[0].length < 3) {
                ribuan.shift()
            }

            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
        onlyGetNumber: function (txt) {
            if(!isNaN(txt)){
                return txt;
            }
            /*Remove Comma*/
            var separated_text  = txt.split(",");
            var only_texnumb    = separated_text[0];
            var numb = only_texnumb.match(/\d/g);
            numb = numb.join("");
            return numb
        },
        changeFormatBilling: function (billing) {
            switch (billing) {
                case "monthly":
                    return "Satu Bulanan"
                    break
                case "quarterly":
                    return "Tiga Bulanan"
                    break
                case "semiannually":
                    return "Enam Bulanan"
                    break
                case "annually":
                    return "Satu Tahunan"
                    break
                case "biennially":
                    return "Dua Tahunan"
                    break
                case "triennially":
                    return "Tiga Tahunan"
                    break
            }
        },
        getSubTotal: function (cartItems, promo) {
            let subtotal = 0;
            let pidPromo = 0;
            let countPromoApplied = 0;

            let pid = [];
            let itemServiceorDomain = cartItems.filter( item => item.type != 'promo' );
            let sizeService = Object.keys(cartItems).length;
            let tempSizeService = 1;
            let promoCodeService = ''
            let promoCodeDomain = ''
            let requires = ''
            let codeStatus

            if (promo.hasOwnProperty("appliesto") && promo.hasOwnProperty("requires")) {
                if (promo.appliesto !== null && promo.requires !== null) {
                    let appliesto = promo.appliesto
                    let required = promo.requires
                    if (appliesto.hasOwnProperty("domainTld") && required.hasOwnProperty("productId")) {
                        if (promo.appliesto.domainTld.length !== 0 && promo.requires.productId.length !== 0) {
                            requires = true
                            promoCodeService = false
                            promoCodeDomain = false
                        }
                    }
                }
            }

            itemServiceorDomain.forEach(function (item, index) {

                let priceItem = parseInt(item.price);
                let priceSubItem = (item.hasOwnProperty("domain") && item.domain.hasOwnProperty("price")) ? parseInt(item.domain.price) : 0;

                tempSizeService++;
                if (promo && (promo.applyOnce == 0 || (promo.applyOnce == 1 && countPromoApplied < 1))) {
                    if (item.hasOwnProperty("pid") && item.pid !== 0) {
                        pid.push(item.pid);
                    }

                    let applyPromo = CartsSDK.utils.promotionHelper.appendPromoToCartItem(item, promo, pid, cartItems);

                    if (applyPromo.isApplied) {
                        if (promoCodeService === false && item.type === "products" && promoCodeDomain === true) {
                            priceItem = applyPromo.priceAfterPromo;
                            pidPromo += applyPromo.pricePromo;
                            promoCodeService = true
                            countPromoApplied++;
                        }
                        else if (promoCodeService === false && item.type === "products" && promoCodeDomain === false) {
                            promoCodeService = true
                        }
                        else if (promoCodeDomain === false && (item.type === "domains" || item.type === "register") && promoCodeService === true) {
                            priceItem = applyPromo.priceAfterPromo;
                            pidPromo += applyPromo.pricePromo;
                            promoCodeDomain = true
                            countPromoApplied++;
                        }
                        else if (promoCodeDomain === false && (item.type === "domains" || item.type === "register")) {
                            priceItem = applyPromo.priceAfterPromo;
                            pidPromo += applyPromo.pricePromo;
                            promoCodeDomain = true
                        }
                        else {
                            priceItem = applyPromo.priceAfterPromo;
                            pidPromo += applyPromo.pricePromo;
                            countPromoApplied++;
                        }
                    }

                    if (item.hasOwnProperty("domain") && item.domain.hasOwnProperty("price") && (promo.applyOnce == 0 || (promo.applyOnce == 1 && countPromoApplied < 1))) {
                        let subItemDomain = item.domain;
                        subItemDomain.domain = item.domain.name;
                        subItemDomain.domaintype = item.domain.type;

                        let applyPromo = CartsSDK.utils.promotionHelper.appendPromoToCartItem(subItemDomain, promo, pid, cartItems);

                        if (applyPromo.isApplied) {
                            if (promoCodeDomain === false && promoCodeService === true) {
                                promoCodeDomain = true
                                priceSubItem = applyPromo.priceAfterPromo;
                                pidPromo += applyPromo.pricePromo;
                                countPromoApplied++;
                            }
                            if (promoCodeDomain === false && promoCodeService === false) {
                                promoCodeDomain = true
                                priceSubItem = applyPromo.priceAfterPromo;
                                pidPromo += applyPromo.pricePromo;
                            }
                            else {
                                priceSubItem = applyPromo.priceAfterPromo;
                                pidPromo += applyPromo.pricePromo;
                                countPromoApplied++;
                            }
                        }
                    }
                    if (requires === true && promo.applyOnce !== 0) {
                        if (promoCodeDomain && promoCodeService) {
                            pidPromo = parseInt(promo.price)
                        }
                    }
                }

                if (tempSizeService === sizeService) {
                    codeStatus = localStorage.getItem("codeStatus");
                    if (!codeStatus) {
                        if (requires === true) {
                            if (!promoCodeDomain || !promoCodeService) {
                                priceSubItem = 0
                                subtotal = 0
                                priceItem = 0
                                itemServiceorDomain.forEach(function (item2, index) {
                                    priceItem += parseInt(item2.price);
                                    if (item2.hasOwnProperty("domain") && item2.domain.hasOwnProperty("price")) {
                                        priceItem += parseInt(item2.domain.price);
                                    }
                                })
                                codeStatus = 'Error'
                                pidPromo = 0;
                                countPromoApplied = 0;
                            }
                        }
                        else if (pid === 0 || countPromoApplied === 0) {
                            codeStatus = 'Error'
                            pidPromo = 0;
                            countPromoApplied = 0;
                        }
                        else {
                            codeStatus = 'Safe'
                        }
                    }else{
                        codeStatus = atob(codeStatus)
                        if (requires === true) {
                            if (!promoCodeDomain || !promoCodeService) {
                                priceSubItem = 0
                                subtotal = 0
                                priceItem = 0
                                itemServiceorDomain.forEach(function (item2, index) {
                                    priceItem += parseInt(item2.price);
                                    if (item2.hasOwnProperty("domain") && item2.domain.hasOwnProperty("price")) {
                                        priceItem += parseInt(item2.domain.price);
                                    }
                                })
                                codeStatus = 'Error'
                                pidPromo = 0;
                                countPromoApplied = 0;
                            }
                        }
                        else if (pid === 0 || countPromoApplied === 0) {
                            codeStatus = 'Error'
                            pidPromo = 0;
                            countPromoApplied = 0;
                            localStorage.setItem("codeStatus", btoa(codeStatus))
                        }
                        else {
                            codeStatus = 'Safe'
                        }
                    }

                    if (requires === true) {
                        if (promoCodeDomain && promoCodeService) {
                            priceSubItem = 0
                            subtotal = 0
                            priceItem = 0
                            itemServiceorDomain.forEach(function (item2, index) {
                                priceItem += parseInt(item2.price);
                                if (item2.hasOwnProperty("domain") && item2.domain.hasOwnProperty("price")) {
                                    priceItem += parseInt(item2.domain.price);
                                }
                            })
                            priceItem -= pidPromo
                            codeStatus = 'Safe'
                        }
                    }

                    localStorage.setItem("codeStatus", btoa(codeStatus))
                }

                if (requires === true && promo.applyOnce !== 0) {
                    if (promoCodeDomain && promoCodeService) {
                        codeStatus = localStorage.getItem("codeStatus");
                        if (codeStatus !== null) {
                            localStorage.setItem("codeStatus", btoa('Safe'))
                        }
                    }
                }

                subtotal += priceItem + priceSubItem;
                // console.log('priceItem + priceSubItem : '+priceItem+'|'+priceSubItem)

                // Confgoption price - mush be bug
                // if (item.pricing_type == "config") {
                //     item.configoptions.forEach(function (config) {
                //         subtotal += config.price
                //     })
                // }
                // console.log('config : '+subtotal)

                // Confgoption price
                if (item.hasOwnProperty("configoptions")) {
                    if(Array.isArray(item.configoptions)){
                        item.configoptions.forEach(function (config) {
                            subtotal += config.price
                        })
                    }
                }

                // Cross sale
                let cross_sale = {}
                if ("cross_sale" in item) {
                    cross_sale = item.cross_sale
                }

                for (let i in cross_sale) {
                    subtotal += parseInt(cross_sale[i].pricing)
                }

            })

            // subtotal = subtotal - pidPromo;

            return {subtotal, pidPromo, countPromoApplied}
        },
        promotionHelper: {
            appendPromoToCartItem: function (cartItem, promo, pid, cartItems) {

                let isApplied = false;
                let actualPrice = parseInt(cartItem.price);
                let priceAfterPromo = null;
                let pricePromo = null;
                let itemType = (cartItem.type == "products" || cartItem.type == "domains" || cartItem.type == "register") ? cartItem.type : 'domains';

                // item is product
                if (itemType == "products") {

                    if (promo.cycles != null) {
                        for (var i = 0; i < promo.cycles.products.length; i++) {
                            if (promo.cycles.products[i] === 'semi-annually') {
                                promo.cycles.products[i]    = 'semiannually'
                                i                           = promo.cycles.products.length + 2
                            }
                        }
                    }

                    if (promo.appliesto.productId.length !== 0) {
                        if (!promo.appliesto.productId.includes(cartItem.pid))
                            return {isApplied, actualPrice, priceAfterPromo, pricePromo}
                    }
                    else {
                        if (promo.requires !== null) {
                            let required = promo.requires
                            if (required.hasOwnProperty("productId") && required.productId !== null) {
                                if (!promo.requires.productId.includes(cartItem.pid))
                                    return {isApplied, actualPrice, priceAfterPromo, pricePromo}
                            }
                            else {
                                if (!promo.appliesto.productId.includes(cartItem.pid))
                                    return {isApplied, actualPrice, priceAfterPromo, pricePromo}
                            }
                        }
                    }

                    if (promo.cycles != null && promo.cycles.products && !promo.cycles.products.includes(cartItem.billingcycle))
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (actualPrice == 0)
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (promo.type_promo == 'Fixed Amount')
                        pricePromo = parseInt(promo.value);

                    if (promo.type_promo == 'Percentage')
                        pricePromo = (actualPrice * promo.value / 100);

                    priceAfterPromo = actualPrice - pricePromo;
                    isApplied = true;
                }

                // item is domain
                if (itemType == "domains") {

                    let domainName = cartItem.domain;
                    let domainNameArr = domainName.split('.');
                    let domainExt = domainName.replace(domainNameArr[0],"");

                    if (!promo.appliesto.domainTld.includes(domainExt))
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (promo.cycles.domains && !promo.cycles.domains.includes(cartItem.billingcycle.toString()))
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (cartItem.domaintype == 'use')
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (actualPrice == 0)
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (promo.type_promo == 'Fixed Amount')
                        pricePromo = parseInt(promo.value);

                    if (promo.type_promo == 'Percentage')
                        pricePromo = (actualPrice * promo.value / 100);

                    priceAfterPromo = actualPrice - pricePromo;
                    isApplied = true;
                }

                // item is regiter
                if (itemType == "register") {

                    let domainName = cartItem.domain;
                    let domainNameArr = domainName.split('.');
                    let domainExt = domainName.replace(domainNameArr[0],"");
                    let containSameDomain = null;
                    let itemServiceorDomain = cartItems.filter( item => item.type !== 'products' );

                    if (!promo.appliesto.domainTld.includes(domainExt))
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (promo.cycles.domains && !promo.cycles.domains.includes(cartItem.billingcycle.toString()))
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    itemServiceorDomain.forEach(function (item, index) {
                        if (item.type === 'products') {
                            let domainService = item.domain
                            if (domainService.hasOwnProperty("name")) {
                                if (item.domain.name === cartItem.domain) {
                                    if (promo.cycles != null && promo.cycles.products && !promo.cycles.products.includes(item.billingcycle))
                                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}
                                }
                            }
                        }
                    })

                    if (cartItem.domaintype == 'use')
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (actualPrice == 0)
                        return {isApplied, actualPrice, priceAfterPromo, pricePromo}

                    if (promo.type_promo == 'Fixed Amount')
                        pricePromo = parseInt(promo.value);

                    if (promo.type_promo == 'Percentage')
                        pricePromo = (actualPrice * promo.value / 100);

                    priceAfterPromo = actualPrice - pricePromo;
                    isApplied = true;
                }

                return {isApplied, actualPrice, priceAfterPromo, pricePromo}

            },
            promoRequire: function (configRequire) {
                let productId = [];
                let domainTld = [];
                let promoRequireArr = configRequire.split(',');
                promoRequireArr.map(function (item) {

                    // is interger, then product
                    if ((!isNaN(item) && (function(x) { return (x | 0) === x; })(parseFloat(item)))
                        && !productId.includes(item))
                            productId.push(item);

                    // first character is D, then domain
                    if (item.charAt(0) == 'D' && !domainTld.includes(item))
                        domainTld.push(item.replace("D",""));

                });

                return {productId, domainTld};
            },
            promoAppliesto: function (configApplyto) {
                let productId = [];
                let domainTld = [];
                let promoAppliestoArr = configApplyto.split(',');
                promoAppliestoArr.map(function (item) {

                    // is interger, then product
                    if ((!isNaN(item) && (function(x) { return (x | 0) === x; })(parseFloat(item)))
                        && !productId.includes(item))
                            productId.push(item);

                    // first character is D, then domain
                    if (item.charAt(0) == 'D' && !domainTld.includes(item))
                        domainTld.push(item.replace("D",""));

                });

                return {productId, domainTld};
            },
            promoBillingCycles: function (configCycles) {
                let products = [];
                let domains = [];
                let promoCyclesArr = configCycles.split(',');
                promoCyclesArr.map(function (item) {

                    let firstChar = item.charAt(0);

                    // first character is string, then product
                    if (!(!isNaN(firstChar) && (function(x) { return (x | 0) === x; })(parseFloat(firstChar))))
                        products.push(item.toLowerCase());

                    // first character is interger, then domain
                    if (!isNaN(firstChar) && (function(x) { return (x | 0) === x; })(parseFloat(firstChar)))
                        domains.push(item.replace('Years',''));

                });

                return {products, domains};
            },
            getCartDomainExt: function (cartItems, isOrderOnly = 0) {
                let domainExt = [];
                cartItems.map(function (item) {

                    if (item.type == 'products' && ('domain' in item)) {

                        if (isOrderOnly == 1 && item.domain.type === 'use')
                            return false;

                        let domainName = item.domain.name;
                        let domainNameArr = domainName.split('.');
                        domainExt.push(domainName.replace(domainNameArr[0],""));

                    }

                    if (item.type == 'domains') {

                        if (isOrderOnly == 1 && item.domaintype === 'use')
                            return false;

                        let domainName = item.domain;
                        let domainNameArr = domainName.split('.');
                        domainExt.push(domainName.replace(domainNameArr[0],""));

                    }

                });

                return domainExt;
            },
            getCartProductId: function (cartItems) {
                let productId = [];
                cartItems.map(function (item) {
                    if (item.type == 'products') {

                        productId.push(item.pid);

                    }
                })

                return productId;
            },
            isvalidRequiredItem: function (requiredItem, cartItems, promoConfigValue) {

                let isValid = false;
                let domainTldExist = [];
                let productIdExist = [];

                let getCartDomainExt = CartsSDK.utils.promotionHelper.getCartDomainExt(cartItems, 1);
                let getCartProductId = CartsSDK.utils.promotionHelper.getCartProductId(cartItems);

                if (requiredItem.domainTld) {

                    requiredItem.domainTld.map(function (tld) {

                        isValid = (tld.includes(getCartDomainExt)) ? true : false;

                    });

                }

                if (requiredItem.productId) {

                    var productIdValid  = false
                    requiredItem.productId.map(function (id) {

                        if (!productIdValid) {
                            isValid = (id.includes(getCartProductId)) ? true : false;
                            if (isValid) {
                                productIdValid = true
                            }
                        }

                    });

                }

                return (isValid) ? promoConfigValue : '0.00';

            }
        },
        getPromo: function (cartItems) {

            let getPromo = {
                price: 0,
                name: "",
                type_promo: "",
                appliesto: {
                    productId: [],
                    domainTld: [],
                },
                requires: {
                    productId: [],
                    domainTld: [],
                },
                cycles: {
                    products: [],
                    domains: [],
                },
                applyOnce: "",
                percentage: {
                    amount: 0,
                    percent: 0,
                }
            }

            let promo = cartItems.filter( item => item.type == 'promo' );
            if (promo.length == 0)
                return false;

            let promoConfig = promo[0];
            if (!promoConfig.appliesto)
                return false;

            let cartServiceDomain = cartItems.filter( item => item.type != 'promo' );

            getPromo.price = parseInt(promoConfig.value);
            getPromo.name = promoConfig.code;
            getPromo.type_promo = promoConfig.type_promo;
            getPromo.applyOnce = promoConfig.applyonce;

            // if (promoConfig.type_promo == 'Percentage') {
            //  getPromo.percentage.percent = parseInt(promoConfig.value);
             //  getPromo.percentage.amount = 0;
            // }

            // set promo require
            getPromo.requires = (promoConfig.requires) ? CartsSDK.utils.promotionHelper.promoRequire(promoConfig.requires) : null;

            // set promo applies to
            getPromo.appliesto = CartsSDK.utils.promotionHelper.promoAppliesto(promoConfig.appliesto);

            // set promo for cycles
            getPromo.cycles = (promoConfig.cycles) ? CartsSDK.utils.promotionHelper.promoBillingCycles(promoConfig.cycles) : null;

            // if promo required item is null, return promo value
            // if promo required item is not null & promo required item is exist, then set promo value, else 0.00
            getPromo.value = (!getPromo.requires) ? parseInt(promoConfig.value) : CartsSDK.utils.promotionHelper.isvalidRequiredItem(getPromo.requires, cartServiceDomain, promoConfig.value);

            return getPromo;
        },
        getBillingProduct: function (billing) {
            switch (billing) {
                case "Monthly":
                    return "monthly"
                    break
                case "Quarterly":
                    return "quarterly"
                    break
                case "Semi-Annually":
                    return "semiannually"
                    break
                case "Annually":
                    return "annually"
                    break
                case "Biennially":
                    return "biennially"
                    break
                case "Triennially":
                    return "triennially"
                    break
            }
        },
        validateBilling: function (promo, data) {
            var status = false
            
            var cycles = promo.cycles.split(',')

            if (cycles.length < 2) {
                var cycleDomain = cycles[0].replace(/\D/g, "")
                if (cycleDomain != "") {
                    return true
                }
            }

            cycles.forEach(function (value) {
                var cycleProduct = CartsSDK.utils.getBillingProduct(value)
                switch (cycleProduct) {
                    case data.billingcycle:
                        status = true
                        break;
                }
            })

            return status
        },
        validateBillingDomain: function (promo, data) {
            var status = 0 //0 kondisi tidak butuh billing domain, 1 butuh billing domain tapi domain tidak tersedia, 2 domain tersedia
            
            var cycles = promo.cycles.split(',')
            cycles.forEach(function (value) {
                var cycleDomain = value.replace(/\D/g, "")
                if (cycleDomain != ""){
                    if (data.hasOwnProperty("domain")) {
                        if (data.domain.hasOwnProperty("billingcycle")) {
                            switch (cycleDomain) {
                                case data.domain.billingcycle:
                                    status = 2
                                    break;
                                default:
                                    status = 1
                                    break;
                            }
                        }
                    }else{
                        status = 1
                    }
                }else{
                    status = 0
                }
            })

            return status
        },
        validateRequires: function (promo, data) {
            var status = false

            data.forEach(function (item) {
                if (item.type == "products") {
                    var require = promo.requires.split(',')
                    require.forEach(function (val) {
                        switch (val) {
                            case item.pid:
                                status = true
                                break;

                        }
                    })
                }
            })
            return status
        },
        floatingCart: function () {
            if(!window.matchMedia("(max-width: 767px)").matches){
                $(document).scroll(function () {
                    var cart = $("#cart-summary-wrapper")
                    var width = cart.width();
                    if ( $(this).scrollTop() - 200 >= $(window).height() - cart.height()){
                        cart.addClass('onfloating')
                        cart.css({
                            width: width
                        })
                    } else {
                        cart.removeClass('onfloating')
                    }
                })
            }
        },
        getTld: function (domain) {
            if (!domain) {
                return false
            }

            var arrDomain = domain.split(".")
            arrDomain.splice(0,1)

            if (arrDomain.length < 1) {
                return false
            }

            var tld = "." + arrDomain.join(".")

            return tld
        },
        formatDateIndo: function (date) {
            var date = new Date(date);

            var tahun = date.getFullYear();
            var bulan = date.getMonth();
            var tanggal = date.getDate();

            switch(bulan) {
                case 0: bulan = "Januari"; break;
                case 1: bulan = "Februari"; break;
                case 2: bulan = "Maret"; break;
                case 3: bulan = "April"; break;
                case 4: bulan = "Mei"; break;
                case 5: bulan = "Juni"; break;
                case 6: bulan = "Juli"; break;
                case 7: bulan = "Agustus"; break;
                case 8: bulan = "September"; break;
                case 9: bulan = "Oktober"; break;
                case 10: bulan = "November"; break;
                case 11: bulan = "Desember"; break;
            }

            return tanggal + " " + bulan + " " + tahun;
        },
        getAvailablePromo: function(callback,is_force){
            var AvailablePromo = localStorage.getItem("resAvailablePromoTemp");
            var result  = false;
            var now = new Date();
            var jsonAvailablePromo = JSON.parse(AvailablePromo);
            if (!AvailablePromo || is_force || jsonAvailablePromo.expiry < now.getTime()) {
                ApiHelper.fetchGeneralPromoCode(function (response) {
                    var stringResponse = "";
                    if(response.status==1){
                        stringResponse = response.data;
                    }else{
                        stringResponse = {
                            'promo_personal':[],
                            'promo_general':[],
                            'total_promo_general':0,
                            'total_promo_personal':0
                        };
                    }
                    var ttl = 5;
                    stringResponse.expiry = now.getTime() + (parseInt(ttl)* 60 * 1000);

                    resAvailablePromoTemp = JSON.stringify(stringResponse);
                    localStorage.removeItem("resAvailablePromoTemp");
                    localStorage.setItem("resAvailablePromoTemp", resAvailablePromoTemp);
                    result = stringResponse;
                    if(callback) {
                        callback(result);
                    }
                });
            }else{
                result = jsonAvailablePromo;
                if(callback) {
                    callback(result);
                }
            }
        },
        formatListPromo: function (data) {
            for (var index in data) {
                var sum = parseInt(data[index].maxuses) - parseInt(data[index].uses);
                var expired = CartsSDK.utils.formatDateIndo(data[index].expirationdate);

                if (parseInt(data[index].maxuses) == 0) {
                    data[index].promocanuse = "Unlimited";
                }else{
                    data[index].promocanuse = sum + " Kali";
                }

                if (data[index].expirationdate == "0000-00-00") {
                    data[index].expirationdate = "Unlimited";
                }else{
                    data[index].expirationdate = expired
                }

                if (data[index].type == "Percentage") {
                    data[index].value = parseFloat(data[index].value).toFixed(0) + "%"
                }else{
                    data[index].value = CartsSDK.utils.changeToRupiah(data[index].value)
                }
            }
            return data;
        },
        sumGimmickTotal: function (subtotal, services){
            var producthemat = 0;
            services.forEach(function (item, index){
                if(item.type=='products'){
                    if(Orderconfigs.product_gimmickprice[item.pid]){
                        Orderconfigs.product_gimmickprice[item.pid].forEach(function (gimmick, indexgimmick){
                            if(
                                gimmick.billingcycle == item.billingcycle &&
                                gimmick.strike_price !=null
                            ){
                                producthemat += gimmick.strike_price - item.price
                            }
                        });
                    }
                    if (item.hasOwnProperty("domain")) {
                        if (item.domain.hasOwnProperty("price")) {
                            var domainhemat = 0;
                            if(item.domain.price==0){
                                domainhemat = parseInt(item.domain.actualprice);
                            }
                            if(item.domain.strike_price!=0){
                                domainhemat = parseInt(item.domain.strike_price) - parseInt(item.domain.price);
                            }
                            producthemat += domainhemat;
                        }
                    }
                }

                if(item.type=='domains'){
                    var domainprice = 0;
                    if(item.price==0){
                        domainprice = parseInt(item.actualprice);
                    }
                    if(item.strike_price!=0){
                        domainprice = parseInt(item.strike_price) - parseInt(item.price);
                    }
                    producthemat += domainprice;
                }

            });
            producthemat = producthemat+subtotal.pidPromo;
            return producthemat;
        }
    },
}

module.exports = CartsSDK