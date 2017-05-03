/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var passport = require('passport');

module.exports = function(app) { 
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback',
            passport.authenticate('github', {
        successRedirect: '/'
    }));
    
    app.get('/logout', function(req, res) {
	  req.logOut(); // exposto pelo passport
	  res.redirect('/');
    });
    /* trabalhando o controle de routas do lado do servidor usando view auth ejs
    app.get('/', function(req, res, next) {
        if(req.isAuthenticated()) {
            // permite que outras rotas sejam processadas
        return next();
        } else {
            // renderiza auth.ejs
            res.render("auth");
        }
    });
    */
    
}
