angular.module('contatooh').controller('PesquisaController', 
    function(Pesquisa, $scope, $routeParams, Socket) {
        
        $scope.pesquisas = [];  
                  
        $scope.filtro = '';
        
        $scope.mensagem = {texto: ''};
        
        function buscaPesquisas() {
            Pesquisa.query(
                function(pesquisas) {
                    $scope.pesquisas = pesquisas;
                    $scope.mensagem = {};
                },
                function(erro) {
                    console.log("Nao foi possivel obter as pesquisas");
                    console.log(erro);
                    $scope.mensagem = {
                        texto: "Nao foi possivel obter as pesquisas"
                    };
                }
            );
        }
        
        buscaPesquisas();
        
        if($routeParams.pesquisaId) {
            Pesquisa.get(
                    {
                        id: $routeParams.pesquisaId
                    },
                    function(pesquisa) {
                        $scope.pesquisa = pesquisa;
                        Socket.on('meuvoto', function(pesquisa) {
                            console.dir(pesquisa);
                            if(pesquisa._id === $routeParams.pesquisaId) {
                                $scope.pesquisa = pesquisa;
                            }
                        });
                        Socket.on('voto', function(pesquisa) {
                            console.dir(pesquisa);
                            if(pesquisa._id === $routeParams.pesquisaId) {
                                $scope.pesquisa.escolhas = pesquisa.escolhas;
                                $scope.pesquisa.totalVotos = pesquisa.totalVotos;
                            }
                        });
                    },
                    function(erro) {
                        $scope.mensagem = {
                            texto : 'nao foi possivel obter a pesquisa, Nova pesquisa.'
                        };
                        console.log(erro);
                    }
            );
        } else {
            $scope.pesquisa = new Pesquisa();
        }
        
        $scope.novapesquisa = {
            pergunta: '',
            escolhas: [ { texto: '' }, { texto: '' }, { texto: '' }]
        };
        
        $scope.addEscolha = function() {
            $scope.pesquisa.escolhas.push({ texto: '' });
        };
        
        $scope.votar = function() {
            console.log("funcao votar");
            var pesquisaId = $scope.pesquisa._id,
                escolhaId = $scope.pesquisa.userVoto;
            console.log(pesquisaId);
            console.log(escolhaId);
            if(escolhaId) {
                var voteObj = { pesquisa_id: pesquisaId, escolha: escolhaId };
                console.log("votar socket.emit")
                Socket.emit('send:vote', voteObj);
            } else {
                alert('Você deve escolher uma opção para votar!');
            }
        };
        
        $scope.criarPesquisa = function() {
            var pesquisa = $scope.novapesquisa;
            if(pesquisa.pergunta.length > 0) {
                var escolhaCount = 0;
                for(var i = 0, ln = pesquisa.escolhas.length; i < ln; i++) {
                    var escolha = pesquisa.escolhas[i];
                    if(escolha.texto.length > 0) {
                        escolhaCount++
                    }
                }
                if(escolhaCount > 1) {
                    var novaPesquisa = new Pesquisa(pesquisa);
                    novaPesquisa.$save()
                    .then(function(){
                        $scope.mensagem = {
                            texto : 'salvo com sucesso'
                        };
                        $scope.novapesquisa = {
                            pergunta: '',
                            escolhas: [ { texto: '' }, { texto: '' }, { texto: '' }]
                        };
                    })
                    .catch(function(erro) {
                           $scope.mensagem = {
                               texto: 'nao foi possivel salvar o contato'
                            };
                           console.log(erro);
                    });
                } else {
                    alert('Você deve inserir pelo menos duas escolhas!');
                }
            } else {
              alert('Você deve inserir uma pergunta!');
            }
        };
});
