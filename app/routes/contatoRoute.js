/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {
    
   var controller = app.controllers.contatoController;
   
   
   app.route('/contatos')
           .get(verificaAutenticacao, controller.listaContatos)   
           .post(verificaAutenticacao, controller.salvaContato);
   
   app.route('/contatos/:id')
            .get(verificaAutenticacao, controller.obtemContato)
            .delete(verificaAutenticacao, controller.removeContato);
           
   /* antigo
   app.get('/contatos', controller.listaContatos);
   app.post('/contatos', controller.salvaContato);
   
   app.get('/contatos/:id', controller.obtemContato);
   app.delete('/contatos/:id', controller.removeContato);
   */
};
