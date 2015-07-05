(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .controller('SingupController', SingupController);

    function SingupController($log) {
        $log.log('SingupController');
    }
})();
