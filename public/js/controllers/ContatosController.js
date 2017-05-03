/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('contatooh').controller('ContatosController', 
    function(Contato, $scope) {
        $scope.contatos = [];      
        
        $scope.filtro = '';
        
        $scope.mensagem = {texto: ''};
        
        
        function buscaContatos() {
            Contato.query(
                function(contatos) {
                    $scope.contatos = contatos;
                    $scope.mensagem = {};
                },
                function(erro) {
                    console.log("Nao foi possivel obter os contatos");
                    console.log(erro);
                    $scope.mensagem = {
                        texto: "Nao foi possivel obter os contatos"
                    };
                }
            );
        }
        
        buscaContatos();
        
        $scope.remove = function(contato) {
            console.log(contato);
            Contato.delete({id: contato._id},
                    buscaContatos,
                    function(erro) {
                        console.log("Nao foi possivel remover o contato");
                        console.log(erro);
                        $scope.mensagem = {
                            texto: "Nao foi possivel remover o contato"
                        };
                    }
            
            );
        };
});

// public/js/controllers/ContatosController.js
/*USANDO $http
angular.module('contatooh').controller('ContatosController', 
    function($scope, $http) {
        $scope.total = 0;
        $scope.incrementa = function() {
            $scope.total++;
        };
        $scope.contatos = [];
        $http.get('/contatos') //acessa back-end que retorna um json
                .success(function(data) {
                    $scope.contatos = data;
                })
                        .error(function(statusText) {
                            console.log("Não foi possivel obter a lista de contatos");
                            console.log(statusText);
                });
                   
        /*
        $scope.contatos = [
                    {
                        "_id": 1,
                        "nome": "Contato Angular 1",
                        "email": "cont1@empresa.com.br"
                    },
                    {
                        "_id": 2,
                        "nome": "Contato Angular 2",
                        "email": "cont2@empresa.com.br"
                    },
                    {
                        "_id": 3,
                        "nome": "Contato Angular 3",
                        "email": "cont3@empresa.com.br"
                    }
                ];
        
        $scope.filtro = '';
});

//USANDO RESOURCE
angular.module('contatooh').controller('ContatosController', 
    function($scope, $resource) {
        $scope.contatos = [];         
        $scope.filtro = '';
        $scope.mensagem = {texto: ''};
        
        //var Contato = $resource('/contatos'); resource antigo dessa forma nao manipula os ids
        
        var Contato = $resource('/contatos/:id');
        
        function buscaContatos() {
            Contato.query(
                function(contatos) {
                    $scope.contatos = contatos;
                    $scope.mensagem = {};
                },
                function(erro) {
                    console.log("Nao foi possivel obter os contatos");
                    console.log(erro);
                    $scope.mensagem = {
                        texto: "Nao foi possivel obter os contatos"
                    }
                }
            );
        }
        
        buscaContatos();
        
        $scope.remove = function(contato) {
            console.log(contato);
            Contato.delete(
                    {
                        id: contato._id
                    },
                    buscaContatos,
                    function(erro) {
                        console.log("Nao foi possivel remover o contato");
                        console.log(erro);
                        $scope.mensagem = {
                            texto: "Nao foi possivel remover o contato"
                        }
                    }
            
            );
        };
});
*/
