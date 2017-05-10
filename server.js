/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// server.js
var app = require('./config/express')();
var config = require('./config/config')();
require('./config/passport')();
require('./config/database.js')(config.db);
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

io.sockets.on('connection', function(socket) {
    console.log("votacao socket");
    socket.on('send:vote', function(data) {
        console.log("send:vote");
        var Pesquisa = app.models.Pesquisa;
        var ip = socket.handshake.headers['x-forwarded-for'] ||
        socket.handshake.address.address;
        Pesquisa.findById(data.pesquisa_id, function(err, pesquisa) {
            var escolha = pesquisa.escolhas.id(data.escolha);
            escolha.voto.push({ ip: ip });
            pesquisa.save(function(err, doc) {
                var theDoc = {
                    pergunta: doc.pergunta, _id: doc._id, escolhas: doc.escolhas,
                    userVotou: false, totalVotos: 0
                };
                for(var i = 0, ln = doc.escolhas.length; i < ln; i++) {
                    var escolha = doc.escolhas[i];
                    for(var j = 0, jLn = escolha.voto.length; j < jLn; j++) {
                        var vote = escolha.voto[j];
                        theDoc.totalVotos++;
                        theDoc.ip = ip;
                        if(vote.ip === ip) {
                            theDoc.userVotou = true;
                            theDoc.userEscolha = { _id: escolha._id, texto: escolha.texto };
                        }
                    }
                }
                socket.emit('meuvoto', theDoc);
                socket.broadcast.emit('voto', theDoc);
            });
        });
    });
});

http.listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' +
    app.get('port'));
});

