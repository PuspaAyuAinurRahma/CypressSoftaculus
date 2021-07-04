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

	/**
	 * Created by agam on 04/05/17.
	 */
	var BeonProductHighlighting  = __webpack_require__(9);
	var HighlightProduct = {
	    'init':function () {
	        BeonProductHighlighting.init();
	    }
	};
	HighlightProduct.init();


/***/ },

/***/ 9:
/***/ function(module, exports) {

	var configpage = window.beon_highlighting_page.config;

	var BeonProductHighlighting = {
	    init: function () {
	        BeonProductHighlighting.render.highlight();
	    },
	    render:{
	        highlight: function () {
	            var highligt_products = configpage.products;
	            $('.plan','#product-packages').each(function (index, item) {
	                var target = $(this).find('h4').html();
	                if (target in highligt_products){
	                    if(!$(this).hasClass('hot-label')) {
	                        $(this).addClass('hot-label');
	                    }
	                }
	            })
	        }
	    }
	};
	module.exports = BeonProductHighlighting;


/***/ }

/******/ });