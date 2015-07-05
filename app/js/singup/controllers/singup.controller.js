(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .controller('SingupController', SingupController);

    function SingupController($log) { 
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
    }
})();
