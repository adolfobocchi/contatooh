/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
module.exports = function() {
    var votoSchema = mongoose.Schema({ 
        ip: 'String' 
    });
    
    var escolhaSchema = mongoose.Schema({
      texto: String,
      voto: [votoSchema]
    });
    
    var PesquisaSchema = mongoose.Schema({
          pergunta: { 
              type: String, 
              required: true 
          },
          escolhas: [escolhaSchema]
    });
    
    return mongoose.model('pesquisa',PesquisaSchema);
};
        
        

