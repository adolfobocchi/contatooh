/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    
    var Contato = app.models.contato;

    var controller = {};
    
    controller.listaContatos = function(req, res) {
        Contato.find().populate('emergencia').exec()
                .then(
                    function(contatos) {
                        res.json(contatos);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
                
    };

    controller.obtemContato = function(req, res) {
        var _id = sanitize(req.params.id);
        Contato.findById(_id).exec()
                .then(
                    function(contato) {
                        if(!contato) throw new Error("Contato nao encontrado");
                        res.json(contato);
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(404).json(erro);
                    } 
                );
    };

    controller.removeContato = function (req, res){
        var _id = sanitize(req.params.id);
        Contato.remove({"_id" : _id}).exec()
        .then(
            function() {
                res.end();  
            }, 
            function(erro) {
                return console.error(erro);
            }
        );
        //findByIdAndRemove retorna o objeto removido
    };

    controller.salvaContato = function (req, res){
        var _id = req.body._id;
        req.body.emergencia = req.body.emergencia || null;
        
        if(_id) {
            Contato.findByIdAndUpdate(_id, req.body).exec()
                    .then(
                        function(contato) {
                            res.json(contato);
                        },
                        function(erro) {
                            console.error(erro);
                            res.status(500).json(erro);
                        }
                    );
        } else {
            Contato.create(req.body)
                    .then(
                        function(contato) {
                            res.status(201).json(contato);
                        },
                        function(erro) {
                            console.error(erro);
                            res.status(500).json(erro);
                        }
                    );
        }
    };
    
    return controller;
}
/* metodo fortemente tipado sem banco de dados
 * 
var ID_CONTATO_INC = 3;

var contatos = [
            {_id: 1, nome: 'Contato Exemplo 1',
            email: 'cont1@empresa.com.br'},
            {_id: 2, nome: 'Contato Exemplo 2',
            email: 'cont2@empresa.com.br'},
            {_id: 3, nome: 'Contato Exemplo 3',
            email: 'cont3@empresa.com.br'}
        ];
        
var controller = {};

controller.listaContatos = function(req, res) {
    res.json(contatos); //lista os dados no formato json res.send nao aceita objetos null
};

controller.obtemContato = function(req, res) {
    console.log(req.params.id);
    var _id = req.params.id;
    var contato = contatos.filter(function(contato) {
        return contato._id == _id;
    })[0];
    contato ? res.json(contato) : res.status(404).send('Contato nao encontrado');
};

controller.removeContato = function(req, res) {
    console.log(req.params.id);
    var idContato = req.params.id;
    contatos = contatos.filter(function(contato) {
        return contato._id != idContato;
    });
    res.send(204).end();
};


function adiciona(contatoNovo) {
    contatoNovo._id = ++ID_CONTATO_INC;
    contatos.push(contatoNovo);
    return contatoNovo;
}

function atualiza(contatoAlterar) {
    contatos = contatos.map(function(contato) {
        if(contato._id == contatoAlterar._id) {
            contato = contatoAlterar;
        }
        return contato;
    });
    return contatoAlterar;
}

controller.salvaContato = function(req, res) {
    var contato = req.body;
    contato = contato._id ? atualiza(contato) : adiciona(contato);
    res.json(contato);
};


module.exports = controller;

*/ 