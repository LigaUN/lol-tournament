(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .controller('SingupController', SingupController);

    function SingupController($log, $timeout, leagues, maxPoints, _, Summoner) {
        var vm = this;

        vm.getSummoner = getSummoner;
        vm.summoners =[];
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
        vm.validator = {
            noRepeat: function(){
                this.leaguePoints();
                return _.uniq(vm.summoners).length === 5;
            },
            totalPoints: function(){
                var totalPoints = 0;

                _.each(vm.summonersForm, function(summoner){
                    if(summoner.data && (summoner.data.summonerLevel < 30)){
                        totalPoints += leagues.noob;
                    }
                    else if(summoner.data && (summoner.data.league === 'unranked')){
                        totalPoints += leagues.unrank;
                    }
                    else if(summoner.data && summoner.data.league[0].tier){
                        var tier = summoner.data.league[0].tier.toLowerCase();
                        var division = summoner.data.league[0].entries[0].division.toLowerCase();

                        totalPoints += leagues[tier][division];
                    }

                    totalPoints += 0;
                });

                return totalPoints;
            },
            leaguePoints: function(){

                return(this.totalPoints() <= maxPoints);

            },
            all: function(){
                return this.noRepeat() && this.leaguePoints();
            }
        };

        function getSummoner (summoner, index){
            Summoner.get(summoner).then(function(data){
                Summoner.getLeague(data.id)
                .then(function(dataLeague){
                    data.league = dataLeague;
                    vm.summonersForm[index].data = data;
                    vm.summoners[index] = data.name;
                })
                .catch(function(error){
                    if(error.status === 404){
                        data.league = 'unranked';
                        vm.summonersForm[index].data = data;
                        vm.summoners[index] = data.name;
                    }
                });
            });
        }

        function ifArrayIsUnique(arr) {
            var map = {}, i, size;

            for (i = 0, size = arr.length; i < size; i++){
                if (map[arr[i]]){
                    return false;
                }

                map[arr[i]] = true;
            }

            return true;
        }
    }
})();
