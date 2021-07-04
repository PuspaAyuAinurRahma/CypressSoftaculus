var Orderconfigs = require(__dirname + "/../../config/const.js");
var ApiHelper = require(__dirname + "/../api/api.js");
var CartsSDK = require(__dirname+"/Carts.js");
var CustomfieldSDK = require(__dirname+"/Customfields.js");
var ConfigoptionSDK = require(__dirname+"/Configoptions.js");
var VpsxSDK = require(__dirname+"/Vpsx.js");
var DomainSDK = require(__dirname+"/Domains.js");
var PaymentSDK = require(__dirname+"/Payments.js");

var __layouts = {
    cart: require("ejs!" + __dirname + "/../../layouts/carts/main.ejs"),
    ordersections: require("ejs!" + __dirname + "/../../layouts/ordersections/main.ejs"),
    option_pilihpaket: require("ejs!" + __dirname + "/../../layouts/ordersections/option_pilihpaket.ejs"),
    option_pilihbilling: require("ejs!" + __dirname + "/../../layouts/ordersections/option_pilihbilling.ejs"),
    option_pilihdomain: require("ejs!" + __dirname + "/../../layouts/ordersections/option_pilihdomain.ejs"),
    section_freedomain: require("ejs!" + __dirname + "/../../layouts/ordersections/section_freedomain.ejs"),
    input_tambahdomain: require("ejs!" + __dirname + "/../../layouts/ordersections/input_tambahdomain.ejs"),
    input_eppcode: require("ejs!" + __dirname + "/../../layouts/ordersections/input-eppcode.ejs"),
    section_domain_serupa: require("ejs!" + __dirname + "/../../layouts/ordersections/section-domain-serupa.ejs"),
    section_domain_serupa_header_footer: require("ejs!" + __dirname + "/../../layouts/ordersections/section-domain-serupa-header-footer.ejs"),
    pencariandomain_available: require("ejs!" + __dirname + "/../../layouts/ordersections/hasilpencariandomain-available.ejs"),
    pencariandomain_nonavailable: require("ejs!" + __dirname + "/../../layouts/ordersections/hasilpencariandomain-nonavailable.ejs"),
    section_penawaran: require("ejs!" + __dirname + "/../../layouts/ordersections/section_penawaran.ejs"),
    section_upsale: require("ejs!" + __dirname + "/../../layouts/ordersections/section_upsale.ejs"),
    section_order_title: require("ejs!" + __dirname + "/../../layouts/ordersections/section_order_title.ejs"),
    section_step_order: require("ejs!" + __dirname + "/../../layouts/ordersections/section_step_order.ejs"),
    section_tambah_layanan: require("ejs!" + __dirname + "/../../layouts/ordersections/section_tambah_layanan_baru.ejs"),
    configoptions_counter: require("ejs!" + __dirname + "/../../layouts/ordersections/configoption_counter.ejs"),
    customfields_text: require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_text.ejs"),
    section_layanan_yang_kamu_beli       : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/section_layanan_yang_kamu_beli.ejs"),
    minimizePanel       : require("ejs!" + __dirname + "/../../layouts/ordersections/minimizePanel.ejs"),
    minimizePanelDomain       : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/minimizePanel.ejs"),
    alertError: require("ejs!" + __dirname + "/../../layouts/ordersections/alert-error.ejs"),
    section_tambah_domain       : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/section_tambah_domain.ejs"),
    section_cross_sales : require("ejs!" + __dirname + "/../../layouts/ordersections/section_cross_sales.ejs"),
    section_crossSalesModal : require("ejs!" + __dirname + "/../../layouts/ordersections/cross_sales_modal.ejs"),
    btn_SimpanCrossSales : require("ejs!" + __dirname + "/../../layouts/ordersections/btn_simpan_cross_sales.ejs"),
};

var ServicesSDK = {
    initiate: function () {
        PaymentSDK.getPayment();
        ServicesSDK.render.orderTitle();

        ServicesSDK.render.tambahService();
        CartsSDK.events.initiateProduct();
        ServicesSDK.events.showFormOrder();
        ServicesSDK.events.openDropdownOption();
        ServicesSDK.events.checkReferralCode();
        DomainSDK.events.checkInputDomain();
    },
    render: {
        sectionPenawaran: function (element, data) {
            let cross_sales = Orderconfigs.products[data.pid].cross_sales

            if (!cross_sales) {
                return
            }

            const randomId = Math.random().toString(36).substring(7)

            let cart = {}
            if ("cross_sale" in data) {
                cart = data.cross_sale
            }

            element.find('.section-penawaran').html(__layouts.section_penawaran({
                cross_sales: cross_sales,
                randomId: randomId,
                cart: cart
                }
            )).promise()
                .then(function () {
                    ServicesSDK.events.toggleAddonCrossSale();
                })
        },
        sectionUpsale: function (element, data) {
            const upsale_arr = Orderconfigs.upsales_product;
            upsale_arr.forEach(function (item){
                if(item.pid == data.pid && item.status=="1"){

                    if(item.cycles=='all' || item.cycles==data.billingcycle){
                        var upsale_wrapper = element.find('.section-upsale');
                        if(upsale_wrapper.find('.upsale-content[data-upsale="'+item.id+'"]').length){
                            upsale_wrapper.find('.upsale-content[data-upsale="'+item.id+'"]')
                                .html(item.text);
                        }else{
                            upsale_wrapper.append(__layouts.section_upsale(
                                {
                                    id: item.id,
                                    text: item.text
                                }
                            ));
                        }
                    }
                }
            });
        },
        configoptions: function (element, data) {
            var products = Orderconfigs.products[data.pid];
            var usedresources = ['speed','pmem','quota'];
            data.configoptions.forEach(function (item, index){
                if(usedresources.includes(item.optioncode)){
                    ConfigoptionSDK.render.header(element);
                }
            });
            data.configoptions.forEach(function (configoption){
                var optiontype = configoption.optiontype;
                switch (optiontype){
                    case "4":
                        ConfigoptionSDK.render.option_quantities(element, products, configoption);
                }
            });
        },
        customfieldsSection: function(element, data) {
            var customfileds = data.customfields;
            customfileds.forEach(function (value) {
                if(value.showorder!=""){
                    switch (value.fieldtype){
                        case 'text':
                            CustomfieldSDK.render
                                .textfield(element, value);
                            break;
                        case 'dropdown':
                            CustomfieldSDK.render.dropdownfield(element, value);
                            break;
                        case 'tickbox':
                            CustomfieldSDK.render
                                .thickboxfield(
                                    element,
                                    value
                                )
                            break;
                    }
                }
            });
            CustomfieldSDK.utils.chooseApps(element);
            CustomfieldSDK.utils.chooseAppsAddons(element);
            var urlParams       = new URLSearchParams(window.location.search);
            var choosed_apps    = urlParams.get('choose_apps');
            if(choosed_apps != null){
                CustomfieldSDK.utils.autoChooseApps(element, choosed_apps);
            }else{
                CustomfieldSDK.utils.autoChooseApps(element, 'None');
            }
        },
        orderTitle: function () {
            $('#order-title').html(__layouts.section_order_title({
                }
            ));
        },
        tambahService: function() {
            $("#tambah-layanan-baru").html(__layouts.section_tambah_layanan({
                group_type: Orderconfigs.group_type
            }))
                .promise()
                .then(function () {
                    ServicesSDK.events.tambahLayanan()
                })

            $('#section-add-domain').html(__layouts.section_tambah_domain({
                }
            ))
                .promise()
                .then(function () {
                    ServicesSDK.events.cariDomain($(this));
                })
        },
        formpanels: function (index, data) {
            $('#order-forms-wrapper').append(__layouts.ordersections({
                    groupname: data.groupname,
                    pid: data.pid,
                    index: index,
                    minimize: data.minimize,
                    crosssaleparent: data.crosssaleparent
                }
            )).promise().then(function () {
                var element = $(this).find('.panel').last()
                
                ServicesSDK.render.pilihpaket(element, data);
                ServicesSDK.render.pilihbilling(element, data);
                ServicesSDK.render.inputDomain(element, data);
                ServicesSDK.render.showDomainFromLocalstorage(element, data);
                ServicesSDK.render.sectionFreeDomain(element, data);
                ServicesSDK.render.sectionUpsale(element, data);
                ServicesSDK.render.sectionPenawaran(element, data);
                ServicesSDK.render.configoptions(element, data);
                ServicesSDK.render.customfieldsSection(element, data);
                ServicesSDK.render.minimizeSection(index)
                ServicesSDK.events.removeProduct();
                ServicesSDK.events.minimizePanel();
                ServicesSDK.events.maximizePanel();
                ServicesSDK.events.removeProductInCart();
                ServicesSDK.events.removeDomainTransfer();
                ServicesSDK.events.gunakanDomainDariCart();
                if (data.crosssaleparent == 0) {
                    ServicesSDK.events.masterCrossSale(index, data.pid)
                }else {
                    element.find('.section-area-footer').html(__layouts.btn_SimpanCrossSales)
                    ServicesSDK.events.simpanCrossSale()
                }

                if("domain" in data){
                    element.find('.header-right-panel .domain-name').html(data.domain.name)
                }

                if (data.minimize) {
                    element.find('.minimize-icon').click()
                }
            });
        },
        pilihpaket: function (element, data) {
            var productInGroup = Orderconfigs.product_in_group[data.gid];

            var products = {};
            productInGroup.forEach(function (value) {
                products[value] = Orderconfigs.products[value]
            })

            element.find('.section-pilihpaket').html(__layouts.option_pilihpaket({
                    products: products,
                    currentProduct: Orderconfigs.products[data.pid],
                    firstPid: data.pid,
                    utils: ServicesSDK.utils
                }
            ))
                .promise()
                .then(function () {
                    ServicesSDK.events.openDropdownOption();
                    ServicesSDK.events.changeProduct();
                    ServicesSDK.events.showTooltipGimmick(element);
                });
        },
        pilihbilling: function (element, data) {
            var defaultBilling = {
                billingcycle: data.billingcycle,
                price: data.price
            }

            var billingcycle =  Orderconfigs.products[data.pid].pricing.productpricing;
            if (!Orderconfigs.products[data.pid].product_pricing) {
                billingcycle = Orderconfigs.products[data.pid].config_pricing;
                defaultBilling.price = Orderconfigs.products[data.pid].config_pricing[defaultBilling.billingcycle]
            }

            element.find('.section-billingcycle').html(__layouts.option_pilihbilling({
                    products: Orderconfigs.products,
                    currentProduct: Orderconfigs.products[data.pid],
                    billingcycle: billingcycle,
                    utils: ServicesSDK.utils,
                    defaultBilling: defaultBilling,
                }
            ))
                .promise()
                .then(function () {
                    ServicesSDK.events.openDropdownOption();
                    ServicesSDK.events.changeBillingCycle();
                    ServicesSDK.events.fillHargaCoret(element, billingcycle);
                    ServicesSDK.events.fillGimmickBilling(element, billingcycle);
                    ServicesSDK.events.showTooltipUpsale(element, defaultBilling, billingcycle);
                });
        },
        pilihDomain: function (element, data, useDomainInCart) {
            if (useDomainInCart) {
                element.find('.row.input_pencarian_domain').addClass('hidden')
                element.find('.row.tampilkan_list_domain').removeClass('hidden')
                element.find('.row.tampilkan_list_domain').html(__layouts.option_pilihdomain({
                        domains: data,
                    }
                ))
                    .promise()
                    .then(function () {
                        ServicesSDK.events.openDropdownOption();
                        ServicesSDK.events.changeSelectDomain();
                    });
            } else {
                element.find('.row.input_pencarian_domain').removeClass('hidden')
                element.find('.row.tampilkan_list_domain').addClass('hidden')
            }
        },
        sectionFreeDomain: function (element, data) {
            var pid = data.pid;
            var productDetail = Orderconfigs.products[pid].details;
            if(productDetail.freedomain != "on"){
                return
            }
            element.find('.section-freedomain').html(__layouts.section_freedomain(productDetail));

        },
        inputDomain: function (element, data) {
            var pid = data.pid
            var productDetail = Orderconfigs.products[pid].details

            if (productDetail.showdomainoptions != 1) {
                return
            }
            
            element.find('.section-tambah-domain').html(__layouts.input_tambahdomain({

                }
            )).promise().then(function () {
                    ServicesSDK.events.cariDomain(element);
                    ServicesSDK.events.hoverInputDomain();
                })
        },
        hasilPencarianDomain: function(element, domain, data) {
            // console.log('Domain Search');
            // console.log(data);

            var productcartthread = element.closest('.panel').attr('data-index');
            var domaintld = ServicesSDK.utils.getTld(domain);

            var elHasilpencarian = element.find(".hasilpencarian-domain");
            var isFreedomain = false;
            var currentpath = Orderconfigs.urlvars.paths[2];
            var allowUseDomain = true

            var usePersyaratan = false
            var textPersyaratan = ""

            if (productcartthread === undefined) {
                allowUseDomain = false
            } else {
                var findPersyaratanDomain = DomainSDK.utils.findTld(domaintld);
                if (findPersyaratanDomain) {
                    textPersyaratan = findPersyaratanDomain.persyaratan
                }
            }

            if (data.error) {
                var layout = __layouts.pencariandomain_nonavailable
                defaultPrice = 0
                actualPrice = 0
                textPersyaratan = ""
            } else if(!data['0'].isAvailable){
                var layout = __layouts.pencariandomain_nonavailable
                data = data['0']

                if (allowUseDomain) {
                    if(CartsSDK.events.isFreeDomain(productcartthread, domaintld)){
                        defaultPrice = 0;
                        isFreedomain = true;
                        actualPrice = data.shortestPeriod.transfer;
                    }else{
                        defaultPrice = data.shortestPeriod.transfer;
                        actualPrice = data.shortestPeriod.transfer;
                    }
                } else {
                    defaultPrice = data.shortestPeriod.transfer;
                    actualPrice = data.shortestPeriod.transfer;
                }
            } else {
                var layout = __layouts.pencariandomain_available;
                data = data['0'];

                if (allowUseDomain) {
                    if(CartsSDK.events.isFreeDomain(productcartthread, domaintld)){
                        defaultPrice = 0;
                        isFreedomain = true;
                        actualPrice = data.pricing['1'].register;
                    }else{
                        defaultPrice = data.pricing['1'].register;
                        actualPrice = data.pricing['1'].register;
                    }
                } else {
                    defaultPrice = data.pricing['1'].register;
                    actualPrice = data.pricing['1'].register;
                }
            }
            elHasilpencarian.html(layout({
                    dataDomain: data,
                    domain: domain,
                    defaultPrice: defaultPrice,
                    actualPrice: actualPrice,
                    isFreedomain: isFreedomain,
                    allowUseDomain: allowUseDomain,
                    usePersyaratan: usePersyaratan,
                    textPersyaratan: textPersyaratan,
                    tld: ServicesSDK.utils.getTld(domain),
                }
            )).promise().then(function () {
                ServicesSDK.events.changeBillingCycleDomainService();
                ServicesSDK.events.transferDomain();
                ServicesSDK.events.gunakanDomain();
                ServicesSDK.events.buyDomain();
                ServicesSDK.events.removeProductDomain();
                ServicesSDK.events.fillHargaCoretDomain(
                    elHasilpencarian, data.tld,1
                );
                ApiHelper.getTldLists(function (result){
                  if (domaintld.charAt(0).includes(".")) {
                    domaintld = domaintld.substring(1)
                  }
                  let tldIsSell = result.data.includes(domaintld)
                  if (!tldIsSell)
                     $('.btn-transfer-domain').hide();
                });
            });
        },
        showDomainFromLocalstorage: function(element, data) {
            if (!data.domain) {
                return;
            }

            var currentpath = Orderconfigs.urlvars.paths[2];

            switch (data.domain.type) {
                case "use":
                    var layout = __layouts.pencariandomain_nonavailable;
                    var dataDomain = {}
                    var getDomain = ApiHelper.checkAvailabilityDomain(data.domain.name, function (result) {
                        var defaultPrice = 0

                        if (result.result.hasOwnProperty('error')) {
                            dataDomain.error = result.result.error
                        } else {
                            dataDomain = result.result[0]
                            defaultPrice = dataDomain.shortestPeriod.transfer
                            var isFreedomain = false;
                            var actualPrice = defaultPrice;
                            var domaintld = "."+dataDomain.tld;
                            var productcartthread = element.closest('.panel').attr('data-index');

                            isFreedomain = CartsSDK.events.isFreeDomain(productcartthread, domaintld);
                            if(isFreedomain){
                                defaultPrice = 0;
                            }
                        }

                        element.find('.section-tambah-domain .hasilpencarian-domain').html(layout({
                                domain: data.domain.name,
                                dataDomain: dataDomain,
                                defaultPrice: defaultPrice,
                                allowUseDomain: true
                            }
                        ))
                            .promise()
                            .then(function () {
                                ServicesSDK.events.gunakanDomain();
                                ServicesSDK.events.transferDomain();
                                element.find('.btn-gunakan-domain').click()

                                ApiHelper.getTldLists(function (result){
                                  if (domaintld.charAt(0).includes(".")) {
                                    domaintld = domaintld.substring(1)
                                  }
                                  let tldIsSell = result.data.includes(domaintld)
                                  if (!tldIsSell)
                                     $('.btn-transfer-domain').hide();
                                });
                            })
                    })

                    break;

                case "transfer":
                    var layout = __layouts.input_eppcode;

                    var tld = ServicesSDK.utils.getTld(data.domain.name)
                    var textPersyaratan = "";
                    var usePersyaratan = false;
                    var findPersyaratanDomain = DomainSDK.utils.findTld(tld);
                    if (findPersyaratanDomain) {
                        usePersyaratan = true;
                        textPersyaratan = findPersyaratanDomain.persyaratan
                    }

                    element.find('.section-tambah-domain .hasilpencarian-domain').html(layout({
                            domain: data.domain.name,
                            defaultPrice: data.domain.price,
                            actualPrice: data.domain.actualprice,
                            utils: ServicesSDK.utils,
                            allowUseDomain: true,
                            usePersyaratan: usePersyaratan,
                            textPersyaratan: textPersyaratan,
                            tld: data.domain.tld
                        }
                    ))
                        .promise()
                        .then(function () {
                            ServicesSDK.events.inputEppCode()
                            ServicesSDK.events.removeProductDomain();

                            element.find("input[name='eppcode']").val(data.domain.epp)
                            element.find("input[name='eppcode']").attr('disabled','disabled')
                            element.find('.header-right-panel .domain-name').html(data.domain.name)
                            element.find('.submit-eppcode').addClass('hidden');
                            element.find('.delete-eppcode').removeClass('hidden');
                        })
                    break;

                case "register":
                    var productcartthread = element.closest('.panel').attr('data-index');


                    var elHasilpencarian = element.find(".hasilpencarian-domain");
                    var isFreedomain = false;
                    var layout = __layouts.pencariandomain_available;
                    ApiHelper.checkAvailabilityDomain(data.domain.name, function (hasil) {

                        result = hasil.result[0]
                        defaultPrice = result.pricing[data.domain.billingcycle].register
                        var actualPrice = defaultPrice;
                        var domaintld = "."+result.tld;
                        isFreedomain = CartsSDK.events.isFreeDomain(productcartthread, domaintld);
                        if(isFreedomain){
                            defaultPrice = 0;
                        }

                        var textPersyaratan = "";
                        var usePersyaratan = false;
                        var findPersyaratanDomain = DomainSDK.utils.findTld(domaintld);
                        if (findPersyaratanDomain) {
                            usePersyaratan = true;
                            textPersyaratan = findPersyaratanDomain.persyaratan
                        }

                        element.find('.section-tambah-domain .hasilpencarian-domain').html(layout({
                                dataDomain: result,
                                domain: data.domain.name,
                                defaultPrice: defaultPrice,
                                isFreedomain: isFreedomain,
                                actualPrice: actualPrice,
                                usePersyaratan: usePersyaratan,
                                textPersyaratan: textPersyaratan,
                                tld: domaintld
                            }
                        )).promise().then(function () {
                            ServicesSDK.events.changeBillingCycleDomainService();
                            ServicesSDK.events.removeProductDomain();
                            ServicesSDK.events.buyDomain();

                            element.find("select[name='registerDomainBillingcycle']").val(data.domain.billingcycle)
                            element.find("button[name='buy-domain']").addClass("hidden")
                            element.find("button[name='delete-domain']").removeClass("hidden")
                        });
                    });
                    break;
            }
        },
        domainSpotlight: function (element, data, inDomainPage = false) {
            var parent;
            if (inDomainPage) {
                parent = $("#section-add-domain");
            } else {
                parent = element.parents(".panel");
            }

            var nextElement = parent.find('.section-domain-serupa')
            var domainsSliced = {};
            var firstSliced = 3;

            for (domain in data) {
                if (!data[domain].isAvailable) {
                    continue
                }
                domainsSliced[domain] = data[domain]
            };

            domainsSliced = Object.keys(domainsSliced).slice(0, 3).reduce((result, key) => {
                result[key] = domainsSliced[key];
                return result;
            }, {});
            nextElement.html(__layouts.section_domain_serupa_header_footer({
                }
            )).promise().then(function () {
                ServicesSDK.render.showDomainSerupa(nextElement, domainsSliced)
                ServicesSDK.events.showMoreDomain(nextElement, data, firstSliced)

            })
        },
        showDomainSerupa: function (nextElement, domainsSliced) {
            nextElement.find('.show-domain-serupa').append(__layouts.section_domain_serupa({
                domainsSliced: domainsSliced
            })).promise().then(function () {
                ServicesSDK.events.changeBillingCycleDomainSuggested();
                ServicesSDK.events.buyDomainSerupa();
                ServicesSDK.events.removeProductDomainSuggested();
                ServicesSDK.events.tutupDomainSerupa();
                ServicesSDK.events.bukaDomainSerupa();
                // console.log(domainsSliced);
                Object.keys(domainsSliced).forEach(function(key) {
                    var elementindex = parseInt(key)+1;
                    // console.log(domainsSliced[key].tld);
                    // console.log(nextElement.find('.show-domain-serupa')
                    //     .find('.wrapper-domain-available:nth-child('+elementindex+')'));
                    ServicesSDK.events.fillHargaCoretDomain(
                        nextElement.find('.show-domain-serupa')
                            .find('.wrapper-domain-available:nth-child('+elementindex+')')
                        ,domainsSliced[key].tld,1
                    );
                });
            })
        },
        renderInputEppCode: function (element, domain, price) {
            var elHasilpencarian = element.parents(".hasilpencarian-domain");
            var layout = __layouts.input_eppcode

            var domainTld = ServicesSDK.utils.getTld(domain)

            var textPersyaratan = "";
            var usePersyaratan = false;
            var findPersyaratanDomain = DomainSDK.utils.findTld(domainTld);
            if (findPersyaratanDomain) {
                usePersyaratan = true;
                textPersyaratan = findPersyaratanDomain.persyaratan
            }

            elHasilpencarian.html(layout({
                    domain: domain,
                    defaultPrice: price.default,
                    actualPrice: price.actual,
                    utils: ServicesSDK.utils,
                    usePersyaratan: usePersyaratan,
                    textPersyaratan: textPersyaratan,
                    tld: domainTld,
                }
            )).promise().then(function () {
                ServicesSDK.events.inputEppCode()
                ServicesSDK.events.removeDomainTransfer();
            })
        },
        showMoreDomainSuggested: function (nextElement, data, nextSliced) {
            nextElement.html('');
            var domainsSliced = {};
            var sliced = nextSliced + 5;

            for (domain in data) {
                if (!data[domain].isAvailable) {
                    continue
                }
                domainsSliced[domain] = data[domain]
            };

            domainsSliced = Object.keys(domainsSliced).slice(0, sliced).reduce((result, key) => {
                result[key] = domainsSliced[key];
                return result;
            }, {});

            nextElement.append(__layouts.section_domain_serupa({
                    domainsSliced: domainsSliced
                }
            )).promise().then(function () {
                ServicesSDK.events.changeBillingCycleDomainSuggested();
                ServicesSDK.events.removeProductDomainSuggested();
                ServicesSDK.events.buyDomainSerupa();
                if (sliced > data.length) {
                    nextElement.find(".btn-domain-serupa").addClass("hidden")
                }
                ServicesSDK.events.showMoreDomain(nextElement, data, sliced)
            })
        },
        sectionLayananYangKamuBeliAppend: function (index, data, element) {
            var elWrapper = element.find('.section-show-local-storage');

            elWrapper.append(__layouts.section_layanan_yang_kamu_beli({
                index: index,
                domainName: data.domain
            })).promise().then(function () {
                var parent = elWrapper.find('.panel').last()
                DomainSDK.render.loadDomainFlomLocalStorage(parent, data)
            })
        },
        domainSection: function (index, data) {
            $("#order-forms-wrapper").append(__layouts.section_layanan_yang_kamu_beli({
                index: index,
                domainName: data.domain,
                minimize: data.minimize
            })).promise().then(function () {
                var parent = $("#order-forms-wrapper").find('.panel').last()
                DomainSDK.render.loadDomainFlomLocalStorage(parent, data)
                ServicesSDK.render.minimizeSection(index)
                ServicesSDK.events.minimizePanel();
                ServicesSDK.events.maximizePanel();
                ServicesSDK.events.removeProduct();
            })
        },
        minimizeSection: function (index) {
            var element = $(".panel[data-index='"+index+"']")
            var data = CartsSDK.vpsx_events.getCartByIndex(index)

            if (data.type == "products") {
                element.find('.minimize-panel').html(__layouts.minimizePanel({
                        paket: data.name,
                        billingcycle: ServicesSDK.utils.changeFormatBilling(data.billingcycle)
                    }
                ))
            }
            if (data.type == "domains") {
                element.find('.minimize-panel').html(__layouts.minimizePanelDomain({
                        paket: data.domain,
                        billingcycle: data.billingcycle
                    }
                ))
            }
        },
        sectionCrossSales: function (index, data) {
            var element = $(".panel[data-index='"+index+"']")
            var parentPid = element.attr('data-pid')
            var findIndex = CartsSDK.events.checkCrossSaleExists(data.product_id, parentPid)

            element.find('.section-cross-sales').append(__layouts.section_cross_sales({
                id: data.id,
                description: data.description,
                pid: data.product_id,
                ischeck: findIndex,
                paytype: data.product_details.details.paytype
            })).promise().then(function () {
                ServicesSDK.events.addCrossSales()
                ServicesSDK.events.editCrossSaleSelected()
            })
        },
    },
    events: {
        showFormOrder: function() {
            var cart    = CartsSDK.events.getCart()
            var vpsx_id = Orderconfigs.vps_x;

            $('#order-forms-wrapper').html('')

            cart.forEach(function (data, index) {
                if (data.type == 'domains') {
                    ServicesSDK.render.domainSection(index, data)
                    return
                }

                var search = vpsx_id.find(function (value) {
                    return value == data.pid
                })

                if (search) {
                    VpsxSDK.render.formPanels(index, data);
                    return;
                }
                if (data.type == 'products') {
                    ServicesSDK.render.formpanels(index, data)
                }
            })
        },
        openDropdownOption: function () {
            $(".default_option").off().on('click',function () {
                var thisDropdown = $(this).parent();

                if (thisDropdown.hasClass("active")) {
                    thisDropdown.removeClass("active")
                    thisDropdown.find('li').tooltip({placement: 'bottom',trigger: 'manual'}).tooltip('show');
                } else {
                    $(".dropdown_select_wrapper").removeClass("active");
                    thisDropdown.addClass("active")
                    thisDropdown.find('li').tooltip('destroy');
                }
            })

            $(document).on('click', function(event) {
                var elSelect = $('.dropdown_select_wrapper')
                if (!$(event.target).closest('.dropdown_select_wrapper').length){
                    elSelect.removeClass("active")
                }
            });

            $(".accordion__item__header").off().click(function () {
                var prevAccordion = $(this).parents(".dropdown-accordion").find("li .accordion__item__header.active")
                var prevGrouptype = prevAccordion.attr("data-grouptype")
                var currentGrouptype = $(this).attr("data-grouptype")

                prevAccordion.removeClass("active")
                prevAccordion.next("div").slideUp(200)

                if (currentGrouptype == prevGrouptype) {
                    return
                }

                $(this).addClass("active");
                $(this).next("div").slideDown(200);
            });
        },
        changeBillingCycle: function () {
            $(".dropdown_select_wrapper[data-type='billingcycle'] .select_ul li").on('click',function () {
                var currentele = $(this).clone();
                var defaultoption = $(this).parents(".dropdown_select_wrapper").find(".default_option");
                defaultoption.html(currentele);

                // Show or disable tooltip
                $(".dropdown_select_wrapper[data-type='billingcycle'] .select_ul li").removeAttr('data-toggle')
                defaultoption.find('li').removeClass('hidden')
                defaultoption.find('li').tooltip({placement: 'bottom',trigger: 'manual'}).tooltip('show');

                $(this).parents(".dropdown_select_wrapper").removeClass("active");

                $(this).parent().find('li.hidden').each(function () {
                    if ($(this).hasClass("billing-minus")) {
                        return
                    }
                    $(this).removeClass('hidden');

                })
                $(this).addClass('hidden')

                // Update Cart
                var billingcycle = $(this).find('.option').data("billingcycle")
                var pid = $(this).parents(".panel").attr("data-pid")
                var index = $(this).parents(".panel").attr("data-index")

                CartsSDK.events.changeBillingCycle(index, pid, billingcycle);
                ServicesSDK.events.triggerFreeDomain(index);
                ServicesSDK.render.minimizeSection(index);
                ServicesSDK.render.sectionUpsale(
                    $(this).parents('.panel'),
                    CartsSDK.events.getCartByIndex(index)
                )
                CartsSDK.events.removeCrossSaleWithParentProduct(index, pid)
                ServicesSDK.events.masterCrossSale(index, pid)
            })
        },
        changeProduct: function () {
            $(".dropdown_select_wrapper[data-type='product'] .select_ul li").off().click(function () {
                var currentele = $(this).html();
                var defaultoption = $(this).parents(".dropdown_select_wrapper").find(".default_option li");
                var index = $(this).parents('.panel').data('index')

                // Select
                defaultoption.html(currentele);
                $(this).parents(".dropdown_select_wrapper").removeClass("active");

                $(this).parent().find('li.hidden').each(function () {
                    $(this).removeClass('hidden');

                })
                $(this).addClass('hidden')

                // Change billingcycle
                var product = Orderconfigs.products
                var pid = $(this).find(".option").attr("data-pid")
                var wrapperBilling = $(".dropdown_select_wrapper[data-type='billingcycle']");
                var defaultOption = wrapperBilling.find('.default_option li .option');

                var selectedProductPrice = product[pid]['pricing']
                var billingUseAnnually = false

                // Change panel pid
                $(this).parents(".panel").attr("data-pid", pid)

                // Change Billing cycle
                if (selectedProductPrice.productpricing['annually'] > 0) {
                    defaultOption.find('.title').html(ServicesSDK.utils.changeFormatBilling('annually'))
                    defaultOption.find('.description').html(ServicesSDK.utils.changeToRupiah(selectedProductPrice.productpricing['annually']))
                    billingUseAnnually = true;
                } else {
                    defaultOption.find('.title').html(ServicesSDK.utils.changeFormatBilling(selectedProductPrice.minprice.billingcycle))
                    defaultOption.find('.description').html(ServicesSDK.utils.changeToRupiah(selectedProductPrice.minprice.price))
                }

                // Change Billing cycle
                for (billing in selectedProductPrice.productpricing) {
                    var price = selectedProductPrice.productpricing[billing]
                    var rupiah = ServicesSDK.utils.changeToRupiah(price);
                    var option = wrapperBilling.find(".select_ul li .option[data-billingcycle='"+billing+"']");
                    var optionParent = option.parent();

                    option.find('.description').html(rupiah)
                    if (price > 0) {
                        optionParent.removeClass("hidden")
                        optionParent.removeClass("billing-minus")
                    } else {
                        optionParent.addClass("billing-minus")
                        optionParent.addClass("hidden")
                    }

                    if (billingUseAnnually) {
                        wrapperBilling.find(".select_ul li .option[data-billingcycle='annually']").parent().addClass('hidden');
                    } else {
                        wrapperBilling.find(".select_ul li .option[data-billingcycle='"+selectedProductPrice.minprice.billingcycle+"']").parent().addClass('hidden');
                    }
                }

                // Change cart
                CartsSDK.events.addProduct(pid, index)
                ServicesSDK.events.showFormOrder()
                ServicesSDK.render.minimizeSection(index)
                CartsSDK.events.removeCrossSaleWithParentProduct(index, pid)
                ServicesSDK.events.masterCrossSale(index, pid)
            })
        },
        hoverInputDomain: function() {
            $("input[name='domain']").on("focus", function () {
                var title = $(this).attr("title")
                if (title) {
                    $(this).removeAttr("title")
                }

                $(this).next('.tooltip').remove();

                $(this).removeClass(".danger-tooltip")
                $(this).removeClass("info-tooltip")
                $(this).removeClass("success-tooltip")
            })
        },
        cariDomain: function (element) {  
            var elInput = element.find('input[name="domain"]')
            var elButton = element.find("button[name='cari-domain']")
            elInput.off().on("keypress keyup", function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    elButton.click();
                }
            })

            let btn_caridomain = $("#section-add-domain button[name='cari-domain']");
            let formInput = btn_caridomain.closest(".row").find(".form-group")
            formInput.find("input").tooltip().mouseover()
            formInput.find("input").addClass("info-tooltip")
            formInput.find("input").attr("data-original-title","Isikan domain tanpa www.")

            let btn_caridomain_products = $(".section-tambah-domain button[name='cari-domain']");
            let formInput_product = btn_caridomain_products.closest(".row").find(".form-group")
            formInput_product.find("input").tooltip().mouseover()
            formInput_product.find("input").addClass("info-tooltip")
            formInput_product.find("input").attr("data-original-title","Isikan domain tanpa www.")

            // For Products
            $(".panel button[name='cari-domain']").off().on('click', function () {
                var formInput = $(this).parent().prev().find(".form-group")
                var spinner = $(this).find('.fa-spin')
                var section = $(this).parents('.section-tambah-domain')
                var domain = section.find("input[name='domain']").val()
                var validate = ServicesSDK.utils.regexDomain(domain);
                var tld = ServicesSDK.utils.getTld(domain);
                var pid = $(this).parents(".panel").attr('data-pid')
                var useDomainOnly = Orderconfigs.use_domain_only.find(val => val == pid)
                var panel = $(this).parents(".panel");

                if (!tld) {
                    formInput.find("input").addClass("danger-tooltip")
                    formInput.find("input").attr("data-original-title","Domain harus memiliki ekstensi.")
                    formInput.find("input").tooltip().mouseover()
                    return;
                }

                if (!validate) {
                    formInput.find("input").addClass("danger-tooltip")
                    formInput.find("input").attr("data-original-title","Domain tidak benar, silahkan masukkan domain kembali.")
                    formInput.find("input").tooltip().mouseover()
                    return;
                }

                // Loader
                formInput.addClass("loader-input")
                $(this).attr('disabled','disabled');
                spinner.removeClass('hidden')

                var element = $(this);

                // Remove alert
                var section = $(this).parents(".section-tambah-domain")
                if (section.find(".form-title").next().hasClass("alert")) {
                    section.find(".form-title").next().remove()
                }

                // Empty display or section
                section.find(".wrapper-domain-available ").addClass("hidden");
                section.find(".wrapper-domain-nonavailable ").addClass("hidden");
                panel.find(".section-domain-serupa").html('')

                // Disabled form
                formInput.find('input').attr('disabled','disabled')

                if (!useDomainOnly) {
                    setTimeout(function () {
                        ApiHelper.checkDomainSpotlight(domain, function (data) {
                            ServicesSDK.render.domainSpotlight(element, data.result)

                            formInput.removeClass("loader-input")
                            element.removeAttr('disabled');
                            spinner.addClass('hidden')
                            formInput.find('input').removeAttr('disabled')
                        })
                    }, 10)
                }

                ApiHelper.checkAvailabilityDomain(domain, function (data) {
                    ServicesSDK.events.checkReturnCariDomain(element, data.result);

                    var result = data.result
                    var title = ""

                    if (useDomainOnly) {
                        formInput.removeClass("loader-input")
                        element.removeAttr('disabled');
                        spinner.addClass('hidden')
                        formInput.find('input').removeAttr('disabled')
                    }

                    if (result.error) {
                        formInput.find("input").addClass("info-tooltip")
                        title = "Domain sudah terdaftar sob"
                    } else if(!result['0'].isAvailable){
                        formInput.find("input").addClass("info-tooltip")
                        title = "Domain sudah terdaftar sob"
                    } else {
                        formInput.find("input").addClass("success-tooltip")
                        title = "Mantap Sob! Domain ini tersedia, dan siap kamu beli."
                    }

                    formInput.find("input[name='domain']").attr("data-original-title",title)
                    formInput.find("input[name='domain']").tooltip().mouseover()
                });
            })

            // For Domain
            $("#section-add-domain button[name='cari-domain']").off().on('click', function () {
                var domain      = $(this).closest('.row').find("input[name='domain']").val()
                var formInput   = $(this).closest(".row").find(".form-group")
                var validate    = ServicesSDK.utils.regexDomain(domain);
                var tld         = ServicesSDK.utils.getTld(domain);
                var spinner     = $(this).find('.fa-spin')

                if (!tld) {
                    formInput.find("input").addClass("danger-tooltip")
                    formInput.find("input").attr("data-original-title","Domain harus memiliki ekstensi.")
                    formInput.find("input").tooltip().mouseover()
                    return;
                }

                if (!validate) {
                    formInput.find("input").addClass("danger-tooltip")
                    formInput.find("input").attr("data-original-title","Domain tidak benar, silahkan masukkan domain kembali.")
                    formInput.find("input").tooltip().mouseover()
                    return;
                }

                // Loader
                formInput.addClass("loader-input")
                $(this).attr('disabled','disabled');
                spinner.removeClass('hidden')

                var element = $(this);

                // Remove alert
                var section = $(this).parents(".section-tambah-domain")
                if (section.find(".form-title").next().hasClass("alert")) {
                    section.find(".form-title").next().remove()
                }

                // Disabled form
                formInput.find('input').attr('disabled','disabled')

                // Empty display or section
                section.find(".wrapper-domain-available ").addClass("hidden");
                section.find(".wrapper-domain-nonavailable ").addClass("hidden");
                section.find(".section-domain-serupa").html('')

                setTimeout(function () {
                    ApiHelper.checkDomainSpotlight(domain, function (data) {
                        ServicesSDK.render.domainSpotlight(element, data.result, true)

                        formInput.removeClass("loader-input")
                        element.removeAttr('disabled');
                        spinner.addClass('hidden')
                        formInput.find('input').removeAttr('disabled','disabled')
                    })
                }, 10)

                ApiHelper.checkAvailabilityDomain(domain, function (data) {
                    ServicesSDK.events.checkReturnCariDomain(element, data.result);

                    var result = data.result
                    var title = ""
                    if (result.error) {
                        formInput.find("input").addClass("info-tooltip")
                        title = "Domain sudah terdaftar sob"
                    } else if(!result['0'].isAvailable){
                        formInput.find("input").addClass("info-tooltip")
                        title = "Domain sudah terdaftar sob"
                    } else {
                        formInput.find("input").addClass("success-tooltip")
                        title = "Mantap Sob! Domain ini tersedia, dan siap kamu beli."
                    }

                    formInput.find("input").attr("data-original-title",title)
                    formInput.find("input").tooltip().mouseover()
                });
            })

            $(".section-tambah-domain input[name='domain']").on("keypress keyup", function () {
                var regex = new RegExp("^[a-zA-Z0-9.-]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }
            })
        },
        checkReturnCariDomain: function (element, data) {
            var parent = element.parents(".section-tambah-domain");
            var inputDomain = parent.find("input[name='domain']").val()

            var productcartthread = element.closest('.panel').attr('data-index');

            if (productcartthread !== undefined) {
                var pid = element.parents(".panel").attr('data-pid')
                var useDomainOnly = Orderconfigs.use_domain_only.find(val => val == pid)

                if (useDomainOnly) {
                    data.error = "Can't transfer or register domain"
                }
            }

            ServicesSDK.render.hasilPencarianDomain(parent, inputDomain, data)
        },
        changeBillingCycleDomainService: function () {
            $("select[name='registerDomainBillingcycle']").off().on('change', function () {
                var parent = $(this).parents(".display-domain")
                var domain = parent.find(".name .domain-name").html().trim()
                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
                var index = $(this).parents(".panel").attr("data-index")
                var price = $(this).find(':selected').attr('data-register-price');
                var btnBuyDomain = parent.find("button[name='buy-domain']");
                var tld = ServicesSDK.utils.getTld(domain);


                parent.find(".harga-asli").html(price);
                parent.find(".harga-asli").attr('data-price', price);
                parent.find(".harga-asli").attr('data-actual-price', price);

                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                );

                ServicesSDK.events.fillHargaCoretDomain(
                    parent,
                    tld.substring(1),
                    billingcycle
                )

                if (!btnBuyDomain.hasClass("hidden")) {
                    return
                }
                CartsSDK.events.changeBillingcycleDomainRegister("product", domain, billingcycle, price, tld, index, pricetrough)
                ServicesSDK.render.minimizeSection(index);

            })
        },
        changeBillingCycleDomainSuggested: function () {
            $("select[name='registerDomainBillingcycleSuggested']").on('change', function () {
                var parent = $(this).parents(".row.wrapper-domain-available")
                var domain = parent.find(".name .domain-name").html().trim()
                var billingcycle = parent.find("select[name='registerDomainBillingcycleSuggested']").val()
                var InParent = $(this).parents(".section-domain-serupa")
                var prevElm = InParent.prev()
                var index = prevElm.attr("data-index")
                var price = $(this).find(':selected').attr('data-register-price');
                var btnBuyDomain = parent.find("button[name='buy-domain-serupa']");
                var tld = ServicesSDK.utils.getTld(domain);

                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                )
                ServicesSDK.events.fillHargaCoretDomain(
                    parent,
                    tld.substring(1),
                    billingcycle
                )

                parent.find(".harga-asli").html(price)

                if (!btnBuyDomain.hasClass("hidden")) {
                    return
                }

                CartsSDK.events.changeBillingcycleDomainRegister("product", domain, billingcycle, price, tld, index, pricetrough)
            })
        },
        triggerFreeDomain: function(productindex){
            var domaintarget    = $('#panel'+productindex).find('.hasilpencarian-domain');
            var domainname      = domaintarget.find('.domain-name').html();
            var domaintLd       = ServicesSDK.utils.getTld(domainname);
            var cycleelem       = domaintarget.find("select[name='registerDomainBillingcycle']");


            if(CartsSDK.events.isFreeDomain(productindex, domaintLd)){
                cycleelem.val('1')
                    .trigger('change')
                    .promise()
                    .then(function () {
                        ServicesSDK.events.changeActualDomainPrice(productindex,true);
                        CartsSDK.events.calculateFreeDomain(productindex);
                        CartsSDK.render.cartPanel();
                    });
            }else{
                ServicesSDK.events.changeActualDomainPrice(productindex, false);
            }

        },
        changeActualDomainPrice: function(productindex, isFreedomain){
            var domaintarget    = $('#panel'+productindex).find('.hasilpencarian-domain');
            var priceelemt      = domaintarget.find('.harga-asli');
            var actualprice     = priceelemt.attr('data-actual-price');
            var cycleelem       = domaintarget.find("select[name='registerDomainBillingcycle']");
            var btnTransfer     = domaintarget.find(".btn-transfer-domain");
            var actualPriceInBtn = btnTransfer.attr('data-actual-price')

            if(isFreedomain){
                priceelemt.html("FREE!");
                priceelemt.attr('data-price', 0);
                priceelemt.addClass('label label-success');
                cycleelem.attr('disabled','disabled');
                btnTransfer.attr('data-transfer-price',0)
            }else{
                priceelemt.html(actualprice);
                priceelemt.attr('data-price', actualprice);
                priceelemt.removeClass('label label-success');
                cycleelem.removeAttr('disabled');
                btnTransfer.attr('data-transfer-price',actualPriceInBtn)
            }

        },
        gunakanDomain: function () {
            $(".btn-gunakan-domain").on('click', function () {
                $(this).find('i').removeClass('hidden')
                $(this).find(".text").addClass('hidden')
                $(this).attr('disabled', 'disabled')

                var parent = $(this).parents(".display-domain")
                var domain = parent.find(".name .domain-name").html().trim()
                var index = $(this).parents(".panel").attr("data-index")
                var panel = $(this).parents(".panel")

                CartsSDK.events.addDomainForService(index, domain, "use")

                parent.find("button[name='delete-domain']").removeClass("hidden")

                // Remove alert
                var section = $(this).parents(".section-tambah-domain")
                if (section.find(".form-title").next().hasClass("alert")) {
                    section.find(".form-title").next().remove()
                }

                // HTML domain in panel
                var panelDomain = $(this).parents(".panel").find(".header-right-panel .domain-name")
                panelDomain.html(domain)
            })
        },
        transferDomain: function () {
            $('.btn-transfer-domain').on('click', function () {
                var domain = $(this).parents(".display-domain").find(".name .domain-name").html()
                var price = {
                    default: $(this).attr('data-transfer-price'),
                    actual: $(this).attr('data-actual-price'),
                }

                ServicesSDK.render.renderInputEppCode($(this), domain, price)
            })
        },
        buyDomain: function () {
            $(".panel[data-type='product'] button[name='buy-domain']").off().on('click', function () {
                var parent = $(this).parents(".display-domain")
                var domain = parent.find(".name .domain-name").html()
                var price = parent.find(".harga-asli").attr('data-price');
                var actualprice = parent.find(".harga-asli").attr('data-actual-price');
                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
                var index = $(this).parents(".panel").attr("data-index")
                var duplicateDomin = $(this).parents('.wrapper-domain-available').next().find('.duplicate-domain')
                var epp = 0;
                var panel = $(this).closest(".panel");
                var tld = ServicesSDK.utils.getTld(domain);

                var findDomain = CartsSDK.events.findProductDomain(index, domain)
                if (findDomain) {
                    duplicateDomin.removeClass('hidden')
                    return
                }
                duplicateDomin.addClass('hidden')
                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                )

                CartsSDK.events.addDomainForService(index, domain, "register", billingcycle, price, actualprice, epp, pricetrough)

                // Remove alert
                var section = $(this).parents(".section-tambah-domain")
                if (section.find(".form-title").next().hasClass("alert")) {
                    section.find(".form-title").next().remove()
                }

                // Change button
                $(this).addClass("hidden")
                parent.find("button[name='delete-domain']").removeClass("hidden")

                // HTML domain in panel
                var panelDomain = $(this).parents(".panel").find(".header-right-panel .domain-name")
                panelDomain.html(domain)

                // Get TLD Domain

                var findPersyaratanDomain = DomainSDK.utils.findTld(tld)
                if (findPersyaratanDomain) {
                    panel.find(".persyaratan-domainid").removeClass("hidden")
                }

                // Remove input form
                panel.find("input[name='domain']").val('')
                panel.find("input").tooltip('destroy');
            })

            $("#section-add-domain button[name='buy-domain']").on('click', function () {
                var parent = $("#section-add-domain")
                var domain = parent.find(".name .domain-name").html()
                var price = parent.find(".harga-asli").attr('data-price');
                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
                var tld = ServicesSDK.utils.getTld(domain);
                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                );

                var objDomain = CartsSDK.events.addDomainOnly(domain, "register", billingcycle, price, "", tld, pricetrough)

                var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domain);
                if (findDomainInListReturnIndex) {
                    ServicesSDK.render.domainSection(findDomainInListReturnIndex, objDomain)
                }

                parent.find("input[name='domain']").val('')
                parent.find("input").tooltip('destroy');

                parent = $(this).closest('.col-md-12');
                parent.remove();

                ServicesSDK.events.allMinimizePanel();
            })
        },
        buyDomainSerupa: function () {
            $(".panel[data-type='product'] button[name='buy-domain-serupa']").off().on('click', function () {
                var parent = $(this).parents(".display-domain")
                var domain = parent.find(".name .domain-name").html()
                var price = parent.find(".harga-asli").html().trim()
                var billingcycle = parent.find("select[name='registerDomainBillingcycleSuggested']").val()
                var tld = ServicesSDK.utils.getTld(domain);
                var panel = $(this).parents('.panel')
                var index = panel.attr("data-index")
                console.log(price)
                if (isNaN(price))
                    price = price.slice(0, -3);
                    price = price.replace(/\D/g,'');


                CartsSDK.events.addDomainSuggestedForService(domain, "register", billingcycle, price, tld, index)

                var numbPrice = CartsSDK.utils.onlyGetNumber(price)
                var objDomain = {
                    type: "domains",
                    domain: domain,
                    domaintype: "register",
                    price: numbPrice,
                    billingcycle: billingcycle,
                    tld: tld,
                    minimize: false
                }
                $(this).parents(".wrapper-domain-available").addClass('hidden')

                var findDomain = CartsSDK.events.findDomainInProduct(index, domain)
                if (findDomain) {
                    panel.find('.hasilpencarian-domain').html('')

                    var cart    = CartsSDK.events.getCart()
                    ServicesSDK.render.showDomainFromLocalstorage(panel, cart[index])

                    // Remove alert
                    var section = $(this).parents(".maximize-panel").find(".section-tambah-domain")
                    if (section.find(".form-title").next().hasClass("alert")) {
                        section.find(".form-title").next().remove()
                    }
                    var panelDomain = $(this).parents(".panel").find(".header-right-panel .domain-name")
                    panelDomain.html(domain)
                    var inputDomain = $(this).parents(".panel")
                        .find(".section-tambah-domain")
                        .find("input[name='domain']")
                    inputDomain.val(domain)
                }

                var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domain);
                if (findDomainInListReturnIndex) {
                    ServicesSDK.render.domainSection(findDomainInListReturnIndex, objDomain)
                }

                ServicesSDK.events.allMinimizePanel();
            })

            $("#section-add-domain button[name='buy-domain-serupa']").on('click', function () {
                var parent = $(this).closest(".wrapper-domain-available")
                var domain = parent.find(".name .domain-name").html()
                var price = parent.find(".harga-asli").html().trim()
                var billingcycle = parent.find("select[name='registerDomainBillingcycleSuggested']").val()
                var tld = ServicesSDK.utils.getTld(domain);
                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                );
                var objDomain = CartsSDK.events.addDomainOnly(domain, "register", billingcycle, price, "", tld, pricetrough)

                var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domain);
                if (findDomainInListReturnIndex) {
                    ServicesSDK.render.domainSection(findDomainInListReturnIndex, objDomain)
                }

                parent = $(this).closest('.col-md-12');
                parent.remove();

                ServicesSDK.events.allMinimizePanel();
            })
        },
        inputEppCode: function () {
            $(".display-domain input[name='eppcode']").on("keyup", function () {
                var epp = $(this).val()

                if (epp.length < 4) {
                    return
                }

                var button = $(this).parent().find('.submit-eppcode')

                button.removeAttr('disabled')
            })

            $(".panel[data-type='product'] .display-domain .submit-eppcode").off().on("click", function () {
                var parent = $(this).parents(".display-domain")
                var domain = parent.find(".name .domain-name").html().trim()
                var price = parent.find(".harga-asli").attr('data-price');
                var actualprice = parent.find(".harga-asli").attr('data-actual-price');
                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
                var index = $(this).parents(".panel").attr("data-index")
                var deleteEppcode = parent.find('.delete-eppcode')
                var epp = parent.find('input[name="eppcode"]').val();
                var tld = ServicesSDK.utils.getTld(domain);
                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                );

                CartsSDK.events.addDomainForService(index, domain, "transfer", billingcycle, price, actualprice, epp, pricetrough)

                $(this).addClass('hidden');
                deleteEppcode.removeClass('hidden');

                parent.find('input[name="eppcode"]').attr('disabled','disabled')

                // Remove alert
                var section = $(this).parents(".section-tambah-domain")
                if (section.find(".form-title").next().hasClass("alert")) {
                    section.find(".form-title").next().remove()
                }

                // HTML domain in panel
                var panelDomain = $(this).parents(".panel").find(".header-right-panel .domain-name")
                panelDomain.html(domain)

                // Show persyaraan domain

                var findPersyaratanDomain = DomainSDK.utils.findTld(tld)
                var panel = $(this).closest('.panel')
                if (findPersyaratanDomain) {
                    panel.find(".persyaratan-domainid").removeClass("hidden")
                    panel.find(".persyaratan-domainid ul").html(findPersyaratanDomain.persyaratan)
                }

                // Remove form input domain
                panel.find("input[name='domain']").val('')
                panel.find("input").tooltip('destroy');
            })

            $("#section-add-domain .display-domain .submit-eppcode").on('click', function () {
                var parent = $("#section-add-domain")
                var domain = parent.find(".name .domain-name").html().trim()
                var price = parent.find(".harga-asli").attr('data-price');
                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
                var tld = ServicesSDK.utils.getTld(domain);
                var epp = parent.find('input[name="eppcode"]').val()

                var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                    tld.substring(1),
                    billingcycle
                );

                var objDomain = CartsSDK.events.addDomainOnly(domain, "transfer", billingcycle, price, epp, tld, pricetrough)

                var findDomainInListReturnIndex = CartsSDK.events.findDomainInCartList(domain);
                if (findDomainInListReturnIndex) {
                    ServicesSDK.render.domainSection(findDomainInListReturnIndex, objDomain)
                }

                // Empty form input domain
                parent.find("input[name='domain']").val('')
                parent.find("input").tooltip('destroy');

                parent = $(this).closest('.col-md-12');
                parent.remove();

                ServicesSDK.events.allMinimizePanel();
            })
        },
        removeProduct: function () {
            $(".remove-panel").on("click", function () {
                var panel = $(this).parents(".panel")
                var domainSerupa = panel.next(".section-domain-serupa")

                var index = parseInt(panel.attr("data-index"));
                var pid = panel.attr("data-pid");

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        )

                        panel.remove()
                        domainSerupa.remove()

                        if (panel.hasClass('panel-cross-sales')){
                            $('body').removeClass('modal-open');
                            $('.modal-backdrop').hide();
                        }

                        CartsSDK.events.removeProduct(index)
                        CartsSDK.events.removeCrossSaleWithParentProduct(index, pid)
                        ServicesSDK.events.showFormOrder();
                    }
                })
            })
        },
        removeProductInCart: function () {
            $(".item[data-type='cart'] .remove-section-cart").off().on("click", function () {
                var section = $(this)
                var index   = parseInt(section.attr("data-index"));
                var pid   = section.attr("data-pid");

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        )

                        CartsSDK.events.removeProduct(index)
                        CartsSDK.events.removeCrossSaleWithParentProduct(index, pid)
                        ServicesSDK.events.showFormOrder();
                    }
                })
            })
        },
        tambahLayanan: function () {
            $(".dropdown_select_wrapper[data-type='new_service'] .accordion__item__content ul li").on('click', function () {
                var gid = $(this).attr("data-groupid")

                // Close modal and dropdown
                $('.modal-content-order .close').click()
                $(this).parents('.accordion__item__content').prev().click()

                var pid = Orderconfigs.product_in_group[gid][0]

                CartsSDK.events.addProduct(pid)
                ServicesSDK.events.showFormOrder()
                ServicesSDK.events.allMinimizePanel();

                // Remove form domain untuk halaman domain
                DomainSDK.events.hideTambahDomain()
            })
        },
        counterButtonChange: function () {
            $('.btn-plus, .btn-minus').off().on('click', function(e) {
                const isNegative = $(e.target).closest('.btn-minus').is('.btn-minus');
                const input = $(e.target).closest('.input-group').find('input');
                if (input.is('input')) {
                    input[0][isNegative ? 'stepDown' : 'stepUp']()
                }

                var index = $(this).parents('.panel').attr('data-index');
                var id = input.attr('data-id');
                var value = input.val()

                var formInput   = $(this).parents(".section-configoptions").find(".inline-group")
                var max         = formInput.find('.config-quantity').attr('max');
                var min         = formInput.find('.config-quantity').attr('min');
                if (parseInt(value) >= min || parseInt(value) <= max){
                    formInput.find("input").tooltip('destroy');
                }

                CartsSDK.events.updateConfigOptionsType4(index, id, value)
                ServicesSDK.events.removeProductInCart();
            })

            $('.config-quantity').off().on('change', function () {
                var formInput   = $(this).parents(".section-configoptions").find(".inline-group")
                var index       = $(this).parents('.panel').attr('data-index');
                var id          = $(this).attr('data-id');
                var max         = $(this).attr('max');
                var min         = $(this).attr('min');
                var value       = $(this).val()

                formInput.find("input").tooltip('destroy');
                var title = "";
                if (value == '') {
                    formInput.find("input").addClass("danger-tooltip")
                    title = "Isian tidak boleh kosong.";
                    var value = min
                    $(this).val(min)
                }else if (parseInt(value) > max) {
                    formInput.find("input").addClass("danger-tooltip")
                    title = "Isian melebihi batas maksimal.";
                    var value = max
                    $(this).val(max)
                }
                else if (parseInt(value) < min) {
                    formInput.find("input").addClass("danger-tooltip")
                    title = "Isian melebihi batas minimal.";
                    var value = min
                    $(this).val(min)
                }else if (parseInt(value) >= min || parseInt(value) <= max){
                    formInput.find("input").tooltip('destroy');
                    title = ""
                }

                formInput.find("input").attr("data-original-title", title)
                formInput.find("input").tooltip().mouseover()

                CartsSDK.events.updateConfigOptionsType4(index, id, value)
                ServicesSDK.events.removeProductInCart();
            })
        },
        removeProductDomain: function () {
            $(".panel[data-type='product'] button[name='delete-domain']").off().on('click', function () {
                var parent = $(this).parents(".display-domain")
                var domainName = parent.find(".name .domain-name").html()
                var index = $(this).parents(".panel").attr("data-index")
                var panel = $(this).closest(".panel")

                Swal.fire({
                    title: 'Wadidaw',
                    text: 'Kamu yakin menghapus domain '+ domainName,
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    // cancelButtonColor: '#d33',
                    confirmButtonText: 'Hapus'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Domain Berhasil Dihapus',
                            'Kamu telah menghapus domain <b>'+ domainName+'</b>',
                            'success'
                        )

                        CartsSDK.events.removeProductDomainWithIndexAndName(index, domainName)

                        // Change button
                        $(this).addClass("hidden")
                        parent.find("button[name='buy-domain']").removeClass("hidden")

                        DomainSDK.events.hidePersyaratanDomain(panel)
                    }
                })
            })
        },
        removeDomainTransfer: function () {
            $(".panel[data-type='product'] .display-domain .delete-eppcode").off().on("click", function () {
                var parent = $(this).parents(".display-domain")
                var domainName = parent.find(".name .domain-name").html()
                var index = $(this).parents(".panel").attr("data-index")
                var element = $(this).parents('.hasilpencarian-domain')

                Swal.fire({
                    title: 'Wadidaw',
                    text: 'Kamu yakin menghapus domain '+ domainName,
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    // cancelButtonColor: '#d33',
                    confirmButtonText: 'Hapus'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Domain Berhasil Dihapus',
                            'Kamu telah menghapus domain <b>'+ domainName+'</b>',
                            'success'
                        )

                        CartsSDK.events.removeProductDomainWithIndex(index)

                        // Change button
                        $(this).addClass("hidden")
                        // parent.find(".submit-eppcode").removeClass("hidden")
                        ApiHelper.checkAvailabilityDomain(domainName, function (data) {
                            $(this).parents('.hasilpencarian-domain').html('')
                            ServicesSDK.events.checkReturnDomainTransfer(element, domainName, data.result)
                        });
                    }
                })
            })
        },
        checkReturnDomainTransfer: function (element, domain, data) {
            var parent = element.parents(".section-tambah-domain");
            ServicesSDK.render.hasilPencarianDomain(parent, domain, data)
        },
        removeProductDomainSuggested: function () {
            $("button[name='delete-domain-serupa']").on('click', function () {
                var parent = $(this).parents(".row.wrapper-domain-available")
                var domainName = parent.find(".name .domain-name").html()
                var InParent = $(this).parents(".section-domain-serupa")
                var prevElm = InParent.prev()
                var index = prevElm.attr("data-index")

                Swal.fire({
                    title: 'Wadidaw',
                    text: 'Kamu yakin menghapus domain '+ domainName,
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    // cancelButtonColor: '#d33',
                    confirmButtonText: 'Hapus'
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                            'Domain Berhasil Dihapus',
                            'Kamu telah menghapus domain <b>'+ domainName+'</b>',
                            'success'
                        )

                        CartsSDK.events.removeProductDomainWithIndexAndName(index, domainName)

                        // Change button
                        $(this).addClass("hidden")
                        parent.find("button[name='buy-domain-serupa']").removeClass("hidden")
                    }
                })
            })
        },
        showMoreDomain:function (nextElement, data, nextSliced) {
            $('.btn-domain-serupa').off().on('click', function () {
                var domainsSliced = {};
                var sliced = nextSliced + 5;

                for (domain in data) {
                    if (!data[domain].isAvailable) {
                        continue
                    }
                    domainsSliced[domain] = data[domain]
                };

                domainsSliced = Object.keys(domainsSliced).slice(nextSliced, sliced).reduce((result, key) => {
                    result[key] = domainsSliced[key];
                    return result;
                }, {});

                if (sliced > data.length) {
                    nextElement.find(".btn-domain-serupa").addClass("hidden")
                }
                ServicesSDK.render.showDomainSerupa(nextElement, domainsSliced)
                ServicesSDK.events.showMoreDomain(nextElement, data, sliced)

            })
        },
        minimizePanel: function () {
            $(".minimize-icon").off().on('click', function () {
                var index = $(this).parents('.panel').attr('data-index')
                var bodyPanel = $(this).parents('.panel-heading-order').next()
                var maximizeIcon = $(this).parent().find('.maximize-icon')
                var maximizePanel = bodyPanel.find('.maximize-panel')
                var minimizePanel = bodyPanel.find('.minimize-panel')

                maximizeIcon.removeClass('hidden');
                $(this).addClass('hidden')

                minimizePanel.removeClass('hidden')
                maximizePanel.addClass('hidden')

                // Cart
                CartsSDK.events.changeMinimize(index, true)
            })
        },
        maximizePanel: function () {
            $(".maximize-icon").off().on('click', function () {
                var index = $(this).parents('.panel').attr('data-index')
                var bodyPanel = $(this).parents('.panel-heading-order').next()
                var minimizeIcon = $(this).parent().find('.minimize-icon')
                var minimizePanel = bodyPanel.find('.minimize-panel')
                var maximizePanel = bodyPanel.find('.maximize-panel')

                minimizeIcon.removeClass('hidden');
                $(this).addClass('hidden')

                maximizePanel.removeClass('hidden')
                minimizePanel.addClass('hidden')

                // Cart
                CartsSDK.events.changeMinimize(index, false)
            })
        },
        allMinimizePanel: function() {
            $(".minimize-icon").click()

            var lastPanel = $("#order-forms-wrapper .panel").last();
            lastPanel.find(".maximize-icon").click()
        },
        disableInputSpecial: function (element) {
            element.find('.section-configoptions [name="quantity"]').keydown(function (e) {
                // console.log(e.keyCode);
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                    // Allow: Ctrl/cmd+A
                    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: Ctrl/cmd+C
                    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: Ctrl/cmd+X
                    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        },
        showPanelService: function () {
            $(".title").off().on('click', function () {
                var data_id = $(this).data('id');

            })
        },
        tutupDomainSerupa: function () {
            $("button.tutup-spotlight").on('click', function () {
                var sectionDomainSerupa = $(this).parents(".section-domain-serupa")
                var listDomain = sectionDomainSerupa.find(".show-domain-serupa")

                $(this).addClass("hidden")
                sectionDomainSerupa.find(".buka-spotlight").removeClass("hidden")
                listDomain.addClass("hidden")
                listDomain.next().addClass("hidden");
            })
        },
        bukaDomainSerupa: function () {
            $("button.buka-spotlight").on('click', function () {
                var sectionDomainSerupa = $(this).parents(".section-domain-serupa")
                var listDomain = sectionDomainSerupa.find(".show-domain-serupa")

                $(this).addClass("hidden")
                sectionDomainSerupa.find(".tutup-spotlight").removeClass("hidden")
                listDomain.removeClass("hidden")
                listDomain.next().removeClass("hidden");
            })
        },
        gunakanDomainDariCart: function () {
            $("#order-forms-wrapper input[name='gunakan_domain_dari_cart']").off().on('change', function () {
                var parent      = $(this).parents('.panel')

                var useDomainInCart = false;
                if ($(this).is(':checked')) {
                    useDomainInCart = true
                } else {
                    useDomainInCart = false
                }

                var cart    = CartsSDK.events.getCart()
                var domain  = []
                cart.forEach(function (data) {
                    if (data.type == "domains") {
                        domain.push(data)
                    }
                })
                ServicesSDK.render.pilihDomain(parent, domain, useDomainInCart);
                
            })            
        },
        changeSelectDomain: function () {
            $(".dropdown_select_wrapper select[name='pilih_domain']").on('change',function () {
                var value       = $(this).find(':selected').val()
                ServicesSDK.events.gunakanSelectedDomain(value);
            })
        },
        gunakanSelectedDomain: function (value) {
            $(".dropdown_select_wrapper button[name='gunakan_pilih_domain']").on('click',function () {

                var cart        = CartsSDK.events.getCart()
                var parent      = $(this).parents('.panel')
                var getIndex    = parent.attr('data-index')
                
                cart.forEach(function (data, index) {
                    switch (data.domain) {
                        case value:
                            var type = data.domaintype;
                            var eppcode = "";
                            if (type == "transfer") {
                                eppcode = data.epp;
                            }
                            var tld = ServicesSDK.utils.getTld(data.domain)
                            var pricetrough = ServicesSDK.utils.getStrikePriceDomain(
                                tld.substring(1),
                                data.billingcycle
                            );

                            CartsSDK.events.addDomainForService(getIndex, data.domain, data.domaintype, data.billingcycle, data.price, data.actualprice, eppcode, pricetrough)
                            CartsSDK.events.removeDomainWithIndex(index)
                            ServicesSDK.events.showFormOrder();
                            break;
                    }
                })
                
            })
        },
        checkReferralCode: function () {
            var referral = Orderconfigs.referral_promocode;
            if (referral == null) {
                return
            }
            if (referral === undefined || referral.length == 0) {
                return;
            }

            // Check promo
            var promo = CartsSDK.events.checkPromoExists();
            if (promo) {
                if (promo.item.referrer_id == Orderconfigs.user_id) {

                    CartsSDK.events.removeProduct(promo.index)
                    Swal.fire({
                        title: "Maaf Sob!",
                        html: "Kode promo referral tidak bisa kamu gunakan pada akun yang sama!",
                        type: 'warning',
                        confirmButtonText: "Tutup",
                    })
                }
                return;
            }

            if (referral[0].referrer_id == Orderconfigs.user_id) {
                return;
            }

            CartsSDK.events.addPromo(referral)
            CartsSDK.render.cartPanel()
        },
        showTooltipUpsale: function (element, defaultBilling, billingcycle) {
            const list = ['monthly', 'quarterly', 'semiannually','annually', 'biennially','triennially']
            const listTahunan = ['','annually', 'biennially','triennially']

            let tahunPembanding = 'annually'
            let jumlahTahunPembanding = 1

            list.forEach((item, index) => {
                const hargaCoret = element.find("div[data-billingcycle='" + item +"'] .harga-coret").attr('data-coret')

                let hargaBulanan = 0
                switch (item) {
                    case "monthly":
                        hargaBulanan = billingcycle[item]
                        break
                    case "quarterly":
                        hargaBulanan = billingcycle[item]/3
                        break
                    case "semiannually":
                        hargaBulanan = billingcycle[item]/6
                        break
                    case "annually":
                        hargaBulanan = billingcycle[item]/12
                        tahunPembanding = 'biennially'
                        jumlahTahunPembanding = 2
                        break
                    case "biennially":
                        hargaBulanan = billingcycle[item]/24
                        tahunPembanding = 'triennially'
                        jumlahTahunPembanding = 3
                        break
                }

                if (hargaBulanan <= 0 || billingcycle[tahunPembanding] <= 0 || hargaCoret == "true") {
                    return
                }

                let hargaBulananXtahun = 0
                for (let i = jumlahTahunPembanding; i <=3; i++) {
                    hargaBulananXtahun = hargaBulanan * 12 * i

                    if(hargaBulananXtahun > billingcycle[listTahunan[i]]) {
                        jumlahTahunPembanding = i
                        break
                    }

                    jumlahTahunPembanding = i
                }

                const selisihHarga =  hargaBulananXtahun - billingcycle[listTahunan[jumlahTahunPembanding]]
                if (selisihHarga <= 0) {
                    return;
                }
                const textDiskon = "Hemat " + ServicesSDK.utils.changeToRupiah(selisihHarga)

                element.find(".section-billingcycle div[data-billingcycle='" + item + "']").closest('li').attr('data-placement','bottom')
                element.find(".section-billingcycle div[data-billingcycle='" + item + "']").closest('li').attr('data-html','true')
                element.find(".section-billingcycle div[data-billingcycle='" + item + "']").closest('li')
                    .attr('data-title', textDiskon + ', dengan pilih durasi langganan ' +
                        ServicesSDK.utils.changeFormatBilling(listTahunan[jumlahTahunPembanding]))

                if (item != defaultBilling.billingcycle) {
                    return
                }

                element.find(".section-billingcycle div[data-billingcycle='" + item + "']").closest('li')
                    .tooltip({placement: 'bottom',trigger: 'manual'}).tooltip('show');
            })
        },
        showTooltipGimmick:function (element){
            var pid = element.attr('data-pid');
            if(!Orderconfigs.product_gimmickselection[pid]){
                return
            }
            if(Orderconfigs.product_gimmickselection[pid].gimmick_text!=null){
                var tooltipelement = element.find('.section-pilihpaket .option[data-pid="'+pid+'"]')
                    .closest('li');
                tooltipelement.attr('data-placement','top');
                tooltipelement.attr('data-html','true');
                tooltipelement.attr('data-title',Orderconfigs.product_gimmickselection[pid].gimmick_text);
                tooltipelement.tooltip({placement: 'top',trigger: 'manual'}).tooltip('show');
            }
        },
        fillHargaCoret: function (element, billingcycle) {
            var pid = element.attr('data-pid');
            const listBulanan = ['monthly', 'quarterly', 'semiannually','annually', 'biennially', 'triennially']
            const listTahunan = ['annually', 'biennially', 'triennially']

            const strike_price_default = {
                monthly:0,
                quarterly:0,
                semiannually:0,
                annually:0,
                biennially:0,
                triennially:0
            };

            let hargaBulanan = 0
            listBulanan.forEach(item => {
                if (billingcycle[item] < 0 || hargaBulanan > 0) {
                    return
                }

                switch (item) {
                    case "monthly":
                        hargaBulanan = billingcycle[item]
                        break
                    case "quarterly":
                        hargaBulanan = billingcycle[item]/3
                        break
                    case "semiannually":
                        hargaBulanan = billingcycle[item]/6
                        break
                    case "annually":
                        hargaBulanan = billingcycle[item]/12
                        break
                    case "biennially":
                        hargaBulanan = billingcycle[item]/24
                        break
                    case "triennially":
                        hargaBulanan = billingcycle[item]/36
                        break
                }
            })
            listTahunan.forEach(item => {
                let misalHargaTahunan = 0

                switch (item) {
                    case "annually":
                        misalHargaTahunan = hargaBulanan * 12
                        break
                    case "biennially":
                        misalHargaTahunan = hargaBulanan * 24
                        break
                    case "triennially":
                        misalHargaTahunan = hargaBulanan * 36
                        break
                }

                if (misalHargaTahunan <= billingcycle[item]) {
                    return
                }
                strike_price_default[item] = misalHargaTahunan;

                // element.find("div[data-billingcycle='" + item +"'] .harga-coret")
                //     .html("<del>" + ServicesSDK.utils.changeToRupiah(misalHargaTahunan) + "</del>")
                // element.find("div[data-billingcycle='" + item +"'] .harga-coret").attr('data-coret','true')
            });

            Object.keys(strike_price_default).forEach(strike_cycle=>{
                var strike_price_value = strike_price_default[strike_cycle];
                if(Orderconfigs.product_gimmickprice[pid]){
                    Orderconfigs.product_gimmickprice[pid].forEach(strikeprice=>{
                        if(
                            strikeprice.billingcycle == strike_cycle &&
                            strikeprice.strike_price !=null
                        ){
                            strike_price_value = strikeprice.strike_price;
                        }
                    });
                }
                if(strike_price_value>0){
                    element
                        .find('.section-billingcycle .option[data-billingcycle='+strike_cycle+'] .harga-coret')
                        .html("<del>" + ServicesSDK.utils.changeToRupiah(strike_price_value) + "</del>");
                    element
                        .find('.section-billingcycle .option[data-billingcycle='+strike_cycle+'] .harga-coret')
                        .attr('data-coret','true');
                }
            });
        },
        toggleAddonCrossSale: function () {
            $('input[name=addon]').change(function() {
                const index = $(this).closest(".panel").attr('data-index')
                const pid = $(this).closest(".panel").attr('data-pid')
                const value = $(this).val()
                const type = $(this).attr('data-type')
                let checked = false

                if ($(this).is(":checked")) {
                    checked = true
                }

                const inputAddon = {
                    index,
                    pid,
                    value,
                    type,
                    checked
                }

                switch (type) {
                    case "addon":
                        ServicesSDK.events.crossSaleAddon(inputAddon)
                        break
                }

                // TYPE ADD ON
                // check type
                // menambahkan apa menghapus
                // menambahkan ke cart dimasukkan ke index tersebut
                // data yg dibutuhkan: id, billingcycle, price
            });
        },
        crossSaleAddon: function (input) {
            const product_crosssale = Orderconfigs.products[input.pid].cross_sales[input.value]
            if (!input.checked) {
                CartsSDK.events.deleteAddonCrossSale(input.index, input.value)
                return;
            }

            let billingcycle = product_crosssale.pricing.minprice.billingcycle
            let price = product_crosssale.pricing.minprice.price
            let title = product_crosssale.details.name
            let type = product_crosssale.details.paytype

            if (type == "onetime") {
                CartsSDK.events.insertAddonCrossSale(input.index, input.value, title, type, billingcycle, price)
                return;
            }

            let billingcycleProduct = $("#panel" + input.index + " .dropdown_select_wrapper[data-type=billingcycle] " +
                "ul.default_option li .option").attr('data-billingcycle')

            if (product_crosssale.pricing.productpricing[billingcycleProduct] > 0) {
                billingcycle = billingcycleProduct
                price = product_crosssale.pricing.productpricing[billingcycleProduct]
            }

            CartsSDK.events.insertAddonCrossSale(input.index, input.value, title, type, billingcycle, price)
        },
        fillGimmickBilling: function (element, billingcycle){
            var pid = element.attr('data-pid');
            if(!Orderconfigs.product_gimmickprice[pid]){
                return;
            }
            var gimmick = Orderconfigs.product_gimmickprice[pid];

            gimmick.forEach(gimmickitem=>{
                element.find('.section-billingcycle .option[data-billingcycle='+gimmickitem.billingcycle+'] .title .gimmick-price')
                    .html(gimmickitem.text_gimmick);
            });
        },
        fillHargaCoretDomain: function (element, tld, regperiod){
            // console.log(element);
            var strike_price = 0;
            /*Fill Harga Coret*/
            strike_price = ServicesSDK.utils.getStrikePriceDomain(
                tld, regperiod
            );
            // console.log(strike_price);
            if(strike_price==0){
                element.find('.harga-coret').hide();
                return;
            }
            element.find('.harga-coret').html(
                ServicesSDK.utils.changeToRupiah(strike_price)
            );
            element.find('.harga-coret').show();
        },
        masterCrossSale: function (index, pid) {
            let billingcycleProduct = $("#panel" + index + " .dropdown_select_wrapper[data-type=billingcycle] " +
                "ul.default_option li .option").attr('data-billingcycle')
            var crosssale_item = null
            if (Orderconfigs.products[pid].hasOwnProperty('master_cross_sales')){
                crosssale_item = Orderconfigs.products[pid].master_cross_sales[billingcycleProduct]
            }
            if(crosssale_item){
                $("#panel" + index + " .section-cross-sales").html("")
                crosssale_item.forEach(function (item) {
                    ServicesSDK.render.sectionCrossSales(index, item)
                })
            }else {
                $("#panel" + index + " .section-cross-sales").html("")
            }
        },
        addCrossSales: function () {
            $('input[name="check_crosssales"]').off().on('click',function() {
                var element = $(this).closest(".panel")
                const product_crosssale = $(this).val()
                const index = element.attr('data-index')
                const pid = element.attr('data-pid')
                var parent = $(this).closest('.cross-sales-content')

                if ($(this).is(":checked")) {
                    let billingcycleProduct = $("#panel" + index + " .dropdown_select_wrapper[data-type=billingcycle] " +
                        "ul.default_option li .option").attr('data-billingcycle')
                    const crosssale_item = Orderconfigs.products[pid].master_cross_sales[billingcycleProduct]

                    if (crosssale_item) {
                        crosssale_item.forEach(function (item) {
                            if (item.product_id == product_crosssale) {
                                if (item.product_details.details.paytype == "onetime"){
                                    CartsSDK.events.insertAddonCrossSale(index, product_crosssale, item.product_details.details.name, item.product_details.details.paytype, item.product_details.pricing.minprice.billingcycle, item.product_details.pricing.minprice.price, pid, item.product_details.details.gid)
                                }else{
                                    CartsSDK.events.addProduct(product_crosssale, null, [], "", "", pid)
                                }
                                ServicesSDK.events.showFormOrder()
                                var findIndex = CartsSDK.events.checkCrossSaleExists(product_crosssale, pid)

                                if (findIndex){
                                    $("#panel" + findIndex.index).modal({backdrop: 'static', keyboard: false})
                                    parent.find('button[name="edit_crosssales"]').removeClass('hidden')
                                    parent.find('.panel-penawaran').removeClass('penawaran-primary')
                                }
                            }
                        })
                    }
                }else {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Deleted!',
                                'Your product has been deleted.',
                                'success'
                            )

                            parent.find('button[name="edit_crosssales"]').addClass('hidden')
                            parent.find('.panel-penawaran').addClass('penawaran-primary')
                            var cross = CartsSDK.events.checkCrossSaleExists(product_crosssale, pid)
                            CartsSDK.events.removeProduct(cross.index)
                            ServicesSDK.events.showFormOrder();
                        }
                    })
                }
            });
        },
        editCrossSaleSelected: function () {
            $('button[name="edit_crosssales"]').off().on('click',function() {
                const product_crosssale = $(this).closest('.cross-sales-content').attr('data-crosssales')
                const pid = $(this).closest(".panel").attr('data-pid')
                const index = $(this).closest(".panel").attr('data-index')
                var findIndex = CartsSDK.events.checkCrossSaleExists(product_crosssale, pid)
                if (findIndex){
                    $("#panel" + findIndex.index).modal({backdrop: 'static', keyboard: false})
                }
            })
        },
        simpanCrossSale: function () {
            $('button[name="simpan_crosssales"]').off().on('click', function () {
                const index = $(this).closest(".panel").attr('data-index')
                var parent = $(this).closest(".panel")
                if (parent.find('.section-customfields input').length > 0) {
                    var input = parent.find('.section-customfields input').val()
                    var section = parent.find(".section-customfields .config_text")
                    var validation = CustomfieldSDK.utils.regexIpAddress(input);
                    if (validation) {
                        section.find(".alert").remove()
                        $("#panel" + index).modal('hide')
                    } else {
                        var message = "Form di bawah ini harus format IP sob!"
                        if (input.length == 0) {
                            message = "Form harus diisi sob!"
                        }
                        section.find(".alert").remove()
                        section.prepend(__layouts.alertError({
                            message: message
                        }))
                    }
                }else {
                    $("#panel" + index).modal('hide')
                }
            })
        }
    },
    utils: {
        changeToRupiah: function (money) {
            if (money == undefined) {
                return money
            }
            var reverse = money.toString().split('').reverse().join(''),
                ribuan = reverse.match(/\d{1,3}/g);

            if (ribuan.length > 1 && ribuan[0].length < 3) {
                ribuan.shift()
            }

            ribuan = ribuan.join('.').split('').reverse().join('');
            return 'Rp. ' + ribuan;
        },
        changeFormatBilling: function (billing) {
            switch (billing) {
                case "monthly":
                    return "1 Bulan"
                    break
                case "quarterly":
                    return "3 Bulan"
                    break
                case "semiannually":
                    return "6 Bulan"
                    break
                case "annually":
                    return "1 Tahun"
                    break
                case "biennially":
                    return "2 Tahun"
                    break
                case "triennially":
                    return "3 Tahun"
                    break
            }
        },
        regexDomain: function (domain) {
            var patt = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]?$/g;
            var res = patt.test(domain);

            if (!res) {
                return false
            }

            var dot = domain.match(/\./g).length;

            let domain_is_id = ServicesSDK.utils.validateTldID(domain)
            if(domain_is_id && dot <= 3)
               return true

            if (dot > 2) {
                return false
            }

            return true
        },
        regexNumber: function (value) {
            var numbers = /^[0-9]+$/;
            var res = numbers.test(value)

            if (!res) {
                return false
            }

            return true
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
        showDetailProducts: function (details) {
            details = details.replace(/<[^>]*>?/gm, '').trimStart().split('\n')[0];
            return details
        },
        getStrikePriceDomain: function (tld, regperiod){
            if(Orderconfigs.hasOwnProperty('domains_gimmick')){
                if(Orderconfigs.domains_gimmick.hasOwnProperty(tld)) {
                    // console.log(Orderconfigs.domains_gimmick[tld]);
                    return parseInt(Orderconfigs.domains_gimmick[tld].harga_coret) * parseInt(regperiod);
                }
            }
            return 0;
        },
        validateTldID: function(domain){
            let substr_tld = domain.substr(-3)
            if(substr_tld == ".id")
               return true
            
            return false
        }
    }
};

module.exports = ServicesSDK;
