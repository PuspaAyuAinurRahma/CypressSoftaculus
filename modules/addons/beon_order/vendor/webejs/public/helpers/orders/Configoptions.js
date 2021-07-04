var CartsSDK = require(__dirname+"/Carts.js");
var ServicesSDK = require(__dirname+"/Services.js");


var __layouts ={
    configoptions_header       : require("ejs!" + __dirname + "/../../layouts/ordersections/configoptions/header.ejs"),
    type_slider                : require("ejs!" + __dirname + "/../../layouts/ordersections/configoptions/type_slider.ejs"),
    type_counter               : require("ejs!" + __dirname + "/../../layouts/ordersections/configoptions/type_counter.ejs"),
};

var ConfigoptionSDK = {
    render: {
        header: function (element) {
            if (element.find('.configoption_header').length) {
            } else {
                element.find('.section-configoptions').append(__layouts.configoptions_header());
            }
        },
        option_slider: function (element,configoption){
            var step = 1;
            if(configoption.max > 100)step=10;
            if(configoption.optioncode == 'quota')step=10;
            element.find('.section-configoptions').append(__layouts.type_slider(configoption))
                .promise()
                .then(function () {
                    $(".js-range-slider").ionRangeSlider({
                        min: configoption.min,
                        max: configoption.max,
                        grid: false,
                        step: step,
                        from: configoption.value,
                        hide_min_max:true,
                        hide_from_to:true,
                        skin: "round",
                        onChange: function (data){
                            var configoptionid = data.input.attr('data-configoption');
                            ConfigoptionSDK.utils.slideConfig(element, configoptionid, data.from);
                        }
                    });
                });
        },
        option_quantities: function (element, products, configoption){
            // console.log('Rendering Something');
            var optionname = "Quantity";
            var id = configoption.id;
            var min = 0;
            var max = 100;
            var value = 1;
            products.config.find(function (config) {
                if (config.id != configoption.id) {
                    return
                }
                optionname = config.optionname;
                min = config.qtyminimum;
                max = config.qtymaximum;
                value = configoption.selectedqty;
            });
            if(configoption.is_slider){
                ConfigoptionSDK.render.option_slider(element, {
                    optionname: optionname,
                    id: id,
                    min: min,
                    max: max,
                    value: value,
                    optioncode: configoption.optioncode,
                    optionlabel: configoption.optionlabel,
                    selectedqty: configoption.selectedqty
                });
            }else{
                element.find('.section-configoptions').append(__layouts.type_counter({
                    optionname: optionname,
                    id: id,
                    min: min,
                    max: max,
                    value: value,
                })).promise()
                    .then(function () {
                        ServicesSDK.events.counterButtonChange();
                        ServicesSDK.events.disableInputSpecial(element)
                    });
            }
        }
    },
    utils: {
        slideConfig: function (element, configoptionid, value){
            var index = element.attr('data-index');
            CartsSDK.events.updateConfigOptionsType4(index, configoptionid, value);
            element.find('.spec-slider-container')
                .find('label[for="configoption['+configoptionid+']"]')
                .find(".configoption-value")
                .html(value);
        }
    }
};
module.exports = ConfigoptionSDK;