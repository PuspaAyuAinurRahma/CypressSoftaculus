var Orderconfigs  = require(__dirname+"/../../config/const.js");
var ApiHelper = require(__dirname + "/../api/api.js");
var CartsSDK = require(__dirname+"/Carts.js");

var __layouts ={
    cart                : require("ejs!"+__dirname+"/../../layouts/carts/main.ejs"),
    orderdomainsections : require("ejs!"+__dirname+"/../../layouts/orderdomainsections/main.ejs"),
    section_order_title : require("ejs!" + __dirname + "/../../layouts/ordersections/section_order_title.ejs"),
    section_step_order  : require("ejs!" + __dirname + "/../../layouts/ordersections/section_step_order.ejs"),
    input_eppcode       : require("ejs!" + __dirname + "/../../layouts/ordersections/input-eppcode.ejs"),
    section_tambah_layanan_baru : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/section_tambah_layanan_baru.ejs"),
    section_tambah_domain       : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/section_tambah_domain.ejs"),
    pencariandomain_available   : require("ejs!" + __dirname + "/../../layouts/ordersections/hasilpencariandomain-available.ejs"),
    pencariandomain_nonavailable: require("ejs!" + __dirname + "/../../layouts/orderdomainsections/hasilpencariandomain-nonavailable.ejs"),
    section_domain_serupa       : require("ejs!" + __dirname + "/../../layouts/ordersections/section-domain-serupa.ejs"),
    section_layanan_yang_kamu_beli       : require("ejs!" + __dirname + "/../../layouts/orderdomainsections/section_layanan_yang_kamu_beli.ejs"),
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
