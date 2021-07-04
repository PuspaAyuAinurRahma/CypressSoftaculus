var Orderconfigs    = require(__dirname + "/../../config/const.js");
var ApiHelper       = require(__dirname + "/../../helpers/api/api.js");
var RegistrationSDK = require(__dirname + "/../../helpers/orders/Registrations.js");

var __layouts ={
    loginmodal  : require("ejs!"+__dirname+"/../../layouts/logins/loginmodal.ejs"),
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