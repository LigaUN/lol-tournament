(function(){
    'use strict';

    angular
        .module('lolTot.singup', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider) {

        $stateProvider
            .state('singup', {
                url: '',
                templateUrl: 'views/singup/singup.tpl.html',
                controller: 'SingupController',
                controllerAs: 'vm'
            });
    }

    function run($log) {
        $log.debug('load core module');
    }
})();
