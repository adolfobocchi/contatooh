/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// server.js
var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' +
    app.get('port'));
});

