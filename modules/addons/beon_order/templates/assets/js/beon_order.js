/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Created by agam on 04/05/17.
	 */

	var MainLayout      = __webpack_require__(1);
	var Orderconfigs    = __webpack_require__(3);
	var ServicesSDK     = __webpack_require__(5);
	var DomainSDK       = __webpack_require__(57);
	var CartSDK         = __webpack_require__(7);

	const asyncLocalStorage = {
	    setItem: function (key, value) {
	        return Promise.resolve().then(function () {
	            localStorage.setItem(key, value);
	        });
	    },
	    getItem: function (key) {
	        return Promise.resolve().then(function () {
	            return localStorage.getItem(key);
	        });
	    }
	};


	var Order = {
	    execute:function () {
	        MainLayout.render(function () {
	            var currentpath = Orderconfigs.urlvars.paths[2];
	            var renderCart = CartSDK.initiate();

	            if (currentpath) {
	                ServicesSDK.initiate();
	            }
	        });
	    }
	};
	Order.execute();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var maintemplate = __webpack_require__(2);
	var MainLayout = {
	    render: function (callback) {
	        $('#main-body .main-content').find('.header-lined').remove();
	        $('#order-main-content').html(maintemplate());
	        callback();
	    }
	};
	module.exports = MainLayout;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<section id="order-content" style="margin-top: 20px;">\r\n    <div id="order-header" style="margin-bottom: 10px;">\r\n        <div class="row">\r\n            <div class="col-md-6 pull-left">\r\n                <div id="order-title">\r\n                    \r\n                </div>\r\n            </div>\r\n            <div class="col-md-6 pull-right">\r\n                <div id="order-step-wrapper" style="">\r\n                    <div class="proof_item" style="">\r\n                        <span class="dot" style="">\r\n                            <i class="fa-comment-dots fas"></i>\r\n                        </span> Respon Cepat<br>Support 24x7\r\n                    </div>\r\n                    <div class="proof_item">\r\n                        <span class="dot" style="">\r\n                            <i class="fas fa-redo"></i>\r\n                        </span> Garansi 30 Hari<br>Uang kembali\r\n                    </div>\r\n                    <div class="proof_item">\r\n                        <span class="dot" style="">\r\n                            <i class="fas fa-shield-alt"></i>\r\n                        </span> Pembayaran Aman<br>dan Terenkripsi\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id="order-body">\r\n        <div class="row">\r\n            <div class="col-md-8">\r\n                <div id="order-forms-wrapper">\r\n\r\n                </div>\r\n\r\n                <div id="section-add-domain">\r\n\r\n                </div>\r\n\r\n                <div id="tambah-layanan-baru">\r\n\r\n                </div>\r\n            </div>\r\n            <div class="col-md-4">\r\n                <div id="cart-summary-wrapper">\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>';

	}
	return __p
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs = window.__orderconfigs;
	var UrlReader  = __webpack_require__(4);

	UrlReader.splitUrl(function (response) {
	    Orderconfigs.urlvars = response;
	});
	module.exports = Orderconfigs;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var UrlReader = {
	    splitUrl : function (callback) {
	        var pathArray       = window.location.pathname.split('/');
	        var urlquery        = window.location.search;
	        var queriesString   = urlquery.replace('?','');
	        queriesString       = queriesString.split('&');
	        var queries         = {};
	        queriesString.forEach(function (item, index) {
	            var spliteditem = item.split('=');
	            queries[spliteditem[0]] = spliteditem[1]
	        });
	        var response = {
	            paths   : pathArray,
	            queries : queries
	        };
	        callback(response);
	    }
	};

	module.exports = UrlReader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs = __webpack_require__(3);
	var ApiHelper = __webpack_require__(6);
	var CartsSDK = __webpack_require__(7);
	var CustomfieldSDK = __webpack_require__(46);
	var ConfigoptionSDK = __webpack_require__(53);
	var VpsxSDK = __webpack_require__(21);
	var DomainSDK = __webpack_require__(57);
	var PaymentSDK = __webpack_require__(8);

	var __layouts = {
	    cart: __webpack_require__(33),
	    ordersections: __webpack_require__(68),
	    option_pilihpaket: __webpack_require__(69),
	    option_pilihbilling: __webpack_require__(70),
	    option_pilihdomain: __webpack_require__(71),
	    section_freedomain: __webpack_require__(72),
	    input_tambahdomain: __webpack_require__(73),
	    input_eppcode: __webpack_require__(61),
	    section_domain_serupa: __webpack_require__(66),
	    section_domain_serupa_header_footer: __webpack_require__(74),
	    pencariandomain_available: __webpack_require__(64),
	    pencariandomain_nonavailable: __webpack_require__(75),
	    section_penawaran: __webpack_require__(76),
	    section_upsale: __webpack_require__(77),
	    section_order_title: __webpack_require__(59),
	    section_step_order: __webpack_require__(60),
	    section_tambah_layanan: __webpack_require__(78),
	    configoptions_counter: __webpack_require__(79),
	    customfields_text: __webpack_require__(47),
	    section_layanan_yang_kamu_beli       : __webpack_require__(67),
	    minimizePanel       : __webpack_require__(80),
	    minimizePanelDomain       : __webpack_require__(81),
	    alertError: __webpack_require__(19),
	    section_tambah_domain       : __webpack_require__(63),
	    section_cross_sales : __webpack_require__(82),
	    section_crossSalesModal : __webpack_require__(83),
	    btn_SimpanCrossSales : __webpack_require__(84),
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs  = __webpack_require__(3);

	var ApiHelper = {
	    getTldLists: function(callback){
	       var lookup = jQuery.get(
	          Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-tld-list',
	          function(response){
	             callback(response)
	          }
	       );
	    },
	    checkAvailabilityDomain : function (domain, callback) {
	        var lookup = jQuery.post(
	            Orderconfigs.base_url+'/index.php?rp=/domain/check',
	            {
	                token: csrfToken,
	                type: 'domain',
	                domain: domain,
	                source: 'cartAddDomain'
	            },
	            function (data) {
	               var arrDomain = domain.split(".")
	               arrDomain.splice(0,1)
	               var tld = arrDomain.join(".")

	               ApiHelper.getTldLists(function (result){
	                  let tldIsSell = result.data.includes(tld)
	                  if(!tldIsSell){
	                     data.result[0].domainName = domain;
	                     data.result[0].idnDomainName = domain;
	                     data.result[0].tld = tld;
	                     data.result[0].tldNoDots = tld;
	                     data.result[0].isAvailable = false;
	                     data.result[0].isRegistered = false;
	                     data.result[0].isValidDomain = true;
	                     data.result[0].legacyStatus = "error";
	                  }
	                  callback(data)
	               });
	            }
	        );
	    },
	    checkDomainSpotlight : function (domain, callback) {
	        var lookup = jQuery.post(
	            Orderconfigs.base_url+'/index.php?rp=/domain/check',
	            {
	                token: csrfToken,
	                type: 'spotlight',
	                domain: domain,
	                source: 'cartAddDomain'
	            },
	            function (data) {
	                callback(data)
	            }
	        );
	    },
	    detailTemplate: function (templateOs, callback) {
	        var lookup = jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-information-template',
	            {
	                template_id: templateOs
	            },
	            function (data) {
	                callback(data)
	            }
	        );
	    },
	    Register : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=register-client&version=2',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    Login : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=login&version=2',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    Confirmation: function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=confirm-code',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    getCountries: function (callback) {
	        $.getJSON("/resources/country/dist.countries.json", function (response) {
	            callback(response);
	        });
	    },
	    getRegion: function (callback) {
	        $.getJSON("/templates/orderforms/sobat_jagoan/js/indonesianregion/region.json", function (response) {
	            callback(response);
	        });
	    },
	    getCity: function (callback) {
	        $.getJSON("/templates/orderforms/sobat_jagoan/js/indonesianregion/cities.json", function (response) {
	            callback(response);
	        });
	    },
	    resendOTP : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=resend-code',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    cekPromoCode : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=validate-promo-code',
	            {
	                code: data
	            },
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    completeRegistration : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=complete-registration',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    checkout : function (data, callback) {
	        var endpointBase        = Orderconfigs.base_url;
	        if (endpointBase.slice(-1) == '/') {
	            endpointBase        = window.location.protocol + "//" + window.location.host
	        }
	        jQuery.post(
	            endpointBase+'/index.php?m=beon_order&action=api&api=checkout',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    getPayment : function (data, callback) {
	        jQuery.post(
	            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-visible-payment',
	            data,
	            function (response) {
	                callback(response);
	            }
	        );
	    },
	    fetchGeneralPromoCode : function (callback) {
	        jQuery.get(
	            Orderconfigs.base_url+'/index.php?m=jagoan_developer&action=api&api=fech-general-promo-code',
	            function (response) {
	                callback(response);
	            }
	        );
	    }
	};

	module.exports = ApiHelper

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs = __webpack_require__(3);
	var ApiHelper  = __webpack_require__(6);
	var PaymentSDK      = __webpack_require__(8);
	var __layouts = {
	    wrapper: __webpack_require__(33),
	    emptyCart: __webpack_require__(34),
	    normalCart: __webpack_require__(35),
	    loadingCart: __webpack_require__(36),
	    hostingItem: __webpack_require__(37),
	    domainItem: __webpack_require__(38),
	    inputKupon: __webpack_require__(39),
	    promoItem: __webpack_require__(40),
	    buttonGunakanPromo: __webpack_require__(41),
	    promoModal: __webpack_require__(42),
	    gantiKupon: __webpack_require__(43),
	    inputTextKupon: __webpack_require__(44),
	    sectionListPromo: __webpack_require__(45),
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
	                    var ServicesSDK = __webpack_require__(5);
	                    ServicesSDK.events.removeProductInCart();

	                    var LoginSDK        = __webpack_require__(9);
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

	            var LoginSDK        = __webpack_require__(9);
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
	                var LoginSDK        = __webpack_require__(9);
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
	                    var LoginSDK        = __webpack_require__(9);
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs    = __webpack_require__(3);
	var LoginSDK        = __webpack_require__(9);
	var ApiHelper       = __webpack_require__(6);

	var __layouts = {
	    alertError: __webpack_require__(19),
	    paymentModal: __webpack_require__(20)
	}

	var PaymentSDK = {
	    initiate    :function () {
	        PaymentSDK.initiateCheckout();
	    },
	    initiateCheckout: function () {
	        PaymentSDK.validateOrder(function (status, message) {
	            if(status==1){
	                LoginSDK.checkLogin(function (isloggedin) {
	                    if(!isloggedin){
	                        LoginSDK.renderLoginModal();
	                        return
	                    }

	                    PaymentSDK.renderPaymentGateway();
	                })
	            }
	        });
	    },
	    renderPaymentGateway: function () {
	        if ($("#order-content").find("#beoncustomorderchoosepayment").length) {
	            $("#beoncustomorderchoosepayment").modal("show");
	            $('.accepttos').removeAttr('checked');
	            $('.btn-select-payment').attr('disabled', true);
	            localStorage.removeItem("paymentLS");
	        } else {
	            var filteredPayment = PaymentSDK.filterPayment(Orderconfigs.payment)

	            $("#order-content").append(__layouts.paymentModal({
	                payments: filteredPayment
	            }))
	                .promise()
	                .then(function () {
	                    PaymentSDK.events.clickDropdown();
	                    PaymentSDK.acceptTos();
	                    PaymentSDK.submitOrder();
	                })
	            $("#beoncustomorderchoosepayment").modal("show")
	        }
	    },
	    validateOrder: function (callback) {
	        var status  = true;
	        var message = "valid";
	        var CartSDK = __webpack_require__(7);

	        var cart = CartSDK.events.getCart();
	        var vpsx_id = Orderconfigs.vps_x;

	        for (let i = 0; i < cart.length; i++) {
	            if (cart[i].type != "products") {
	                continue;
	            }

	            // IF VPS X
	            var isVpsX = vpsx_id.find(function (value) {
	                return value == cart[i].pid
	            });

	            if (!isVpsX) {
	                var validateDomain = PaymentSDK.validation.domain(cart[i], i)
	                if (!validateDomain) {
	                    status = false
	                    break
	                }
	            }

	            var validateCustomfield = PaymentSDK.validation.customfield(cart[i], i);
	            // console.log("Validate CustomFieldds: "+validateCustomfield);
	            if (!validateCustomfield) {
	                status = false
	                break
	            }

	            // Check for VPS X
	            if (isVpsX) {
	                var validateVpsX = PaymentSDK.validation.validateVpsX(cart[i], i)
	                if (!validateVpsX.status) {
	                    var element = $("#config-error-"+i)
	                    element.removeClass('hidden')
	                    element.html(validateVpsX.message)
	                    PaymentSDK.events.scrollToErrorVps(element, validateVpsX.step)

	                    status = false;
	                    break;
	                }
	            }
	        }

	        callback(status, message);
	    },
	    showPayment: function() {

	    },
	    acceptTos: function () {
	        $(".accepttos").on("click", function () {
	            var classAcceptTos  = $(this).attr("data-payment")
	            var dataPaymentLS   = localStorage.getItem("paymentLS");
	            if (!dataPaymentLS) {
	                localStorage.setItem("paymentLS", classAcceptTos);
	                if ($("#order-content").find('#accepttos'+classAcceptTos).is(':checked')) {
	                    $('#btn-select-payment-'+classAcceptTos).removeAttr('disabled');
	                }
	                else {
	                    $('#btn-select-payment-'+classAcceptTos).attr('disabled', true);
	                    localStorage.removeItem("paymentLS");
	                }
	            } else {
	                if (classAcceptTos != dataPaymentLS) {
	                    $('#btn-select-payment-'+dataPaymentLS).attr('disabled', true);
	                    $('#accepttos'+dataPaymentLS).removeAttr('checked');
	                    localStorage.setItem("paymentLS", classAcceptTos);
	                }

	                if ($("#order-content").find('#accepttos'+classAcceptTos).is(':checked')) {
	                    $('#btn-select-payment-'+classAcceptTos).removeAttr('disabled');
	                }
	                else {
	                    $('#btn-select-payment-'+classAcceptTos).attr('disabled', true);
	                    localStorage.removeItem("paymentLS");
	                }
	            }
	        })
	    },
	    submitOrder: function () {
	        $(".btn-select-payment").on("click", function () {
	            var CartSDK = __webpack_require__(7);

	            var data = {
	                cart: CartSDK.events.getCart(),
	                payment: $(this).attr("data-payment")
	            };

	            $(this).find("i").removeClass("hidden")
	            $(this).attr("disabled", "disabled")

	            var button = $(this)

	            ApiHelper.checkout(data,function (response) {
	                button.find("i").addClass("hidden")
	                button.attr("disabled", "disabled")

	                CartSDK.events.removeAllCart();

	                var endpointBase        = Orderconfigs.base_url;
	                if (endpointBase.slice(-1) == '/') {
	                    endpointBase        = window.location.protocol + "//" + window.location.host
	                }
	                window.location.href    = endpointBase + "/viewinvoice.php?id="+response.data.invoiceid
	            })
	        })
	    },
	    filterPayment: function (payments) {
	        var tempPayment;
	        tempPayment     = localStorage.getItem("resPaymentTemp");
	        if (tempPayment == null) {
	            PaymentSDK.getPayment()
	        }

	        var selected    = JSON.parse(tempPayment);
	        var result      = payments.filter((el) => {
	            return selected.some((f) => {
	                return f.module === el.module;
	            });
	        });

	        return result;
	    },
	    getPayment: function () {
	        var tempResData;
	        var resData             = [];
	        var selected            = [
	            {module: "ovo"},
	            {module: "creditbalance"},
	            {module: "gopay"},
	            {module: "shopeepay"},
	            {module: "vabni"},
	            {module: "snapveritrans"},
	            {module: "snapindomaret"},
	            {module: "vabcadirect"},
	        ];
	        ApiHelper.getPayment(null,function (response) {
	            selected.forEach((item) => {
	                var gateway         = item.module;
	                if(response.status==1){
	                    response.data.forEach((responsegateway)=>{
	                        if(responsegateway.gateway == gateway){
	                            resData.push({
	                                module:responsegateway.gateway
	                            });
	                        }
	                    })
	                }
	            });
	            tempResData = JSON.stringify(resData)
	            var payment = localStorage.getItem("resPaymentTemp");
	            if (payment == null) {
	                localStorage.setItem("resPaymentTemp", tempResData);
	            } else {
	                localStorage.removeItem("resPaymentTemp");
	                localStorage.setItem("resPaymentTemp", tempResData);
	            }
	        })
	        setTimeout(PaymentSDK.getPayment, 5000);
	    },
	    validation: {
	        domain: function (product, index) {
	            var panel = $(".panel[data-index='"+index+"']")
	            var productDetail = Orderconfigs.products[product.pid].details

	            if (productDetail.showdomainoptions != "1") {
	                return true
	            }

	            if (product.crosssaleparent != 0){
	                return true
	            }

	            if (product.hasOwnProperty("parent_product")){
	                return true
	            }

	            if (!product.hasOwnProperty("domain")) {
	                $("#item-cart").find(".item[data-type='cart']").eq(index).find(".title").click()

	                if (panel.find(".section-tambah-domain .form-title").next().hasClass("alert")) {
	                    panel.find(".section-tambah-domain .form-title").next().removeClass("hidden")
	                } else {
	                    panel.find(".section-tambah-domain .form-title")
	                        .after(__layouts.alertError({
	                            message: "Domain tidak boleh kosong sob! Beli domain, gunakan, atau transfer domainmu!"
	                        }))
	                }

	                return false
	            }

	            return true
	        },
	        customfield: function (product, index) {
	            if (!product.customfields.length) {
	                return true
	            }

	            var panel = $(".panel[data-index='"+index+"']")

	            for (let i = 0; i < product.customfields.length; i++) {
	                if(product.customfields[i].required==1){
	                    if (product.customfields[i].value == "") {
	                        $("#item-cart").find(".item[data-type='cart']").eq(index).find(".title").click()

	                        var section = panel.find(".section-customfields input[data-customfieldid='"+ product.customfields[i].id +"']").parents(".config_text")
	                        if (!section.find(".alert").length) {
	                            section.prepend(__layouts.alertError({
	                                message: "Form di bawah ini harus diisi sob!"
	                            }))
	                        }

	                        return false
	                    }
	                }
	            }

	            return true
	        },
	        validateVpsX: function (product, index) {
	            var VpsSDK = __webpack_require__(21);

	            // Check credentials
	            if (product.credentials.hostname.length < 1 || product.credentials.password.length < 1) {
	                return {
	                    message: "Error, Please fill information about your credentials correctly!",
	                    step: 1,
	                    status: false
	                }
	            }

	            // Check template
	            if (Object.keys(product.template).length === 0 && product.template.constructor === Object) {
	                return {
	                    message: "Error, Please choose x-cube content!",
	                    step: 2,
	                    status: false
	                }

	            }

	            // Check apps config
	            if (product.template.type == "aio") {
	                if (VpsSDK.static.configuration_form(product.template.apps)
	                    && !('config' in product.template)
	                ) {
	                    return {
	                        message: "Error, Please fill information about your x-cube correctly!",
	                        step: 3,
	                        status: false
	                    }
	                }
	            }

	            return {
	                status: true
	            }
	        }
	    },
	    events: {
	        clickDropdown: function () {
	            $(".choose-payment-item-btn").on("click", function () {
	                var thisPanel = $(this).parents(".panel")

	                if (thisPanel.find(".panel-payment-tutorial.in").length) {
	                    $(this).parents(".panel-paymentgateway-item").find(".panel").show();
	                    thisPanel.find(".more-less").removeClass("fa-angle-left")
	                    thisPanel.find(".more-less").addClass("fa-angle-right")
	                } else {
	                    $(this).parents(".panel-paymentgateway-item").find(".panel").hide();
	                    thisPanel.find(".more-less").removeClass("fa-angle-right")
	                    thisPanel.find(".more-less").addClass("fa-angle-left")
	                    thisPanel.show();
	                }
	            })
	        },
	        scrollToErrorVps: function(element, step) {
	            var panel = element.parents('.panel')

	            panel.find('.maximize-icon').click()

	            for (var i = 1; i < step; i++) {
	                var buttonNext = panel.find("button[name='next-configuration']")

	                if (!buttonNext.hasClass('hidden')) {
	                    buttonNext.click()
	                }
	            }

	            $('html, body').animate({
	                scrollTop: element.parents('.section-konfigurasi').offset().top
	            }, 'slow');

	        },
	    }
	};
	module.exports = PaymentSDK;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs    = __webpack_require__(3);
	var ApiHelper       = __webpack_require__(6);
	var RegistrationSDK = __webpack_require__(10);

	var __layouts ={
	    loginmodal  : __webpack_require__(18),
	};


	var LoginSDK = {
	    initiate    :function () {
	        LoginSDK.interactions.clickRegisterBtn();
	        LoginSDK.events.submitLogin();
	    },
	    checkLogin : function (callback) {
	        var isloggedin = Orderconfigs.is_loggedin;        
	        callback(isloggedin);
	    },
	    renderLoginModal: function () {
	        if($('#login-modals').length){
	            $('#login-modals').modal('show');
	        }else{
	            $('#order-content').append(__layouts.loginmodal());
	            $('#login-modals').modal('show');
	        }
	        LoginSDK.initiate();

	        $('#login-modals').find('button[name="submit"]').attr('disabled', true);
	        var base_url = window.location.origin;
	        $('#login-modals').find('#Lupa_Password').attr('href', base_url + '/pwreset.php')        
	    },
	    hideLoginModal: function(){
	        $('#login-modals').modal('hide');
	    },

	    interactions : {
	        clickRegisterBtn : function () {
	            $('#order-content').find('#register-btn').on('click', function (e) {
	                e.preventDefault();
	                // console.log('click Register Button');
	                LoginSDK.hideLoginModal();
	                RegistrationSDK.RegisterStep.step1();
	                // RegistrationSDK.RegisterStep.render(2);
	            });
	        }
	    },
	    events : {
	        submitLogin: function () {
	            $('.form-login input').on("keyup", function () {
	                var empty = false;
	                var elment = $(this).parents('#login-form')

	                $('.form-login input').each(function() {
	                    if ($(this).val().length == 0) {
	                        empty = true;
	                    }
	                });

	                
	                if (empty) {
	                    elment.find('button[name="submit"]').attr('disabled', true);
	                } else {
	                    elment.find('button[name="submit"]').attr('disabled', false);
	                    $(this).off().on("keypress", function (e) {
	                        if (e.keyCode === 13) {
	                            e.preventDefault();
	                            var url = window.location.href 
	                            var id = url.substring(url.lastIndexOf('/') + 1);
	                            var currentpath = Orderconfigs.urlvars.paths[2];
	                            var formdata    = $('#login-form').serialize() + '&pid=' + id+'&path='+currentpath;
	                            var btn = $('#login-form').find('button[name="submit"]')
	                            var spinner = btn.find('.fa-spin')
	                            var alert = $('#login-form').find('#alert_error')
	                            
	                            btn.attr('disabled', true);
	                            alert.html('')
	                            alert.addClass('hidden')
	                            spinner.removeClass('hidden')

	                            ApiHelper.Login(formdata, function (response) {
	                                if (response.status == 1) {
	                                    window.location.href = response.loginurl
	                                }else{
	                                    alert.removeClass('hidden')
	                                    spinner.addClass('hidden');
	                                    // console.log($(this).find('button[name="submit"]'));
	                                    btn.removeAttr('disabled');
	                                    alert.html(response.message)
	                                }
	                            })
	                        }
	                    })

	                    $('#login-form').on('submit', function (e) {
	                        var currentpath = Orderconfigs.urlvars.paths[2];
	                        e.preventDefault();
	                        var url = window.location.href 
	                        var id = url.substring(url.lastIndexOf('/') + 1);
	                        var formdata    = $(this).serialize() + '&pid=' + id+'&path='+currentpath;
	                        var alert = $(this).find('#alert_error')
	                        var btn = $(this).find('button[name="submit"]')
	                        var spinner = btn.find('.fa-spin')
	        
	                        alert.html('')
	                        alert.addClass('hidden')
	                        spinner.removeClass('hidden')
	                        $(this).find('button[name="submit"]').attr('disabled', true);
	        
	                        ApiHelper.Login(formdata, function (response) {
	                            if (response.status == 1) {
	                                window.location.href = response.loginurl
	                            }else{
	                                alert.removeClass('hidden')
	                                spinner.addClass('hidden');
	                                // console.log($(this).find('button[name="submit"]'));
	                                btn.removeAttr('disabled');
	                                alert.html(response.message)
	                            }
	                        })
	                    })
	                }
	            })
	        }
	    }
	};
	module.exports = LoginSDK;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	

	var Orderconfigs    = __webpack_require__(3);
	var ApiHelper       = __webpack_require__(6);
	var LoginSDK        = __webpack_require__(9);
	var RegionHelper    = __webpack_require__(11);


	var __layouts ={
	    registrationmodal   : __webpack_require__(12),
	    step1               : __webpack_require__(13),
	    step2               : __webpack_require__(14),
	    step3               : __webpack_require__(15),
	    confirmationmodal   : __webpack_require__(16),
	    addressform         : __webpack_require__(17),
	};

	var RegistrationSDK = {
	    mainModal: {
	        render: function (callback, step) {
	            if(!$('#registration-modals').length){
	                $('#order-content').append(__layouts.registrationmodal());
	            }

	            $('#registration-modals').modal({
	                show: true,
	                backdrop: "static",
	                keyboard: false
	            });

	            callback();
	        },
	        hide : function(){
	            $('#registration-modals').modal('hide');
	        },
	        hideFooter: function () {
	            $('#registration-modals').find('.modal-footer').hide();
	        },
	    },

	    Confirmation: {
	        render: function(clientid, email, expiry){
	            if($('#confirmation-modals').length){
	                $('#confirmation-modals').modal({
	                    show: true,
	                    backdrop: "static",
	                    keyboard: false
	                });
	            }else{
	                $('#order-content').append(__layouts.confirmationmodal({clientid:clientid, email:email, expiry:expiry}))
	                    .promise()
	                    .then(function () {
	                        var countDownDate = new Date(expiry).getTime();
	                        RegistrationSDK.Confirmation.countdown(countDownDate)
	                        RegistrationSDK.interactions.otpInput();
	                        RegistrationSDK.Confirmation.resendOTP();
	                    });
	                $('#confirmation-modals').modal({
	                    show: true,
	                    backdrop: "static",
	                    keyboard: false
	                });
	            }
	            RegistrationSDK.Confirmation.submitForm();
	        },

	        hide: function () {
	            $('#confirmation-modals').modal('hide');
	        },
	        submitForm: function () {
	            $('#confirmation-form').on('submit', function (e) {
	                e.preventDefault();
	                var formdata    = $(this).serialize();
	                var alert = $(this).parents("#confirmation-modals").find('.otp-alert');
	                var button = $(this).find("button")
	                alert.addClass("hidden")
	                alert.find(".alert").addClass("hidden")

	                button.addClass("disabled")
	                button.addClass("btn-default")
	                button.removeClass("btn-fill-primary")
	                button.find("i").removeClass("hidden")
	                button.attr("disabled")

	                ApiHelper.Confirmation(formdata, function (response) {
	                    button.removeClass("disabled")
	                    button.removeClass("btn-default")
	                    button.addClass("btn-fill-primary")
	                    button.find("i").addClass("hidden")
	                    button.removeAttr("disabled")

	                    if(response.status == 1){
	                        RegistrationSDK.Confirmation.hide();
	                        RegistrationSDK.RegisterStep.render(2);

	                        RegistrationSDK.completeForm.client_id = response.data.clientid;
	                    } else {
	                        alert.removeClass("hidden");

	                        $(".otp-input").val("")

	                        switch (response.type) {
	                            case "expired":
	                                alert.find(".alert[data-alert-for='warning']").removeClass("hidden")
	                                break;
	                            default:
	                                alert.find(".alert[data-alert-for='error']").removeClass("hidden")
	                        }
	                    }
	                })

	            });
	        },
	        countdown: function (countDownDate) {
	            // Update the count down every 1 second
	            var x = setInterval(function() {

	                // Get today's date and time
	                var now = new Date().getTime();

	                // Find the distance between now and the count down date
	                var distance = countDownDate - now;

	                // Time calculations for days, hours, minutes and seconds
	                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	                // Output the result in an element with id="demo"
	                if (minutes < 1) {
	                    document.getElementById("otp_expired").innerHTML = seconds + "detik ";
	                } else {
	                    document.getElementById("otp_expired").innerHTML = minutes + "menit " + seconds + "detik ";
	                }

	                // If the count down is over, write some text
	                if (distance < 0) {
	                    $(".expiry-information").addClass("hidden")
	                    var resend = $(".expiry-information").next()
	                    resend.removeClass("hidden");

	                    clearInterval(x)
	                } else {
	                    $(".expiry-information").removeClass("hidden")
	                    $("#resend-otp").addClass("hidden")
	                }
	            }, 1000);
	        },
	        resendOTP: function () {
	            $("#resend-otp").on('click', function(e) {
	                e.preventDefault()

	                $(this).addClass("hidden");

	                var user = {
	                    clientid: $("#confirmation-form").find("input[name='clientid']").val()
	                }

	                ApiHelper.resendOTP(user,function (response) {
	                    if (response.status == 1) {
	                        var countDownDate = new Date(response.data.resend_at).getTime();
	                        RegistrationSDK.Confirmation.countdown(countDownDate)
	                    }
	                })
	            })
	        }
	    },
	    Register: {
	        submitForm: function () {
	            $('#registration-modals-step1').find('#registration-form').on('submit', function (e) {
	                e.preventDefault();

	                var url         = window.location.href
	                var id          = url.substring(url.lastIndexOf('/') + 1);
	                var form        = $(this);
	                var formdata    = $(this).serialize() + '&pid=' + id;
	                var email       = $(this).find('input[name="email"]').val();
	                var alert       = $(this).find('#alert_error')

	                form.find('button[type="submit"]').attr('disabled', true);
	                form.find('button[type="submit"]').addClass('disabled');
	                form.find('button[type="submit"] i').removeClass('hidden');
	                alert.html('')
	                alert.addClass('hidden')

	                ApiHelper.Register(formdata, function (response) {
	                    form.find('button[type="submit"]').removeAttr('disabled');
	                    form.find('button[type="submit"]').removeClass('disabled');
	                    form.find('button[type="submit"] i').addClass('hidden');
	                    alert.addClass('hidden')

	                    if(response.status==1){
	                        RegistrationSDK.completeForm.email = email;
	                        RegistrationSDK.completeForm.pid   = id;
	                        $("#registration-modals-step1").modal("hide")
	                        RegistrationSDK.Confirmation.render(response.data.clientid, email, response.data.expirydate);
	                    }else{
	                        alert.removeClass('hidden')
	                        alert.html('Email sudah terdaftar, gunakan email yang lain')
	                    }
	                });
	            })
	        },
	        showCompletionForm: function () {
	            var form = $("#completion-form-container").clone()
	            if($("#registration-modals").find('.completion-wrapper').length){
	                $("#registration-modals #completion-form-container").show();
	            }else{
	                $("#registration-modals").find('.modal-body').html(form);
	                $("#completion-form-container").show();
	            }

	            RegistrationSDK.Register.submitCompletion();
	            RegistrationSDK.interactions.waSelector();
	            RegistrationSDK.interactions.accountTypeSelector();
	            RegistrationSDK.interactions.professionChange();
	            RegistrationSDK.interactions.categoryChange();
	            RegistrationSDK.interactions.customInput();
	            RegistrationSDK.interactions.instansiNameInput()
	            RegistrationSDK.interactions.changePhoneCode();
	            RegistrationSDK.interactions.inputphonenumber();
	            RegistrationSDK.mainModal.hideFooter();
	        },
	        hideCompletionForm: function(){
	            $("#completion-form-wrapper").hide();
	        },

	        showAddressForm: function () {
	            if($("#address-form-wrapper").length){
	                var complete = $("#registration-modals #completion-form-container").find("#completion-form-wrapper")
	                var addres = $("#registration-modals #completion-form-container").find("#address-form-wrapper")
	                complete.attr('style', 'display:none');
	                addres.removeAttr('style', 'display:none');
	                addres.find('textarea[name="address1"]').on('keyup', function () {
	                    if ($(this).val().length > 1) {
	                        addres.find('textarea[name="address1"]').removeAttr("data-original-title")
	                        
	                    }
	                })
	                addres.find('input[name="postcode"]').on('keyup', function () {
	                    if ($(this).val().length >= 5) {
	                        addres.find('input[name="postcode"]').removeAttr("data-original-title")
	                        
	                    }
	                })
	                
	            }else{
	                $("#registration-modals").find('#completion-form-container')
	                    .append(__layouts.addressform())
	                    .promise()
	                    .then(function () {
	                        RegistrationSDK.interactions.changeCountry()
	                    });
	                $("#address-form-wrapper").hide()
	                RegionHelper.renderCountries("#address-form", "country", "state","city");
	            }

	            RegistrationSDK.interactions.backButton();
	            RegistrationSDK.validation.onlyNumber();
	            RegistrationSDK.Register.submitAddress();
	        },
	        submitCompletion: function () {
	            $("#completion-form").on('submit', function (e) {
	                e.preventDefault();

	                var newFormat = $(this).serializeArray()

	                if ($("#completion-form input[name='phone']").val().length < 6) {
	                    $("#completion-form input[name='phone']").tooltip('show')
	                    $("#completion-form input[name='phone']").focus()
	                    return;
	                }
	                
	                newFormat.forEach(function (value) {
	                    if (RegistrationSDK.completeForm.hasOwnProperty(value.name)) {
	                        RegistrationSDK.completeForm[value.name] = value.value
	                    }

	                    switch (value.name) {
	                        case "country-calling-code-phone":
	                            RegistrationSDK.completeForm["dialcode"] = "+" + value.value
	                            break;
	                        case "phone":
	                            RegistrationSDK.completeForm["phonenumber"] = value.value
	                            break;
	                        case "profession":
	                            if (value.value != "") {
	                                RegistrationSDK.completeForm["profession"] = value.value
	                            }
	                            break;
	                        case "profession-input":
	                            if (value.value != "") {
	                                RegistrationSDK.completeForm["profession"] = value.value
	                            }
	                            break;
	                        case "instansi-category":
	                            if (value.value != "") {
	                                RegistrationSDK.completeForm["instansi-type"] = value.value
	                            }
	                            break;
	                        case "instansi-category-input":
	                            if (value.value != "") {
	                                RegistrationSDK.completeForm["instansi-type"] = value.value
	                            }
	                            break;
	                    }
	                })

	                var saveForm = $("#registration-modals").find("#completion-form-container").clone()
	                $("#save-form-personal").find("#completion-form-container").html(saveForm)

	                RegistrationSDK.Register.hideCompletionForm();
	                RegistrationSDK.Register.showAddressForm();
	            });
	        },
	        submitAddress: function () {
	            $("#address-form").off().on('submit', function (e) {
	                e.preventDefault();

	                var newFormat = $(this).serializeArray()
	                var button = $(this).find("button[type='submit']")

	                newFormat.forEach(function (value) {
	                    if (RegistrationSDK.completeForm.hasOwnProperty(value.name)) {
	                        RegistrationSDK.completeForm[value.name] = value.value
	                    }
	                });
	                RegistrationSDK.completeForm.is_register_aff =
	                    $(this).find('is_register_aff').is(':checked');

	                button.attr('disabled',true)
	                button.addClass('disabled')
	                button.find('i').removeClass("hidden")

	                ApiHelper.completeRegistration(RegistrationSDK.completeForm,function (response) {
	                    // console.log(response);
	                    button.removeAttr('disabled')
	                    button.removeClass('disabled')
	                    button.find('i').addClass("hidden")
	                    if (response.status == 1) {
	                        RegistrationSDK.mainModal.hide();
	                        $("#registration-modals").remove();
	                        $("#registration-modals-step1").remove();
	                        $('.modal-backdrop').remove();
	                        $('body').removeClass( "modal-open" );
	                        Swal.fire(
	                            'Register Success',
	                            'Kamu telah terdaftar',
	                            'success'
	                        ).then(function () {
	                            window.location.href = response.loginurl
	                        })
	                    }
	                })
	            });
	        },
	    },

	    RegisterStep: {
	        render: function (step) {
	            RegistrationSDK.mainModal.render(function () {
	                $('#registration-modals').find('.modal-dialog')
	                    .html(__layouts['step'+step]())
	            }, step);
	            RegistrationSDK.Register.showCompletionForm()
	            RegistrationSDK.Register.showAddressForm()
	        },
	        step1: function () {
	            if(!$('#registration-modals-step1').length){
	                $('#order-content').append(__layouts.step1);
	            }

	            $("#registration-modals-step1").modal("show");

	            RegistrationSDK.validation.password()
	            RegistrationSDK.validation.email()
	            RegistrationSDK.validation.minimalValidation()

	            RegistrationSDK.Register.submitForm();
	            RegistrationSDK.interactions.clickLoginBtn();
	        }
	    },

	    interactions : {
	        clickLoginBtn : function () {
	            $('#order-content').find('#login-link').on('click', function (e) {
	                var LoginSDK        = __webpack_require__(9);
	                e.preventDefault();

	                RegistrationSDK.mainModal.hide();
	                $("#registration-modals-step1").modal("hide")
	                LoginSDK.renderLoginModal();
	            });
	        },
	        changeButtonSubmit: function (step) {
	            switch (step) {
	                case "1":
	                    var status = true;
	                    $("#registration-form .form-group").each(function () {
	                        var subStatus = $(this).find("input").attr('data-validation')

	                        if (subStatus == "false") {
	                            status = false
	                        }
	                    })

	                    if (!status) {
	                        $("#registration-form").find(".btn-fill-primary ").addClass('disabled')
	                        $("#registration-form").find(".btn-fill-primary ").attr('disabled')
	                    } else {
	                        $("#registration-form").find(".btn-fill-primary ").removeClass('disabled')
	                        $("#registration-form").find(".btn-fill-primary ").removeAttr('disabled')
	                    }
	                    break;
	            }
	        },
	        otpInput: function () {
	            $('input.otp-input').on('keypress', function (e) {
	                var regex = new RegExp("^[a-zA-Z0-9]+$");
	                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

	                if (!regex.test(str)) {
	                    e.preventDefault();
	                    return false;
	                }

	                var colParent = $(this).parent();
	                colParent.next().find("input").focus();
	            })

	            $('input.otp-input').on('keyup', function (e) {
	                var colParent = $(this).parent();
	                if( e.which == 8 || e.which == 46 ) {
	                    $(this).val("");
	                    colParent.prev().find("input").focus()
	                }

	                var verificationCode = $('input[name^=verificationcode]').map(function(i, el) {
	                    return $(el).val();
	                }).get().join("");

	                var button = $(this).parents("form").find("button");
	                if (verificationCode.length < 4) {
	                    button.addClass("disabled");
	                    button.addClass("btn-default");
	                    button.removeClass("btn-fill-primary");
	                    button.attr("disabled", "disabled")
	                    return
	                }

	                button.removeClass("disabled");
	                button.removeClass("btn-default");
	                button.addClass("btn-fill-primary");
	                button.removeAttr("disabled")
	            })
	        },
	        waSelector: function () {
	            $(".wa-selector").on('click', function (e) {
	                e.preventDefault();
	                $(".wa-selector").removeClass("selected");
	                $(this).addClass("selected");

	                var form = $(this).parents("form");
	                var value = $(this).attr('data-value');

	                form.find("input[name='usewa']").val(value)
	            })
	        },
	        accountTypeSelector: function () {
	            $(".account-selector").on('click', function (e) {
	                e.preventDefault();
	                $(".account-selector").removeClass("selected");
	                $(this).addClass("selected");

	                var form = $(this).parents("form");
	                var value = $(this).attr('data-value');
	                var currentSelect = form.find(".form-group[data-type='"+ value +"'] select");
	                var button = form.find("button[type='submit']");

	                form.find("input[name='accounttype']").val(value)

	                form.find(".account-type").addClass("hidden")
	                form.find(".form-group[data-type='"+ value +"']").removeClass("hidden")

	                button.addClass("disabled");
	                button.attr("disabled","disabled");

	                if (currentSelect.val() == null) {
	                    button.addClass("disabled");
	                    button.attr("disabled","disabled");
	                    return;
	                }

	                if (currentSelect.val() == "more") {
	                    var nextInput = currentSelect.parent().next()
	                    nextInput.removeClass("hidden")

	                    if (nextInput.find("input").val() == "") {
	                        return;
	                    }
	                }


	                if (currentSelect.attr('name') == "instansi-category" && form.find("input[name='instansi-name']").val() == "") {
	                    button.addClass("disabled");
	                    button.attr("disabled","disabled");
	                    return;
	                }

	                button.removeClass("disabled");
	                button.removeAttr("disabled");
	            })
	        },
	        professionChange: function () {
	            $("select[name='profession']").on('change', function () {
	                var button = $(this).parents("form").find("button[type='submit']");
	                var value = $(this).val()

	                button.addClass("disabled");
	                button.attr("disabled","disabled");

	                $(this).parent().next().addClass("hidden")
	                if ($(this).val() == "more") {
	                    var inputManual = $(this).parent().next()
	                    inputManual.removeClass("hidden")

	                    if (inputManual.find("input").val() == "") {
	                        return;
	                    }
	                }

	                $("select[name='profession'] option").each(function(){
	                    if ($(this).text() == value) {
	                        $(this).attr("selected","selected");
	                    } else {
	                        $(this).removeAttr("selected");
	                    }
	                });

	                button.removeClass("disabled");
	                button.removeAttr("disabled");
	            })
	        },
	        categoryChange: function () {
	            $("select[name='instansi-category']").on('change', function () {
	                var form = $(this).parents("form")
	                var button = form.find("button[type='submit']");

	                button.addClass("disabled");
	                button.attr("disabled","disabled");

	                $(this).parent().next().addClass("hidden")
	                if ($(this).val() == "more") {
	                    var inputManual = $(this).parent().next()
	                    inputManual.removeClass("hidden")

	                    if (inputManual.find("input").val() == "") {
	                        return;
	                    }
	                }

	                if (form.find("input[name='instansi-name']").val() == "") {
	                    button.addClass("disabled");
	                    button.attr("disabled","disabled");
	                    return;
	                }

	                button.removeClass("disabled");
	                button.removeAttr("disabled");
	            })
	        },
	        customInput: function () {
	            $("input[name$='-input']").on('keyup', function () {
	                var form = $(this).parents("form")
	                var button = form.find("button[type='submit']")

	                if ($(this).val() == "") {
	                    button.addClass("disabled")
	                    button.attr("disabled","disabled")
	                    return
	                }

	                button.removeClass("disabled")
	                button.removeAttr("disabled","disabled")
	            })
	        },
	        instansiNameInput: function () {
	            $("input[name='instansi-name']").on("keyup", function () {
	                var form = $(this).parents("form")
	                var button = form.find("button[type='submit']")
	                var category = form.find("select[name='instansi-category']").val()

	                if ($(this).val() == "") {
	                    button.addClass("disabled")
	                    button.attr("disabled","disabled")
	                    return
	                }

	                if (category == null) {
	                    button.addClass("disabled")
	                    button.attr("disabled","disabled")
	                    return
	                }

	                button.removeClass("disabled")
	                button.removeAttr("disabled","disabled")
	            })
	        },
	        backButton: function () {
	            $(".back-button").on("click", function () {
	                $("#registration-modals #completion-form-container #completion-form-wrapper").removeAttr('style', 'display:none');
	                $("#registration-modals #completion-form-container #address-form-wrapper").attr('style', 'display:none');
	            })
	        },
	        changePhoneCode: function () {
	            $("ul.country-list li").on('click', function(){
	                var selectedFlag = $(".selected-flag");
	                var country = $(this).find(".country-name").html();
	                var dialCode =  $(this).attr('data-dial-code')
	                var flag = $(this).attr('data-country-code')

	                selectedFlag.attr('title', country + ": +" + dialCode)
	                selectedFlag.find(".selected-dial-code").html("+" + dialCode)
	                selectedFlag.find('.iti-flag').removeClass().addClass("iti-flag "+flag)

	                $("input[name='country-calling-code-phone']").val(dialCode)

	                $("ul.country-list").addClass("hide")

	                // Sync with location step 3
	                $("#address-form select[name='country']").val(flag.toUpperCase())
	                RegionHelper.renderRegion("#address-form", "country", "state","city");
	            })

	            $(".selected-flag").on("click", function () {
	                if ($('ul.country-list').hasClass('hide')) {
	                    $("ul.country-list").removeClass("hide")
	                } else {
	                    $("ul.country-list").addClass("hide")
	                }
	            })

	            $(".selected-flag").click()
	                .promise()
	                .then(function () {
	                    $("ul.country-list").find("li[data-country-code='id']").click()
	                })
	        },
	        inputphonenumber: function () {
	            $("#completion-form input[name='phone']").on("keyup keypress", function () {
	                if ($(this).val().length < 1) {
	                    var regex = new RegExp("^[1-9.-]+$");
	                    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	                    if (!regex.test(key)) {
	                        event.preventDefault();
	                        return false;
	                    }
	                }

	                var regex = new RegExp("^[0-9]+$");
	                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	                if (!regex.test(key)) {
	                    event.preventDefault();
	                    return false;
	                }
	            })
	        },
	        changeCountry: function () {
	            $("#address-form select[name='country']").on('change', function () {
	                var country = $(this).val().toLowerCase();

	                $(".selected-flag").click()
	                    .promise()
	                    .then(function () {
	                        $("ul.country-list").find("li[data-country-code='"+ country +"']").click()
	                    })
	            })
	        }
	    },

	    validation: {
	        password: function () {
	            $("input[type='password']").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var step = $(this).parents('.modal-content').attr('data-step')

	                // Cannot use space
	                if (e.keyCode == 32 || e.keyCode == 58 || e.keyCode == 59 || e.keyCode == 34 || e.keyCode == 39) {
	                    e.preventDefault()
	                    $(this).attr('data-validation', false)
	                    RegistrationSDK.interactions.changeButtonSubmit(step)
	                    RegistrationSDK.validation.showLabelError($(this));
	                    return
	                }

	                var regexSchema = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
	                if (!regexSchema.test(value)) {
	                    $(this).attr('data-validation', false)
	                    RegistrationSDK.interactions.changeButtonSubmit(step)
	                    RegistrationSDK.validation.showLabelError($(this));
	                    return;
	                }

	                $(this).attr('data-validation', true)
	                RegistrationSDK.validation.removeLabelError($(this));

	                // Change Button
	                RegistrationSDK.interactions.changeButtonSubmit(step)
	            })
	        },
	        email: function () {
	            $("input.validationEmail").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var step = $(this).parents('.modal-content').attr('data-step')

	                // Cannot use space
	                if (e.keyCode == 32) {
	                    e.preventDefault()
	                    $(this).attr('data-validation', false)
	                    RegistrationSDK.interactions.changeButtonSubmit(step)
	                    RegistrationSDK.validation.showLabelError($(this));
	                    return
	                }

	                var regexSchema = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	                if (!regexSchema.test(value.toLowerCase())) {
	                    $(this).attr('data-validation', false)
	                    RegistrationSDK.interactions.changeButtonSubmit(step)
	                    RegistrationSDK.validation.showLabelError($(this));
	                    return;
	                }

	                $(this).attr('data-validation', true)
	                RegistrationSDK.validation.removeLabelError($(this));

	                // Change Button
	                RegistrationSDK.interactions.changeButtonSubmit(step)
	            })
	        },
	        minimalValidation: function () {
	            $("input.validationMinimal").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var step = $(this).parents('.modal-content').attr('data-step')

	                // Cannot use space
	                if (value.length < 3) {
	                    $(this).attr('data-validation', false)
	                    RegistrationSDK.validation.showLabelError($(this));
	                    RegistrationSDK.interactions.changeButtonSubmit(step)
	                    return
	                }

	                RegistrationSDK.validation.removeLabelError($(this));
	                $(this).attr('data-validation', true)

	                // Change Button
	                RegistrationSDK.interactions.changeButtonSubmit(step)
	            })
	        },
	        onlyNumber: function () {
	            $(".onlyNumber").on("keypress keyup", function(e) {
	                var evt = (e) ? e : window.event;
	                var charCode = (e.which) ? e.which : e.keyCode;
	                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	                    return false;
	                }
	            })
	        },
	        showLabelError: function (element) {
	            element.parent().addClass("has-error")
	            element.next().removeClass("hidden")
	        },
	        removeLabelError: function (element) {
	            element.parent().removeClass("has-error")
	            element.next().addClass("hidden")
	        },
	    },

	    completeForm: {
	        "client_id": "",
	        "email": "",
	        "pid": "",
	        "usewa": "",
	        "accounttype": "",
	        "phonenumber": "",
	        "profession": "",
	        "instansi-type": "",
	        "instansi-name": "",
	        "country": "",
	        "state": "",
	        "city": "",
	        "postcode": "",
	        "address1": "",
	        "dialcode": "",
	        "is_register_aff": "",
	    }
	};
	module.exports = RegistrationSDK;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var ApiHelper       = __webpack_require__(6);
	var RegionHelper    = {
	    Configs:{
	        Indoregions:[],
	        Indocities:[]
	    },
	    renderCountries : function (formid, countryelm, regionelm, cityelm) {
	        ApiHelper.getCountries(function (response) {
	            var elementcountry = $(formid).find('[name="'+countryelm+'"]');
	            $.each(response, function (index, item) {
	                if(index!='ID'){
	                    elementcountry.append('<option value="'+index+'">'+item.name+'</option>');
	                }
	            });
	        });
	        ApiHelper.getRegion(function (response) {
	            RegionHelper.Configs.Indoregions =response;
	            RegionHelper.renderRegion(formid, countryelm, regionelm, cityelm);
	        });
	        ApiHelper.getCity(function (response) {
	            RegionHelper.Configs.Indocities = response;
	            // RegionHelper.renderCity(formid, countryelm, regionelm, cityelm);
	        });
	        RegionHelper.changeCountry(formid, countryelm, regionelm, cityelm);
	    },
	    renderRegion: function (formid, countryelm, regionelm, cityelm) {
	        var country = $(formid).find('[name="'+countryelm+'"]').val();
	        if(country=='ID')
	        {
	            var opentag = "<select class='form-control' name='"+regionelm+"' required>";
	            var option = "";
	            $.each(RegionHelper.Configs.Indoregions, function (index, item) {
	                if(index==0){
	                    option = option+"<option value='"+item.name+"' selected data-id='"+item.id+"'>"+item.name+"</option>";
	                }else{
	                    option = option+"<option value='"+item.name+"' data-id='"+item.id+"'>"+item.name+"</option>";
	                }
	            });
	            var closetag= "</select>";
	            var htmltag = opentag+option+closetag;
	            $(formid).find('[name="'+regionelm+'"]').replaceWith(htmltag);
	        }else{
	            var htmltag = '<input name="'+regionelm+'" class="form-control" maxlength="15" placeholder="Ex: DKI Jakarta" required="">';
	            var citytag = '<input class="form-control" type="text" name="'+cityelm+'" placeholder="Ex: Jakarta" maxlength="15" required>';

	            $(formid).find('[name="'+regionelm+'"]').replaceWith(htmltag);
	            $(formid).find('[name="'+cityelm+'"]').replaceWith(citytag);
	        }

	        // RegionHelper.changeRegion(formid, countryelm, regionelm, cityelm);
	    },
	    renderCity: function (formid, countryelm, regionelm, cityelm) {
	        var state_id = $(formid).find('[name="'+regionelm+'"]').val();
	        var opentag = "<select class='form-control' name='"+cityelm+"' required>";
	        var option = "";
	        $.each(RegionHelper.Configs.Indocities, function (index, item) {
	            if(item.regency_id==state_id){
	                option = option+"<option value='"+item.name+"'>"+item.name+"</option>";
	            }
	        });
	        var closetag= "</select>";
	        var htmltag = opentag+option+closetag;
	        $(formid).find('[name="'+cityelm+'"]').replaceWith(htmltag);
	    },
	    changeCountry: function (formid, countryelm, regionelm, cityelm) {
	        $(formid).find('[name="'+countryelm+'"]').on('change', function (e) {
	            e.preventDefault();
	            RegionHelper.renderRegion(formid, countryelm, regionelm, cityelm);
	        });
	    },
	    changeRegion: function (formid, countryelm, regionelm, cityelm) {
	        $(formid).find('[name="'+regionelm+'"]').on('change', function (e) {
	            e.preventDefault();
	            // RegionHelper.renderCity(formid, countryelm, regionelm, cityelm);
	        });
	    },
	};
	module.exports = RegionHelper;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- Modal -->\n<div class="modal fade" id="registration-modals" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-sm" role="document">\n\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="modal fade" id="registration-modals-step1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-sm" role="document">\n        <div class="modal-content modal-register" data-step="1">\n            <div class="modal-header">\n                <h5 class="modal-title text-center" id="exampleModalLabel"><strong> Daftar Akun Baru </strong> </h5>\n            </div>\n            <div class="modal-body">\n                <div class="row">\n                    <div class="col-md-12">\n                        <form id="registration-form" method="POST" action="">\n                            <div role="alert" class="alert alert-danger hidden" id="alert_error"></div>\n                            <div class="form-group">\n                                <label for="name">Nama Lengkap <i class="required">*</i></label>\n                                <input name="fullname" type="text" class="form-control validationMinimal"\n                                       required placeholder="Nama Lengkap" data-validation="false">\n                                <div class="help-block small hidden">Minimal nama karakter nama adalah 3 karakter</div>\n                            </div>\n                            <div class="form-group">\n                                <label for="exampleInputEmail1">Email <i class="required">*</i></label>\n                                <input name="email" type="email" class="form-control validationEmail"\n                                       required placeholder="Enter email" data-validation="false">\n                                <div class="help-block small hidden">Masukkan format email yang valid</div>\n                            </div>\n                            <div class="form-group">\n                                <label for="exampleInputPassword1">Password <i class="required">*</i></label>\n                                <input name="password2" type="password" class="form-control"\n                                       required placeholder="Password" data-validation="false">\n                                <div class="help-block small hidden">Gunakan kombinasi angka, huruf kecil, huruf besar, dan minimal 8 karakter</div>\n                            </div>\n                            <p class="small">\n                                Dengan mengisi form tersebut, kamu dianggap telah menyetujui <a href="https://www.jagoanhosting.com/aturan-layanan/#tos" target="_blank" style="color: #333; text-decoration: underline">Syarat & Ketentuan Layanan</a>\n                            </p>\n                            <div class="form-group">\n                                <button type="submit" class="btn btn-block btn-fill-primary disabled" disabled> <i class="fa fa-spin fa-spinner hidden"></i> Daftar </button>\n                            </div>\n                            <div class="flex justify-space-between align-items-center">\n                                <div class="progress w-100">\n                                    <div class="progress-bar primary-progressbar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:33%">\n                                    </div>\n                                </div>\n                                <div>\n                                    <strong>1/3</strong>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <div class="row">\n                    <div class="col-md-12">\n                        <h5 class="text-center"><strong> Sudah punya akun? </strong></h5>\n                        <a id="login-link" href="#" class="btn btn-block btn-default"> Masuk </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="modal-content modal-register" style="overflow-y: auto; overflow-x: hidden">\n    <div class="modal-header">\n        <h5 class="modal-title text-center" id="exampleModalLabel"> Daftar Akun Baru </h5>\n    </div>\n    <div class="modal-body">\n\n    </div>\n    <div class="modal-footer">\n        <div class="row">\n            <div class="col-md-12">\n                <h5 class="text-center"><strong> Sudah punya akun? </strong></h5>\n                <a id="login-link" href="#" class="btn btn-block btn-secondary"> Masuk </a>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '';

	}
	return __p
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="modal fade" id="confirmation-modals" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">\n    <div class="modal-dialog" role="document">\n        <div class="modal-content">\n            <div class="modal-body">\n                <div class="row">\n                    <div class="col-md-12 text-center">\n                        <div class="otp-icon"><i class="fa fa-envelope"></i></div>\n                        <h3 class="otp-title">Masukkan Kode Verifikasi</h3>\n                        <p>Email Verifikasi telah dikirimkan ke email <strong>' +
	((__t = ( email )) == null ? '' : __t) +
	'</strong>\n                            dengan subject "Verifikasi email pendaftaran akun member Jagoan Hosting"\n                        </p>\n\n                        <div class="otp-alert hidden">\n                            <div class="alert alert-danger hidden" role="alert" data-alert-for="error">\n                                Waduh, Kode Verifikasi kamu salah sob!\n                            </div>\n                            <div class="alert alert-warning hidden" role="alert" data-alert-for="warning">\n                                Waduh, Kode Verifikasi kamu sudah expired sob! coba kirim ulang deh\n                            </div>\n                        </div>\n\n                        <form id="confirmation-form" action="" method="POST">\n                            <input type="hidden" name="clientid" value="' +
	((__t = ( clientid )) == null ? '' : __t) +
	'">\n                            <label class="text-center">\n                                Kode Konfirmasi\n                            </label>\n                            <div class="row top-0">\n                                <div class="col-md-4 col-md-offset-4">\n                                    <div class="row top-0">\n                                        <div class="col-md-3" style="padding: 5px;">\n                                            <input class="form-control otp-input"  maxlength="1" name="verificationcode[]">\n                                        </div>\n                                        <div class="col-md-3" style="padding: 5px;">\n                                            <input class="form-control otp-input" maxlength="1" name="verificationcode[]">\n                                        </div>\n                                        <div class="col-md-3" style="padding: 5px;">\n                                            <input class="form-control otp-input" maxlength="1" name="verificationcode[]">\n                                        </div>\n                                        <div class="col-md-3" style="padding: 5px;">\n                                            <input class="form-control otp-input" maxlength="1" name="verificationcode[]">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="row">\n                                <div class="col-md-12 text-center">\n                                    <button class="btn btn-default disabled" disabled type="submit"><i class="fa fa-spinner fa-spin hidden"></i>Verifikasi</button>\n                                </div>\n                            </div>\n                        </form>\n                        <p class="expiry-information hidden">Tunggu <strong id="otp_expired"></strong> untuk mengirim ulang kode verifikasi</p>\n                        <a id="resend-otp" class="hidden" href="#">Kirim ulang kode verifikasi</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row" id="address-form-wrapper">\n    <div class="col-md-12">\n        <form id="address-form" method="POST" action="">\n            <div class="form-group">\n                <label>Negara *</label>\n                <select name="country" class="form-control">\n                    <option value="ID">Indonesia</option>\n                </select>\n            </div>\n            <div class="form-group state">\n                <label>Provinsi *</label>\n                <select class="form-control" name="state" required="">\n\n                </select>\n            </div>\n            <div class="row">\n                <div class="col-md-6">\n                    <div class="form-group">\n                        <label>Kota *</label>\n                        <input class="form-control validity-no-char" type="text" name="city" placeholder="Ex: Jakarta" maxlength="15" required="">\n                    </div>\n                </div>\n                <div class="col-md-6">\n                    <div class="form-group">\n                        <label>Kode Pos *</label>\n                        <input class="form-control onlyNumber" type="number" name="postcode" placeholder="Ex: 88888" required="" minlength="5" maxlength="6" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="" data-original-title="Kode Pos tidak valid"\n                               maxlength="6" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">\n                    </div>\n                </div>\n            </div>\n            <div class="form-group">\n                <label>Alamat Lengkap *</label><br>\n                <small>Alamat tidak boleh lebih dari 50 karakter dan tidak menggunakan karakter spesial</small>\n                <textarea class="form-control validity-no-char" type="text" name="address1" placeholder="Ex: Jl Majapahit" required="" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="" data-original-title="Alamat tidak valid"></textarea>\n            </div>\n            <div class="form-group">\n                <div class="alert alert-success" style="padding-top: 5px;padding-bottom: 5px;">\n                    <div class="row">\n                        <div class="col-md-1 col-sm-1 col-xs-2" style="padding-left: 10px; padding-right: 0px;">\n                            <input type="checkbox" name="is_register_aff">\n                        </div>\n                        <div class="col-md-11 col-sm-11 col-xs-10" style="padding-left: 10px;">\n                            <p style="margin-bottom: 0px; color: #333; font-weight: bold;">Daftar Afiliasi Sekarang!</p>\n                            <p style="margin-top: 5px; margin-bottom: 5px;"><small style="font-size: 11px; color: #333">Dengan gabung Program Afiliasi Jagoan Hosting, kamu #BisaBanget dapetin Komisi dan Untung Jutaan Rupiah.</small></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="form-group">\n                <button type="submit" class="btn btn-block btn-fill-primary"> <i class="fa fa-spinner fa-spin hidden"></i> Daftar </button>\n            </div>\n            <div class="form-group">\n                <a class="btn btn-block btn-default back-button" data-backto="2"> Kembali </a>\n            </div>\n\n            <div class="flex justify-space-between align-items-center">\n                <div class="progress w-100">\n                    <div class="progress-bar primary-progressbar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:100%">\n                    </div>\n                </div>\n                <div>\n                    <strong>3/3</strong>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- Modal -->\n<div class="modal fade" id="login-modals" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-sm" role="document">\n        <div class="modal-content modal-login">\n            <div class="modal-header">\n                <h5 class="modal-title text-center" id="exampleModalLabel"><strong>Masuk Akun</strong></h5>\n            </div>\n            <div class="modal-body">\n                <div class="row" style="margin-top: 0;">\n                    <div class="col-md-12">\n                        <form id="login-form" method="POST" action="">\n                            <div role="alert" class="alert alert-danger hidden" id="alert_error"></div>\n                            <div class="form-group form-login">\n                                <label for="exampleInputEmail1">Email</label>\n                                <input type="email" class="form-control" name="email" placeholder="Enter email">\n                            </div>\n                            <div class="form-group form-login">\n                                <label for="exampleInputPassword1">Password</label>\n                                <input type="password" class="form-control" name="password" placeholder="Password">\n                            </div>\n                            <div class="form-group btn-login">\n                                <button class="btn btn-block btn-fill-primary" name="submit">\n                                    <i class="fa fa-spin fa-spinner hidden"></i> \n                                    Masuk \n                                </button>\n                            </div>\n                        </form>\n                        <p class="text-center" id="forgot-pwd"><a href="" id="Lupa_Password">Lupa Password?</a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <div class="row">\n                    <div class="col-md-12">\n                        <h5 class="text-center"><strong> Belum punya akun? </strong></h5>\n                        <a id="register-btn" href="#" class="btn btn-block btn-default"> Daftar Akun Baru </a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="alert alert-danger">\n    <p><i class="fas fa-exclamation"></i> ' +
	((__t = ( message )) == null ? '' : __t) +
	'\n    </p>\n</div>';

	}
	return __p
	}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="modal fade" id="beoncustomorderchoosepayment" role="dialog" style="display: none">\n    <div class="modal-dialog modal-sm">\n        <!-- Modal content-->\n        <div class="modal-content">\n            <div class="modal-header payment-modal-header">\n                <button type="button" class="close" data-dismiss="modal">×</button>\n                <h4 class="modal-title text-center text-bold">Pilih Metode Pembayaran</h4>\n            </div>\n            <div class="modal-body" style="padding: 0px">\n                    <div class="panel-group panel-payment-groups" id="accordion-group-payment">\n                        <div class="panel panel-default">\n                            <div class="panel-heading payment-modal-subheading">\n                                <div class="row">\n                                    <div class="col-md-6"><h5 style="margin: 0px;"><strong>Pembayaran Instant</strong></h5></div>\n                                    <div class="col-md-6 text-right;" style="text-align: right;">\n                                        <a class="toggle-btn-hide" data-toggle="collapse" data-parent="#accordion" href="#panel-instan-payment"><small>sembunyikan <i class="fa fa-angle-up" aria-hidden="true"></i></small>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                            <div id="panel-instan-payment" class="panel-collapse panel-collapse-group collapse in">\n                                <div class="panel-body">\n                                    <div class="alert alert-success" style="margin-bottom: 0px;">\n                                        <small>Pilihan metode pembayaran ini akan memastikan transaksi kamu otomatis tervalidasi saat itu juga, 24/7</small>\n                                    </div>\n                                    <div class="panel-group panel-paymentgateway-item" id="accordion" role="tablist" aria-multiselectable="true" style="margin-bottom: 0px;">\n\n                                        ';
	 payments.forEach(function(payment){ ;
	__p += '\n                                        <div class="panel" style="margin-top: 0px; display: block;">\n                                            <div class="panel-heading" role="tab" id="heading' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" style="padding-top: 0px; padding-bottom: 0px;">\n                                                <div class="panel-title payment-panel-title clearfix" style="font-size: 12px;">\n                                                    <a role="button" data-trackingtitle="Pilih Metode Pembayaran ' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" data-trackingcategory="MainCTA" data-trackinglabel="Popup Payment Method" data-toggle="collapse" data-payment="' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" data-parent="#accordion" href="#collapse' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" aria-expanded="false" class="collapsed choose-payment-item-btn" aria-controls="collapse' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'">\n                                                        <img src="/templates/orderforms/sobat_jagoan/images/' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'.png" class="bank-img" alt="">\n                                                        ' +
	((__t = ( payment.displayname )) == null ? '' : __t) +
	'\n                                                        <i class="more-less fa fa-angle-right pull-right" style="margin-top: 15px;font-size: 18px;"></i>\n                                                    </a>\n                                                </div>\n                                            </div>\n                                            <div id="collapse' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" class="panel-collapse collapse panel-payment-tutorial" role="tabpanel" aria-labelledby="heading' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" aria-expanded="false">\n                                                <div class="panel-body">\n                                                    <div class="row top-0">\n                                                        <div class="col-md-12 text-center">\n                                                            <label class="checkbox">\n                                                                <input data-payment="' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" type="checkbox" name="accepttos" class="accepttos" id="accepttos' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'">\n                                                                Saya telah membaca dan setuju dengan <a href="https://www.jagoanhosting.com/aturan-layanan/#tos" target="_blank">Syarat & Ketentuan Layanan</a>\n                                                            </label>\n                                                        </div>\n                                                        <div class="col-md-12">\n                                                            <button data-payment="' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" class="btn btn-pink btn-block btn-select-payment" id="btn-select-payment-' +
	((__t = ( payment.module )) == null ? '' : __t) +
	'" disabled="true"> <i class="fa fa-spinner fa-spin hidden"></i> CHECKOUT SEKARANG</button>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        ';
	 }) ;
	__p += '\n\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs = __webpack_require__(3);
	var CartsSDK = __webpack_require__(7);
	var ApiHelper = __webpack_require__(6);

	var __layouts = {
	    main: __webpack_require__(22),
	    region: __webpack_require__(23),
	    ip: __webpack_require__(24),
	    step_advance_vps: __webpack_require__(25),
	    content_pilih_xcube: __webpack_require__(26),
	    content_aio: __webpack_require__(27),
	    content_ospanel: __webpack_require__(28),
	    content_os_only: __webpack_require__(29),
	    content_konfigurasi: __webpack_require__(30),
	    content_hostname: __webpack_require__(31),
	    information_konfigurasi: __webpack_require__(32),
	}

	var VpsxSDK = {
	    render: {
	        formPanels: function (index, data) {
	            var ServicesSDK = __webpack_require__(5)

	            $('#order-forms-wrapper').append(__layouts.main({
	                    groupname: data.groupname,
	                    pid: data.pid,
	                    index: index,
	                    minimize: data.minimize
	                }
	            )).promise().then(function () {
	                var element = $(this).find('.panel').last()

	                ServicesSDK.render.pilihpaket(element, data);
	                ServicesSDK.render.pilihbilling(element, data);
	                ServicesSDK.render.sectionUpsale(element, data);
	                ServicesSDK.render.sectionPenawaran(element, data);
	                // VpsxSDK.render.region(element, data);
	                VpsxSDK.render.ip(element, data);
	                VpsxSDK.render.step_advance_vps(element, data, index)
	                ServicesSDK.render.minimizeSection(index)
	                ServicesSDK.events.removeProduct();
	                ServicesSDK.events.minimizePanel();
	                ServicesSDK.events.maximizePanel();

	                if (data.crosssaleparent == 0) {
	                    ServicesSDK.events.masterCrossSale(index, data.pid)
	                }else {
	                    element.find('.section-area-footer').html(__layouts.btn_SimpanCrossSales)
	                    ServicesSDK.events.simpanCrossSale()
	                }
	            });
	        },
	        region: function (element, data) {
	            var pid = data.pid;
	            var config = {}
	            Orderconfigs.products[pid].config.forEach(function (value) {
	                if (value.optionname.toLowerCase() != "region") {
	                    return
	                }

	                config = value
	            })

	            element.find('.section-region').html(__layouts.region({
	                selected: data.configoptions.region,
	                configs: config
	            }
	            ))
	                .promise()
	                .then(function () {
	                    VpsxSDK.events.changeRegion()
	                });
	        },
	        ip: function (element, data) {
	            element.find('.section-ip').html(__layouts.ip({
	                // selected: data.configoptions.ip_public
	            }
	            ))
	                .promise()
	                .then(function () {
	                    // VpsxSDK.events.toggleIpPublic();
	                });
	        },
	        step_advance_vps: function (element, data, index) {
	            element.find('.section-konfigurasi').append(__layouts.step_advance_vps({
	                    template : data.template,
	                    hostname: data.credentials.hostname,
	                    password: data.credentials.password,
	                    index: index
	                }
	            ))
	                .promise()
	                .then(function () {
	                    VpsxSDK.render.content_xcube(element, data, index)
	                    VpsxSDK.render.content_konfigurasi(element, data, index)
	                    VpsxSDK.render.informasi_konfigurasi(element, data)
	                    VpsxSDK.render.content_hostname(element, data, index)

	                    VpsxSDK.events.nextConfiguration();
	                    VpsxSDK.events.backConfiguration();
	                    VpsxSDK.events.finishConfiguration();
	                    VpsxSDK.events.checkResumePembelian(element, data);
	                });
	        },
	        content_xcube: function (element, data, index) {
	            var getImage = VpsxSDK.utils.getImage(data.pid)
	            var selectedImage = VpsxSDK.utils.selectedTemplate(data.pid, data.template)

	            var template = {
	                images: getImage,
	                selected: selectedImage
	            }

	            element.find('.content-template').append(__layouts.content_pilih_xcube({
	                    id: index,
	                    selected: selectedImage
	                }
	            ))
	                .promise()
	                .then(function () {
	                    VpsxSDK.render.content_aio(element, template, index)
	                    VpsxSDK.render.content_ospanel(element, template, index)
	                    VpsxSDK.render.content_os(element, template, index)
	                    VpsxSDK.events.changeTemplate();
	                });
	        },
	        content_aio: function (element, data, index) {
	            element.find("#aio-"+index).html(__layouts.content_aio({
	                images: data.images,
	                selected: data.selected,
	                id: index
	            }))
	        },
	        content_ospanel: function (element, data, index) {
	            element.find("#ospanel-"+index).html(__layouts.content_ospanel({
	                images: data.images,
	                selected: data.selected,
	                id: index,
	            })).promise()
	                .then(function () {
	                    VpsxSDK.events.changeOsInTemplate()
	                })
	        },
	        content_os: function (element, data, index) {
	            element.find("#os-"+index).html(__layouts.content_os_only({
	                images: data.images,
	                selected: data.selected,
	                id: index,
	            })).promise()
	                .then(function () {
	                    VpsxSDK.events.changeOsVersion()
	                })
	        },
	        content_konfigurasi: function (element, data, index) {
	            if (!data.template) {
	                element.find("#content-konfigurasi").html("")
	                return;
	            }

	            var name = "";
	            switch (data.template.type) {
	                case "aio":
	                    name = data.template.apps
	                    break
	                case "ospanel":
	                    name = data.template.panel
	                    break;
	            }

	            var form = VpsxSDK.static.configuration_form(name);
	            if (!form) {
	                element.find("#content-konfigurasi").html("")
	                return
	            }

	            if (data.template.config) {
	                var savedValue = data.template.config

	                form['no_header'].forEach(function (value) {
	                    savedValue.forEach(function (newValue) {
	                        if (value.name == newValue.name) {
	                            value.default_value = newValue['value']
	                        }
	                    })
	                })

	                form['admin_account'].forEach(function (value) {
	                    savedValue.forEach(function (newValue) {
	                        if (value.name == newValue.name) {
	                            value.default_value = newValue['value']
	                        }
	                    })
	                })

	                form['database_setting'].forEach(function (value) {
	                    savedValue.forEach(function (newValue) {
	                        if (value.name == newValue.name) {
	                            value.default_value = newValue['value']
	                        }
	                    })
	                })
	            }

	            element.find("#content-konfigurasi").html(__layouts.content_konfigurasi({
	                forms: form,
	                index: index,
	            })).promise()
	                .then(function () {
	                    VpsxSDK.utils.validatePassword(index)
	                    VpsxSDK.utils.validateDomain(index)
	                    VpsxSDK.utils.validateEmail(index)
	                    VpsxSDK.utils.validateNoSpace(index)
	                    VpsxSDK.utils.validateName(index)
	                })
	        },
	        informasi_konfigurasi: function (element, data) {
	            element.find("#info-konfigurasi").html(__layouts.information_konfigurasi({
	                hostname: data.credentials.hostname,
	                password: data.credentials.password,
	                type: data.template.type,
	                os: data.template.osName,
	                template: data.template,
	            })).promise()
	                .then(function () {
	                    VpsxSDK.events.togglePasswordInformation();
	                    VpsxSDK.events.suntingKonfigurasi();
	                })
	        },
	        content_hostname: function (element, data, index) {
	            element.find("#content-hostname").html(__layouts.content_hostname({
	                credentials: data.credentials
	            })).promise()
	                .then(function () {
	                    VpsxSDK.utils.validatePasswordCredential(index)
	                    VpsxSDK.utils.validateHostname(index);
	                })
	        },
	    },
	    events: {
	        changeRegion: function () {
	            $('.region').off().on('click', function (e) {
	                var configid = $(this).attr('data-configid');
	                var region = $(this).attr('data-region');
	                var panel = $(this).parents(".panel");
	                var index = panel.attr("data-index")

	                panel.find('.region.checked').removeClass('checked');
	                $(this).addClass('checked');

	                CartsSDK.vpsx_events.changeConfigType1(index, configid, region);
	            })
	        },
	        toggleIpPublic: function () {
	            $("input[name='ip-public']").off().on('change', function () {
	                var index = $(this).parents(".panel").attr("data-index")
	                var checkbox = $(this).parents('.checkbox-ip')
	                var checked = true;

	                if (checkbox.hasClass('checked')) {
	                    checkbox.removeClass('checked')
	                    checked = false
	                } else {
	                    checkbox.addClass('checked')
	                }

	                CartsSDK.vpsx_events.changeStatusIpPublic(index, checked)
	            })
	        },
	        changeTemplate: function () {
	            $('.template').off().on('click', function () {
	                var index = $(this).parents('.panel').attr('data-index');
	                var panel = $(this).parents('.tab-content');
	                var previous_template = panel.find('.template.checked');
	                var type = $(this).attr('data-type')
	                var configid = $(this).attr('data-template')
	                var valueText = $(this).attr('aria-valuetext')

	                previous_template.removeClass('checked');
	                previous_template.find('.detail-class').addClass('none');

	                $(this).addClass('checked');
	                $(this).find('.detail-class').removeClass('none');

	                var dataTemplate = {
	                    "type": type,
	                    "configid": configid
	                }
	                switch (type) {
	                    case "aio":
	                        dataTemplate.apps = valueText
	                        dataTemplate.osName = $(this).attr('aria-hidden')
	                        break;
	                    case "ospanel":
	                        dataTemplate.panel = valueText
	                        dataTemplate.osName = $(this).find('select option:selected').text()
	                        break
	                    case "os_only":
	                        dataTemplate.configid = $(this).find('select[name="osOptions"]').val()
	                        dataTemplate.os = configid
	                        dataTemplate.osName = configid + ' ' + $(this).find('select option:selected').text()
	                        dataTemplate.bit = $(this).parents('.template-container').attr('data-bit')
	                        break;
	                }
	                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)

	                // Replace Config
	                var element = $(this).parents('.panel')
	                var data = CartsSDK.vpsx_events.getCartByIndex(index)
	                VpsxSDK.render.content_konfigurasi(element, data, index)

	                // Check button yang tampil
	                var name = "";
	                switch (data.template.type) {
	                    case "aio":
	                        name = data.template.apps
	                        break
	                    case "ospanel":
	                        name = data.template.panel
	                        break;
	                }

	                var configs = VpsxSDK.static.configuration_form(name);
	                var section = $(this).parents('.section-konfigurasi')
	                VpsxSDK.events.hideButtonConfig(section, "next-configuration")
	                VpsxSDK.events.hideButtonConfig(section, "finish-configuration")

	                if (configs) {
	                    VpsxSDK.events.showButtonConfig(section, "next-configuration")
	                } else {
	                    VpsxSDK.events.showButtonConfig(section, "finish-configuration")
	                }

	                // Hide alert x-cube
	                element.find('.alert-config').addClass('hidden')
	            })
	        },
	        changeOsInTemplate: function () {
	            $("select[name='osPanelOptions']").off().on('change', function () {
	                var pid = $(this).val()
	                var panel = $(this).parents('.template.checked')
	                var panelName = panel.attr('aria-valuetext')
	                var index = $(this).parents('.panel').attr('data-index');
	                var osName = $(this).find('option:selected').text();

	                var dataTemplate = {
	                    "type": "ospanel",
	                    "configid": pid,
	                    "panel": panelName,
	                    "osName": osName,
	                }

	                panel.attr('data-template', pid)

	                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)
	            })
	        },
	        changeOsVersion: function () {
	            $("select[name='osOptions']").off().on('change', function () {
	                var pid = $(this).val()
	                var panel = $(this).parents('.template.checked')
	                var bit = panel.parents('.template-container').attr('data-bit');
	                var os = panel.attr('aria-valuetext')
	                var osName = panel.attr('aria-valuetext') + ' ' + $(this).find('option:selected').text()
	                var index = $(this).parents('.panel').attr('data-index');
	                var dataTemplate = {
	                    "type": "os",
	                    "configid": pid,
	                    "os": os,
	                    "osName": osName,
	                    "bit": bit
	                }

	                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)
	            })
	        },
	        nextConfiguration: function () {
	            $("button[name='next-configuration']").off().on('click', function () {
	                var configuration = $(this).parents('.row').prev()
	                var indicator = configuration.prev().find('.progressbar');
	                var previous_wrapper = configuration.find('.col-md-12.active')
	                var next_wrapper = previous_wrapper.next()
	                var next_step = next_wrapper.attr('data-step')
	                var nextButton = $(this);
	                var backButton = $(this).parents('.row').find("button[name='back-configuration']")
	                var finishButton = $(this).parents('.row').find("button[name='finish-configuration']")
	                var index = $(this).parents('.panel').attr("data-index")
	                var form = $(this).parents('.section-konfigurasi').find("form[name='configuration-"+ index +"']");
	                var panel = $(this).parents('.panel')

	                previous_wrapper.removeClass('active');
	                previous_wrapper.addClass('hidden')
	                next_wrapper.removeClass('hidden')
	                next_wrapper.addClass('active')

	                indicator.find("li[data-step='"+next_step+"']").addClass('active');

	                switch (next_step) {
	                    case "1":
	                        nextButton.removeClass('hidden')
	                        backButton.addClass('hidden')
	                        break;
	                    case "2":
	                        backButton.removeClass('hidden')
	                        backButton.html('< Hostname')
	                        nextButton.addClass('hidden')
	                        nextButton.html('Konfigurasi >')
	                        finishButton.addClass('hidden')

	                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

	                        var name = "";
	                        switch (data.template.type) {
	                            case "aio":
	                                name = data.template.apps
	                                break
	                            case "ospanel":
	                                name = data.template.panel
	                                break;
	                        }

	                        var configs = VpsxSDK.static.configuration_form(name);
	                        if (configs) {
	                            nextButton.removeClass('hidden')
	                        }
	                        if (Object.keys(data.template).length > 0 && data.template.constructor === Object && !configs) {
	                            finishButton.removeClass('hidden')
	                        }

	                        break;
	                    case "3":
	                        backButton.removeClass('hidden')
	                        backButton.html('< Pilih X-Cube')
	                        nextButton.addClass('hidden')
	                        finishButton.addClass('hidden');

	                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

	                        var name = "";
	                        switch (data.template.type) {
	                            case "aio":
	                                name = data.template.apps
	                                break
	                            case "ospanel":
	                                name = data.template.panel
	                                break;
	                        }

	                        VpsxSDK.events.checkValidationForm(form)

	                        if ("config" in data.template) {
	                            if (data.template.isComplete == 1) {
	                                finishButton.click()
	                            } else {
	                                panel.find(".content-konfigurasi").removeClass('hidden')
	                                panel.find("#info-konfigurasi").addClass("hidden")
	                            }
	                        } else {
	                            panel.find(".content-konfigurasi").removeClass('hidden')
	                            panel.find("#info-konfigurasi").addClass("hidden")
	                        }

	                        var configs = VpsxSDK.static.configuration_form(name);
	                        if (!configs) {
	                            finishButton.click();
	                        }
	                        break;
	                }
	            })
	        },
	        finishConfiguration: function () {
	            $("button[name='finish-configuration']").off().on('click', function () {
	                var index = $(this).parents('.panel').attr("data-index")
	                var data = CartsSDK.vpsx_events.getCartByIndex(index)
	                var nextButton = $(this).parents('.row').find("button[name='next-configuration']")
	                var backButton = $(this).parents('.row').find("button[name='back-configuration']")
	                var panel = $(this).parents('.panel');
	                var form = $(this).parents('.section-konfigurasi').find("form[name='configuration-"+ index +"']");

	                VpsxSDK.render.informasi_konfigurasi(panel, data)
	                CartsSDK.vpsx_events.toggleRingkasanConfig(index, true)

	                // Show informasi konfigurasi
	                panel.find("#info-konfigurasi").removeClass("hidden")

	                $(this).addClass('hidden');
	                backButton.addClass('hidden')

	                var name = "";
	                switch (data.template.type) {
	                    case "aio":
	                        name = data.template.apps
	                        break
	                    case "ospanel":
	                        name = data.template.panel
	                        break;
	                }

	                var configs = VpsxSDK.static.configuration_form(name);
	                if (!configs) {
	                    nextButton.click();
	                } else {
	                    var arrForm = form.serializeArray()
	                    CartsSDK.vpsx_events.saveConfigurationApps(index, arrForm)

	                    panel.find(".content-konfigurasi").addClass('hidden')
	                }
	            })
	        },
	        backConfiguration: function () {
	            $("button[name='back-configuration']").off().on('click', function () {
	                var configuration = $(this).parents('.row').prev()
	                var indicator = configuration.prev().find('.progressbar');
	                var elCurrent_step = indicator.find('li.active').last()
	                var current_step = parseInt(elCurrent_step.attr('data-step'))
	                var goToStep = indicator.find("li[data-step='"+ (current_step - 1)+"']")
	                var index = $(this).parents('.panel').attr("data-index")

	                elCurrent_step.removeClass('active')
	                configuration.find("[data-step='"+ current_step +"']").removeClass('active').addClass('hidden')
	                configuration.find("[data-step='"+ (current_step - 1) +"']").removeClass('hidden').addClass('active')

	                var backButton = $(this);
	                var nextButton = $(this).parents('.row').find("button[name='next-configuration']")
	                var finishButton = $(this).parents('.row').find("button[name='finish-configuration']")

	                var step = (current_step - 1)

	                switch (step) {
	                    case 1:
	                        nextButton.removeClass('hidden')
	                        nextButton.html('Pilih X-Cube >')
	                        backButton.addClass('hidden')
	                        finishButton.addClass('hidden')
	                        break;
	                    case 2:
	                        backButton.removeClass('hidden')
	                        backButton.html('< Hostname')
	                        nextButton.html('Konfigurasi >')
	                        finishButton.addClass('hidden')
	                        nextButton.addClass('hidden')

	                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

	                        var name = "";
	                        switch (data.template.type) {
	                            case "aio":
	                                name = data.template.apps
	                                break
	                            case "ospanel":
	                                name = data.template.panel
	                                break;
	                        }

	                        var configs = VpsxSDK.static.configuration_form(name);
	                        if (!configs) {
	                            finishButton.removeClass('hidden')
	                        } else {
	                            nextButton.removeClass('hidden')
	                        }
	                        break;
	                    case 3:
	                        backButton.removeClass('hidden')
	                        backButton.html('< Pilih X-Cube')
	                        nextButton.addClass('hidden')
	                        break;
	                }
	            })
	        },
	        checkResumePembelian: function (element, data) {
	            const nextButton = element.find('button[name=next-configuration]')
	            const finishButton = element.find('button[name=next-configuration]')

	            if (data.isShowResume) {
	                nextButton.click()
	                finishButton.click()
	            }
	        },
	        changeValidateStatus: function (element, status) {
	            element.attr("data-validation", status)
	            var form = element.parents('form')

	            // TODO :: If input not true
	            if (!status) {
	                var buttonNext = form.parents('.section-konfigurasi').find("button[name='next-configuration']")
	                buttonNext.addClass('hidden')

	                var panel = form.parents(".panel");
	                var index = panel.attr("data-index")
	                CartsSDK.vpsx_events.deleteConfigurationApps(index)
	                return
	            }

	            VpsxSDK.events.checkValidationForm(form)
	        },
	        checkValidationForm: function (form) {
	            var arrForm = form.serializeArray();
	            var buttonFinish = form.parents('.section-konfigurasi').find("button[name='finish-configuration']")
	            var panel = form.parents(".panel");
	            var index = panel.attr("data-index")
	            var status = true

	            form.find('.row').each(function(index, element) {
	                var input = $(this).find('input')
	                var dataValidation = input.attr('data-validation');

	                if (dataValidation == "false") {
	                    status = false
	                }
	            })

	            if (!status) {
	                return
	            }

	            buttonFinish.removeClass('hidden')
	        },
	        hideButtonConfig: function (element, buttonName) {
	            element.find("button[name='" + buttonName + "']").addClass('hidden')
	        },
	        showButtonConfig: function (element, buttonName) {
	            element.find("button[name='" + buttonName + "']").removeClass('hidden')
	        },
	        togglePasswordInformation: function () {
	            $(".toggle-password").off().on('click', function () {
	                if ($(this).hasClass('fa-eye')){
	                    $(this).removeClass('fa-eye').addClass('fa-eye-slash')
	                    $(this).closest('table').find('.password-masking')
	                        .html($(this).attr('data-password'))
	                } else {
	                    $(this).removeClass('fa-eye-slash').addClass('fa-eye')
	                    $(this).closest('table').find('.password-masking')
	                        .html('************')
	                }
	            })
	        },
	        suntingKonfigurasi: function () {
	            $(".sunting-konfigurasi").off().on('click', function () {
	                var index = $(this).parents('.panel').attr("data-index")
	                var panel = $(this).parents('.panel')
	                var backButton = panel.find("button[name='back-configuration']")

	                var data = CartsSDK.vpsx_events.getCartByIndex(index)

	                var name = "";
	                switch (data.template.type) {
	                    case "aio":
	                        name = data.template.apps
	                        break
	                    case "ospanel":
	                        name = data.template.panel
	                        break;
	                }

	                var configs = VpsxSDK.static.configuration_form(name);
	                if (configs) {
	                    CartsSDK.vpsx_events.toggleConfigAppsVisibility(index, 0)
	                    panel.find('.content-konfigurasi').removeClass('hidden')
	                    panel.find('#info-konfigurasi').addClass('hidden')
	                }

	                CartsSDK.vpsx_events.toggleRingkasanConfig(index, false)

	                for (let i = 1; i < 3; i++) {
	                    backButton.click()
	                }
	            })
	        }
	    },
	    utils: {
	        getImage: function (pid) {
	            var configs = []
	            var result = {
	                "os_only" : {
	                    "x64" : [],
	                    "x32" : [],
	                },
	                "os_panel" : {},
	                "all_in_one" : []
	            };

	            Orderconfigs.products[pid].config.forEach(function (value) {
	                if (value.optionname.toLowerCase() != "image") {
	                    return
	                }
	                configs = value.options
	            })
	            
	            configs.forEach(function (value) {
	                var arr = value.name.split("|")
	                var subResult = {};

	                subResult.configid = value.id;
	                subResult.id = arr[0]

	                subResult.distro = arr[2]
	                subResult.osversion = arr[3]
	                subResult.bit = arr[4]
	                subResult.panel = arr[5] ? arr[5] : "-"
	                subResult.apps = arr[6] ? arr[6] : "-"
	                subResult.link = Orderconfigs.vpsx_link_tutorial[arr[0]] ? Orderconfigs.vpsx_link_tutorial[arr[0]] : null

	                switch (arr[1]) {
	                    case "OS Only":
	                        var bit = "x" + subResult.bit
	                        if (subResult.distro in result['os_only'][bit]) {
	                            result['os_only'][bit][subResult.distro].push(subResult)
	                        } else {
	                            result['os_only'][bit][subResult.distro] = [subResult]
	                        }
	                        break;
	                    case "OS Template":
	                        if (subResult.panel in result['os_panel']) {
	                            result['os_panel'][subResult.panel].push(subResult)
	                        } else {
	                            result['os_panel'][subResult.panel] = [subResult]
	                        }
	                        break;
	                    case "All in one":
	                        result['all_in_one'].push(subResult)
	                        break;
	                }
	            })

	            return result
	        },
	        selectedTemplate: function (pid, template) {
	            var type = template.type
	            var configid = template.configid
	            var listTemplates = VpsxSDK.utils.getImage(pid);

	            switch(type) {
	                case "ospanel":
	                    template.indexPanel = listTemplates['os_panel'][template.panel]
	                        .findIndex(x => x.configid == template.configid)
	                    break
	                case "os_only":
	                    template.indexPanel = listTemplates['os_only'][template.bit][template.os]
	                        .findIndex(x => x.configid == template.configid)
	                    break
	            }

	            return template
	        },
	        validatePassword: function (index) {
	            $("input.validate-password").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32 || e.keyCode == 58 || e.keyCode == 59 || e.keyCode == 34 || e.keyCode == 39) {
	                    e.preventDefault()
	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return
	                }

	                var regexSchema = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,()<>-]).{8,}$/
	                if (!regexSchema.test(value)) {
	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')

	                VpsxSDK.events.changeValidateStatus($(this), true)
	            })
	        },
	        validateDomain: function (index) {
	            $("input.validate-domain").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32) {
	                    e.preventDefault()
	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return
	                }

	                var regex = new RegExp("^[a-zA-Z0-9.-]+$");
	                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	                if (!regex.test(key)) {
	                    event.preventDefault();
	                    return false;
	                }

	                if (this.selectionStart==0){
	                    if(String.fromCharCode(e.which) == '.'){
	                        event.preventDefault();
	                        return false;
	                    }
	                }

	                var regexSchema = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g
	                if (!regexSchema.test(value)) {
	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')
	                VpsxSDK.events.changeValidateStatus($(this), true)
	            })
	        },
	        validateEmail: function (index) {
	            $("input.validate-email").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32) {
	                    e.preventDefault()
	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return
	                }

	                var regexSchema = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	                if (!regexSchema.test(value.toLowerCase())) {
	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')

	                VpsxSDK.events.changeValidateStatus($(this), true)
	            })
	        },
	        validateNoSpace: function (index) {
	            $("input.validate-nospace").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32) {
	                    e.preventDefault()
	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return
	                }

	                if (value.length <= 8) {
	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')
	                VpsxSDK.events.changeValidateStatus($(this), true)
	            })
	        },
	        validateName: function (index) {
	            $("input.validate-name").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                if (value.length <= 8) {
	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    VpsxSDK.events.changeValidateStatus($(this), false)
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')

	                VpsxSDK.events.changeValidateStatus($(this), true)
	            })
	        },
	        validateHostname: function (index) {
	            $("input.validate-hostname").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32) {
	                    e.preventDefault()
	                    return
	                }

	                if (this.selectionStart==0){
	                    if(String.fromCharCode(e.which) == '.'){
	                        event.preventDefault();
	                        return false;
	                    }
	                }

	                VpsxSDK.events.hideButtonConfig($(this).parents(".panel"), "next-configuration")

	                // Cannot use bad character
	                var regex = new RegExp("^[a-zA-Z0-9.-]+$");
	                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	                if (!regex.test(key)) {
	                    event.preventDefault();
	                    return false;
	                }

	                var regexSchema = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]?$/g;
	                if (!regexSchema.test(value)) {
	                    CartsSDK.vpsx_events.saveCredentials(index, "hostname", "")

	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    return;
	                }

	                var dot = value.match(/\./g).length;
	                if (dot < 2) {
	                    CartsSDK.vpsx_events.saveCredentials(index, "hostname", "")

	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')

	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')

	                CartsSDK.vpsx_events.saveCredentials(index, "hostname", value)
	            })
	        },
	        validatePasswordCredential: function (index) {
	            $("input.validate-password-credentials").off().on('keypress keyup', function (e) {
	                var value = $(this).val()
	                var formGroup = $(this).parent()

	                // Cannot use space
	                if (e.keyCode == 32 || e.keyCode == 58 || e.keyCode == 59 || e.keyCode == 34 || e.keyCode == 39) {
	                    e.preventDefault()
	                    return
	                }

	                VpsxSDK.events.hideButtonConfig($(this).parents(".panel"), "next-configuration")

	                var regexSchema = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,()<>-]).{8,}$/
	                if (!regexSchema.test(value)) {
	                    CartsSDK.vpsx_events.saveCredentials(index, "password", "")

	                    formGroup.addClass('has-error')
	                    formGroup.find('.help-block').removeClass('none')
	                    return;
	                }

	                formGroup.removeClass('has-error')
	                formGroup.find('.help-block').addClass('none')

	                CartsSDK.vpsx_events.saveCredentials(index, "password", value)
	            })
	        },
	    },
	    static: {
	        configuration_form: function (name) {
	            var data = {
	                "wordpress" : {
	                    "no_header": [
	                        {name: "wordpress_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "wordpress_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "wordpress_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "wordpress_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "wordpress_db_name", label: "Database Name", default_value: "wordpress_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "wordpress_db_user", label: "Database User", default_value: "wordpress_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "wordpress_db_pass", label: "Database Password", default_value: "WordpressPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "prestashop" : {
	                    "no_header": [
	                        {name: "prestashop_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "prestashop_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "prestashop_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "prestashop_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "prestashop_db_name", label: "Database Name", default_value: "prestashop_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "prestashop_db_user", label: "Database User", default_value: "prestashop_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "prestashop_db_pass", label: "Database Password", default_value: "PrestashopPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "joomla" : {
	                    "no_header": [
	                        {name: "joomla_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "joomla_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "joomla_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "joomla_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "joomla_db_name", label: "Database Name", default_value: "joomla_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "joomla_db_user", label: "Database User", default_value: "joomla_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "joomla_db_pass", label: "Database Password", default_value: "JoomlaPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "drupal" : {
	                    "no_header": [
	                        {name: "drupal_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "drupal_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "drupal_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "drupal_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "drupal_db_name", label: "Database Name", default_value: "drupal_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "drupal_db_user", label: "Database User", default_value: "drupal_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "drupal_db_pass", label: "Database Password", default_value: "DrupalPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "moodle" : {
	                    "no_header": [
	                        {name: "moodle_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "moodle_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "moodle_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "moodle_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "moodle_db_name", label: "Database Name", default_value: "moodle_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "moodle_db_user", label: "Database User", default_value: "moodle_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "moodle_db_pass", label: "Database Password", default_value: "MoodlePass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "opencart" : {
	                    "no_header": [
	                        {name: "opencart_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "opencart_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
	                        {name: "opencart_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
	                        {name: "opencart_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "opencart_db_name", label: "Database Name", default_value: "opencart_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "opencart_db_user", label: "Database User", default_value: "opencart_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "opencart_db_pass", label: "Database Password", default_value: "OpencartPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	                "zyacbt" : {
	                    "no_header": [
	                        {name: "zyacbt_cbt_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
	                    ],
	                    "admin_account": [
	                        {name: "zyacbt_cbt_admin_name", label: "Admin Username", default_value: "admin", validation: "validate-nospace", placeholder: "Masukkan username administrator"},
	                        {name: "zyacbt_cbt_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
	                    ],
	                    "database_setting": [
	                        {name: "zyacbt_db_name", label: "Database Name", default_value: "zya_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
	                        {name: "zyacbt_db_user", label: "Database User", default_value: "zya_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
	                        {name: "zyacbt_db_pass", label: "Database Password", default_value: "ZyaCbtPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
	                    ]
	                },
	            }

	            return data[name]
	        },
	    }
	}

	module.exports = VpsxSDK;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="panel" id="panel' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-type="product" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-pid="' +
	((__t = ( pid )) == null ? '' : __t) +
	'">\r\n    <div class="panel-heading panel-heading-order">\r\n        <div class="flex flex-row justify-space-between">\r\n            <div class="header-left-panel">\r\n                <h3 class="title">Layanan yang kamu beli - ' +
	((__t = ( groupname )) == null ? '' : __t) +
	'</h3>\r\n            </div>\r\n            <div class="header-right-panel">\r\n                <div class="flex">\r\n                    <span class="domain-name">\r\n\r\n                    </span>\r\n                    <span class="maximize-icon pointer hidden"><i class="fas fa-plus"></i></span>\r\n                    <span class="minimize-icon pointer"><i class="fas fa-minus"></i></span>\r\n                    <span class="remove-panel pointer"><i class="fas fa-trash-alt"></i></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="panel-body panel-body-order">\r\n        <div class="minimize-panel hidden">\r\n\r\n        </div>\r\n        <div class="maximize-panel">\r\n            <div class="col-md-6">\r\n                <div class="section-pilihpaket">\r\n\r\n                </div>\r\n            </div>\r\n            <div class="col-md-6">\r\n                <div class="section-billingcycle">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-upsale">\r\n\r\n                </div>\r\n            </div>\r\n\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-cross-sales">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-penawaran">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-ip">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-region">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <hr class="vpsx-konfigurasi-divider">\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-konfigurasi">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-tambah-domain">\r\n\r\n                </div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-domain-serupa"></div>\r\n            </div>\r\n\r\n            <div class="col-md-12">\r\n                <div class="section-area-footer"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h4 class="form-title">\n    Pilih lokasi server\n</h4>\n\n<div class="row">\n    ';
	 configs.options.forEach(function(config) { ;
	__p += '\n    <div class="col-md-6">\n        <div class="region ' +
	((__t = ( config.id == selected.selectedvalue ? 'checked' : '')) == null ? '' : __t) +
	'"\n             data-region="' +
	((__t = ( config.id )) == null ? '' : __t) +
	'" data-configid="' +
	((__t = ( configs.id )) == null ? '' : __t) +
	'">\n\n            ';
	 if (config.name.toLowerCase().includes('id')) { ;
	__p += '\n            <div class="img">\n                <img src="/modules/addons/beon_order/templates/assets/images/flag-indonesia.png"\n                     alt="">\n            </div>\n\n            <div class="text">\n                <p>Indonesia</p>\n                <h4>ID</h4>\n            </div>\n            ';
	 } ;
	__p += '\n\n            ';
	 if (config.name.toLowerCase().includes('sg')) { ;
	__p += '\n            <div class="img">\n                <img src="/modules/addons/beon_order/templates/assets/images/flag-sg.png"\n                     alt="">\n            </div>\n\n            <div class="text">\n                <p>Singapore</p>\n                <h4>SG</h4>\n            </div>\n            ';
	 } ;
	__p += '\n        </div>\n    </div>\n    ';
	 }) ;
	__p += '\n</div>';

	}
	return __p
	}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4 class="form-title">\n    IP Server\n</h4>\n\n<div class="detail-performance">\n    <div class="checkbox-ip checked">\n        <label class="container-checkbox">IP Private\n            <input type="checkbox" name="ip-private" value="1" checked disabled>\n            <span class="checkmark"></span>\n        </label>\n    </div>\n\n    <div class="checkbox-ip ip-public checked">\n        <label class="container-checkbox">IP Public\n            <input type="checkbox" name="ip-public" checked disabled>\n            <span class="checkmark"></span>\n        </label>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row">\n    <div class="col-md-4">\n        <h4 class="form-title title">\n            Konfigurasi VPS\n        </h4>\n    </div>\n\n    <div class="col-md-8">\n        <div class="root">\n            <div class="container-step">\n                <ul class="progressbar">\n                    <li class="active" data-step="1">Hostname</li>\n                    <li data-step="2">Pilihan X-Cube</li>\n                    <li data-step="3">Konfigurasi</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class="col-md-12">\n        <div class="alert alert-danger alert-config hidden" id="config-error-' +
	((__t = ( index )) == null ? '' : __t) +
	'" role="alert" data-alert-for="warning">\n            Waduh, Kode Verifikasi kamu sudah expired sob! coba kirim ulang deh\n        </div>\n    </div>\n</div>\n\n<div class="configuration row">\n    <div class="col-md-12 content-hostname active" id="content-hostname" data-step="1">\n\n    </div>\n\n    <div class="col-md-12 content-template hidden" id="content" data-step="2">\n\n    </div>\n\n    <div class="hidden" data-step="3">\n        <div class="col-md-12 content-konfigurasi" id="content-konfigurasi">\n        </div>\n        <div class="col-md-12 hidden" id="info-konfigurasi">\n        </div>\n    </div>\n</div>\n\n<div class="row">\n    <div class="col-md-6">\n        <button class="btn btn-default hidden text-bold" name="back-configuration">\n           <b> < Sebelumnya </b>\n        </button>\n    </div>\n    <div class="col-md-6 text-right">\n        <button class="btn btn-default ' +
	((__t = ( hostname.length > 1 && password.length > 1  ? '' : 'hidden' )) == null ? '' : __t) +
	' text-bold"\n                name="next-configuration">\n            <b> Pilih X-Cube > </b>\n        </button>\n        <button class="btn btn-orange hidden"\n                name="finish-configuration">\n            <b> Save Configuration </b>\n        </button>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h4 class="form-title">\n    Pilih X-Cube (Konten VPS)\n</h4>\n\n<p>\n    Kamu bisa pilih Aplikasi / Control Panel VPS / OS, yang akan di install secara otomatis ke dalam VPS mu\n</p>\n\n<div class="panel-body">\n    <ul class="nav nav-tabs">\n        ';
	 if (selected.type) { ;
	__p += '\n            <li class="' +
	((__t = ( selected.type == 'aio' ? 'active' : '' )) == null ? '' : __t) +
	'">\n                <a href="#aio-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="true">Aplikasi</a>\n            </li>\n            <li class="' +
	((__t = ( selected.type == 'ospanel' ? 'active' : '' )) == null ? '' : __t) +
	'">\n                <a href="#ospanel-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="false">OS + Panel</a>\n            </li>\n            <li class="' +
	((__t = ( selected.type == 'os_only' ? 'active' : '' )) == null ? '' : __t) +
	'">\n                <a href="#os-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="false">OS Only</a>\n            </li>\n        ';
	 } else { ;
	__p += '\n            <li class="active">\n                <a href="#aio-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="true">Aplikasi</a>\n            </li>\n            <li>\n                <a href="#ospanel-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="false">OS + Panel</a>\n            </li>\n            <li>\n                <a href="#os-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab" aria-expanded="false">OS Only</a>\n            </li>\n        ';
	 } ;
	__p += '\n    </ul>\n    <div class="tab-content">\n        ';
	 if (selected.type) { ;
	__p += '\n        <div id="aio-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane ' +
	((__t = ( selected.type == 'aio' ? 'show-not-important active' : '' )) == null ? '' : __t) +
	'"></div>\n        <div id="ospanel-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane ospanel ' +
	((__t = ( selected.type == 'ospanel' ? 'show-not-important active' : '' )) == null ? '' : __t) +
	'"></div>\n        <div id="os-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane osonly ' +
	((__t = ( selected.type == 'os_only' ? 'show-not-important active' : '' )) == null ? '' : __t) +
	'"></div>\n        ';
	 } else { ;
	__p += '\n        <div id="aio-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane show-not-important active"></div>\n        <div id="ospanel-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane ospanel"></div>\n        <div id="os-' +
	((__t = ( id )) == null ? '' : __t) +
	'"\n             class="tab-pane osonly"></div>\n        ';
	 } ;
	__p += '\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="template-container">\n    <div class="row">\n\n        ';
	 images['all_in_one'].forEach(function(image) { ;
	__p += '\n\n        <div class="col-md-6">\n            <div class="template ' +
	((__t = ( selected.configid == image.configid ? 'checked' : '' )) == null ? '' : __t) +
	'"\n                 data-type="aio" data-template="' +
	((__t = ( image.configid )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( image.apps )) == null ? '' : __t) +
	'"\n                 style="align-items: center;" aria-hidden="' +
	((__t = ( image.distro )) == null ? '' : __t) +
	' ' +
	((__t = ( image.osversion )) == null ? '' : __t) +
	'">\n                <div class="col-md-2">\n                    <div class="img">\n                        <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( image.apps.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                             alt="">\n                    </div>\n                </div>\n                <div class="col-md-7">\n                    <div class="text">\n                        <h3 class="text-capitalize">' +
	((__t = ( image.apps )) == null ? '' : __t) +
	'</h3>\n                        <p>' +
	((__t = ( image.distro )) == null ? '' : __t) +
	' ' +
	((__t = ( image.osversion )) == null ? '' : __t) +
	'</p>\n                    </div>\n                </div>\n                ';
	 if (image.link != null) { ;
	__p += '\n                    <div class="col-md-3">\n                        <div class="detail-class ' +
	((__t = ( selected.configid == image.configid ? '' : 'none' )) == null ? '' : __t) +
	'"\n                             data-templateos="' +
	((__t = ( image.id )) == null ? '' : __t) +
	'">\n\n                            <a href="' +
	((__t = ( image.link )) == null ? '' : __t) +
	'?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/" target="_blank" class="cursor-pointer">\n                                Details\n                            </a>\n\n                        </div>\n                    </div>\n                ';
	 } ;
	__p += '\n            </div>\n        </div>\n        ';
	 }) ;
	__p += '\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="template-container">\n\n    <div class="row">\n        ';
	 for (index in images['os_panel']) {;
	__p += '\n            ';
	 if (index == selected.panel) { ;
	__p += '\n                <div class="col-md-6">\n                    <div class="template checked"\n                         data-type="ospanel"\n                         template-type="ospanel"\n                         data-template="' +
	((__t = ( images['os_panel'][index][selected.indexPanel].configid )) == null ? '' : __t) +
	'"\n                         aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'"\n                         aria-hidden="' +
	((__t = ( images['os_panel'][index][selected.indexPanel]['distro'] )) == null ? '' : __t) +
	'"\n                    >\n                        <div class="col-md-2">\n                            <div class="img">\n                                ';
	 var imgSrc = index.toLowerCase().replace(/ /g,'_'); ;
	__p += '\n                                <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( imgSrc )) == null ? '' : __t) +
	'.png"\n                                     alt="">\n                            </div>\n                        </div>\n                        <div class="col-md-7">\n                            <div class="text">\n                                <h3> ' +
	((__t = ( index )) == null ? '' : __t) +
	' </h3>\n                            </div>\n                        </div>\n                        ';
	 if (images['os_panel'][index][selected.indexPanel].link != null) { ;
	__p += '\n                            <div class="col-md-3">\n                                <div class="detail-class" data-templateos="' +
	((__t = ( images['os_panel'][index][selected.indexPanel].id )) == null ? '' : __t) +
	'">\n\n                                    <a href="' +
	((__t = ( images['os_panel'][index][selected.indexPanel].link )) == null ? '' : __t) +
	'?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/" target="_blank" class="cursor-pointer">\n                                        Details\n                                    </a>\n\n                                </div>\n                            </div>\n                        ';
	 } ;
	__p += '\n                        <select name="osPanelOptions" class="form-control dropdown-panel">\n                            ';
	 images['os_panel'][index].forEach(function(detail) { ;
	__p += '\n                                ';
	 if (selected.configid == detail.configid) { ;
	__p += '\n                                <option selected value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'"> ' +
	((__t = ( detail.distro )) == null ? '' : __t) +
	' ' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                                ';
	 } else  {;
	__p += '\n                                <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'"> ' +
	((__t = ( detail.distro )) == null ? '' : __t) +
	' ' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                                ';
	 } ;
	__p += '\n                            ';
	 }) ;
	__p += '\n                        </select>\n                        <br>\n                    </div>\n\n                </div>\n            ';
	 } else { ;
	__p += '\n                <div class="col-md-6">\n                    <div class="template"\n                         data-type="ospanel"\n                         template-type="ospanel"\n                         data-template="' +
	((__t = ( images['os_panel'][index][0].configid )) == null ? '' : __t) +
	'"\n                         aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'"\n                         aria-hidden="' +
	((__t = ( images['os_panel'][index][0]['distro'] )) == null ? '' : __t) +
	'"\n                    >\n                        <div class="col-md-2">\n                            <div class="img">\n                                ';
	 var imgSrc = index.toLowerCase().replace(/ /g,'_'); ;
	__p += '\n                                <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( imgSrc )) == null ? '' : __t) +
	'.png"\n                                     alt="">\n                                <div class="centang none">\n                                    <i class="fa fa-check margin-right-15 icon-configs"></i>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="col-md-7">\n                            <div class="text">\n                                <h3> ' +
	((__t = ( index )) == null ? '' : __t) +
	' </h3>\n                            </div>\n                        </div>\n                        ';
	 if (images['os_panel'][index][0].link != null) { ;
	__p += '\n                            <div class="col-md-3">\n                                <div class="detail-class none" data-templateos="' +
	((__t = ( images['os_panel'][index][0].id )) == null ? '' : __t) +
	'">\n\n                                    <a href="' +
	((__t = ( images['os_panel'][index][0].link )) == null ? '' : __t) +
	'?utm_source=member-area&utm_medium=btn-detail-guide-order&utm_campaign=vps-x/" target="_blank" class="cursor-pointer">\n                                        Details\n                                    </a>\n\n                                </div>\n                            </div>\n                        ';
	 } ;
	__p += '\n                        <select name="osPanelOptions" id="" class="form-control dropdown-panel">\n                            ';
	 images['os_panel'][index].forEach(function(detail) { ;
	__p += '\n                            <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'"> ' +
	((__t = ( detail.distro )) == null ? '' : __t) +
	' ' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                            ';
	 }) ;
	__p += '\n                        </select>\n                        <br>\n                    </div>\n\n                </div>\n            ';
	 } ;
	__p += '\n        ';
	 } ;
	__p += '\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h3 class="form-title text-center">Choose OS</h3>\n<ul class="nav nav-tabs">\n    ';
	 if (selected.type == "os_only") { ;
	__p += '\n        <li class="' +
	((__t = ( selected.bit == 'x32' ? 'active' : '' )) == null ? '' : __t) +
	'">\n            <a href="#32bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab">32 bit OS</a>\n        </li>\n        <li class="' +
	((__t = ( selected.bit == 'x64' ? 'active' : '' )) == null ? '' : __t) +
	'">\n            <a href="#64bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab">64 bit OS</a>\n        </li>\n    ';
	 } else { ;
	__p += '\n        <li>\n            <a href="#32bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab">32 bit OS</a>\n        </li>\n        <li class="active">\n            <a href="#64bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-toggle="tab">64 bit OS</a>\n        </li>\n    ';
	 } ;
	__p += '\n</ul>\n\n<div class="tab-content">\n    ';
	 if (selected.type == "os_only") { ;
	__p += '\n        <div class="template-container tab-pane ' +
	((__t = ( selected.bit == 'x32' ? 'active' : 'show-not-important' )) == null ? '' : __t) +
	'"\n             id="32bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-bit="x32">\n            ';
	 for (index in images['os_only']['x32']) { ;
	__p += '\n            ';
	 if (index == selected.os && selected.bit == 'x32') { ;
	__p += '\n            <div class="col-md-6">\n                <div class="template checked" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                    <div class="col-md-2">\n                        <div class="img">\n                            <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                                 alt="">\n                        </div>\n                    </div>\n                    <div class="col-md-7">\n                        <div class="text">\n                            <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                        </div>\n                    </div>\n\n                    <select name="osOptions" class="form-control dropdown-panel">\n                        ';
	 images['os_only']['x32'][index].forEach(function (detail) { ;
	__p += '\n                        ';
	 if (detail.configid == selected.configid) { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'" selected>' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 } else { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 } ;
	__p += '\n                        ';
	 }) ;
	__p += '\n                    </select>\n                </div>\n            </div>\n            ';
	 } else { ;
	__p += '\n            <div class="col-md-6">\n                <div class="template" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                    <div class="col-md-2">\n                        <div class="img">\n                            <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                                 alt="">\n                        </div>\n                    </div>\n                    <div class="col-md-7">\n                        <div class="text">\n                            <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                        </div>\n                    </div>\n\n                    <select name="osOptions" class="form-control dropdown-panel">\n                        ';
	 images['os_only']['x32'][index].forEach(function (detail) { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 }) ;
	__p += '\n                    </select>\n                </div>\n            </div>\n            ';
	 } ;
	__p += '\n            ';
	 } ;
	__p += '\n        </div>\n\n        <div class="template-container tab-pane ' +
	((__t = ( selected.bit == 'x64' ? 'active' : 'show-not-important' )) == null ? '' : __t) +
	'"\n             id="64bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-bit="x64">\n\n        ';
	 for (index in images['os_only']['x64']) { ;
	__p += '\n        ';
	 if (index == selected.os && selected.bit == 'x64') { ;
	__p += '\n        <div class="col-md-6">\n            <div class="template checked" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                <div class="col-md-2">\n                    <div class="img">\n                        <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                             alt="">\n                    </div>\n                </div>\n                <div class="col-md-7">\n                    <div class="text">\n                        <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                    </div>\n                </div>\n\n                <select name="osOptions" class="form-control dropdown-panel">\n                    ';
	 images['os_only']['x64'][index].forEach(function (detail) { ;
	__p += '\n                    ';
	 if (detail.configid == selected.configid) { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'" selected>' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 } else { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 } ;
	__p += '\n                    ';
	 }) ;
	__p += '\n                </select>\n            </div>\n        </div>\n        ';
	 } else { ;
	__p += '\n        <div class="col-md-6">\n            <div class="template" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                <div class="col-md-2">\n                    <div class="img">\n                        <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                             alt="">\n                    </div>\n                </div>\n                <div class="col-md-7">\n                    <div class="text">\n                        <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                    </div>\n                </div>\n\n                <select name="osOptions" class="form-control dropdown-panel">\n                    ';
	 images['os_only']['x64'][index].forEach(function (detail) { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 }) ;
	__p += '\n                </select>\n            </div>\n        </div>\n        ';
	 } ;
	__p += '\n        ';
	 } ;
	__p += '\n\n    </div>\n    ';
	 } else {  ;
	__p += '\n        <div class="template-container tab-pane show-not-important" id="32bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-bit="x32">\n            ';
	 for (index in images['os_only']['x32']) { ;
	__p += '\n            ';
	 if (index == selected.os && selected.bit == 'x32') { ;
	__p += '\n            <div class="col-md-6">\n                <div class="template checked" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                    <div class="col-md-2">\n                        <div class="img">\n                            <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                                 alt="">\n                        </div>\n                    </div>\n                    <div class="col-md-7">\n                        <div class="text">\n                            <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                        </div>\n                    </div>\n\n                    <select name="osOptions" class="form-control dropdown-panel">\n                        ';
	 images['os_only']['x32'][index].forEach(function (detail) { ;
	__p += '\n                        ';
	 if (detail.configid == selected.configid) { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'" selected>' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 } else { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 } ;
	__p += '\n                        ';
	 }) ;
	__p += '\n                    </select>\n                </div>\n            </div>\n            ';
	 } else { ;
	__p += '\n            <div class="col-md-6">\n                <div class="template" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                    <div class="col-md-2">\n                        <div class="img">\n                            <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                                 alt="">\n                        </div>\n                    </div>\n                    <div class="col-md-7">\n                        <div class="text">\n                            <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                        </div>\n                    </div>\n\n                    <select name="osOptions" class="form-control dropdown-panel">\n                        ';
	 images['os_only']['x32'][index].forEach(function (detail) { ;
	__p += '\n                        <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                        ';
	 }) ;
	__p += '\n                    </select>\n                </div>\n            </div>\n            ';
	 } ;
	__p += '\n            ';
	 } ;
	__p += '\n        </div>\n\n        <div class="template-container tab-pane active" id="64bit-' +
	((__t = ( id )) == null ? '' : __t) +
	'" data-bit="x64">\n\n        ';
	 for (index in images['os_only']['x64']) { ;
	__p += '\n        ';
	 if (index == selected.os && selected.bit == 'x64') { ;
	__p += '\n        <div class="col-md-6">\n            <div class="template checked" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                <div class="col-md-2">\n                    <div class="img">\n                        <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                             alt="">\n                    </div>\n                </div>\n                <div class="col-md-7">\n                    <div class="text">\n                        <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                    </div>\n                </div>\n\n                <select name="osOptions" class="form-control dropdown-panel">\n                    ';
	 images['os_only']['x64'][index].forEach(function (detail) { ;
	__p += '\n                    ';
	 if (detail.configid == selected.configid) { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'" selected>' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 } else { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 } ;
	__p += '\n                    ';
	 }) ;
	__p += '\n                </select>\n            </div>\n        </div>\n        ';
	 } else { ;
	__p += '\n        <div class="col-md-6">\n            <div class="template" data-type="os_only" data-template="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( index )) == null ? '' : __t) +
	'" aria-hidden="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                <div class="col-md-2">\n                    <div class="img">\n                        <img src="/modules/addons/beon_order/templates/assets/images/vpsx/' +
	((__t = ( index.toLowerCase() )) == null ? '' : __t) +
	'.png"\n                             alt="">\n                    </div>\n                </div>\n                <div class="col-md-7">\n                    <div class="text">\n                        <h3>' +
	((__t = ( index )) == null ? '' : __t) +
	'</h3>\n                    </div>\n                </div>\n\n                <select name="osOptions" class="form-control dropdown-panel">\n                    ';
	 images['os_only']['x64'][index].forEach(function (detail) { ;
	__p += '\n                    <option value="' +
	((__t = ( detail.configid )) == null ? '' : __t) +
	'">' +
	((__t = ( detail.osversion )) == null ? '' : __t) +
	'</option>\n                    ';
	 }) ;
	__p += '\n                </select>\n            </div>\n        </div>\n        ';
	 } ;
	__p += '\n        ';
	 } ;
	__p += '\n\n    </div>\n    ';
	 } ;
	__p += '\n</div>';

	}
	return __p
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h4 class="form-title">\n    Pengaturan X-Cube\n</h4>\n\n<p>\n    Informasi login aplikasi dan akses database\n</p>\n\n<div class="panel-body">\n    <form name="configuration-' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n        ';
	 forms["no_header"].forEach(function(form){ ;
	__p += '\n            <div class="row">\n                <div class="col-md-4 appConfigLabel">\n                    ' +
	((__t = ( form.label )) == null ? '' : __t) +
	' <span class="required">*</span>\n                </div>\n                <div class="col-md-8 form-group">\n                    <input type="text"\n                           class="form-control ' +
	((__t = ( form.validation )) == null ? '' : __t) +
	'"\n                           data-validation="' +
	((__t = ( form.default_value ? 'true' : 'false' )) == null ? '' : __t) +
	'"\n                           placeholder="' +
	((__t = ( form.placeholder )) == null ? '' : __t) +
	'" name="' +
	((__t = ( form.name )) == null ? '' : __t) +
	'"\n                           value="' +
	((__t = ( form.default_value )) == null ? '' : __t) +
	'">\n                    <span class="help-block none">' +
	((__t = ( form.label )) == null ? '' : __t) +
	' kurang valid sob</span>\n                </div>\n            </div>\n        ';
	 }) ;
	__p += '\n\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                <h4><strong>Admin Account</strong></h4>\n            </div>\n        </div>\n        ';
	 forms["admin_account"].forEach(function(form){ ;
	__p += '\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                ' +
	((__t = ( form.label )) == null ? '' : __t) +
	' <span class="required">*</span>\n            </div>\n            <div class="col-md-8 form-group">\n                <input type="text"\n                       class="form-control ' +
	((__t = ( form.validation )) == null ? '' : __t) +
	'"\n                       data-validation="' +
	((__t = ( form.default_value ? 'true' : 'false' )) == null ? '' : __t) +
	'"\n                       placeholder="' +
	((__t = ( form.placeholder )) == null ? '' : __t) +
	'" name="' +
	((__t = ( form.name )) == null ? '' : __t) +
	'"\n                       value="' +
	((__t = ( form.default_value )) == null ? '' : __t) +
	'">\n                <span class="help-block none">' +
	((__t = ( form.label )) == null ? '' : __t) +
	' kurang valid sob</span>\n                ';
	 if (form.label.toLowerCase().includes('password')){ ;
	__p += '\n                <br>\n                <small>\n                    <strong>Passwordmu wajib :</strong> <br>\n                    - 8 karakter atau lebih.<br>\n                    - Menyertakan minimal 1 huruf besar/kapital <br>\n                    - Menyertakan minimal 1 digit nomer <br>\n                    - Menggunakan simbol kecuali ( :;\'" )\n                </small>\n                ';
	 } ;
	__p += '\n            </div>\n        </div>\n        ';
	 }) ;
	__p += '\n\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                <h4><strong>Database Setting</strong></h4>\n            </div>\n        </div>\n        ';
	 forms["database_setting"].forEach(function(form){ ;
	__p += '\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                ' +
	((__t = ( form.label )) == null ? '' : __t) +
	' <span class="required">*</span>\n            </div>\n            <div class="col-md-8 form-group">\n                <input type="text"\n                       class="form-control ' +
	((__t = ( form.validation )) == null ? '' : __t) +
	'"\n                       data-validation="' +
	((__t = ( form.default_value ? 'true' : 'false' )) == null ? '' : __t) +
	'"\n                       placeholder="' +
	((__t = ( form.placeholder )) == null ? '' : __t) +
	'" name="' +
	((__t = ( form.name )) == null ? '' : __t) +
	'"\n                       value="' +
	((__t = ( form.default_value )) == null ? '' : __t) +
	'">\n                <span class="help-block none">' +
	((__t = ( form.label )) == null ? '' : __t) +
	' kurang valid sob</span>\n                ';
	 if (form.label.toLowerCase().includes('password')){ ;
	__p += '\n                <br>\n                <small>\n                    <strong>Passwordmu wajib :</strong> <br>\n                    - 8 karakter atau lebih.<br>\n                    - Menyertakan minimal 1 huruf besar/kapital <br>\n                    - Menyertakan minimal 1 digit nomer <br>\n                    - Menggunakan simbol kecuali ( :;\'" )\n                </small>\n                ';
	 } ;
	__p += '\n            </div>\n        </div>\n        ';
	 }) ;
	__p += '\n    </form>\n</div>';

	}
	return __p
	}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4 class="form-title">\n    VPS Kredensial\n</h4>\n\n<p>\n    Informasi login aplikasi dan akses database\n</p>\n\n<div class="panel-body">\n    <form name="hostname-' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                Hostname <span class="required">*</span>\n            </div>\n            <div class="col-md-8 form-group">\n                <input type="text"\n                       class="form-control validate-hostname"\n                       data-validation="false"\n                       placeholder="admin.example.com" name="credential-hostname"\n                       value="' +
	((__t = ( credentials.hostname )) == null ? '' : __t) +
	'">\n                <span class="help-block none">Hostname kurang valid sob</span>\n            </div>\n        </div>\n\n        <div class="row">\n            <div class="col-md-4 appConfigLabel">\n                Password <span class="required">*</span>\n            </div>\n            <div class="col-md-8 form-group">\n                <input type="text"\n                       class="form-control validate-password-credentials"\n                       data-validation="false"\n                       placeholder="Contoh: b(WDrriun%U}5Pz" name="credential-password"\n                       value="' +
	((__t = ( credentials.password )) == null ? '' : __t) +
	'">\n                <span class="help-block none">Password kurang valid sob</span>\n                <br>\n                <small>\n                    <strong>Passwordmu wajib :</strong> <br>\n                    - 8 karakter atau lebih.<br>\n                    - Menyertakan minimal 1 huruf besar/kapital <br>\n                    - Menyertakan minimal 1 digit nomer <br>\n                    - Menggunakan simbol kecuali ( :;\'" )\n                </small>\n            </div>\n        </div>\n    </form>\n</div>';

	}
	return __p
	}

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="align-items-center panel-penawaran penawaran-orange" style="margin: 10px 0;">\n    <h4 class="form-title">\n        <i class="fa fa-cog"></i> Konfigurasi Berhasil Disimpan\n    </h4>\n\n    <div class="row">\n        <div class="col-md-6">\n            <h5> <b>VPS Kredensial</b></h5>\n            <table class="table-credentials">\n                <tr>\n                    <td>Hostname</td>\n                    <td>:</td>\n                    <td>' +
	((__t = ( hostname )) == null ? '' : __t) +
	'</td>\n                </tr>\n                <tr>\n                    <td>Password</td>\n                    <td>:</td>\n                    <td>\n                        <span class="password-masking">************</span>\n                        <span><i class="fa toggle-password fa-eye cursor-pointer" data-password="' +
	((__t = ( password )) == null ? '' : __t) +
	'"></i></span>\n                    </td>\n                </tr>\n            </table>\n        </div>\n        <div class="col-md-6">\n            <h5> <b>X-Cube</b> </h5>\n            <table class="table-credentials">\n                <tr>\n                    <td>OS</td>\n                    <td>:</td>\n                    <td>' +
	((__t = ( os )) == null ? '' : __t) +
	'</td>\n                </tr>\n                ';
	 if (type == 'aio') { ;
	__p += '\n                <tr>\n                    <td>Aplikasi</td>\n                    <td>:</td>\n                    <td>' +
	((__t = ( template.apps )) == null ? '' : __t) +
	'</td>\n                </tr>\n                ';
	 } ;
	__p += '\n\n                ';
	 if (type == 'ospanel') { ;
	__p += '\n                <tr>\n                    <td>Panel</td>\n                    <td>:</td>\n                    <td>' +
	((__t = ( template.panel )) == null ? '' : __t) +
	'</td>\n                </tr>\n                ';
	 } ;
	__p += '\n            </table>\n        </div>\n\n        <div class="col-md-12">\n            <button class="btn btn-orange sunting-konfigurasi">Sunting Konfigurasi</button>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="cart-summary-wrapper">\n\n</div>';

	}
	return __p
	}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="cart-empty">\n    <div class="flex flex-col align-items-center">\n        <i><img src="/modules/addons/beon_order/templates/assets/images/cart-empty.png" alt=""></i>\n        <p class="text-center"><b>Keranjang belanjamu kosong, Sob.</b> <br> Tambahkan layanan dulu untuk melanjutkan. </p>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="panel">\r\n    <div class="panel-heading panel-heading-order">\r\n        <h3 class="title text-center">Rangkuman Pembelian</h3>\r\n    </div>\r\n\r\n    <div class="panel-body panel-body-order no-padding cart">\r\n        <div id="item-cart">\r\n\r\n        </div>\r\n        <div class="item show-promo hidden"></div>\r\n        <div class="item subtotal">\r\n            <div class="flex flex-row justify-space-between">\r\n                <div class="sub-title unset text-bold"><strong>Sub total</strong></div>\r\n                <div class="sub-title unset"> ' +
	((__t = ( utils.changeToRupiah(subtotal) )) == null ? '' : __t) +
	' </div>\r\n            </div>\r\n            <div class="flex flex-row justify-space-between">\r\n                <div class="sub-title unset text-bold"><strong>PPN 10%</strong></div>\r\n                <div class="sub-title unset"> ' +
	((__t = ( utils.changeToRupiah(ppn) )) == null ? '' : __t) +
	' </div>\r\n            </div>\r\n        </div>\r\n        <div class="item total">\r\n            <div class="flex flex-row justify-space-between align-items-center promo-potongan hidden">\r\n                <div class="sub-title unset text-bold"><span class="text-promo"></span></div>\r\n                <div class="sub-title unset price-promo"></div>\r\n            </div>\r\n            <div class="flex flex-row justify-space-between align-items-center">\r\n                <div class="sub-title unset text-bold"><strong>Total</strong></div>\r\n                <div class="sub-title unset price"> ' +
	((__t = ( utils.changeToRupiah(total) )) == null ? '' : __t) +
	' </div>\r\n            </div>\r\n            <div class="input-promo"></div>\r\n            <div class="ganti-promo"></div>\r\n            ';
	if(gimmicktotal>0){ ;
	__p += '\r\n                <div class="gimmick_total_discount">\r\n                    <p class="alert alert-success" style="margin-bottom: 10px; text-align: center;">\r\n                       Selamat! Kamu Menghemat <b>' +
	((__t = ( utils.changeToRupiah(gimmicktotal) )) == null ? '' : __t) +
	'</b>\r\n                    </p>\r\n                </div>\r\n            ';
	 } ;
	__p += '\r\n            <button id="payment-btn" class="btn btn-pink btn-block"><strong>Bayar sekarang</strong></button>\r\n        </div>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="panel">\n    <div class="panel-heading panel-heading-order">\n        <h3 class="title text-center">Rangkuman Pembelian</h3>\n    </div>\n\n    <div class="panel-body panel-body-order no-padding cart">\n        <div class="item text-center">\n            <span><i class="fa fa-spinner fa-spin fa-2x"></i></span>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="item" data-type="cart">\n    <div class="flex flex-row">\n        <h5 class="title" data-attr-scroll="panel' +
	((__t = ( index )) == null ? '' : __t) +
	'"> ' +
	((__t = ( groupname )) == null ? '' : __t) +
	' </h5>&nbsp;&nbsp;&nbsp;\n        <span class="remove-section-cart pointer" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-pid="' +
	((__t = ( pid )) == null ? '' : __t) +
	'"><i class="fas fa-times-circle"></i></span>\n    </div>\n    <div class="flex flex-row justify-space-between">\n        <div class="sub-title">\n            ' +
	((__t = ( name )) == null ? '' : __t) +
	'\n\n            ';
	 if (dataDomain.hasOwnProperty('name') && dataDomain.type == "use") { ;
	__p += '\n\n                ( ' +
	((__t = ( dataDomain.name )) == null ? '' : __t) +
	' )\n\n            ';
	 } ;
	__p += '\n        </div>\n        <div class="sub-title">\n            ';
	 if (price != "Rp. 0") {;
	__p += '\n            ';
	 if(strike_price!=0){ ;
	__p += '\n                <del style="font-size: 10px; font-weight: bold; font-style: italic">' +
	((__t = ( strike_price )) == null ? '' : __t) +
	'</del>\n            ';
	 } ;
	__p += '\n            ' +
	((__t = ( price )) == null ? '' : __t) +
	'\n            ';
	 } ;
	__p += '\n        </div>\n    </div>\n\n    ';
	 if ('osName' in template) { ;
	__p += '\n    <div class="flex flex-row justify-space-between">\n        ';
	 if (template.type == 'aio') { ;
	__p += '\n            ' +
	((__t = ( template.apps + ' - ' + template.osName )) == null ? '' : __t) +
	'\n        ';
	 } else if (template.type == 'ospanel') { ;
	__p += '\n            ' +
	((__t = ( template.panel + ' - ' + template.osName )) == null ? '' : __t) +
	'\n        ';
	 } else { ;
	__p += '\n            ' +
	((__t = ( template.osName )) == null ? '' : __t) +
	'\n        ';
	 } ;
	__p += '\n    </div>\n    ';
	 } ;
	__p += '\n\n    <div class="flex flex-row justify-space-between">\n        <div class="sub-title keterangan">Reg. ' +
	((__t = ( billingcycle )) == null ? '' : __t) +
	'</div>\n    </div>\n\n<!--    Configoptions-->\n    ';
	 if(configoptions.length>0){ ;
	__p += '\n        ';
	 configoptions.forEach(function (item){ ;
	__p += '\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title sub-keterangan">\n                    ';
	 if (item.optioncode=='quota'){;
	__p += '\n                        ' +
	((__t = ( item.optionname )) == null ? '' : __t) +
	': ' +
	((__t = ( item.selectedqty )) == null ? '' : __t) +
	' GB\n                    ';
	 } ;
	__p += '\n\n                    ';
	 if (item.optioncode=='pmem'){;
	__p += '\n                        ' +
	((__t = ( item.optionname )) == null ? '' : __t) +
	': ' +
	((__t = ( item.selectedqty )) == null ? '' : __t) +
	' GB\n                    ';
	 } ;
	__p += '\n\n                    ';
	 if (item.optioncode=='speed'){;
	__p += '\n                        ' +
	((__t = ( item.optionname )) == null ? '' : __t) +
	': ' +
	((__t = ( item.selectedqty )) == null ? '' : __t) +
	' Core\n                    ';
	 } ;
	__p += '\n\n                    ';
	 if (item.optioncode=='akun'){;
	__p += '\n                        ' +
	((__t = ( item.optionname )) == null ? '' : __t) +
	': ' +
	((__t = ( item.selectedqty )) == null ? '' : __t) +
	' Core\n                    ';
	 } ;
	__p += '\n\n                    ';
	 if (item.optioncode=='storage'){;
	__p += '\n                        ' +
	((__t = ( item.optionname )) == null ? '' : __t) +
	': ' +
	((__t = ( item.selectedqty )) == null ? '' : __t) +
	' GB\n                    ';
	 } ;
	__p += '\n                </div>\n\n                <div class="sub-title sub-keterangan">\n                    ' +
	((__t = ( item.price )) == null ? '' : __t) +
	'\n                </div>\n            </div>\n        ';
	 }) ;
	__p += '\n    ';
	 } ;
	__p += '\n\n<!--    CustomFields-->\n    ';
	 if(customfields.length>0){ ;
	__p += '\n        ';
	 customfields.forEach(function (item){ ;
	__p += '\n            <div class="flex flex-row justify-space-between">\n                ';
	 if (item.fieldname=="Script"){ ;
	__p += '\n                    <div class="sub-title sub-keterangan">Apps: ' +
	((__t = ( item.value )) == null ? '' : __t) +
	'</div>\n                ';
	 } else{ ;
	__p += '\n                    ';
	if (item.fieldtype == "tickbox"){ ;
	__p += '\n                        <div class="sub-title sub-keterangan"> ' +
	((__t = ( item.description )) == null ? '' : __t) +
	' </div>\n                    ';
	 } else{ ;
	__p += '\n                        <div class="sub-title sub-keterangan"> ' +
	((__t = ( item.fieldname.split('|').pop() )) == null ? '' : __t) +
	': ' +
	((__t = ( item.value )) == null ? '' : __t) +
	' </div>\n                    ';
	 } ;
	__p += '\n                ';
	 } ;
	__p += '\n            </div>\n        ';
	 }) ;
	__p += '\n    ';
	 } ;
	__p += '\n\n    ';
	 if (dataDomain.hasOwnProperty('name')) { ;
	__p += '\n        ';
	 if (dataDomain.type == "transfer") { ;
	__p += '\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title">' +
	((__t = ( dataDomain.name )) == null ? '' : __t) +
	'</div>\n                <div class="sub-title">' +
	((__t = ( dataDomain.price )) == null ? '' : __t) +
	'</div>\n            </div>\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title keterangan">Trans. ' +
	((__t = ( dataDomain.billingcycle )) == null ? '' : __t) +
	'</div>\n            </div>\n        ';
	 }
	            if(dataDomain.type == "register") { ;
	__p += '\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title">' +
	((__t = ( dataDomain.name )) == null ? '' : __t) +
	'</div>\n                <div class="sub-title">\n                    ';
	 if(dataDomain.strike_price!=0){ ;
	__p += '\n                        <del style="font-size: 10px; font-weight: bold; font-style: italic">' +
	((__t = ( dataDomain.strike_price )) == null ? '' : __t) +
	'</del>\n                    ';
	 } ;
	__p += '\n                    ' +
	((__t = ( dataDomain.price )) == null ? '' : __t) +
	'\n                </div>\n            </div>\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title keterangan">Reg. ' +
	((__t = ( dataDomain.billingcycle )) == null ? '' : __t) +
	'</div>\n            </div>\n        ';
	 } ;
	__p += '\n    ';
	 } ;
	__p += '\n\n    ';
	 for (let i in cross_sale) {;
	__p += '\n        <div class="flex flex-row justify-space-between">\n            <div class="sub-title">' +
	((__t = ( cross_sale[i].title )) == null ? '' : __t) +
	'</div>\n            <div class="sub-title">' +
	((__t = ( utils.changeToRupiah(cross_sale[i].pricing) )) == null ? '' : __t) +
	'</div>\n        </div>\n        <div class="flex flex-row justify-space-between">\n            <div class="sub-title keterangan">\n                ' +
	((__t = ( cross_sale[i].type == 'onetime' ? 'Onetime' : utils.changeFormatBilling(cross_sale[i].billingcycle) )) == null ? '' : __t) +
	'\n            </div>\n        </div>\n    ';
	 } ;
	__p += '\n\n    ';
	 if(master_cross_sales.length>0){ ;
	__p += '\n        ';
	 master_cross_sales.forEach(function (item){ ;
	__p += '\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title">' +
	((__t = ( item.name )) == null ? '' : __t) +
	'</div>\n                <div class="sub-title">' +
	((__t = ( utils.changeToRupiah(item.price) )) == null ? '' : __t) +
	'</div>\n            </div>\n            <div class="flex flex-row justify-space-between">\n                <div class="sub-title keterangan">Reg. ' +
	((__t = ( utils.changeFormatBilling(item.billingcycle) )) == null ? '' : __t) +
	'</div>\n            </div>\n\n            ';
	 for (let i in item.cross_sale) {;
	__p += '\n                <div class="flex flex-row justify-space-between">\n                    <div class="sub-title">' +
	((__t = ( item.cross_sale[i].title )) == null ? '' : __t) +
	'</div>\n                    <div class="sub-title">' +
	((__t = ( utils.changeToRupiah(item.cross_sale[i].pricing) )) == null ? '' : __t) +
	'</div>\n                </div>\n                <div class="flex flex-row justify-space-between">\n                    <div class="sub-title keterangan">\n                        ' +
	((__t = ( item.cross_sale[i].type == 'onetime' ? 'Onetime' : utils.changeFormatBilling(item.cross_sale[i].billingcycle) )) == null ? '' : __t) +
	'\n                    </div>\n                </div>\n            ';
	 } ;
	__p += '\n        ';
	 }) ;
	__p += '\n    ';
	 } ;
	__p += '\n</div>';

	}
	return __p
	}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="item" data-type="cart">\n    <div class="flex flex-row">\n        <h5 class="title" data-attr-scroll="panel' +
	((__t = ( index )) == null ? '' : __t) +
	'"> ' +
	((__t = ( type == "transfer" ? "Transfer" : "Registrasi" )) == null ? '' : __t) +
	' Domain</h5>&nbsp;&nbsp;&nbsp;\n        <span class="remove-section-cart pointer" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'"><i class="fas fa-times-circle"></i></span>\n    </div>\n    <div class="flex flex-row justify-space-between">\n        <div class="sub-title">' +
	((__t = ( name )) == null ? '' : __t) +
	'</div>\n        <div class="sub-title">\n            ';
	if (strike_price !=0) { ;
	__p += '\n                <del style="font-size: 10px; font-weight: bold; font-style: italic">' +
	((__t = ( strike_price )) == null ? '' : __t) +
	' </del>\n            ';
	 } ;
	__p += '\n            ' +
	((__t = ( price )) == null ? '' : __t) +
	'\n        </div>\n    </div>\n    <div class="flex flex-row justify-space-between">\n        <div class="sub-title keterangan">' +
	((__t = ( type == "transfer" ? "Trans" : "Reg" )) == null ? '' : __t) +
	'. ' +
	((__t = ( billingcycle )) == null ? '' : __t) +
	' tahun </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row" style="padding-top: 5px;">\n    <div class="col-md-12">\n        <div class="form-group" style="display: flex; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;margin-top: 15px;">\n            <i class="fas fa-tag" style="margin: auto 15px;font-size: 26px;color: #B4B4BF;"></i>\n            <p style="padding-top: 7px;">\n                <span class="title-voucher">Ada ' +
	((__t = ( totalKupon )) == null ? '' : __t) +
	' Voucher</span>\n                <br>\n                siap kamu pakai!\n            </p>\n            <button class="btn btn-orange" id="show-kupon" style="position: absolute; margin-left: 70% !important;">Lihat</button>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="flex flex-row">\r\n    <h5 class="title"> Diskon Promo</h5>&nbsp;&nbsp;&nbsp;\r\n    <span class="remove-promo remove-section-cart pointer" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'"><i class="fas fa-times-circle"></i></span>\r\n</div>\r\n<div class="flex flex-row justify-space-between">\r\n    <div class="sub-title">' +
	((__t = ( name )) == null ? '' : __t) +
	'</div>\r\n    <div class="sub-title">\r\n        - ' +
	((__t = ( utils.changeToRupiah(nominalPidPromo) )) == null ? '' : __t) +
	'\r\n    </div>\r\n</div>\r\n<div class="flex flex-row justify-space-between">\r\n    <div class="sub-title keterangan">\r\n        Diskon Potongan ' +
	((__t = ( price )) == null ? '' : __t) +
	' ';
	 if(type_promo == "Percentage"){ ;
	__p += ' % ';
	 } ;
	__p += ' x ' +
	((__t = ( countPromoUsed )) == null ? '' : __t) +
	'\r\n    </div>\r\n</div>\r\n';
	 if(codeStatus == 'Error'){ ;
	__p += '\r\n    <div class="flex flex-row justify-space-between">\r\n        <div class="sub-title keterangan-error" style="font-size: 11px; margin-top: -6px; margin-bottom: 6px">\r\n            Kode Promo yang Sobat pakai belum memenuhi kriteria.\r\n        </div>\r\n    </div>\r\n';
	 } ;


	}
	return __p
	}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<button class="btn btn-default btn-block" id="gunakan-kupon"><strong>Gunakan kode promo</strong></button>';

	}
	return __p
	}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- Modal -->\n<div class="modal fade" id="promo-modals" tabindex="-1" role="dialog" aria-labelledby="promoModalLabel" aria-hidden="true">\n    <div class="modal-dialog modal-md" role="document">\n        <div class="modal-content modal-login">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">\n                    <span aria-hidden="true">×</span>\n                    <span class="sr-only">Close</span>\n                </button>\n                <h5 class="modal-title" id="promoModalLabel"><strong>Gunakan Promo</strong></h5>\n            </div>\n            <div class="modal-body" id="section-list-promo">\n                \n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row" style="padding-top: 5px;">\n    <div class="col-md-12">\n        <div class="form-group" style="display: flex; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px;margin-top: 15px;">\n            <p style="padding: 17px 15px 0 15px;">\n                <span class="title-voucher">Selamat, Sob! promo berhasil digunakan.</span>\n            </p>\n            <button class="btn btn-default" id="ganti-promo" style="width: 60%; margin: 20px;font-weight: bold;">Ganti Promo</button>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '';

	}
	return __p
	}

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="row" id="input-text-kupon" style="margin-top: 0;">\r\n    <div class="col-md-9">\r\n        <div class="form-group form-input-kode-kupon" style="margin-bottom: 10px;">\r\n            <input type="text" name="kupon" value="' +
	((__t = ( code )) == null ? '' : __t) +
	'" class="form-control" ';
	 if(code!=''){ ;
	__p += ' readonly="readonly" ';
	 } ;
	__p += ' placeholder="Masukkan kode promo">\r\n        </div>\r\n    </div>\r\n    \r\n    <div class="col-md-3">\r\n            <button class="btn btn-fill-primary btn-block ';
	 if(code==''){ ;
	__p += 'hidden';
	 } ;
	__p += '" id="hapus-kupon">Hapus</button>\r\n            <button class="btn btn-fill-primary btn-block ';
	 if(code!=''){ ;
	__p += 'hidden';
	 } ;
	__p += '" name="cek-kupon" disabled><i class="fa fa-spin fa-spinner hidden"></i>Gunakan</button>\r\n    </div>\r\n</div>\r\n<div class="row">\r\n    <div class="col-md-12">\r\n        <div class="promo-code-available" data-disable="">\r\n            <div class="header-promo-available">\r\n                <div class="flex flex-row justify-space-between">\r\n                    <div class="header-left-panel">\r\n                        <h3 class="weight-no-padding-btm">Promo Hanya Buatmu</h3>\r\n                        <p>Biar makin Cuan! Kode Promo di bawah siap kamu gunakan.</p>\r\n                    </div>\r\n                    <div class="header-right-panel promo-right-panel">\r\n                        <div class="flex">\r\n                            <span class="open-icon pointer"><i class="fas fa-chevron-down"></i></span>\r\n                            <span class="close-icon pointer"><i class="fas fa-chevron-up hidden"></i></span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="list-available-promo hidden">\r\n                ';
	 if (dataGeneralPromo.total_promo_personal > 0) { ;
	__p += '\r\n                ';
	 dataGeneralPromo.promo_personal.forEach(function(value, index) { ;
	__p += '\r\n                <div class="panel-promo" id="promo-personal' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\r\n                    <div class="wrap-collabsible">\r\n                        <input id="promo-ke' +
	((__t = (index)) == null ? '' : __t) +
	'" class="toggle hidden" value="' +
	((__t = ( value.code )) == null ? '' : __t) +
	'" type="checkbox">\r\n                        <label for="promo-ke' +
	((__t = (index)) == null ? '' : __t) +
	'" class="lbl-toggle">\r\n                            <h4 class="title-voucher">\r\n                                ' +
	((__t = ( value.promo_title )) == null ? '' : __t) +
	'\r\n                            </h4>\r\n                            <span class="promo-subtitle">' +
	((__t = ( value.promo_subtitle )) == null ? '' : __t) +
	'</span>\r\n                            <br>\r\n                            <span class="text-blue btn-open-detail-kupon pointer">Detail Voucher</span>\r\n                            <span class="text-blue btn-close-detail-kupon pointer hidden">Tutup Detail Voucher</span>\r\n                            <button class="btn btn-orange btn-gunakan-item-kupon right-button">Gunakan</button>\r\n                            <button class="btn btn-orange btn-digunakan-item-kupon hidden right-button" style="background-color: #bdbcbc;margin-top: -35px;">Digunakan</button>\r\n                            <span class="promo-alert-item"></span>\r\n                        </label>\r\n                    </div>\r\n                    <div class="detail-promo-content hidden">\r\n                        <div class="row sub-package">\r\n                            <div class="col-md-4">\r\n                                <i class="fas fa-tag icon-sub-package"></i>\r\n                                <h5 class="title-sub-package">Promo yang didapat</h5>\r\n                                <p class="value-sub-package">' +
	((__t = ( value.value )) == null ? '' : __t) +
	'</p>\r\n                            </div>\r\n                            <div class="col-md-4">\r\n                                <i class="fas fa-clock icon-sub-package"></i>\r\n                                <h5 class="title-sub-package">Berlaku Sampai</h5>\r\n                                <p class="value-sub-package">' +
	((__t = ( value.expirationdate )) == null ? '' : __t) +
	'</p>\r\n                            </div>\r\n                            <div class="col-md-4">\r\n                                <i class="fas fa-archive icon-sub-package"></i>\r\n                                <h5 class="title-sub-package">Sisa Promo</h5>\r\n                                <p class="value-sub-package">' +
	((__t = ( value.promocanuse )) == null ? '' : __t) +
	'</p>\r\n                            </div>\r\n                            \r\n                        </div>\r\n                        <div class="syarat-ketentuan">\r\n                            <h5 class="text-bold">Syarat dan Ketentuan</h5>\r\n                            <p>\r\n                                ' +
	((__t = ( value.description )) == null ? '' : __t) +
	'\r\n                            </p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
	 }) ;
	__p += '\r\n                ';
	 }else{ ;
	__p += '\r\n                <div class="row">\r\n                    <div class="col-md-12 ">\r\n                        <div class="alert alert-secondary" role="alert">\r\n                            <p class="text-center">Wah sayang sekali Sob, belum ada promo saat ini </p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
	 } ;
	__p += '\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n</div>\r\n<div class="row">\r\n    <div class="col-md-12">\r\n        <div class="promo-code-available" data-disable="">\r\n            <div class="header-promo-available">\r\n                <div class="flex flex-row justify-space-between">\r\n                    <div class="header-left-panel">\r\n                        <h3 class="weight-no-padding-btm">Promo Lain</h3>\r\n                        <p>Voucher lain yang juga bisa kamu gunakan.</p>\r\n                    </div>\r\n                    <div class="header-right-panel promo-right-panel">\r\n                        <div class="flex">\r\n                            <span class="open-icon pointer"><i class="fas fa-chevron-down hidden"></i></span>\r\n                            <span class="close-icon pointer"><i class="fas fa-chevron-up"></i></span>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="list-available-promo" id="list-available-promo">\r\n                ';
	 if (dataGeneralPromo.total_promo_general > 0) { ;
	__p += '\r\n                    ';
	 dataGeneralPromo.promo_general.forEach(function(value, index) { ;
	__p += '\r\n                    <div class="panel-promo" id="promo-available' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\r\n                        <div class="wrap-collabsible">\r\n                            <input id="promo-ke' +
	((__t = (index)) == null ? '' : __t) +
	'" class="toggle hidden" value="' +
	((__t = ( value.code )) == null ? '' : __t) +
	'" type="checkbox">\r\n                            <label for="promo-ke' +
	((__t = (index)) == null ? '' : __t) +
	'" class="lbl-toggle">\r\n                                <h4 class="title-voucher">\r\n                                    ' +
	((__t = ( value.promo_title )) == null ? '' : __t) +
	'\r\n                                </h4>\r\n                                <span class="promo-subtitle">' +
	((__t = ( value.promo_subtitle )) == null ? '' : __t) +
	'</span>\r\n                                <br>\r\n                                <span class="text-blue btn-open-detail-kupon pointer">Detail Voucher</span>\r\n                                <span class="text-blue btn-close-detail-kupon pointer hidden">Tutup Detail Voucher</span>\r\n                                <button class="btn btn-orange btn-gunakan-item-kupon right-button ' +
	((__t = ( (value.promotion_id == promoId) ? 'hidden' : '' )) == null ? '' : __t) +
	'">Gunakan</button>\r\n                                <button class="btn btn-orange btn-digunakan-item-kupon right-button ' +
	((__t = ( (value.promotion_id == promoId) ? '' : 'hidden' )) == null ? '' : __t) +
	'" style="background-color: #bdbcbc;margin-top: -35px;">Digunakan</button>\r\n                                <span class="promo-alert-item"></span>\r\n                            </label>\r\n                        </div>\r\n                        <div class="detail-promo-content hidden">\r\n                            <div class="row sub-package">\r\n                                <div class="col-md-4">\r\n                                    <i class="fas fa-tag icon-sub-package"></i>\r\n                                    <h5 class="title-sub-package">Promo yang didapat</h5>\r\n                                    <p class="value-sub-package">' +
	((__t = ( value.value )) == null ? '' : __t) +
	'</p>\r\n                                </div>\r\n                                <div class="col-md-4">\r\n                                    <i class="fas fa-clock icon-sub-package"></i>\r\n                                    <h5 class="title-sub-package">Berlaku Sampai</h5>\r\n                                    <p class="value-sub-package">' +
	((__t = ( value.expirationdate )) == null ? '' : __t) +
	'</p>\r\n                                </div>\r\n                                <div class="col-md-4">\r\n                                    <i class="fas fa-archive icon-sub-package"></i>\r\n                                    <h5 class="title-sub-package">Sisa Promo</h5>\r\n                                    <p class="value-sub-package">' +
	((__t = ( value.promocanuse )) == null ? '' : __t) +
	'</p>\r\n                                </div>\r\n                                \r\n                            </div>\r\n                            <div class="syarat-ketentuan">\r\n                                <h5 class="text-bold">Syarat dan Ketentuan</h5>\r\n                                <p style="padding-left: 15px;">\r\n                                    ' +
	((__t = ( value.description )) == null ? '' : __t) +
	'\r\n                                </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    ';
	 }) ;
	__p += '\r\n                    ';
	 }else{ ;
	__p += '\r\n                    <div class="row">\r\n                        <div class="col-md-12 ">\r\n                            <div class="alert alert-secondary" role="alert">\r\n                                <p class="text-center">Wah sayang sekali Sob, belum ada promo saat ini </p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    ';
	 } ;
	__p += '\r\n            </div>\r\n        </div>\r\n    </div>\r\n    \r\n</div>';

	}
	return __p
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var CartsSDK = __webpack_require__(7);


	var __layouts ={
	    customfields_text       : __webpack_require__(47),
	    customfields_appsdir    : __webpack_require__(48),
	    customfields_ipaddr     : __webpack_require__(49),
	    customfields_dropdown   : __webpack_require__(50),
	    customfields_apps       : __webpack_require__(51),
	    customfields_thickbox   : __webpack_require__(52),
	    alertError              : __webpack_require__(19),
	};

	var CustomfieldSDK = {
	    render: {
	        textfield: function (element, customfielddata, callback){
	            switch (customfielddata.fieldname){
	                case "IP":
	                    element.find('.section-customfields')
	                        .append(__layouts.customfields_ipaddr({
	                            fieldname: customfielddata.fieldname +' Server',
	                            description: customfielddata.description,
	                            id: customfielddata.id,
	                            value: customfielddata.value,
	                            required: customfielddata.required
	                        }))
	                        .promise().then(function () {
	                        CustomfieldSDK.event.submitIpAddress();
	                        // callback();
	                    });
	                    break;
	                case "Directory":
	                    element.find('.section-customfields')
	                        .append(__layouts.customfields_appsdir({
	                            fieldname: customfielddata.fieldname,
	                            description: customfielddata.description,
	                            id: customfielddata.id,
	                            value: customfielddata.value,
	                            required: customfielddata.required
	                        }))
	                        .promise().then(function () {
	                        CustomfieldSDK.event.submitCustomFieldsAppsDir(element,customfielddata);
	                        // callback();
	                    });
	                    break;
	                default:
	                    element.find('.section-customfields')
	                        .append(__layouts.customfields_text({
	                            fieldname: customfielddata.fieldname.split('|').pop(),
	                            description: customfielddata.description,
	                            id: customfielddata.id,
	                            value: customfielddata.value,
	                            required: customfielddata.required
	                        }))
	                        .promise().then(function () {
	                            CustomfieldSDK.event.submitCustomFields(element,customfielddata);
	                        // CartsSDK.events.updateCustomFields(customfielddata)
	                        // callback();
	                    });
	            }

	        },
	        dropdownfield: function (element, customfielddata, callback){
	            customfielddata.fieldoptions = customfielddata.fieldoptions.split(",");
	            switch (customfielddata.fieldname){
	                case "Script":
	                    var AppsConfig      = window.__orderconfigs.default_installerhostingapps;
	                    customfielddata.AppsConfig  = AppsConfig;
	                    CustomfieldSDK.render.apps_templates(element, customfielddata, callback);
	                    CustomfieldSDK.utils.filterApps(element);
	                    break;
	                default:
	                    // console.log("Default");
	                    break;
	            }
	        },
	        thickboxfield: function (element, customfielddata, callback){
	            customfielddata.ishidden =
	                !CustomfieldSDK.utils.is_apps_related_checked(element, customfielddata.related_apps);
	            element.find('.section-customfields')
	                .append(__layouts.customfields_thickbox(customfielddata))
	                .promise().then(function () {
	                // callback();
	            });
	        },
	        apps_templates: function (element, customfielddata, callback){
	            customfielddata.countoptions = customfielddata.fieldoptions.length;
	            customfielddata.collumnlength = 6;
	            if(customfielddata.countoptions>2)customfielddata.collumnlength=6;
	            element.find('.section-customfields')
	                .append(__layouts.customfields_apps(customfielddata))
	                .promise().then(function () {
	            });
	        },
	    },
	    event:{
	        submitCustomFields: function (elements,customfielddata) {
	            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('keyup keypress', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }
	                var value = $(this).val();
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                CartsSDK.events.updateCustomFields(index, id, value);
	            });
	            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('change', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }
	                var value = $(this).val();
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                CartsSDK.events.updateCustomFields(index, id, value);
	            });
	        },
	        submitCustomFieldsAppsDir: function (elements,customfielddata) {
	            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('keyup keypress', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }
	                var value = $(this).val();
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                CartsSDK.events.updateCustomFields(index, id, value);
	            });
	            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('change', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }
	                var value = $(this).val();
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                CartsSDK.events.updateCustomFields(index, id, value);
	            });
	        },
	        submitIpAddress: function () {
	            $("input[name='ip_address']").off().on('keyup keypress', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }

	                var value = $(this).val();
	                var validation = CustomfieldSDK.utils.regexIpAddress(value);
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                var ip = "";
	                if (validation) {
	                    var ip = value
	                }

	                CartsSDK.events.updateCustomFields(index, id, ip)
	            })

	            $("input[name='ip_address']").off().on('change', function (event) {
	                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
	                    event.preventDefault();
	                }

	                var value = $(this).val()
	                var validation = CustomfieldSDK.utils.regexIpAddress(value);
	                var index = $(this).parents('.panel').attr('data-index');
	                var id = $(this).attr('data-customfieldId');

	                var ip = "";
	                if (validation) {
	                    var ip = value

	                    // Remove alert
	                    $(this).parents(".config_text").find(".alert").remove()
	                } else {
	                    var message = "Form di bawah ini harus format IP sob!"

	                    if (value == "") {
	                        message =  "Form harus diisi sob!"
	                    }

	                    var section = $(this).parents(".config_text")
	                    section.find(".alert").remove()
	                    section.prepend(__layouts.alertError({
	                        message: message
	                    }))

	                }

	                CartsSDK.events.updateCustomFields(index, id, ip)
	            })
	        },
	    },
	    utils:{
	        is_apps_related_checked: function (element, related_apps){
	            var template_apps = element.find("input[name='template_hotsing_apps']").val();
	            if(template_apps==related_apps){
	                return  true;
	            }
	            return false;
	        },
	        filterApps:function(element){
	            (function ($) {

	                jQuery.expr[':'].containsi = function(a,i,m){
	                    return jQuery(a).attr('data-appsdetail').toUpperCase().indexOf(m[3].toUpperCase())>=0;
	                };

	                $.fn.filterApps = function () {

	                    var o = arguments[0] || {},
	                        p = {
	                            handle: 'input[rel="filter"]',
	                            callback: function () {},
	                            caseSensitive: true
	                        };

	                    $.extend(p,o);

	                    var filter = function (event, value) {
	                        $('.target_filter',this).show();
	                        if (value) $('.target_filter:not('+((p.caseSensitive&&':contains')||':containsi')+'('+value+'))',this).hide();
	                        p.callback.call(this, value);
	                    };

	                    var clear = function (event) {
	                        $(this).trigger('filter');
	                    }

	                    return this.each(function (i,n) {
	                        $(n).bind('filter', filter).bind('clear', clear);
	                        $(p.handle).bind('keyup.filter', function (event) {
	                            $(n).trigger('filter', [$(this).val()]);
	                        });
	                    });
	                };
	            })(jQuery);
	            $(element).find('#template-hosting').filterApps({ caseSensitive: false });
	            $(element).find('#select-filter-apps').on('change',function(){
	                var selectedtext = $(element).find('#select-filter-apps').find(":selected").val();
	                $(element).find('.filter-apps-search-input').val(selectedtext).trigger('keyup.filter');
	            })
	        },
	        chooseApps:function (element){
	            element.find('#template-hosting .template').on('click', function (e){
	               if(!$(this).hasClass('checked')){
	                   element.find('#template-hosting .template').removeClass('checked');
	                   $(this).addClass('checked');
	               }
	               var choosen_apps = $(this).attr('aria-valuetext');
	               var customfieldid = $(this).attr('data-customfieldId');
	               if(choosen_apps=="None"){
	                   element.find('.apps_dir').val('');
	                   element.find('.apps_dir_container').hide();
	               }else{
	                   element.find('.apps_dir_container').show();
	               }
	               element.find('input[name="template_hotsing_apps"]').val(choosen_apps);
	               CustomfieldSDK.utils.updateAppsCart(element,customfieldid, choosen_apps);
	               CustomfieldSDK.utils.showAppsAddons(element, choosen_apps);
	               CustomfieldSDK.utils.autoChooseAppsaddons(element, choosen_apps);
	            });
	        },
	        showAppsAddons: function (element, choosen_apps){
	            element.find('.hosting_apps_addon').hide();
	            element.find('.hosting_apps_addon[aria-hosting-apps="'+choosen_apps+'"]').show();
	        },
	        chooseAppsAddons: function (element){
	            element.find('.hosting_apps_addon input[type="checkbox"]').on('change', function (e){
	                var customfieldid = $(this).attr('data-customfieldId');
	                var customfieldvalue = $(this).is(':checked');
	                if(customfieldvalue){
	                    customfieldvalue = "on";
	                }
	                CustomfieldSDK.utils.updateCart(element, customfieldid, customfieldvalue);
	            });
	        },
	        updateCart: function (element, customfieldid, value){
	            var index = element.attr('data-index');
	            CartsSDK.events.updateCustomFields(index, customfieldid, value);
	        },
	        updateAppsCart: function (element, customfieldid, value){
	            var index = element.attr('data-index');
	            if(value=="None"){
	                CartsSDK.events.removeCustomfieldValueExept(index, value);
	            }
	            CartsSDK.events.updateCustomFields(index, customfieldid, value)
	        },
	        autoChooseApps: function (element, apps){
	            if(CustomfieldSDK.utils.is_apps_related_checked(element, "")){
	                element.find('#template-hosting .template[aria-valuetext="'+apps+'"]')
	                    .trigger('click');
	                element.find('.hosting_apps_addon[aria-hosting-apps="'+apps+'"] input[type="checkbox"]')
	                    .trigger('click');
	            }
	        },
	        autoChooseAppsaddons: function (element, apps){
	            var apps_addons = element.find('.hosting_apps_addon[aria-hosting-apps="'+apps+'"] input[type="checkbox"]');
	            apps_addons.removeAttr('checked');
	            CustomfieldSDK.utils.autoChooseApps(element, apps);
	        },
	        regexIpAddress: function (ip) {
	            var patt = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
	            var res = patt.test(ip);

	            if (!res) {
	                return false
	            }

	            return true
	        }
	    }
	};
	module.exports = CustomfieldSDK;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="config_text">\r\n    <h4 class="form-title"> ' +
	((__t = ( fieldname )) == null ? '' : __t) +
	' ';
	 if(required!=""){ ;
	__p += '<b style="color: red">*</b>';
	 };
	__p += ' <span class="tambah-domain-info" data-original-title="' +
	((__t = ( description )) == null ? '' : __t) +
	'" data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span>\r\n    </h4>\r\n    <div class="form-group">\r\n        <input type="text" data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" name="customfields[' +
	((__t = ( id )) == null ? '' : __t) +
	']" class="form-control" placeholder="" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'"/>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="config_text apps_dir_container">\r\n    <h4 class="form-title"> Direktori ';
	 if(required!=""){ ;
	__p += '<b style="color: red">*</b>';
	 };
	__p += ' <span class="tambah-domain-info" data-original-title="' +
	((__t = ( description )) == null ? '' : __t) +
	'" data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span>\r\n    </h4>\r\n    <div class="form-group">\r\n        <input type="text" data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" name="customfields[' +
	((__t = ( id )) == null ? '' : __t) +
	']" class="form-control apps_dir" placeholder="" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'"/>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="config_text">\n    <h4 class="form-title"> ' +
	((__t = ( fieldname )) == null ? '' : __t) +
	' ';
	 if(required!=""){ ;
	__p += '<b style="color: red">*</b>';
	 };
	__p += ' <span class="tambah-domain-info" data-original-title="Gunakan contoh IP berikut: 192.168.101.1 | Apa bila belum mendapatkan IP server, karena masih dalam proses order. Kamu dapat menggantinya setelah VPS mu aktif" data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span>\n    </h4>\n    <p>Masukkan IP Server yang akan kamu pasang cPanel</p>\n    <div class="form-group">\n        <input type="text" data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" name="ip_address" class="form-control" placeholder="" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'"/>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="config_text">\r\n    <h4 class="form-title"> ' +
	((__t = ( fieldname )) == null ? '' : __t) +
	' <b style="color: red">*</b> <span class="tambah-domain-info" data-original-title="Masukkan IP Server yang akan kamu pasang license cPanel" data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span>\r\n    </h4>\r\n    <div class="form-group">\r\n        <input type="text" data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" name="ip_address" class="form-control" placeholder="" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'"/>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div id="template-hosting" class="tab-pane show-not-important active" style="margin-bottom: 10px;">\r\n    <div class="title">\r\n        <h4 class="form-title" style="margin-bottom: 0px;">' +
	((__t = ( description )) == null ? '' : __t) +
	'</h4>\r\n    </div>\r\n    <div class="row" style="padding:20px 0px">\r\n        <div class="col-md-6">\r\n            <h5>Filter By Category: </h5>\r\n            <input type="text" rel="filter"  class="filter-apps-search-input hidden" />\r\n        </div>\r\n        <div class="col-md-6">\r\n            <select class="form-control" id="select-filter-apps">\r\n                <option value="">All</option>\r\n                ';
	 AppsConfig.Category.forEach(function (item){ ;
	__p += '\r\n                    <option value="' +
	((__t = ( item )) == null ? '' : __t) +
	'">' +
	((__t = ( item )) == null ? '' : __t) +
	'</option>\r\n                ';
	 }) ;
	__p += '\r\n            </select>\r\n        </div>\r\n    </div>\r\n    <input type="hidden" name="template_hotsing_apps" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'">\r\n    <div>\r\n        <div class="template-container padded">\r\n            <div class="row" style="margin-right: 0; margin-left: 0;">\r\n                ';
	 fieldoptions.forEach(function (item){ ;
	__p += '\r\n                    <div class="col-md-' +
	((__t = ( collumnlength )) == null ? '' : __t) +
	' target_filter" style="padding-left: 5px;padding-right: 5px;" data-appsdetail="' +
	((__t = ( AppsConfig.Apps[item]['tag'] )) == null ? '' : __t) +
	'">\r\n                        <div class="template thin ';
	 if(value==item){;
	__p += ' checked ';
	 } ;
	__p += ' " style="min-height: 74px;display:flex;align-items:center;" data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" aria-valuetext="' +
	((__t = ( item )) == null ? '' : __t) +
	'">\r\n                            <div class="col-md-2">\r\n                                <div class="">\r\n                                    ';
	 if(item=="None"){ ;
	__p += '\r\n                                        <i class="fa fa-2x fa-ban"></i>\r\n                                    ';
	 }else{ ;
	__p += '\r\n                                        <img src="' +
	((__t = ( AppsConfig.Apps[item]['img'] )) == null ? '' : __t) +
	'" alt="">\r\n                                    ';
	 };
	__p += '\r\n                                </div>\r\n                            </div>\r\n                            <div class="col-md-6">\r\n                                <div class="text" style="margin-left:0px;">\r\n                                    <h3 class="text-capitalize" style="margin-bottom: 0px;">' +
	((__t = ( item )) == null ? '' : __t) +
	'</h3>\r\n                                    <p>' +
	((__t = ( AppsConfig.Apps[item]['desc'] )) == null ? '' : __t) +
	'</p>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class="col-md-4">\r\n                                ';
	 if (AppsConfig.Apps[item]['link']!=""){ ;
	__p += '\r\n                                    <a href="' +
	((__t = ( AppsConfig.Apps[item]['link'] )) == null ? '' : __t) +
	'?utm_source=member-area&amp;utm_medium=btn-detail-guide-order&amp;utm_campaign=hosting-installer" target="_blank" class="cursor-pointer-hosting-apps">\r\n                                        <div class="detail-class" style="text-align:center;">\r\n\r\n                                            Details\r\n                                        </div>\r\n                                    </a>\r\n\r\n                                ';
	 } ;
	__p += '\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                ';
	 }) ;
	__p += '\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '\r\n<div class="align-items-center hosting_apps_addon" ';
	 if(ishidden){;
	__p += ' hidden ';
	 } ;
	__p += ' aria-hosting-apps="' +
	((__t = ( related_apps )) == null ? '' : __t) +
	'">\r\n    <div class="penawaran-info" style="margin-bottom: 10px;">\r\n        <div class="form-check">\r\n            <input data-customfieldId="' +
	((__t = ( id )) == null ? '' : __t) +
	'" ';
	 if(value=="on"){;
	__p += ' checked ';
	} ;
	__p += ' class="form-check-input" type="checkbox" name="' +
	((__t = ( fieldname )) == null ? '' : __t) +
	'" >\r\n            <label class="form-check-label">\r\n                ' +
	((__t = ( description )) == null ? '' : __t) +
	'\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var CartsSDK = __webpack_require__(7);
	var ServicesSDK = __webpack_require__(5);


	var __layouts ={
	    configoptions_header       : __webpack_require__(54),
	    type_slider                : __webpack_require__(55),
	    type_counter               : __webpack_require__(56),
	};

	var ConfigoptionSDK = {
	    render: {
	        header: function (element) {
	            if (element.find('.configoption_header').length) {
	            } else {
	                element.find('.section-configoptions').append(__layouts.configoptions_header());
	            }
	        },
	        option_slider: function (element,configoption){
	            var step = 1;
	            if(configoption.max > 100)step=10;
	            if(configoption.optioncode == 'quota')step=10;
	            element.find('.section-configoptions').append(__layouts.type_slider(configoption))
	                .promise()
	                .then(function () {
	                    $(".js-range-slider").ionRangeSlider({
	                        min: configoption.min,
	                        max: configoption.max,
	                        grid: false,
	                        step: step,
	                        from: configoption.value,
	                        hide_min_max:true,
	                        hide_from_to:true,
	                        skin: "round",
	                        onChange: function (data){
	                            var configoptionid = data.input.attr('data-configoption');
	                            ConfigoptionSDK.utils.slideConfig(element, configoptionid, data.from);
	                        }
	                    });
	                });
	        },
	        option_quantities: function (element, products, configoption){
	            // console.log('Rendering Something');
	            var optionname = "Quantity";
	            var id = configoption.id;
	            var min = 0;
	            var max = 100;
	            var value = 1;
	            products.config.find(function (config) {
	                if (config.id != configoption.id) {
	                    return
	                }
	                optionname = config.optionname;
	                min = config.qtyminimum;
	                max = config.qtymaximum;
	                value = configoption.selectedqty;
	            });
	            if(configoption.is_slider){
	                ConfigoptionSDK.render.option_slider(element, {
	                    optionname: optionname,
	                    id: id,
	                    min: min,
	                    max: max,
	                    value: value,
	                    optioncode: configoption.optioncode,
	                    optionlabel: configoption.optionlabel,
	                    selectedqty: configoption.selectedqty
	                });
	            }else{
	                element.find('.section-configoptions').append(__layouts.type_counter({
	                    optionname: optionname,
	                    id: id,
	                    min: min,
	                    max: max,
	                    value: value,
	                })).promise()
	                    .then(function () {
	                        ServicesSDK.events.counterButtonChange();
	                        ServicesSDK.events.disableInputSpecial(element)
	                    });
	            }
	        }
	    },
	    utils: {
	        slideConfig: function (element, configoptionid, value){
	            var index = element.attr('data-index');
	            CartsSDK.events.updateConfigOptionsType4(index, configoptionid, value);
	            element.find('.spec-slider-container')
	                .find('label[for="configoption['+configoptionid+']"]')
	                .find(".configoption-value")
	                .html(value);
	        }
	    }
	};
	module.exports = ConfigoptionSDK;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h5 style="margin-bottom: 20px;" class="configoption_header"><strong>Atur Resource</strong></h5>';

	}
	return __p
	}

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="spec-slider-container">\n    ';
	 if (optioncode=='quota'){ ;
	__p += '\n        <clr-icon size="48" shape="ssd"></clr-icon>\n    ';
	 } ;
	__p += '\n    ';
	 if (optioncode=='storage'){ ;
	__p += '\n        <clr-icon size="48" shape="container-volume" solid></clr-icon>\n    ';
	 } ;
	__p += '\n    ';
	 if (optioncode=='Jumlah Akun'){ ;
	__p += '\n        <clr-icon size="48" shape="users" solid></clr-icon>\n    ';
	 } ;
	__p += '\n    ';
	 if (optioncode=='speed'){ ;
	__p += '\n        <clr-icon size="48" shape="cpu"></clr-icon>\n    ';
	 } ;
	__p += '\n    ';
	 if (optioncode=='pmem'){ ;
	__p += '\n        <clr-icon size="48" shape="memory"></clr-icon>\n    ';
	 } ;
	__p += '\n\n    <div class="input-group">\n        <label for="configoption[' +
	((__t = (id)) == null ? '' : __t) +
	']" class="configoption-label"><span>' +
	((__t = ( optionname )) == null ? '' : __t) +
	'</span>\n            <span class="configoptions-value-wrapper">\n                <span class="configoption-value">' +
	((__t = ( selectedqty )) == null ? '' : __t) +
	'</span>' +
	((__t = ( optionlabel )) == null ? '' : __t) +
	'\n            </span>\n        </label>\n        <input type="text" class="js-range-slider" name="configoption[' +
	((__t = (id)) == null ? '' : __t) +
	']" data-configoption="' +
	((__t = (id)) == null ? '' : __t) +
	'" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'" />\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="spec-slider-container">\r\n    <clr-icon size="48" shape="ssd"></clr-icon>\r\n    <div class="input-group">\r\n        <label for="storage"><span>SSD Storage</span><span class="storage-value">STORAGE</span></label>\r\n        <input type="text" class="js-range-slider" name="" value="" />\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	var Orderconfigs  = __webpack_require__(3);
	var ApiHelper = __webpack_require__(6);
	var CartsSDK = __webpack_require__(7);

	var __layouts ={
	    cart                : __webpack_require__(33),
	    orderdomainsections : __webpack_require__(58),
	    section_order_title : __webpack_require__(59),
	    section_step_order  : __webpack_require__(60),
	    input_eppcode       : __webpack_require__(61),
	    section_tambah_layanan_baru : __webpack_require__(62),
	    section_tambah_domain       : __webpack_require__(63),
	    pencariandomain_available   : __webpack_require__(64),
	    pencariandomain_nonavailable: __webpack_require__(65),
	    section_domain_serupa       : __webpack_require__(66),
	    section_layanan_yang_kamu_beli       : __webpack_require__(67),
	};

	var DomainSDK = {
	    initiate: function () {
	        DomainSDK.render.formpanels();
	        DomainSDK.render.orderTitle();
	        DomainSDK.render.sectionStepOrder();
	    },
	    render:{
	        sectionLayananYangKamuBeli: function (index, domain) {
	            $('.section-layanan-yang-kamu-beli').html(__layouts.section_layanan_yang_kamu_beli({
	                index: index,
	                domainName: domain
	            }));
	        },
	        sectionLayananYangKamuBeliAppend: function (index, data, element) {
	            var elWrapper = element.find('.section-show-local-storage');

	            elWrapper.append(__layouts.section_layanan_yang_kamu_beli({
	                index: index,
	                domainName: data.domain,
	                minimize: data.minimize
	            })).promise().then(function () {
	                var parent = elWrapper.find('.panel').last()
	                DomainSDK.render.loadDomainFlomLocalStorage(parent, data)
	            })
	        },
	        orderTitle: function () {
	            $('#order-title').html(__layouts.section_order_title({
	                }
	            ));
	        },
	        sectionStepOrder: function () {
	            $('#order-step-wrapper').html(__layouts.section_step_order({
	                }
	            ));
	        },
	        sectionTambahLayananBaru: function () {
	            var group = Orderconfigs.product_groups
	            // console.log(group);

	            $('#tambah-layanan-baru').append(__layouts.section_tambah_layanan_baru({
	                group: group
	            })).promise()
	                .then(function () {

	                    DomainSDK.events.tambahLayanan();
	                    DomainSDK.events.openDropdownOption();
	                })
	        },
	        sectionTambahDomain: function () {
	            $('#tambah-layanan-baru').append(__layouts.section_tambah_domain({
	                }
	            ));
	        },
	        formpanels: function () {
	            var cart = CartsSDK.events.getCartDomain()

	            $('#order-forms-wrapper').html('')
	            $('#tambah-layanan-baru').html('')
	            DomainSDK.render.sectionTambahLayananBaru();
	            DomainSDK.render.sectionTambahDomain();

	            $('#order-forms-wrapper').html(__layouts.orderdomainsections({

	            })).promise().then(function() {
	                var element = $(this)
	                if (cart) {
	                    cart.forEach(function (data, index) {
	                        if (data.type !== 'domains') {
	                            return
	                        }
	                        DomainSDK.render.sectionLayananYangKamuBeliAppend(index, data, element)
	                    })
	                }
	            });
	        },
	        hasilPencarianDomain: function(element, domain, data) {
	            var elHasilpencarian = element.find(".section-layanan-yang-kamu-beli .hasilpencarian-domain");

	            if (data.error) {
	                var layout = __layouts.pencariandomain_nonavailable
	                defaultPrice = 0

	            } else if(!data['0'].isAvailable){
	                var layout = __layouts.pencariandomain_nonavailable
	                data = data['0']
	                defaultPrice = 0

	            } else {
	                var layout = __layouts.pencariandomain_available
	                data = data['0']
	                defaultPrice = data.pricing['1'].register
	            }

	            elHasilpencarian.html(layout({
	                    dataDomain: data,
	                    domain: domain,
	                    defaultPrice: defaultPrice,
	                    isFreedomain: false,
	                    actualPrice: defaultPrice,
	                    usePersyaratan: false,
	                    textPersyaratan: ""
	                }
	            )).promise().then(function () {
	                DomainSDK.events.changeBillingCycleDomainService();
	                DomainSDK.events.transferDomain();
	                DomainSDK.events.buyDomain();
	                DomainSDK.events.removeDomain();
	                DomainSDK.events.removeProduct();
	            });
	        },
	        domainSpotlight: function (element, data) {
	            var parentLast = element.parents('#tambah-layanan-baru').prev();
	            var lastPanel = parentLast.find('.section-layanan-yang-kamu-beli .panel');
	            var nextElement = lastPanel.next()
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


	            nextElement.append(__layouts.section_domain_serupa({
	                    domainsSliced: domainsSliced
	                }
	            )).promise().then(function () {
	                DomainSDK.events.changeBillingCycleDomainSuggested();
	                DomainSDK.events.buyDomainSuggested();
	                DomainSDK.events.removeDomainSuggested();
	                DomainSDK.events.showMoreDomain(nextElement, data, firstSliced)
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
	                DomainSDK.events.changeBillingCycleDomainSuggested();
	                DomainSDK.events.buyDomainSuggested();
	                DomainSDK.events.removeDomainSuggested();
	                if (sliced > data.length) {
	                    nextElement.find(".btn-domain-serupa").addClass("hidden")
	                }
	                DomainSDK.events.showMoreDomain(nextElement, data, sliced)
	            })
	        },
	        renderInputEppCode: function (element, domain, price) {
	            var elHasilpencarian = element.parents(".hasilpencarian-domain");
	            var layout = __layouts.input_eppcode

	            elHasilpencarian.html(layout({
	                    domain: domain,
	                    price: price
	                }
	            )).promise().then(function () {
	                DomainSDK.events.inputEppCode()
	                DomainSDK.events.removeDomainTransfer();

	            })
	        },
	        loadDomainFlomLocalStorage: function(element, data) {
	            var textPersyaratan = "";
	            var usePersyaratan = false;
	            var findPersyaratanDomain = DomainSDK.utils.findTld(data.tld);
	            if (findPersyaratanDomain) {
	                usePersyaratan = true;
	                textPersyaratan = findPersyaratanDomain.persyaratan
	            }

	            switch (data.domaintype) {
	                case "transfer":
	                    var layout = __layouts.input_eppcode;
	                    element.find('.hasilpencarian-domain').html(layout({
	                            domain: data.domain,
	                            defaultPrice: DomainSDK.utils.changeToRupiah(data.price),
	                            actualPrice: DomainSDK.utils.changeToRupiah(data.price),
	                            utils: DomainSDK.utils,
	                            allowUseDomain: true,
	                            usePersyaratan: usePersyaratan,
	                            textPersyaratan: textPersyaratan,
	                            tld: data.tld,
	                        }
	                    ))
	                        .promise()
	                        .then(function () {
	                            DomainSDK.events.inputEppCode()
	                            DomainSDK.events.removeDomainTransfer()

	                            element.find(".hasilpencarian-domain .submit-eppcode").addClass("hidden")
	                            element.find(".hasilpencarian-domain .delete-eppcode").removeClass("hidden")
	                            element.find("input[name='eppcode']").val(data.epp)
	                            element.find("input[name='eppcode']").attr('disabled','disabled')
	                            element.find('.header-right-panel .domain-name').html(data.domain)
	                        })
	                    break;

	                case "register":
	                    var layout = __layouts.pencariandomain_available;
	                    ApiHelper.checkAvailabilityDomain(data.domain, function (hasil) {

	                        result = hasil.result[0]

	                        defaultPrice = result.pricing[data.billingcycle].register

	                        element.find('.hasilpencarian-domain').html(layout({
	                                dataDomain: result,
	                                domain: data.domain,
	                                defaultPrice: defaultPrice,
	                                isFreedomain:false,
	                                actualPrice:defaultPrice,
	                                usePersyaratan: usePersyaratan,
	                                textPersyaratan: textPersyaratan,
	                                tld: data.tld,
	                            }
	                        )).promise().then(function () {

	                            element.find("select[name='registerDomainBillingcycle']").val(data.billingcycle)
	                            element.find("button[name='buy-domain']").addClass("hidden")
	                            element.find("button[name='delete-domain']").removeClass("hidden")

	                            DomainSDK.events.changeBillingCycleDomainService();
	                            DomainSDK.events.removeDomain();
	                        });
	                    });
	                    break;
	            }
	        },
	    },
	    events: {
	        refreshFormWhenAddDomainSuggested: function (element) {
	            $('.section-show-local-storage').html('')
	            var cart = CartsSDK.events.getCartDomain()
	            if (cart) {
	                cart.forEach(function (data, index) {
	                    if (data.type !== 'domains') {
	                        return
	                    }
	                    DomainSDK.render.sectionLayananYangKamuBeliAppend(index, data, element)
	                })
	            }
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
	        cariDomain: function () {
	            $("button[name='cari-domain']").on('click', function () {
	                var domain      = $(this).closest('.row').find("input[name='domain']").val()
	                var formInput   = $(this).closest(".row").find(".form-group")
	                var validate    = DomainSDK.utils.regexDomain(domain);
	                var tld         = DomainSDK.utils.getTld(domain);
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

	                setTimeout(function () {
	                    ApiHelper.checkDomainSpotlight(domain, function (data) {
	                        DomainSDK.render.domainSpotlight(element, data.result)

	                        formInput.removeClass("loader-input")
	                        element.removeAttr('disabled');
	                        spinner.addClass('hidden')
	                    })
	                }, 10)

	                ApiHelper.checkAvailabilityDomain(domain, function (data) {
	                    // DomainSDK.events.checkReturnCariDomain(element, data.result);

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
	        },
	        buyDomain: function () {
	            $("button[name='buy-domain']").off().on('click', function () {
	                var parent      = $(this).parents(".display-domain")
	                var domain      = parent.find(".name .domain-name").html()
	                var price       = parent.find(".harga-asli").html().trim()
	                var billingcycle = parent.find("select[name='registerDomainBillingcycle']").val()
	                var tld         = DomainSDK.utils.getTld(domain);
	                var epp         = 0;
	                var element     = $(this).parents('#order-forms-wrapper')

	                CartsSDK.events.addDomainOnly(domain, "register", billingcycle, price, epp, tld)
	                DomainSDK.events.refreshFormWhenAddDomainSuggested(element);
	                // Change button
	                $(this).parents(".panel").addClass("hidden")
	                $(this).addClass("hidden")
	                parent.find("button[name='delete-domain']").removeClass("hidden")
	            })
	        },
	        buyDomainSuggested: function () {
	            $("button[name='buy-domain-serupa']").on('click', function () {
	                var parent          = $(this).parents(".row.wrapper-domain-available")
	                var domain          = parent.find(".name .domain-name").html()
	                var price           = parent.find(".harga-asli").html().trim()
	                var billingcycle    = parent.find("select[name='registerDomainBillingcycleSuggested']").val()
	                var tld             = DomainSDK.utils.getTld(domain);
	                var epp             = 0;
	                var element         = $(this).parents('#order-forms-wrapper')
	                if (isNaN(price))
	                    price = price.replace(/\D/g,'');

	                CartsSDK.events.addDomainOnly(domain, "register", billingcycle, price, epp, tld)
	                DomainSDK.events.refreshFormWhenAddDomainSuggested(element);

	                // Change button
	                $(this).parents(".wrapper-domain-available").addClass('hidden')
	                $(this).addClass("hidden")
	                parent.find("button[name='delete-domain-serupa']").removeClass("hidden")
	            })
	        },
	        checkReturnCariDomain: function (element, data) {
	            var parentLast      = element.parents('#tambah-layanan-baru').prev();
	            var lastPanel       = parentLast.find('.section-show-local-storage .panel').last();
	            var lastIndex       = lastPanel.attr("data-index")
	            var inputDomain     = element.parents('.row').find("input[name='domain']").val()
	            var uselastPanel    = parentLast.find('.domain');
	            var useIndex        = 0;

	            if (lastIndex) {
	                useIndex = parseInt(lastIndex) + 1;
	                DomainSDK.render.sectionLayananYangKamuBeli(useIndex, inputDomain)
	                DomainSDK.render.hasilPencarianDomain(uselastPanel, inputDomain, data)
	            }else{
	                DomainSDK.render.sectionLayananYangKamuBeli(useIndex, inputDomain)
	                DomainSDK.render.hasilPencarianDomain(uselastPanel, inputDomain, data)
	            }
	        },
	        changeBillingCycleDomainService: function () {
	            $("select[name='registerDomainBillingcycle']").off().on('change', function () {
	                var parent          = $(this).parents(".display-domain")
	                var domain          = parent.find(".name .domain-name").html().trim()
	                var billingcycle    = parent.find("select[name='registerDomainBillingcycle']").val()
	                var price           = $(this).find(':selected').attr('data-register-price');
	                var btnBuyDomain    = parent.find("button[name='buy-domain']");
	                var tld             = DomainSDK.utils.getTld(domain);
	                var index           = $(this).parents(".panel").attr("data-index")

	                parent.find(".harga-asli").html(price)

	                if (!btnBuyDomain.hasClass("hidden")) {
	                    return
	                }

	                CartsSDK.events.changeBillingcycleDomainRegister("domain", domain, billingcycle, price, tld, index)
	                // var ServicesSDK = require(__dirname+"/Services.js");
	                // ServicesSDK.render.minimizeSection(index)
	            })
	        },
	        changeBillingCycleDomainSuggested: function () {
	            $("select[name='registerDomainBillingcycleSuggested']").on('change', function () {
	                var parent = $(this).parents(".display-domain")
	                var domain = parent.find(".name .domain-name").html().trim()
	                var billingcycle = parent.find("select[name='registerDomainBillingcycleSuggested']").val()
	                var price = $(this).find(':selected').attr('data-register-price');
	                var btnBuyDomain = parent.find("button[name='buy-domain-serupa']");
	                var tld = DomainSDK.utils.getTld(domain);
	                var InParent = $(this).parents(".section-domain-serupa")
	                var prevElm = InParent.prev()
	                var index = prevElm.attr("data-index")

	                parent.find(".harga-asli").html(price)

	                if (!btnBuyDomain.hasClass("hidden")) {
	                    return
	                }

	                CartsSDK.events.changeBillingcycleDomainRegister("domain", domain, billingcycle, price, tld, index)
	            })
	        },
	        removeDomain: function () {
	            $(".panel[data-type='domain'] button[name='delete-domain']").off().on('click', function () {
	                var parent      = $(this).parents(".display-domain")
	                var domainName  = parent.find(".name .domain-name").html()
	                var element     = $(this).parents('#order-forms-wrapper')
	                var section     = $(this).parents(".panel[data-type='domain']");

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

	                        CartsSDK.events.removeDomain(domainName)
	                        DomainSDK.events.refreshFormWhenAddDomainSuggested(element);
	                        section.remove()

	                        // Remove section

	                        // Change button
	                        $(this).addClass("hidden")
	                        parent.find("button[name='buy-domain']").removeClass("hidden")
	                    }
	                })
	            })
	        },
	        removeDomainSuggested: function () {
	            $("button[name='delete-domain-serupa']").on('click', function () {
	                var parent = $(this).parents(".row.wrapper-domain-available")
	                var domainName = parent.find(".name .domain-name").html()

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

	                        CartsSDK.events.removeDomain(domainName)

	                        // Change button
	                        $(this).addClass("hidden")
	                        parent.find("button[name='buy-domain-serupa']").removeClass("hidden")
	                    }
	                })
	            })
	        },
	        removeDomainTransfer: function () {
	            $(".display-domain .delete-eppcode").off().on("click", function () {
	                var parent = $(this).parents(".display-domain")
	                var domainName = parent.find(".name .domain-name").html()
	                var index = $(this).parents(".panel").attr("data-index")
	                var element     = $(this).parents('#order-forms-wrapper')
	                var panel = $(this).parents(".panel");

	                Swal.fire({
	                    title: 'Wadidaw',
	                    text: 'Kamu yakin menghapus domain '+ domainName,
	                    type: 'warning',
	                    showCancelButton: false,
	                    confirmButtonColor: '#3085d6',
	                    confirmButtonText: 'Hapus'
	                }).then((result) => {
	                    if (result.value) {
	                        Swal.fire(
	                            'Domain Berhasil Dihapus',
	                            'Kamu telah menghapus domain <b>'+ domainName+'</b>',
	                            'success'
	                        )

	                        CartsSDK.events.removeDomainWithIndex(index)
	                        panel.remove();
	                    }
	                })
	            })
	        },
	        removeProduct: function () {
	            $(".panel[data-type='domain'] .remove-panel").on("click", function () {
	                var panel           = $(this).parents(".panel")
	                var domainSerupa    = panel.next(".section-domain-serupa")
	                var index           = panel.attr("data-index");
	                var domainName      = panel.find('.domain-name').html()

	                Swal.fire({
	                    title: 'Wadidaw',
	                    text: 'Kamu yakin menghapus domain '+ domainName,
	                    type: 'warning',
	                    showCancelButton: false,
	                    confirmButtonColor: '#3085d6',
	                    confirmButtonText: 'Hapus'
	                }).then((result) => {
	                    if (result.value) {
	                        Swal.fire(
	                            'Domain Berhasil Dihapus',
	                            'Kamu telah menghapus domain <b>'+ domainName+'</b>',
	                            'success'
	                        )

	                        panel.remove()
	                        if (domainSerupa) {
	                            domainSerupa.remove()
	                        }

	                        CartsSDK.events.removeProduct(index)
	                    }
	                })
	            })
	        },
	        transferDomain: function () {
	            $('.btn-transfer-domain').on('click', function () {
	                var domain = $(this).parents(".display-domain").find(".name .domain-name").html()
	                var price = $(this).attr('data-transfer-price');

	                DomainSDK.render.renderInputEppCode($(this), domain, price)
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

	            $(".display-domain .submit-eppcode").off().on("click", function () {
	                var parent          = $(this).parents(".display-domain")
	                var domain          = parent.find(".name .domain-name").html().trim()
	                var price           = parent.find(".harga-asli").html().trim()
	                var billingcycle    = parent.find("select[name='registerDomainBillingcycle']").val()
	                var deleteEppcode   = parent.find('.delete-eppcode')
	                var tld             = DomainSDK.utils.getTld(domain);
	                var element         = $(this).parents('#order-forms-wrapper')
	                var epp             = parent.find('input[name="eppcode"]').val()

	                CartsSDK.events.addDomainOnly(domain, "transfer", billingcycle, price, epp, tld)
	                DomainSDK.events.refreshFormWhenAddDomainSuggested(element);

	                $(this).parents(".panel").addClass("hidden")
	                $(this).addClass('hidden');
	                deleteEppcode.removeClass('hidden');

	                // HTML domain in panel
	                var panelDomain = $(this).parents(".panel").find(".header-right-panel .domain-name")
	                panelDomain.html(domain)
	            })
	        },
	        showMoreDomain:function (nextElement, data, nextSliced) {
	            $('.btn-domain-serupa').on('click', function () {
	                DomainSDK.render.showMoreDomainSuggested(nextElement, data, nextSliced)
	            })
	        },
	        tambahLayanan: function () {
	            $(".dropdown_select_wrapper[data-type='new_service'] .select_ul li").on('click', function () {
	                var gid = $(this).find(".option").attr("data-groupid")

	                // Close modal and dropdown
	                $('.modal-content-order .close').click()
	                $(this).parents(".dropdown_select_wrapper").find('.default_option li').click();

	                var pid = Orderconfigs.product_in_group[gid][0]

	                CartsSDK.events.addProduct(pid)
	                // ServicesSDK.events.showFormOrder()
	            })
	        },
	        openDropdownOption: function () {
	            $(".default_option").off().on('click',function () {
	                var thisDropdown = $(this).parent();

	                if (thisDropdown.hasClass("active")) {
	                    thisDropdown.removeClass("active")
	                } else {
	                    $(".dropdown_select_wrapper").removeClass("active");
	                    thisDropdown.addClass("active")
	                }
	            })
	        },
	        hideTambahDomain: function () {
	            $("#section-add-domain input[name='domain']").val('');
	            $("#section-add-domain input[name='domain']").tooltip('destroy');
	            $("#section-add-domain .hasilpencarian-domain").html('')
	            $("#section-add-domain .hasilpencarian-domain").next().find('.section-domain-serupa').html('')
	        },
	        hidePersyaratanDomain: function (panel) {
	            panel.find(".persyaratan-domainid").addClass("hidden")
	        },
	        checkInputDomain: function () {
	            var currentpath = Orderconfigs.urlvars.paths[2];
	            if (currentpath != "domains") {
	                return
	            }

	            var domain = Orderconfigs.urlvars.paths[3];
	            if (!domain) {
	                return;
	            }
	            // console.log("Default domain:"+domain);

	            // Validasi domain
	            var validate = DomainSDK.utils.regexDomain(domain);
	            if (!validate) {
	                return;
	            }

	            // Check apa ada domain di cart
	            var findDomainInCart = CartsSDK.events.findDomainInCartList(domain);
	            if (findDomainInCart !== false) {
	                var pos = $("#panel"+findDomainInCart).offset().top;
	                setTimeout(function (){
	                    $('body, html').animate({scrollTop: pos});
	                }, 1000);
	                return;
	            }

	            // Find domain
	            $("#section-add-domain input[name='domain']").val(domain)
	            $("#section-add-domain button[name='cari-domain']").click()

	            // animated top scrolling
	            var pos = $("#section-add-domain").offset().top;
	            setTimeout(function (){
	                $('body, html').animate({scrollTop: pos});
	            }, 1000);

	        }
	    },
	    utils: {
	        changeToRupiah: function (money) {
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

	            let domain_is_id = DomainSDK.utils.validateTldID(domain)
	            if(domain_is_id && dot <= 3)
	               return true

	            if (dot > 2) {
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
	        findTld: function (tld) {
	            var arrPersyaratan = Orderconfigs.persyaratan_domain;

	            for (var i=0; i < arrPersyaratan.length; i++) {
	                if (arrPersyaratan[i].tld === tld) {
	                    return arrPersyaratan[i];
	                }
	            }
	        },
	        validateTldID: function(domain){
	            let substr_tld = domain.substr(-3)
	            if(substr_tld == ".id")
	               return true

	            return false
	        }
	    }
	};

	module.exports = DomainSDK;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="domain">\n    <div class="row" style="margin-bottom: 0; margin-top: 0;">\n        <div class="col-md-12">\n            <div class="section-show-local-storage">\n\n            </div>\n        </div>\n    </div>\n    <div class="row" style="margin-bottom: 0; margin-top: 0;">\n        <div class="col-md-12">\n            <div class="section-layanan-yang-kamu-beli">\n\n            </div>\n        </div>\n    </div>\n    <div class="row" style="margin-bottom: 0; margin-top: 0;">\n        <div class="col-md-12">\n            <div class="section-tambah-layanan-baru">\n\n            </div>\n        </div>\n    </div>\n\n    <div class="row" style="margin-bottom: 0; margin-top: 0;">\n        <div class="col-md-12">\n            <div class="section-tambah-domain">\n\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h3>\n    <b>Selesaikan orderanmu, Sob!</b>\n</h3>\n';

	}
	return __p
	}

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row">\n    <div class="line-step">\n        <div>\n            <div class="step step1 active">1</div>\n        </div>\n        <div>\n          <div class="step step2">2</div>\n        </div>\n        <div>\n          <div class="step step3">3</div>\n        </div>  \n  </div> \n  <div class="row ">\n      <div class="col-xs-4 stepText1">Tambah Layanan</div>\n      <div class="col-xs-4 stepText2">Pembayaran</div>\n      <div class="col-xs-4 stepText3">Siap Pakai</div>\n  </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="row wrapper-domain-nonavailable">\n    <div class="col-md-12">\n        <div class="flex flex-row display-domain justify-space-between">\n            <div class="name">\n                <span class="domain-name">' +
	((__t = ( domain )) == null ? '' : __t) +
	'</span>\n            </div>\n            <div class="flex flex-col">\n                <div data-price="' +
	((__t = ( defaultPrice )) == null ? '' : __t) +
	'" data-actual-price="' +
	((__t = ( actualPrice )) == null ? '' : __t) +
	'" class="harga-asli text-bold ';
	if (defaultPrice==0){ ;
	__p += ' label label-success text-small ';
	 } ;
	__p += '">\n                    ';
	if (defaultPrice==0){ ;
	__p += '\n                    FREE!\n                    ';
	 } else{ ;
	__p += '\n                    ' +
	((__t = ( utils.changeToRupiah(defaultPrice) )) == null ? '' : __t) +
	'\n                    ';
	 } ;
	__p += '\n                </div>\n            </div>\n            <div class="flex flex-row cta">\n                <input type="text" name="eppcode" class="form-control width-auto" placeholder="Epp Code">\n                <button class="btn btn-default btn-icon submit-eppcode" disabled>\n                    Submit\n                </button>\n                <button class="btn btn-default btn-icon delete-eppcode hidden">\n                    <i class="fas fa-trash-alt"></i>\n                    Hapus\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <div class="col-md-12">\n        <div class="persyaratan-domainid alert alert-info ' +
	((__t = ( usePersyaratan ? '' : 'hidden' )) == null ? '' : __t) +
	'">\n            <p class="text-bold"><i class="fas fa-exclamation-circle"></i> Persyaratan Domain ' +
	((__t = ( tld )) == null ? '' : __t) +
	'</p>\n            <ul>\n                ' +
	((__t = ( textPersyaratan )) == null ? '' : __t) +
	'\n            </ul>\n            <br>\n            <span>Kunjungi <a style="font-weight: bold" href="https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id" target="_blank">Link berikut</a> untuk detailnya.</span>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="align-items-center panel-penawaran penawaran-orange" style="margin: 10px 0;">\n    <h4 class="form-title">\n        Tambah Layanan Baru\n    </h4>\n    \n    <div class="row">\n        <div class="col-md-12">\n            <button class="btn btn-orange btn-block" id="tambahLayanan" data-toggle="modal" data-target="#myModal">Tambah Layanan</button>\n        </div>\n    </div>\n</div>\n\n\n<!-- Modal -->\n<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n    <div class="modal-dialog" role="document">\n        <div class="modal-content modal-content-order">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>\n                <h4 class="modal-title" id="myModalLabel">Tambah layanan</h4>\n            </div>\n            <div class="modal-body">\n                <div class="dropdown_select_wrapper" data-type="new_service">\n                    <ul class="default_option">\n                        <li>\n                            <div class="option">\n                                <div class="sub-title">Silahkan pilih layanan</div>\n                            </div>\n                        </li>\n                    </ul>\n                    <ul class="select_ul">\n                        ';
	 for (groupname in group) { ;
	__p += '\n                        <li>\n                            <div class="option" data-groupid="' +
	((__t = ( groupname )) == null ? '' : __t) +
	'">\n                                <div class="title">' +
	((__t = ( group[groupname] )) == null ? '' : __t) +
	'</div>\n                                <div class="description">Deskripsi</div>\n                            </div>\n                        </li>\n                        ';
	 } ;
	__p += '\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="align-items-center panel-penawaran penawaran-orange section-tambah-domain" style="margin: 10px 0;">\n    <h4 class="form-title">\n        Tambah Domain\n    </h4>\n\n    <div class="row input_pencarian_domain">\n        <div class="col-md-10">\n            <div class="form-group">\n                <input type="text" name="domain" class="form-control" placeholder="example.com" data-placement="bottom">\n            </div>\n        </div>\n\n        <div class="col-md-2">\n            <button class="btn btn-fill-primary btn-block" name="cari-domain"><i class="fa fa-spin fa-spinner hidden"></i>Cari</button>\n        </div>\n    </div>\n\n    <div class="hasilpencarian-domain">\n\n    </div>\n\n    <div class="row">\n        <div class="col-md-12">\n            <div class="section-domain-serupa"></div>\n        </div>\n    </div>\n</div>\n';

	}
	return __p
	}

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="row wrapper-domain-available">\n    <div class="col-md-12">\n        <div class="flex flex-row display-domain justify-space-between">\n            <div class="name">\n                <span class="domain-name">' +
	((__t = ( dataDomain.domainName )) == null ? '' : __t) +
	'</span>\n            </div>\n            <div class="flex domain-price-column" style="justify-content: space-between;">\n                <span class="harga-coret"\n                      style="display:none; color:red; padding-top: 12px;padding-right: 10px;font-size: 12px;font-style: italic;"\n                ></span>\n                <div data-price="' +
	((__t = ( defaultPrice )) == null ? '' : __t) +
	'" data-actual-price="' +
	((__t = ( actualPrice )) == null ? '' : __t) +
	'" class="harga-asli text-bold ';
	if (defaultPrice==0){ ;
	__p += ' label label-success text-small ';
	 } ;
	__p += '">\n                    ';
	if (defaultPrice==0){ ;
	__p += '\n                    FREE!\n                    ';
	 } else{ ;
	__p += '\n                    ' +
	((__t = ( defaultPrice )) == null ? '' : __t) +
	'\n                    ';
	 } ;
	__p += '\n                </div>\n            </div>\n            <div class="flex flex-row cta">\n                <select ';
	 if(isFreedomain){ ;
	__p += ' disabled="disabled" ';
	 } ;
	__p += ' class="form-control width-auto" name="registerDomainBillingcycle">\n                ';
	 for (billing in dataDomain.pricing) { ;
	__p += '\n                <option value="' +
	((__t = ( billing )) == null ? '' : __t) +
	'" data-register-price="' +
	((__t = ( dataDomain.pricing[billing].register )) == null ? '' : __t) +
	'">' +
	((__t = ( billing )) == null ? '' : __t) +
	' Tahun</option>\n                ';
	 } ;
	__p += '\n                </select>\n                <button class="btn btn-block btn-orange btn-icon" name="buy-domain">\n                    <i class="fas fa-cart-arrow-down"></i> Tambah\n                </button>\n                <button class="btn btn-block btn-default btn-icon hidden" name="delete-domain">\n                    <i class="fas fa-trash-alt"></i> Hapus\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <div class="col-md-12">\n        <div class="persyaratan-domainid alert alert-info ' +
	((__t = ( usePersyaratan ? '' : 'hidden' )) == null ? '' : __t) +
	'">\n            <p class="text-bold"><i class="fas fa-exclamation-circle"></i> Persyaratan Domain ' +
	((__t = ( tld )) == null ? '' : __t) +
	'</p>\n            <ul>\n                ' +
	((__t = ( textPersyaratan )) == null ? '' : __t) +
	'\n            </ul>\n            <br>\n            <span>Kunjungi <a style="font-weight: bold" href="https://www.jagoanhosting.com/tutorial/tutorial-domain/aktivasi-domain-id" target="_blank">Link berikut</a> untuk detailnya.</span>\n        </div>\n    </div>\n</div>\n\n<div class="row">\n    <div class="col-md-12">\n        <!--        <div class="alert alert-info requirement-domain">-->\n        <!--            <p><span><i class="fas fa-question-circle color-info"></i></span> <b>Persyaratan Beli Domain</b></p>-->\n        <!--        </div>-->\n        <div class="alert alert-danger duplicate-domain hidden">\n            <p><i class="fas fa-exclamation"></i> Domain <b>' +
	((__t = ( dataDomain.domainName )) == null ? '' : __t) +
	'</b> sudah ada di trolli,\n                Coba lagi dengan Domain yang lain, Sob!\n            </p>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="row wrapper-domain-nonavailable">\n    <div class="col-md-12">\n        <div class="flex flex-row display-domain justify-space-between">\n            <div class="name">\n                <span class="domain-name">\n                    ' +
	((__t = ( domain )) == null ? '' : __t) +
	'\n                </span>\n                <span><i class="fas fa-question-circle color-info" data-placement="bottom" data-original-title="Domain ini sudah dibeli orang lain, Sob. Kalo kamu pemilik domain ini dan terdaftar di provider lain, kamu bisa transfer domain ini ke Jagoan Hosting. Atau gunakan untuk layananmu." data-toggle="tooltip"></i></span>\n            </div>\n            <div class="flex flex-row cta">\n                ';
	 if (!dataDomain.hasOwnProperty("error")) { ;
	__p += '\n                <button class="btn btn-default btn-transfer-domain" data-transfer-price="' +
	((__t = ( dataDomain.shortestPeriod.transfer )) == null ? '' : __t) +
	'" name="transfer-domain">\n                    Transfer domain\n                </button>\n                ';
	 } ;
	__p += '\n            </div>\n        </div>\n    </div>\n</div>\n\n<!--<div class="row">-->\n<!--    <div class="col-md-12">-->\n<!--        <div class="alert alert-info requirement-domain">-->\n<!--            <p><span><i class="fas fa-question-circle color-info"></i></span> <b>Persyaratan Beli Domain</b></p>-->\n<!--        </div>-->\n<!--    </div>-->\n<!--</div>-->\n';

	}
	return __p
	}

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {

	 for (domain in domainsSliced) { ;
	__p += '\n<div class="row wrapper-domain-available">\n    <div class="col-md-12">\n        <div class="flex flex-row display-domain justify-space-between">\n            <div class="name">\n                <span class="domain-name">' +
	((__t = ( domainsSliced[domain].domainName )) == null ? '' : __t) +
	'</span>\n            </div>\n            <div class="flex domain-price-column" style="justify-content: space-between;">\n                <span class="harga-coret"\n                      style="display:none; color:red; padding-top: 12px;padding-right: 10px;font-size: 12px;font-style: italic;"\n                ></span>\n                <div class="harga-asli text-bold">\n                    ' +
	((__t = ( domainsSliced[domain].pricing['1'].register )) == null ? '' : __t) +
	'\n                </div>\n            </div>\n            <div class="flex flex-row cta">\n                <select class="form-control width-auto" name="registerDomainBillingcycleSuggested">\n                    ';
	 for (billing in domainsSliced[domain].pricing) { ;
	__p += '\n                        <option value="' +
	((__t = ( billing )) == null ? '' : __t) +
	'" data-register-price="' +
	((__t = ( domainsSliced[domain].pricing[billing].register )) == null ? '' : __t) +
	'">' +
	((__t = ( billing )) == null ? '' : __t) +
	' Tahun</option>\n                    ';
	 } ;
	__p += '\n                </select>\n                <button class="btn btn-block btn-orange btn-icon" name="buy-domain-serupa">\n                    <i class="fas fa-cart-arrow-down"></i> Tambah\n                </button>\n                <button class="btn btn-block btn-default btn-icon hidden" name="delete-domain-serupa">\n                    <i class="fas fa-trash-alt"></i> Hapus\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n';
	 } ;


	}
	return __p
	}

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="panel" id="panel' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-type="domain" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n    <div class="panel-heading panel-heading-order">\n        <div class="flex flex-row justify-space-between">\n            <div class="header-left-panel">\n                <h3 class="title">Layanan yang kamu beli - Domain Baru</h3>\n            </div>\n            <div class="header-right-panel">\n                <div class="flex">\n                    <span class="domain-name">' +
	((__t = ( domainName )) == null ? '' : __t) +
	'</span>\n                    <span class="maximize-icon pointer ' +
	((__t = ( minimize ? '' : 'hidden' )) == null ? '' : __t) +
	'"><i class="fas fa-plus"></i></span>\n                    <span class="minimize-icon pointer ' +
	((__t = ( minimize ? 'hidden' : '' )) == null ? '' : __t) +
	'"><i class="fas fa-minus"></i></span>\n                    <span class="remove-panel pointer"><i class="fas fa-trash-alt"></i></span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="panel-body panel-body-order">\n        <div class="minimize-panel ' +
	((__t = ( minimize ? '' : 'hidden' )) == null ? '' : __t) +
	'">\n\n        </div>\n        <div class="maximize-panel ' +
	((__t = ( minimize ? 'hidden' : '' )) == null ? '' : __t) +
	'">\n            <div class="col-md-12">\n                <div class="hasilpencarian-domain">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="section-domain-serupa">\n</div>';

	}
	return __p
	}

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="panel';
	 if (crosssaleparent != 0) { ;
	__p += ' panel-cross-sales modal fade';
	 } ;
	__p += '" id="panel' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-type="product" data-index="' +
	((__t = ( index )) == null ? '' : __t) +
	'" data-pid="' +
	((__t = ( pid )) == null ? '' : __t) +
	'" ';
	 if (crosssaleparent != 0) { ;
	__p += ' tabindex="-1" role="dialog" aria-labelledby="crossSaleModalLabel" aria-hidden="true"';
	 } ;
	__p += '>\r\n    ';
	 if (crosssaleparent != 0) { ;
	__p += '\r\n     <div class="modal-dialog modal-lg" role="document">\r\n     <div class="modal-content">\r\n     ';
	 } ;
	__p += '\r\n        <div class="panel-heading panel-heading-order">\r\n            <div class="flex flex-row justify-space-between">\r\n                <div class="header-left-panel">\r\n                    <h3 class="title">Layanan yang kamu beli - ' +
	((__t = ( groupname )) == null ? '' : __t) +
	'</h3>\r\n                </div>\r\n                <div class="header-right-panel">\r\n                    <div class="flex">\r\n                        <span class="domain-name"></span>\r\n                        <span class="maximize-icon pointer hidden"><i class="fas fa-plus"></i></span>\r\n                        <span class="minimize-icon pointer"><i class="fas fa-minus"></i></span>\r\n                        <span class="remove-panel pointer"><i class="fas fa-trash-alt"></i></span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="panel-body panel-body-order">\r\n            <div class="minimize-panel hidden">\r\n\r\n            </div>\r\n\r\n            <div class="maximize-panel">\r\n                <div class="col-md-6">\r\n                    <div class="section-pilihpaket">\r\n\r\n                    </div>\r\n                </div>\r\n                <div class="col-md-6">\r\n                    <div class="section-billingcycle">\r\n\r\n                    </div>\r\n                </div>\r\n                <div class="col-md-12">\r\n                    <div class="section-freedomain">\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12 mb-10">\r\n                    <div class="section-upsale">\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12">\r\n                    <div class="section-cross-sales">\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12">\r\n                    <div class="section-penawaran">\r\n\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12">\r\n                    <div class="section-configoptions">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12">\r\n                    <div class="section-customfields">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="col-md-12">\r\n                    <div class="section-tambah-domain">\r\n\r\n                    </div>\r\n                </div>\r\n                <div class="col-md-12">\r\n                    <div class="section-domain-serupa"></div>\r\n                </div>\r\n                <div class="col-md-12">\r\n                    <div class="section-area-footer"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    ';
	 if (crosssaleparent != 0) { ;
	__p += '\r\n        </div>\r\n        </div>\r\n    ';
	 } ;
	__p += '\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h4 class="form-title">\n    Pilih paket\n</h4>\n\n<div class="dropdown_select_wrapper" data-type="product">\n    <ul class="default_option">\n        <li>\n            <div class="option" data-pid="' +
	((__t = ( firstPid )) == null ? '' : __t) +
	'">\n                <div class="title">' +
	((__t = ( currentProduct['details']['name'] )) == null ? '' : __t) +
	'</div>\n                <div class="description">' +
	((__t = ( utils.showDetailProducts(currentProduct['details']['description']) )) == null ? '' : __t) +
	'</div>\n            </div>\n        </li>\n    </ul>\n    <ul class="select_ul">\n        ';
	 for (product in products) { ;
	__p += '\n            ';
	 if (products[product]['details']['name'] == currentProduct['details']['name']) { ;
	__p += '\n            <li class="hidden">\n            ';
	 } else { ;
	__p += '\n            <li>\n            ';
	 } ;
	__p += '\n                <div class="option" data-pid="' +
	((__t = ( product )) == null ? '' : __t) +
	'">\n                    <div class="title">' +
	((__t = ( products[product]['details']['name'])) == null ? '' : __t) +
	'</div>\n                    <div class="description">' +
	((__t = ( utils.showDetailProducts(products[product]['details']['description']) )) == null ? '' : __t) +
	'</div>\n                </div>\n            </li>\n        ';
	 } ;
	__p += '\n    </ul>\n</div>';

	}
	return __p
	}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<h4 class="form-title">\r\n    Durasi Berlangganan <span class="badge" style="\r\n    background: white;\r\n    border: solid 1px #eaeaea;\r\n    color: #333;\r\n"> Flat Price <span class="tambah-domain-info" data-original-title="Biaya Register dan Renewal Tetap Sama, Sob!" data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span></span>\r\n</h4>\r\n\r\n<div class="dropdown_select_wrapper" data-type="billingcycle">\r\n    <ul class="default_option">\r\n        <li>\r\n            <div class="option" data-billingcycle="' +
	((__t = ( defaultBilling['billingcycle'] )) == null ? '' : __t) +
	'">\r\n                <div class="title"> ' +
	((__t = ( utils.changeFormatBilling(defaultBilling['billingcycle']) )) == null ? '' : __t) +
	' <span class="gimmick-price"></span> </div>\r\n                <div class="description">\r\n                    <span class="harga-coret" data-coret="false"></span>\r\n                    ' +
	((__t = ( utils.changeToRupiah(defaultBilling['price']) )) == null ? '' : __t) +
	'\r\n                </div>\r\n            </div>\r\n        </li>\r\n    </ul>\r\n    <ul class="select_ul">\r\n        ';
	 for (price in billingcycle) { ;
	__p += '\r\n            ';
	 if (price.includes("monthprice")) {continue} ;
	__p += '\r\n\r\n            ';
	 if (price == defaultBilling['billingcycle']) { ;
	__p += '\r\n                <li class="hidden">\r\n                    <div class="option" data-billingcycle="' +
	((__t = ( price )) == null ? '' : __t) +
	'">\r\n                        <div class="title"> ' +
	((__t = ( utils.changeFormatBilling(price) )) == null ? '' : __t) +
	' <span class="gimmick-price"></span> </div>\r\n                        <div class="description">\r\n                            <span class="harga-coret" data-coret="false"></span>\r\n                            ' +
	((__t = ( utils.changeToRupiah(billingcycle[price]) )) == null ? '' : __t) +
	'\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ';
	 continue } ;
	__p += '\r\n\r\n            ';
	 if (billingcycle[price] < 1) { ;
	__p += '\r\n            <li class="hidden billing-minus">\r\n                <div class="option" data-billingcycle="' +
	((__t = ( price )) == null ? '' : __t) +
	'">\r\n                    <div class="title"> ' +
	((__t = ( utils.changeFormatBilling(price) )) == null ? '' : __t) +
	' <span class="gimmick-price"></span> </div>\r\n                    <div class="description">\r\n                        <span class="harga-coret" data-coret="false"></span>\r\n                        ' +
	((__t = ( utils.changeToRupiah(billingcycle[price]) )) == null ? '' : __t) +
	'\r\n                    </div>\r\n                </div>\r\n            </li>\r\n\r\n            ';
	 } else { ;
	__p += '\r\n            <li>\r\n                <div class="option" data-billingcycle="' +
	((__t = ( price )) == null ? '' : __t) +
	'">\r\n                    <div class="title"> ' +
	((__t = ( utils.changeFormatBilling(price) )) == null ? '' : __t) +
	' <span class="gimmick-price"></span> </div>\r\n                    <div class="description">\r\n                        <span class="harga-coret" data-coret="false"></span>\r\n                        ' +
	((__t = ( utils.changeToRupiah(billingcycle[price]) )) == null ? '' : __t) +
	'\r\n                    </div>\r\n                </div>\r\n            </li>\r\n            ';
	 } ;
	__p += '\r\n        ';
	 } ;
	__p += '\r\n    </ul>\r\n</div>\r\n';

	}
	return __p
	}

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="dropdown_select_wrapper col-md-12" style="border: 0;">\n    \n    <div class="col-md-10">\n        <div class="form-group">\n            <select name="pilih_domain" class="form-control">\n                <option value="">Pilih Domain</option>\n                ';
	 for (domain in domains) { ;
	__p += '\n                    <option value="' +
	((__t = ( domains[domain].domain )) == null ? '' : __t) +
	'" data-index="' +
	((__t = ( domain )) == null ? '' : __t) +
	'">' +
	((__t = ( domains[domain].domain )) == null ? '' : __t) +
	'</option>\n                ';
	 } ;
	__p += '\n            </select>\n        </div>\n    </div>\n\n    <div class="col-md-2">\n        <button class="btn btn-fill-primary btn-block" name="gunakan_pilih_domain"><i class="fa fa-spin fa-spinner hidden"></i>Gunakan</button>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="align-items-center">\n    <p class="panel-penawaran penawaran-info">\n        <span>\n            <i class="fas fa-info-circle color-info"></i>\n        </span>\n        Dapatkan <b>Free Domain ' +
	((__t = ( freedomaintlds )) == null ? '' : __t) +
	' </b> dengan pilih durasi berlangganan <b>' +
	((__t = ( freedomainpaymentterms )) == null ? '' : __t) +
	'</b>\n    </p>\n</div>\n';

	}
	return __p
	}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<h4 class="form-title">\n    Tambah domain untuk layanan ini <span class="tambah-domain-info" data-original-title="Kamu bisa menambahkan domain baru, atau menggunakan domain yang sudah kamu punya." data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info"></i></span>\n</h4>\n<div class="gunakan_domain_dari_cart hidden">\n    <h4 class="form-title">\n        <input type="checkbox" name="gunakan_domain_dari_cart" >\n        &nbsp; Gunakan Domain dari Troli\n    </h4>\n</div>\n<div class="row tampilkan_list_domain"></div>\n<div class="row input_pencarian_domain">\n    <div class="col-md-10">\n        <div class="form-group">\n            <input type="text" name="domain" class="form-control" placeholder="example.com" data-placement="bottom">\n        </div>\n    </div>\n\n    <div class="col-md-2">\n        <button class="btn btn-fill-primary btn-block" name="cari-domain"><i class="fa fa-spin fa-spinner hidden"></i>Cari</button>\n    </div>\n</div>\n\n<div class="hasilpencarian-domain">\n\n</div>';

	}
	return __p
	}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="row">\n    <div class="col-md-12">\n        <div class="flex flex-row justify-space-between align-items-center" style="margin-bottom: 15px;">\n            <div class="spotlight-title-wrapper">\n                <h2 class="title-spotlight" style="\n    margin-top: 25px;\n    font-size: 16px;\n">\n                    Domain Serupa <br>\n                    <span style="\n    font-size: 12px;\n    font-weight: 500;\n    font-family: \'Open Sans\';\n">\n        Website kamu bisa tampil lebih beda dengan menggunakan domain unik berikut ini\n    </span> <span class="tambah-domain-info" data-original-title="Beberapa domain dibuat berdasarkan peruntukan yang lebih spesifik. Misal Domain .TODAY untuk website seperti berita harian." data-toggle="tooltip" data-placement="top"><i class="fas fa-question-circle color-info" style="\n    font-size: 14px;\n"></i></span>\n                </h2>\n            </div>\n\n            <button class="btn btn-default tutup-spotlight">\n                Tutup\n            </button>\n            <button class="btn btn-default buka-spotlight hidden">\n                Buka\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class="show-domain-serupa"></div>\n\n<div class="row">\n    <div class="col-md-12">\n        <div class="btn btn-default btn-block btn-domain-serupa"><b>Lihat lebih banyak</b></div>\n    </div>\n</div>\n';

	}
	return __p
	}

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="row wrapper-domain-nonavailable">\n    <div class="col-md-12">\n        <div class="flex flex-row display-domain justify-space-between">\n            <div class="name">\n                <span class="domain-name">\n                    ' +
	((__t = ( domain )) == null ? '' : __t) +
	'\n                </span>\n                <span><i class="fas fa-question-circle color-info" data-placement="bottom" data-original-title="Domain ini sudah dibeli orang lain, Sob. Kalo kamu pemilik domain ini dan terdaftar di provider lain, kamu bisa transfer domain ini ke Jagoan Hosting. Atau gunakan untuk layananmu." data-toggle="tooltip"></i></span>\n            </div>\n            <div class="flex flex-row cta">\n                ';
	 if (allowUseDomain) { ;
	__p += '\n                <button class="btn btn-default btn-gunakan-domain">\n                    <i class="hidden"><img src="/modules/addons/beon_order/templates/assets/images/icon-success.png" alt=""></i>\n                    <span class="text">Gunakan</span>\n                </button>\n                ';
	 } ;
	__p += '\n\n                ';
	 if (!dataDomain.hasOwnProperty("error")) { ;
	__p += '\n                <button class="btn btn-default btn-transfer-domain" data-transfer-price="' +
	((__t = ( defaultPrice )) == null ? '' : __t) +
	'" data-actual-price="' +
	((__t = ( dataDomain.shortestPeriod.transfer )) == null ? '' : __t) +
	'" name="transfer-domain">\n                    Transfer domain\n                </button>\n                ';
	 } ;
	__p += '\n            </div>\n        </div>\n    </div>\n</div>\n\n<!--<div class="row">-->\n<!--    <div class="col-md-12">-->\n<!--        <div class="alert alert-info requirement-domain">-->\n<!--            <p><span><i class="fas fa-question-circle color-info"></i></span> <b>Persyaratan Beli Domain</b></p>-->\n<!--        </div>-->\n<!--    </div>-->\n<!--</div>-->\n';

	}
	return __p
	}

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {

	 for (let id in cross_sales) { ;
	__p += '\r\n    <div class="align-items-center">\r\n        <p class="panel-upsales">\r\n            <input type="checkbox"\r\n                   name="addon"\r\n                   value="' +
	((__t = ( id )) == null ? '' : __t) +
	'"\r\n                   id="' +
	((__t = ( randomId + id )) == null ? '' : __t) +
	'"\r\n                   data-type="' +
	((__t = ( cross_sales[id].type )) == null ? '' : __t) +
	'"\r\n                   ' +
	((__t = ( (id in cart) ? 'checked' : '' )) == null ? '' : __t) +
	'\r\n            >\r\n            <label for="' +
	((__t = ( randomId + id )) == null ? '' : __t) +
	'">' +
	((__t = ( cross_sales[id].text )) == null ? '' : __t) +
	'</label>\r\n        </p>\r\n    </div>\r\n';
	 } ;


	}
	return __p
	}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="align-items-center upsale-content" data-upsale="' +
	((__t = (id)) == null ? '' : __t) +
	'">\r\n    ' +
	((__t = (text)) == null ? '' : __t) +
	'\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="align-items-center panel-penawaran penawaran-orange">\n    <h4 class="form-title">\n        Tambah Layanan Baru\n    </h4>\n\n    <div class="row">\n        <div class="col-md-12">\n            <button class="btn btn-orange btn-block" id="tambahLayanan" data-toggle="modal" data-target="#myModal">Tambah Layanan</button>\n        </div>\n    </div>\n</div>\n\n<!-- Modal -->\n<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n    <div class="modal-dialog" role="document">\n        <div class="modal-content modal-content-order">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-window-close"></i></button>\n                <h4 class="modal-title" id="myModalLabel">Tambah layanan</h4>\n            </div>\n            <div class="modal-body">\n                <div class="dropdown_select_wrapper" data-type="new_service">\n                    <ul class="default_option">\n                        <li>\n                            <div class="option">\n                                <div class="sub-title">Silahkan pilih layanan</div>\n                            </div>\n                        </li>\n                    </ul>\n                    <ul class="select_ul dropdown-accordion">\n                        ';
	 for (index in group_type) { ;
	__p += '\n                        <li class="head-dropdown">\n                            <div class="accordion">\n                                <div class="accordion__item">\n                                    <div class="accordion__item__header" data-grouptype="' +
	((__t = ( index )) == null ? '' : __t) +
	'">\n                                        ' +
	((__t = ( index )) == null ? '' : __t) +
	'\n                                    </div>\n\n                                    <div class="accordion__item__content">\n                                        <ul>\n                                            ';
	 group_type[index].forEach(function(value) { ;
	__p += '\n                                            <li data-groupid="' +
	((__t = ( value.gid )) == null ? '' : __t) +
	'">\n                                                ' +
	((__t = ( value.groupname )) == null ? '' : __t) +
	'\n                                            </li>\n                                            ';
	 }) ;
	__p += '\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div> <!-- id accordion end -->\n                        </li>\n                        ';
	 } ;
	__p += '\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="counter">\n    <h4 class="form-title"> ' +
	((__t = ( optionname )) == null ? '' : __t) +
	' </h4>\n    <div class="input-group inline-group">\n        <div class="input-group-addon">\n            <button class="btn btn-fill-primary btn-minus">\n                <i class="fa fa-minus"></i>\n            </button>\n        </div>\n        <input class="form-control quantity config-quantity" min="' +
	((__t = ( min )) == null ? '' : __t) +
	'" max="' +
	((__t = ( max )) == null ? '' : __t) +
	'" name="quantity" value="' +
	((__t = ( value )) == null ? '' : __t) +
	'" type="number" data-id="' +
	((__t = ( id )) == null ? '' : __t) +
	'">\n        <div class="input-group-addon">\n            <button class="btn btn-fill-primary btn-plus">\n                <i class="fa fa-plus"></i>\n            </button>\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }),
/* 80 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="col-md-6">\n    <span><b>Paket:</b> ' +
	((__t = ( paket )) == null ? '' : __t) +
	'</span>\n</div>\n<div class="col-md-6">\n    <span><b>Durasi berlangganan:</b> ' +
	((__t = ( billingcycle )) == null ? '' : __t) +
	'</span>\n</div>';

	}
	return __p
	}

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="col-md-6">\n    <span><b>Domain:</b> ' +
	((__t = ( paket )) == null ? '' : __t) +
	'</span>\n</div>\n<div class="col-md-6">\n    <span><b>Durasi berlangganan:</b> ' +
	((__t = ( billingcycle )) == null ? '' : __t) +
	' Tahun</span>\n</div>';

	}
	return __p
	}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '', __j = Array.prototype.join;
	function print() { __p += __j.call(arguments, '') }
	with (obj) {
	__p += '<div class="align-items-center cross-sales-content" data-crosssales="' +
	((__t = (pid)) == null ? '' : __t) +
	'" data-crosssales-id="' +
	((__t = (id)) == null ? '' : __t) +
	'">\r\n    <p class="panel-penawaran ';
	 if(!ischeck) { ;
	__p += ' penawaran-primary ';
	 } ;
	__p += '">\r\n        <span style="padding-right: 8px;">\r\n             <input type="checkbox" name="check_crosssales" value="' +
	((__t = (pid)) == null ? '' : __t) +
	'" ';
	 if(ischeck) { ;
	__p += ' checked ';
	 } ;
	__p += '>\r\n        </span>\r\n        ' +
	((__t = (description)) == null ? '' : __t) +
	'\r\n        <span>\r\n            <button class="btn btn-default right-button ';
	 if(!ischeck || paytype == "onetime") { ;
	__p += ' hidden ';
	 } ;
	__p += '" name="edit_crosssales" style="margin-top: -6px;font-weight: bold;">Edit</button>\r\n        </span>\r\n    </p>\r\n</div>\r\n';

	}
	return __p
	}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- Modal -->\r\n<div class="modal fade" id="cross-sale-modals" tabindex="-1" role="dialog" aria-labelledby="crossSaleModalLabel" aria-hidden="true">\r\n    <div class="modal-dialog modal-md" role="document">\r\n        <div class="modal-content modal-login">\r\n            <div class="modal-header">\r\n                <button type="button" class="close" data-dismiss="modal">\r\n                    <span aria-hidden="true">×</span>\r\n                    <span class="sr-only">Close</span>\r\n                </button>\r\n                <h5 class="modal-title"><strong id="crossSaleModalLabel">Jagoan Hosting</strong></h5>\r\n            </div>\r\n            <div class="modal-body">\r\n                <div id="section-content-cross-sales">\r\n                    <div class="col-md-6">\r\n                        <div class="option">\r\n                            <div class="title">ID FAME</div>\r\n                            <div class="description">1000 MB   SSD Storage*</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-md-6">\r\n                        <div class="section-billingcycle">\r\n\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <button class="btn btn-fill-primary hidden" name="submit_crosssales">Submit</button>\r\n                <div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>';

	}
	return __p
	}

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="align-items-center text-center">\r\n    <button class="btn btn-fill-primary" name="simpan_crosssales">Update</button>\r\n</div>\r\n';

	}
	return __p
	}

/***/ })
/******/ ]);