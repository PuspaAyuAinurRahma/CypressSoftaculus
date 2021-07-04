/**
 * Created by agam on 04/05/17.
 */

var MainLayout      = require(__dirname+"/../helpers/base/MainLayout.js");
var Orderconfigs    = require(__dirname+"/../config/const.js");
var ServicesSDK     = require(__dirname+"/../helpers/orders/Services.js");
var DomainSDK       = require(__dirname+"/../helpers/orders/Domains.js");
var CartSDK         = require(__dirname+"/../helpers/orders/Carts.js");

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
