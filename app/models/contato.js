/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        emergencia: {
            type: mongoose.Schema.ObjectId,
            ref: 'Contato'
        }
    });
    return mongoose.model('Contato',schema);
};


