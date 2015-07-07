(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .controller('HelpController', HelpController);

    function HelpController($mdDialog) {

        var vmd = this;

        vmd.close = function(){
            $mdDialog.hide();
        };

    }
})();
