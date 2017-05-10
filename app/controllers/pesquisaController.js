
var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    
    var Pesquisa = app.models.Pesquisa;

    var controller = {};
    
    controller.listarPesquisa = function(req, res) {
        console.log("listarPesquisa")
        Pesquisa.find().exec()
            .then(
                function(pesquisas) {
                    console.log(pesquisas);
                    res.json(pesquisas);
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
                
    };
    
    controller.criarPesquisa = function(req, res) {
        
        var reqBody = req.body,
        escolhas = reqBody.escolhas.filter(function(v) { return v.texto != ''; }),
        pollObj = {
            pergunta: reqBody.pergunta, escolhas: escolhas
          };
          var pesquisa = new Pesquisa(pollObj);
          pesquisa.save(function(err, doc) {
            if(err || !doc) {
              throw 'Error';
            } else {
              res.json(doc);
            }
          });
        
        
        
    };
    
    controller.obtemPesquisa = function(req, res) {
          var _id = sanitize(req.params.id);
          Pesquisa.findById(_id).exec()
                .then(
                    function(pesquisa) {
                        if(!pesquisa) throw new Error("Pesquisa nao encontrado");
                        var userVotou = false, userEscolheu, totalVotos = 0;
                        for(c in pesquisa.escolhas) {
                            var escolha = pesquisa.escolhas[c];
                            for(v in escolha.votos) {
                                var voto = escolha.votos[v];
                                totalVotos++;
                                if(voto.ip === (req.header('x-forwarded-for') || req.ip)) {
                                    userVotou = true;
                                    userEscolheu = { _id: escolha._id, texto: escolha.texto };
                                }
                            }
                        }
                        pesquisa.userVotou = userVotou;
                        pesquisa.userEscolheu = userEscolheu;
                        pesquisa.totalVotos = totalVotos;
                        res.json(pesquisa);
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(404).json(erro);
                    } 
                );
    };
    
    return controller;
}

