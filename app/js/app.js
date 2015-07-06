(function(){
    'use strict';

    angular
        .module('lolTot', [
            'lolTot.core', 'lolTot.singup',

            'ngMaterial'
        ])
        .config(config)
        .run(run);

    function config($httpProvider, $logProvider, $mdThemingProvider, $mdIconProvider){

        $httpProvider.interceptors.push('interceptor');

        $logProvider.debugEnabled(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue-grey')
            .warnPalette('red')
            .backgroundPalette('blue-grey');
    }

    function run($log) {
        $log.info('It\'s running');
    }

})();
