(function(){
    'use strict';

    angular
    .module('lolTot.core')
    .factory('interceptor', interceptor);

    function interceptor($q, $injector){

        return {
            responseError: function(res){
                var $mdToast = $injector.get('$mdToast');

                var messages = {
                    0: 'Servicio no disponible, report RITO',
                    401: 'Acceso denegado, report Galleto',
                    404: 'El recurso solicitado ha entrado en sigilo',
                    500: 'Se produjo un error en el servidor',
                    503: 'Servicio no disponible :('
                };

                var dontNotify = res.config.dontNotify;

                if(!dontNotify && messages[res.status]){
                    $mdToast.show(
                        $mdToast.simple()
                        .content(messages[res.status])
                        .hideDelay(3000)
                    );
                }

                return $q.reject(res);
            }
        };
    }

})();
