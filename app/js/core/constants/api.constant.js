(function(){
    'use strict';

    var apiRouter = {

            url: {
                protocol: 'https',
                host: 'na.api.pvp.net/api/lol/lan'
            },
            route: function(path){
                var url = this.url;
                return '{0}://{1}/{2}'.format(
                    url.protocol, url.host,path
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

        summonerByName: function(name){
            return apiRouter.route('v1.4/summoner/by-name/{0}'.format(name));
        }
    };

    angular
        .module('lolTot.core')
        .constant('api', api);
})();
