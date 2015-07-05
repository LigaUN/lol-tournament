(function(){
    'use strict';

    angular
        .module('lolTot.singup', [])
        .config(config)
        .run(run);

    function config() {

    }

    function run($log) {
        $log.debug('load core module');
    }
})();
