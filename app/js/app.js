(function(){
    'use strict';

    angular
        .module('lolTot', [
            'lolTot.core', 'lolTot.singup',

            'ngMaterial'
        ])
        .config(config)
        .run(run);

    function config($mdThemingProvider, $mdIconProvider){
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue')
            .warnPalette('red')
            .backgroundPalette('blue-grey');
    }

    function run($log) {
        $log.info('It\'s running');
    }

})();
