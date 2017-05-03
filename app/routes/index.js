/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(app) {
    app.get('/', function(req, res) {
		var login = '';
		if(req.user) {
			login = req.user.login;
		} 
		res.render('index', { "usuarioLogado" : login});
	});
};
