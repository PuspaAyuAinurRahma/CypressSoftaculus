var maintemplate = require("ejs!"+__dirname+"/../../layouts/main.ejs");
var MainLayout = {
    render: function (callback) {
        $('#main-body .main-content').find('.header-lined').remove();
        $('#order-main-content').html(maintemplate());
        callback();
    }
};
module.exports = MainLayout;