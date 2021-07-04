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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	
	var BeonHotPrice  = __webpack_require__(10);
	var HotPrice = {
	    'init':function () {
	        BeonHotPrice.init();
	    }
	};
	HotPrice.init();


/***/ },

/***/ 10:
/***/ function(module, exports) {

	var configpage = window.beon_hot_price_page.config;

	var BeonHotPrice = {
	    init: function () {
	        var parts = window.location.search.substr(1).split("&");
	        var $_GET = {};
	        for (var i = 0; i < parts.length; i++) {
	            var temp = parts[i].split("=");
	            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
	        }

	        var hot_price_products = configpage.products;
	        console.log(hot_price_products);
	        $('.plan','#product-packages').each(function (index, item) {
	            var target = $(this).find('h4').html();
	            if (target in hot_price_products){
	                if(hot_price_products[target].price > 0) {
	                    var selected_cycle= hot_price_products[target].selected;
	                    var available_price = hot_price_products[target][selected_cycle];
	                    $(this).find('.price').find('h5').html(hot_price_products[target].price_monthly_view);
	                    console.log($(this).addClass('hot-price').find('.price h5'));
	                    // $(this).addClass('hot-price').find('.price h5').text(hot_price_products[target].price_annually_view);
	                    $(this).addClass('hot-price').find('.price').prepend('<h5><strike>' + hot_price_products[target].price_view + '</strike></h5>');
	                }
	            }
	        })
	    },
	};
	module.exports = BeonHotPrice;


/***/ }

/******/ });