/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// config/express.js
var express = require('express');
//var home = require('../app/routes/homeRoute'); sem usar express-load para carregar rotas mvc
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
    var app = express();

    // configuração de ambiente
    app.set('port', 3000);


    //view engine
    app.set('view engine','ejs');
    app.set('views', './app/views');
    
    // middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser());
    app.use(session(
            {
                secret: 'homem avestruz',
                resave: true,
                saveUninitialized: true
            }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
    app.disable('x-powered-by');
    //home(app); no caso de nao usar a configuracao express-load
    
    /*usando a configuracao express-load
    Um ponto importante é que precisamos carregar as pastas seguindo a ordem
    models, controllers e routes
     */
    load('models', {cwd: 'app', verbose:true})
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);
    
   /*
   load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes/auth.js')
        .then('routes')
        .into(app);
        */
    // se nenhum rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });
    
    return app;
};
