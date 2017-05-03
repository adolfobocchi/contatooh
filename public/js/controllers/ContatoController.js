/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('contatooh').controller('ContatoController',
    function($scope, Contato, $routeParams) {
        console.log($routeParams.contatoId);
        $scope.contato = {};
        $scope.mensagem = {
            texto : ''
        };
        
        if($routeParams.contatoId) {
            Contato.get(
                    {
                        id: $routeParams.contatoId
                    },
                    function(contato) {
                      $scope.contato = contato;  
                    },
                    function(erro) {
                        $scope.mensagem = {
                            texto : 'nao foi possivel obter o contato, Novo contato.'
                        };
                        console.log(erro);
                    }
            );
        } else {
            $scope.contato = new Contato();
        }
        
        $scope.salva = function() {
            $scope.contato.$save()
                    .then(function(){
                        $scope.mensagem = {
                            texto : 'salvo com sucesso'
                        };
                        $scope.contato = new Contato();
                    })
                    .catch(function(erro) {
                           $scope.mensagem = {
                               texto: 'nao foi possivel salvar o contato'
                            };
                           console.log(erro);
                    });
        };
        
        Contato.query(function (contatos) {
            $scope.contatos = contatos;
        })
    });
/* usando resource
angular.module('contatooh').controller('ContatoController',
    function($scope, $routeParams, $resource) {
        console.log($routeParams.contatoId);
        $scope.contato = {};
        $scope.mensagem = {
            texto : ''
        };
        //resourse usa rota do lado do servidor
        var Contato = $resource('/contatos/:id');
        
        if($routeParams.contatoId) {
            Contato.get(
                    {
                        id: $routeParams.contatoId
                    },
                    function(contato) {
                      $scope.contato = contato;  
                    },
                    function(erro) {
                        $scope.mensagem = {
                            texto : 'nao foi possivel obter o contato, Novo contato.'
                        };
                        console.log(erro);
                    }
            );
        } else {
            $scope.contato = new Contato();
        }
        
        $scope.salva = function() {
            $scope.contato.$save()
                    .then(function(){
                        $scope.mensagem = {
                            texto : 'salvo com sucesso'
                        };
                        $scope.contato = new Contato();
                    })
                    .catch(function(erro) {
                           $scope.mensagem = {
                               texto: 'nao foi possivel salvar o contato'
                            };
                           console.log(erro);
                    });
        };
    });

*/
