(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .service('Summoner', Summoner)
        .value('apiKey', '2cbc298c-f2f8-4af2-b1df-2739b768cdef');

    function Summoner($http,api, apiKey) {

        this.get = function(summoner){
            return $http({
                method: 'get',
                url: api.summonerByName(summoner),
                params:{
                    'api_key': apiKey
                }
            }).then(function(response){
                return response.data[summoner.replace(/\s/g, '').toLowerCase()];
            });
        };

        this.getLeague = function(summoner, dontNotify){
            return $http({
                method: 'get',
                url: api.summonerLeague(summoner),
                params:{
                    'api_key': apiKey
                },
                dontNotify: dontNotify
            }).then(function(response){
                return response.data[summoner];
            });
        };
    }
})();
