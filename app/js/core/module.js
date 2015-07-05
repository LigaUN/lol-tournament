(function(){
    'use strict';

    angular
        .module('lolTot.core', [])
        .config(config)
        .run(run);

    function config() {

    }

    function run($log) {
        $log.debug('load core module');
    }
})();
