(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .controller('SingupController', SingupController);

    function SingupController($log, Summoner) {
        var vm = this;

        vm.summoners = [
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

        Summoner.get('Señor Galleto').then(function(data){
            console.log(data);
            vm.summoners[0].data = data['señorgalleto'];
        });
    }
})();
