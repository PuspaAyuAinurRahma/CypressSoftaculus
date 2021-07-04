var Orderconfigs = window.__orderconfigs;
var UrlReader  = require(__dirname+"/../helpers/base/UrlReader.js");

UrlReader.splitUrl(function (response) {
    Orderconfigs.urlvars = response;
});
module.exports = Orderconfigs;
