(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .service('Summoner', Summoner)
        .value('apiKey', '2cbc298c-f2f8-4af2-b1df-2739b768cdef');

    function Summoner($http,api, apiKey) {

        this.get = function(summonerName){
            return $http({
                method: 'get',
                url: api.summonerByName(summonerName),
                params:{
                    'api_key': apiKey
                }
            }).then(function(response){
                return response.data;
            });
        };
    }
})();
