(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .controller('SingupController', SingupController);

    function SingupController(
        $log ,$timeout, leagues, maxPoints, _, Summoner, Mailchimp,
        $mdDialog
    ) {
        var vm = this;

        vm.getSummoner = getSummoner;
        vm.summoners =[];
        vm.mailchimp = {};
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

        vm.getTop = function(){
            return vm.summoners[4];
        };

        vm.validator = {
            maxPoints: maxPoints,
            noRepeat: function(){
                var isUndefined = 0;
                _.each(vm.summoners, function(summoner){
                    if(!summoner){
                        isUndefined++;
                    }
                });

                return (_.uniq(vm.summoners).length === 5) && !isUndefined ;
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

                return this.totalPoints() <= maxPoints;

            },
            all: function(){
                return this.noRepeat() && this.leaguePoints();
            }
        };

        vm.subscribeTeam = function(subscribe){
            subscribe.TOP = vm.summoners[0];
            subscribe.JUNGLE = vm.summoners[1];
            subscribe.MID = vm.summoners[2];
            subscribe.ADC = vm.summoners[3];
            subscribe.SUPPORT = vm.summoners[4];

            Mailchimp.send(subscribe).then(function(data){
                vm.mailchimp = data;
            });
        };

        vm.help = function($event){
            console.log('help');
            $mdDialog.show({
                controller: 'HelpController',
                controllerAs: 'vmd',
                templateUrl: 'views/singup/help.tpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
            });
        };

        function getSummoner (summoner, index){
            Summoner.get(summoner).then(function(data){
                Summoner.getLeague(data.id, true)
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
            }).catch(function(){
                if(vm.summonersForm[index] && vm.summonersForm[index].data){
                    delete vm.summonersForm[index].data;
                }
            });
        }
    }
})();
