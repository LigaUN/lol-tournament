(function(){
    'use strict';

    var apiRouter = {

            url: {
                protocol: 'https',
                host: 'api.backendless.com'
            },
            route: function(path){
                var url = this.url;
                return '{0}://{1}/{2}/{3}'.format(
                    url.protocol, url.host, url.path, path
                );
            },
            id: function(url){
                var router = this;
                return function (id) {
                    return '{0}/{1}'.format(router.route(url), id);
                };
            }
    };

    var api = {
        // Root: Url id
        id: apiRouter.id,

    };

    angular
        .module('lolTot.core')
        .constant('api', api);
})();
