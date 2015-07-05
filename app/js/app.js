(function(){
    'use strict';

    angular
        .module('lolTot', [
            'lolTot.core', 'lolTot.singup',

            'ngMaterial'
        ])
        .config(config)
        .run(run);

    function config(){

    }

    function run($log) {
        $log.info('It\'s running');
    }

})();
