(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .service('Summoner', Summoner)
        .value('apiKey', 'c4701f07-8ef4-46c9-b3a8-d5b76bc22dd5');

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
