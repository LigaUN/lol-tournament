(function(){
    'use strict';

    angular
        .module('lolTot', [])
        .config(config)
        .run(run);

    function config(){

    }

    function run($log) {
        $log.info('Its running');
    }

})();
