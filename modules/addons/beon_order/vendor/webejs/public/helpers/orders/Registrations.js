

var Orderconfigs    = require(__dirname + "/../../config/const.js");
var ApiHelper       = require(__dirname + "/../../helpers/api/api.js");
var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
var RegionHelper    = require(__dirname + "/../../helpers/regions/Region.js");


var __layouts ={
    registrationmodal   : require("ejs!"+__dirname+"/../../layouts/registrations/registrationmodal.ejs"),
    step1               : require("ejs!"+__dirname+"/../../layouts/registrations/step1.ejs"),
    step2               : require("ejs!"+__dirname+"/../../layouts/registrations/step2.ejs"),
    step3               : require("ejs!"+__dirname+"/../../layouts/registrations/step3.ejs"),
    confirmationmodal   : require("ejs!"+__dirname+"/../../layouts/registrations/confirmation.ejs"),
    addressform         : require("ejs!"+__dirname+"/../../layouts/registrations/addressform.ejs"),
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
                var LoginSDK        = require(__dirname + "/../../helpers/orders/Login.js");
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