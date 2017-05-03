/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var schema = mongoose.Schema({
       login: {
           type: String,
           required: true,
           index: {
               unique: true
           }
       },
       nome: {
           type: String,
           required: true
       },
       inclusao: {
           type: Date,
           default: Date.now
       }
    });
    
    schema.plugin(findOrCreate);    
    return mongoose.model('Usuario',schema);
};


