(function(){
    'use strict';

    angular
        .module('lolTot.singup')
        .controller('HelpController', HelpController);

    function HelpController($mdDialog, maxPoints, leagues) {

        var vmd = this;

        vmd.maxPoints = maxPoints;
        vmd.leagues = leagues;

        vmd.close = function(){
            $mdDialog.hide();
        };

    }
})();
