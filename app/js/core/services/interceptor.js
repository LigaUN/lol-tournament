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
                    400: 'Por favor verifique que los datos sean correctos y no estén duplicados',
                    401: 'No estás autorizado para ver este contenido',
                    403: 'No estás autorizado para ver este contenido',
                    404: 'No existe',
                    500: 'Se produjo un error en el servidor',
                    503: 'Servicio no disponible'

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
