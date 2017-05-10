/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {
    
   var controller = app.controllers.pesquisaController;
   
   app.route('/pesquisas')
           .get(verificaAutenticacao, controller.listarPesquisa)   
           .post(verificaAutenticacao, controller.criarPesquisa);
   
   app.route('/pesquisas/:id')
            .get(verificaAutenticacao, controller.obtemPesquisa);
};

