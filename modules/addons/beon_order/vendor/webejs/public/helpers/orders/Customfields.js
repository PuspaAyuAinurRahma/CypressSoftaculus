var CartsSDK = require(__dirname+"/Carts.js");


var __layouts ={
    customfields_text       : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_text.ejs"),
    customfields_appsdir    : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_appsdir.ejs"),
    customfields_ipaddr     : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_ipaddr.ejs"),
    customfields_dropdown   : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_dropdown.ejs"),
    customfields_apps       : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_apps.ejs"),
    customfields_thickbox   : require("ejs!" + __dirname + "/../../layouts/ordersections/customfields/type_thickbox.ejs"),
    alertError              : require("ejs!" + __dirname + "/../../layouts/ordersections/alert-error.ejs"),
};

var CustomfieldSDK = {
    render: {
        textfield: function (element, customfielddata, callback){
            switch (customfielddata.fieldname){
                case "IP":
                    element.find('.section-customfields')
                        .append(__layouts.customfields_ipaddr({
                            fieldname: customfielddata.fieldname +' Server',
                            description: customfielddata.description,
                            id: customfielddata.id,
                            value: customfielddata.value,
                            required: customfielddata.required
                        }))
                        .promise().then(function () {
                        CustomfieldSDK.event.submitIpAddress();
                        // callback();
                    });
                    break;
                case "Directory":
                    element.find('.section-customfields')
                        .append(__layouts.customfields_appsdir({
                            fieldname: customfielddata.fieldname,
                            description: customfielddata.description,
                            id: customfielddata.id,
                            value: customfielddata.value,
                            required: customfielddata.required
                        }))
                        .promise().then(function () {
                        CustomfieldSDK.event.submitCustomFieldsAppsDir(element,customfielddata);
                        // callback();
                    });
                    break;
                default:
                    element.find('.section-customfields')
                        .append(__layouts.customfields_text({
                            fieldname: customfielddata.fieldname.split('|').pop(),
                            description: customfielddata.description,
                            id: customfielddata.id,
                            value: customfielddata.value,
                            required: customfielddata.required
                        }))
                        .promise().then(function () {
                            CustomfieldSDK.event.submitCustomFields(element,customfielddata);
                        // CartsSDK.events.updateCustomFields(customfielddata)
                        // callback();
                    });
            }

        },
        dropdownfield: function (element, customfielddata, callback){
            customfielddata.fieldoptions = customfielddata.fieldoptions.split(",");
            switch (customfielddata.fieldname){
                case "Script":
                    var AppsConfig      = window.__orderconfigs.default_installerhostingapps;
                    customfielddata.AppsConfig  = AppsConfig;
                    CustomfieldSDK.render.apps_templates(element, customfielddata, callback);
                    CustomfieldSDK.utils.filterApps(element);
                    break;
                default:
                    // console.log("Default");
                    break;
            }
        },
        thickboxfield: function (element, customfielddata, callback){
            customfielddata.ishidden =
                !CustomfieldSDK.utils.is_apps_related_checked(element, customfielddata.related_apps);
            element.find('.section-customfields')
                .append(__layouts.customfields_thickbox(customfielddata))
                .promise().then(function () {
                // callback();
            });
        },
        apps_templates: function (element, customfielddata, callback){
            customfielddata.countoptions = customfielddata.fieldoptions.length;
            customfielddata.collumnlength = 6;
            if(customfielddata.countoptions>2)customfielddata.collumnlength=6;
            element.find('.section-customfields')
                .append(__layouts.customfields_apps(customfielddata))
                .promise().then(function () {
            });
        },
    },
    event:{
        submitCustomFields: function (elements,customfielddata) {
            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('keyup keypress', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
                var value = $(this).val();
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                CartsSDK.events.updateCustomFields(index, id, value);
            });
            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('change', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
                var value = $(this).val();
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                CartsSDK.events.updateCustomFields(index, id, value);
            });
        },
        submitCustomFieldsAppsDir: function (elements,customfielddata) {
            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('keyup keypress', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
                var value = $(this).val();
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                CartsSDK.events.updateCustomFields(index, id, value);
            });
            elements.find("input[name='customfields["+customfielddata.id+"]']").off().on('change', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }
                var value = $(this).val();
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                CartsSDK.events.updateCustomFields(index, id, value);
            });
        },
        submitIpAddress: function () {
            $("input[name='ip_address']").off().on('keyup keypress', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }

                var value = $(this).val();
                var validation = CustomfieldSDK.utils.regexIpAddress(value);
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                var ip = "";
                if (validation) {
                    var ip = value
                }

                CartsSDK.events.updateCustomFields(index, id, ip)
            })

            $("input[name='ip_address']").off().on('change', function (event) {
                if ((event.which != 46) && (event.which < 48 || event.which > 57)) {
                    event.preventDefault();
                }

                var value = $(this).val()
                var validation = CustomfieldSDK.utils.regexIpAddress(value);
                var index = $(this).parents('.panel').attr('data-index');
                var id = $(this).attr('data-customfieldId');

                var ip = "";
                if (validation) {
                    var ip = value

                    // Remove alert
                    $(this).parents(".config_text").find(".alert").remove()
                } else {
                    var message = "Form di bawah ini harus format IP sob!"

                    if (value == "") {
                        message =  "Form harus diisi sob!"
                    }

                    var section = $(this).parents(".config_text")
                    section.find(".alert").remove()
                    section.prepend(__layouts.alertError({
                        message: message
                    }))

                }

                CartsSDK.events.updateCustomFields(index, id, ip)
            })
        },
    },
    utils:{
        is_apps_related_checked: function (element, related_apps){
            var template_apps = element.find("input[name='template_hotsing_apps']").val();
            if(template_apps==related_apps){
                return  true;
            }
            return false;
        },
        filterApps:function(element){
            (function ($) {

                jQuery.expr[':'].containsi = function(a,i,m){
                    return jQuery(a).attr('data-appsdetail').toUpperCase().indexOf(m[3].toUpperCase())>=0;
                };

                $.fn.filterApps = function () {

                    var o = arguments[0] || {},
                        p = {
                            handle: 'input[rel="filter"]',
                            callback: function () {},
                            caseSensitive: true
                        };

                    $.extend(p,o);

                    var filter = function (event, value) {
                        $('.target_filter',this).show();
                        if (value) $('.target_filter:not('+((p.caseSensitive&&':contains')||':containsi')+'('+value+'))',this).hide();
                        p.callback.call(this, value);
                    };

                    var clear = function (event) {
                        $(this).trigger('filter');
                    }

                    return this.each(function (i,n) {
                        $(n).bind('filter', filter).bind('clear', clear);
                        $(p.handle).bind('keyup.filter', function (event) {
                            $(n).trigger('filter', [$(this).val()]);
                        });
                    });
                };
            })(jQuery);
            $(element).find('#template-hosting').filterApps({ caseSensitive: false });
            $(element).find('#select-filter-apps').on('change',function(){
                var selectedtext = $(element).find('#select-filter-apps').find(":selected").val();
                $(element).find('.filter-apps-search-input').val(selectedtext).trigger('keyup.filter');
            })
        },
        chooseApps:function (element){
            element.find('#template-hosting .template').on('click', function (e){
               if(!$(this).hasClass('checked')){
                   element.find('#template-hosting .template').removeClass('checked');
                   $(this).addClass('checked');
               }
               var choosen_apps = $(this).attr('aria-valuetext');
               var customfieldid = $(this).attr('data-customfieldId');
               if(choosen_apps=="None"){
                   element.find('.apps_dir').val('');
                   element.find('.apps_dir_container').hide();
               }else{
                   element.find('.apps_dir_container').show();
               }
               element.find('input[name="template_hotsing_apps"]').val(choosen_apps);
               CustomfieldSDK.utils.updateAppsCart(element,customfieldid, choosen_apps);
               CustomfieldSDK.utils.showAppsAddons(element, choosen_apps);
               CustomfieldSDK.utils.autoChooseAppsaddons(element, choosen_apps);
            });
        },
        showAppsAddons: function (element, choosen_apps){
            element.find('.hosting_apps_addon').hide();
            element.find('.hosting_apps_addon[aria-hosting-apps="'+choosen_apps+'"]').show();
        },
        chooseAppsAddons: function (element){
            element.find('.hosting_apps_addon input[type="checkbox"]').on('change', function (e){
                var customfieldid = $(this).attr('data-customfieldId');
                var customfieldvalue = $(this).is(':checked');
                if(customfieldvalue){
                    customfieldvalue = "on";
                }
                CustomfieldSDK.utils.updateCart(element, customfieldid, customfieldvalue);
            });
        },
        updateCart: function (element, customfieldid, value){
            var index = element.attr('data-index');
            CartsSDK.events.updateCustomFields(index, customfieldid, value);
        },
        updateAppsCart: function (element, customfieldid, value){
            var index = element.attr('data-index');
            if(value=="None"){
                CartsSDK.events.removeCustomfieldValueExept(index, value);
            }
            CartsSDK.events.updateCustomFields(index, customfieldid, value)
        },
        autoChooseApps: function (element, apps){
            if(CustomfieldSDK.utils.is_apps_related_checked(element, "")){
                element.find('#template-hosting .template[aria-valuetext="'+apps+'"]')
                    .trigger('click');
                element.find('.hosting_apps_addon[aria-hosting-apps="'+apps+'"] input[type="checkbox"]')
                    .trigger('click');
            }
        },
        autoChooseAppsaddons: function (element, apps){
            var apps_addons = element.find('.hosting_apps_addon[aria-hosting-apps="'+apps+'"] input[type="checkbox"]');
            apps_addons.removeAttr('checked');
            CustomfieldSDK.utils.autoChooseApps(element, apps);
        },
        regexIpAddress: function (ip) {
            var patt = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g
            var res = patt.test(ip);

            if (!res) {
                return false
            }

            return true
        }
    }
};
module.exports = CustomfieldSDK;