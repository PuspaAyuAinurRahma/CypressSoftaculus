var UrlReader = {
    splitUrl : function (callback) {
        var pathArray       = window.location.pathname.split('/');
        var urlquery        = window.location.search;
        var queriesString   = urlquery.replace('?','');
        queriesString       = queriesString.split('&');
        var queries         = {};
        queriesString.forEach(function (item, index) {
            var spliteditem = item.split('=');
            queries[spliteditem[0]] = spliteditem[1]
        });
        var response = {
            paths   : pathArray,
            queries : queries
        };
        callback(response);
    }
};

module.exports = UrlReader;