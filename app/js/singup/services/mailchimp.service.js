(function(){
    'use strict';

    angular
    .module('lolTot.singup')
    .service('Mailchimp', Mailchimp);

    function Mailchimp($http, mailchimp) {

        this.send = function(params){
            params['c'] = 'JSON_CALLBACK';
            params.dc = mailchimp.dc;
            params.id = mailchimp.id;
            params.u = mailchimp.u;
            params.username = mailchimp.username;
            return $http.jsonp(
                'http://svzosorio.us11.list-manage.com/subscribe/post-json',
                {
                    params : params
                }
            ).then(function(response){
                return response.data;
            });
        };
    }
})();
