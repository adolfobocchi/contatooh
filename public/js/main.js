/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//usando rota passport pelo lado do cliente com httpProvider e interceptor
angular.module('contatooh',['ngRoute', 'ngResource']) //objeto angular disponivel globalmente no projeto, [] array com as dependecias
        .config(
            function ($routeProvider, $httpProvider) {
                
                 
                $httpProvider.interceptors.push('meuInterceptor');
                 
                $routeProvider.when('/contatos', {
                    templateUrl : 'partials/contatos.html',
                    controller: 'ContatosController'
                });
                //contato no singular rota do lado cliente
                $routeProvider.when('/contato/:contatoId', {
                    templateUrl : 'partials/contato.html',
                    controller: 'ContatoController'
                });
                
                $routeProvider.when('/contato', {
                    templateUrl : 'partials/contato.html',
                    controller: 'ContatoController'
                });
                
                $routeProvider.when('/auth', {

                    templateUrl: 'partials/auth.html'

                });
                
                $routeProvider.otherwise({redirectTo: '/contatos'});
            }
        );

