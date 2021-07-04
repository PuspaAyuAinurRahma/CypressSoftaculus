var Orderconfigs    = require(__dirname + "/../../config/const.js");
var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
var ApiHelper       = require(__dirname + "/../../helpers/api/api.js");

var __layouts = {
    alertError: require("ejs!" + __dirname + "/../../layouts/ordersections/alert-error.ejs"),
    paymentModal: require("ejs!" + __dirname + "/../../layouts/payment/payment-method.ejs")
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
        var CartSDK = require(__dirname + "/../../helpers/orders/Carts.js");

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
            var CartSDK = require(__dirname + "/../../helpers/orders/Carts.js");

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
            var VpsSDK = require(__dirname + "/../../helpers/orders/Vpsx.js");

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