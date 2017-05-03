/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var passport =  require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');
var config = require('./config')();

module.exports = function () {
    var Usuario = mongoose.model('Usuario');
    
    passport.use(new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate( //nao tem suporte a promises
                {
                    "login": profile.username
                },
                {
                    "nome": profile.username
                },
                function(erro, usuario) {
                    if(erro) {
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null,usuario);
                }
        );
    }));
    
    passport.serializeUser(function (usuario, done) {
        done(null,usuario._id);
    });
    
    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec()
                .then(function (usuario) {
                    done(null, usuario);
        });
    });
};


