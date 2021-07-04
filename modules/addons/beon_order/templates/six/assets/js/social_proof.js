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

	
	var BeonSocialProof  = __webpack_require__(10);
	var SocialProof = {
	    'init':function () {
	        BeonSocialProof.init();
	    }
	};
	SocialProof.init();


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var configpage = window.beon_social_proof.config;
	var social_proof_badge = __webpack_require__(11);

	var BeonSocialProof = {
	    init: function () {
	        $('body').append(social_proof_badge(configpage));
	    },
	};
	module.exports = BeonSocialProof;


/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = function (obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<div class=\'last-order-in-cart\'>\n    <p>\n        <span class=\'name\'>' +
	((__t = ( firstname )) == null ? '' : __t) +
	' ' +
	((__t = ( lastname )) == null ? '' : __t) +
	'</span> purcashed a\n    </p>\n    <a href=\'https://member.jagoanhosting.com/cart.php?gid=' +
	((__t = ( gid )) == null ? '' : __t) +
	'\'>' +
	((__t = ( name )) == null ? '' : __t) +
	'</a>\n    <p class=\'minute\'>in ' +
	((__t = ( moment )) == null ? '' : __t) +
	' ago</p>\n</div>';

	}
	return __p
	}

/***/ }

/******/ });