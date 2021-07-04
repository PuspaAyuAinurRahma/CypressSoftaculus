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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by agam on 04/05/17.
	 */
	var BeonOrderHelper  = __webpack_require__(1);
	var Order = {
	    'init':function () {
	        var explode_url = window.location.href.split('/');
	        if((explode_url[explode_url.length-1].split('?'))[0] == 'cart.php'){
	            BeonOrderHelper.init();
	        };
	    }
	};
	Order.init();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var config_temp = {
	    'nav': __webpack_require__(2),
	    'tab_wrapper': __webpack_require__(3),
	    'tos_attention': __webpack_require__(4),
	    'register': __webpack_require__(5),
	    'checkout_wrapper': __webpack_require__(6),
	    'accordion_cart_wrapper': __webpack_require__(7),
	    'accordio_cart_item': __webpack_require__(8),
	};

	var BeonKnowledgeBaseHelper = {
	    init: function () {
	        var mod_func = this;
	        if(!global_vars.isLoggedIn) {
	            mod_func.render.view();
	            mod_func.action.init();
	        }else{
	            mod_func.render.checkout();
	        }
	        // $('form[action="/knowledgebase.php?action=search"]','.main-content').attr('action','/index.php?m=beon_knowledgebase&action=search');
	        // mod_func.formsubmit();
	    },
	    render:{
	        'view'       : function () {
	            this.initTab();
	            this.hideField();
	            this.checkout();
	            this.separateField();
	            this.setupField();
	            this.accordionSidebar();
	        },
	        'initTab' : function () {
	            $('#main-body').find('.nav-material:eq(0)').html(config_temp.nav());
	            $('#main-body').find('.nav-material:eq(0)').addClass("nav-tabs");
	            $(config_temp.tab_wrapper()).insertAfter('#inputCustType');
	            $('#containerExistingUserSignin').removeClass("hidden").addClass("tab-pane fade in active").detach().appendTo('#tab-content-wrapper');
	            $('#containerNewUserSignup').addClass("tab-pane fade").detach().appendTo('#tab-content-wrapper');
	            $(config_temp.register()).insertBefore($('#containerNewUserSignup'));
	            $('#inputCustType').val('existing');
	            $('#containerExistingUserSignin').find('h6').replaceWith(function() {
	                return '<h5>' + $(this).text() + '</h5>';
	            });

	            $('#containerRegister').prepend("<h5>New User Registration</h5>");
	            $('#containerNewUserSignup').prepend("<h5>User's Profile Setting</h5>");
	        },
	        'separateField' : function () {
	            var row = $('#containerRegister').find('.row').first();
	            $('#inputEmail').parent().parent().detach().appendTo(row);
	            $('#inputNewPassword1').parent().parent().detach().appendTo(row);
	            $('#inputNewPassword2').parent().parent().detach().appendTo(row);
	            $('#passwordStrengthMeterBar').parent().parent().appendTo($('#inputNewPassword1').parent().parent());
	            $('#containerNewUserSecurity').prev('hr').first().remove();
	            $('#containerNewUserSecurity').remove();

	            $('#frmCheckout').append(config_temp.checkout_wrapper());
	            $('.payment-method').first().parent().parent().parent().prev().nextAll().appendTo($('#checkoutWrapper'));
	        }
	        ,
	        'hideField' : function () {
	            if(global_vars.pass1){
	                $('#inputNewPassword1').val(global_vars.pass1);
	            }
	            if(global_vars.pass1){
	                $('#inputNewPassword2').val(global_vars.pass2);
	            }                                                        $('#inputAddress2').parent().parent().remove();
	            $('#inputCompanyName').parent().parent().remove();
	            $('#customfield110').parent().parent().detach().appendTo($('#inputPhone').parent().parent().parent());
	            $('#customfield115').parent().parent().detach().appendTo($('#inputPhone').parent().parent().parent());
	            $('#containerNewUserSignup').find('.row').last().remove();
	            $('#containerNewUserSignup').find('h6').last().remove();
	            $('#inputAddress1').parent().parent().detach().prependTo($('#containerNewUserSignup').find('.row').last());

	        },
	        'checkout' : function () {
	            $('#inputDomainContact').parent().parent().parent().remove();   
	            $("textarea[name='notes']").parent().parent().parent().remove();
	            $('#frmCheckout').find('h6').last().remove();
	            $(config_temp.tos_attention()).insertBefore($('#btnCompleteOrder').parent());
	            $('#btnCompleteOrder').parent().removeClass('text-right').addClass('text-center');
	            $('#btnCompleteOrdersidebar').remove();
	            $('#btnCompleteOrder').removeClass('hidden');
	        },
	        'setupField' : function () {
	            $('#containerRegister').find('input').parent().parent().removeClass('col-sm-6').addClass('col-sm-12');
	            $('#containerRegister').find('.row').first().append('<div class="col-sm-12 text-center"></div>');
	            $('#btnNextToProfile').appendTo($('#containerRegister').find('.col-sm-12').last());
	        },
	        'accordionSidebar' : function () {
	            console.log("action sidebar");
	            $('.view-cart-items').append(config_temp.accordion_cart_wrapper());
	            $('.view-cart-items').find('.row').each(function (index) {

	                var data = new Object;
	                data.title = $(this).find('h6').first().html();
	                console.log(data);
	                // $(this).remove();
	                // $('#accordionCart').append(config_temp.accordio_cart_item());
	            });
	        }
	    },
	    action: {
	        'init' : function () {
	            this.navigation();

	            if($('#order-standard_cart').prev().first().hasClass('alert')){
	                if($('#order-standard_cart').prev().first().html().includes('password')){
	                    $('.nav-tabs').first().find('a[href="#containerRegister"]').click();
	                }else{
	                    this.tabToCreateNewAccount();
	                }
	            }
	        },
	        'navigation' : function () {
	            this.form();
	            this.buttonNext();
	            this.ontabchange();
	        },
	        'form' : function () {
	            $('form').keypress(function (e) {
	                if(e.keyCode === 13){
	                    e.preventDefault();
	                    return false;
	                }
	            });
	        },
	        'ontabchange' : function () {
	            $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
	                if($(e.target).attr('href') === "#containerRegister"){
	                    $("#checkoutWrapper").hide();
	                }else{
	                    $("#checkoutWrapper").show();
	                }

	                if($(e.target).attr('href') === "#containerExistingUserSignin"){
	                    $("#inputCustType").val('existing');
	                }else{
	                    $("#inputCustType").val('new');
	                }
	            })
	        },
	        'tabToCreateNewAccount' : function () {
	            var profile = $('.nav-tabs').first().find('a[href="#containerNewUserSignup"]');
	            profile.click();
	            $(profile).parent().removeClass('active');
	            $('a[href="#' + $('#btnNextToProfile').parents('.tab-pane').attr('id') + '"]').parent().addClass('active');
	        },
	        'buttonNext' : function () {
	            var action = this;
	            $('#btnNextToProfile').on('click', function (e) {
	                e.preventDefault();

	                if($('#inputNewPassword1').val() !== $('#inputNewPassword2').val()){
	                    action.showAlert("Password and confirm password doesn't match");
	                    return;
	                }
	                $.ajax({
	                    'url' : '/index.php?m=beon_incomplete_profile&a=create_or_update_incomplete_client',
	                    'data' : {
	                        'email' : $('#inputEmail').val()
	                    },
	                    'method' : 'POST',
	                    'dataType' : 'json',
	                    'beforeSend' : function () {
	                        action.hideAlert();
	                        action.showLoader();
	                    },
	                    'success': function (data) {
	                        console.log(data);
	                        if(data.status != 0){
	                            action.tabToCreateNewAccount();
	                        }else{
	                            action.showAlert(data.message);
	                        }
	                        action.hideLoader();
	                    },
	                    'error' : function () {
	                        action.hideLoader();
	                        action.showAlert('Connection error occured please check your connection. If the problem still happen, please contact us!');
	                    }
	                });
	            });
	        },
	        'showAlert' : function (msg) {
	            $('#alertMessage').parent().show();
	            $('#alertMessage').html(msg);
	        },
	        'hideAlert' : function () {
	            $('#alertMessage').parent().hide();
	        },
	        'showLoader' : function () {
	            $('#loadingNextButton').show();
	        },
	        'hideLoader' : function () {
	            $('#loadingNextButton').hide();
	        }
	    }
	};
	module.exports = BeonKnowledgeBaseHelper;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<li class="active client-option text-center"><a data-toggle="tab" href="#containerExistingUserSignin">Login</a></li>\n<li class="client-option text-center"><a data-toggle="tab" href="#containerRegister">Create New Account</a></li>\n<li class="client-option hidden"><a data-toggle="tab" href="#containerNewUserSignup">Profile Detail</a></li>';

	}
	return __p
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="tab-content" id="tab-content-wrapper">\n</div>';

	}
	return __p
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="tos-message">\n    <p class="text-center">\n        By clicking checkout you agree with our Term Of Service\n    </p>\n</div>';

	}
	return __p
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div id="containerRegister" class="tab-pane fade">\n    <div class="alert alert-danger" role="alert" hidden>\n        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n        <span class="sr-only">Error:</span>\n        <span id="alertMessage"></span>\n    </div>\n\n    <div class="row">\n\n    </div>\n\n    <button id="btnNextToProfile" class="btn btn-primary">Next<i id="loadingNextButton" class="fa fa-spinner fa-pulse fa-fw" style="display: none;"></i></button>\n</div>';

	}
	return __p
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div id="checkoutWrapper">\n\n</div>';

	}
	return __p
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="panel-group" id="accordionCart" role="tablist" aria-multiselectable="true">\n</div>';

	}
	return __p
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class="panel panel-default">\n    <div class="panel-heading" role="tab" id="headingOne">\n        <h4 class="panel-title">\n            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\n                Collapsible Group Item #1\n            </a>\n        </h4>\n    </div>\n    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">\n        <div class="panel-body">\n            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven\'t heard of them accusamus labore sustainable VHS.\n        </div>\n    </div>\n</div>';

	}
	return __p
	}

/***/ }
/******/ ]);