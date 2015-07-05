(function(){
    'use strict';

    angular
        .module('ngBool', [])
        .config(config)
        .run(run);

    function config(){

    }

    function run($log) {
        $log.info('Its running');
    }

})();
