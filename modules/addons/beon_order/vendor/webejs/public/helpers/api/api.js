var Orderconfigs  = require(__dirname+"/../../config/const.js");

var ApiHelper = {
    getTldLists: function(callback){
       var lookup = jQuery.get(
          Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-tld-list',
          function(response){
             callback(response)
          }
       );
    },
    checkAvailabilityDomain : function (domain, callback) {
        var lookup = jQuery.post(
            Orderconfigs.base_url+'/index.php?rp=/domain/check',
            {
                token: csrfToken,
                type: 'domain',
                domain: domain,
                source: 'cartAddDomain'
            },
            function (data) {
               var arrDomain = domain.split(".")
               arrDomain.splice(0,1)
               var tld = arrDomain.join(".")

               ApiHelper.getTldLists(function (result){
                  let tldIsSell = result.data.includes(tld)
                  if(!tldIsSell){
                     data.result[0].domainName = domain;
                     data.result[0].idnDomainName = domain;
                     data.result[0].tld = tld;
                     data.result[0].tldNoDots = tld;
                     data.result[0].isAvailable = false;
                     data.result[0].isRegistered = false;
                     data.result[0].isValidDomain = true;
                     data.result[0].legacyStatus = "error";
                  }
                  callback(data)
               });
            }
        );
    },
    checkDomainSpotlight : function (domain, callback) {
        var lookup = jQuery.post(
            Orderconfigs.base_url+'/index.php?rp=/domain/check',
            {
                token: csrfToken,
                type: 'spotlight',
                domain: domain,
                source: 'cartAddDomain'
            },
            function (data) {
                callback(data)
            }
        );
    },
    detailTemplate: function (templateOs, callback) {
        var lookup = jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-information-template',
            {
                template_id: templateOs
            },
            function (data) {
                callback(data)
            }
        );
    },
    Register : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=register-client&version=2',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    Login : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=login&version=2',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    Confirmation: function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=confirm-code',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    getCountries: function (callback) {
        $.getJSON("/resources/country/dist.countries.json", function (response) {
            callback(response);
        });
    },
    getRegion: function (callback) {
        $.getJSON("/templates/orderforms/sobat_jagoan/js/indonesianregion/region.json", function (response) {
            callback(response);
        });
    },
    getCity: function (callback) {
        $.getJSON("/templates/orderforms/sobat_jagoan/js/indonesianregion/cities.json", function (response) {
            callback(response);
        });
    },
    resendOTP : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=resend-code',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    cekPromoCode : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=validate-promo-code',
            {
                code: data
            },
            function (response) {
                callback(response);
            }
        );
    },
    completeRegistration : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=complete-registration',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    checkout : function (data, callback) {
        var endpointBase        = Orderconfigs.base_url;
        if (endpointBase.slice(-1) == '/') {
            endpointBase        = window.location.protocol + "//" + window.location.host
        }
        jQuery.post(
            endpointBase+'/index.php?m=beon_order&action=api&api=checkout',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    getPayment : function (data, callback) {
        jQuery.post(
            Orderconfigs.base_url+'/index.php?m=beon_order&action=api&api=get-visible-payment',
            data,
            function (response) {
                callback(response);
            }
        );
    },
    fetchGeneralPromoCode : function (callback) {
        jQuery.get(
            Orderconfigs.base_url+'/index.php?m=jagoan_developer&action=api&api=fech-general-promo-code',
            function (response) {
                callback(response);
            }
        );
    }
};

module.exports = ApiHelper