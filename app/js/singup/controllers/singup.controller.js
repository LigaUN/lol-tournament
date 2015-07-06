(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .controller('SingupController', SingupController);

    function SingupController($log, $timeout, Summoner) {
        var vm = this;

        vm.getSummoner = getSummoner;
        vm.summonersForm = [
            {
                profileIconId: 657
            },
            {
                profileIconId: 658
            },
            {
                profileIconId: 659
            },
            {
                profileIconId: 660
            },
            {
                profileIconId: 661
            }
        ];

        function getSummoner (summoner, index){
            Summoner.get(summoner).then(function(data){
                vm.summonersForm[index].data = data;
                Summoner.getLeague(data.id)
                .then(function(data){
                    vm.summonersForm[index].data.league = data;
                })
                .catch(function(data){
                    if(data.status === 404){
                        vm.summonersForm[index].data.league = 'unranked';
                    }
                });
            });
        }
    }
})();
