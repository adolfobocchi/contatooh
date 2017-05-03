/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//usando interceptor para verificacao de autenticacao com o passport e git
angular.module('contatooh').factory('meuInterceptor', function($q, $location) {  
    var meuInterceptor = {
    	responseError: function(resposta) {
    		if (resposta.status == 401) {
                    $location.path('/auth');
    		}
                return $q.reject(resposta);
    	}

    }
    return meuInterceptor;

});
