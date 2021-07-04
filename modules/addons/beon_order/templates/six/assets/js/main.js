/**
 * Created by agam on 22/05/17.
 */
window.onload=function () {
    var script = document.createElement('script');
    script.src = '/modules/addons/beon_order/templates/six/assets/js/beon_order.js';
    console.log(script.src);
    document.getElementsByTagName('body')[0].appendChild(script);

    var css = document.createElement('link');
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = '/modules/addons/beon_order/templates/six/assets/css/beon_order.css';
    css.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(css);
};
