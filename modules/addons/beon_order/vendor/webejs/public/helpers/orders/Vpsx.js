var Orderconfigs = require(__dirname + "/../../config/const.js");
var CartsSDK = require(__dirname+"/Carts.js");
var ApiHelper = require(__dirname + "/../api/api.js");

var __layouts = {
    main: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/main.ejs"),
    region: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/region.ejs"),
    ip: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/ip.ejs"),
    step_advance_vps: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/step-advance-vps.ejs"),
    content_pilih_xcube: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-pilih-xcube.ejs"),
    content_aio: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-aio.ejs"),
    content_ospanel: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-ospanel.ejs"),
    content_os_only: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-os.ejs"),
    content_konfigurasi: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-konfigurasi.ejs"),
    content_hostname: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/content-hostname.ejs"),
    information_konfigurasi: require("ejs!" + __dirname + "/../../layouts/ordersections/vpsx/informasi-konfigurasi.ejs"),
}

var VpsxSDK = {
    render: {
        formPanels: function (index, data) {
            var ServicesSDK = require(__dirname+"/Services.js")

            $('#order-forms-wrapper').append(__layouts.main({
                    groupname: data.groupname,
                    pid: data.pid,
                    index: index,
                    minimize: data.minimize
                }
            )).promise().then(function () {
                var element = $(this).find('.panel').last()

                ServicesSDK.render.pilihpaket(element, data);
                ServicesSDK.render.pilihbilling(element, data);
                ServicesSDK.render.sectionUpsale(element, data);
                ServicesSDK.render.sectionPenawaran(element, data);
                // VpsxSDK.render.region(element, data);
                VpsxSDK.render.ip(element, data);
                VpsxSDK.render.step_advance_vps(element, data, index)
                ServicesSDK.render.minimizeSection(index)
                ServicesSDK.events.removeProduct();
                ServicesSDK.events.minimizePanel();
                ServicesSDK.events.maximizePanel();

                if (data.crosssaleparent == 0) {
                    ServicesSDK.events.masterCrossSale(index, data.pid)
                }else {
                    element.find('.section-area-footer').html(__layouts.btn_SimpanCrossSales)
                    ServicesSDK.events.simpanCrossSale()
                }
            });
        },
        region: function (element, data) {
            var pid = data.pid;
            var config = {}
            Orderconfigs.products[pid].config.forEach(function (value) {
                if (value.optionname.toLowerCase() != "region") {
                    return
                }

                config = value
            })

            element.find('.section-region').html(__layouts.region({
                selected: data.configoptions.region,
                configs: config
            }
            ))
                .promise()
                .then(function () {
                    VpsxSDK.events.changeRegion()
                });
        },
        ip: function (element, data) {
            element.find('.section-ip').html(__layouts.ip({
                // selected: data.configoptions.ip_public
            }
            ))
                .promise()
                .then(function () {
                    // VpsxSDK.events.toggleIpPublic();
                });
        },
        step_advance_vps: function (element, data, index) {
            element.find('.section-konfigurasi').append(__layouts.step_advance_vps({
                    template : data.template,
                    hostname: data.credentials.hostname,
                    password: data.credentials.password,
                    index: index
                }
            ))
                .promise()
                .then(function () {
                    VpsxSDK.render.content_xcube(element, data, index)
                    VpsxSDK.render.content_konfigurasi(element, data, index)
                    VpsxSDK.render.informasi_konfigurasi(element, data)
                    VpsxSDK.render.content_hostname(element, data, index)

                    VpsxSDK.events.nextConfiguration();
                    VpsxSDK.events.backConfiguration();
                    VpsxSDK.events.finishConfiguration();
                    VpsxSDK.events.checkResumePembelian(element, data);
                });
        },
        content_xcube: function (element, data, index) {
            var getImage = VpsxSDK.utils.getImage(data.pid)
            var selectedImage = VpsxSDK.utils.selectedTemplate(data.pid, data.template)

            var template = {
                images: getImage,
                selected: selectedImage
            }

            element.find('.content-template').append(__layouts.content_pilih_xcube({
                    id: index,
                    selected: selectedImage
                }
            ))
                .promise()
                .then(function () {
                    VpsxSDK.render.content_aio(element, template, index)
                    VpsxSDK.render.content_ospanel(element, template, index)
                    VpsxSDK.render.content_os(element, template, index)
                    VpsxSDK.events.changeTemplate();
                });
        },
        content_aio: function (element, data, index) {
            element.find("#aio-"+index).html(__layouts.content_aio({
                images: data.images,
                selected: data.selected,
                id: index
            }))
        },
        content_ospanel: function (element, data, index) {
            element.find("#ospanel-"+index).html(__layouts.content_ospanel({
                images: data.images,
                selected: data.selected,
                id: index,
            })).promise()
                .then(function () {
                    VpsxSDK.events.changeOsInTemplate()
                })
        },
        content_os: function (element, data, index) {
            element.find("#os-"+index).html(__layouts.content_os_only({
                images: data.images,
                selected: data.selected,
                id: index,
            })).promise()
                .then(function () {
                    VpsxSDK.events.changeOsVersion()
                })
        },
        content_konfigurasi: function (element, data, index) {
            if (!data.template) {
                element.find("#content-konfigurasi").html("")
                return;
            }

            var name = "";
            switch (data.template.type) {
                case "aio":
                    name = data.template.apps
                    break
                case "ospanel":
                    name = data.template.panel
                    break;
            }

            var form = VpsxSDK.static.configuration_form(name);
            if (!form) {
                element.find("#content-konfigurasi").html("")
                return
            }

            if (data.template.config) {
                var savedValue = data.template.config

                form['no_header'].forEach(function (value) {
                    savedValue.forEach(function (newValue) {
                        if (value.name == newValue.name) {
                            value.default_value = newValue['value']
                        }
                    })
                })

                form['admin_account'].forEach(function (value) {
                    savedValue.forEach(function (newValue) {
                        if (value.name == newValue.name) {
                            value.default_value = newValue['value']
                        }
                    })
                })

                form['database_setting'].forEach(function (value) {
                    savedValue.forEach(function (newValue) {
                        if (value.name == newValue.name) {
                            value.default_value = newValue['value']
                        }
                    })
                })
            }

            element.find("#content-konfigurasi").html(__layouts.content_konfigurasi({
                forms: form,
                index: index,
            })).promise()
                .then(function () {
                    VpsxSDK.utils.validatePassword(index)
                    VpsxSDK.utils.validateDomain(index)
                    VpsxSDK.utils.validateEmail(index)
                    VpsxSDK.utils.validateNoSpace(index)
                    VpsxSDK.utils.validateName(index)
                })
        },
        informasi_konfigurasi: function (element, data) {
            element.find("#info-konfigurasi").html(__layouts.information_konfigurasi({
                hostname: data.credentials.hostname,
                password: data.credentials.password,
                type: data.template.type,
                os: data.template.osName,
                template: data.template,
            })).promise()
                .then(function () {
                    VpsxSDK.events.togglePasswordInformation();
                    VpsxSDK.events.suntingKonfigurasi();
                })
        },
        content_hostname: function (element, data, index) {
            element.find("#content-hostname").html(__layouts.content_hostname({
                credentials: data.credentials
            })).promise()
                .then(function () {
                    VpsxSDK.utils.validatePasswordCredential(index)
                    VpsxSDK.utils.validateHostname(index);
                })
        },
    },
    events: {
        changeRegion: function () {
            $('.region').off().on('click', function (e) {
                var configid = $(this).attr('data-configid');
                var region = $(this).attr('data-region');
                var panel = $(this).parents(".panel");
                var index = panel.attr("data-index")

                panel.find('.region.checked').removeClass('checked');
                $(this).addClass('checked');

                CartsSDK.vpsx_events.changeConfigType1(index, configid, region);
            })
        },
        toggleIpPublic: function () {
            $("input[name='ip-public']").off().on('change', function () {
                var index = $(this).parents(".panel").attr("data-index")
                var checkbox = $(this).parents('.checkbox-ip')
                var checked = true;

                if (checkbox.hasClass('checked')) {
                    checkbox.removeClass('checked')
                    checked = false
                } else {
                    checkbox.addClass('checked')
                }

                CartsSDK.vpsx_events.changeStatusIpPublic(index, checked)
            })
        },
        changeTemplate: function () {
            $('.template').off().on('click', function () {
                var index = $(this).parents('.panel').attr('data-index');
                var panel = $(this).parents('.tab-content');
                var previous_template = panel.find('.template.checked');
                var type = $(this).attr('data-type')
                var configid = $(this).attr('data-template')
                var valueText = $(this).attr('aria-valuetext')

                previous_template.removeClass('checked');
                previous_template.find('.detail-class').addClass('none');

                $(this).addClass('checked');
                $(this).find('.detail-class').removeClass('none');

                var dataTemplate = {
                    "type": type,
                    "configid": configid
                }
                switch (type) {
                    case "aio":
                        dataTemplate.apps = valueText
                        dataTemplate.osName = $(this).attr('aria-hidden')
                        break;
                    case "ospanel":
                        dataTemplate.panel = valueText
                        dataTemplate.osName = $(this).find('select option:selected').text()
                        break
                    case "os_only":
                        dataTemplate.configid = $(this).find('select[name="osOptions"]').val()
                        dataTemplate.os = configid
                        dataTemplate.osName = configid + ' ' + $(this).find('select option:selected').text()
                        dataTemplate.bit = $(this).parents('.template-container').attr('data-bit')
                        break;
                }
                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)

                // Replace Config
                var element = $(this).parents('.panel')
                var data = CartsSDK.vpsx_events.getCartByIndex(index)
                VpsxSDK.render.content_konfigurasi(element, data, index)

                // Check button yang tampil
                var name = "";
                switch (data.template.type) {
                    case "aio":
                        name = data.template.apps
                        break
                    case "ospanel":
                        name = data.template.panel
                        break;
                }

                var configs = VpsxSDK.static.configuration_form(name);
                var section = $(this).parents('.section-konfigurasi')
                VpsxSDK.events.hideButtonConfig(section, "next-configuration")
                VpsxSDK.events.hideButtonConfig(section, "finish-configuration")

                if (configs) {
                    VpsxSDK.events.showButtonConfig(section, "next-configuration")
                } else {
                    VpsxSDK.events.showButtonConfig(section, "finish-configuration")
                }

                // Hide alert x-cube
                element.find('.alert-config').addClass('hidden')
            })
        },
        changeOsInTemplate: function () {
            $("select[name='osPanelOptions']").off().on('change', function () {
                var pid = $(this).val()
                var panel = $(this).parents('.template.checked')
                var panelName = panel.attr('aria-valuetext')
                var index = $(this).parents('.panel').attr('data-index');
                var osName = $(this).find('option:selected').text();

                var dataTemplate = {
                    "type": "ospanel",
                    "configid": pid,
                    "panel": panelName,
                    "osName": osName,
                }

                panel.attr('data-template', pid)

                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)
            })
        },
        changeOsVersion: function () {
            $("select[name='osOptions']").off().on('change', function () {
                var pid = $(this).val()
                var panel = $(this).parents('.template.checked')
                var bit = panel.parents('.template-container').attr('data-bit');
                var os = panel.attr('aria-valuetext')
                var osName = panel.attr('aria-valuetext') + ' ' + $(this).find('option:selected').text()
                var index = $(this).parents('.panel').attr('data-index');
                var dataTemplate = {
                    "type": "os",
                    "configid": pid,
                    "os": os,
                    "osName": osName,
                    "bit": bit
                }

                CartsSDK.vpsx_events.changeTemplate(index, dataTemplate)
            })
        },
        nextConfiguration: function () {
            $("button[name='next-configuration']").off().on('click', function () {
                var configuration = $(this).parents('.row').prev()
                var indicator = configuration.prev().find('.progressbar');
                var previous_wrapper = configuration.find('.col-md-12.active')
                var next_wrapper = previous_wrapper.next()
                var next_step = next_wrapper.attr('data-step')
                var nextButton = $(this);
                var backButton = $(this).parents('.row').find("button[name='back-configuration']")
                var finishButton = $(this).parents('.row').find("button[name='finish-configuration']")
                var index = $(this).parents('.panel').attr("data-index")
                var form = $(this).parents('.section-konfigurasi').find("form[name='configuration-"+ index +"']");
                var panel = $(this).parents('.panel')

                previous_wrapper.removeClass('active');
                previous_wrapper.addClass('hidden')
                next_wrapper.removeClass('hidden')
                next_wrapper.addClass('active')

                indicator.find("li[data-step='"+next_step+"']").addClass('active');

                switch (next_step) {
                    case "1":
                        nextButton.removeClass('hidden')
                        backButton.addClass('hidden')
                        break;
                    case "2":
                        backButton.removeClass('hidden')
                        backButton.html('< Hostname')
                        nextButton.addClass('hidden')
                        nextButton.html('Konfigurasi >')
                        finishButton.addClass('hidden')

                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

                        var name = "";
                        switch (data.template.type) {
                            case "aio":
                                name = data.template.apps
                                break
                            case "ospanel":
                                name = data.template.panel
                                break;
                        }

                        var configs = VpsxSDK.static.configuration_form(name);
                        if (configs) {
                            nextButton.removeClass('hidden')
                        }
                        if (Object.keys(data.template).length > 0 && data.template.constructor === Object && !configs) {
                            finishButton.removeClass('hidden')
                        }

                        break;
                    case "3":
                        backButton.removeClass('hidden')
                        backButton.html('< Pilih X-Cube')
                        nextButton.addClass('hidden')
                        finishButton.addClass('hidden');

                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

                        var name = "";
                        switch (data.template.type) {
                            case "aio":
                                name = data.template.apps
                                break
                            case "ospanel":
                                name = data.template.panel
                                break;
                        }

                        VpsxSDK.events.checkValidationForm(form)

                        if ("config" in data.template) {
                            if (data.template.isComplete == 1) {
                                finishButton.click()
                            } else {
                                panel.find(".content-konfigurasi").removeClass('hidden')
                                panel.find("#info-konfigurasi").addClass("hidden")
                            }
                        } else {
                            panel.find(".content-konfigurasi").removeClass('hidden')
                            panel.find("#info-konfigurasi").addClass("hidden")
                        }

                        var configs = VpsxSDK.static.configuration_form(name);
                        if (!configs) {
                            finishButton.click();
                        }
                        break;
                }
            })
        },
        finishConfiguration: function () {
            $("button[name='finish-configuration']").off().on('click', function () {
                var index = $(this).parents('.panel').attr("data-index")
                var data = CartsSDK.vpsx_events.getCartByIndex(index)
                var nextButton = $(this).parents('.row').find("button[name='next-configuration']")
                var backButton = $(this).parents('.row').find("button[name='back-configuration']")
                var panel = $(this).parents('.panel');
                var form = $(this).parents('.section-konfigurasi').find("form[name='configuration-"+ index +"']");

                VpsxSDK.render.informasi_konfigurasi(panel, data)
                CartsSDK.vpsx_events.toggleRingkasanConfig(index, true)

                // Show informasi konfigurasi
                panel.find("#info-konfigurasi").removeClass("hidden")

                $(this).addClass('hidden');
                backButton.addClass('hidden')

                var name = "";
                switch (data.template.type) {
                    case "aio":
                        name = data.template.apps
                        break
                    case "ospanel":
                        name = data.template.panel
                        break;
                }

                var configs = VpsxSDK.static.configuration_form(name);
                if (!configs) {
                    nextButton.click();
                } else {
                    var arrForm = form.serializeArray()
                    CartsSDK.vpsx_events.saveConfigurationApps(index, arrForm)

                    panel.find(".content-konfigurasi").addClass('hidden')
                }
            })
        },
        backConfiguration: function () {
            $("button[name='back-configuration']").off().on('click', function () {
                var configuration = $(this).parents('.row').prev()
                var indicator = configuration.prev().find('.progressbar');
                var elCurrent_step = indicator.find('li.active').last()
                var current_step = parseInt(elCurrent_step.attr('data-step'))
                var goToStep = indicator.find("li[data-step='"+ (current_step - 1)+"']")
                var index = $(this).parents('.panel').attr("data-index")

                elCurrent_step.removeClass('active')
                configuration.find("[data-step='"+ current_step +"']").removeClass('active').addClass('hidden')
                configuration.find("[data-step='"+ (current_step - 1) +"']").removeClass('hidden').addClass('active')

                var backButton = $(this);
                var nextButton = $(this).parents('.row').find("button[name='next-configuration']")
                var finishButton = $(this).parents('.row').find("button[name='finish-configuration']")

                var step = (current_step - 1)

                switch (step) {
                    case 1:
                        nextButton.removeClass('hidden')
                        nextButton.html('Pilih X-Cube >')
                        backButton.addClass('hidden')
                        finishButton.addClass('hidden')
                        break;
                    case 2:
                        backButton.removeClass('hidden')
                        backButton.html('< Hostname')
                        nextButton.html('Konfigurasi >')
                        finishButton.addClass('hidden')
                        nextButton.addClass('hidden')

                        var data = CartsSDK.vpsx_events.getCartByIndex(index)

                        var name = "";
                        switch (data.template.type) {
                            case "aio":
                                name = data.template.apps
                                break
                            case "ospanel":
                                name = data.template.panel
                                break;
                        }

                        var configs = VpsxSDK.static.configuration_form(name);
                        if (!configs) {
                            finishButton.removeClass('hidden')
                        } else {
                            nextButton.removeClass('hidden')
                        }
                        break;
                    case 3:
                        backButton.removeClass('hidden')
                        backButton.html('< Pilih X-Cube')
                        nextButton.addClass('hidden')
                        break;
                }
            })
        },
        checkResumePembelian: function (element, data) {
            const nextButton = element.find('button[name=next-configuration]')
            const finishButton = element.find('button[name=next-configuration]')

            if (data.isShowResume) {
                nextButton.click()
                finishButton.click()
            }
        },
        changeValidateStatus: function (element, status) {
            element.attr("data-validation", status)
            var form = element.parents('form')

            // TODO :: If input not true
            if (!status) {
                var buttonNext = form.parents('.section-konfigurasi').find("button[name='next-configuration']")
                buttonNext.addClass('hidden')

                var panel = form.parents(".panel");
                var index = panel.attr("data-index")
                CartsSDK.vpsx_events.deleteConfigurationApps(index)
                return
            }

            VpsxSDK.events.checkValidationForm(form)
        },
        checkValidationForm: function (form) {
            var arrForm = form.serializeArray();
            var buttonFinish = form.parents('.section-konfigurasi').find("button[name='finish-configuration']")
            var panel = form.parents(".panel");
            var index = panel.attr("data-index")
            var status = true

            form.find('.row').each(function(index, element) {
                var input = $(this).find('input')
                var dataValidation = input.attr('data-validation');

                if (dataValidation == "false") {
                    status = false
                }
            })

            if (!status) {
                return
            }

            buttonFinish.removeClass('hidden')
        },
        hideButtonConfig: function (element, buttonName) {
            element.find("button[name='" + buttonName + "']").addClass('hidden')
        },
        showButtonConfig: function (element, buttonName) {
            element.find("button[name='" + buttonName + "']").removeClass('hidden')
        },
        togglePasswordInformation: function () {
            $(".toggle-password").off().on('click', function () {
                if ($(this).hasClass('fa-eye')){
                    $(this).removeClass('fa-eye').addClass('fa-eye-slash')
                    $(this).closest('table').find('.password-masking')
                        .html($(this).attr('data-password'))
                } else {
                    $(this).removeClass('fa-eye-slash').addClass('fa-eye')
                    $(this).closest('table').find('.password-masking')
                        .html('************')
                }
            })
        },
        suntingKonfigurasi: function () {
            $(".sunting-konfigurasi").off().on('click', function () {
                var index = $(this).parents('.panel').attr("data-index")
                var panel = $(this).parents('.panel')
                var backButton = panel.find("button[name='back-configuration']")

                var data = CartsSDK.vpsx_events.getCartByIndex(index)

                var name = "";
                switch (data.template.type) {
                    case "aio":
                        name = data.template.apps
                        break
                    case "ospanel":
                        name = data.template.panel
                        break;
                }

                var configs = VpsxSDK.static.configuration_form(name);
                if (configs) {
                    CartsSDK.vpsx_events.toggleConfigAppsVisibility(index, 0)
                    panel.find('.content-konfigurasi').removeClass('hidden')
                    panel.find('#info-konfigurasi').addClass('hidden')
                }

                CartsSDK.vpsx_events.toggleRingkasanConfig(index, false)

                for (let i = 1; i < 3; i++) {
                    backButton.click()
                }
            })
        }
    },
    utils: {
        getImage: function (pid) {
            var configs = []
            var result = {
                "os_only" : {
                    "x64" : [],
                    "x32" : [],
                },
                "os_panel" : {},
                "all_in_one" : []
            };

            Orderconfigs.products[pid].config.forEach(function (value) {
                if (value.optionname.toLowerCase() != "image") {
                    return
                }
                configs = value.options
            })
            
            configs.forEach(function (value) {
                var arr = value.name.split("|")
                var subResult = {};

                subResult.configid = value.id;
                subResult.id = arr[0]

                subResult.distro = arr[2]
                subResult.osversion = arr[3]
                subResult.bit = arr[4]
                subResult.panel = arr[5] ? arr[5] : "-"
                subResult.apps = arr[6] ? arr[6] : "-"
                subResult.link = Orderconfigs.vpsx_link_tutorial[arr[0]] ? Orderconfigs.vpsx_link_tutorial[arr[0]] : null

                switch (arr[1]) {
                    case "OS Only":
                        var bit = "x" + subResult.bit
                        if (subResult.distro in result['os_only'][bit]) {
                            result['os_only'][bit][subResult.distro].push(subResult)
                        } else {
                            result['os_only'][bit][subResult.distro] = [subResult]
                        }
                        break;
                    case "OS Template":
                        if (subResult.panel in result['os_panel']) {
                            result['os_panel'][subResult.panel].push(subResult)
                        } else {
                            result['os_panel'][subResult.panel] = [subResult]
                        }
                        break;
                    case "All in one":
                        result['all_in_one'].push(subResult)
                        break;
                }
            })

            return result
        },
        selectedTemplate: function (pid, template) {
            var type = template.type
            var configid = template.configid
            var listTemplates = VpsxSDK.utils.getImage(pid);

            switch(type) {
                case "ospanel":
                    template.indexPanel = listTemplates['os_panel'][template.panel]
                        .findIndex(x => x.configid == template.configid)
                    break
                case "os_only":
                    template.indexPanel = listTemplates['os_only'][template.bit][template.os]
                        .findIndex(x => x.configid == template.configid)
                    break
            }

            return template
        },
        validatePassword: function (index) {
            $("input.validate-password").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32 || e.keyCode == 58 || e.keyCode == 59 || e.keyCode == 34 || e.keyCode == 39) {
                    e.preventDefault()
                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return
                }

                var regexSchema = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,()<>-]).{8,}$/
                if (!regexSchema.test(value)) {
                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')

                VpsxSDK.events.changeValidateStatus($(this), true)
            })
        },
        validateDomain: function (index) {
            $("input.validate-domain").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32) {
                    e.preventDefault()
                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return
                }

                var regex = new RegExp("^[a-zA-Z0-9.-]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }

                if (this.selectionStart==0){
                    if(String.fromCharCode(e.which) == '.'){
                        event.preventDefault();
                        return false;
                    }
                }

                var regexSchema = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g
                if (!regexSchema.test(value)) {
                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')
                VpsxSDK.events.changeValidateStatus($(this), true)
            })
        },
        validateEmail: function (index) {
            $("input.validate-email").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32) {
                    e.preventDefault()
                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return
                }

                var regexSchema = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regexSchema.test(value.toLowerCase())) {
                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')

                VpsxSDK.events.changeValidateStatus($(this), true)
            })
        },
        validateNoSpace: function (index) {
            $("input.validate-nospace").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32) {
                    e.preventDefault()
                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return
                }

                if (value.length <= 8) {
                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')
                VpsxSDK.events.changeValidateStatus($(this), true)
            })
        },
        validateName: function (index) {
            $("input.validate-name").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                if (value.length <= 8) {
                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    VpsxSDK.events.changeValidateStatus($(this), false)
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')

                VpsxSDK.events.changeValidateStatus($(this), true)
            })
        },
        validateHostname: function (index) {
            $("input.validate-hostname").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32) {
                    e.preventDefault()
                    return
                }

                if (this.selectionStart==0){
                    if(String.fromCharCode(e.which) == '.'){
                        event.preventDefault();
                        return false;
                    }
                }

                VpsxSDK.events.hideButtonConfig($(this).parents(".panel"), "next-configuration")

                // Cannot use bad character
                var regex = new RegExp("^[a-zA-Z0-9.-]+$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }

                var regexSchema = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]?$/g;
                if (!regexSchema.test(value)) {
                    CartsSDK.vpsx_events.saveCredentials(index, "hostname", "")

                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    return;
                }

                var dot = value.match(/\./g).length;
                if (dot < 2) {
                    CartsSDK.vpsx_events.saveCredentials(index, "hostname", "")

                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')

                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')

                CartsSDK.vpsx_events.saveCredentials(index, "hostname", value)
            })
        },
        validatePasswordCredential: function (index) {
            $("input.validate-password-credentials").off().on('keypress keyup', function (e) {
                var value = $(this).val()
                var formGroup = $(this).parent()

                // Cannot use space
                if (e.keyCode == 32 || e.keyCode == 58 || e.keyCode == 59 || e.keyCode == 34 || e.keyCode == 39) {
                    e.preventDefault()
                    return
                }

                VpsxSDK.events.hideButtonConfig($(this).parents(".panel"), "next-configuration")

                var regexSchema = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,()<>-]).{8,}$/
                if (!regexSchema.test(value)) {
                    CartsSDK.vpsx_events.saveCredentials(index, "password", "")

                    formGroup.addClass('has-error')
                    formGroup.find('.help-block').removeClass('none')
                    return;
                }

                formGroup.removeClass('has-error')
                formGroup.find('.help-block').addClass('none')

                CartsSDK.vpsx_events.saveCredentials(index, "password", value)
            })
        },
    },
    static: {
        configuration_form: function (name) {
            var data = {
                "wordpress" : {
                    "no_header": [
                        {name: "wordpress_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "wordpress_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "wordpress_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "wordpress_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "wordpress_db_name", label: "Database Name", default_value: "wordpress_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "wordpress_db_user", label: "Database User", default_value: "wordpress_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "wordpress_db_pass", label: "Database Password", default_value: "WordpressPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "prestashop" : {
                    "no_header": [
                        {name: "prestashop_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "prestashop_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "prestashop_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "prestashop_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "prestashop_db_name", label: "Database Name", default_value: "prestashop_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "prestashop_db_user", label: "Database User", default_value: "prestashop_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "prestashop_db_pass", label: "Database Password", default_value: "PrestashopPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "joomla" : {
                    "no_header": [
                        {name: "joomla_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "joomla_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "joomla_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "joomla_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "joomla_db_name", label: "Database Name", default_value: "joomla_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "joomla_db_user", label: "Database User", default_value: "joomla_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "joomla_db_pass", label: "Database Password", default_value: "JoomlaPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "drupal" : {
                    "no_header": [
                        {name: "drupal_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "drupal_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "drupal_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "drupal_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "drupal_db_name", label: "Database Name", default_value: "drupal_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "drupal_db_user", label: "Database User", default_value: "drupal_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "drupal_db_pass", label: "Database Password", default_value: "DrupalPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "moodle" : {
                    "no_header": [
                        {name: "moodle_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "moodle_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "moodle_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "moodle_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "moodle_db_name", label: "Database Name", default_value: "moodle_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "moodle_db_user", label: "Database User", default_value: "moodle_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "moodle_db_pass", label: "Database Password", default_value: "MoodlePass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "opencart" : {
                    "no_header": [
                        {name: "opencart_blog_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "opencart_blog_admin_name", label: "Admin Name", default_value: "", validation: "validate-name", placeholder: "Masukkan nama administrator wordpress"},
                        {name: "opencart_blog_admin_email", label: "Admin Email", default_value: "", validation: "validate-email", placeholder: "Masukkan email administrator wordpress"},
                        {name: "opencart_blog_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "opencart_db_name", label: "Database Name", default_value: "opencart_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "opencart_db_user", label: "Database User", default_value: "opencart_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "opencart_db_pass", label: "Database Password", default_value: "OpencartPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
                "zyacbt" : {
                    "no_header": [
                        {name: "zyacbt_cbt_url", label: "Site Url", default_value: "", validation: "validate-domain", placeholder: "Masukkan nama domain"}
                    ],
                    "admin_account": [
                        {name: "zyacbt_cbt_admin_name", label: "Admin Username", default_value: "admin", validation: "validate-nospace", placeholder: "Masukkan username administrator"},
                        {name: "zyacbt_cbt_admin_pass", label: "Admin Password", default_value: "", validation: "validate-password", placeholder: "Contoh: b(WDrriun%U}5Pz"},
                    ],
                    "database_setting": [
                        {name: "zyacbt_db_name", label: "Database Name", default_value: "zya_db", validation: "validate-nospace", placeholder: "Masukkan nama database"},
                        {name: "zyacbt_db_user", label: "Database User", default_value: "zya_user", validation: "validate-nospace", placeholder: "Masukkan user database"},
                        {name: "zyacbt_db_pass", label: "Database Password", default_value: "ZyaCbtPass1234567890!", validation: "validate-password", placeholder: "Masukkan password database"},
                    ]
                },
            }

            return data[name]
        },
    }
}

module.exports = VpsxSDK;
